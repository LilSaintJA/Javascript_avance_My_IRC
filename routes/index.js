/*global console, require, module */

module.exports = function (io) {
    var express = require('express');
    var router = express.Router();
    var mongoose = require('mongoose');

    mongoose.connect('mongodb://localhost:27017/tchatJS');

    var userSchema = new mongoose.Schema({
        pseudonyme: { type: String, unique: true },
        email: String,
        pass: String,
        confirmPass: String,
        dob: Date
    }, {collection: 'users'});

    var UserData = mongoose.model('userSchema', userSchema);

    UserData.aggregate({
        $project: {
            yearMonthDay: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }
        }
    });

    /* GET home page. */
    router.get('/', function (req, res, next) {
        'use strict';
        res.render('index');
    });

    router.post('/', function (req, res, next) {
        'use strict';
        var item,
            user;
        item = {
            pseudonyme: req.body.pseudonyme,
            email: req.body.email,
            pass: req.body.pass,
            confirmPass: req.body.confirmPass,
            dob: req.body.dob
        };

        user = new UserData(item);
        user.save(function (err) {
            if (err) {
                res.send(err);
            }
            console.log('Item inserted');
            // res.render('index', { title: 'Inscription réussit' });
            res.redirect('/');
        });

    });

    return router;
};