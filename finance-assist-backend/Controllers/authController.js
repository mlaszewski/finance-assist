const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authService = require('../Services/authService');
const userService = require('../Services/userService');

function login(req, res){
    return authService.authenticate(req.body)
        .then( data => {
            res.status(201).send({
                success: true,
                data: {
                    user: data.user,
                    token: data.token
                }
            });
        })
        .catch(err => {
            res.status(409).send({
                success: false,
                message: err.message
            });
        })
}

async function register(req, res){
    try{
        if(userService.getUserByEmail(req.body.email).exists) {
            return res.status(409).send({
                success: false,
                message: 'Registration failed. User with this email already registered.'
            });
        } else {
            const data = {
                userName: req.body.userName,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 2)
            }
            const user = userService.addUser(data)
            if(user){
                res.status(201).send({success: true});
            } else {
                return res.status(409).send("Data is not correct");
            }
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    login,
    register
}