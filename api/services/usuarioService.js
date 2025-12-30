const database = require("../models");
const { hash } = require("bcryptjs");
const uuid = require("uuid");

class UsuarioService {
  async cadastrar(dto) {
    const usuario = await database.Usuario.findOne({
      where: {
        email: dto.email,
      },
    });
    if (usuario) {
      throw new Error("Usuário já existe");
    }

    try {
      const senhaHas = await hash(dto.senha, 8);

      const novoUsuario = await database.Usuario.create({
        id: uuid.v4(),
        nome: dto.nome,
        email: dto.email,
        senha: senhaHas,
      });
      return novoUsuario;
    } catch (error) {
      throw new Error("Erro ao cadastrar usuário");
    }
  }
}

module.exports = UsuarioService;
