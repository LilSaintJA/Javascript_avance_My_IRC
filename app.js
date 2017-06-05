/*global console, require, process, module */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var socketIo = require('socket.io');
var hbs = require('express-handlebars');

var app = express();

var io = socketIo();
app.io = io;

io.on('connection', function (socket) {
   console.log("A user connected");

   socket.on('newUsr', function (data) {
      console.log(data);
      // io.emit('messages', 'Hello from server');
   });
});

var pwdHash = require('password-hash');


// view engine setup
app.engine('handlebars', hbs({extname: '.hbs'}));
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

var index = require('./routes/index')(io);
var users = require('./routes/users');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect("mongodb://localhost:27017/tchatJS");

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// Chaque user va avoir sa propre connection socket
/*io.on('connection', function (socket) {

    var me = false;
    // console.log(socket);
    console.log('Client connecté');

    for (var k in users) {
        socket.emit('newusr', users[k]);
    }

    /!**
     * Un utilisateur ce connecte
     *!/
    socket.on('login', function (login) {


        me          = login;
        console.log(me);
        me.id       = login.pseudo;
        me.pseudo   = login.pseudo;
        me.avatar   = 'https://gravatar.com/avatar/' + pwdHash.generate(login.pseudo) + '?s=50';
        io.emit('logged');
        users[me.id] = me;
        io.emit('newusr', me);
        // console.log(me.id);
        // console.log(login);
    });

    /!**
     * Un utilisateur ce déconnecte
     *!/
    socket.on('disconnect', function () {
        if (!me) {
            return false;
        }
        delete users[me.id];
        io.emit('disUsr', me);
    });

});*/

module.exports = app;
