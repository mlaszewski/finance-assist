const db = require('../Models');
const Users = db.users;

const addUser = user => Users.create(user);
const getUserByEmail = email => Users.findOne({where: {email}});
const getUserById = id => Users.findByPk(id);

module.exports = {
    addUser,
    getUserByEmail,
    getUserById
}