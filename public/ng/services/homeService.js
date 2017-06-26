angular
    .module('photoManiacApp')
    .factory('homeService', function($http) {
        var factory = { fetch: fetch, submit: submit, remove: remove };

        return factory; 

        //Usual CRUD operations
        //---------------------------------------------------------------

        function fetch(category) {
            return $http.get('/api/photo/byCategoryName/' + category)
                        .then(function(response) {
                            return response.data;
                        });
        }

        function submit(photos, callback){

            var fd = new FormData();
            for(var key in photos) {
                fd.append(key, photos[key]);
            }

            // for(var key of fd.entries()) {
            //     console.log(key);
            // }

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