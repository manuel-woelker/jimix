(function () {
    "use strict";
    app.factory("JimixService", function($resource) {
        var inventoryResource = $resource("api/inventory");
        var JimixService = {
            
        };
        JimixService.getInventory = function getInventory() {
            return inventoryResource.get();
        };
        return JimixService;
    });

})();
