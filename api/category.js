var express = require('express');
var router = express.Router();

var Category = require('../models/category');
var ensureAuthenticated = require('../config/authentication');

router.get('/', function(req, res, next) {

    //retrieve all categories from Category model
    Category.getAllCategories(function(err, categories) {
        if(err) { return res.status(400).json(err); }
        else { res.status(200).json(categories); }
    });

});

router.get('/:id', function(req, res, next){

var categoryId = req.params.id;

Category.getCategoryById(categoryId, function(err, category) {

        if (err) { return res.status(400).json(err);}
        else { res.status(200).json(category); }

});

});

router.get('/byName/:name', function(req, res, next){

var categoryName = req.params.name;

Category.getCategoryByName(categoryName, function(err, category) {

        if (err) { return res.status(400).json(err);}
        else { res.status(200).json(category); }

});

});

router.post('/', ensureAuthenticated, function(req, res, next){

    var name = req.body.name;
    var label = req.body.label;

    Category.find(function(err, categories) {

        if(err){
            res.status(400).json(err);
        }

        req.checkBody('name', 'Category name is required.').notEmpty();
        req.checkBody('name', 'Duplicate category name.').duplicateRecord('name', categories);

        req.checkBody('label', 'Category label is required.').notEmpty();
        req.checkBody('label', 'Duplicate category label.').duplicateRecord('label', categories);

        var errors = req.validationErrors();

        if(errors) {
            res.status(400).json({errors: errors});
        } else {

            var category = new Category({
                name: name,
                label: label
            });

            Category.createCategory(category, function(err, result) {
                if(err) { throw(err) }
                else { res.status(200).json({success: {msg: 'Category ' + name + ' saved successfully'}}); }
            });

        }

    });

});

router.put('/:id', ensureAuthenticated, function(req, res, next) {

    var id = req.params.id;
    var name = req.body.name;
    var label = req.body.label;

    Category.find(function(err, categories) {

        Category.find({_id: id}, function(err, originalCategory) {

            if(err){
                res.status(400).json(err);
            }

            req.checkBody('name', 'Category name is required.').notEmpty();
            req.checkBody('name', 'Duplicate category name.').duplicateRecordExcludingCurrentRecord('name', categories, originalCategory[0].name);

            req.checkBody('label', 'Category label is required.').notEmpty();
            req.checkBody('label', 'Duplicate category label.').duplicateRecord('label', categories);

            var errors = req.validationErrors();

            if(errors) {
                res.status(400).json({errors: errors});
            } else {

                var category = new Category({
                    _id: id,
                    name: name,
                    label: label
                });

                Category.updateCategory(category, function(err, result) {
                    if(err) { throw(err) }
                    else { res.status(200).json({success: {msg: 'Category ' + name + ' updated successfully'}}); }
                });

            }

        })

    });

});

router.delete('/:id', ensureAuthenticated, function(req, res, next) {

    var categoryId = req.params.id;

    Category.deleteCategory(categoryId, function(err, result) { 

        if(err) {
            res.status(400).json({errors: errors});
        } else {
            res.status(200).json({success: {msg: 'Category deleted successfully'}});
        }

    });

});

module.exports = router;