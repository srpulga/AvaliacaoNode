const express = require('express');
const ProdutosRepositories = require('../Repositories/ProdutosRepositories');

class ProdutoController {
  // Criar um Produto
  async store(request, response) {
    const {
      name, price, ingredient, imageType, imageName, imageData,
    } = request.body; // desestruturando corpo da requisição

    if (!name) {
      response.sendStatus(404).json({ error: 'Name is required!' }); // Se não tiber o nome, não continua
    }

    const productExists = await ProdutosRepositories.findByName(name);

    if (productExists) {
      return response.sendStatus(400).json({ error: 'This name is already in use!' }); // Se o nome já existir, não continua
    }

    const product = await ProdutosRepositories.create({
      name, price, ingredient, imageType, imageName, imageData,
    }); // passa o nome, imagem, preço e ingrediente capturados do body como parametro para o método create

    response.json(product);
  }

  index() {}

  show() {}

  update() {}

  delete() {}
}

module.exports = new ProdutoController();