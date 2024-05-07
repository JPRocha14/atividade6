# language: pt

@pesquisarUser
Funcionalidade: Pesquisa de usuário

Contexto: Acesso ao sistema
Dado que acessei o sistema

Cenário: Deve permitir encontrar um usuário pelo nome
Quando encontro a barra de pesquisa
E digito o nome do usuário
Então consigo encontrá-lo

Cenário: Deve permitir encontrar um usuário pelo email
Quando encontro a barra de pesquisa
E digito o email do usuário
Então consigo encontrá-lo

Cenário: Não deve permitir encontrar um usuário inexistente pelo nome
Quando encontro a barra de pesquisa
E digito o nome do usuário inexistente
Então uma mensagem de alerta é exibida
E eu poderei cadastrar um novo usuário

Cenário: Não deve permitir encontrar um usuário inexistente pelo email
Quando encontro a barra de pesquisa
E digito o email do usuário inexistente
Então uma mensagem de alerta é exibida
E eu poderei cadastrar um novo usuário

