var app = angular.module("simen", ['ngRoute']);
app.controller("controllerapp", function ($scope, $http, $window) {
    $scope.rol = sessionStorage.getItem("rol")
    $scope.token = sessionStorage.getItem("token")
    $scope.idUsuario = sessionStorage.getItem("idUsuario")
    $scope.usuario = sessionStorage.getItem("usuario")

    console.log($scope.rol == 3)
    if ($scope.rol == 3) {

        $scope.empresaList = [];
        $scope.empresaService = function () {
            console.log("empresaService");
            $http({
                method: 'GET',
                url: "http://172.27.48.1:8080/app/incubacion/getByPerson/"+$scope.idUsuario,
                withCredentials: false,
                headers: {
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function (response) {
                console.log("success");
                $scope.empresaList = response.data;
                console.log(response);
            }, function (error) {
                alert("error");
            });
        }

        $scope.empresaRegisterService = function () {
            var URL = "http://172.27.48.1:8080/app/empresa/save";
            $scope.empresaRegisterService = function () {
                //alert($scope.idUsuario);
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
                }).then(function (response) {
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
              $("#formEmpresa")[0].reset();  
            }
        }

        $scope.giro = [];
        $scope.giroService = function () {
            $http({
                method: 'GET',
                url: "http://172.27.48.1:8080/app/giro/list",
                withCredentials: false,
                headers: {
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function (response) {
                $scope.giro = response.data;
                console.log(response);
            });
        }

        $scope.giroService();

        $scope.empresaByPersonService = function () {

            $http({
                method: 'GET',
                url: "http://172.27.48.1:8080/app/incubacion/getByPerson/" + $scope.idUsuario,
                withCredentials: false,
                headers: {
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function (response) {
                $scope.empresaList2 = response.data;
                console.log(response);
            }, function (error) {
                alert("error");
            });
        }
        $scope.empresaByPersonService();


        $scope.verIncubadora = function (item) {
            $scope.itemB = item;
            let id_incubacion = $scope.itemB.idIncubacion
            $http({
                url: "http://172.27.48.1:8080/app/incubacion/getReuniones/" + id_incubacion,
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function (response) {
                console.log(response.data);
                $scope.incubacion = angular.copy(item);
                $scope.consulta = response.data;
                console.log($scope.consulta)
                console.log($scope.incubacion);
                $("#exampleModal").modal('show');
                $scope.cerrarModal = function (persona) {

                    $scope.incubacion = {};

                }

            })
        }


        $scope.verReuniones = function (item) {
            $scope.itemB = item;
            let id_incubacion = $scope.itemB.idIncubacion
            sessionStorage.setItem("idIncubacion", id_incubacion)
            $http({
                url: "http://172.27.48.1:8080/app/incubacion/getReuniones/" + id_incubacion,
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function (response) {
                console.log(response);
                $scope.incubacion = angular.copy(item);
                console.log($scope.incubacion);
                $window.location.href = "/verReunionesUsuario.html"
            })
        }


        $scope.verReuniones2 = function () {
            let id = sessionStorage.getItem("idIncubacion")
            $http({
                url: "http://172.27.48.1:8080/app/incubacion/getReuniones/" + id,
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function (response) {
                $scope.reuniones = response.data;
                console.log("hola");
                console.log($scope.reuniones)
            })
        }

        $scope.empresaFinanciera = function (item) {
            $scope.itemB = item;
            let id_incubacion = $scope.itemB.idIncubacion
            $http({
                url: "http://172.27.48.1:8080/app/incubacion/getReuniones/" + id_incubacion,
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function (response) {
                console.log(response.data);
                $scope.incubacion = angular.copy(item);
                $scope.consulta = response.data;
                console.log($scope.consulta)
                console.log($scope.incubacion);
                $("#exampleModal1").modal('show');
                $scope.cerrarModal = function (persona) {
                    $scope.incubacion = {};
                }
            })
        }

        $scope.registroEmpresaFinanciera = function () {
            console.log("entreeee")
            var URL = "http://172.27.48.1:8080/app/financiamiento/save";
            let obj = {
                nombre: $scope.empresaFinanciera.nombre,
                rfc: $scope.empresaFinanciera.rfc,
                giro: {
                    idGiro: $scope.empresaFinanciera.giro.idGiro
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
            }).then(function (response) {
                console.log(response)
                if (response != null) {
                    console.log("registrado");
                    Swal.fire({
                        icon: 'success',
                        title: 'Exitoso',
                        text: 'Registro Exitoso',

                    });
                    $scope.empresaService();
                    $("#formAsesor")[0].reset();
                }
            }, function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ups',
                    text: 'Ocurio un problema',

                });
            });
        }

        $scope.asignarEmpresaFinanciera = function () {
            console.log("entreeee")
            var URL = "http://172.27.48.1:8080/app/incubacion/financiamiento/save";
            console.log($scope.empresasFinancieras);
            let aux = {
                incubacion: {
                    idIncubacion: $scope.itemB.idIncubacion
                },
                empresaFinanciera: {
                    idEmpresaFinanciera: $scope.empresasFinancieras.idEmpresaFinanciera
                },
                tipoFinanciamiento: $scope.empresasFinancieras.tipoFinanciamiento,
                comentario: $scope.empresasFinancieras.comentario
            }
            console.log(aux);

            $http({
                method: 'POST',
                url: URL,
                withCredentials: false,
                headers: {
                    'Authorization': 'Bearer ' + $scope.token
                },
                data: JSON.stringify(aux)
            }).then(function (response) {
                console.log(response)
                if (response != null) {
                    console.log("registrado");
                    Swal.fire({
                        icon: 'success',
                        title: 'Exitoso',
                        text: 'Registro Exitoso',

                    });
                    $scope.empresaService();
                    $("#form2")[0].reset();

                }
            }, function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ups',
                    text: 'Ocurio un problema',

                });
            });
        }

        $scope.empresaFinancieras = [];
        $scope.empresasFinancierasService = function () {
            $http({
                method: 'GET',
                url: "http://172.27.48.1:8080/app/financiamiento/listOn",
                withCredentials: false,
                headers: {
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function (response) {
                $scope.empresaFinancieras = response.data;
                console.log(response);
            });
        }
        $scope.empresasFinancierasService();

        $scope.cerrarSesion = function () {
            sessionStorage.clear()
        }


        $scope.verIncubadoraSat = function (item) {
            $scope.itemB = item;
            console.log("sat");
            let id_incubacion = $scope.itemB.idIncubacion
            $http({
                url: "http://172.27.48.1:8080/app/incubacion/getReuniones/" + id_incubacion,
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function (response) {
                console.log(response.data);
                $scope.incubacion = angular.copy(item);
                $scope.consulta = response.data;
                console.log($scope.consulta)
                console.log($scope.incubacion);
                console.log("modal");
                $("#ModalSat").modal('show');
                $scope.cerrarModal = function (persona) {

                    $scope.incubacion = {};

                }

            })
        }

        ///////////////////////////////////////////////////////////////////////////
        //registro oficial usuario
        $scope.registroOficialUsuario = function () {
            var URL = "http://172.27.48.1:8080/app/SAT/save";
            console.log($scope.incubacion);
            console.log($scope.usuarioSat);

            let aux = {
                incubacion: {
                    idIncubacion: $scope.incubacion.idIncubacion
                },

                nombreRepresentante: $scope.usuarioSat.nombreRepresentante,
                paternoRepresentante: $scope.usuarioSat.paternoRepresentante,
                maternoRepresentante: $scope.usuarioSat.maternoRepresentante,
                correoRepresentante: $scope.usuarioSat.correoRepresentante,
                curpRepresentante: $scope.usuarioSat.curpRepresentante,
                giro: {
                    idGiro: $scope.usuarioSat.giro.idGiro
                },
                razonSocial:$scope.usuarioSat.razonSocial,
                rfc:$scope.usuarioSat.rfc
            }

            console.log(aux);
            $http({
                method: 'POST',
                url: URL,
                withCredentials: false,
                headers: {
                    'Authorization': 'Bearer ' + $scope.token
                },
                data: JSON.stringify(aux)
            }).then(function (response) {
                console.log(response)
                if (response != null) {
                    console.log("registrado");
                    Swal.fire({
                        icon: 'success',
                        title: 'Exitoso',
                        text: 'Registro Exitoso',

                    });
                    $scope.empresaService();
                    $("#form2")[0].reset();

                }
            }, function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ups',
                    text: 'Ocurio un problema',

                });
            });
        }

        $scope.verHistorial = function () {
            let idAsesor = sessionStorage.getItem("idUsuario");
            console.log(idAsesor);
            $http({
                url: "http://172.27.48.1:8080/app/incubacion/historialUser/" + idAsesor,
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function (response) {
                console.log(response);
                $scope.historialUsuario = response.data;
                console.log($scope.historialUsuario);
            })
        }
        $scope.verHistorial();

    } else {
        $window.location.href = "/login.html"
    }
});