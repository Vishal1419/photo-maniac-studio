var Category = require('../models/category');
var Photo = require('../models/photo');

var mongoose = require('mongoose');
mongoose.connect('localhost:27017/photomaniacstudiodb');

function seedPhotos(url, categoryName, callback) {
    Category.find({ name: categoryName })
        .exec(function(err, category) {
            if(err) { console.log(err); }
            else {
                var photo = new Photo({
                    url: url,
                    category: category != null ? category[0] : undefined,
                });
                photo.save(function(err2, result){
                    if(err2) {console.log(err2);}
                    else { callback(); }
                });
            }
        });
}

let photos = [
    ['images/slideshow1.jpg', 'slideshow'],
    ['images/slideshow2.jpg', 'slideshow'],
    ['images/slideshow3.jpg', 'slideshow'],
    ['images/slideshow4.jpg', 'slideshow'],
    ['images/slideshow5.jpg', 'slideshow'],
    ['images/slideshow6.jpg', 'slideshow'],
    ['images/wedding1.jpg', 'wedding'],
    ['images/wedding2.jpg', 'wedding'],
    ['images/wedding3.jpg', 'wedding'],
    ['images/wedding4.jpg', 'wedding'],
    ['images/wedding5.jpg', 'wedding'],
    ['images/wedding6.jpg', 'wedding'],
    ['images/wedding7.jpg', 'wedding'],
    ['images/wedding8.jpg', 'wedding'],
    ['images/wedding9.jpg', 'wedding'],
    ['images/wedding10.jpg', 'wedding'],
    ['images/wedding11.jpg', 'wedding'],
    ['images/wedding12.jpg', 'wedding'],
    ['images/wedding13.jpg', 'wedding'],
    ['images/wedding14.jpg', 'wedding'],
    ['images/wedding15.jpg', 'wedding'],
    ['images/wedding16.jpg', 'wedding'],
    ['images/wedding17.jpg', 'wedding'],
    ['images/wedding18.jpg', 'wedding'],
    ['images/engagement1.jpg', 'engagement'],
    ['images/engagement2.jpg', 'engagement'],
    ['images/engagement3.jpg', 'engagement'],
    ['images/engagement4.jpg', 'engagement'],
    ['images/engagement5.jpg', 'engagement'],
    ['images/engagement6.jpg', 'engagement'],
    ['images/engagement7.jpg', 'engagement'],
    ['images/engagement8.jpg', 'engagement'],
    ['images/engagement9.jpg', 'engagement'],
    ['images/engagement10.jpg', 'engagement'],
    ['images/engagement11.jpg', 'engagement'],
    ['images/engagement12.jpg', 'engagement'],
    ['images/engagement13.jpg', 'engagement'],
    ['images/engagement14.jpg', 'engagement'],
    ['images/engagement15.jpg', 'engagement'],
    ['images/engagement16.jpg', 'engagement'],
    ['images/engagement17.jpg', 'engagement'],
    ['images/engagement18.jpg', 'engagement'],
    ['images/engagement19.jpg', 'engagement'],
    ['images/engagement20.jpg', 'engagement'],
    ['images/engagement21.jpg', 'engagement'],
    ['images/engagement22.jpg', 'engagement'],
    ['images/engagement23.jpg', 'engagement'],
    ['images/engagement24.jpg', 'engagement'],
    ['images/engagement25.jpg', 'engagement'],
    ['images/prewedding1.jpg', 'prewedding'],
    ['images/prewedding2.jpg', 'prewedding'],
    ['images/prewedding3.jpg', 'prewedding'],
    ['images/prewedding4.jpg', 'prewedding'],
    ['images/prewedding5.jpg', 'prewedding'],
    ['images/prewedding6.jpg', 'prewedding'],
    ['images/prewedding7.jpg', 'prewedding'],
    ['images/prewedding8.jpg', 'prewedding'],
    ['images/prewedding9.jpg', 'prewedding'],
    ['images/prewedding10.jpg', 'prewedding'],
    ['images/prewedding11.jpg', 'prewedding'],
    ['images/prewedding12.jpg', 'prewedding'],
    ['images/prewedding13.jpg', 'prewedding'],
    ['images/prewedding14.jpg', 'prewedding'],
    ['images/prewedding15.jpg', 'prewedding'],
    ['images/prewedding16.jpg', 'prewedding'],
    ['images/children1.jpg', 'children'],
    ['images/children2.jpg', 'children'],
    ['images/children3.jpg', 'children'],
    ['images/children4.jpg', 'children'],
    ['images/children5.jpg', 'children'],
    ['images/children6.jpg', 'children'],
    ['images/children7.jpg', 'children'],
    ['images/children8.jpg', 'children'],
    ['images/children9.jpg', 'children'],
    ['images/children10.jpg', 'children'],
    ['images/children11.jpg', 'children'],
    ['images/children12.jpg', 'children'],
    ['images/children13.jpg', 'children'],
    ['images/modeling1.jpg', 'modeling'],
    ['images/modeling2.jpg', 'modeling'],
    ['images/modeling3.jpg', 'modeling'],
    ['images/modeling4.jpg', 'modeling'],
    ['images/modeling5.jpg', 'modeling'],
    ['images/modeling6.jpg', 'modeling'],
    ['images/modeling7.jpg', 'modeling'],
    ['images/modeling8.jpg', 'modeling'],
    ['images/modeling9.jpg', 'modeling'],
    ['images/modeling10.jpg', 'modeling'],
    ['images/modeling11.jpg', 'modeling'],
    ['images/modeling12.jpg', 'modeling'],
    ['images/modeling13.jpg', 'modeling'],
    ['images/modeling14.jpg', 'modeling'],
    ['images/modeling15.jpg', 'modeling'],
    ['images/modeling16.jpg', 'modeling'],
    ['images/candid1.jpg', 'candid'],
    ['images/candid2.jpg', 'candid'],
    ['images/candid3.jpg', 'candid'],
    ['images/candid4.jpg', 'candid'],
    ['images/candid5.jpg', 'candid'],
    ['images/candid6.jpg', 'candid'],
    ['images/candid7.jpg', 'candid'],
    ['images/candid8.jpg', 'candid'],
    ['images/candid9.jpg', 'candid'],
    ['images/candid10.jpg', 'candid'],
    ['images/candid11.jpg', 'candid'],
    ['images/candid12.jpg', 'candid'],
    ['images/babyshower1.jpg', 'babyshower'],
    ['images/babyshower2.jpg', 'babyshower'],
    ['images/babyshower3.jpg', 'babyshower'],
    ['images/babyshower4.jpg', 'babyshower'],
    ['images/babyshower5.jpg', 'babyshower'],
    ['images/babyshower6.jpg', 'babyshower'],
    ['images/babyshower7.jpg', 'babyshower'],
    ['images/babyshower8.jpg', 'babyshower'],
    ['images/babyshower9.jpg', 'babyshower'],
    ['images/babyshower10.jpg', 'babyshower'],
    ['images/babyshower11.jpg', 'babyshower'],
    ['images/babyshower12.jpg', 'babyshower'],
    ['images/babyshower13.jpg', 'babyshower'],
    ['images/babyshower14.jpg', 'babyshower'],
    ['images/anniversary1.jpg', 'anniversary'],
    ['images/anniversary2.jpg', 'anniversary'],
    ['images/anniversary3.jpg', 'anniversary'],
    ['images/anniversary4.jpg', 'anniversary'],
    ['images/anniversary5.jpg', 'anniversary'],
    ['images/anniversary6.jpg', 'anniversary'],
    ['images/anniversary7.jpg', 'anniversary'],
    ['images/anniversary8.jpg', 'anniversary'],
    ['images/anniversary9.jpg', 'anniversary'],
    ['images/anniversary10.jpg', 'anniversary'],
    ['images/anniversary11.jpg', 'anniversary'],
    ['images/birthdayparty1.jpg', 'birthdayparty'],
    ['images/birthdayparty2.jpg', 'birthdayparty'],
    ['images/birthdayparty3.jpg', 'birthdayparty'],
    ['images/birthdayparty4.jpg', 'birthdayparty'],
    ['images/birthdayparty5.jpg', 'birthdayparty'],
    ['images/birthdayparty6.jpg', 'birthdayparty'],
    ['images/birthdayparty7.jpg', 'birthdayparty'],
    ['images/birthdayparty8.jpg', 'birthdayparty'],
    ['images/birthdayparty9.jpg', 'birthdayparty'],
    ['images/birthdayparty10.jpg', 'birthdayparty'],
    ['images/birthdayparty11.jpg', 'birthdayparty'],
    ['images/birthdayparty12.jpg', 'birthdayparty'],
    ['images/birthdayparty13.jpg', 'birthdayparty'],
    ['images/birthdayparty14.jpg', 'birthdayparty'],
    ['images/postwedding1.jpg', 'postwedding'],
    ['images/postwedding2.jpg', 'postwedding'],
    ['images/postwedding3.jpg', 'postwedding'],
    ['images/postwedding4.jpg', 'postwedding'],
    ['images/postwedding5.jpg', 'postwedding'],
    ['images/postwedding6.jpg', 'postwedding'],
    ['images/postwedding7.jpg', 'postwedding'],
    ['images/postwedding8.jpg', 'postwedding'],
    ['images/postwedding9.jpg', 'postwedding'],
    ['images/postwedding10.jpg', 'postwedding'],
    ['images/postwedding11.jpg', 'postwedding'],
    ['images/postwedding12.jpg', 'postwedding'],
];

let callback = function(e,r) { 
    console.log('Photos Saved');
    mongoose.disconnect(); 
};

for (let i = photos.length-1; i>= 0; i--) {
  let photo = photos[i];
  photo.push( callback );
  callback = function(e,r) { seedPhotos.apply(this, photo); }
}

callback();