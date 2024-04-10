const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    "booking-appointment",
    "root",
    "Aluphala@110319951993",
    { dialect: "mysql", host: "localhost" }
);

module.exports = sequelize;