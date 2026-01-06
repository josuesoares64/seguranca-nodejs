const bodyParser = require('body-parser')
 
const produto = require('./produtoRoute')
const usuario = require('./usuariosRoutes')
const auth = require('./authRoute')
const role = require('./role')
const permissao = require('./permissao')
const seguranca = require('./seguranca')

module.exports = app => {
  app.use(
    bodyParser.json(),
    auth,
    usuario,
    produto,
    role,
    permissao,
    seguranca
  )
}
