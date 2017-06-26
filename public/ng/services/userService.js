angular
    .module('photoManiacApp')
    .factory('userService', function($http, $q) {

        var factory = { authenticate: authenticate, logout: logout, changePassword: changePassword };

        return factory; 

        //Usual CRUD operations
        //---------------------------------------------------------------

        function authenticate(user) {

            var deferred = $q.defer();

            $http.post('/api/user/login', user)
                 .then(function(response) {
                            deferred.resolve(response);
                        },
                        function(response) {
                            deferred.reject(response);
                        }
                 );

            return deferred.promise;
        }

        function logout(callback) {
            $http.post('/api/user/logout')
                 .then(function(response) {
                     callback(response);
                 });
        }

        function changePassword(passwords, callback) {
            console.log(passwords);
            $http.put('/api/user/', passwords)
                 .then(function(response) {
                     callback(response);
                 });
        }

    });