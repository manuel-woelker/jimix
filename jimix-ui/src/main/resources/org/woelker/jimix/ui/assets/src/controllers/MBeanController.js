(function() {
    "use strict";
    app.controller("MBeanController", function($scope, $state, JimixService, $interval) {
        function update() {
            JimixService.getMbean($state.params.objectName).$promise.then(function(mbean) {
                mbean.attributes.sort(window.util.byName);
                $scope.mbean = mbean;
            });
        }
        update();
        if ($state.params.autoRefresh) {
            var task = $interval(update, $state.params.autoRefresh);
            $scope.$on("$destroy", function() {
                $interval.cancel(task);
            });
        }
    });

})();