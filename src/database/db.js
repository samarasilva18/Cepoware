const Database = require('sqlite-async')

function execute(db) {
    //Criar as tabelas do banco de dados.
    return db.exec(`
        CREATE TABLE IF NOT EXISTS clients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            phone TEXT
        );

        CREATE TABLE IF NOT EXISTS services (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tipocepo INTEGER,
            cost TEXT,
            client_id INTEGER
        );

        CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            expensename TEXT,
            month INTEGER,
            day INTEGER
        );
    `)
}

module.exports = Database.open(__dirname + '/database.sqlite').then(execute)