var express = require('express');
var router = express.Router();
var path = require('path');
var Admin = require('../models').Admin;
var User = require('../models').User;
var Books = require('../models').Books;
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

router.get('/home', loggedincheck, function(req,res,next){
  Books.findAll({ where: {availability: false} }).then(function(due_books) {
      Books.findAll({ where: {availability: true} }).then(function(available_books) {
          res.render('dashboard', {due_books : due_books, available_books : available_books});
      })
    })
});

router.get('/books', loggedincheck, function(req,res,next){
  res.render('booklist',{});
});

router.get('/user_home', loggedincheck, function(req,res,next){
  res.render('user',{});
});

router.post('/additem', loggedincheck, function(req,res,next){
  var authors_string = req.body.authors;
  var authors_array = authors_string.split(",");
  Books.create({
    book_id: req.body.book_id,
    book_name: req.body.book_name,
    authors: authors_array,
    edition: req.body.edition,
    publisher: req.body.publisher,
    category: req.body.category,
    issuer: req.body.issuer,
    library_input_date: req.body.library_input_date,
    issue_date: req.body.hidden_date,
    return_date: req.body.return_date,
    availability: req.body.availability
   }).then(task => {
     res.redirect('/home');
   }).catch((error) => res.status(400).send(error))

});

module.exports = router;
