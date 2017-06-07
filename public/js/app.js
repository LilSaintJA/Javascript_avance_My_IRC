/*global console, $, jQuery */

(function ($) {
    'use strict';
    console.log("App is Ready");

    var loginLink   = $('.loginBtn'),
        signupLink  = $('.signupBtn');

    $('.hiddenLogin').show();

    loginLink.click(function () {
        console.log('pout');
        $('.hiddenLogin').animate({height: "toggle", opacity: "toggle"}, "slow");
        $('.hiddenSignup').hide();
    });

    signupLink.click(function () {
       $('.hiddenSignup').animate({height: "toggle", opacity: "toggle"}, "slow");
       $('.hiddenLogin').hide();
    });

    // $('.datepicker').pickadate({
    //     selectMonths: true,
    //     selectYears: 100,
    //     format: 'dd-mm-yyyy'
    // });

})(jQuery);