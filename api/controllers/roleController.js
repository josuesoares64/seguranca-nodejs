const RoleService = require("../services/roleService");
const roleService = new RoleService();

class RoleController {
  static async cadastrar(req, res) {
    const { nome, descricao } = req.body;

    try {
      const role = await roleService.cadastrar({ nome, descricao });
      return res.status(201).json(role);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async buscarTodosRoles(req, res) {
    try {
      const roles = await roleService.buscarTodosRoles();
      return res.status(200).json(roles);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async buscarRolePorId(req, res) {
    try {
      const { id } = req.params;
      const role = await roleService.buscarRolePorId(id);
      return res.status(200).json(role);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async editarRole(req, res) {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    try {
      const role = await roleService.editarRole({ id, nome, descricao });
      return res.status(200).json(role);
    } catch (error) {
      console.log('Message error:', error.messsage)
      return res.status(400).json({ message: error.message })
    }
  }

  static async deletarRole(req, res) {
    const { id} = req.params;

      try {
        await roleService.deletarRole(id);

        return res.status(200).json({ message: 'Role deletado com sucesso!'})
      } catch (error) {
        console.log('Message error:', error.message)
        return res.status(400).json({ message: error.message});
      }
  }
}

module.exports = RoleController;
