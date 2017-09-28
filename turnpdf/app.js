var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Pdf = require('pdfkit');
var fs = require('fs');
var index = require('./routes/index');
var users = require('./routes/users');
var app = express();
var im = require("imagemagick");
var gm = require("gm");
var imageMagick = gm.subClass({imageMagick: true});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.all(function () {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');

})
app.post('/pdf', function (req, res) {
    var base64Data = decodeURIComponent(req.body.img);
    var binaryData = new Buffer(base64Data, 'base64').toString('binary');
    fs.writeFile('./uploads/out.png', binaryData, 'binary', function (err) {
        if (err) {
            console.log(err);
        }

    });
    res.send('saved.');
});

var doc = new Pdf();
doc.pipe(fs.createWriteStream("demo.pdf"));

im.resize({
    srcPath: 'out.png',
    dstPath: 'out1.png',
    width: 600
}, function (err, stdout, stderr) {
    if (err) throw err;
    console.log('resized kittens.jpg to fit within 256x256px');
    im.convert(['out1.png', '-crop', '655x780', './uploads/3.png'],
        function (err, stdout) {
            if (err) throw err;
            console.log('stdout:', stdout);
            fs.readdir("./uploads", function (err, files) {
                files.shift()
                console.log(files);
                for (var i = 0; i < files.length; i++) {
                    doc.image(`./uploads/${files[i]}`, 0, 0, {fit: [700, 780]})
                        .addPage()
                }
                doc.end();
            })
        });
});

// error ha ndler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });

app.listen(3000)

module.exports = app;
