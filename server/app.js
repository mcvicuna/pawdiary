var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');

var routes = require('./routes/index');
var users = require('./routes/user');
var profile = require('./routes/profile');
var dogs = require('./routes/dogs');
var trials = require('./routes/trials');
var summary = require('./routes/summary');

var app = express();

var wagner = require('wagner-core');
var dependencies = require('./dependencies')(wagner, app);
var model = require('./schemas/model.js')(wagner);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  genid: function (req) {
    return require('crypto').randomBytes(48).toString('hex'); // use UUIDs for session IDs
  },
  secret: wagner.get('Config').sessionSecret
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', routes);
app.use('/', users);
app.use('/', profile);
app.use('/', dogs);
app.use('/', trials);
app.use('/', summary);

wagner.invoke(require('./services/auth'), { app: app, wagner: wagner });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    if (err.status == 401) {
      if (res.headersSent) {
        return next(err);
      }
      res.status(err.status);
      res.render('error', {
        message: err.message,
        error: err
      });
    }
    else {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    }
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
