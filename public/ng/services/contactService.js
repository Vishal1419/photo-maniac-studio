angular
    .module('photoManiacApp')
    .factory('contactService', function($http) {
        var factory = { fetch: fetch, saveMessage: saveMessage, remove: remove };

        return factory; 

        //Usual CRUD operations
        //---------------------------------------------------------------

        function fetch() {
            return $http.get('/api/message')
                        .then(function(response) {
                            return response.data;
                        });
        }

        function saveMessage(message, callback) {
            $http.post('/api/message', message)
                    .then(function (response) {
                        //Clear errors
                        callback(response);
                    }, function(response) {
                        //Raise errors
                        callback(response);
                    });
        }

        function remove(message, callback) {
            return $http.delete('/api/message/' + message._id)
                        .then(function(response) {
                            callback(response);
                        });            
        }

    });