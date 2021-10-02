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

  async update(request, response) {
    const { id } = request.params;
    const {
      name, price, ingredient_id,
    } = request.body;

    const productExists = await ProdutosRepositories.findById(id);

    if (!productExists) {
      return response.status(404).json({ error: 'Product Not Found!' }); // Se o nome já existir, não continua
    }

    if (!name) {
      response.status(404).json({ error: 'Name is Required!' }); // Se não tiver o nome, não continua
    }

    const productByName = await ProdutosRepositories.findByName(name);

    if (productByName && productByName.id !== id) {
      return response.status(400).json({ error: 'This Name is Already in Use!' }); // se ja tiver um produto com esse nome, não pode atualizar
    }

    const product = await ProdutosRepositories.update(id, {
      name, price, ingredient_id,
    });

    response.json(product);
  }

  async delete(request, response) {
    const { id } = request.params;

    await ProdutosRepositories.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new ProdutoController();