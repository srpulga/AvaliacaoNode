const db = require('../database');

function checkIfValidUUID(str) {
  // Regular expression to check if string is a valid UUID
  const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  return regexExp.test(str);
}

class IngredientesRepositories {
  async create({
    name, unitmeasure, unitprice,
  }) {
    const [row] = await db.query(`
      INSERT INTO ingredient(name, unitmeasure, unitprice)
      VALUES($1, $2, $3)
      RETURNING *
    `, [name, unitmeasure, unitprice]);
    return row;
  }

  async findAll() {
    const rows = await db.query(`
    SELECT * FROM ingredient
    ORDER BY name
    `);
    return rows;
  }

  async findById(id) {
    if (checkIfValidUUID(id)) {
      const [row] = await db.query(`
      SELECT * FROM ingredient
      WHERE id = $1
      `, [id]);
      return row;
    }
    return undefined;
  }

  async findByName(name) {
    const [row] = await db.query(`
    SELECT * FROM ingredient
    WHERE name = $1
    `, [name]);
    return row;
  }

  async update(id, { name, unitmeasure, unitprice }) {
    if (checkIfValidUUID(id)) {
      const [row] = await db.query(`
      UPDATE ingredient
      SET name = $1, unitmeasure = $2, unitprice = $3
      WHERE id = $4
      RETURNING *
      `, [name, unitmeasure, unitprice, id]);
      return row;
    }

    return undefined;
  }

  async delete(id) {
    if (checkIfValidUUID(id)) {
      const deleteOp = await db.query(`
      DELETE FROM ingredient
      WHERE id = $1
      `, [id]);
      return deleteOp;
    }

    return undefined;
  }
}

module.exports = new IngredientesRepositories();