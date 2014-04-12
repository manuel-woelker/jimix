(function() {
    "use strict";
    app.controller("MBeanController", function($scope, $state, JimixService) {
        JimixService.getMbean($state.params.objectName).$promise.then(function(mbean) {
            mbean.attributes.sort(window.util.byName);
            $scope.mbean = mbean;
        });
    });

})();