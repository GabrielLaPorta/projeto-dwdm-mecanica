(angular => {
    "use strict"

    angular
        .module("mecanicaConfianca")
        .factory("toasterService", ["toast", function toasterService(toast) {
                return {
                    danger: danger,
                    info: info,
                    success: success
                };
                
                function success(message) {
                    toast.create({
                        message: message,
                        className: "alert-success"
                    });
                }

                function danger(message) {
                    toast.create({
                        message: message,
                        className: "alert-danger"
                    });
                }

                function info(message) {
                    toast.create({
                        message: message,
                        className: "alert-info"
                    });
                }
            }
        ]);
})(window.angular);