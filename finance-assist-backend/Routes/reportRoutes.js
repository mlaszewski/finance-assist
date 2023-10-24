const express = require('express');
const reportController = require('../Controllers/reportController');
const authMiddleware = require('../Middlewares/authMiddleware')

const router = express.Router();

// Summaries
router.get('/summary/week', authMiddleware.checkAuth, reportController.getWeekSummary);
router.get('/summary/month', authMiddleware.checkAuth, reportController.getMonthSummary);
router.get('/summary/year', authMiddleware.checkAuth, reportController.getYearSummary);

module.exports = router;