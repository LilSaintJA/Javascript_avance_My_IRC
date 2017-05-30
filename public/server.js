/*global console, require, __dirname */

var express,
    app,
    http,
    io;
//
// On initialise l'application avec le framework Express
// Et la bibliothéque http intégrée à node
express = require('express');
app = express();

// Création du serveur
http = require('http').Server(app);

// Init socket
io = require('socket.io')(http);

// Lancement du serveur
app.get('/', function (req, res) {
    'use strict';
    res.sendFile(__dirname + '/index.html');
    app.use(express.static(__dirname, 'css'));
    app.use(express.static(__dirname, 'js'));
});

// On écoute le serveur
http.listen(8080);

io.on('connection', function (socket) {
   console.log('Client connecté');
});