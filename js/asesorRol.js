var app = angular.module("simen", ['ngRoute']);
app.controller("controllerapp", function($scope, $http, $window) {
    $scope.rol = sessionStorage.getItem("rol")
    $scope.token = sessionStorage.getItem("token")
    $scope.usuario = sessionStorage.getItem("usuario")
    $scope.idPass = sessionStorage.getItem("idPass")
    $scope.reunionesEmp = "";
    $scope.asesor = [];
    if ($scope.rol == 2) {
        if ($scope.idPass == 0) {
            console.log("entre ->" + $scope.idPass);
            $window.location.href = "/contrasenas.html"
        } else {

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
                    console.log($scope.misIncubaciones);
                })
            }
            $scope.verIncubadora();
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
                    $("#exampleModal22").modal('show');
                    $scope.cerrarModal = function(persona) {

                        $scope.incubacion = {};

                    }

                })
            }
            $scope.verReunionesEmpresa = function(item) {
                $scope.itemB = item;
                $scope.reuniones = angular.copy(item);
                let idIncubacion = $scope.reuniones.idIncubacion;
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
                    console.log($scope.reunionesEmp)
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

            $scope.verPlanDeMarketing = function(item) {
                $scope.empresa = angular.copy(item);
                console.log($scope.empresa.status);
                $("#exampleModal2").modal('show');
            }

            $scope.registrarPlanDeMarketing = function() {
                console.log($scope.empresa);
                $http({
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + $scope.token
                    },
                    url: 'http://172.27.48.1:8080/app/incubacion/marketingUpdate/' + $scope.empresa.idIncubacion
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

            $scope.cargarArchivo = function(item) {
                $scope.itemB = item;
                $scope.reuniones = angular.copy(item);
                let idIncubacion = $scope.reuniones.idIncubacion;
                console.log($scope.reuniones.idIncubacion);
                $http({
                    url: "http://172.27.48.1:8080/app/incubacion/getReuniones/" + idIncubacion,
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + $scope.token
                    }
                }).then(function(response) {
                    console.log(response);
                    $scope.carga = response.data;
                    console.log($scope.carga)
                    console.log("js:", $scope.carga.incubacion.idIncubacion);
                    $("#exampleModalCarga").modal('show');
                })
            }

            $scope.verHistorial = function() {
                let idAsesor = sessionStorage.getItem("idUsuario");
                console.log(idAsesor);
                $http({
                    url: "http://172.27.48.1:8080/app/incubacion/historialAsesor/" + idAsesor,
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + $scope.token
                    }
                }).then(function(response) {
                    console.log(response);
                    $scope.historialAsesor = response.data;
                    console.log($scope.historialAsesor);
                })
            }
            $scope.verHistorial();

            $scope.reset = function(item) {
                let id = item.idIncubacion;
                Swal.fire({
                    title: '¿Estas completamente seguro de querer hacer esto?',
                    text: "¡Esta acción no puede ser revertida!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '¡ESTOY SEGURO!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        console.log(item);
                        $http({
                            method: 'GET',
                            headers: {
                                'Authorization': 'Bearer ' + $scope.token
                            },
                            url: 'http://172.27.48.1:8080/app/incubacion/finalSpace/' + id
                        }).then(function(response) {
                            console.log(response);
                            Swal.fire(
                                '¡EMPRESA DESHABILITADA!',
                                'Esta empresa fué deshabilitada con exito.',
                                'success'
                            )
                            window.location.reload();
                        }, function(error) {
                            alert("error");
                        });

                    }
                    window.location.reload();
                })
            }
        }
    } else {
        $window.location.href = "/login.html"
    }
});