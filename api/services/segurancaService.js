const database = require('../models')
const Sequelize = require('sequelize')

class SegurancaService {

  async cadastrarAcl(dto) {
    if (!dto.usuarioId) {
      throw new Error('usuarioId é obrigatório')
    }

    if (!Array.isArray(dto.roles)) {
      throw new Error('roles deve ser um array')
    }

    if (!Array.isArray(dto.permissoes)) {
      throw new Error('permissoes deve ser um array')
    }

    const usuario = await database.usuario.findOne({
      where: { id: dto.usuarioId },
      include: [
        { model: database.roles, as: 'roles' },
        { model: database.permissoes, as: 'permissoes' }
      ]
    })

    if (!usuario) {
      throw new Error('Usuario não cadastrado')
    }

    const rolesCadastradas = dto.roles.length
      ? await database.roles.findAll({
          where: {
            id: { [Sequelize.Op.in]: dto.roles }
          }
        })
      : []

    const permissoesCadastradas = dto.permissoes.length
      ? await database.permissoes.findAll({
          where: {
            id: { [Sequelize.Op.in]: dto.permissoes }
          }
        })
      : []

    await usuario.setRoles(rolesCadastradas)
    await usuario.setPermissoes(permissoesCadastradas)

    return await database.usuario.findOne({
      where: { id: dto.usuarioId },
      include: [
        { model: database.roles, as: 'roles' },
        { model: database.permissoes, as: 'permissoes' }
      ]
    })
  }

  async cadastrarPermissoesRoles(dto) {
    if (!dto.roleId) {
      throw new Error('roleId é obrigatório')
    }

    if (!Array.isArray(dto.permissoes)) {
      throw new Error('permissoes deve ser um array')
    }

    const role = await database.roles.findOne({
      where: { id: dto.roleId },
      include: [
        {
          model: database.permissoes,
          as: 'permissoes_da_role'
        }
      ]
    })

    if (!role) {
      throw new Error('Role não cadastrada')
    }

    const permissoesCadastradas = dto.permissoes.length
      ? await database.permissoes.findAll({
          where: {
            id: {
              [Sequelize.Op.in]: dto.permissoes
            }
          }
        })
      : []

    // mantém sua lógica: substitui tudo
    await role.setPermissoes_da_role(permissoesCadastradas)

    return await database.roles.findOne({
      where: { id: dto.roleId },
      include: [
        {
          model: database.permissoes,
          as: 'permissoes_da_role'
        }
      ]
    })
  }
}

module.exports = SegurancaService
