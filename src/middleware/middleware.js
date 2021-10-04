const jwt = require('jsonwebtoken');

class Middleware {
  verifyJWT(request, response, next) {
    let token;
    if (request.headers.authorization) {
      token = request.headers.authorization.split(' ')[1]; // Extrai o Bearer Token
    }

    if (!token) return response.status(401).json({ auth: false, message: 'No token provided.' }); // Valida se conseguiu extrair o Token

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) return response.status(500).json({ auth: false, message: 'Failed to authenticate token.' }); // Valida se o token é valido ou não

      // se tudo estiver ok, salva no request para uso posterior
      request.userId = decoded.id;
      next();
    });
  }
}

module.exports = new Middleware();