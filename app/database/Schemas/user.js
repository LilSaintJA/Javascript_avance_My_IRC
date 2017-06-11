/*global console, require, module */

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

const SALT_WORK_FACTOR = 10;
const DEFAULT_USER_PICTURE = '/img/user.png';

/**
 * Schema for User
 */
var UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, default: null },
    socialId: { type: String, default: null },
    picture: { type: String, default: DEFAULT_USER_PICTURE }
});

UserSchema.pre('save', function (next) {
    var user = this;

    if (!user.picture) {
        user.picture = DEFAULT_USER_PICTURE;
    }

    if(!user.isModified('password')) return next();

    /**
     * Generate Salt w/technique 1
     * doc: https://www.npmjs.com/package/bcrypt
     */
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // Hash the password using ou new salt
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();

        });
    })
});

UserSchema.methods.validatePassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

// Create a User Model
var UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;