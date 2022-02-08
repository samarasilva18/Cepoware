/*jshint esversion: 6 */
const Database = require('sqlite-async');

function execute(db) {
    //Criar as tabelas do banco de dados.
    return db.exec(`
    CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        avatar TEXT,
        phone TEXT,
        street TEXT,
        neighborhood TEXT,
        number INT
    );

    CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        cost REAL,
        day INT,
        month INT
    );

    CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        avatar TEXT,
        mensal INT,
        quant INT,
        cepotype INT,
        value REAL,
        serviceclient INT,
        day INT,
        month INT,
        time INT,
        dayp INT,
        monthp INT,
        timep INT
    );

    CREATE TABLE IF NOT EXISTS accounts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        password TEXT
    );

    `)
}

module.exports = Database.open(__dirname + '/database.sqlite').then(execute)