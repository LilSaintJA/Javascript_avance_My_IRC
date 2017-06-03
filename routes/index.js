var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');

var url = 'mongodb://localhost:27017/tchatJS';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function (req, res, next) {
   var item = {
       pseudonyme: req.body.pseudonyme,
       email: req.body.email,
       pass: req.body.pass,
       confirmPassword: req.body.confirmPassword,
       dob: req.body.dob
   };
   
   mongo.connect(url, function (error, db) {
      assert.equal(null, error);
      db.collection('signup').insertOne(item, function (err, results) {
         assert.equal(null, err);
         console.log('Item inserted');
         db.close();
      });
   });
});

module.exports = router;
