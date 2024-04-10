const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Booking = sequelize.define("booking", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    slot: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
    },

});


module.exports = Booking;