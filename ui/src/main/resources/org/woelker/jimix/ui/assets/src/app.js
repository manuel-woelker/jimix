(function() {
    "use strict";
    var app = window.app = angular.module('JimixApp', ['ngResource', 'ui.router']);

    app.config(['$stateProvider', function($stateProvider) {
            $stateProvider.state('home', {
                templateUrl: 'home.html'
            }).state("mbean", {
                parent: 'home',
                url: "/mbeans/:objectName?autoRefresh",
                templateUrl: 'mbean.html',
            });
        }])
            .run(['$state', function($state) {
                    $state.transitionTo('home');
                }])

})();
