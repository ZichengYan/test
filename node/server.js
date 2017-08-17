const http = require('http');

const server = http.createServer((req, res) => {

    console.log(1234);
    res.setHeader('Access-Control-Allow-Origin', '*');
    setTimeout(function () {
        res.end();
    },0)
});

server.listen(8000);