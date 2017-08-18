const http = require('http');

const server = http.createServer((req, res) => {

    console.log(1234);
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(req.body);
    res.end();
});

server.listen(8000);