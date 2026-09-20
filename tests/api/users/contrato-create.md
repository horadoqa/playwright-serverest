# Contrato Create

Nesse caso específico, vale seguir o contrato da API que você está testando.

O fluxo do teste
Basicamente, seu teste faz:

1. Cria os dados do usuário
2. Faz um POST /usuarios.
3. Envia os dados no JSON através de data: user.
4. Verifica se o HTTP status é 201.
5. Lê o JSON da resposta.
6. Verifica a mensagem de sucesso.
7. Verifica se a API retornou _id.
8. Exibe o ID no terminal.