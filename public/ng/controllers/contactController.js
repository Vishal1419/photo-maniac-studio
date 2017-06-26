angular.module('photoManiacApp')
       .controller('contactController', function(Flash, $http, $scope, $location, contactService){

           $scope.messages = [];

            var reload = function() {
                contactService.fetch()
                    .then(function(messages) {
                        $scope.messages = messages;
                    });
            }

            reload();

            $scope.submit = function(message) {

                contactService.saveMessage(message, function(response) {

                    if(response.status == 400 || response.status == 500) {
                        Flash.create('danger', response.data.errors[0].msg);
                    } else {
                        Flash.create('success', 'We have received your message. <br> We will contact you shortly.')
                    }

                    $scope.message = null;
                    $scope.messageForm.$setPristine();
                   
                    reload();

               });

            }

            $scope.removeMessage = function(message) {
                contactService.remove(message, function(response) {
                    console.log(response);
                    reload();
                });
            }

       });