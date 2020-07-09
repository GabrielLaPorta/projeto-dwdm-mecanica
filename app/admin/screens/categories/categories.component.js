
(angular => {
    "use strict"
    angular
        .module("mecanicaConfiancaAdmin")
        .component("categories", {
            templateUrl: "app/admin/screens/categories/categories.template.html",
            controller: "CategoriesController",
            controllerAs: "vm"
        }).controller("CategoriesController", CategoriesController);

    CategoriesController.$inject = ["$cookies", "adminDataService", "toasterService", "$state","$anchorScroll", "$location"]

    function CategoriesController ($cookies, adminDataService, toasterService, $state, $anchorScroll, $location) {
        const vm = this;

        vm.categories = {};

        vm.$onInit = () => {
            loadCategories();
            
            $anchorScroll.yOffset = 30;
        }

        vm.saveCategories = () => {
            if (document.categories.checkValidity()) {
                adminDataService
                    .categoryResource()[angular.isDefined(vm.categories.id) ? "update" : "create"](
                        {}, vm.categories, {user_id: $cookies.get("user_sid")}
                    )
                    .$promise
                    .then(response => {
                        vm.categories = {};
                        loadCategories();
                        toasterService.success(response.message);
                        $state.reload();
                    })
                    .catch(error => {
                        toasterService.danger(error.data.message);
                        if(error.status === 403) {
                            $state.go("administrator.login");
                        }
                    });
            }
        };
        
        vm.updateCategory = (category) => {
            vm.categories = {...category};
            $location.hash("cad-categorias");
            $anchorScroll();
        };

        vm.deleteCategories = (id) => {
            if (confirm("Você realmente deseja excluir esta categoria?")) {
                adminDataService
                    .categoryResource()
                    .remove({ id: id }, {user_id: $cookies.get("user_sid")})
                    .$promise
                    .then(response => {
                        loadCategories();
                        toasterService.success(response.message);
                        $state.reload();
                    })
                    .catch(error => {
                        toasterService.danger(error.data.message);
                        if(error.status === 403) {
                            $state.go("administrator.login");
                        }
                    });
            }
        };

        function loadCategories() {
            adminDataService
                .categoryResource()
                .get({}, {user_id: $cookies.get("user_sid")})
                .$promise
                .then(response => {
                    vm.gridCategories = response.body.data;
                })
                .catch(error => {
                    toasterService.danger(error.data.message);
                    if(error.status === 403) {
                        $state.go("administrator.login");
                    }
                });
        }
    }

})(window.angular);