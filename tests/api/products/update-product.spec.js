const { test, expect } = require('@playwright/test');
const { createUserPayload } = require('../../utils/user.factory');
const { createProductPayload } = require('../../utils/product.factory');

test('deve fazer o login, criar produto, atualizar produto e remover produto da base', async ({ request }) => {
  let userId;
  let token;
  let productId;

  try {
    // 1. Criar usuário
    const user = createUserPayload();

    const createUserResponse = await request.post('https://serverest.dev/usuarios', {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: user,
    });

    expect(createUserResponse.status()).toBe(201);

    const userBody = await createUserResponse.json();
    userId = userBody._id;

    console.log('👤 Usuário criado:', userId);

    // 2. Login
    const loginResponse = await request.post('https://serverest.dev/login', {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        email: user.email,
        password: user.password,
      },
    });

    expect(loginResponse.status()).toBe(200);

    const loginBody = await loginResponse.json();
    token = loginBody.authorization;

    console.log('🔐 Token obtido');

    // 3. Criar produto
    const product = createProductPayload();

    const createProductResponse = await request.post(
      'https://serverest.dev/produtos',
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token,
        },
        data: product,
      }
    );

    const responseBody = await createProductResponse.json();

    expect(createProductResponse.status()).toBe(201);
    expect(responseBody).toHaveProperty('_id');

    productId = responseBody._id;

    console.log('📦 Produto criado:', {
      nome: product.nome,
      productId,
      body: responseBody
    });

    // 4. Atualizar produto
    const updatedProductData = {
      nome: product.nome + ' - Atualizado',
      preco: product.preco + 10,
      descricao: product.descricao + ' (atualizada)',
      quantidade: product.quantidade + 5,
    };

    const updateProductResponse = await request.put(
      `https://serverest.dev/produtos/${productId}`,
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token,
        },
        data: updatedProductData,
      }
    );

    const updateResponseBody = await updateProductResponse.json();

    expect(updateProductResponse.status()).toBe(200);
    expect(updateResponseBody.message).toContain('Registro alterado com sucesso');

    console.log('✏️ Produto atualizado:', {
      nome: updatedProductData.nome,
      preco: updatedProductData.preco,
      descricao: updatedProductData.descricao,
      quantidade: updatedProductData.quantidade,
      body: updateResponseBody
    });

  } finally {

    // 4. Deletar produto + validar remoção
    if (productId) {
      const deleteProductResponse = await request.delete(
        `https://serverest.dev/produtos/${productId}`,
        {
          headers: {
            accept: 'application/json',
            Authorization: token,
          },
        }
      );

      expect(deleteProductResponse.status()).toBe(200);

      const deleteProductBody = await deleteProductResponse.json();

      console.log('Resposta delete produto:', deleteProductBody);

      // 🔥 valida que NÃO existe mais
      const getAfterDeleteResponse = await request.get(
        `https://serverest.dev/produtos/${productId}`,
        {
          headers: { accept: 'application/json' },
        }
      );

      const getAfterDeleteBody = await getAfterDeleteResponse.json();

      console.log('🔍 Produto após deleção:', getAfterDeleteBody);

      expect(getAfterDeleteResponse.status()).toBe(400);
      expect(getAfterDeleteBody.message).toContain('não encontrado');
    }

    // 5. Deletar usuário + validar remoção
    if (userId) {
      const deleteUserResponse = await request.delete(
        `https://serverest.dev/usuarios/${userId}`,
        {
          headers: { accept: 'application/json' },
        }
      );

      expect(deleteUserResponse.status()).toBe(200);

      const deleteUserBody = await deleteUserResponse.json();

      console.log('Resposta delete usuário:', deleteUserBody);

      // 🔥 valida que NÃO existe mais
      const getAfterDeleteResponse = await request.get(
        `https://serverest.dev/usuarios/${userId}`,
        {
          headers: { accept: 'application/json' },
        }
      );

      const getAfterDeleteBody = await getAfterDeleteResponse.json();

      console.log('🔍 Usuário após deleção:', getAfterDeleteBody);

      expect(getAfterDeleteResponse.status()).toBe(400);
      expect(getAfterDeleteBody.message).toContain('não encontrado');
    }
  }
});