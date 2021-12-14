const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const helmet = require('helmet');
// const csurf = require('csurf');
const passport = require('passport');
const indexRouter = require('./routes/index');
const FileStore = require('session-file-store')(session);
const errorHandler = require('./middleware/api/error.middleware');

const fileStoreOptions = {
  ttl: 3600
};

const app = express();
//app.use(helmet());

require('dotenv').config();
// Passport config
require('./config/passport');
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

app.set('trust proxy', 1); // trust first proxy
app.use(session({
  // store: new FileStore(fileStoreOptions),
  secret: process.env.SESSION_SECRET,
  resave: false,
  rolling: true,
  saveUninitialized: true,
  cookie: { maxAge: 3600 * 1000 * 24 * 1},
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
