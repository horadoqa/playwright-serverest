import { test, expect } from '@playwright/test';
import { createUserPayload } from '../../utils/user.factory';

test.describe('Create User', () => {

  test('deve cadastrar um usuário', async ({ request }) => {
    const user = createUserPayload();

    const response = await request.post('https://serverest.dev/usuarios', {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: user, // OS dados do usuário são enviados diretamente como objeto, sem stringificar através de utils/user.factory.js
    });

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body).toHaveProperty('message', 'Cadastro realizado com sucesso');
    expect(body).toHaveProperty('_id');

    console.log('Usuário criado com ID:', body._id);
  });
});