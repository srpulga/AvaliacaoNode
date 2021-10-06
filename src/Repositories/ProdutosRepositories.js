const db = require('../database');
// importando banco de dados

function checkIfValidUUID(str) {
  // Regular expression to check if string is a valid UUID
  const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  return regexExp.test(str);
}
class ProdutosRepositories {
  async create({
    name,
  }) {
    const [row] = await db.query(`
      INSERT INTO product(name)
      VALUES($1)
      RETURNING *
    `, [name]);
    return row;
  }

  async createIngredientsProduct(productid, ingredientid) {
    await db.query(`
      INSERT INTO ingredient_product(ingredient_id, product_id)
      VALUES($1, $2)

    `, [ingredientid, productid]);
    return true;
  }

  async getIngredientProduct(product_id) {
    console.log('SALVE');
    const rows = await db.query(`
      SELECT product.id AS product_id,
      product.name AS product_name,
      ingredient.id AS ingredient_id,
      ingredient.name AS ingredient_name,
      ingredient.unitprice AS unit_price
      FROM ingredient_product
      JOIN ingredient ON ingredient.id = ingredient_product.ingredient_id
      JOIN product ON product.id = ingredient_product.product_id
      WHERE product.id = $1
      `, [product_id]);
    console.log(rows);
    return rows;
  }

  // Lista todos os produtos listados pelo nome, como não tem nenhuma validação ele puxa sempre por ordem ASC ("crescente"), nesse caso de A a Z
  async findAll() {
    const rows = await db.query(`
    SELECT product.id AS product_id,
    product.name AS product_name,
    ingredient.id AS ingredient_id,
    ingredient.name AS ingredient_name,
    ingredient.unitprice AS unit_price
    FROM ingredient_product
    JOIN ingredient ON ingredient.id = ingredient_product.ingredient_id
    JOIN product ON product.id = ingredient_product.product_id
    ORDER BY product.name
    `);
    return rows;
  }

  // Seleciona todos onde o id na tabela é igual ao id do corpo
  async findById(id) {
    if (checkIfValidUUID(id)) {
      const rows = await db.query(`
      SELECT product.id AS product_id,
      product.name AS product_name,
      ingredient.id AS ingredient_id,
      ingredient.name AS ingredient_name,
      ingredient.unitprice AS unit_price
      FROM ingredient_product
      JOIN ingredient ON ingredient.id = ingredient_product.ingredient_id
      JOIN product ON product.id = ingredient_product.product_id
      WHERE product.id = $1
    `, [id]);
      return rows;
    }
    return undefined;
  }

  // seleciona todos onde o nome na tabela é igual ao nome do corpo
  async findByName(name) {
    const [row] = await db.query(`
      SELECT * FROM product
      WHERE name = $1
    `, [name]);
    return row;
  }

  async update(id, name) {
    const [row] = await db.query(`
      UPDATE product
      SET name = $1
      WHERE id = $2
      RETURNING *
    `, [name, id]);
    return row;
  }

  async removeIngredientsInProductId(id) {
    await db.query(`
      DELETE FROM ingredient_product WHERE product_id = $1
    `, [id]);
    return true;
  }

  async delete(id) {
    if (checkIfValidUUID(id)) {
      const deleteOp = await db.query(`
      DELETE FROM ingredient_product WHERE product_id = $1
      `, [id]);
      return deleteOp;
    }

    return undefined;
  }
}

module.exports = new ProdutosRepositories();