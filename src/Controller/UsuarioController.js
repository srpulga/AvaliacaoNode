// const bcrypt = require('bcrypt'); // Biblioteca para criptografas senha
const jwt = require('jsonwebtoken');
const UsuarioRepositories = require('../Repositories/UsuariosRepositories');
require('dotenv-safe').config();

class UsuarioController {
  async login(request, response, next) {
    const { email, senha } = request.body;

    const findUser = await UsuarioRepositories.findByLogin(email, senha);

    if (findUser) {
      const { id } = findUser;

      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 300, // expires in 5min
      });
      return response.json({ auth: true, token });
    }
  }

  async store(request, response) {
    const { name, email, senha } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required!' });
    }

    const userExists = await UsuarioRepositories.findByEmail(email);

    if (userExists) {
      return response.status(400).json({ error: 'This E-mail is Already in Use!' });
    }

    const user = await UsuarioRepositories.create({
      name, email, senha,
    });

    response.json(user);
  }

  async index(request, response) {
    const users = await UsuarioRepositories.findAll();
    response.json(users);
  }
}

module.exports = new UsuarioController();