var app = angular.module("simen", ['ngRoute']);
app.controller("controllerapp", function($scope, $http, $window) {
    $scope.rol = sessionStorage.getItem("rol")
    $scope.token = sessionStorage.getItem("token")
    $scope.usuario = sessionStorage.getItem("usuario")

    $scope.asesor = [];
    if ($scope.rol == 2) {

        $scope.asesorService = function() {

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

        $scope.asesorService();

        $scope.registroAsesor = function() {
            console.log($scope.usuario);
            console.log("save");
            $http({
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + $scope.token
                },
                url: 'http://172.27.48.1:8080/app/asesor/save',
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

        $scope.verIncubadora = function() {
            let idAsesor = sessionStorage.getItem("idUsuario");
            console.log(idAsesor);
            $http({
                url: "http://172.27.48.1:8080/app/incubacion/getByAsesor/" + idAsesor,
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function(response) {
                console.log(response);
                $scope.misIncubaciones = response.data;
            })
        }
        $scope.verIncubadora();

        $scope.verReunionesEmpresa = function(item) {
            $scope.itemB = item;
            $scope.reuniones = angular.copy(item);
            let idIncubacion = $scope.reuniones.idIncubacion;
            //let idAsesor = sessionStorage.getItem("idUsuario");
            console.log($scope.reuniones.idIncubacion);
            $http({
                url: "http://172.27.48.1:8080/app/incubacion/getReuniones/" + idIncubacion,
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function(response) {
                console.log(response);
                $scope.reunionesEmp = response.data;
                $("#exampleModal").modal('show');
            })
        }

        $scope.registroReuniones = function() {
            console.log($scope.reunionesEmp);
            let obj = {
                idIncubacionReuniones: $scope.reunionesEmp.idIncubacionReuniones
            }
            console.log(obj)
            $http({
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + $scope.token
                },
                url: 'http://172.27.48.1:8080/app/incubacion/updateReunion',
                data: obj
            }).then(function(response) {
                console.log(response);
                Swal.fire({
                    icon: 'success',
                    title: 'Exitoso',
                    text: 'Registro Exitoso',

                });
            }, function(error) {
                alert("error");
            });
        }

    } else {
        $window.location.href = "/login.html"
    }
});