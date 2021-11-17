/*jshint esversion: 8 */
module.exports = async function(db, { expenseValue}) {
    //Inserir dados na table de expenses
    const insertedExpense = await db.run(`
        INSERT INTO expenses (
            name,
            cost,
            day,
            month
        ) VALUES (
            "${expenseValue.name}",
            "${expenseValue.cost}",
            "${expenseValue.day}",
            "${expenseValue.month}"
        );
    `);
};