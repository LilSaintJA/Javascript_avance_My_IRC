/*global console, require, __dirname */

var express,
    app,
    http,
    server;
//
// On initialise l'application avec le framework Express
// Et la bibliothéque http intégrée à node
express = require('express');
//
app = express();
//
server = require('http').createServer(app);

app.get('/', function (req, res) {
    'use strict';
    res.sendfile(__dirname + '/index.html');
    app.use(express.static(__dirname, 'css'));
    app.use(express.static(__dirname, 'js'));
});
server.listen(8080);