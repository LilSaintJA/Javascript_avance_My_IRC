/*global console, $, jQuery */
(function ($) {
    'use strict';

    function log(D) {
        console.log(D);
    }

    log("jQuery Is Ready");

    var socket = io('http://localhost:8080');

    $('#loginForm').submit(function (evt) {
       evt.preventDefault();

       // Envoie d'événement login avec socket au server
       socket.emit('login', {
           pseudo   : $('#pseudo').val(),
           mail     : $('#mdp').val()
       });
    });

    // log(socket);
})(jQuery);