const { Router } = require('express'); // criar manipuladores de rota modulares e montáveis

const IngredienteController = require('./Controller/IngredienteController');
const ProdutoController = require('./Controller/ProdutoController');

const router = Router();

router.post('/produto', ProdutoController.store); // Criar um produto
router.get('/produto', ProdutoController.index); // Listar produtos
router.get('/produto/:id', ProdutoController.show); // Listar um produto pelo id
router.put('/produto/:id', ProdutoController.update); // Alterar um produto
router.delete('/produto/:id', ProdutoController.delete); // Deletar

router.post('/ingrediente', IngredienteController.store); // Criar um ingrediente
router.get('/ingrediente', IngredienteController.index); // Listar ingredientes
router.get('/ingrediente/:id', IngredienteController.show); // Listar um ingrediente pelo id
router.put('/ingrediente/:id', IngredienteController.update); // Alterar um ingrediente
router.delete('/ingrediente/:id', IngredienteController.delete); // Deletar

module.exports = router;