const path = require('path');

const rootDir = require('../util/path');

exports.getContactUs = (req, res, next) => {
    res.sendFile(path.join(rootDir, "views", "contact-us.html"));
};

exports.getSuccess = (req, res, next) => {
    res.sendFile(path.join(rootDir, "views", "success.html"));
};

exports.postContactUs = (req, res, next) => {
    res.redirect("/success");
};
