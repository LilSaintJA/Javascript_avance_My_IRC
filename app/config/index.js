/*global console, process, require, module */
var init = function () {
    'use strict';
    if (process.env.NODE_ENV === 'development') {

        return {
            db: {
                username: process.env.dbUsername,
                password: process.env.dbPassword,
                host: process.env.dbHost,
                port: process.env.dbPort,
                name: process.env.dbName
            }
            sessionSecret: process.env.sessionSecret,
        };
    } else {
        return require('./config.json');
    }
};

module.exports = init();