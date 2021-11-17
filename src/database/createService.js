/*jshint esversion: 8 */
module.exports = async function(db, { serviceValue}) {
    //Inserir dados na table de expenses
    const insertedService = await db.run(`
        INSERT INTO services (
            avatar,
            mensal,
            quant,
            cepotype,
            value,
            serviceclient,
            day,
            month,
            time,
            dayp,
            monthp,
            timep,
            paid
        ) VALUES (
            "${serviceValue.avatar}",
            "${serviceValue.mensal}",
            "${serviceValue.quant}",
            "${serviceValue.cepotype}",
            "${serviceValue.value}",
            "${serviceValue.serviceclient}",
            "${serviceValue.day}",
            "${serviceValue.month}",
            "${serviceValue.time}",
            "${serviceValue.dayp}",
            "${serviceValue.monthp}",
            "${serviceValue.timep}",
            "${0}"
        );
    `);
};