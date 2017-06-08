'use strict';

var mongoose = require('mongoose');

var channelSchema = new mongoose.Schema({
    title: { type: String, required: true },
    connections: { type: [{ userId: String, socketId: String }]
    }
});

var channelModel = mongoose.model('channel', channelSchema);

module.exports = channelModel;