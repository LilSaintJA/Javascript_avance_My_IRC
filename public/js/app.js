/*global console, $, jQuery */

(function ($) {
    'use strict';
    // console.log("App is Ready");

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
<<<<<<< HEAD
        format: 'yyyy-mm-dd'
=======
        format: 'dd-mm-yyyy'
>>>>>>> 25518f5c9dff81a13710e4312c22416f77af6cc8
    });

})(jQuery);