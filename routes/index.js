var express = require('express');
var router = express.Router();
var path = require('path');
var Admin = require('../models').Admin;
var User = require('../models').User;
var app = express();

/* GET login page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.resolve(__dirname + '/../public/index.html'));
});

var loggedincheck = function(req,res,next){
  if(req.session){
    if(req.session.user == 'library@place'){
      return next();
    }
    else{
      res.redirect('/');
    }
  }
  else{
    res.redirect('/');
  }
}

router.get('/books', loggedincheck, function(req,res,next){
  res.render('booklist',{});
});

router.get('/home', loggedincheck, function(req,res,next){
  res.render('dashboard',{});
});

module.exports = router;
