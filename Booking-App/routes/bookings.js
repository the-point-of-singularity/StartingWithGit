const path = require('path');

const express = require('express');

const bookingController = require('../controllers/bookings');

const router = express.Router();

router.get('/', bookingController.getTimeSlot);

router.post('/enter-details', bookingController.postTimeSlot);

router.post('/book', bookingController.postBookingDetails);

router.get('/booking-successful', bookingController.getBookingSuccessful);

module.exports = router;