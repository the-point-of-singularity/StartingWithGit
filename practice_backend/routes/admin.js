const path = require('path');

const express = require('express');

const productsController = require('../controllers/products.js');

//const rootDir = require('../util/path');
//not using the rootDir anymore as we are rendering dynamically using res.render()

const router = express.Router();



// /admin/add-product => GET
router.get('/add-product', productsController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', productsController.postAddProduct);

module.exports = router;
