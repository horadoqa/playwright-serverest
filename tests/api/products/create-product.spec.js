import { test, expect } from '@playwright/test';
import { createUserPayload } from '../../utils/user.factory';
import { createProductPayload } from '../../utils/product.factory';

test.describe('Create Product', () => {

    test('deve criar produto autenticado com usuário', async ({ request }) => {
        let userId;
        let token;

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

            // 3. Criar produto (requer auth)
            const product = createProductPayload();

            // console.log('Produto enviado:', product.nome);

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
            // console.log('Resposta da API:', responseBody);

            expect(createProductResponse.status()).toBe(201);

            expect(responseBody).toHaveProperty('_id');

            // console.log('Produto criado com ID:', responseBody._id);

            console.log(`📦 Informações sobre o Produto:`);
            console.log({
                nome: product.nome,
                status: createProductResponse.status(),
                body: responseBody
            });

        } finally {
            // 4. Deletar usuário
            if (userId) {
                const deleteUserResponse = await request.delete(
                    `https://serverest.dev/usuarios/${userId}`,
                    {
                        headers: {
                            accept: 'application/json',
                        },
                    }
                );

                expect(deleteUserResponse.status()).toBe(200);

                const deleteUserBody = await deleteUserResponse.json();

                console.log('Resposta delete usuário:', deleteUserBody);

                // Validar ausência
                const getAfterDeleteResponse = await request.get(
                    `https://serverest.dev/usuarios/${userId}`,
                    {
                        headers: { accept: 'application/json' },
                    }
                );

                const getAfterDeleteBody = await getAfterDeleteResponse.json();

                console.log('🔍 Usuário após deleção:', getAfterDeleteBody);

                expect(getAfterDeleteResponse.status()).toBe(400);
            }
        }
    });

});