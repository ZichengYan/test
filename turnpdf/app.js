var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var PDF = require('pdfkit');
var fs = require('fs');
var index = require('./routes/index');
var users = require('./routes/users');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.json({type:"parameters.too.many",  limit:"1000000009999mb"}));
// app.use(bodyParser.urlencoded({type:"parameters.too.many", limit: "9999999kb", extended: true}));
// app.use(bodyParser.text({type:"parameters.too.many", limit: "999999999kb", extended: true}));
// app.use(bodyParser({limit: '50mb'}))
// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb'}));
var jsonParser = bodyParser.json({limit: 1024 * 1024 * 20, type: 'application/json'});
var urlencodedParser = bodyParser.urlencoded({extended: true, limit: 1024 * 1024 * 20, type: 'application/x-www-form-urlencoding'})
app.use(jsonParser);
app.use(urlencodedParser);
// app.use('/', index);
// app.use('/users', users);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });


app.all(function () {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');

})
app.post('/pdf', function (req, res) {
    console.log(req.body.title);
    var base64Data = req.body.imgData.replace(/^data:image\/png;base64,/, "");
    base64Data = decodeURI(base64Data);
    var binaryData = new Buffer(base64Data, 'base64').toString('binary');
    fs.writeFile('./uploads/out.png', binaryData, 'binary', function (err) {
        if (err) {
            console.log(err);
        }
    });
    res.send('saved.');
});

// error handler
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
