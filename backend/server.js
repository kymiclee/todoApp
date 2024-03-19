// @ts-nocheck

//imports
const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')

// importing models
const todoItem = require('./models/todoItem')
const todoList = require('./models/todoList')
const user = require('./models/users')

// importing routes
const itemRoutes = require('./routes/todoItem');
const listRoutes = require('./routes/todoList');
const userRoutes = require('./routes/users');

const { userInfo } = require('os');

//Express Setup
const app = express()
app.use(express.json());
// app.use(passport.session())

// Session Setup 
const dbUrl = process.env.MONGO_URI
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
    store: MongoStore.create(
        {
            mongoUrl: dbUrl
        })
}))

// Mongoose Connection 
// const dbUrl = process.env.MONGO_URI
mongoose.connect(dbUrl)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));



//passport configuration
app.use(passport.initialize());
app.use(passport.session())

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); } // User not found

            bcrypt.compare(password, user.password, function (err, isMatch) {
                if (err) { return done(err); }
                if (!isMatch) { return done(null, false); } // Incorrect password
                return done(null, user); // Authentication successful
            });
        });
    }
));


//Passport serialization
//cb == callback function
// we use user._id as a unique identifyer from mongo
// the callback function is called with the serailized user id as second arguement
// the first argument null indicates there was no error during serialization
passport.serializeUser(function (user, cb) {
    return cb(null, user._id);
});

// id is the serialized user
// we specify how to get the user object based on the serialized identifier
// once it is retrived it will be passed to the callback function 
passport.deserializeUser(function (id, cb) {
    user.findById(id, function (err, user) {
        if (err) { return cb(err); }
        return cb(null, user);
    })
});
//routes
app.use('/api/todo', itemRoutes)
app.use('/api/todo', listRoutes)
app.use('/api/todo', userRoutes)


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`todoApp listening on port ${port}`)
})