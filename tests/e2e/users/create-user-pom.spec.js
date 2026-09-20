// Utilizando o POM - Page Object Model - para separar a lógica da API do teste em si. A implementação da chamada da API do teste está na classe (CadastroPage).

import { test } from '@playwright/test';
import { createUserPayload } from '../../utils/user.factory.js';
import { CadastroPage } from '../../pages/cadastro.page.js';

test.describe('Create User - Positivo', () => {

  test('cadastro positivo - deve criar usuário com sucesso', async ({ page }) => {

    const usuario = createUserPayload();

    const cadastroPage = new CadastroPage(page);

    await cadastroPage.acessar();

    await cadastroPage.preencherCadastro(usuario);

    await cadastroPage.cadastrar();

    await cadastroPage.validarCadastroComSucesso();

    await cadastroPage.validarRedirecionamento();

    await cadastroPage.validarUsuarioLogado();

    await cadastroPage.fazerLogout();
  });

});

// npx playwright test tests/e2e/users/create-user-pom.spec.js