angular.module('registerApp', ['angular-ladda'])
    .config(function (laddaProvider) {
        laddaProvider.setOption({
            style: 'slide-up',
            spinnerSize: 35,
            spinnerColor: '#ffffff'
        });
    })
    .controller('registerController', ['$scope', '$http', function ($scope, $http) {
        $scope.registerData = {};
        $scope.loading = false;
        $scope.submitRegisterForm = function () {
            $scope.loading = true;
            $http({
                method: 'POST',
                url: '/registrar',
                data: $.param($scope.registerData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                .success(function (data, status, headers, config) {
                    $scope.registerData.dni = '';
                    $('#registerButton').focus();
                    toastr["success"](data.message, "Bien hecho");
                    $scope.loading = false;
                })
                .error(function (error, status, headers, config) {
                    toastr["error"](error.message, "Algo salió mal");
                    $('#registerButton').focus();
                    $scope.loading = false;
                })
        }
    }]);