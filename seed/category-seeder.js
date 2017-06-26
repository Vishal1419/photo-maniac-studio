var Category = require('../models/category');

var mongoose = require('mongoose');
mongoose.connect('localhost:27017/photomaniacstudiodb');

var categories = [
    new Category({name: "slideshow", label: "Slide Show"}),
    new Category({name: "children", label: "Children"}),
    new Category({name: "modeling", label: "Modeling"}),
    new Category({name: "engagement", label: "Engagement"}),
    new Category({name: "prewedding", label: "Pre Wedding"}),
    new Category({name: "postwedding", label: "Post Wedding"}),
    new Category({name: "babyshower", label: "Baby Shower"}),
    new Category({name: "birthdayparty", label: "Birthday Party"}),
    new Category({name: "anniversary", label: "Anniversary"}),
    new Category({name: "candid", label: "Candid"}),
    new Category({name: "wedding", label: "Wedding"})
];

var done = 0;

for(var i = 0; i < categories.length; i++)
{
    categories[i].save(function(err, result){
        done++;
        if(done == categories.length){
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}