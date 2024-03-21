const path = require('path');

const express = require("express");

const router = express.Router();


//The implicit route is /admin/add-product
router.get("/add-product", (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
});


//The implicit route is /admin/add-product
router.post("/add-product", (req, res, next) => {
    console.log(req.body);
    res.redirect("/");
});

module.exports = router;
