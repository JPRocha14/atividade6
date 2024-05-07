# language: pt

Funcionalidade: Listagem de usuários

Contexto: Acesso à pagina inicial
Dado que acessei a página do site

Cenário: Deve ser possível consultar a lista de usuários se houver usuários cadastrados
E o site possui usuários cadastrados
Então posso verificar as informações dos usuários em questão

Cenário: Deve existir a opção de cadastrar usuário caso não haja nenhum cadastrado
E o site não possui usuários cadastrados
Então deve haver a opção de cadastrar usuário
E devo poder cadastrar um usuário

Cenário: Deve ser possível navegar entre páginas se houver mais de 6 usuários cadastrados
E o site possui mais de 6 usuários cadastrados
Então devo poder navegar entre as páginas

Cenário: Deve ser exibida a paginação se houver mais de 6 usuários cadastrados
E o site possui mais de 6 usuários cadastrados
Então devo poder visualizar a paginação

@criarUsuario
Cenário: Deve ser possível visualizar as opções de exibir detalhes e excluir usuário
E o site possui usuários cadastrados
Então devo poder visualizar as informações detalhadas dos usuários
E devo poder excluir o usuário

Cenário: Não deve ser possível avançar para a próxima página se não houver mais de 6 usuários
E o site possui 6 ou menos usuários
Então não devo poder navegar entre as páginas
Mas posso visualizar as informações dos usuários da primeira página

