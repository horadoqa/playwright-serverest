import { test, expect } from '@playwright/test';
import { createUserPayload } from '../../utils/user.factory';

let usuario;

test.beforeEach(async ({ request }) => {
  usuario = createUserPayload();

  await request.post('https://serverest.dev/usuarios', {
    data: usuario
  });
});

test('login positivo - deve realizar login com sucesso', async ({ page }) => {
  await page.goto('https://front.serverest.dev/login');

  await page.fill('[data-testid="email"]', usuario.email);
  await page.fill('[data-testid="senha"]', usuario.password);

  await Promise.all([
    page.waitForURL(/.*home/),
    page.click('[data-testid="entrar"]'),
  ]);

  // validações

  await expect(page.locator('[data-testid="logout"]')).toBeVisible();
  await expect(page).toHaveURL(/.*home/);
  await expect(page.locator('[data-testid="cadastrarProdutos"]')).toBeVisible();

  // 6. Logout
  await page.click('[data-testid="logout"]');
});