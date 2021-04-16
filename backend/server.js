var routes = require('./Routes/routes')
var express = require('express')
var path = require('path')
const cookieParser = require('cookie-parser');

var dir = path.join(__dirname, 'Public');
var app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.static(dir));
routes(app)
//trả về 404 nếu đường dẫn không tồn tại
app.use(function (req, res) {
    res.status(404).send({
        url: req.originalUrl + ' not found'
    })
});

app.listen(8080, () => console.log('RESTFul API running on http://localhost:8080/'));
