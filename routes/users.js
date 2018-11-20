var express = require('express');
var router = express.Router();
var path = require('path');
var Admin = require('../models').Admin;
var User = require('../models').User;
var app = express();


router.post('/login', function(req, res, next) {
  Admin.findOne({ where: {username: req.body.username1, password: req.body.password} }).then(function(user) {
    console.log(user);
    if(user){
      console.log("Hie admin");
      req.session.user = 'library@place';
      res.render('dashboard',{user: req.body.username1});
    }
    else{
      User.findOne({ where: {username: req.body.username1, password: req.body.password} }).then(function(user) {
        console.log(user);
        if(user){
          console.log("Hie user");
          req.session.user = 'library@place';
          res.render('user',{user: req.body.username1});
        }
        else{
          res.redirect('/');
        }
      })
    }
  })

});

router.post('/signup', function(req, res, next){
  if(req.body.pwd1 == req.body.pwd2){
    User
    .findOrCreate({where: {email: req.body.email}})
    .spread((user, created) => {
      console.log(user.get({
        plain: true
      }))
      console.log(created)
      if(created){
        User.update(
          { username: req.body.username2,
            password: req.body.pwd1
          },
          { where: { email: req.body.email } }
        )
        .then((result) => res.status(200).send("Database updated!"))
        .catch((error) => res.status(400).send(error))
      }
      else{
        res.status(201).send("User already exists!")
      }
      })
  }
  else{
    res.status(201).send("Passwords do not match!")
  }


});

router.get('/logout', function(req,res,next){
  req.session.user = null;
  res.redirect('/');
});

module.exports = router;
