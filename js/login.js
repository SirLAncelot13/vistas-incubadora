var app = angular.module("simen", ['ngRoute']);
app.controller("controllerapp", function ($scope, $http, $window) {

    $scope.loginService = function () {
        console.log("Login");
        $http({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            url: 'http://172.27.48.1:8080/app/inicio',
            data: $scope.login
        }).then(function (response) {
            if (response.data[1] = !null) {
                sessionStorage.setItem("idUsuario", response.data.idUsuario)
                sessionStorage.setItem("usuario", response.data.nombre)
                sessionStorage.setItem("rol", response.data.rol.idRol)
                sessionStorage.setItem("token", response.data.token)
                sessionStorage.setItem("idPass", response.data.idPassword)
                if (response.data.rol.idRol == 1) {
                    $window.location.href = "/AsignacionAsesores.html"
                } else if (response.data.rol.idRol == 2) {
                    $window.location.href = "/EmpresasIncubadasAsesor.html"
                } else if (response.data.rol.idRol == 3) {
                    $window.location.href = "/EmpresasIncubadasUsuario.html"
                } else {
                    $window.location.href = "/login.html"
                }
            } else {
                console.log("no entre");
            }

        }, function (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Usuario y/o contraseña incorrectos',
            });
        });
    }
});