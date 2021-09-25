/*jshint esversion: 8 */
//Dados
const Database = require('./database/db')

const { filtros, orders} = require('./utils/format')

function pageLanding(req, res){
    return res.render("index.html")
}

async function pageClients(req, res) {
    const filters = req.query

    if (!filters.filtros || !filters.orders) {
        return res.render("clients.html", { filters, filtros, orders })
    }

    const query = `
        SELECT clientstorage.*, clients.*
        FROM clients
    `
    //Caso haja erro na hora da consulta ao banco de dados
    try {
        const db = await Database
        const clients = await db.all(query)

        clients.map((client) => {
            client.filter = getFilter(client.filter)
        })

        return res.render('clients.html', { clients, filtros, filters, orders })

    } catch (error) {
        console.log(error)
    }
}

function pageClientRegister(req, res) {
    return res.render("client-register.html")
}

async function saveClients(req, res) {
    const createClient = require('./database/createClient')

    const clientValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        phone: req.body.phone,
        bio: req.body.bio
    }

    try {
        const db = await Database
        await createClient(db, { clientValue })
        
        let queryString = "?filtros=" + req.body.filtros

        queryString += + "&order=" + req.body.order

        return res.redirect("/clients" + queryString)
    } catch (error) {
        console.log(error)
    }
}

async function pageServices(req, res){
    const filters = req.query
    
    if (!filters.filtros || !filters.orders) {
        return res.render("services.html",{filtros, filters, orders })
    }

    const query = `
        SELECT servicestorage.*, services.*
        FROM services
    `
    //Caso haja erro na hora da consulta ao banco de dados
    try {
        const db = await Database
        const services = await db.all(query)

        services.map((service) => {
            service.filter = getFilter(service.filter)
        })

        return res.render('services.html', { services, filtros, filters, orders })

    } catch (error) {
        console.log(error)
    }
}

function pageServicesRegister(req, res){
    return res.render("services-register.html")
}

function pageExpenses(req, res){
    const filters = req.query
    
    if (!filters.filtros || !filters.orders) {
        return res.render("expenses.html", { filters, filtros, orders })
    }
}

function pageExpensesRegister(req, res){
    return res.render("expenses-register.html")
}

function pageNewTypeRegister(req, res){
    return res.render("newtype-register.html")
}

module.exports = {
    pageLanding,
    pageClients,
    pageClientRegister,
    saveClients,
    pageServices,
    pageServicesRegister,
    pageNewTypeRegister,
    pageExpenses,
    pageExpensesRegister
}