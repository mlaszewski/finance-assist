const express = require('express');
const authController = require('../Controllers/authController');
const { login, register } = authController;

const router = express.Router();

// auth
router.post('/register', register)
router.post('/login', login )

module.exports = router