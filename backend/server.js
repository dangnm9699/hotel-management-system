const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser');
const cors = require('cors')

const routes = require('./routes/routes')

const port = require('./config/config').port
const dir = path.join(__dirname, 'Public');

const app = express();
var allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://yourapp.com'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    optionsSuccessStatus: 200,
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use('/public', express.static(dir));

routes(app)

app.listen(port, () => console.log('RESTFul API running on :', port));
