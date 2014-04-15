(function() {
    "use strict";
    var re = /^".*"$/;
    function stripQuotes(str) {
        if (str.length === 0) {
            return str;
        }
        if (str.charAt(0) === "\"" && str.charAt(str.length - 1)) {
            return str.substring(1, str.length - 1);
        }
        return str;
    }


    app.controller("JimixController", function($scope, $state, JimixService, $rootScope) {
        JimixService.getInventory().$promise.then(function(inventory) {
            $rootScope.hostName = inventory.hostName;
            $rootScope.userName = inventory.userName;
            $rootScope.mainClass = inventory.mainClass;
            var programName = inventory.mainClass;
            $rootScope.programName = programName.substr(programName.lastIndexOf(".") + 1)
            var domainMap = {};
            var re = /([^:]+):(.+)/;
            inventory.mbeans.forEach(function(mbean) {
                var match = re.exec(mbean.objectName);
                var domain = match[1];
                var name = match[2];
                mbean.name = name;
                var namePart = null;
                var typePart = null;
                var scopePart = null;
                var additionalKeys = 0;
                name.split(",").forEach(function(item) {
                    var parts = item.split("=");
                    var key = parts[0].toLowerCase();
                    if (key === "type") {
                        typePart = parts[1];
                        return;
                    }
                    if (key === "name") {
                        namePart = parts[1];
                        return;
                    }
                    if (key === "scope") {
                        scopePart = parts[1];
                        return;
                    }
                    additionalKeys++;
                });
                if (additionalKeys <= 0) {
                    if (typePart) {
                        name = stripQuotes(typePart)
                    }
                    if (namePart) {
                        name += " - " + stripQuotes(namePart);
                    }
                    if (scopePart) {
                        name += " (" + stripQuotes(scopePart) + ")";
                    }
                    mbean.name = name;
                }
                domainMap[domain] = domainMap[domain] || {name: stripQuotes(domain), mbeans: []};
                domainMap[domain].mbeans.push(mbean);
            });
            var domains = [];
            for (var domain in domainMap) {
                domainMap[domain].expanded = true;
                domainMap[domain].mbeans.sort(window.util.byName);
                domains.push(domainMap[domain]);
            }
            domains.sort(window.util.byName);
            $scope.domains = domains;
        });
        $scope.domains = [];
        $scope.toggleDomain = function toggleDomain(domain) {
            domain.expanded = !domain.expanded;
        };

        $scope.showMbean = function showMbean(objectName) {
            $state.go("mbean", {objectName: objectName})
        }
    });

})();