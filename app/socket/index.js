var config  = require('../config');
var redis   = require('redis').createClient();
var adapter = require('socket.io-redis');

var Channel = require('../models/channel');

/**
 * All code for emitting and listening to Socket events
 *
 * @param io
 */
var ioEvents = function (io) {

    /**
     * Create a custum "channels" namespace
     * Cela permet d'isoler les connections pour les channels
     */
    io.of('/channels').on('connection', function (socket) {

        socket.on('createChannel', function (title) {
            Channel.findOne({'title': new RegExp('^' + title + '$', 'i')}, function (err, channel) {
                if (err) throw err;

                if (channel) {
                    socket.emit('updateChannelList', { error: "La channel existe déjà" });
                } else {
                    Channel.create({
                        title: title
                    }, function (err, newChannel) {
                        if (err) throw err;
                        socket.emit('updateChannelList', newChannel);
                        socket.broadcast.emit('updateChannelList', newChannel);
                    });
                }
            });
        });
    });
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
    ioEvents(io);

    // The server object will be then used to list to a part number
    return server;
};

module.exports = init;