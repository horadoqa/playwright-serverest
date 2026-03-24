import { test, expect } from '@playwright/test';
import { createUserPayload } from '../../utils/user.factory';

test.describe('Create User - Positivo', () => {
  test('cadastro positivo - deve criar usuário com sucesso', async ({ page }) => {
    const usuario = createUserPayload();

    await page.goto('https://front.serverest.dev/cadastrarusuarios');

    await page.fill('[data-testid="nome"]', usuario.nome);
    await page.fill('[data-testid="email"]', usuario.email);
    await page.fill('[data-testid="password"]', usuario.password);

    // opcional: marcar como admin
    if (usuario.administrador === 'true') {
      await page.click('[data-testid="checkbox"]');
    }

    await page.click('[data-testid="cadastrar"]');

    // valida mensagem antes do redirect
    await expect(page.locator('body')).toContainText('Cadastro realizado com sucesso');

    // valida redirecionamento
    await page.waitForURL(/.*home/);

    // valida usuário logado
    await expect(page.locator('[data-testid="logout"]')).toBeVisible();

    // Logout
    await page.click('[data-testid="logout"]');
  });
});