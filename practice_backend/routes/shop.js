const path = require('path');

const express = require('express');

const productsController = require('../controllers/products.js');

//const rootDir = require('../util/path');
//not using the rootDir anymore as we are rendering dynamically using res.render()


const router = express.Router();

router.get('/', productsController.getProducts);

module.exports = router;
