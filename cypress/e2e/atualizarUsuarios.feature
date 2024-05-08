            # language: pt

            @attUser
            Funcionalidade: Atualização de usuário

            Contexto: Acesso à área de atualização de usuário
            Dado que acessei o sistema do site

            Esquema do Cenário: Deve ser possível atualizar o nome de um usuário existente
            Quando encontro o usuário desejado
            E acesso a área de detalhes do usuário
            E seleciono a opção de editar o usuário
            Então posso editar seu "<nome>"
            E confirmo a operação
            Exemplos:
            | nome                                                                                                 |
            | Joao                                                                                                 |
            | Joao PedroJoao PedroJoao PedroJoao PedroJoao PedroJoao PedroJoao PedroJoao PedroJoao PedroJoao Pedro |

            Cenário: Deve ser possível atualizar o email de um usuário existente
            Quando encontro o usuário desejado
            E acesso a área de detalhes do usuário
            E seleciono a opção de editar o usuário
            Então posso editar seu email
            E confirmo a operação

            Cenário: Não deve ser possível atualizar o nome de um usuário existente para menos que 4 caracteres
            Quando encontro o usuário desejado
            E acesso a área de detalhes do usuário
            E seleciono a opção de editar o usuário
            E tento editar seu nome para "Ana"
            Então confirmo a operação
            E a operação será invalidada

            Cenário: Não deve ser possível atualizar o nome de um usuário existente para mais de 100 caracteres
            Quando encontro o usuário desejado
            E acesso a área de detalhes do usuário
            E seleciono a opção de editar o usuário
            E tento editar seu nome para "Joao PedroJoao PedroJoao PedroJoao PedroJoao PedroJoao PedroJoao PedroJoao PedroJoao PedroJoao Pedro1"
            Então confirmo a operação
            E a operação não prosseguirá

            Esquema do Cenário: Não deve ser possível atualizar um usuário se os dados de email forem inválidos
            Quando encontro o usuário desejado
            E acesso a área de detalhes do usuário
            E seleciono a opção de editar o usuário
            E informo um email inválido "<email>"
            Então confirmo a operação
            E a operação se tornará inválida
            Exemplos:
            | email          |
            | testeteste.com |
            | .com           |
            | a@.com         |
            | @.com          |

Cenário: Não deve ser possível atualizar o email de um usuário para um email já existente
Quando encontro o usuário desejado
E acesso a área de detalhes do usuário
E seleciono a opção de editar o usuário
E altero o email para um já existente
E confirmo esta operação
Então uma mensagem de alerta será exibida
E a operação não será executada

Cenário: Não deve ser possível atualizar um usuário não encontrado
Quando pesquiso pelo usuário inexistente
E não o encontro
Então duas mensagens de alerta são exibidas
E não consigo prosseguir com a atualização

Cenário: Não deve ser possível atualizar o email de um usuário para um email com mais de 60 caracteres
Quando encontro o usuário desejado
E acesso a área de detalhes do usuário
E seleciono a opção de editar o usuário
E tento editar seu email para "testintestintestintestintestintestintestintestintestin@qa.com"
E confirmo esta operação
Então uma mensagem de erro será exibida
E a operação não será executada

Cenário: Não deve ser possível atualizar o email de um usuário para um email com menos de 4 caracteres
Quando encontro o usuário desejado
E acesso a área de detalhes do usuário
E seleciono a opção de editar o usuário
E tento editar seu email para "a@."
E confirmo esta operação
Então uma mensagem de erro aparecerá
E a operação não será executada

Cenário: Não deve ser possível atualizar o nome para um nome vazio
Quando encontro o usuário desejado
E acesso a área de detalhes do usuário
E seleciono a opção de editar o usuário
E apago as informações do nome
E não preencho o campo
E confirmo esta operação
Então a operação será invalidada

Cenário: Não deve ser possível atualizar o email para um email vazio
Quando encontro o usuário desejado
E acesso a área de detalhes do usuário
E seleciono a opção de editar o usuário
E apago as informações do email
E não preencho este campo
E confirmo esta operação
Então uma mensagem de erro aparecerá
E a operação não será executada