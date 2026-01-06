'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    static associate(models) {
      roles.belongsToMany(models.usuario, { // ✅ AQUI
        through: 'usuarios_roles',
        as: 'usuarios_da_role',
        foreignKey: 'role_id'
      });

      roles.belongsToMany(models.permissoes, { // ✅ AQUI
        through: 'roles_permissoes',
        as: 'permissoes_da_role',
        foreignKey: 'role_id'
      });
    }
  }

  roles.init(
    {
      nome: DataTypes.STRING,
      descricao: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'roles',
      tableName: 'roles'
    }
  );

  return roles;
};
