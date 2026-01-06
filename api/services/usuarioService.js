const database = require('../models')
const { hash } = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')

class UsuarioService {

  async cadastrar(dto) {
    const usuarioExistente = await database.Usuario.findOne({
      where: { email: dto.email }
    })

    if (usuarioExistente) {
      throw new Error('Usuário já cadastrado')
    }

    const senhaHash = await hash(dto.senha, 8)

    const novoUsuario = await database.Usuario.create({
      id: uuidv4(),
      nome: dto.nome,
      email: dto.email,
      senha: senhaHash
    })

    return novoUsuario
  }

  async buscarTodosUsuarios() {
    return database.usuario.findAll()
  }

  async buscarUsuarioPorId(id) {
    const usuario = await database.Usuario.findOne({
      where: { id }
    })

    if (!usuario) {
      throw new Error('Usuário não encontrado')
    }

    return usuario
  }

  async editarUsuario(dto) {
    const usuario = await this.buscarUsuarioPorId(dto.id)

    usuario.nome = dto.nome
    usuario.email = dto.email

    await usuario.save()
    return usuario
  }

  async deletarUsuario(id) {
    await this.buscarUsuarioPorId(id)

    await database.Usuario.destroy({
      where: { id }
    })
  }
}

module.exports = UsuarioService
