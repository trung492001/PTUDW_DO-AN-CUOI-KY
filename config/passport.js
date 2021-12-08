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

    passport.use('register', 
        new localStrategy({passReqToCallback: true},
            function(req,username,password,done){
                userModels.findOne({username: username}, function(err, user){
                    if(err){
                        console.log('error username');
                        return done(err);
                    }
                    if(user){
                        console.log('have username');
                        return done(null, false);
                    }
                });
                userModels.findOne({email: req.body.email}, function(err,user){
                    if(err){
                        console.log('error email');
                        return done(err);
                    }
                    if(user){
                        console.log('have email');
                        return done(null, false);
                    }
                });

                let newUser = new userModels();
                newUser.username = username;
                newUser.password = bcrypt.hashPassword(password);
                newUser.firstName = req.body.firstName;
                newUser.lastName = req.body.lastName;
                newUser.gender = req.body.gender;
                newUser.address = req.body.address;
                newUser.phone = req.body.phone;
                
                newUser.save(function(err, result){
                    if(err){
                        console.log('error save');
                        return done(err);
                    }
                    return done(null, newUser);
                });
            }
        )
    )
}
