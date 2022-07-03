var app = angular.module("simen", ['ngRoute']);
app.controller("controllerapp", function($scope, $http, $window) {
    $scope.rol = sessionStorage.getItem("rol")
    $scope.token = sessionStorage.getItem("token")
    $scope.usuario = sessionStorage.getItem("usuario")

    $scope.asesor = [];
    $scope.asesorService = function() {
        $http.get("http://172.27.48.1:8080/app/usuario/asesores", {})
            .then(function(response) {
                $scope.asesor = response.data;
                console.log(response);
                console.log("holaaaaa");
                console.log($scope.asesor);
            });
    }

    $scope.asesorService();
});