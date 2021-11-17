/*jshint esversion: 8 */

const Database = require('./db');
const createRegistry = require('./createRegistry');

Database.then(async (db) => {
    //Inserir Dados

    clientValue = {
        name: "Fox", 
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
        phone: "3704-0070", 
        street: "R. Arnold Faria Junqueira", 
        neighborhood: "Jardim Paulistano", 
        number: "1160",  
    };

    //Consultar os dados inseridos

    //Todos os Clientes
    const selectedClients = await db.all("SELECT * FROM clients");
    //console.log(selectedClients)

    console.log(selectedClients);
});