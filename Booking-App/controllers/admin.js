const Booking = require('../models/bookings');

exports.getBookingList = (req, res, next) => {
    Booking.findAll()
    .then((bookings) => {
        res.render("admin/list-of-bookings", {
            bookings: bookings,
            path: "/admin/booking-list",
        });
    })
    .catch((err) => {
        console.log(err);
    });
    
};

exports.deleteBooking = (req, res, next) => {
    const bookingId = req.body.bookingId;
    Booking.findByPk(bookingId)
    .then((booking) => {
        return booking.destroy();
    })
    .then((result) => {
        console.log("Booking Cancelled!");
        res.redirect('/admin/booking-list');
    })
    .catch((err) => {
        console.log(err);
    });
};

