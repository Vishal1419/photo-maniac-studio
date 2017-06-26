app.directive('carouselControls', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      scope.goNext = function() {
        element.isolateScope().next();
      };
      scope.goPrev = function() {
        element.isolateScope().prev();
      };

    }
  };
});