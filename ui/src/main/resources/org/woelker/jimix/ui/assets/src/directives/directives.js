(function() {
    "use strict";

    app.directive("jimixFillHeight", function($window) {
        function linkFillHeight(scope, element, attrs) {
            var fillHeight = scope.fillHeight || 1.0;
            scope.$watch("fillHeight", function(newValue) {
                fillHeight = scope.fillHeight || 1.0;
                updateHeight();
            });
            element.css("overflow-y", "auto");
            function updateHeight() {
                var top = element[0].getBoundingClientRect().top;
                element.css("height", fillHeight * ($window.innerHeight - top - 50) + "px");
            }
            angular.element($window).bind('resize', updateHeight);
            scope.$on("$destroy", function() {
                angular.element($window).unbind('resize', updateHeight);
            });
        }
        return {
            restrict: 'A',
            scope: {
                fillHeight: "=jimixFillHeight"
            },
            link: linkFillHeight
        };
    });

})();