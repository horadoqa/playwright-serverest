import { test, expect } from '@playwright/test';
import { createUserPayload } from '../../utils/user.factory';

test('deve criar, buscar por ID e deletar um usuário', async ({ request }) => {
  let userId;
  let user;

  try {
    // 1. Criar usuário
    user = createUserPayload();

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

    // 2. Buscar usuário por ID
    const getResponse = await request.get(
      `https://serverest.dev/usuarios/${userId}`,
      {
        headers: {
          accept: 'application/json',
        },
      }
    );

    expect(getResponse.status()).toBe(200);

    const getBody = await getResponse.json();

    // valida dados retornados
    expect(getBody).toHaveProperty('_id', userId);
    expect(getBody).toHaveProperty('email', user.email);
    expect(getBody).toHaveProperty('nome', user.nome);

    console.log('Usuário encontrado com sucesso');

  } finally {
    // 3. Deletar usuário
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