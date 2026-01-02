const { Router } = require('express');
const UsuarioController = require('../controllers/usuarioController');
const autenticado = require('../middleware/autenticado');

const router = Router();

// 🚪 ROTAS PÚBLICAS
router.post('/usuarios', UsuarioController.cadastrar);

// 🔒 ROTAS PROTEGIDAS
router.use(autenticado);

router
  .get('/usuarios', UsuarioController.buscarTodosUsuarios)
  .get('/usuarios/id/:id', UsuarioController.buscarUsuarioPorId)
  .put('/usuarios/id/:id', UsuarioController.editarUsuario)
  .delete('/usuarios/id/:id', UsuarioController.deletarUsuario);

module.exports = router;
