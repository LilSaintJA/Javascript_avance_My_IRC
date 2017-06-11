/*global console, module, require */
var config  = require('../config');

var Channel = require('../models/channel');

/**
 * All code for emitting and listening to Socket events
 *
 * @param io
 */
var ioEvents = function (io) {
    'use strict';

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

    /**
     * Create a custum "tchat" namespace
     */
    io.of('/tchat').on('connection', function (socket) {

        socket.on('join', function (channelId) {
            Channel.findById(channelId, function (err, channel) {
                if (err) throw err;

                if (!channel) {
                    socket.emit('updateUsersList', { error: "Heu je crois pas nan....." });
                } else {
                    if (socket.request.session.passport == null) {
                        return false;
                    }

                    Channel.addUser(channel, socket, function (err, newChannel) {

                        socket.join(newChannel.id);

                        Channel.getUsers(newChannel, socket, function (err, users, countUserChannel) {

                            if (err) throw err;

                            socket.emit('updateUsersList', users, true);

                            if (countUserChannel === 1) {
                                socket.broadcast.to(newChannel.id).emit('updateUsersList', users[users.length - 1]);
                            }
                        });
                    });
                }
            });
        });

        socket.on('disconnect', function () {

            if (socket.request.session.passport == null) {
                return false;
            }

            Channel.removeUser(socket, function (err, channel, userId, countUserChannel) {
                if (err) throw err;

                socket.leave(channel.id);

                if (countUserChannel === 1) {
                    socket.broadcast.to(channel.id).emit('removeUser', userId);
                }
            });
        });

        socket.on('newMsg', function (channelId, message) {
            socket.broadcast.to(channelId).emit('addMsg', message);
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