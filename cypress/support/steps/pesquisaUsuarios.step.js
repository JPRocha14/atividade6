import { Given, When, Then, Before } from 'cypress-cucumber-preprocessor/steps';
import CadastroPage from '../pages/cadastro.page';
import { faker } from '@faker-js/faker';
import PaginaInicial from '../pages/inicial.page';
import PaginaEdicao from '../pages/edicao.page';

var paginaCadastro = new CadastroPage();
var paginaInicial = new PaginaInicial();
var paginaEdicao = new PaginaEdicao();

var nome;
var emailUsuario;

Before({ tags: '@pesquisarUser' }, function () {
    nome = faker.person.firstName() + ' Rocha';
    emailUsuario = faker.internet.email().toLowerCase();
    cy.request({
        method: 'POST',
        url: 'https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users',
        body: {
            name: nome,
            email: emailUsuario,
        }
    });
});

Given('que acessei o sistema', function () {
    cy.visit('');
});

When('encontro a barra de pesquisa', function () {
    paginaInicial.justClickButtonPesquisa();
    cy.intercept('GET', '/api/v1/search*').as('searchUsers');
});

When('digito o nome do usuário', function () {
    paginaInicial.clickButtonPesquisa(nome);
    cy.wait('@searchUsers');
});

When('digito o email do usuário', function () {
    paginaInicial.clickButtonPesquisa(emailUsuario);
    cy.wait('@searchUsers');
});

When('digito o nome do usuário inexistente', function () {
    paginaInicial.clickButtonPesquisa('nomequenaoexiste nome inexistente');
    cy.wait('@searchUsers');
});

When('digito o email do usuário inexistente', function () {
    paginaInicial.clickButtonPesquisa('emailinexistente.com');
    cy.wait('@searchUsers');
});

Then('consigo encontrá-lo', function () {
    cy.contains(paginaInicial.nomeUsuario, 'Nome: ' + nome);
    cy.contains(paginaInicial.emailUsuario, 'E-mail: ' + emailUsuario.slice(0, 21));
});

Then('uma mensagem de alerta é exibida', function () {
    cy.get(paginaInicial.headerErro).invoke('text').should('equal', 'Ops! Não existe nenhum usuário para ser exibido.');
});

Then('eu poderei cadastrar um novo usuário', function () {
    cy.get(paginaInicial.linkCadastrarUsuario).invoke('text').should('equal', 'Cadastre um novo usuário');
})