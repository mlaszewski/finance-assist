const db = require('../Models');
const Users = db.users;
const addUser = user => Users.create(user);
const getUserByEmail = email => Users.findOne({where: {email}});
module.exports = {
    addUser,
    getUserByEmail
}