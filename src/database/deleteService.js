/*jshint esversion: 8 */
module.exports = async function(db, {deleteValue}) {
    const deleteThis = await db.run(`
    DELETE FROM services
    WHERE id = ${deleteValue}`);
}