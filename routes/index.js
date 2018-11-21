var express = require('express');
var router = express.Router();
var path = require('path');
var Admin = require('../models').Admin;
var User = require('../models').User;
var Books = require('../models').Books;
var Issue = require('../models').Issue;
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
    Books.findAll({}).then(function(booklist) {
        Issue.findAll({}).then(function(issuelist) {
            res.render('booklist', {booklist : booklist, issuelist : issuelist});
        })
      })
});

router.get('/user_home', loggedincheck, function(req,res,next){
  Books.findAll({}).then(function(booklist) {
    res.render('user', {booklist : booklist});
  })
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
     Issue.create({
       book_id: req.body.book_id,
       issuer: req.body.issuer,
       issue_date: req.body.hidden_date,
       return_date: req.body.return_date,
       availability: req.body.availability
     }).then(data => {
       res.redirect('/home');
     }).catch((error) => res.status(400).send(error))

   }).catch((error) => res.status(400).send(error))

});

router.post('/editbook', loggedincheck, function(req,res,next){
  Books.findOne({ where: { book_id: req.body.book_id1 } })
  .then(function(data) {
    if(typeof(req.body.authors1 == "string")){
      var authors_string = req.body.authors1;
      var authors_array = authors_string.split(",");
    }else{
      var authors_array = req.body.authors1;
    }

    if (data) {
      data.updateAttributes({
        book_name: req.body.book_name1,
        authors: authors_array,
        edition: req.body.edition1,
        publisher: req.body.publisher1,
        category: req.body.category1,
        issuer: req.body.issuer1,
        library_input_date: req.body.library_input_date1,
        issue_date: req.body.issue_date1,
        return_date: req.body.return_date1,
        availability: req.body.availability1
      })
      .then(function(value){
        Issue.create({
          book_id: req.body.book_id1,
          issuer: req.body.issuer1,
          issue_date: req.body.issue_date1,
          return_date: req.body.return_date1,
          availability: req.body.availability1
        }).then(data => {
          res.redirect('/home');
        }).catch((error) => res.status(400).send(error))
      })
    }
  })
});

router.post('/returnbook', loggedincheck, function(req,res,next){
  Books.findOne({ where: { book_id: req.body.returnissue_id } })
  .then(function(data) {
    if (data) {
      data.updateAttributes({
        issuer: req.body.returnedby,
        return_date: req.body.returndate,
        availability: true
      })
      .then(function(value){
        Issue.create({
          book_id: req.body.returnissue_id,
          issuer: req.body.returnedby,
          issue_date: req.body.issuedate,
          return_date: req.body.returndate,
          availability: true
        }).then(data => {
          res.redirect('/home');
        }).catch((error) => res.status(400).send(error))
      })
    }
  }).catch((error) => res.status(400).send(error))
});

router.post('/deletebook', loggedincheck, function(req,res,next){
  Books.destroy({
    where: {
       book_id: req.body.delete_id
    }
  }).then(function(){
    Issue.destroy({
      where: {
         book_id: req.body.delete_id
      }
    }).then(function(){
      res.redirect('/home');
    }).catch((error) => res.status(400).send(error))
  }).catch((error) => res.status(400).send(error))

});

module.exports = router;
