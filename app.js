var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var index = require('./routes/index');
var users = require('./routes/users');
var models = require('./models')
var Admin = require('./models').Admin;

var app = express();

// models.sequelize.sync({force: true}).then(() => {});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret : 'naive$soul',
  resave : false,
  saveUninitialized : true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

Admin
  .findOrCreate({where: {username: 'admin'}, defaults: {password: '123'}})
  .spread((user, created) => {
    console.log(user.get({
      plain: true
    }))
    console.log(created)
  })

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
