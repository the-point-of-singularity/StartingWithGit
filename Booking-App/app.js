const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');

const Booking = require('./models/bookings');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const bookingRoutes = require('./routes/bookings');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', bookingRoutes);

app.use(errorController.get404);

sequelize
    // .sync({ force: true })
    .sync()
    .then((result) => {
        app.listen(8000);
    })
    .catch((err) => {
        console.log(err);
    });

