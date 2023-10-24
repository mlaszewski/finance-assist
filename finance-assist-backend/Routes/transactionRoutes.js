const express = require('express');
const transactionController = require('../Controllers/transactionController');
const authMiddleware = require('../Middlewares/authMiddleware')

const router = express.Router();

// Transactions
// GET
router.get('/', authMiddleware.checkAuth, transactionController.getAllTransactions);
router.get('/:id', authMiddleware.checkAuth, transactionController.getTransaction);

// POST
router.post('/', authMiddleware.checkAuth, transactionController.addTransaction); // create new transaction

module.exports = router;