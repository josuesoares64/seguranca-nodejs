const RoleService = require('../services/roleService');
const roleService = new RoleService();

class RoleController {
    async cadastrar(req, res) {
        const { nome, descricao } = req.body;

        try {
            const role = await roleService.cadastrar({ nome, descricao });
            return res.status(201).json(role);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new RoleController();
