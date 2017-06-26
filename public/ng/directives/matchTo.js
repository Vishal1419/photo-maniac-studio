angular
    .module('photoManiacApp')
    .directive('matchTo', function($parse) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {

                // var attributes = scope.$eval(attrs.matchTo);

                ctrl.$validators.matchTo = function(modelValue) {

                    var attributes = scope.$eval(attrs.matchTo);

                    if(attributes.unequal == undefined) {
                        attributes.unequal = false;
                    }

                    if(attributes.unequal) {
                        if(modelValue == undefined || attributes.matchString == undefined || attributes.matchString == null) {
                            return true;
                        } else if(!(typeof modelValue === String || typeof modelValue === 'string')) {
                            return modelValue.name != attributes.matchString;
                        } else {
                            return modelValue != attributes.matchString;
                        }
                    } else {
                        if(modelValue == undefined || attributes.matchString == undefined || attributes.matchString == null) {
                            return false;
                        } else {
                            return modelValue == attributes.matchString;
                        }                        
                    }
                }
                
                var matchTo = $parse(attrs.matchTo);
                scope.$watch(function () {
                    return matchTo(scope).matchString;
                }, function (value) {
                    ctrl.$validate();
                });
            }
        }
    });

    //----- Plugin for checking if input a is equal to input b or not