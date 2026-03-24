const { test, expect } = require('@playwright/test');
const { createUserPayload } = require('../../utils/user.factory');

test('deve criar, atualizar e deletar um usuário', async ({ request }) => {
  let userId;

  try {
    // 1. Criar usuário
    const user = createUserPayload();

    const createResponse = await request.post('https://serverest.dev/usuarios', {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: user,
    });

    expect(createResponse.status()).toBe(201);

    const createBody = await createResponse.json();
    userId = createBody._id;

    console.log('Usuário criado com ID:', userId);

    // 2. Atualizar usuário
    const updatedUser = {
      ...user,
      email: `horadoqa_alterado_${Date.now()}@qa.com.br`,
    };

    const updateResponse = await request.put(
      `https://serverest.dev/usuarios/${userId}`,
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: updatedUser,
      }
    );

    expect(updateResponse.status()).toBe(200);

    const updateBody = await updateResponse.json();

    expect(updateBody).toHaveProperty(
      'message',
      'Registro alterado com sucesso'
    );

    console.log('Usuário atualizado com sucesso');

  } finally {
    // 3. Deletar usuário com validação
    if (userId) {
      const deleteResponse = await request.delete(
        `https://serverest.dev/usuarios/${userId}`,
        {
          headers: {
            accept: 'application/json',
          },
        }
      );

      expect(deleteResponse.status()).toBe(200);

      const deleteBody = await deleteResponse.json();

      expect(deleteBody).toHaveProperty(
        'message',
        'Registro excluído com sucesso'
      );

      console.log('Usuário deletado com sucesso');
    }
  }
});