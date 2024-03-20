//const http = require("http");

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
   res.send('<h1>Hello from express.js!</h1>');
});

// const server = http.createServer(app);
// server.listen(3000);//both these lines can be clubbed together by app.listen(3000); and the http import can be removed

app.listen(3000);
