angular.module('assistantApp', ['angular-ladda'])
    .config(function (laddaProvider) {
        laddaProvider.setOption({
            style: 'slide-up',
            spinnerSize: 35,
            spinnerColor: '#ffffff'
        });
    })
    .controller('registerAssistant', ['$scope', '$http', function ($scope, $http) {
        $scope.assistantData = {};
        $scope.loading = false;
        $scope.registerAssistantSubmit = function () {
            $scope.loading = true;
            $http({
                method: 'POST',
                url: '/registrar-asistente',
                data: $.param($scope.assistantData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                .success(function (data, status, headers, config) {
                    $scope.assistantData = {};
                    toastr["success"](data.message, "Bien hecho");
                    $('#registerAssitantModal').modal('toggle');
                    $scope.loading = false;
                })
                .error(function (error, status, headers, config) {
                    toastr["error"](error.message, "Algo salió mal");
                    $scope.loading = false;
                })
        }
    }]);