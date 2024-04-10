const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/edit-expense/:expenseId', adminController.getEditExpense);

router.post('/edit-expense', adminController.postEditExpense);

router.get('/delete-expense/:expenseId', adminController.DeleteExpense);

module.exports = router;