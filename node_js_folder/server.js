const http = require("http");

const express = require('express');
const app = express();
// const routes = require('./routes.js');

app.use((req, res, next) => {
   console.log("In the middleware!");
   next();// Allows the request to continue to the next middleware..
});

app.use((req, res, next) => {
   console.log("In another middleware!");
   //....send a response...
});

const server = http.createServer(app);

server.listen(3000);
