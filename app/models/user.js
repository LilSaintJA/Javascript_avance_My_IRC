/*global console, require, module */

var userModel = require('../database').models.user;

var create = function (data, callback) {
    'use strict';
    var newUser = new userModel(data);
    newUser.save(callback);
};

var findOne = function (data, callback) {
    'use strict';
    userModel.findOne(data, callback);
};

var findById = function (id, callback) {
    'use strict';
    userModel.findById(id, callback);
};

/**
 * Find a user, and create one if doesn't exist already
 * This method is used ONLY to find user accounts registered via Social Authentication.
 *
 * @param data
 * @param callback
 */
var findOrCreate = function (data, callback) {
    'use strict';
    findOne({ 'socialId': data.id }, function (err, user) {
        if (err) { return callback(err); }
        if (user) {
            return callback(err, user);
        } else {
            var userData = {
                username: data.displayName,
                socialId: data.id,
                picture: data.photos[0].value || null
            };

            // To avoid expired Facebook CDN URL
            // Request user's profile picture using user id
            // @see http://stackoverflow.com/a/34593933/6649553
            if (data.provider === "facebook" && userData.picture) {
                userData.picture = "http://graph.facebook.com/" + data.id + "/picture?type=large";
            }
            create(userData, function (err, newUser) {
                callback(err, newUser);
            });
        }
    });
};

/**
 * A middleware allows user to get to pages ONLY if the user is already logged in
 *
 * @param req
 * @param res
 * @param next
 */
var isAuthenticated = function (req, res, next) {
    'use strict';
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
};

module.exports = {
    create,
    findOne,
    findById,
    findOrCreate,
    isAuthenticated
};