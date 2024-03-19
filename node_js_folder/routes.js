const fs = require("fs");

const requestHandler = (req, res) => {
    const url = req.url;
    console.log(url);
    const method = req.method;
    if (url === "/") {
        console.log("Succesfully entered here!");
        fs.readFile("message.txt", { encoding: "utf-8" }, (err, data) => {
            if (err) {
                console.log(err);
            }
            res.write("<html>");
            res.write("<head><title>Enter a Message</title></head>");
            res.write(`<body>${data}</body>`);
            res.write(
                '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">SEND</button></form></body>'
            );
            res.write("</html");
            return res.end();
            
        });
        
    } else if (url === "/message" && method === "POST") {
        const body = [];
        req.on("data", (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split("=")[1];
            fs.writeFile("message.txt", message, (err) => {
                res.statusCode = 302;
                res.setHeader("Location", "/");
                return res.end();
            });
        });
    } 
    else {
        res.setHeader("Content-Type", "text/html");
        res.write("<html>");
        res.write("<head><title>My First Page</title></head>");
        res.write("<body><h1>Hello from my Node.js server !</h1></body>");
        res.write("</html");
        res.end();
    }
};


module.exports = requestHandler;
