// Instale o Faker.js para gerar dados falsos de forma mais realista
// npm install -D @faker-js/faker


import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('Create User', () => {

    test('deve cadastrar um usuário', async ({ request }) => {

        const user = {
            nome: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password({ length: 10 }),
            administrador: 'true'
        };

        const response = await request.post(
            'https://serverest.dev/usuarios',
            {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                data: user
            }
        );

        expect(response.status()).toBe(201);

        const body = await response.json();

        expect(body).toHaveProperty(
            'message',
            'Cadastro realizado com sucesso'
        );

        expect(body).toHaveProperty('_id');

        console.log('Usuário criado com ID:', body._id);
    });

});

// npx playwright test tests/api/users/create-user-faker.spec.js