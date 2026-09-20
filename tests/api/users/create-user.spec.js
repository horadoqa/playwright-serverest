import { test, expect } from '@playwright/test';

test.describe('Create User', () => {

  test('deve cadastrar um usuário', async ({ request }) => {

    const user = {
      nome: 'Hora do QA',
      email: `horadoqa_${Date.now()}@qa.com.br`,
      password: '1q2w3e4r',
      administrador: 'true'
    };

    const response = await request.post(
      'https://serverest.dev/usuarios',
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: user
      }
    );

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body).toHaveProperty(
      'message',
      'Cadastro realizado com sucesso'
    );

    expect(body).toHaveProperty('_id');

    console.log('Usuário criado com ID:', body._id);
  });

});

// npx playwright test tests/api/users/create-user.spec.js