import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import CadastroPage from '../pages/cadastro.page';
import { faker } from '@faker-js/faker';
import PaginaInicial from '../pages/inicial.page';
import PaginaEdicao from '../pages/edicao.page';

var paginaCadastro = new CadastroPage();
var paginaInicial = new PaginaInicial();
var paginaEdicao = new PaginaEdicao();

var novoEmail;

Given('que acessei o site', function () {
    cy.visit('');
    cy.intercept('GET', '/api/v1/users').as('getUsers');
    cy.wait('@getUsers');
});

When('acesso a área de cadastro de usuários', function () {
    paginaCadastro.clickButtonNovo();
});

When('informo o nome válido {string}', function (nome) {
    paginaCadastro.typeNome(nome);
});

When('informo um email válido', function () {
    novoEmail = faker.internet.email().toLowerCase();
    cy.wrap(novoEmail).as('emailFaker');
    paginaCadastro.typeEmail(novoEmail);
});

When('confirmo a operação', function () {
    cy.intercept('POST', '/api/v1/users').as('postUsers');
    paginaCadastro.clickButtonSalvar();
    cy.wait('@postUsers');
});

When('informo o nome inválido {string}', function (nome) {
    cy.get(paginaCadastro.inputNome).type(nome);
});

When('informo o email inválido {string}', function (email) {
    paginaCadastro.typeEmail(email);
});

When('o usuário recém cadastrado aparecerá na lista de usuários', function () {
    cy.intercept('GET', '/api/v1/search*').as('searchUser');
    paginaCadastro.clickButtonVoltar();
    cy.wait('@getUsers');
    paginaInicial.clickButtonPesquisa(this.emailFaker);
    cy.wait('@searchUser');
    paginaInicial.clickButtonVerDetalhes();
    cy.get(paginaEdicao.inputEmail).invoke('val').should('equal', this.emailFaker);
});

When('informo um email já em uso', function () {
    novoEmail = faker.internet.email().toLowerCase();
    paginaCadastro.typeEmail(novoEmail);
});

When('confirmo a operação acima', function () {
    cy.intercept('POST', '/api/v1/users', {
        statusCode: 422,
        body: {
            error: "User already exists."
        }
    }).as('postUserErro');
    paginaCadastro.clickButtonSalvar();

    cy.wait('@postUserErro');
});

Then('a mensagem de usuário cadastrado será exibida', function () {
    cy.get(paginaCadastro.messageUsuarioSalvo).should('contain', 'Usuário salvo com sucesso!');
});

Then('uma mensagem de erro aparecerá na tela', function () {
    cy.get(paginaCadastro.headerErro).invoke('text').should('equal', 'Erro');
    cy.get(paginaCadastro.headerTextoErro).invoke('text').should('equal', 'Este e-mail já é utilizado por outro usuário.');
    paginaCadastro.clickButtonCancelar();
});

Then('não será possível concluir a tentativa de cadastro do usuário', function () {
    cy.get(paginaCadastro.messageError).invoke('text').should('equal', 'Formato de e-mail inválido');
});

Then('não será possível concluir a tentativa de cadastro do usuário acima', function () {
    cy.get(paginaCadastro.messageError).invoke('text').should('equal', 'Informe pelo menos 4 letras para o nome.');
});

Then('não vai ser possível concluir a tentativa de cadastro do usuário', function () {
    cy.get(paginaCadastro.messageError).invoke('text').should('equal', 'Informe no máximo 100 caracteres para o nome');
});

Then('não será possível concluir a tentativa de cadastro desse usuário', function () {
    cy.get(paginaCadastro.messageError).invoke('text').should('equal', 'Informe no máximo 60 caracteres para o e-mail');
});

Then('não será possível concluir a tentativa de cadastro deste usuário', function () {
    cy.get(paginaCadastro.messageError).invoke('text').should('equal', 'Informe pelo menos 4 caracteres para o e-mail.');
}); 
