// @ts-nocheck
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        default: '',
        unique: true,
        required: [true, 'Username cannot be empty']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    }
})

module.exports = mongoose.model('User', userSchema);

