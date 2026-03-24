function createUserPayload() {
  return {
    nome: 'Fulano da Silva',
    email: `horadoqa_${Date.now()}@qa.com.br`,
    password: 'teste',
    administrador: 'true',
  };
}

module.exports = { createUserPayload };