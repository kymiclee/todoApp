// @ts-nocheck

//Imports
const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')

// Importing models
const todoItem = require('./models/todoItem')
const todoList = require('./models/todoList')
const user = require('./models/users')

// Importing routes
const itemRoutes = require('./routes/todoItem');
const listRoutes = require('./routes/todoList');
const userRoutes = require('./routes/users');

// Middleware
const { errorHandler } = require('./middleware/errorMiddleware');


//Express Setup
const app = express()
app.use(express.json());
app.use(errorHandler);

// Session Setup 
const dbUrl = process.env.MONGO_URI
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        secure: false,
        sameSite: 'strict'
    },
    store: MongoStore.create(
        {
            mongoUrl: dbUrl
        })
}))

// Mongoose connection 
mongoose.connect(dbUrl)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));



//Passport configuration
app.use(passport.initialize());
app.use(passport.session())
passport.use(new LocalStrategy(
    async function (username, password, done) {
        try {
            const verifyUser = await user.findOne({ username: username }).exec()
            if (!verifyUser) { return done(null, false); } // User not found
            const isMatch = await bcrypt.compare(password, verifyUser.password)
            if (!isMatch) { return done(null, false); }
            if (!isMatch) { return done(null, false); }
            return done(null, verifyUser);

        } catch (error) {
            return done(error)
        }
    }
));


//Passport serialization
passport.serializeUser(function (user, cb) {
    return cb(null, user._id);
});
passport.deserializeUser(function (id, cb) {
    user.findById(id, function (err, user) {
        if (err) { return cb(err); }
        return cb(null, user);
    })
});

//Routes
app.use('/api/todo', itemRoutes)
app.use('/api/todo', listRoutes)
app.use('/api/todo', userRoutes)

//Error handling middleware
app.use(errorHandler);

//Server setup
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`todoApp backend listening on port ${port}`)
})