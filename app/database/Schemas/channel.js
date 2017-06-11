/*global console, require, module */
var mongoose = require('mongoose');

var channelSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date_creation: { type: Date, default: Date.now() },
    connections: { type: [{ userId: String, socketId: String }]
                 }
});

var channelModel = mongoose.model('channel', channelSchema);

module.exports = channelModel;