var express     = require('express');
var router      = express.Router();
var passport    = require('passport');

var User        = require('../models/user');
var Channel     = require('../models/channel');

/* GET home page. */
router.get('/', function(req, res, next) {

    if (req.isAuthenticated()) {
        res.redirect('/channels'); // rooms = channels
    } else {
        res.render('login', {
            success: req.flash('success')[0],
            errors: req.flash('error'),
            showRegisterForm: req.flash('showRegisterForm')[0]
        });
    }
});

/**
 *
 */
router.post('/login', passport.authenticate('local',
    {
        successRedirect: '/channels',
        failureRedirect: '/',
        failureFlash: true
    }
));

// Register via username & password
router.post('/register', function (req, res, next) {

    var credentials = {
        'username': req.body.username,
        'password': req.body.password
    };

    if (credentials.username === '' || credentials.password === '') {
        req.flash('error', 'Missing Credentials');
        req.flash('showRegisterForm', true);
        res.redirect('/');
    } else {

        // Check if username already exists for non-social account
        User.findOne(
            {
                'username': new RegExp('^' + req.body.username + '$', 'i'), 'socialId': null
            }, function (err, user) {
                if (err) throw err;

                if (user) {
                    req.flash('error', 'Username already exists');
                    req.flash('showRegisterForm', true);
                    res.redirect('/');
                } else {
                    User.create(credentials, function (err, newUser) {
                       if (err) throw err;
                       req.flash('success', 'Compte créé, tu peux te logger');
                       res.redirect('/');
                    });
                }
            });
    }
});

// Chanel
router.get('/channels', [User.isAuthenticated, function (req, res, next) {

    Channel.find(function (err, channels) {
        if (err) throw err;
        res.render('channels', { channels });
    });
}]);

module.exports = router;
