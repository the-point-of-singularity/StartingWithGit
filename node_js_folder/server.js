const http = require("http");

const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);
    //process.exit();
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    if(req.url==='/node') {
        res.write('<body><h1>Hello from my Node.js server !</h1></body>');
    }
    if(req.url==='/home') {
        res.write('<body><h1>Hello from my Home Page !</h1></body>'); 
    }
    res.write('</html');
    res.end();
});

server.listen(3000);
