/*global console, $, jQuery */
(function ($) {
    'use strict';

    function log(D) {
        console.log(D);
    }

    log("jQuery Is Ready");

    var socket = io();

    $('#loginForm').submit(function (evt) {
       evt.preventDefault();

       // Envoie d'événement login avec socket au server
       socket.emit('login', {
           pseudo    : $('#pseudo').val(),
           mdp       : $('#mdp').val()
       });
    });

    socket.on('logged', function () {
       $('#loginForm').toggle('slow');
    });


    /**
     * Gestion des connectés
     */
    socket.on('newusr', function (user) {
        // $('.users').append('<img src="' + user.avatar +'">');
        $('.users').append('<div id="' + user.id + '"><p>' + user.pseudo + '</p></div>');
        log('Nouvel utilisateur');
    });

    socket.on('disUser', function (user) {
        $('#' + user.id).remove();
    });

})(jQuery);