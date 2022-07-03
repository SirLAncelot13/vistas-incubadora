var app = angular.module("simen", ['ngRoute']);
$scope.usuario = sessionStorage.getItem("usuario")

app.controller("controllerapp", function($scope, $http, $window) {
    $scope.rol = sessionStorage.getItem("rol")
    $scope.token = sessionStorage.getItem("token")
    $scope.idUsuario = sessionStorage.getItem("idUsuario")
    console.log($scope.rol == 3)
    if ($scope.rol == 3) {
        $scope.empresaList = [];
        $scope.empresaService = function() {
            console.log("empresaService");
            $http({
                method: 'GET',
                url: "http://172.27.48.1:8080/app/empresa/list",
                withCredentials: false,
                headers: {
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function(response) {
                console.log("success");
                $scope.empresaList = response.data;
                console.log(response);
            }, function(error) {
                alert("error");
            });
        }

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
        $scope.empresaService();

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

        $scope.empresaRegisterService = function() {
            var URL = "http://172.27.48.1:8080/app/empresa/save";
            $scope.empresaRegisterService = function() {
                alert($scope.idUsuario);
                let obj = {
                    razonSocial: $scope.empresa.razonSocial,
                    giro: {
                        idGiro: $scope.empresa.giro
                    },
                    representante: {
                        idUsuario: $scope.idUsuario
                    }
                }
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

                $scope.incubacion = function() {
                    return JSON.stringify(response.data)

                };
                console.log(response.data);
            }, function(response) {
                $scope.empresaService2();
                console.log(response);
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