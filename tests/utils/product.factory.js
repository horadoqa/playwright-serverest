function createProductPayload() {
  return {
    nome: `Sticker_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
    preco: 10,
    descricao: 'Sticker do Hora do QA',
    quantidade: 50,
  };
}

module.exports = { createProductPayload };


