angular.module('photoManiacApp')
       .controller('homeController', function($http, $scope, Flash, homeService){

           $scope.photos = [];

            var reload = function() {
                homeService.fetch('slideshow')
                    .then(function(photos) {
                        $scope.photos = photos;
                        console.log($scope.photos);
                    });
            }

            reload();

            $scope.addImages = function(event){

                var images = event.target.files;
                $scope.slideshowImages = {};
                for (var index = 0; index < images.length; index++) {
                    $scope.slideshowImages['image' + index] = images[index];
                    $scope.slideshowImages['imageName' + index] = images[index].name;
                }
                $scope.slideshowImages.category = 'slideshow';
                console.log($scope.slideshowImages);

                homeService.submit($scope.slideshowImages, function(response){

                    if(response.status == 400) {
                        Flash.create('danger', response.data.errors[0].msg);
                    }

                    reload();

                    $scope.slideshowImages = {};
                    // $scope.slideshowForm.$setPristine();
                   
                });
            }

            $scope.removeImage = function(image) {
                homeService.remove(image, function(response) {
                    console.log(response);
                    reload();
                });
            }

       });