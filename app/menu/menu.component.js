(angular => {
    "use strict"

    angular
        .module("mecanicaConfianca")
        .component("menu", {
            templateUrl: "app/menu/menu.html",
            controller: "MenuController",
            controllerAs: "vm"
        })
        .run(['$anchorScroll', function($anchorScroll) {
            $anchorScroll.yOffset = 30;   
        }])
        .controller('MenuController', MenuController);

        MenuController.$inject = ["$anchorScroll", "$location", "$rootScope"]

        function MenuController ($anchorScroll, $location, $rootScope) {
            const vm = this;

            vm.$onInit = () => {
                vm.isHome = $location.$$path === "/app/inicio";
                vm.isAuthenticated = false;
            }


            vm.goToAnchor = (anchor) => {
                $location.hash(anchor);
                $anchorScroll();
            };
        }
})(window.angular);