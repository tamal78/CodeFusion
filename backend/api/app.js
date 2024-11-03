// backend/api/app.js
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

// Update paths to match the new location
var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');

var app = express();

// View engine setup
app.set('views', path.join(__dirname, '../views')); // Adjusted for new location
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public'))); // Adjusted for new location

app.use(cors());

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Error handling
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});



// Export the app for Vercel
module.exports = app;
