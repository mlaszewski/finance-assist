const db = require('../Models');
const Transactions = db.transactions;

const getAll = (userId) => Transactions.findAll({ where: { user_id: userId } });
const getById = (userId, pk) => Transactions.findOne({ where: { user_id: userId, id: pk } });
const add = transaction => Transactions.create(transaction);

module.exports = {add, getAll, getById};