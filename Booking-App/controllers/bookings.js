const Booking = require("../models/bookings");

exports.getTimeSlot = (req, res, next) => {
    res.render("booking/time-slot", {
        path: "/",
    });
};

exports.postTimeSlot = (req, res, next) => {
    const slot = req.body.slot;
    res.render("booking/enter-details", {
        slotTime: slot,
        path: "/enter-details",
    });
};

exports.postBookingDetails = (req, res, next) => {
    const name = req.body.username;
    const email = req.body.email;
    const phno = req.body.phno;
    const slot = req.body.slot;
    Booking.create({
        slot: slot,
        name: name,
        email: email,
        phoneNumber: phno,
    })
    .then((result) => {
        console.log("Created the Booking");
        res.redirect("/booking-successful");
    })
    .catch((err) => {
        console.log(err);
    });
};

exports.getBookingSuccessful = (req, res, next) => {
    res.render("booking-successful", {
        path: "/booking-successful",
    });
};