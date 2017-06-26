angular.module('photoManiacApp')
       .controller('galleryController', function($http, $scope, Lightbox, galleryService){

           $scope.categories = [];
           $scope.photos = [];
           $scope.selectedCategory = null;
           $scope.fakeRadioStatus = false;
           $scope.selectedImage = null;
           var temp_fakeRadioStatus;

            var reload = function() {
                galleryService.fetchAllCategories()
                    .then(function(categories) {
                        $scope.categories = categories;

                        if($scope.selectedCategory == undefined || $scope.selectedCategory == null) {
                            $scope.selectedCategory = $scope.categories[0];
                            $scope.fakeRadioStatus = 0;
                        } else {
                            $scope.selectedCategory = $scope.categories[temp_fakeRadioStatus + 1];
                            $scope.fakeRadioStatus = temp_fakeRadioStatus;                            
                        }
                    });

                galleryService.fetchAllPhotos()
                    .then(function(photos) {
                        $scope.photos = photos;
                        $scope.categories = categorify($scope.categories, $scope.photos);
                        $scope.categories.forEach(function(category) {
                            
                            if(category.name === 'slideshow') {
                                   var index = $scope.categories.indexOf(category);
                                   $scope.categories.splice(index, 1);
                               }

                            category.photos = shuffle(category.photos);

                        }, this);
                    });
            }

            reload();

            $scope.setSelectedCategory = function(category, index) {
                $scope.selectedCategory = category;
                $scope.fakeRadioStatus = index;
            }

            $scope.setSelectedImage = function(image, index) {
                $scope.selectedImage = image;
                Lightbox.openModal($scope.selectedCategory.photos, index);                
            }

            $scope.navigate = function(forward) {
                console.log($scope.selectedCategory.photos.indexOf($scope.selectedImage));
                var index = $scope.selectedCategory.photos.indexOf($scope.selectedImage)+(forward ? 1: -1);
                if(index >= 0 && index < $scope.selectedCategory.photos.length){
                    $scope.selectedImage = $scope.selectedCategory.photos[index];	
                }
            }

            $scope.hotkeys = function(event) {
                if($scope.selectedImage){
                    if (event.keyCode == 37){
                        $scope.navigate(false);
                    }else if(event.keyCode == 39){
                        $scope.navigate(true);
                    }
                }
            }

            function shuffle(array) {

                var currentIndex = array.length, temporaryValue, randomIndex;

                // While there remain elements to shuffle...
                while (0 !== currentIndex) {

                    // Pick a remaining element...
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;

                    // And swap it with the current element.
                    temporaryValue = array[currentIndex];
                    array[currentIndex] = array[randomIndex];
                    array[randomIndex] = temporaryValue;
                }

                return array;

            }

            function categorify(categories, photos)
            {
                photos.forEach(function(photo) {
                    
                    categories.forEach(function(category){
                        if(category._id == photo.category) {
                            if(category.photos === undefined) {
                                category.photos = [];
                            }
                            delete photo.category;
                            category.photos.push(photo)
                        }
                    }, this);

                }, this);

                return categories;
            }

            $scope.addImages = function(event){

                var images = event.target.files;
                $scope.slideshowImages = {};
                for (var index = 0; index < images.length; index++) {
                    $scope.slideshowImages['image' + index] = images[index];
                    $scope.slideshowImages['imageName' + index] = images[index].name;
                }
                $scope.slideshowImages.category = $scope.selectedCategory.name;

                galleryService.submit($scope.slideshowImages, function(response){

                    if(response.status == 400) {
                        Flash.create('danger', response.data.errors[0].msg);
                    }

                    temp_fakeRadioStatus = $scope.fakeRadioStatus;

                    reload();

                    $scope.slideshowImages = {};
                    // $scope.slideshowForm.$setPristine();
                   
                });
            }

            $scope.removeImage = function(image) {
                galleryService.remove(image, function(response) {
                    temp_fakeRadioStatus = $scope.fakeRadioStatus;
                    reload();
                });
            }


       });