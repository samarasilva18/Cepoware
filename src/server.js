/*jshint esversion: 6 */
//Servidor
const express = require('express');
var server = express();
var session = require('express-session');
var bodyParser = require('body-parser');

const {
    pageLogin,
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
    saveExpenses,
    performLogin,
    getDelete,
    getPaid
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
//Configuração das sessoes de login
.use(session({
    secret: 'secret',
    resave: true,
    saveUnitialized: true
}))
.use(bodyParser.urlencoded({extended : true}))
.use(bodyParser.json())
//Rotas da Aplicação
.get("/", pageLogin)
.get("/landing", pageLanding)
.get("/clients", pageClients)
.get("/client-register", pageClientRegister)
.get("/services", pageServices)
.get("/services-register", pageServicesRegister)
.get("/newtype-register", pageNewTypeRegister)
.get("/expenses", pageExpenses)
.get("/expenses-register", pageExpensesRegister)
.post("/save-clients", saveClients)
.post("/save-expenses", saveExpenses)
.post("/save-services", saveServices)
.post("/perform-login", performLogin)
.post("/services/delete", getDelete)
.post("/services/pay", getPaid)
//Start do Servidor
.listen(5500)
