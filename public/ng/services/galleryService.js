angular
    .module('photoManiacApp')
    .factory('galleryService', function($http) {
        var factory = { fetchAllCategories: fetchAllCategories, fetchAllPhotos: fetchAllPhotos,
                        submit: submit, remove: remove };

        return factory; 

        //Usual CRUD operations
        //---------------------------------------------------------------

        function fetchAllCategories() {
            return $http.get('/api/category')
                        .then(function(response) {
                            return response.data;
                        });
        }

        function fetchAllPhotos() {
            return $http.get('/api/photo/')
                        .then(function(response) {
                            return response.data;
                        });
        }

        function submit(photos, callback){

            var fd = new FormData();
            for(var key in photos) {
                fd.append(key, photos[key]);
            }

            $http.post('/api/photo', fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            }).then(function(response){
                callback(response);
            }, function(response) {
                //Raise errors
                callback(response);
            });

        }

        function remove(photo, callback) {
            return $http.delete('/api/photo/' + photo._id)
                        .then(function(response) {
                            console.log(response);
                            callback(response);
                        });            
        }

    });