const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/booking-list', adminController.getBookingList);

router.post('/cancel-booking', adminController.deleteBooking);

module.exports = router;