import { test, expect } from '@playwright/test';
import { createUserPayload } from '../../utils/user.factory';

test('deve criar e deletar um usuário', async ({ request }) => {
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

    expect(createBody).toHaveProperty('_id');

    userId = createBody._id;

    console.log('Usuário criado com ID:', userId);

  } finally {
    // 2. Deletar usuário (sempre executa)
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