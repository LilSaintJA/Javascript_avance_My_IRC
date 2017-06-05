var mongoose = require('mongoose');

var signupSchema = new mongoose.Schema({
    pseudonyme: { type: String, unique: true },
    mail: { type: String, unique: true },
    password: { type: String },
    confirmPassword: { type: String },
    dob: { type: Date }
});

var Signup = mongoose.model('signup', signupSchema);

module.exports = Signup;