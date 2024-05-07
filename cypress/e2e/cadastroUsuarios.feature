# language: pt

Funcionalidade: Cadastro de usuário

Contexto: Acesso à área de cadastro de usuário
    Dado que acessei o site
    Quando acesso a área de cadastro de usuários

Esquema do Cenário: Deve permitir cadastrar um usuário com sucesso
    E informo o nome válido "<nome>"
    E informo um email válido
    E confirmo a operação
    Então a mensagem de usuário cadastrado será exibida
    E o usuário recém cadastrado aparecerá na lista de usuários
    Exemplos:
    | nome                                                                                                 |
    | Joao                                                                                                 |
    | Joao PedroJoao PedroJoao PedroJoao PedroJoao PedroJoao PedroJoao PedroJoao PedroJoao PedroJoao Pedro |

Cenário: Não deve ser possível cadastrar um usuário com nome abaixo de 4 caracteres
    E informo o nome inválido "Ana"
    E informo um email válido
    E confirmo a operação
    Então não será possível concluir a tentativa de cadastro do usuário acima

Cenário: Não deve ser possível cadastrar um usuário com nome acima de 100 caracteres
    E informo o nome inválido "Joao PedroJoao PedroJoao PedroJoao PedroJoao PedroJoao PedroJoao PedroJoao PedroJoao PedroJoao Pedro1"
    E informo um email válido
    E confirmo a operação
    Então não vai ser possível concluir a tentativa de cadastro do usuário

Esquema do Cenário: Não deve ser possível cadastrar um usuário se os dados de email forem inválidos
    E informo o nome válido "João Pedro"
    E informo o email inválido "<email>"
    E confirmo a operação
    Então não será possível concluir a tentativa de cadastro do usuário
    Exemplos:
    | email                                                         |
    | testeteste.com                                                |
    | .com                                                          |
    | a@.com                                                        |
    | @.com                                                         |

Cenário: Não deve ser possível cadastrar um usuário se o email tiver mais de 60 caracteres
    E informo o nome válido "João Pedro"
    E informo o email inválido "joaojoaojoaojoaojoaojoaojoaojoaojoaojoaojoaojoaojoa@gmail.com"
    E confirmo a operação
    Então não será possível concluir a tentativa de cadastro desse usuário

Cenário: Não deve ser possível cadastrar um usuário se o email tiver menos de 4 caracteres
    E informo o nome válido "João Pedro"
    E informo o email inválido "@ba"
    E confirmo a operação
    Então não será possível concluir a tentativa de cadastro deste usuário

Cenário: Não deve ser possível cadastrar um novo usuário com email já existente
    E informo o nome válido "João Pedro"
    E informo um email já em uso
    E confirmo a operação acima
    Então uma mensagem de erro será exibida
