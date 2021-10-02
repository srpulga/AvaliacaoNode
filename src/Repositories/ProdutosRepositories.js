const db = require('../database');
// importando banco de dados
class ProdutosRepositories {
  async create({
    name, price, ingredient_id,
  }) {
    const [row] = await db.query(`
      INSERT INTO product(name, price, ingredient_id)
      VALUES($1, $2, $3)
      RETURNING *
    `, [name, price, ingredient_id]);
    return row;
  }

  // Lista todos os produtos listados pelo nome, como não tem nenhuma validação ele puxa sempre por ordem ASC ("crescente"), nesse caso de A a Z
  async findAll() {
    const rows = await db.query(`
      SELECT *
      FROM product
      ORDER BY name
    `);
    return rows;
  }

  // Seleciona todos onde o id na tabela é igual ao id do corpo
  async findById(id) {
    const [row] = await db.query(`
      SELECT * FROM product
      WHERE id = $1
    `, [id]);
    return row;
  }

  // seleciona todos onde o nome na tabela é igual ao nome do corpo
  async findByName(name) {
    const [row] = await db.query(`
      SELECT * FROM product
      WHERE name = $1
    `, [name]);
    return row;
  }

  update() {}

  delete() {}
}

module.exports = new ProdutosRepositories();