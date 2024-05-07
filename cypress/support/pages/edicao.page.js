export default class PaginaEdicao {
    inputEmail = '#userEmail';
    inputNome = '#userName';
    inputId = '.sc-dLMFU.Mcjyi'

    buttonEditar = '[type="button"] > .sc-dAlyuH';
    buttonSalvar = '[type="submit"] > .sc-dAlyuH';

    messageError = '.sc-cPiKLX.feFrSQ'

    clickButtonEditar() {
        cy.get(this.buttonEditar).should('be.visible').click();
    }

    typeNome(nome) {
        cy.get(this.inputNome).should('be.visible').click().type(nome)
    }

    typeEmail(email) {
        cy.get(this.inputEmail).should('be.visible').click().type(email)
    }

    clearNome() {
        cy.get(this.inputNome).clear();
    }

    clearEmail() {
        cy.get(this.inputEmail).clear();
    }

    clickButtonSalvar() {
        cy.get(this.buttonSalvar).should('be.visible').click();
    }
}