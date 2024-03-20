const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const adminRoutes = require('./routes_folder/admin.js');
const shopRoutes = require('./routes_folder/shop.js');

app.use(bodyParser.urlencoded({extended:false}));

app.use(adminRoutes);

app.use(shopRoutes);

app.use((req, res, next) => {
   res.status(404).send('<h1>404 page not found</h1>');
});

app.listen(3000);
