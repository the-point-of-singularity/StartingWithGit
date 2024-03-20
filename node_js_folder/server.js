const http = require("http");

const express = require('express');
const app = express();
// const routes = require('./routes.js');

const server = http.createServer(app);

server.listen(3000);
