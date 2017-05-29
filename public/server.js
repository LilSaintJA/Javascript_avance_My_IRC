/*global console, require, __dirname */

var express,
    app,
    server,
    io;
//
// On initialise l'application avec le framework Express
// Et la bibliothéque http intégrée à node
express = require('express');
app = express();
// Création du serveur
server = require('http').createServer(app);

// Lancement du serveur
app.get('/', function (req, res) {
    'use strict';
    res.sendfile(__dirname + '/index.html');
    app.use(express.static(__dirname, 'css'));
    app.use(express.static(__dirname, 'js'));
});

// Rattachement du serveur à un port
server.listen(8080);

// Init Socket.io
io = require('socket.io')(server);
io.on('connection', function (socket) {
   console.log('Client connecté');
});