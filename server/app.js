const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const pe = require('parse-error');
const helmet = require('helmet')

const apiRoutes = require('./routes/api');
const app = express();

const CONFIG = require('./config/config');

app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());

console.log("Environment:", CONFIG.app)
// database
const models = require("./models");

app.use(cors());

app.use('/api', apiRoutes);

app.use('/', function(req, res){
	res.statusCode = 200;//send the appropriate status code
	res.json({ status:"success", message:"Project Tracker API", data:{} })
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

process.on('unhandledRejection', error => {
    console.error('Uncaught Error', pe(error));
});
