require("dotenv").config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');
const compression = require('compression');
const vhost = require("vhost");
require("./mvc/models/db");

const indexRouter = require('./mvc/routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'mvc', 'views'));
app.set('view engine', 'ejs');

app.use(fileUpload());
app.use(compression());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "angular", "build")));

const parentApp = express();
parentApp.use(vhost(`api.${process.env.DOMAIN}`, require(`${__dirname}/../kotAPI/app`)))
.use(vhost(process.env.DOMAIN, app))

app.disable("x-powered-by");

app.use('/', (req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use('/', indexRouter);

app.get("*", function(req, res, next) {
    res.sendFile(path.join(__dirname, "angular", "build", "index.html"));
});

module.exports = parentApp;
