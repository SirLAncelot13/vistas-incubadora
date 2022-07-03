var app = angular.module("simen", ['ngRoute']);
app.controller("controllerapp", function($scope, $http, $window) {
    $scope.registroUsuario = function() {
        console.log($scope.usuario);
        console.log("save");
        $http({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            url: 'http://172.27.48.1:8080/app/usuario/save',
            data: $scope.usuario
        }).then(function(response) {
            console.log("entro");
            Swal.fire({
                icon: 'success',
                title: 'Exitoso',
                text: 'Registro Exitoso',

            });
            $scope.usuario = function() {
                return JSON.stringify(response.data)
            };
            console.log(response.data);
        }, function(response) {
            console.log(response);
        });
    }
    $scope.cerrarSesion = function() {
        sessionStorage.clear()
    }

});