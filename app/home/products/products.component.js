
(angular => {
    "use strict"
    angular
        .module("mecanicaConfianca")
        .component("products", {
            templateUrl: "app/home/products/products.template.html",
            controller: "ProductsController",
            controllerAs: "vm"
        }).controller("ProductsController", ProductsController);

    ProductsController.$inject = ["homeDataService", "toasterService"]

    function ProductsController (homeDataService, toasterService) {
        const vm = this;

        vm.products = {};

        vm.$onInit = () => {
            loadProducts();
        }

        function loadProducts() {
            homeDataService
                .productResource()
                .get({})
                .$promise
                .then(response => {
                    vm.products = response.body.data;
                })
                .catch(error => {
                    toasterService.danger(error.data.message);
                });
        }
    }

})(window.angular);