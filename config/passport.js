const localStrategy = require('passport-local').Strategy;

const staffModels = require('../models/staff.model');

const userModels = require('../models/customer.model');

const bcrypt = require('../utils/crypto');

module.exports = function(passport) {
    passport.use('staff', 
        new localStrategy(
            function(username, password, done) {
                console.log(username);
                staffModels.findOne({ username: username }, function (err, user) {
                    if (err) { return done(err); }
                    if (!user) { return done(null, false); }
                    if (bcrypt.comparePassword(password,user.password)) {
                        return done(null, user); 
                    } else {
                        return done(null, false); 
                    }
                });
            }
        )
    )
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
    passport.deserializeUser(function(id, done) {
        staffModels.findById(id, function(err, user) {
            done(err, user);
        });
    });
    

    passport.use('user',
        new localStrategy(
            function(username, password, done) {
                userModels.findOne({ username: username }, function (err, user) {
                    if (err) { return done(err); }
                    if (!user) { return done(null, false); }
                    if (bcrypt.comparePassword(password,user.password)) {
                        return done(null, user); 
                    } else {
                        return done(null, false); 
                    }
                });
            }
        )
    )
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
    passport.deserializeUser(function(id, done) {
        userModels.findById(id, function(err, user) {
            done(err, user);
        });
    });
}