(angular => {
    "use strict"

    angular
        .module("mecanicaConfiancaAdmin")
        .config(["$resourceProvider", $resourceProvider => {
            $resourceProvider.defaults.actions = {
                create: {
                    method: "POST"
                },
                get: {
                    method: "GET"
                },
                getAll: {
                    method: "GET",
                    isArray: true
                },
                update: {
                    method: "PUT"
                },
                remove: {
                    method: "DELETE"
                }
            };
        }]);

    angular
        .module("mecanicaConfiancaAdmin")
        .config(["toastProvider", toastProvider => {
            toastProvider.configure({
                maxToast: 4,
                timeout: 5 * 1000,
                containerClass: "toast-wrapper",
                defaultToastClass: "alert-success",
                dismissible: true,
                insertFromTop: true,
                position: "right"
            });   
        }]);
})(window.angular);