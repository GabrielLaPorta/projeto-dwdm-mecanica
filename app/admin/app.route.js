(angular => {
    "use strict"

    angular
        .module("routeAdmin", ["ui.router"])
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

            $urlRouterProvider.otherwise(`${adminPath}/dashboard`);

            //routes
            $stateProvider
                .state("administrator", {
                    abstract: true,
                    url: `${adminPath}`
                })
                .state("administrator.login", {
                    templateUrl: "/app/admin/screens/login/login.template.html",
                    url: `/login`
                })
                .state("administrator.dashboard", {
                    component: "dashboard",
                    url: `/dashboard`
                });
        });
})(window.angular);