import { test, expect } from '@playwright/test';
import { createUserPayload } from '../../utils/user.factory';
import { createProductPayload } from '../../utils/product.factory';

test('deve criar, deletar produto e fazer logout', async ({ page, request }) => {
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

  await expect(page.locator('[data-testid="imagem"]')).toBeVisible();

  await page.setInputFiles(
    '[data-testid="imagem"]',
    'tests/e2e/products/logo.png'
  );

  await Promise.all([
    page.waitForURL(/.*listarprodutos/),
    page.click('[data-testid="cadastarProdutos"]'),
  ]);

  // 5. Validação
  const tabela = page.locator('table');
  await expect(tabela).toBeVisible();
  await expect(tabela).toContainText(produto.nome);

  // 6. 🗑️ Deletar produto
  const linhaProduto = page.locator('tr', {
    hasText: produto.nome
  });

  await expect(linhaProduto).toBeVisible();

  // botão excluir dentro da linha
  await linhaProduto.locator('button').filter({
    hasText: 'Excluir'
  }).click();

  // validar remoção
  await expect(tabela).not.toContainText(produto.nome);

  // 7. Logout
  await page.click('[data-testid="logout"]');
  await expect(page).toHaveURL(/.*login/);
});


// npx playwright test tests/e2e/products/delete-product.spec.js