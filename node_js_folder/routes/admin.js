const path = require('path');

const express = require("express");

const rootDir = require('../util/path');

const productsController = require('../controllers/products');

const contactController = require('../controllers/contact');

const router = express.Router();



router.get("/add-product", productsController.getAddProduct);

router.get("/contact-us", contactController.getContactUs);

router.get("/success", contactController.getSuccess);



router.post("/add-product", productsController.postAddProduct);

router.post("/contact-us", contactController.postContactUs);

module.exports = router;
