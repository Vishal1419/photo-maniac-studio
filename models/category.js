var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    name: {type: String, required: true},
    label: {type: String, required: true}
});

var Category = module.exports = mongoose.model('Category', categorySchema);

module.exports.getAllCategories = function(callback){
  	Category.find().lean().exec(function(err, categories){
    	if (err) return callback(err, null);
    	callback(null, categories);
  	});
};

module.exports.getCategoryById = function(id, callback){
  	Category.find({_id: id}).lean().exec(function(err, category){
    	if(err) return callback(err, null);
    	callback(null, category);
  	});
};

module.exports.getCategoryByName = function(name, callback){
	Category.find({name: name}).lean().exec(function(err, category){
		if(err) return callback(err, null);
    	callback(null, category);
  	});
};

module.exports.createCategory = function(newCategory, callback){
  	newCategory.save(callback);
};

module.exports.updateCategory = function(updatedValuesOfCategory, callback){
  	Category.update(
    	{"_id": updatedValuesOfCategory.id},
    	{"$set": {"name": updatedValuesOfCategory.name,
                  "label": updatedValuesOfCategory.label}},
    	{multi: false},
   		callback
  	);
};

module.exports.deleteCategory = function(id, callback){
    	Category.remove({_id: id}, function(err, Category) {
        	if(err) return callback(err, null);
        	callback(null, category);
    	});
};