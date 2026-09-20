// A implementação da chamada da API do teste está na classe (UsuariosPage).

import { test, expect } from '@playwright/test';
import { createUserPayload } from '../../utils/user.factory.js';
import { UsuariosPage } from '../../pages/user.page.js';

test.describe('Create User - API Object', () => {

  test('deve cadastrar um usuário', async ({ request }) => {

    const usuariosPage = new UsuariosPage(request);

    const user = createUserPayload();

    const response = await usuariosPage.criarUsuario(user);

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

//npx playwright test tests/api/users/create-user-api.spec.js
