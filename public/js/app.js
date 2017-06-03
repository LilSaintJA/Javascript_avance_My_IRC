/*global console, $, jQuery */

(function ($) {
    'use strict';

    var loginLink   = $('.loginBtn'),
        signupLink  = $('.signupBtn');

    loginLink.click(function () {

        $('.hiddenLogin').toggle('slow');
    });

    signupLink.click(function () {
       $('.hiddenSignup').toggle('slow');
    });

    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 100,
        format: 'dd-mm-yyyy'
    });

})(jQuery);