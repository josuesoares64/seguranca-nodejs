'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class usuario extends Model {
    static associate(models) {
      // usuario ↔ roles
      usuario.belongsToMany(models.roles, {
        through: 'usuarios_roles',
        as: 'roles',
        foreignKey: 'usuario_id'
      });

      // usuario ↔ permissoes
      usuario.belongsToMany(models.permissoes, {
        through: 'usuarios_permissoes',
        as: 'permissoes',
        foreignKey: 'usuario_id'
      });
    }
  }

  usuario.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      nome: DataTypes.STRING,
      email: DataTypes.STRING,
      senha: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'usuario',
      tableName: 'Usuarios',     // ✅ NOME REAL DA TABELA
      freezeTableName: true,     // ✅ NÃO pluraliza automaticamente
      timestamps: true           // (default, mas bom deixar explícito)
    }
  );

  return usuario;
};
