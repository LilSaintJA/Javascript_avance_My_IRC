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
        $('.socialBtn').show();
    });

    signupLink.click(function () {
        $('.hiddenSignup').animate({height: "toggle", opacity: "toggle"}, "slow");
        $('.hiddenLogin, .socialBtn').hide();
    });

})(jQuery);