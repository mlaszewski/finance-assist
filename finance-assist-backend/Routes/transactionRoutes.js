const express = require('express');
const transactionController = require('../Controllers/transactionController');
const authMiddleware = require('../Middlewares/authMiddleware')

const router = express.Router();

// transactions
router.get('/', authMiddleware.checkAuth, transactionController.getAllTransactions);
router.get('/:id', authMiddleware.checkAuth, transactionController.getTransaction);
router.get('/summary/week', authMiddleware.checkAuth, transactionController.getWeekSummary);
router.get('/summary/month', authMiddleware.checkAuth, transactionController.getMonthSummary);
router.get('/summary/year', authMiddleware.checkAuth, transactionController.getYearSummary);
router.post('/', authMiddleware.checkAuth, transactionController.addTransaction);

module.exports = router;