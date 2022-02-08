/*jshint esversion: 8 */
//Dados
const Database = require('./database/db');

const { getType, getClient, convertHourstoMinutes, filtros, orders} = require('./utils/format')

function pageLogin(req, res){
    return res.render("password.html")
}

async function performLogin(req, res) {
    var username = req.body.username
    var password = req.body.password
    var notifier = require('node-notifier');

    console.log(username)
    try {

        var query = 'SELECT * FROM accounts WHERE accounts.username ' + "= '" + username + "'" + ' AND accounts.password' + "= '" + password + "'"
        const db = await Database
        const results = await db.all(query)
        console.log(results)
        console.log(username)
                if (results.length > 0) {
                    req.session.loggedin = true;
                    req.session.username = username;
                    return res.redirect('/landing');
                }
                else {
                    notifier.notify({
                        title: "Senha incorreta",
                        message: "Tente novamente",
                        sound: true
                    });
                    return res.redirect("/");
                }
    } catch (error) {
        console.log(error);
    }
}

async function pageLanding(req, res){
    const filters = req.query
    const filtros = req.query2

    const query = `
        SELECT ROUND((SELECT SUM(value) FROM services WHERE paid = 1) -
        (SELECT SUM(cost) FROM expenses), 2)
    `
    const query2 = `
        SELECT ROUND((SELECT SUM(value) FROM services) -
        (SELECT SUM(cost) FROM expenses), 2)
    `

    //Caso haja erro na hora da consulta ao banco de dados
    try {
        const db = await Database
        var mensal = await db.all(query)
        mensal = JSON.stringify(mensal)
        mensal = mensal.split(":")
        mensal = mensal.slice(1)
        mensal = JSON.stringify(mensal)
        mensal = mensal.slice(2)
        mensal = mensal.slice(0, -4)

        var estimate = await db.all(query2)
        estimate = JSON.stringify(estimate)
        estimate = estimate.split(":")
        estimate = estimate.slice(1)
        estimate = JSON.stringify(estimate)
        estimate = estimate.slice(2)
        estimate = estimate.slice(0, -4)
        
        return res.render("index.html", {estimate, mensal, filters, filtros})
        
    }
    catch (error) {
        console.log(error);
    }
}

async function pageClients(req, res) {
    const filters = req.query

    const query = `
        SELECT clients.*
        FROM clients
    `
    //Caso haja erro na hora da consulta ao banco de dados
    try {
        const db = await Database
        const clients = await db.all(query)

        return res.render('clients.html', { clients})

    } catch (error) {
        console.log(error)
    }
}

function pageClientRegister(req, res) {
    return res.render("client-register.html")
}

async function saveClients(req, res) {
    const createRegistry = require('./database/createRegistry');

    const clientValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        phone: req.body.phone,
        street: req.body.street,
        neighborhood: req.body.neighborhood,
        number: req.body.number
    };

    try {
        const db = await Database;
        await createRegistry(db, { clientValue });

        return res.redirect("/clients");
    } catch (error) {
        console.log(error);
    }
}

async function pageServices(req, res){
    const filters = req.query
    const filters2 = req.query2
    var notifier = require('node-notifier');
    
    notifier.notify({
        title: "Bem-Vindo ao Cepoware",
        message: "Serviços abertos",
        sound: true
    });

    const getCurrentTime = `
        SELECT DATETIME(now)
    `

    const getCurrentDay = `
        SELECT DATETIME(now, day)
    `

    const getCurrentMonth = `
        SELECT DATETIME(now, month)
    `
    const getCurrentYear = `
    SELECT DATETIME(now, year)
    `
    const alertquery = `
        SELECT services.time
        FROM services
        WHERE services.time = NOW
    `

    const paydayquery = `
        SELECT services.timep
        FROM services
        WHERE services.timep = NOW
    `

    const query = `
        SELECT services.*
        FROM services
        WHERE services.paid = ${1}
    `;
    const query2 = `
        SELECT ROUND(SUM(value), 2)
        FROM services
    `;

    //Caso haja erro na hora da consulta ao banco de dados
    try {
        const db = await Database
        const services = await db.all(query)
        var totalvalue = await db.all(query2)
        var currentTime = await db.all(getCurrentTime)
        var currentDay = await db.all(getCurrentDay)
        var currentMonth = await db.all(getCurrentMonth)
        var currentYear = await db.all(getCurrentYear)
        console.log(currentTime)

        services.map((service) => {
            service.cepotype = getType(service.cepotype);
        });

        services.map((service) => {
            service.serviceclient = getClient(service.serviceclient);
        });

        totalvalue = JSON.stringify(totalvalue)
        totalvalue = totalvalue.split(":")
        totalvalue = totalvalue.slice(1)
        totalvalue = JSON.stringify(totalvalue)
        totalvalue = totalvalue.slice(2)
        totalvalue = totalvalue.slice(0, -4)

        return res.render('services.html', { services, filters2, filters, totalvalue, filtros, orders })

    } catch (error) {
        console.log(error)
    }
}

async function pageServicesRegister(req, res){
    const filters = req.query

    const query = `
        SELECT clients.*
        FROM clients
    `

    //Caso haja erro na hora da consulta ao banco de dados
    try {
        const db = await Database
        const clients = await db.all(query)

        return res.render("services-register.html", { cepotypes, clients, filters})

    } catch (error) {
        console.log(error)
}
}

async function pageExpenses(req, res){
    const filters = req.query
    const filters2 = req.query2

    const query = `
        SELECT expenses.*
        FROM expenses
    `
    const query2 = `
        SELECT ROUND(SUM(cost), 2)
        FROM expenses
    `

    //Caso haja erro na hora da consulta ao banco de dados
    try {
        const db = await Database
        const expenses = await db.all(query)
        var totalcost = await db.all(query2)

        totalcost = JSON.stringify(totalcost)
        totalcost = totalcost.split(":")
        totalcost = totalcost.slice(1)
        totalcost = JSON.stringify(totalcost)
        totalcost = totalcost.slice(2)
        totalcost = totalcost.slice(0, -4)

        console.log(totalcost)
        return res.render('expenses.html', { expenses, filters2, filtros, filters, orders, totalcost })

    } catch (error) {
        console.log(error)
    }
}

function pageExpensesRegister(req, res){
    return res.render("expenses-register.html")
}

async function saveExpenses(req, res) {
    const createExpense = require('./database/createExpense');

    const expenseValue = {
        name: req.body.name,
        cost: req.body.cost,
        day: req.body.day,
        month: req.body.month
    };

    try {
        const db = await Database;
        await createExpense(db, { expenseValue });

        return res.redirect("/expenses");
    } catch (error) {
        console.log(error);
    }
}

async function saveServices (req, res) {
    const createService = require('./database/createService');

    const serviceValue = {
        avatar: req.body.avatar,
        mensal: req.body.mensal,
        quant: req.body.quant,
        cepotype: req.body.cepotype,
        value: req.body.value,
        serviceclient: req.body.serviceclient,
        day: req.body.day,
        month: req.body.month,
        time: req.body.time,
        dayp: req.body.dayp,
        monthp: req.body.monthp,
        timep: req.body.timep
    };

    try {
        const db = await Database;
        await createService(db, { serviceValue });

        return res.redirect("/services");
    } catch (error) {
        console.log(error);
    }
}

function pageNewTypeRegister(req, res){
    return res.render("newtype-register.html")
}

module.exports = {
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
    performLogin
}