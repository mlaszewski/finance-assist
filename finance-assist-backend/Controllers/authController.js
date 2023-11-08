const bcrypt = require('bcrypt');

const authService = require('../Services/authService');
const userService = require('../Services/userService');

function login(req, res){
    return authService.authenticate(req.body)
        .then( data => {
            const { id, userName: name, email } = data.user;

            res.status(201).send({
                success: true,
                data: {
                    user: {
                        id: id,
                        name: name,
                        email: email
                    },
                    token: data.token
                }
            });
        })
        .catch(err => {
            return res.status(401).send({
                success: false,
                message: err.message || 'Unexpected Error'
            });
        })
}

async function register(req, res){
    try{
        if(await userService.getUserByEmail(req.body.email)) {
            return res.status(409).send({
                success: false,
                message: 'User with this email already registered'
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
                return res.status(400).send("Data is not correct");
            }
        }
    } catch (error) {
        return res.status(401).send({
            success: false,
            message: 'Unexpected Error'
        });
    }
}

module.exports = {
    login,
    register
}