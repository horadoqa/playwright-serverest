import { test, expect } from '@playwright/test';
import { createUserPayload } from '../../utils/user.factory';

test.describe('Get User by ID', () => {

  test('deve criar, buscar por ID e deletar um usuário', async ({ request }) => {
    let userId;
    let user;

    try {
      // 1. Criar usuário
      user = createUserPayload();

      const createResponse = await request.post('https://serverest.dev/usuarios', {
        data: user,
      });

      expect(createResponse.status()).toBe(201);

      const createBody = await createResponse.json();

      expect(createBody).toHaveProperty('_id');
      userId = createBody._id;

      // 2. Buscar usuário por ID
      const getResponse = await request.get(
        `https://serverest.dev/usuarios/${userId}`
      );

      expect(getResponse.status()).toBe(200);

      const getBody = await getResponse.json();

      expect(getBody).toEqual(
        expect.objectContaining({
          _id: userId,
          email: user.email,
          nome: user.nome,
        })
      );

    } finally {
      if (userId) {
        const checkResponse = await request.get(
          `https://serverest.dev/usuarios/${userId}`
        );

        if (checkResponse.status() === 200) {
          const deleteResponse = await request.delete(
            `https://serverest.dev/usuarios/${userId}`
          );

          const deleteBody = await deleteResponse.json();

          if (deleteBody.message !== 'Registro excluído com sucesso') {
            console.warn('⚠️ Cleanup não removeu usuário:', deleteBody.message);
          }
        }
      }
    }
  });

});