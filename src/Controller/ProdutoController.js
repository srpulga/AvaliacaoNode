const ProdutosRepositories = require('../Repositories/ProdutosRepositories');

class ProdutoController {
  // Criar um Produto
  async store(request, response) {
    const {
      name, price, ingredient_id,
    } = request.body; // desestruturando corpo da requisição

    if (!name) {
      response.status(400).json({ error: 'Name is required!' }); // Se não tiver o nome, não continua
    }

    const productExists = await ProdutosRepositories.findByName(name);

    if (productExists) {
      return response.status(400).json({ error: 'This name is already in use!' }); // Se o nome já existir, não continua
    }

    const product = await ProdutosRepositories.create({
      name, price, ingredient_id,
    }); // passa o nome, imagem, preço e ingrediente id capturados do body como parametro para o método create

    response.json(product);
  }

  async index(request, response) {
    const products = await ProdutosRepositories.findAll();
    response.json(products);
  }

  async show(request, response) {
    const { id } = request.params;

    const product = await ProdutosRepositories.findById(id);

    if (!product) {
      return response.status(404).json({ error: 'Product Not Found!' });
    }

    response.json(product);
  }

  update() {}

  delete() {}
}

module.exports = new ProdutoController();