import { expect } from '@playwright/test';

export class CadastroPage {
  constructor(page) {
    this.page = page;

    this.nome = page.locator('[data-testid="nome"]');
    this.email = page.locator('[data-testid="email"]');
    this.password = page.locator('[data-testid="password"]');
    this.checkboxAdmin = page.locator('[data-testid="checkbox"]');
    this.botaoCadastrar = page.locator('[data-testid="cadastrar"]');
    this.logout = page.locator('[data-testid="logout"]');
  }

  async acessar() {
    await this.page.goto(
      'https://front.serverest.dev/cadastrarusuarios'
    );
  }

  async preencherCadastro(usuario) {
    await this.nome.fill(usuario.nome);
    await this.email.fill(usuario.email);
    await this.password.fill(usuario.password);

    if (usuario.administrador === 'true') {
      await this.checkboxAdmin.click();
    }
  }

  async cadastrar() {
    await this.botaoCadastrar.click();
  }

  async validarCadastroComSucesso() {
    await expect(
      this.page.locator('body')
    ).toContainText('Cadastro realizado com sucesso');
  }

  async validarRedirecionamento() {
    await this.page.waitForURL(/.*home/);
  }

  async validarUsuarioLogado() {
    await expect(this.logout).toBeVisible();
  }

  async fazerLogout() {
    await this.logout.click();
  }
}
