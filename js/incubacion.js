var app = angular.module("simen", ['ngRoute']);
$scope.usuario = sessionStorage.getItem("usuario")

app.controller("controllerapp", function($scope, $http, $window) {
    $scope.rol = sessionStorage.getItem("rol")
    $scope.token = sessionStorage.getItem("token")
    $scope.idUsuario = sessionStorage.getItem("idUsuario")
    $scope.usuario = sessionStorage.getItem("usuario")
    $scope.empresaList2 = [];
    if ($scope.rol == 3) {

        $scope.empresaService2 = function() {

            $http({
                method: 'GET',
                url: "http://172.27.48.1:8080/app/incubacion/getByPerson/" + $scope.idUsuario,
                withCredentials: false,
                headers: {
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function(response) {
                $scope.empresaList2 = response.data;
                console.log(response);
            }, function(error) {
                alert("error");
            });
        }
        $scope.empresaService2();

        $scope.verIncubadora = function(item) {
            $scope.itemB = item;
            let id_incubacion = $scope.itemB.idIncubacion
            $http({
                url: "http://172.27.48.1:8080/app/incubacion/getReuniones/" + id_incubacion,
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function(response) {
                console.log(response.data);
                $scope.incubacion = angular.copy(item);
                $scope.consulta = response.data;
                console.log($scope.consulta)
                console.log($scope.incubacion);
                $("#exampleModal").modal('show');
                $scope.cerrarModal = function(persona) {

                    $scope.incubacion = {};

                }

            })
        }

 
        $scope.verReuniones = function(item) {
            $scope.itemB = item;
            let id_incubacion = $scope.itemB.idIncubacion
            sessionStorage.setItem("idIncubacion", id_incubacion)
            $http({
                url: "http://172.27.48.1:8080/app/incubacion/getReuniones/" + id_incubacion,
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function(response) {
                console.log(response);
                $scope.incubacion = angular.copy(item);
                console.log($scope.incubacion);
                $window.location.href = "/verReunionesUsuario.html"
            })
        }

        $scope.verReuniones2 = function() {
            let id = sessionStorage.getItem("idIncubacion")
            $http({
                url: "http://172.27.48.1:8080/app/incubacion/getReuniones/" + id,
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function(response) {
                $scope.reuniones = response.data;
                console.log("hola");
                console.log($scope.reuniones)
                    //$window.location.href = "/verReunionesUsuario.html"
            })
        }



        $scope.cerrarSesion = function() {
            sessionStorage.clear()
        }
    } else {
        $window.location.href = "/login.html"
    }

    $scope.registroEmpresaFinanciera = function() {
        console.log("entreeee")
        var URL = "http://172.27.48.1:8080/app/incubacion/financiamiento/save";
        console.log(JSON.stringify(obj));
        $http({
            method: 'POST',
            url: URL,
            withCredentials: false,
            headers: {
                'Authorization': 'Bearer ' + $scope.token
            },
            data: JSON.stringify(obj)
        }).then(function(response) {
            console.log(response)
            if (response != null) {
                console.log("registrado");
                Swal.fire({
                    icon: 'success',
                    title: 'Exitoso',
                    text: 'Registro Exitoso',

                });
                $scope.empresaService();
            }
        });
    }

    $scope.giro = [];
    $scope.giroService = function() {
        $http({
            method: 'GET',
            url: "http://172.27.48.1:8080/app/giro/list",
            withCredentials: false,
            headers: {
                'Authorization': 'Bearer ' + $scope.token
            }
        }).then(function(response) {
            $scope.giro = response.data;
            console.log(response);
        });
    }

    $scope.giroService();
});