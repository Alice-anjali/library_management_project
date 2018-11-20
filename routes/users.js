var express = require('express');
var router = express.Router();
var path = require('path');
var Admin = require('../models').Admin;
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

module.exports = router;
