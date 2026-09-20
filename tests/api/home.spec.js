import { test, expect } from '@playwright/test';

test.describe('ServeRest', () => {

  test('deve carregar a aplicação corretamente', async ({ page, request }) => {

    // 🔌 valida backend
    const response = await request.get('https://serverest.dev/');
    expect(response.status()).toBe(200);

    // 🌐 valida frontend
    await page.goto('https://serverest.dev/');
    await expect(page).toHaveTitle(/ServeRest/i);

  });

});