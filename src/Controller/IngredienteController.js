const IngredientesRepositories = require('../Repositories/IngredientesRepositories');

class IngredienteController {
  async store(request, response) {
    const { name, unitmeasure, unitprice } = request.body;

    if (!name) {
      response.status(400).json({ error: 'Name is required!' });
    }

    const ingredientExists = await IngredientesRepositories.findByName(name);

    if (ingredientExists) {
      response.status(400).json({ error: 'This Ingredient is Already Exists' });
    }

    const ingredient = await IngredientesRepositories.create({
      name, unitmeasure, unitprice,
    });

    response.json(ingredient);
  }

  async index(request, response) {
    const rows = await IngredientesRepositories.findAll();
    response.json(rows);
  }

  async show(request, response) {
    const { id } = request.params;

    const ingredient = await IngredientesRepositories.findById(id);

    if (!ingredient) {
      return response.status(404).json({ error: 'Ingredient Not Found!' });
    }

    response.json(ingredient);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, unitmeasure, unitprice } = request.body;

    const ingredientExists = await IngredientesRepositories.findById(id);

    if (!ingredientExists) {
      return response.status(404).json({ error: 'Ingredient Not Found!' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const ingredientByName = await IngredientesRepositories.findByName(name);

    if (ingredientByName && ingredientByName.id !== id) {
      return response.status(400).json({ error: 'This name is already in use' });
    }

    const ingredient = await IngredientesRepositories.update(id, { name, unitmeasure, unitprice });

    response.json(ingredient);
  }

  async delete(request, response) {
    const { id } = request.params;

    await IngredientesRepositories.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new IngredienteController();