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

// Chaque user va avoir sa propre connection socket
io.on('connection', function (socket) {

    var me;
    // console.log(socket);
   console.log('Client connecté');

   socket.on('login', function (login) {
       me = user;
       console.log(login);
   });
});