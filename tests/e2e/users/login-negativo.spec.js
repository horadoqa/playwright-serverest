import { test, expect } from '@playwright/test';

test.describe('Login negativo', () => {

  test('não deve logar com email inválido', async ({ page }) => {
    await page.goto('https://front.serverest.dev/login');

    await page.fill('[data-testid="email"]', 'email@invalido.com');
    await page.fill('[data-testid="senha"]', '123456');

    await page.click('[data-testid="entrar"]');

    // valida erro
    await expect(page.locator('body')).toContainText('Email e/ou senha inválidos');

    // valida que NÃO redirecionou
    await expect(page).toHaveURL(/.*login/);
  });

  test('não deve logar com senha inválida', async ({ page, request }) => {
    // cria usuário válido
    const usuario = {
      nome: 'Teste',
      email: `teste_${Date.now()}@qa.com`,
      password: '123456',
      administrador: 'true'
    };

    await request.post('https://serverest.dev/usuarios', {
      data: usuario
    });

    await page.goto('https://front.serverest.dev/login');

    await page.fill('[data-testid="email"]', usuario.email);
    await page.fill('[data-testid="senha"]', 'senha_errada');

    await page.click('[data-testid="entrar"]');

    await expect(page.locator('body')).toContainText('Email e/ou senha inválidos');
    await expect(page).toHaveURL(/.*login/);
  });

  test('não deve logar com campos vazios', async ({ page }) => {
    await page.goto('https://front.serverest.dev/login');

    await page.click('[data-testid="entrar"]');

    // validações de campos obrigatórios
    await expect(page.locator('body')).toContainText('Email é obrigatório');
    await expect(page.locator('body')).toContainText('Password é obrigatório');
  });

});