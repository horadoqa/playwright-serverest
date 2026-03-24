# 🎭 playwright-serverest

> Projeto de automação de testes utilizando **Playwright** para validar a API e o frontend do Serverest.

---

## 👨‍💻 Autor

Projeto criado por **Ricardo Fahham**.

---

## 📌 Objetivo

Este projeto tem como finalidade:

* Validar endpoints da API (testes de contrato e integração)
* Validar fluxos do usuário no frontend (E2E)
* Servir como base de estudo e evolução em automação de testes

---

## 📂 Estrutura do Projeto

```bash
tree ./tests
./tests
├── api
│   ├── products
│   │   ├── create-product.spec.js
│   │   ├── delete-product.spec.js
│   │   ├── get-product-id.spec.js
│   │   ├── get-produtos.spec.js
│   │   └── update-product.spec.js
│   └── users
│       ├── create-user.spec.js
│       ├── delete-user.spec.js
│       ├── get-id.spec.js
│       ├── get-user.spec.js
│       ├── login.spec.js
│       └── update-user.spec.js
├── data
├── e2e
│   ├── pages
│   │   ├── products.page.js
│   │   └── users.page.js
│   ├── products
│   │   ├── create-product.spec.js
│   │   ├── delete-product.spec.js
│   │   ├── get-product.spec.js
│   │   ├── logo.png
│   │   └── update-product.spec.js
│   └── users
│       ├── create-user-negativo.spec.js
│       ├── create-user-positivo.spec.js
│       ├── login-negativo.spec.js
│       └── login-positivo.spec.js
├── fixtures
│   ├── products.fixture.js
│   └── users.fixture.js
├── page
│   └── servetest.spec.js
└── utils
    ├── api-client.js
    ├── helpers.js
    ├── product.factory.js
    └── user.factory.js
```

---

## ⚙️ Setup do Projeto

### 1. Instalar dependências

```bash
npm install
```

### 2. Inicializar Playwright (caso necessário)

```bash
npm init playwright@latest
```

---

## 🚀 Executando os Testes

### ▶️ Rodar todos os testes

```bash
npx playwright test
```

---

### 🔌 Rodar apenas testes de API

```bash
npx playwright test tests/api
```

---

### 🌐 Rodar apenas testes E2E

```bash
npx playwright test tests/e2e
```

---

### 📋 Listar testes disponíveis

```bash
npx playwright test --list
```

---

### 📊 Visualizar relatório

```bash
npx playwright show-report
```

---

## 🧰 Uso do Makefile (Menu Interativo)

Este projeto possui um **menu interativo via Makefile** para facilitar a execução dos testes.

### ▶️ Executar o menu:

```bash
make help
```

### 📌 Opções disponíveis:

```
=====================================
        🚀 PLAYWRIGHT MENU
=====================================

1 - Rodar TODOS os testes
2 - Testes de API
3 - Testes E2E
4 - API - Users
5 - API - Products
6 - E2E - Users
7 - E2E - Products
0 - Sair
```

---

## 🌿 Branches do Projeto

* `main` → versão principal
* `users` → foco em testes de usuários
* `products` → foco em testes de produtos

### 🔀 Trocar de branch

```bash
git switch users
```

---

## 🤝 Contribuindo com o Projeto

Contribuições são muito bem-vindas! 🚀

### 📌 Como contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature ou correção:

   ```bash
   git checkout -b minha-feature
   ```
3. Faça suas alterações
4. Commit suas mudanças:

   ```bash
   git commit -m "feat: minha nova feature"
   ```
5. Envie para o repositório remoto:

   ```bash
   git push origin minha-feature
   ```
6. Abra um Pull Request

---

### ✅ Boas práticas

* Siga o padrão de organização existente
* Utilize nomes descritivos para testes
* Mantenha testes independentes
* Evite duplicação de código (use fixtures/utils)

---

## 🧠 Dicas

* Prefira `data-testid` para seletores no E2E
* Utilize factories para geração de dados dinâmicos
* Separe bem testes de API e UI
* Use `expect` de forma clara e objetiva

---

## 📬 Contato

Caso tenha dúvidas ou sugestões, fique à vontade para contribuir ou abrir uma issue.

---

🚀 **Bons testes!**
