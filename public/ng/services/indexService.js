angular
    .module('photoManiacApp')
    .factory('indexService', function($http) {
        var factory = { isLoggedIn: isLoggedIn };

        return factory; 

        //Usual CRUD operations
        //---------------------------------------------------------------

        function isLoggedIn() {
            return $http.get('/api/user/loggedin')
                        .then(function(response) {
                            return response.data;
                        });
        }

    });