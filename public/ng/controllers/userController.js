angular.module('photoManiacApp')
       .controller('userController', function($http, $window, $rootScope, $scope, $location, Flash, userService){

            $scope.changePass = function(passwords) {
                userService.changePassword(passwords, function(response){
                    if(response.data.errors) {
                        Flash.create('danger', response.data.errors[0].msg);
                    } else {
                        Flash.create('success', "Password changed successfully.");                        
                        userService.logout(function(response){
                            $rootScope.currentUser = null;
                            Flash.create('danger', 'You are logged out. Please login again with new password.');
                            $location.url('/admin');
                        });
                    }                    
                });
            }

            $scope.login = function(user) {
                userService.authenticate(user)
                    .then(function(response) {
                        $rootScope.currentUser = response.data;
                        // $window.localStorage.setItem("currentUser", $rootScope.currentUser);
                        Flash.create('success', 'Welcome, ' + $rootScope.currentUser.name);
                        
                        var id = 'home';
                        $(".nav").find(".active").removeClass("active");
                        $('#home').parent().addClass("active");
                        localStorage.setItem("selectedolditem", id);

                        $location.url('/home');
                    })
                    .catch(function(response){
                        $rootScope.currentUser = null;
                        // $window.localStorage.clear();
                        Flash.create('danger', 'Username or Password is incorrect!');
                    });
            }

            $scope.logout = function(){

                userService.logout(function(response){
                    $rootScope.currentUser = null;
                    Flash.create('success', 'You are logged out');

                    var id = 'home';
                    $(".nav").find(".active").removeClass("active");
                    $('#home').parent().addClass("active");
                    localStorage.setItem("selectedolditem", id);

                    $location.url('/home');
                });
                // $window.localStorage.clear();
            }

       });