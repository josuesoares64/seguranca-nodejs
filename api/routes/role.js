const { Router } = require('express');
const RoleController = require('../controllers/roleController');

const router = Router()

router
    .post('/roles', RoleController.cadastrar)
    .get('/roles', RoleController.buscarTodosRoles)
    .get('/roles/:id', RoleController.buscarRolePorId)
    .delete('/roles/:id', RoleController.deletarRole)
    .put('/roles/:id', RoleController.editarRole)

module.exports = router;