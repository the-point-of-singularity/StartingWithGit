const path = require('path');

const express = require('express');

const expenseController = require('../controllers/expense');

const router = express.Router();

router.get('/', expenseController.getIndex);

router.get('/expenditure-list', expenseController.getExpenses);

router.post('/expenditure-list', expenseController.postAddExpense);

module.exports = router;