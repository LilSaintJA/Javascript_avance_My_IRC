var app = {

    channels: function () {
        var socket = io('/channels', { transports: ['websocket'] });

        socket.on('connect', function () {

            socket.on('updateChannelList', function (channel) {

                $('.createChannel p.msg').remove();

                if (channel.error != null) {
                    $('.createChannel').append(`<p class="msg error">${channel.error}</p>`);
                } else {
                    app.helpers.updateChannelList(channel);
                }
            });

            $('.createChannel button').click(function (evt) {
                var inputEl = $("input[name='titleChannel']");
                var channelTitle = inputEl.val().trim();

                if (channelTitle !== '') {
                    socket.emit('createChannel', channelTitle);
                    inputEl.val('');
                }
            });
        });
    },


    helpers: {

        encodeHTML: function (str) {
            return $('<div />').text(str).html();
        },

        updateChannelList: function (channel) {
            channel.title = this.encodeHTML(channel.title);
            var html = `<a href="/tchat/${channel._id}" class="center-align #880e4f pink darken-4 collection-item"><li class="channelItem white-text">${channel.title}</li></a>`;

            if (html === '') {
                return false;
            }

            if ($('.channelList ul li').length > 0) {
                $('.channelList ul').prepend(html);
            } else {
                $('.channelList ul').html('').html(html);
            }

            this.updateNumOfChannels();
        },

        updateNumOfChannels: function () {
            var num = $('.channelList ul li').length;
            $('.channelNum').text(num + " Channel(s) ouvert(s)");
        }
    }
};