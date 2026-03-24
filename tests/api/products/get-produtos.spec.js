import { test, expect } from '@playwright/test';

test('deve listar todos os produtos', async ({ request }) => {
  const response = await request.get('https://serverest.dev/produtos');
  const body = await response.json();

  // valida status
  expect(response.status()).toBe(200);

  // valida estrutura
  expect(body).toHaveProperty('produtos');
  expect(Array.isArray(body.produtos)).toBe(true);

  // valida que há produtos
  expect(body.produtos.length).toBeGreaterThan(0);

  console.log('----------------------------------------------------------')
  
  console.log(`📦 Total de produtos listados: ${body.produtos.length}`);

  console.log('----------------------------------------------------------')

  // valida campos de um produto
  const produto = body.produtos[0];

  expect(produto).toHaveProperty('nome');
  expect(produto).toHaveProperty('preco');
  expect(produto).toHaveProperty('descricao');
  expect(produto).toHaveProperty('quantidade');

  console.log('Primeiro produto:', produto);
  
  console.log('----------------------------------------------------------')
  
  console.log('Primeiros 3 produtos:', body.produtos.slice(0, 3));

  // console.log('Primeiros 3 produtos:');
  // console.table(body.produtos.slice(0, 3));

});