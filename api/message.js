var express = require('express')
var router = express.Router();

var Message = require('../models/message');
var ensureAuthenticated = require('../config/authentication');

router.get('/', ensureAuthenticated, function(req, res, next) {

    //retrieve all messages from Message model
    Message.getAllMessages(function(err, messages) {
        if(err) { return res.status(400).json(err); }
        else { res.status(200).json(messages); }
    });

});

router.get('/:id', ensureAuthenticated, function(req, res, next){

    var messageId = req.params.id;

    Message.getMessageById(messageId, function(err, message) {
    
            if (err) { return res.status(400).json(err);}
            else { res.status(200).json(message); }

    });

});

router.get('/byName/:name', ensureAuthenticated, function(req, res, next){

var messageName = req.params.name;

Message.getMessageByName(messageName, function(err, message) {

        if (err) { return res.status(400).json(err);}
        else { res.status(200).json(message); }

});

});

router.get('/byMobileNo/:mobileNo', ensureAuthenticated, function(req, res, next){

var messageMobile = req.params.mobileNo;

Message.getMessageByMobileNo(messageMobile, function(err, message) {

        if (err) { return res.status(400).json(err);}
        else { res.status(200).json(message); }

});

});

router.post('/', function(req, res, next){

    var name = req.body.name;
    var email = req.body.email;
    var mobile = req.body.mobile;
    var msg_body = req.body.msg_body;

    req.checkBody('name', 'Name is required.').notEmpty();
    req.checkBody('email', 'Enter valid email.').optional().isEmail();
    req.checkBody('mobile', 'Mobile Number is required.').notEmpty();
    req.checkBody('msg_body', 'Message is required.').notEmpty();

    var errors = req.validationErrors();

    if(errors) {
        res.status(400).json({errors: errors});
    } else {

        var message = new Message({
            name: name,
            email: email,
            mobile: mobile,
            msg_body: msg_body
        });

        Message.createMessage(message, function(err, result) {
            if(err) { throw(err) }
            else { res.status(200).json({success: {msg: 'Message sent successfully'}}); }
        });

    }

});

router.delete('/:id', ensureAuthenticated, function(req, res, next) {

    var messageId = req.params.id;

    Message.deleteMessage(messageId, function(err, result) { 

        if(err) {
            res.status(400).json({errors: errors});
        } else {
            res.status(200).json({success: {msg: 'Message deleted successfully'}});
        }

    });

});

module.exports = router;