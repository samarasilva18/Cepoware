/*jshint esversion: 8 */
module.exports = async function(db, { clientValue }) {
    //Inserir dados na table de clients
    const insertedClient = await db.run(`
        INSERT INTO clients (
            name,
            avatar,
            phone,
            street,
            neighborhood,
            number
        ) VALUES (
            "${clientValue.name}",
            "${clientValue.avatar}",
            "${clientValue.phone}",
            "${clientValue.street}",
            "${clientValue.neighborhood}",
            "${clientValue.number}"
        );`
    );
};