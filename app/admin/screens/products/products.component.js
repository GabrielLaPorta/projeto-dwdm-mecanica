
(angular => {
    "use strict"
    angular
        .module("mecanicaConfiancaAdmin")
        .component("products", {
            templateUrl: "app/admin/screens/products/products.template.html",
            controller: "ProductsController",
            controllerAs: "vm"
        }).controller("ProductsController", ProductsController);

    ProductsController.$inject = ["$cookies", "adminDataService", "toasterService", "$state","$anchorScroll", "$location"]

    function ProductsController ($cookies, adminDataService, toasterService, $state, $anchorScroll, $location) {
        const vm = this;

        vm.products = {
            categoryid: "1"
        };

        vm.$onInit = () => {
            loadCategories();
            loadProducts();
            
            $anchorScroll.yOffset = 30;
        }

        vm.saveProducts = () => {
            if (document.products.checkValidity()) {
                adminDataService
                    .productResource()[angular.isDefined(vm.products.id) ? "update" : "create"](
                        {}, vm.products, {user_id: $cookies.get("user_sid")}
                    )
                    .$promise
                    .then(response => {
                        vm.products = {};
                        loadProducts();
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
        
        vm.updateProduct = (product) => {
            vm.products = {...product};
            $location.hash("cad-produtos");
            $anchorScroll();
        };

        vm.deleteProducts = (id) => {
            if (confirm("Você realmente deseja excluir este produto?")) {
                adminDataService
                    .productResource()
                    .remove({ id: id }, {user_id: $cookies.get("user_sid")})
                    .$promise
                    .then(response => {
                        loadProducts();
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

        function loadProducts() {
            adminDataService
                .productResource()
                .get({}, {user_id: $cookies.get("user_sid")})
                .$promise
                .then(response => {
                    vm.gridProducts = response.body.data;
                })
                .catch(error => {
                    toasterService.danger(error.data.message);
                    if(error.status === 403) {
                        $state.go("administrator.login");
                    }
                });
        }

        function loadCategories() {
            adminDataService
                .categoryResource()
                .get({}, {user_id: $cookies.get("user_sid")})
                .$promise
                .then(response => {
                    vm.categories = response.body.data;
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