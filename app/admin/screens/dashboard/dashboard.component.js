
(angular => {
    "use strict"
    angular
        .module("mecanicaConfiancaAdmin")
        .component("dashboard", {
            templateUrl: "app/admin/screens/dashboard/dashboard.template.html",
            controller: "DashboardController",
            controllerAs: "vm"
        }).controller("DashboardController", DashboardController);

    DashboardController.$inject = ["$anchorScroll"]

    function DashboardController ($anchorScroll) {
        const vm = this;

        vm.dashboardData = {};

        vm.$onInit = () => {
            $anchorScroll.yOffset = 30;   
        }

        
    }

})(window.angular);