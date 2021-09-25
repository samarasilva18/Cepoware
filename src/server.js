/*jshint esversion: 6 */
//Servidor
const express = require('express');
const server = express();

const {
    pageLanding,
    pageClients,
    pageClientRegister,
    saveClients,
    pageServices,
    pageServicesRegister,
    pageNewTypeRegister,
    saveServices,
    pageExpenses,
    pageExpensesRegister,
    saveExpenses
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
.get("/clients", pageClients)
.get("/client-register", pageClientRegister)
.get("/services", pageServices)
.get("/services-register", pageServicesRegister)
.get("/newtype-register", pageNewTypeRegister)
.get("/expenses", pageExpenses)
.get("/expenses-register", pageExpensesRegister)
.post("/save-clients", saveClients)
//Start do Servidor
.listen(5500)
