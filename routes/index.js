var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// var assert = require('assert');

// var url = 'mongodb://localhost:27017/tchatJS';

mongoose.connect('mongodb://localhost:27017/tchatJS');

var userSchema = new mongoose.Schema({
    pseudonyme: { type: String, unique: true },
    email: String,
    pass: String,
    confirmPassword: String,
    dob: Date
}, {collection: 'signup'});

var UserData = mongoose.model('userSchema', userSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', function (req, res, next) {
   var item = {
       pseudonyme: req.body.pseudonyme,
       email: req.body.email,
       pass: req.body.pass,
       confirmPassword: req.body.confirmPassword,
       dob: req.body.dob
   };

    var user = new UserData(item);
    user.save();
   
   /*mongo.connect(url, function (error, db) {
      assert.equal(null, error);
      db.collection('signup').insertOne(item, function (err, results) {
         assert.equal(null, err);
         console.log('Item inserted');
         res.render('index', { title: 'Inscription réussit' });
         db.close();
      });
   });*/
   res.redirect('/');
});

module.exports = router;
