import { Given, When, Then, Before } from 'cypress-cucumber-preprocessor/steps';
import CadastroPage from '../pages/cadastro.page';
import { faker } from '@faker-js/faker';
import PaginaInicial from '../pages/inicial.page';
import PaginaEdicao from '../pages/edicao.page';

var paginaCadastro = new CadastroPage();
var paginaInicial = new PaginaInicial();
var paginaEdicao = new PaginaEdicao();

var userName1;
var userEmail1;
var userName2;
var userEmail2;
var novoEmail = faker.internet.email().toLowerCase();

Before({ tags: '@attUser' }, function () {
    // criação de usuário para ser utilizado na maioria dos testes
    userName1 = faker.person.firstName() + ' Rocha';
    userEmail1 = faker.internet.email().toLowerCase();
    cy.cadastroUser1(userName1, userEmail1);

    // criação de usuário secundário para ser utilizado no teste
    // de atualizar para um email já cadastrado
    userName2 = faker.person.firstName() + ' Dias';
    userEmail2 = faker.internet.email().toLowerCase();
    cy.cadastroUser2(userName2, userEmail2);
});

Given('que acessei o sistema do site', function () {
    cy.visit('');
});

When('encontro o usuário desejado', function () {
    cy.intercept('GET', '/api/v1/search*').as('encontrarUsuario');
    paginaInicial.clickButtonPesquisa(userEmail1);
    cy.wait('@encontrarUsuario');
});

When('acesso a área de detalhes do usuário', function () {
    paginaInicial.clickButtonVerDetalhes();
});

When('seleciono a opção de editar o usuário', function () {
    paginaEdicao.clickButtonEditar();
});

When('apago as informações do email', function () {
    paginaEdicao.clearEmail();
});

When('apago as informações do nome', function () {
    paginaEdicao.clearNome();
});

When('não preencho o campo', function () {
    paginaEdicao.typeNome(' ');
});

When('não preencho este campo', function () {
    paginaEdicao.typeEmail(' ');
});

When('altero o email para um já existente', function () {
    paginaEdicao.clearEmail();
    paginaEdicao.typeEmail(userEmail2);
});

When('confirmo esta operação', function () {
    paginaEdicao.clickButtonSalvar();
});

When('pesquiso pelo usuário inexistente', function () {
    cy.intercept('GET', '/api/v1/search*').as('usuarioInexistente');
    paginaInicial.clickButtonPesquisa('emailinexistente.com');
    cy.wait('@usuarioInexistente');
});

When('não o encontro', function () {
    paginaInicial.getListaUsuarios().should('not.exist');
});

Then('posso editar seu email', function () {
    paginaEdicao.clearEmail();
    paginaEdicao.typeEmail(novoEmail);
});

Then('posso editar seu {string}', function (nome) {
    paginaEdicao.clearNome();
    paginaEdicao.typeNome(nome);
});

Then('confirmo a operação', function () {
    paginaEdicao.clickButtonSalvar();
});

When('tento editar seu nome para {string}', function (nome) {
    paginaEdicao.clearNome();
    paginaEdicao.typeNome(nome);
});

When('tento editar seu email para {string}', function (email) {
    paginaEdicao.clearEmail();
    paginaEdicao.typeEmail(email);
});

Then('a operação será invalidada', function () {
    cy.get(paginaEdicao.messageError).invoke('text').should('equal', 'Informe pelo menos 4 letras para o nome.');
});

Then('a operação não prosseguirá', function () {
    cy.get(paginaEdicao.messageError).invoke('text').should('equal', 'Informe no máximo 100 caracteres para o nome');
});

When('informo um email inválido {string}', function (email) {
    paginaEdicao.clearEmail();
    paginaEdicao.typeEmail(email);
});

Then('a operação se tornará inválida', function () {
    cy.get(paginaEdicao.messageError).invoke('text').should('equal', 'Formato de e-mail inválido');
});

Then('uma mensagem de alerta será exibida', function () {
    cy.get(paginaCadastro.headerErro).invoke('text').should('equal', 'Erro');
    cy.get(paginaCadastro.headerTextoErro).invoke('text').should('equal', 'Este e-mail já é utilizado por outro usuário.');
    paginaCadastro.clickButtonCancelar();
});

Then('uma mensagem de erro será exibida', function () {
    cy.get(paginaEdicao.messageError).invoke('text').should('equal', 'Informe no máximo 60 caracteres para o e-mail');
});

Then('uma mensagem de erro aparecerá', function () {
    cy.get(paginaEdicao.messageError).invoke('text').should('equal', 'Informe pelo menos 4 caracteres para o e-mail.');
});

Then('duas mensagens de alerta são exibidas', function () {
    cy.get(paginaInicial.headerErro).invoke('text').should('equal', 'Ops! Não existe nenhum usuário para ser exibido.');
    cy.get(paginaInicial.linkCadastrarUsuario).invoke('text').should('equal', 'Cadastre um novo usuário');
});

Then('não consigo prosseguir com a atualização', function () {

});

Then('a operação não será executada', function () {

});
