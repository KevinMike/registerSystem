var registerApp = angular.module('registerApp', ['angular-ladda'])
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
            $scope.registerData.date = new Date();
            $http({
                method: 'POST',
                url: '/registrar',
                data: $.param($scope.registerData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                .success(function (data, status, headers, config) {
                    $scope.registerData.dni = '';
                    $('#dniInput').focus();
                    toastr["success"](data.message, "Bien hecho");
                    $scope.loading = false;
                })
                .error(function (error, status, headers, config) {
                    toastr["error"](error.message, "Algo salió mal");
                    $('#dniInput').focus();
                    $scope.loading = false;
                })
        }
    }])
    .controller('registerAssistant', ['$scope', '$http', function ($scope, $http) {
        $scope.assistantData = {type:'Estudiante de la UNJBG'};
        $scope.loading = false;
        $scope.options = ['Estudiante de la UNJBG','Egresado de la UNJBG (Código 2014-2015)','Estudiante de otra universidad','Profesional'];
        $scope.registerAssistantSubmit = function () {
            $scope.loading = true;
            $http({
                method: 'POST',
                url: '/registrar-asistente',
                data: $.param($scope.assistantData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                .success(function (data, status, headers, config) {
                    $scope.assistantData = {type:'Estudiante de la UNJBG'};
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