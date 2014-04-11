(function () {
    "use strict";
    app.controller("JimixController", function($scope, JimixService) {
        $scope.domains = JimixService.getInventory().$promise.then(function(inventory) {
            var domainMap = {};
            var re = /([^:]+):(.+)/;
            inventory.mbeans.forEach(function(mbean) {
                var match = re.exec(mbean.objectName);
                var domain = match[1]; 
                var name = match[2]; 
                mbean.name = name;
                domainMap[domain] = domainMap[domain] || {name: domain, mbeans: []};
                domainMap[domain].mbeans.push(mbean);
            });
            var domains = [];
            for(var domain in domainMap) {
                domainMap[domain].expanded = true;
                domains.push(domainMap[domain]);
            }
            $scope.domains = domains;
        });        
        $scope.domains = [];
        $scope.toggleDomain = function toggleDomain(domain) {
            domain.expanded = !domain.expanded;
        };
        
        $scope.showMbean = function showMbean(objectName) {
            $scope.mbean = JimixService.getMbean(objectName);
        }
    });

})();