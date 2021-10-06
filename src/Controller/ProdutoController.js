const ProdutosRepositories = require('../Repositories/ProdutosRepositories');

class ProdutoController {
  // Criar um Produto
  async store(request, response) {
    const {
      name, ingredients_id,
    } = request.body; // desestruturando corpo da requisição

    if (!name) {
      response.status(400).json({ error: 'Name is required!' }); // Se não tiver o nome, não continua
    }

    const productExists = await ProdutosRepositories.findByName(name);

    if (productExists) {
      return response.status(400).json({ error: 'This name is already in use!' }); // Se o nome já existir, não continua
    }

    const product = await ProdutosRepositories.create({
      name,
    });

    await ingredients_id.forEach(async (ingredient) => {
      await ProdutosRepositories.createIngredientsProduct(product.id, ingredient); // Vai gravar na tabela de relacionamento
    });

    const ingredientProduct = await ProdutosRepositories.getIngredientProduct(product.id); // Pega tablea de relacionamento

    const productObject = { // Objeto dinamico para receber as infos do produto
      id: product.id,
      name: product.name,
      ingredients: [],
    };

    let total = 0; // let para pegar a soma de todos os ingredientes para definir o valor total do produto

    ingredientProduct.forEach((ingredient) => { // pegando todos os ingredientes do produto
      const price = Number(ingredient.unit_price); // converter de string para number
      total += price; // para cada unit_price add no total

      const ingredientObject = {
        id: ingredient.ingredient_id,
        name: ingredient.ingredient_name,
        unit_price: price,
      };

      productObject.ingredients.push(ingredientObject); // serve para adicionar um valor dentro de uma lista
    });

    productObject.product_price = total; // defino o valor total do product

    response.json(productObject); // retorna o produtoObject
  }

  async index(request, response) {
    const products = await ProdutosRepositories.findAll();

    const productsIdAdded = [];
    const listProducts = [];

    // varre a lista de produtos que retornou da base
    products.forEach((element) => {
      // valida se teve algum produto id já adicionado na lista de produtos
      if (productsIdAdded.indexOf(element.product_id) === -1) {
        // agrupa os ingredientes do mesmo produto
        const ingredientsProduct = products.filter((elementFIlter) => elementFIlter.product_id === element.product_id);
        const productObject = {
          id: element.product_id,
          name: element.product_name,
          ingredients: [],
        };

        let total = 0;
        // Varre todos os ingredientes do produto
        ingredientsProduct.forEach((ingredient) => {
          const price = Number(ingredient.unit_price);
          total += price;
          productObject.ingredients.push({
            id: ingredient.ingredient_id,
            name: ingredient.ingredient_name,
            price: ingredient.unit_price,
          });
        });

        productObject.total = total;
        // Informa para a lista de de id's de produtos adicionados para que não insira o mesmo produto
        productsIdAdded.push(element.product_id);
        listProducts.push(productObject);
      }
    });

    response.json(listProducts);
  }

  async show(request, response) {
    const { id } = request.params;

    const productIngredients = await ProdutosRepositories.findById(id);
    let productInsert = false;
    let productObject;

    if (!productIngredients) {
      return response.status(404).json({ error: 'Product Not Found!' });
    }
    productIngredients.forEach((element) => {
      if (!productInsert) {
        productObject = {
          id: element.product_id,
          name: element.product_name,
          ingredients: [],
        };
        productInsert = true;
      }

      productObject.ingredients.push({
        id: element.ingredient_id,
        name: element.ingredient_name,
        price: element.unit_price,
      });
    });

    response.json(productObject);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name, ingredients_id,
    } = request.body;

    const productExists = await ProdutosRepositories.findById(id);

    if (!productExists) {
      return response.status(404).json({ error: 'Product Not Found!' }); // Se o nome já existir, não continua
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is Required!' }); // Se não tiver o nome, não continua
    }

    const productByName = await ProdutosRepositories.findByName(name);

    if (productByName && productByName.id !== id) {
      return response.status(400).json({ error: 'This Name is Already in Use!' }); // se ja tiver um produto com esse nome, não pode atualizar
    }

    const product = await ProdutosRepositories.update(id, name);

    await ProdutosRepositories.removeIngredientsInProductId(id);

    await ingredients_id.forEach(async (element) => {
      await ProdutosRepositories.createIngredientsProduct(id, element); // Vai gravar na tabela de relacionamento
    });

    const ingredientProduct = await ProdutosRepositories.getIngredientProduct(id); // Pega tablea de relacionamento

    const productObject = { // Objeto dinamico para receber as infos do produto
      id: product.id,
      name: product.name,
      ingredients: [],
    };

    let total = 0; // let para pegar a soma de todos os ingredientes para definir o valor total do produto

    ingredientProduct.forEach((ingredient) => { // pegando todos os ingredientes do produto
      const price = Number(ingredient.unit_price); // converter de string para number
      total += price; // para cada unit_price add no total

      const ingredientObject = {
        id: ingredient.ingredient_id,
        name: ingredient.ingredient_name,
        unit_price: price,
      };

      productObject.ingredients.push(ingredientObject); // serve para adicionar um valor dentro de uma lista
    });

    productObject.total = total;

    response.json(productObject);
  }

  async delete(request, response) {
    const { id } = request.params;

    await ProdutosRepositories.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new ProdutoController();