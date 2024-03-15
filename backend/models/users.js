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

// // Passport-Local Mongoose will add a username, hash and salt field to store the username, the hashed password and the salt value.
// userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);
