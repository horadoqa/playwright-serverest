import { APIRequestContext } from '@playwright/test';

export class UsuariosPage {
  constructor(request) {
    this.request = request;
  }

  async criarUsuario(user) {
    return await this.request.post(
      'https://serverest.dev/usuarios',
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: user,
      }
    );
  }
}

