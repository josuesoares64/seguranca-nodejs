const PermissaoService = require('../services/permissaoService');

const permissaoService = new PermissaoService();

class PermissaoController {
  static async cadastrar(req, res) {
    try {
      const permissao = await permissaoService.cadastrar(req.body);
      return res.status(201).json(permissao);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async buscarTodasPermissoes(req, res) {
    const permissoes = await permissaoService.buscarTodasPermissoes();
    return res.status(200).send(permissoes)
  }

  static async buscarPermissaoPorId(req, res) {
    try {
      const { id } = req.params;
      const permissao = await permissaoService.buscarPermissaoPorId(id);
      return res.status(200).send(permissao)
    } catch (error) {
      console.log('Message error: ', error.message);
      return res.status(400).send({ message: error.message });
    }
  }

  static async editarPermissao(req, res) {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    try {
      const permissao = await permissaoService.editarPermissao({ id, nome, descricao });

      return res.status(200).send(permissao);
    } catch (error) {
      console.log('Message error: ', error.message);
      return res.status(400).send({ message: error.message })
    }
  }

  static async deletarPermissaoPorId(req, res) {
    const { id } = req.params;
    
    try {
      await permissaoService.deletarPermissaoPorId(id);

      return res.status(200).send({ message: 'Permissão deletada com sucesso!'})
    } catch (error) {
      console.log('Message error: ', error.message)
    }
  }
}

module.exports = PermissaoController;
