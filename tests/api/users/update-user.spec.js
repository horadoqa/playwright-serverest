import { test, expect } from '@playwright/test';
import { createUserPayload } from '../../utils/user.factory';

test.describe('Update User', () => {
  test('deve criar, atualizar e deletar um usuário', async ({ request }) => {
    let userId;

    try {
      // 1. Criar usuário
      const user = createUserPayload();

      const createResponse = await request.post('https://serverest.dev/usuarios', {
        data: user,
      });

      expect(createResponse.status()).toBe(201);

      const createBody = await createResponse.json();
      userId = createBody._id;

      console.log({
        etapa: 'criação',
        nome: user.nome,
        email: user.email,
        id: userId,
        mensagem: createBody.message
      });

      // 🔍 VALIDAR CRIAÇÃO COM GET
      const getCreated = await request.get(`https://serverest.dev/usuarios/${userId}`);
      const getCreatedBody = await getCreated.json();

      expect(getCreatedBody.nome).toBe(user.nome);
      expect(getCreatedBody.email).toBe(user.email);

      // 2. Atualizar usuário
      const updatedUser = {
        ...user,
        nome: `${user.nome} Atualizado`,
        email: `horadoqa_alterado_${Date.now()}@qa.com.br`,
      };

      const updateResponse = await request.put(
        `https://serverest.dev/usuarios/${userId}`,
        {
          data: updatedUser,
        }
      );

      expect(updateResponse.status()).toBe(200);

      const updateBody = await updateResponse.json();

      expect(updateBody).toHaveProperty(
        'message',
        'Registro alterado com sucesso'
      );

      console.log({
        etapa: 'atualização',
        nome: updatedUser.nome,
        email: updatedUser.email,
        mensagem: updateBody.message
      });

      // 🔍 VALIDAR UPDATE COM GET
      const getUpdated = await request.get(`https://serverest.dev/usuarios/${userId}`);
      const getUpdatedBody = await getUpdated.json();

      expect(getUpdatedBody.nome).toBe(updatedUser.nome);
      expect(getUpdatedBody.email).toBe(updatedUser.email);

    } finally {
      // 3. Deletar usuário
      if (userId) {
        const deleteResponse = await request.delete(
          `https://serverest.dev/usuarios/${userId}`
        );

        expect(deleteResponse.status()).toBe(200);

        const deleteBody = await deleteResponse.json();

        expect(deleteBody).toHaveProperty(
          'message',
          'Registro excluído com sucesso'
        );

        console.log({
          etapa: 'deleção',
          id: userId,
          mensagem: deleteBody.message
        });

        // 🔍 VALIDAR EXCLUSÃO
        const getResponse = await request.get(
          `https://serverest.dev/usuarios/${userId}`
        );

        expect(getResponse.status()).toBe(400);

        const getBody = await getResponse.json();

        expect(getBody).toHaveProperty('message');
        expect(getBody.message.toLowerCase()).toContain('não encontrado');

        console.log({
          etapa: 'validação exclusão',
          id: userId,
          mensagem: getBody.message
        });
      }
    }
  });
});