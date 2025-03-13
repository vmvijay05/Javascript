const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.url === "/data") {
        const filePath = path.join(__dirname, 'view', 'res.html');

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end("500 Internal Server Error");
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    }
    // else if (req.url === "/" || req.url === "/index.html") {
    //     // Serve the index.html file
    //     const filePath = path.join(__dirname, 'view', 'index.html');

    //     fs.readFile(filePath, (err, data) => {
    //         if (err) {
    //             res.writeHead(500, { 'Content-Type': 'text/plain' });
    //             res.end("500 Internal Server Error");
    //         } else {
    //             res.writeHead(200, { 'Content-Type': 'text/html' });
    //             res.end(data);
    //         }
    //     });
 else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("404 Not Found");
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
