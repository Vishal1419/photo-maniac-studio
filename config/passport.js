const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = function(passport){
    //local strategy
    passport.use(new LocalStrategy(function(username, password, done){
        //match username
        let query = {name: username};
        User.findOne(query, function(err, user){
            if(err) return done(err);
            if(!user){
                return done(null, false, { message: 'No user found' });
            }
            //match password
            if(password == user.password) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect Password' });
            }
        });

    }));

    passport.serializeUser(function(user, done){
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
} 