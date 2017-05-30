/*global console, $, jQuery */

(function ($) {
    'use strict';

    var btn = $('.loginBtn');
    // console.log(btn);

    btn.click(function () {
       // var form = $('.hidden');
       //
       // form.toggle(display);
       // console.log(form);
        $('.hidden').toggle('slow');
    });
})(jQuery);