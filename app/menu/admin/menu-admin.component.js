(angular => {
    "use strict"

    angular
        .module("mecanicaConfiancaAdmin")
        .component("menuAdmin", {
            templateUrl: "app/menu/menu.html",
            controller: "MenuController",
            controllerAs: "vm"
        })
        .run(["$anchorScroll", function($anchorScroll) {
            $anchorScroll.yOffset = 30;   
        }])
        .controller("MenuController", MenuController);

        MenuController.$inject = ["$anchorScroll", "$location", "$state", "adminDataService", "toasterService"]
        
        function MenuController ($anchorScroll, $location, $state, adminDataService, toasterService) {
            const vm = this;

            vm.$onInit = () => {
                vm.isHome = $location.$$path === "/app/inicio";
                vm.isAuthenticated = $location.$$path === "/admin/dashboard";
            }

            vm.goToAnchor = (anchor) => {
                $location.hash(anchor);
                $anchorScroll();
            };

            vm.logOut = () => {
                adminDataService
                    .userResource()
                    .remove()
                    .$promise
                    .then(response => {
                        vm.isAuthenticated = false;
                        $state.go("administrator.login", {reload: true});
                    })
                    .catch(error => {
                        toasterService.danger(error.data.message);
                    });
            }
        }
})(window.angular);