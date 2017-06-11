/*global console, require */
//'use strict';

var channelModel    = require('../database').models.channel;
var User            = require('../models/user');

var create = function (data, callback) {
    var newChannel = new channelModel(data);
    newChannel.save(callback);
};

var find = function (data, callback) {
    channelModel.find(data, callback);
};

var findOne = function (data, callback) {
    channelModel.findOne(data, callback);
};

var findById = function (id, callback) {
    channelModel.findById(id, callback);
};

/**
 * Find the document by "_id" and update it
 * ONLY the fields in the model will be updated
 * nb: { new: true } => to return the modified document rather than the original
 *
 * @param id
 * @param data
 * @param callback
 */
var findByIdAndUpdate = function (id, data, callback) {
    channelModel.findByIdAndUpdate(id, data, { new: true }, callback);
};

/**
 *
 * @param channel
 * @param socket
 * @param callback
 */
var addUser = function (channel, socket, callback) {

    var userId = socket.request.session.passport.user;

    var conn = { userId: userId, socketId: socket.id };
    channel.connections.push(conn);
    channel.save(callback);
};

/**
 * Get all users in a channel
 *
 * @param channel
 * @param socket
 * @param callback
 */
var getUsers = function (channel, socket, callback) {

    var users = [],
        vis = {},
        count = 0,
        userId = socket.request.session.passport.user;

    channel.connections.forEach(function (conn) {

        if (conn.userId === userId) {
            count += 1;
        }

        if (!vis[conn.userId]) {
            users.push(conn.userId);
        }
        vis[conn.userId] = true;
    });

    users.forEach(function (userId, i) {
        User.findById(userId, function (err, user) {
            if (err) { return callback(err); }

            users[i] = user;

            if (i + 1 === users.length) {
                return callback(null, users, count);
            }
        });
    });

};

/**
 * Remove user corresponding socket from a channel
 * @param socket
 * @param callback
 */
var removeUser = function (socket, callback) {

    var userId = socket.request.session.passport.user;

    find(function (err, channels) {
        if (err) { return callback(err); }

        channels.every(function (channel) {
            var pass = true,
                count = 0,
                target = 0;

            channel.connections.forEach(function (conn, i) {
                if (conn.userId === userId) {
                    count += 1;
                }

                if (conn.socketId === socket.id) {
                    pass = false;
                    target = i;
                }
            });

            if (!pass) {
                channel.connections.id(channel.connections[target]._id).remove();
                channel.save(function (err) {
                    callback(err, channel, userId, count);
                });
            }

            return pass;
        });
    })
};

module.exports = {
    create,
    find,
    findOne,
    findById,
    addUser,
    getUsers,
    removeUser
};