module.exports = async function(db) {
    const updatevalue = await db.run(`
    UPDATE services
    SET paid = 1
    WHERE id = "${serviceValue.id}",
    `)
}