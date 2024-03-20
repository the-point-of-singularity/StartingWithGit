const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const adminRoutes = require('./routes_folder/admin.js');
const shopRoutes = require('./routes_folder/shop.js');

app.use(bodyParser.urlencoded({extended:false}));

app.use(adminRoutes);

app.use(shopRoutes);

app.listen(3000);
