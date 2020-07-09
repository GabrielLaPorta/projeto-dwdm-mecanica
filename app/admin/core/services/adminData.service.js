(angular => {
    "use strict"

    angular
        .module("mecanicaConfiancaAdmin")
        .factory("adminDataService", adminDataService);

        adminDataService.$inject = ["$resource"];

    function adminDataService($resource) {
        const rootApiPath = "/api/v1";
        const clientHost = "http://localhost:3000";

        return {
            categoryResource: categoryResource,
            productResource: productResource,
            userResource: userResource
        }

        function productResource() {
            return $resource(`${clientHost}${rootApiPath}/products`);
        }

        function categoryResource() {
            return $resource(`${clientHost}${rootApiPath}/categories`);
        }
        
        function userResource() {
            return $resource(`${clientHost}${rootApiPath}/users`);
        }
    }
})(window.angular);