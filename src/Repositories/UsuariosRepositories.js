const db = require('../database');

class UsuariosRepositories {
  async create({ name, email, senha }) {
    const [row] = await db.query(`
      INSERT INTO users (name, email, senha)
      VALUES ($1, $2, $3)
      RETURNING *
    `, [name, email, senha]);
    return row;
  }

  async findAll() {
    const rows = await db.query(`
      SELECT * FROM users
      ORDER BY name
    `);
    return rows;
  }

  async findByEmail(email) {
    const [row] = await db.query(`
    SELECT * FROM users
    WHERE email = $1
  `, [email]);
    return row;
  }

  async findByLogin(email, senha) {
    const row = await db.query(`
    SELECT * FROM users
    WHERE email = $1 AND senha = $2
  `, [email, senha]);
    return row[0];
  }
}

module.exports = new UsuariosRepositories();