module.exports = async function(db, {payValue}) {
    const updateValue = await db.run(`
    UPDATE services
    SET paid = 1
    WHERE id = ${payValue}
    `)
}