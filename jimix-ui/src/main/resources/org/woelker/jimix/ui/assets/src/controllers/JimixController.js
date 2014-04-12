(function() {
    "use strict";
    function byName(a, b) {
        if (a.name === b.name) {
            return 0;
        }
        return a.name < b.name ? -1 : 1;
    }

    app.controller("JimixController", function($scope, JimixService) {
        JimixService.getInventory().$promise.then(function(inventory) {
            var domainMap = {};
            var re = /([^:]+):(.+)/;
            inventory.mbeans.forEach(function(mbean) {
                var match = re.exec(mbean.objectName);
                var domain = match[1];
                var name = match[2];
                mbean.name = name;
                var namePart = null;
                var typePart = null;
                var additionalKeys = 0;
                name.split(",").forEach(function(item) {
                    var parts = item.split("=");
                    var key = parts[0];
                    if (key === "type") {
                        typePart = parts[1];
                        return;
                    }
                    if (key === "name") {
                        namePart = parts[1];
                        return;
                    }
                    additionalKeys++;
                });
                if (additionalKeys <= 0) {
                    if (typePart) {
                        name = typePart
                    }
                    if (namePart) {
                        name += " - " + namePart;
                    }
                    mbean.name = name;
                }
                domainMap[domain] = domainMap[domain] || {name: domain, mbeans: []};
                domainMap[domain].mbeans.push(mbean);
            });
            var domains = [];
            for (var domain in domainMap) {
                domainMap[domain].expanded = true;
                domainMap[domain].mbeans.sort(byName);
                domains.push(domainMap[domain]);
            }
            $scope.domains = domains;
        });
        $scope.domains = [];
        $scope.toggleDomain = function toggleDomain(domain) {
            domain.expanded = !domain.expanded;
        };

        $scope.showMbean = function showMbean(objectName) {
            $scope.mbean = JimixService.getMbean(objectName).$promise.then(function(mbean) {
                mbean.attributes.sort(byName);
                $scope.mbean = mbean;
            });
        }
    });

})();