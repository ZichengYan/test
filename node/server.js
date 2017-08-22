const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {

    console.log(1234);
    response.setHeader('Access-Control-Allow-Origin', 'hert');
    //设置请求的返回头type,content的type类型列表见上面
    response.setHeader("Content-Type", "image/png");
//格式必须为 binary 否则会出错
    var content = fs.readFileSync("./bg.png", "binary");
    response.writeHead(200, "Ok");
    response.write(content, "binary"); //格式必须为 binary，否则会出错
    response.end();
    response.end();
});

server.listen(63342);