const express = require('express');
const app = express();

app.use('/', (req, res, next) => {
    console.log("This always runs!");
    next();
});

app.use('/add-product',(req, res, next) => {
   console.log("In the add-product middleware!");
   res.send('<h1>We are inside the add-product page!</h1>');
});

app.use('/',(req, res, next) => {
   console.log("In the general middleware!");
   res.send('<h1>Hello from express.js!</h1>');
});

app.listen(3000);
