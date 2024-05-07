export default class CadastroPage {
    inputNome = '#name';
    inputEmail = '#email';
    headerErro = 'h2';
    headerTextoErro = 'p';
    buttonSalvar = '.sc-dAlyuH';
    buttonCancelar = '.sc-lcIPJg.ifkIA-D';
    messageUsuarioSalvo = '.go2072408551';
    messageError = '.sc-jEACwC';
    linkNovoUsuario = 'a[href="/users/novo"]'
    linkVoltar = 'a[href="/users"]';

    typeNome(nome) {
        cy.get(this.inputNome).type(nome);
    }

    typeEmail(email) {
        cy.get(this.inputEmail).type(email);
    }

    clickButtonSalvar() {
        cy.get(this.buttonSalvar).click();
    }

    clickButtonVoltar() {
        cy.get(this.linkVoltar).should('be.visible').click();
    }

    clickButtonNovo() {
        cy.contains(this.linkNovoUsuario, 'Novo').click();
    }

    clickButtonCancelar() {
        cy.get(this.buttonCancelar).click();
    }
}