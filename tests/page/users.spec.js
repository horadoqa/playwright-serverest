import { test, expect } from '@playwright/test';

test.describe('ServeRest', () => {

    test('deve listar usuários com sucesso', async ({ request }) => {

        const response = await request.get('https://serverest.dev/usuarios');

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.quantidade).toBeGreaterThan(0);
        expect(body.usuarios[0]).toHaveProperty('email');

        expect(body).toMatchObject({
            quantidade: expect.any(Number),
            usuarios: expect.any(Array),
        });

    });

});