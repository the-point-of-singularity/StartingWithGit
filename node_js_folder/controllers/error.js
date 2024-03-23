const path = require('path');

const rootDir = require('../util/path');

exports.get404 = (req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '../' , "views", "404.html"));
};
