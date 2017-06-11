/*global console, process, require, module */
var init = function () {
    'use strict';
    if (process.env.NODE_ENV === 'development') {

        var redisURI = require('url').parse(process.env.REDIS_URL),
            redisPassword = redisURI.auth.split(':')[1];
        return {
            db: {
                username: process.env.dbUsername,
                password: process.env.dbPassword,
                host: process.env.dbHost,
                port: process.env.dbPort,
                name: process.env.dbName
            },
            sessionSecret: process.env.sessionSecret,
            redis: redisURI.hostname,
            port: redisURI.port,
            password: redisPassword
        };
    } else {
        return require('./config.json');
    }
};

module.exports = init();