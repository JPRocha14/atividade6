import { Given, When, Then, But, Before } from 'cypress-cucumber-preprocessor/steps';
import CadastroPage from '../pages/cadastro.page';
import { faker } from '@faker-js/faker';
import PaginaInicial from '../pages/inicial.page';
import PaginaEdicao from '../pages/edicao.page';

var paginaCadastro = new CadastroPage();
var paginaInicial = new PaginaInicial();
var paginaEdicao = new PaginaEdicao();

var email;
var nome = 'João Pedro';
var emailRequest = faker.internet.email().toLowerCase();

Before({ tags: '@criarUsuario' }, function () {
    cy.request({
        method: 'POST',
        url: 'https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users',
        body: {
            name: nome,
            email: emailRequest,
        }
    });
});

Given('que acessei a página do site', function () {
    cy.visit('');
});

When('o site possui usuários cadastrados', function () {
    cy.intercept('GET', '/api/v1/users', {
        statusCode: 200,
        fixture: 'listaSeisUsuarios.json',
    }).as('getUsersSeis');
});

When('o site não possui usuários cadastrados', function () {
    cy.intercept('GET', '/api/v1/users', {
        statusCode: 200,
        body: [],
    }).as('emptyList');

    cy.wait('@emptyList');
    cy.get(paginaInicial.headerErro).invoke('text').should('equal', 'Ops! Não existe nenhum usuário para ser exibido.');
});

When('o site possui mais de 6 usuários cadastrados', function () {
    cy.intercept('GET', '/api/v1/users', {
        statusCode: 200,
        fixture: 'lista13Usuarios.json',
    }).as('getUsersTreze');
});

When('o site possui 6 ou menos usuários', function () {
    cy.intercept('GET', '/api/v1/users', {
        statusCode: 200,
        fixture: 'listaSeisUsuarios.json',
    }).as('getSixUsers');
});

Then('posso verificar as informações dos usuários em questão', function () {
    cy.wait('@getUsersSeis').then(function (consultaUsuarios) {
        var listaUsuarios = consultaUsuarios.response.body;
        listaUsuarios.forEach(function (usuario) {
            cy.contains(paginaInicial.nomeUsuario, 'Nome: ' + usuario.name);
            cy.contains(paginaInicial.emailUsuario, 'E-mail: ' + usuario.email.slice(0, 21));
        });
    });
});

Then('devo poder visualizar as informações detalhadas dos usuários', function () {
    cy.wait('@getUsersSeis');
    paginaInicial.clickButtonPesquisa(emailRequest);
    cy.wait(2000);
    paginaInicial.clickButtonVerDetalhes();
    cy.get(paginaEdicao.inputNome).should('be.visible');
    cy.get(paginaEdicao.inputEmail).should('be.visible');
});


Then('deve haver a opção de cadastrar usuário', function () {
    paginaInicial.clickLinkCadastrarUsuario();
});

Then('devo poder cadastrar um usuário', function () {
    email = faker.internet.email().toLowerCase();
    paginaCadastro.typeNome('João Pedro');
    paginaCadastro.typeEmail(email);
    paginaCadastro.clickButtonSalvar();
    cy.get(paginaCadastro.messageUsuarioSalvo).invoke('text').should('equal', 'Usuário salvo com sucesso!');
});

Then('devo poder navegar entre as páginas', function () {
    cy.wait('@getUsersTreze').then(function (consultaUsuarios) {
        var quantidadeUsuarios = consultaUsuarios.response.body.length;
        var quantidadePaginas = Math.floor(quantidadeUsuarios / 6);
        for (var i = 0; i < quantidadePaginas; i++) {
            paginaInicial.clickNextPage();
        }
    });
});

Then('devo poder excluir o usuário', function () {
    paginaInicial.clickLogoRaro();
    paginaInicial.clickButtonExcluirUsuario();
    paginaInicial.clickButtonConfirmarExclusao();
});

Then('não devo poder navegar entre as páginas', function () {
    cy.get(paginaInicial.buttonActualPage).contains('1 de 1').and('be.visible');
    cy.get(paginaInicial.buttonNextPage).should('be.disabled');
});

Then('devo poder visualizar a paginação', function () {
    cy.wait('@getUsersTreze');
    cy.get(paginaInicial.buttonActualPage).contains('1 de 3').and('be.visible');
    cy.get(paginaInicial.buttonNextPage).should('be.enabled');

});

But('posso visualizar as informações dos usuários da primeira página', function () {
    cy.wait('@getSixUsers').then(function (consultaUsuarios) {
        var listaUsuarios = consultaUsuarios.response.body;
        listaUsuarios.forEach(function (usuario) {
            cy.contains(paginaInicial.nomeUsuario, 'Nome: ' + usuario.name);
            cy.contains(paginaInicial.emailUsuario, 'E-mail: ' + usuario.email.slice(0, 21));
        });
    });
})