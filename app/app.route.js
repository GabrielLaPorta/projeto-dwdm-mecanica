(angular => {
    "use strict"

    angular
        .module("route", ["ui.router"])
        .config((
            $stateProvider,
            $locationProvider,
            $urlRouterProvider,
            $urlMatcherFactoryProvider
        ) => {
            const rootPath = "/app";
            const adminPath = "/admin";

            //HTML5 mode
            $locationProvider.html5Mode(true);

            //Case Insensitive
            $urlMatcherFactoryProvider.caseInsensitive(true);

            $urlRouterProvider.otherwise(`${rootPath}/inicio`);

            //routes
            $stateProvider
                .state("home", {
                    abstract: true,
                    url: `${rootPath}`
                })
                .state("home.inicio", {
                    templateUrl: "/app/home/main.template.html",
                    url: `/inicio`
                });
        });
})(window.angular);