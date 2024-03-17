// @ts-nocheck
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        default: '',
        required: [true, 'Username cannot be empty']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    }
})

userSchema.pre('create', function (req, res, next) {

    next()
})
module.exports = mongoose.model('User', userSchema);
