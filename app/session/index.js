'use strict';

var session         = require('express-session');
var mongoStore      = require('connect-mongo')(session);
var db              = require('../database');
var config          = require('../config');

var init = function () {
    if (process.env.NODE_ENV === 'development') {
        return session({
            secret: config.sessionSecret,
            resave: false,
            saveUninitialized: false,
            unset: 'destroy',
            store: new mongoStore({
                mongooseConnection: db.mongoose.connection
            })
        });
    } else {
        return session({
            secret: config.sessionSecret,
            resave: false,
            unset: 'destroy',
            saveUninitialized: true
        });
    }
};

module.exports = init();