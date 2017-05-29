/*global console, require, __dirname */

var express,
    app,
    server,
    http,
    socket;
//
// // On initialise l'application avec le framework Express
// // Et la bibliothéque http intégrée à node
// express = require('express');
// app = express();
// // Création du serveur
// server = require('http').createServer(app);
//
// // Lancement du serveur
// app.get('/', function (req, res) {
//     'use strict';
//     res.sendfile(__dirname + '/index.html');
//     app.use(express.static(__dirname, 'css'));
//     app.use(express.static(__dirname, 'js'));
// });
//
// // Rattachement du serveur à un port
// server.listen(8080);
//
// // Init Socket.io
// socket = require('socket.io')(server);

http = require('http');
socket = require('socket.io');
express = require('express');
app = express();

server = http.createServer(function (req, res) {
    'use strict';
    console.log('Le serveur est lancé');
    // res.sendfile(__dirname + '/index.html');
    // app.use(express.static(__dirname, 'css'));
    // app.use(express.static(__dirname, 'js'));
});

server.listen(8080);

socket.listen(server);