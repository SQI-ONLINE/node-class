const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    password: String
})

const User = mongoose.model('user', userSchema);

module.exports = User;