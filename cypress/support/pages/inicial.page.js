export default class PaginaInicial {
    buttonPesquisa = 'input.sc-gsFSXq.mUpIH';
    buttonVerDetalhes = '#userDataDetalhe';
    buttonNextPage = '#paginacaoProximo';
    buttonPreviousPage = '#paginacaoVoltar';
    buttonActualPage = '#paginacaoAtual';
    buttonNovoUser = 'a[href="/users/novo"]';
    buttonExcluirUsuario = ':nth-child(1) > .sc-feUZmu > [data-test="userDataDelete"]';
    buttonConfirmarExclusao = '.sc-lcIPJg.eIYdvr';

    listaUsuarios = '#listaUsuarios';

    nomeUsuario = '[data-test="userDataName"]';
    emailUsuario = '[data-test="userDataEmail"]'

    headerErro = '.sc-koXPp.csBRDe h3';

    linkCadastrarUsuario = 'a.sc-bmzYkS.dmSxaj[href="/users/novo"]'

    logoRaro = '.sc-eqUAAy';

    clickButtonPesquisa(pesquisa) {
        cy.get(this.buttonPesquisa).should('be.visible').click().type(pesquisa);
    }

    justClickButtonPesquisa() {
        cy.get(this.buttonPesquisa).should('be.visible').click();
    }

    clickButtonVerDetalhes() {
        cy.get(this.buttonVerDetalhes).should('be.visible').click();
    }


    getListaUsuarios() {
        return cy.get(this.listaUsuarios);
    }

    clickNextPage() {
        cy.get(this.buttonNextPage).should('be.enabled').click();
    }

    clickPreviousPage() {
        cy.get(this.buttonPreviousPage).should('be.enabled').click();
    }

    clickLogoRaro() {
        cy.get(this.logoRaro).should('be.visible').click();
    }

    clickButtonNovo() {
        cy.get(this.buttonNovoUser).should('be.visible').click();
    }

    clickLinkCadastrarUsuario() {
        cy.get(this.linkCadastrarUsuario).should('be.visible').click();
    }

    clickButtonExcluirUsuario() {
        cy.get(this.buttonExcluirUsuario).should('be.enabled').click();
    }

    clickButtonConfirmarExclusao() {
        cy.get(this.buttonConfirmarExclusao).should('be.enabled').click();
    }
}