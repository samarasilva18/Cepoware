//Servidor
const express = require('express')
const server = express()

const {
    pageLanding,
    pageServices,
    pageExpenses,
    pageClients
} = require('./pages')

//Configuração do Nunjucks (Template Engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true, 
})

//Inicialização e Configuração do Servidor
server
//Receber os dados do req.body
.use(express.urlencoded({ extended: true}))
//Configuração de arquivos estáticos (css, scripts, imagens)
.use(express.static("public"))
//Rotas da Aplicação
.get("/", pageLanding)
.get("/services", pageServices)
.get("/expenses", pageExpenses)
.get("/clients", pageClients)
//Start do Servidor
.listen(5500)
