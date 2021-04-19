var express = require('express');
var router = express.Router();
var User = require('../model/user');
const passport = require('passport');
var passportConf = require('../config/passport')

router.post('/create-user', function(req,res,next){
    
    var user = new User();
    user.email= req.body.email;

    console.log(req.body.email);
    user.password = req.body.password;
    
    
    User.findOne({email:req.body.email}, function(err, existingUser){
        if(existingUser){
           
            req.flash( 'errors', 'Account with this email already exists')
            return res.redirect('/admin');
        } else{
            user.save(function(err, user){
                if(err) return next(err);
                // res.json("new user has been created");
                req.login(user, function(err){
                    if(err) return next(err);
                    res.redirect('/admin/posts');
                })
            })
        }
        })
   
    });


    router.post('/login', passport.authenticate('local-login', {
        successRedirect : '/admin/dashboard',
        failureRedirect : '/login',
        failureFlash : true
    }));

    module.exports = router;