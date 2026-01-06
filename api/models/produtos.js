'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Produto extends Model {
    static associate(models) {
      // se tiver associações, coloca aqui
    }
  }

  Produto.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING,
    preco: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Produto', // ⚠ precisa ser PascalCase
    tableName: 'produtos', // nome da tabela no DB (opcional)
    timestamps: false // se você não quiser createdAt/updatedAt
  })

  return Produto
}
