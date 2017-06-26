var express = require('express');
var router = express.Router();

var User = require('../models/user');
var ensureAuthenticated = require('../config/authentication');

module.exports = function(passport) {

    router.get('/loggedin', function(req, res, next) {
        res.send(req.isAuthenticated() ? req.user : '0');
    });

    router.post('/login', passport.authenticate('local'), function(req, res, next){
        
        var user = req.body;

        User.findOne({name: user.username, password: user.password}, function(err, foundUser){
            res.json(foundUser);
        });

    });

    router.post('/logout', ensureAuthenticated, function(req, res, next){
        
        req.logout();
        res.send(200);

    });

    router.get('/', ensureAuthenticated, function(req, res, next) {

        User.getAllUsers(function(err, users) {
            if(err) { return res.status(400).json(err); }
            else { res.status(200).json(users); }
        });

    });

    router.get('/:id', ensureAuthenticated, function(req, res, next){

        var userId = req.params.id;

        User.getUserById(userId, function(err, user) {
        
                if (err) { return res.status(400).json(err);}
                else { res.status(200).json(user); }

        });

    });

    router.get('/byName/:name', ensureAuthenticated, function(req, res, next){

        var userName = req.params.name;

        User.getUserByName(userName, function(err, user) {
        
                if (err) { return res.status(400).json(err);}
                else { res.status(200).json(user); }

        });

    });

    router.put('/', ensureAuthenticated, function(req, res, next) {

        var id = req.user._id;
        var newPassword = req.body.newPassword;

        User.find(function(err, users) {

            if(err) {
                return res.status(500).json(err);
            }

            User.find({_id: id}, function(err, originalUser) {

                if(err){
                    return res.status(500).json(err);
                }

                req.checkBody('oldPassword', 'Please enter your old password.').notEmpty();
                req.checkBody('oldPassword', 'Incorrect old password').equals(originalUser[0].password);
                req.checkBody('newPassword', 'Please enter your new password.').notEmpty();
                req.checkBody('newConfirmPassword', 'Please confirm your new password.').notEmpty();
                req.checkBody('newConfirmPassword', 'Passwords does not match.').equals(req.body.newPassword);            

                var errors = req.validationErrors();

                if(errors) {
                    console.log(errors);
                    return res.json({errors: errors});
                } else {

                    var user = new User({
                        _id: id,
                        name: originalUser[0].name,
                        password: newPassword
                    });

                    User.updateUser(user, function(err, result) {
                        if(err) { throw(err) }
                        else { res.status(200).json({success: {msg: 'Password changed successfully'}}); }
                    });

                }

            })

        });

    });

    return router;

}