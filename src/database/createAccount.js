/*jshint esversion: 8 */
module.exports = async function(db, { accountValue}) {
    //Inserir dados na table de expenses
    const insertedAccount = await db.run(`
        INSERT INTO accounts (
            username,
            password
        ) VALUES (
            "${accountValue.username}",
            "${accountValue.password}"
        );
    `);
};