var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: false},
    mobile: {type: String, required: false},
    msg_body: {type: String, required: true}
});

var Message = module.exports = mongoose.model('Message', messageSchema);

module.exports.getAllMessages = function(callback){
  	Message.find().lean().exec(function(err, messages){
    	if (err) return callback(err, null);
    	callback(null, messages);
  	});
};

module.exports.getMessageById = function(id, callback){
  	Message.find({_id: id}).lean().exec(function(err, message){
    	if(err) return callback(err, null);
    	callback(null, message);
  	});
};

module.exports.getMessageByName = function(name, callback){
	Message.find({name: name}).lean().exec(function(err, message){
		if(err) return callback(err, null);
    	callback(null, message);
  	});
};

module.exports.getMessageByMobileNo = function(mobile, callback){
	Message.find({mobile: mobile}).lean().exec(function(err, message){
		if(err) return callback(err, null);
    	callback(null, message);
  	});
};

module.exports.createMessage = function(newMessage, callback){
  	newMessage.save(callback);
};

module.exports.deleteMessage = function(id, callback){
    	Message.remove({_id: id}, function(err, message) {
        	if(err) return callback(err, null);
        	callback(null, message);
    	});
};