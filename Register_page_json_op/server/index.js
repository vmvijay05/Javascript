var http = require('http');
const cors = require('cors');
// http.use(cors())
const { json } = require('stream/consumers');

const server = http.createServer((req, res) => {

 // Set CORS headers
 res.setHeader('Access-Control-Allow-Origin', '*');  // Allow all origins
 res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // res.status(200)
    // res.JSON({
    //     "Name": "Vijay",
    //     "Age": "28"
    // })
    if (req.url === "/data" && req.method === "GET") {
        res.writeHead(200, { 'Content-Type': 'application/json' });
       // res.write(`{"<h1>Hello Vijayakumar.!</h1>"}`);
        const responseData = { message: "Hello from Node.js server!" };
        res.end(JSON.stringify(responseData));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("404 Not Found");
    }
});

server.listen(8000)
{
    console.log("Server start successfully.");
}