var createError = require('http-errors');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var indexRouter = require('./routes/index');
const errorHandler = require('./middleware/error.middleware');

var app = express();
require('dotenv').config();
// Passport config
require('./config/passport');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// connect MongoDB
require('dotenv').config();
mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', () => console.error('Database connection failed'));
db.once('open', async () => {
  console.info('Database connection established...');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.redirect('/404');
});

// error handler
app.use(errorHandler);

module.exports = app;
