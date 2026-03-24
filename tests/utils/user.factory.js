export function createUserPayload() {
  return {
    nome: 'Hora do QA',
    email: `horadoqa_${Date.now()}@qa.com.br`,
    password: '1q2w3e4r',
    administrador: 'true',
  };
}

module.exports = { createUserPayload };