/*jshint esversion: 6 */

const cepotypes = [
    "Cepo Redondo",
    "Cepos Retangulares",
    "Colagem",
    "Cepo Quadriculado",
    "Cepo Novo",
];


const complecao = [
    "Completos",
    "Pendentes",
    "Atrasados",
    "Mensais",
];

const orders = [
    "Mais novo",
    "Mais antigo",
    "Urgência",
    "Valor"
];

const filtros = [
    "Mostrar tudo",
    "Completos",
    "Pendentes",
    "Fox Calçados",
    "Arizona"
];

//Funcionalidades

function getType(typeNumber) {
    const position = +typeNumber - 1;
    return cepotypes[position];
}

function getClient(clientNumber) {
    const clientes = `
    SELECT client.name
    FROM clients
`
    const position = +clientNumber - 1;
    return clientes[position];
}

function getServiceSum() {
    const totalvalue = `
    SELECT 
    SUM(value)
    FROM services
    `
    return totalvalue
}

function getExpenseSum() {
    const totalcost = `
    SELECT 
    SUM(cost)
    FROM expenses
    `
    return totalcost
}

function getMensal() {
    return total[position];
}

function convertHoursToMinutes(time) {
    const [hour, minutes] = time.split(":");
    return Number((hour * 60) + minutes);
}

module.exports = {
    filtros,
    orders,
    cepotypes,
    getType,
    getClient,
    convertHoursToMinutes,
    getMensal,
    getServiceSum
};