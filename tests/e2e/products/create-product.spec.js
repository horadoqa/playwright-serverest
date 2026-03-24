import { test, expect } from '@playwright/test';
import { createUserPayload } from '../../utils/user.factory';
import { createProductPayload } from '../../utils/product.factory';

test.describe('Create Product', () => {

  test('deve criar um produto com sucesso', async ({ page, request }) => {
    // 1. Criar usuário via API
    const usuario = createUserPayload();

    const userResponse = await request.post('https://serverest.dev/usuarios', {
      data: usuario
    });

    expect(userResponse.status()).toBe(201);

    // 2. Login
    await page.goto('https://front.serverest.dev/login');

    await page.fill('[data-testid="email"]', usuario.email);
    await page.fill('[data-testid="senha"]', usuario.password);

    await Promise.all([
      page.waitForURL(/.*home/),
      page.click('[data-testid="entrar"]'),
    ]);

    // 3. Ir para cadastro
    await page.click('[data-testid="cadastrarProdutos"]');
    await expect(page).toHaveURL(/.*cadastrarprodutos/);

    // 4. Criar produto
    const produto = createProductPayload();

    await page.fill('[data-testid="nome"]', produto.nome);
    await page.fill('[data-testid="preco"]', produto.preco.toString());
    await page.fill('[data-testid="descricao"]', produto.descricao);
    await page.fill('[data-testid="quantity"]', produto.quantidade.toString());

    // 📸 upload da imagem
    await expect(page.locator('[data-testid="imagem"]')).toBeVisible();

    await page.setInputFiles(
      '[data-testid="imagem"]',
      'tests/e2e/products/logo.png'
    );

    // submit
    await Promise.all([
      page.waitForURL(/.*listarprodutos/),
      page.click('[data-testid="cadastarProdutos"]'),
    ]);

    // 5. Validações
    await expect(page).toHaveURL(/.*listarprodutos/);

    const tabela = page.locator('table');
    await expect(tabela).toBeVisible();

    await expect(tabela).toContainText(produto.nome);
    await expect(tabela).toContainText(produto.preco.toString());

    // 6. Logout
    await page.click('[data-testid="logout"]');
  });

});