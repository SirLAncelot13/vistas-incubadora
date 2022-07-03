var app = angular.module("simen", ['ngRoute']);
app.controller("controllerapp", function($scope, $http, $window) {
    $scope.rol = sessionStorage.getItem("rol")
    $scope.token = sessionStorage.getItem("token")
    $scope.idUsuario = sessionStorage.getItem("idUsuario")
    $scope.usuario = sessionStorage.getItem("usuario")

    console.log($scope.rol == 1)
    if ($scope.rol == 1) {
        $scope.empresaList = [];

        $scope.empresaList2 = [];
        $scope.empresaService2 = function() {

            $http({
                method: 'GET',
                url: "http://172.27.48.1:8080/app/incubacion/listEmpty",
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

        $scope.usuariosService = function() {

            $http({
                method: 'GET',
                url: "http://172.27.48.1:8080/app/usuario/list",
                withCredentials: false,
                headers: {
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function(response) {
                $scope.asesor = response.data;
                console.log(response);

            });
        }
        $scope.usuariosService();

        $scope.asesor = [];
        $scope.asesorService = function() {
            $http({
                method: 'GET',
                url: "http://172.27.48.1:8080/app/usuario/asesores",
                withCredentials: false,
                headers: {
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function(response) {
                $scope.asesor = response.data;
                console.log(response);
            }, function(error) {
                alert("error");
            });

        }

        $scope.asesorService();

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

        $scope.representantes = [];
        $scope.representantesService = function() {
            $http({
                method: 'GET',
                url: "http://172.27.48.1:8080/app/usuario/list",
                withCredentials: false,
                headers: {
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function(response) {
                $scope.representantes = response.data;
                console.log(response); //Holi
            });
        }
        $scope.representantesService();
        $scope.giroService();

        $scope.registroAsesor = function() {
            console.log($scope.asesorR);
            console.log("save");
            $http({
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + $scope.token
                },
                url: 'http://172.27.48.1:8080/app/asesor/save',
                data: $scope.asesorR
            }).then(function(response) {
                console.log("entro");
                Swal.fire({
                    icon: 'success',
                    title: 'Exitoso',
                    text: 'Registro Exitoso',

                });
            })
        }


        $scope.registroAsignarAsesor = function() {
            //$scope.incubacion;
            console.log("incubacion" + $scope.incubacion.asesor.idUsuario);
            console.log($scope.incubacion.idIncubacion);

            console.log("save");
            $http({
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + $scope.token
                },
                url: 'http://172.27.48.1:8080/app/incubacion/update',
                withCredentials: false,
                data: $scope.incubacion
            }).then(function(response) {
                console.log("entro");
                Swal.fire({
                    icon: 'success',
                    title: 'Exitoso',
                    text: 'Registro Exitoso',

                });

                $window.location.href = "/AsignacionAsesores.html"              
            });
        }


        $scope.verIncubadora = function(item) {
            $scope.itemB = item;
            $scope.incubacion = angular.copy(item);
            console.log($scope.incubacion);
            $("#exampleModal").modal('show');
        }
        $scope.cerrarModal = function(persona) {

            $scope.incubacion = {};

        }

        $scope.cerrarSesion = function() {
            sessionStorage.clear()
        }
    } else {
        $window.location.href = "/login.html"
    }
});