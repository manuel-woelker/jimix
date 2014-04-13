(function() {
    "use strict";

    app.directive("jimixFillHeight", function($window) {
        function linkFillHeight(scope, element, attrs) {
            element.css("overflow-y", "auto");
            function updateHeight() {
                var top = element[0].getBoundingClientRect().top;
                element.css("height", ($window.innerHeight - top - 50) + "px");
            }
            updateHeight();
            angular.element($window).bind('resize', updateHeight);
            scope.$on("$destroy", function() {
                angular.element($window).unbind('resize', updateHeight);
            });
        }
        return {
            restrict: 'A',
            link: linkFillHeight
        };
    });

})();