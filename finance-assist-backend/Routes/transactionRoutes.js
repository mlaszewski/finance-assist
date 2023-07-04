const express = require('express');
const transactionController = require('../Controllers/transactionController');

const router = express.Router();

// transactions
router.get('/', transactionController.getAllTransactions);
router.get('/:id', transactionController.getTransaction);
router.post('/', transactionController.addTransaction);

module.exports = router