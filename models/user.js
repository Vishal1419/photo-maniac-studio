var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {type: String, required: true},
    password: {type: String, required: true}
});

var User = module.exports = mongoose.model('User', userSchema);

module.exports.getAllUsers = function(callback){
  	User.find().lean().exec(function(err, users){
    	if (err) return callback(err, null);
    	callback(null, users);
  	});
};

module.exports.getUserById = function(id, callback){
  	User.find({_id: id}).lean().exec(function(err, user){
    	if(err) return callback(err, null);
    	callback(null, user);
  	});
};

module.exports.getUserByName = function(name, callback){
	User.find({name: name}).lean().exec(function(err, user){
		if(err) return callback(err, null);
    	callback(null, user);
  	});
};

module.exports.updateUser = function(updatedValuesOfUser, callback){
  	User.update(
    	{"_id": updatedValuesOfUser.id},
    	{"$set": {"name": updatedValuesOfUser.name,
                  "password": updatedValuesOfUser.password}},
    	{multi: false},
   		callback
  	);
};