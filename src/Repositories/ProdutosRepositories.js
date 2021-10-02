const db = require('../database');
// importando banco de dados

function checkIfValidUUID(str) {
  // Regular expression to check if string is a valid UUID
  const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  return regexExp.test(str);
}
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
      SELECT * FROM product
      ORDER BY name
    `);
    return rows;
  }

  // Seleciona todos onde o id na tabela é igual ao id do corpo
  async findById(id) {
    if (checkIfValidUUID(id)) {
      const [row] = await db.query(`
      SELECT * FROM product
      WHERE id = $1
    `, [id]);
      return row;
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

  async update(id, {
    name, price, ingredient_id,
  }) {
    const [row] = await db.query(`
      UPDATE product
      SET name = $1, price = $2, ingredient_id = $3
      WHERE id = $4
      RETURNING *
    `, [name, price, ingredient_id, id]);
    return row;
  }

  async delete(id) {
    if (checkIfValidUUID(id)) {
      const deleteOp = await db.query(`
      DELETE FROM product
      WHERE id = $1
      `, [id]);
      return deleteOp;
    }

    return undefined;
  }
}

module.exports = new ProdutosRepositories();