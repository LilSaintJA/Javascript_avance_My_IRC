/*global console, $, jQuery */
(function ($) {
    'use strict';

    function log(D) {
        console.log(D);
    }

    log("jQuery Is Ready");

    var socket = io();
    console.log(socket);
    console.log(socket);
    socket.emit('join', {msg: "vbjlshvnln"});

    $('#signupForm').submit(function (evt) {
        log('prevendDefault');
       // evt.preventDefault();


       socket.emit('newUsr', {
           pseudonyme: $('#pseudonyme').val(),
           email: $('#email').val(),
           pass: $('#pass').val(),
           confirmPass: $('#confirmPass').val(),
           dob: $('#dob').val()
       });

       // Envoie d'événement login avec socket au server
       // socket.emit('login', {
       //     pseudo    : $('#pseudo').val(),
       //     mdp       : $('#mdp').val()
       // });
    });


    /**
     * Gestion des connectés
     */
    /*socket.on('newusr', function (user) {
        console.log(user);
        // $('.users').append('<img src="' + user.avatar +'">');
        $('.users').append('<div><p>' + user.pseudo + '</p></div>');
        log('Nouvel utilisateur');
    });

    socket.on('disUser', function (user) {
        $('#' + user.id).remove();
    });*/

})(jQuery);