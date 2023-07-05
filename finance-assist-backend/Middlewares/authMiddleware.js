const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const userService = require('../Services/userService');

const checkAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    let token;

    if (authHeader && authHeader.startsWith("Bearer ")){
        token = authHeader.substring(7, authHeader.length);
    } else {
        return res.status(403).send({ auth: false, message: 'Wrong authorization.' });
    }

    if(!token) {
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }

    await jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        // Check if user exists
        const user = await userService.getUserByEmail(decoded.email);
        if(!user)
            return res.status(500).send({ auth: false, message: 'User with id: ' + decoded.id + ' does not exist.' });


        req.user = {
            email: decoded.email,
            id: decoded.id
        };

        next();
    });
}

module.exports = {
    checkAuth
}