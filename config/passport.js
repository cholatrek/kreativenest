var passport = require('passport');
var LocalStrategy  = require('passport-local').Strategy;
var User = require('../model/user');


passport.serializeUser(function(user, done) {
    done(null, user);
  });
   
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });


//Middleware

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback:true
}, function(req,email,password,done){
    User.findOne({email:email}, function(err,user){
        if(err) return done(err);

        if(!user){
            return done(null, false,req.flash('loginMessage', 'No user has been found!'));
        }
        if(!user.comparePassword(password)){
            return done(null, false, req.flash('loginMessage', 'Oops! wrong password'));
        }
        return done(null, user);
    })
}))
//custom function validate

exports.isAuthenticated = function(re,res,next){
    if(req.isAuthenticated()){
        next();
    }
    res.redirect('/login');
}