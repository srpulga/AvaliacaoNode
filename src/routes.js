const { Router } = require('express'); // criar manipuladores de rota modulares e montáveis

const IngredienteController = require('./Controller/IngredienteController');
const ProdutoController = require('./Controller/ProdutoController');
const UsuarioController = require('./Controller/UsuarioController');
const middleware = require('./middleware/middleware');

const router = Router();

router.post('/produto', middleware.verifyJWT, ProdutoController.store); // Criar um produto
router.get('/produto', middleware.verifyJWT, ProdutoController.index); // Listar produtos
router.get('/produto/:id', middleware.verifyJWT, ProdutoController.show); // Listar um produto pelo id
router.put('/produto/:id', middleware.verifyJWT, ProdutoController.update); // Alterar um produto
router.delete('/produto/:id', middleware.verifyJWT, ProdutoController.delete); // Deletar

router.post('/ingrediente', middleware.verifyJWT, IngredienteController.store); // Criar um ingrediente
router.get('/ingrediente', middleware.verifyJWT, IngredienteController.index); // Listar ingredientes
router.get('/ingrediente/:id', middleware.verifyJWT, IngredienteController.show); // Listar um ingrediente pelo id
router.put('/ingrediente/:id', middleware.verifyJWT, IngredienteController.update); // Alterar um ingrediente
router.delete('/ingrediente/:id', middleware.verifyJWT, IngredienteController.delete); // Deletar

router.post('/usuario', UsuarioController.store); // Criar um usuario
router.get('/usuario', middleware.verifyJWT, UsuarioController.index); // Listar usuarios

router.post('/login', UsuarioController.login); // Realizar o login

module.exports = router;