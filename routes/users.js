var express = require('express');
var router = express.Router();
var path = require('path');
var Admin = require('../models').Admin;
var User = require('../models').User;
var app = express();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/login', function(req, res, next) {
  Admin.findOne({ where: {username: req.body.username, password: req.body.password} }).then(project => {
    console.log("Hie admin");
  })
  // Admin.findOne({admin : req.body.username, password : req.body.password},function(err,admin){
  //   if (err){
  //     res.redirect('/logout');
  //   }
  //   else{
  //     if(admin){
  //       req.session.admin = 'library@svnit';
  //        res.redirect('/dashboard');
  //     }
  //     else{
  //       res.redirect('/');
  //     }
  //   }
  // })
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

  // res.redirect('/');

});

module.exports = router;
