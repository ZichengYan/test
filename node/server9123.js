const http = require('http');

const server = http.createServer((req, res) => {

    console.log(1234);
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(req.body);
    setTimeout(function () {
        res.end();
    },500)
});

server.listen(9123);