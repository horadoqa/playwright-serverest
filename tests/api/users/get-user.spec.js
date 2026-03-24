import { test, expect } from '@playwright/test';

test('deve listar usuários filtrando por email horadoqa', async ({ request }) => {
  const response = await request.get('https://serverest.dev/usuarios', {
    headers: {
      accept: 'application/json',
    },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body).toHaveProperty('usuarios');

  // filtra localmente
  const filteredUsers = body.usuarios.filter(user =>
    user.email.startsWith('horadoqa')
  );

  // valida
  filteredUsers.forEach(user => {
    expect(user.email.startsWith('horadoqa')).toBe(true);
  });

  console.log(`Usuários filtrados: ${filteredUsers.length}`);
});