/*jshint esversion: 6 */

const filtros = [
    "Completos",
    "Pendentes",
    "Atrasados",
    "Mensais",
];

const orders = [
    "Urgência",
    "Valor",
    "Clientes",
    "Tipo",
];

//Funcionalidades

function getFilter(serviceNumber) {
    const position = +serviceNumber - 1
    return service[position]
}

module.exports = {
    filtros,
    orders,
    getFilter
};