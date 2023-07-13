const db = require('../Models');
const Transactions = db.transactions;
const { Op } = require("sequelize");

exports.getAll = (userId) => Transactions.findAll({
    where: { user_id: userId }
});

exports.getPagination = (
    userId,
    limit,
    offset,
    order
) => Transactions.findAndCountAll({
    limit: limit,
    offset: offset,
    where: { user_id: userId },
    order: [order]
})

exports.getById = (userId, pk) => Transactions.findOne({
    where: {
        user_id: userId,
        id: pk
    }
});

exports.getSummary = (userId, timestamp) => Transactions.findAll({
    attributes: ['value', 'type', 'date'],
    where: {
        user_id: userId,
        date: {
            [Op.between]: [
                timestamp.from,
                timestamp.to
            ]
        }
    },
    order: [['date', 'ASC']]
})

exports.add = transaction => Transactions.create(transaction);
