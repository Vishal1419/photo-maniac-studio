angular.module('photoManiacApp')
       .controller('indexController', function($window, $rootScope, indexService){

            $rootScope.currentUser = null;

            var reload = function() {
                indexService.isLoggedIn()
                    .then(function(currentUser) {
                        
                        if(currentUser != '0') {
                            $rootScope.currentUser = currentUser;                 
                        }

                    });
            }

            reload();
       });