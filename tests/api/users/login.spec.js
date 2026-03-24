import { test, expect } from '@playwright/test';
import { createUserPayload } from '../../utils/user.factory';

test('deve criar, logar e deletar um usuário', async ({ request }) => {
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

    // 2. Login
    const loginResponse = await request.post('https://serverest.dev/login', {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        email: user.email,
        password: user.password,
      },
    });

    expect(loginResponse.status()).toBe(200);

    const loginBody = await loginResponse.json();

    // valida token
    expect(loginBody).toHaveProperty('authorization');
    expect(loginBody.authorization).toBeTruthy();

    console.log('Login realizado com sucesso');

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