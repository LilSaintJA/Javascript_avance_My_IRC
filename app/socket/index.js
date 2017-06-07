'use strict';

var config  = require('../config');
var redis   = require('redis').createClient();
var adapter = require('socket.io-redis');

// var Channel = require('../models/channel');

/**
 * All code for emitting and listening to Socket events
 *
 * @param io
 */
var ioEvents = function (io) {

};

/**
 * Initialize Socket.io
 *
 * @param app
 * @returns {*}
 */
var init = function (app) {

    var server = require('http').Server(app);
    var io = require('socket.io')(server);

    io.set('transports', ['websocket']);

    io.use((socket, next) => {
        require('../session')(socket.request, {}, next);
    });

    // Define all Events
    // ioEvents(io);

    // The server object will be then used to list to a part number
    return server;
};

module.exports = init;