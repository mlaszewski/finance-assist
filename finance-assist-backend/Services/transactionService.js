const db = require('../Models');
const Transactions = db.transactions;

const getAll = () => Transactions.findAll();
const getById = id => Transactions.findByPk(id);
const add = transaction => Transactions.create(transaction);

module.exports = {add, getAll, getById};