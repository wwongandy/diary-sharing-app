var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const routes = require('./routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Using the routes file to manage all the URL routing.
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/*
    Connecting to the local MongoDB server.
    Uses Mongoose to establish connections with MongoDB.

    TODO:
    This will be setup to use an actual mLab MongoDB later.
 */
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/diariesdb', { useNewUrlParser: true });

let db = mongoose.connection;

db.on('error', (err) => {
    console.log(`Error found, unable to connect to ${db.name}.\n${err}`);
})

db.once('open', () => {
    console.log(`Success, connected to ${db.name}.`);
})

module.exports = app;
