var express = require('express')
var router = express.Router();

var Category = require('../models/category');
var Photo = require('../models/photo');

var ensureAuthenticated = require('../config/authentication');

var multer = require('multer')
var crypto = require('crypto');
var mime = require('mime');
var fs = require('fs');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});

var upload = multer({ storage: storage });

router.get('/', function(req, res, next) {

    //retrieve all photos from Photo model
    Photo.getAllPhotos(function(err, photos) {
        if(err) { res.status(400).json(err); }
        else { res.status(200).json(photos); }
    });

});

router.get('/:id', function(req, res, next){

var photoId = req.params.id;

Photo.getPhotoById(photoId, function(err, photo) {

        if (err) { return res.status(400).json(err); } 
        else { res.status(200).json(photo); }

});

});

router.get('/byUrl/:url', function(req, res, next){

var photoUrl = req.params.url;

Photo.getPhotoByUrl(photoUrl, function(err, photo) {

        if (err) { return res.status(400).json(err); } 
        else { res.status(200).json(photo); }

});

});

router.get('/byCategoryName/:categoryName', function(req, res, next){

var cat_name = req.params.categoryName;
console.log(cat_name);

Photo.getPhotosByCategoryName(cat_name, function(err, photos) {
        console.log(photos);
        if (err) { return res.status(400).json(err); } 
        else { res.status(200).json(photos); }

});

});

router.post('/', [ensureAuthenticated, upload.any()], function(req, res){

    var category = req.body.category;
    var images = [];

    for (var key in req.body) {
        if(key != 'category') {
            images.push(req.body[key]);
        }
    }

    var image_paths = [];

    for (var key in req.files) {
        image_paths.push(req.files[key].path);
    }

    Category.getAllCategories(function(err, categories) {

        Photo.getAllPhotos(function(err, photos) {
    
            if (err) {
                res.status(400).json(err);
            } 
            
            //Checks if atleast one image is selected.
            req.checkBody('imageName0', 'Please select image.').notEmpty();

            //checks the file extension of images that are uploaded.
            for (var key in req.body) {
                if(key != 'category') {
                    req.checkBody(key, 'Please select jpg, jpeg or png Image.').isImage();
                }
            }        

            //checks if category name is given and valid
            if(category.name == undefined) {
                req.checkBody('category', 'Category name is required.').notEmpty();
                req.checkBody('category', 'Please select category from list.').noRecordFound('name', categories);
            } else {
                req.checkBody('category.name', 'Category name is required.').notEmpty();
                req.checkBody('category.name', 'Please select category from list.').noRecordFound('name', categories);
                category = category.name;
            }

            //Check for errors
            var errors = req.validationErrors();

            if(errors){
                res.status(400).json({errors: errors});
            } else {

                Category.getCategoryByName(category, function(err, parentCategory) {
                        
                    var newPhotos = [];

                    image_paths.forEach(function(image_path) {

                        var path = image_path.substr(7);

                        var newPhoto = new Photo({
                            url: path,
                            category: parentCategory[0]
                        });

                        newPhotos.push(newPhoto);

                    }, this);

                    Photo.createPhotos(newPhotos, function(err, result){

                        if(err) { throw(err); }
                        else { res.status(200).json({success: {msg: 'Photo(s) saved successfully'}}); }

                    });

                });

            }

        });

    });

});

router.delete('/:id', ensureAuthenticated, function(req, res, next) {

    var photoId = req.params.id;

    Photo.getPhotoById(photoId, function(err, photo) {

        if (err) { return res.status(400).json(err); } 

        Photo.deletePhoto(photoId, function(err2, result) { 

            if(err2) {
                return res.status(400).json(err2);
            } else {
                fs.unlink('public\\' + photo[0].url);
                res.status(200).json({success: {msg: 'Photo deleted successfully.'}});
            }

        });

    });

});

module.exports = router;