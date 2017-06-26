var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Category = require('./category');

var photoSchema = new Schema({
    url: {type: String, required: true},
    category: {type: Schema.Types.ObjectId, ref: 'Category'}
});

var Photo = module.exports = mongoose.model('Photo', photoSchema);

module.exports.getAllPhotos = function(callback){
  	Photo.find().lean().exec(function(err, photos){
    	if (err) return callback(err, null);
    	callback(null, photos);
  	});
};

module.exports.getPhotoById = function(id, callback){
  	Photo.find({_id: id}).lean().exec(function(err, photo){
    	if(err) return callback(err, null);
    	callback(null, photo);
  	});
};

module.exports.getPhotoByUrl = function(url, callback){
  	Photo.find({url: url}).lean().exec(function(err, photo){
    	if(err) return callback(err, null);
    	callback(null, photo);
  	});
};

module.exports.getPhotosByCategoryName = function(categoryName, callback) {
    Category.find({name: categoryName}).lean().exec(function(err, categories) {
    	if(err) return callback(err, null);
        console.log(categories);
    	Photo.find({category: categories[0]}).lean().exec(function(err2, photos) {
        	if(err) return callback(err2, null);
            console.log(photos);
            callback(null, photos);
        });
    });
}

module.exports.createPhoto = function(newPhoto, callback){
  	newPhoto.save(callback);
};

module.exports.createPhotos = function(photos, callback){
  	Photo.insertMany(photos, callback);
};

module.exports.updatePhoto = function(updatedValuesOfPhoto, callback){
  	Photo.update(
    	{"_id": updatedValuesOfPhoto.id},
    	{"$set": {"url": updatedValuesOfPhoto.url, "category": updatedValuesOfPhoto.category}},
    	{multi: false},
   		callback
  	);
};

module.exports.deletePhoto = function(id, callback){
    	Photo.remove({_id: id}, function(err, photo) {
        	if(err) return callback(err, null);
        	callback(null, photo);
    	});
};