angular
    .module('photoManiacApp')
    .directive('attachmentFile', function($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attributes) {
                var model = $parse(attributes.attachmentFile);
                var assign = model.asssign;
                element.bind('change', function() {
                    var files = [];
                    angular.forEach(element[0].files, function(file) {
                        files.push(file);
                    });
                    scope.$apply(function() {
                        assign(scope, files);
                    })
                });
            }
        }
    });
