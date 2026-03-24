import { test, expect } from '@playwright/test';

test('não deve cadastrar usuário com email já existente', async ({ page }) => {
  await page.goto('https://front.serverest.dev/cadastrarusuarios');

  const email = 'fulano@qa.com';

  await page.fill('[data-testid="nome"]', 'Teste');
  await page.fill('[data-testid="email"]', email);
  await page.fill('[data-testid="password"]', '123456');

  await page.click('[data-testid="cadastrar"]');

  await expect(page.locator('body')).toContainText('Este email já está sendo usado');
});