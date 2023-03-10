var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const  cors = require('cors');
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var searchRouter = require('./routes/search');
var geocode = require('./routes/googleGeocode');
var autocomplete = require('./routes/autocomplete');
var details = require('./routes/details');
var reviews = require('./routes/reviews');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, './dist/hw8')));

app.use('/', indexRouter);
app.use('/search', searchRouter);
app.use('/geocode', geocode);
app.use('/autocomplete', autocomplete);
app.use('/details', details);
app.use('/reviews', reviews);

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

module.exports = app;
