(angular => {
    "use strict"

    angular
        .module("mecanicaConfianca")
        .factory("homeDataService", homeDataService);

        homeDataService.$inject = ["$resource"];

    function homeDataService($resource) {
        const rootApiPath = "/api/v1";
        const clientHost = "http://localhost:3000";

        return {
            productResource: productResource
        }

        function productResource() {
            return $resource(`${clientHost}${rootApiPath}/products`);
        }
    }
})(window.angular);