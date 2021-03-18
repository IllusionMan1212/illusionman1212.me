require("dotenv").config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');
const compression = require('compression');
const ratelimiter = require("./mvc/routes/middleware/ratelimiter");
require("./mvc/models/db");

const indexRouter = require('./mvc/routes/index');

const app = express();

app.use(fileUpload());
app.use(compression());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, "angular", "build")));

app.disable("x-powered-by");

app.use('/', (req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use("/api", indexRouter)

module.exports = app;
