const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../Models');
const Users = db.users;

exports.authenticate = params => {
    return Users.findOne({
        where: {
            email: params.email
        },
        raw: true
    }).then(user => {
        if (!user)
            throw new Error('Authentication failed. User not found.');
        if (!bcrypt.compareSync(params.password || '', user.password))
            throw new Error('Authentication failed. Wrong password.');
        const payload = {
            email: user.email,
            id: user.id,
            time: new Date()
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: process.env.TOKEN_EXPIRE_TIME
        });
        return {user: user, token: token};
    });
}