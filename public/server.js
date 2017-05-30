/*global console, require, __dirname */

var express,
    app,
    http,
    io,
    mongoClient;
//
// On initialise l'application avec le framework Express
// Et la bibliothéque http intégrée à node
express = require('express');
app = express();

// Création du serveur
http = require('http').Server(app);

// Init socket
io = require('socket.io')(http);

mongoClient = require('mongodb').MongoClient;
// console.log(mongoClient);

// Lancement du serveur
app.get('/', function (req, res) {
    'use strict';
    res.sendFile(__dirname + '/index.html');
    app.use(express.static(__dirname, 'css'));
    app.use(express.static(__dirname, 'js'));
});

// On écoute le serveur
http.listen(8080);

// Connection MongoDB
mongoClient.connect("mongodb://localhost:27017/tchatJS", function (error, db) {

    var collection = db.collection('users');

    if (error) return console.error('Connection failed', error);

    // console.log("Connecté à la base de données 'tchatJS'");

    collection.find().toArray(function (error, results) {
        if (error) throw error;
        // console.log(results);

        results.forEach(function (obj) {
            // console.log('je passe dans la boucle');
            console.log('ID : ' + obj._id.toString());
            console.log('Pseudo : ' + obj.pseudo);
            console.log('Mdp : ' + obj.mdp);
        });
    });

    db.close();
});

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