module.exports = class Produto {
  constructor(nome, imagem, preco, ingrediente) {
    this.nome = nome;
    this.imagem = imagem;
    this.preco = preco;
    this.igredientes = ingrediente;
  }
};