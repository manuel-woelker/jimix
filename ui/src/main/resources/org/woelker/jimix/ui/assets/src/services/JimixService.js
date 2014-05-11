(function() {
    "use strict";
    app.factory("JimixService", function($resource) {
        var inventoryResource = $resource("api/inventory");
        var mbeanResource = $resource("api/mbeans/:objectName");
        var mbeanOperationResource = $resource("api/mbeans/:objectName/:operation", null,
                {
                    'setAttribute': {method: 'PUT'}
                });
        var JimixService = {
        };

        JimixService.getInventory = function getInventory() {
            return inventoryResource.get();
        };

        JimixService.getMbean = function getMbean(objectName) {
            return mbeanResource.get({objectName: objectName});
        };

        JimixService.invokeOperation = function invokeOperation(objectName, operation, args) {
            return mbeanOperationResource.save({objectName: objectName, operation: operation.name, argument: args}, {});
        };

        JimixService.applyAttribute = function applyAttribute(objectName, attribute, newValue) {
            return mbeanOperationResource.setAttribute({objectName: objectName, operation: attribute, value: newValue}, {});
        };


        return JimixService;
    });

})();
