var app = {

    /**
     * Gestion de la création des channels
     */
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

    tchat: function (channelId, username) {

        var socket = io('/tchat', { transports: ['websocket'] });

        socket.on('connect', function () {

            socket.emit('join', channelId);

            socket.on('updateUsersList', function (users, clear) {

                if (users.error != null) {
                    $('.container').html(`<p class="message error">${users.error}</p>`);
                } else {
                    app.helpers.updateUsersList(users, clear);
                }
            });

            /*   $("textarea[name='message']").keyup(function (evt) {
             evt.preventDefault();
             if (evt.keyCode === 13) {
             console.log("Bien t'as appuyé sur entrée");
             // $(this).parents('form').submit();
             }
             });*/

            $('.sendMsg button').click(function () {

                var inputEl = $("input[name=message]");
                var messageCnt = inputEl.val().trim();

                if (messageCnt !== '') {
                    var message = {
                        content: messageCnt,
                        username: username,
                        date: Date.now()
                    };

                    socket.emit('newMsg', channelId, message);
                    inputEl.val('');
                    app.helpers.addMessage(message);
                }
            });

            socket.on('addMsg', function (message) {
                app.helpers.addMessage(message);
            });
        });
    },


    helpers: {

        encodeHTML: function (str) {
            return $('<div />').text(str).html();
        },

        // Update Channel List
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

        // Update User List
        updateUsersList: function (users, clear) {
            if (users.constructor !== Array) {
                users = [users];
            }

            var html = '';

            for(var user of users) {
                console.log('Je rentre dans la boucle');
                user.username = this.encodeHTML(user.username);
                //language=HTML
                html += `<li class="collection-item avatar" id="user-${user._id}">
                            <img src="${user.picture}" alt="avatar-${user.username}" class="circle">
                            <div class="row">
                                <p>${user.username}</p>
                                <p><i class="fa fa-circle online #66bb6a green-text lighten-1"></i> En ligne</p>
                            </div>
                        </li>`;
            }

            if (html === '') {
                return false;
            }

            if (clear != null && clear === true) {
                $('.usersList ul').html('').html(html);
            } else {
                $('.usersList ul').prepend(html);
            }

            this.updateNumOfUser();
        },

        // Add new message tchat history
        addMessage: function (message) {
            message.date          = (new Date(message.date)).toLocaleDateString();
            message.username      = this.encodeHTML(message.username);
            message.content       = this.encodeHTML(message.content);

            var html = `<li>
                            <span>${message.username}</span>
                            <span>${message.date}</span>
                        <div class="newMsg">
                            <p>${message.content}</p>
                        </div>
                      </li>`;
            $(html).hide().appendTo('.chatMsg ul').slideDown(200);


        },

        updateNumOfChannels: function () {
            var num = $('.channelList ul li').length;
            $('.channelNum').text(num + " Channel(s) ouvert(s)");
        },

        updateNumOfUser: function () {
            var num = $('.usersList ul li').length;
            $('.usersNum').text(num + " user(s) connecté(s)");
        }
    }
};