(function () {
    "use strict";
    app.factory("JimixService", function($resource) {
        var inventoryResource = $resource("api/inventory");
        var mbeanResource = $resource("api/mbeans/:objectName");
        var JimixService = {
            
        };
        JimixService.getInventory = function getInventory() {
            return inventoryResource.get();
        };
        JimixService.getMbean = function getMbean(objectName) {
            return mbeanResource.get({objectName: objectName});
        }
        return JimixService;
    });

})();
