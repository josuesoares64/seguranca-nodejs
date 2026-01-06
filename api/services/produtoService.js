const database = require('../models')

class ProdutoService {

  async cadastrarProduto(dto) {
    const produto = await database.Produto.findOne({
      where: { nome: dto.nome }
    })

    if (produto) throw new Error('Produto já cadastrado')

    const newProduto = await database.Produto.create({
      nome: dto.nome,
      descricao: dto.descricao,
      preco: dto.preco
    })

    return newProduto
  }

  async buscarTodosProdutos() {
    return await database.Produto.findAll()
  }

  async buscarProdutoPorId(id) {
    const produto = await database.Produto.findOne({ where: { id } })
    if (!produto) throw new Error('Produto informado não cadastrado!')
    return produto
  }

  async deletarProdutoPorId(id) {
    const produto = await database.Produto.findOne({ where: { id } })
    if (!produto) throw new Error('Produto informado não cadastrado!')
    await database.Produto.destroy({ where: { id } })
  }

  async editarProduto(dto) {
    const produto = await database.Produto.findOne({ where: { id: dto.id } })
    if (!produto) throw new Error('Produto informado não cadastrado!')

    produto.nome = dto.nome
    produto.descricao = dto.descricao
    produto.preco = dto.preco

    await produto.save()
    return produto
  }

}

module.exports = ProdutoService
