(function() {
    "use strict";
    app.controller("MBeanController", function($scope, $state, JimixService, $interval) {
        var lastValues = {};
        function update() {
            JimixService.getMbean($state.params.objectName).$promise.then(function(mbean) {
                mbean.attributes.sort(window.util.byName);
                mbean.attributes.forEach(function(attribute) {
                    if (typeof attribute.value === "number") {
                        var lastValue = lastValues[attribute.name];
                        if (typeof lastValue === "number") {
                            attribute.delta = Math.round((attribute.value - lastValue) * 100) / 100;
                        }
                        lastValues[attribute.name] = attribute.value;
                        attribute.value = Math.round((attribute.value) * 100) / 100;
                    }
                });
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

        $scope.hasNoArguments = function hasNoArguments(operation) {
            return operation.signature.length === 0;
        };

        $scope.invokeOperation = function invokeOperation(operation) {
            operation.invoking = true;
            operation.result = 0;
            var invocation = JimixService.invokeOperation($state.params.objectName, operation, []).$promise;
            invocation.then(function(resource) {
                operation.success = true;
                var result = resource.result;
                if (operation.returnType === "void") {
                    result = "OK";
                }
                if(result === null) {
                    result ="<null>";
                }
                operation.result = result;
                
            }).catch(function(error) {
                operation.success = false;
                operation.result = error;
                if (error && error.data && error.data.message) {
                    operation.result = error.data.message;
                }
            }).finally(function() {
                operation.invoking = false;
            });
        }
    });

})();