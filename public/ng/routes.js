angular
    .module('photoManiacApp')
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: '/templates/home.html'
            })
            .when('/home/slideshow/edit', {
                templateUrl: '/templates/edit_slideshow.html',
                resolve : {
                    loggedin: checkLoggedIn
                }
            })
            .when('/gallery', {
                templateUrl: '/templates/gallery.html'
            })
            .when('/contact', {
                templateUrl: '/templates/contact.html'
            })
            .when('/about', {
                templateUrl: '/templates/about.html'
            })
            .when('/login', {
                templateUrl: '/templates/login.html'
            })
            .otherwise({
                redirectTo: '/home'
            });
        $locationProvider.html5Mode(true);
    });

    function checkLoggedIn($q, $window, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/user/loggedin')
             .success(function(user){
                 if(user != '0') {
                     $rootScope.currentUser = user;
                    //  $window.localStorage.setItem('currentUser', $rootScope.currentUser);
                     deferred.resolve();
                 } else {
                     $rootScope.currentUser = null;
                    //  $window.localStorage.clear();                     
                     deferred.reject();                     
                     $location.url('/login');
                 }
             });

        return deferred.promise;
    }