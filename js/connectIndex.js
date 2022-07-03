var miApp = angular.module('myApp', []);

miApp.controller('principalCtrl', ['$scope', function ($scope) {
    $scope.registrar = function () {
        const pattern = new RegExp('^[A-Z]+$', 'i');

        if (!pattern.test($("#clave").val()) || !pattern.test($("#name").val())) {
            // Si queremos agregar letras acentuadas y/o letra ñ debemos usar
            // codigos de Unicode (ejemplo: Ñ: \u00D1  ñ: \u00F1)
            Swal.fire({
                type: 'warning',
                title: 'Formato incorrecto',
                text: 'Intentalo nuevamente',
            }).then(function () {

            });
        } else {
            // Si pasamos todas la validaciones anteriores, entonces el input es valido
            Swal.fire({
                title: '¿Desea registrar este proyecto?',
                text: "Verifica correctamente los datos",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Continuar'
            }).then((result) => {
                if (result.value == true) {
                    var URL = "http://localhost:8080/kanban/proyecto/save";
                    var str = $("#fechaFin").val();
                    var fin = str.slice(8, 11) + "/" + str.slice(5, 7) + "/" + str.slice(0, 4);
                    var str2 = $("#fechaInicio").val();
                    var start = str2.slice(8, 11) + "/" + str2.slice(5, 7) + "/" + str2.slice(0, 4);

                    $.ajax({
                        type: "POST", //tipo de peticion
                        dataType: "json", //que tipo de dato se enviara
                        contentType: "application/json",
                        url: URL, //url del serveer
                        data: JSON.stringify({
                            "clave": $("#clave").val().toUpperCase(),
                            "fechaFinal": fin,
                            "fechaInicio": start,
                            "nombre": $("#name").val(),
                            "status": {
                                "id": 1,
                                "descripcion": "Pendiente"
                            }
                        }),
                        processData: false,
                        success: function (data, status, jQxhr) {
                            $("#name").val("");
                            $("#clave").val("");
                            $("#fechaFin").val("");
                            $("#fechaInicio").val("");
                            Swal.fire({
                                type: 'success',
                                title: 'Éxito',
                                text: 'Se registro correctamente',
                            }).then(function () {
                                document.location.reload();
                            });
                        },
                        error: function (jQxhr, status, errorThrown) {
                            $("#name").val("");
                            $("#clave").val("");
                            $("#fechaFin").val("");
                            $("#fechaInicio").val("");
                            Swal.fire({
                                type: 'warning',
                                title: 'Algo salio mal',
                                text: 'Intentalo nuevamene',
                            }).then(function () {
                                document.location.reload();
                            });
                        }
                    });
                }
            })
        }
    }
    $scope.consultarTodos = function () {
        var URL = "http://localhost:8080/kanban/proyecto/getAll";

        $.ajax({
            type: "GET", //tipo de peticion
            url: URL, //url del serveer
            success: function (result) {
                $scope.proyectos = result;
                $scope.$apply()
            }

        });
    }

    $scope.moveNow = function (id) {
        localStorage.setItem('key', id);
        location.href = "proyecto.html";
    }

    $scope.verProyecto = function (id) {
        var URL = "http://localhost:8080/kanban/proyecto/get?id=" + id;

        $.ajax({
            type: "GET", //tipo de peticion
            url: URL, //url del serveer
            success: function (result) {
                var str = result.fechaFinal;
                var fin = str.slice(6, 13) + "-" + str.slice(3, 5) + "-" + str.slice(0, 2);
                var str2 = result.fechaInicio;
                var start = str2.slice(6, 13) + "-" + str2.slice(3, 5) + "-" + str2.slice(0, 2);
                $("#name2").val(result.nombre);
                $("#clave2").val(result.clave);
                $("#fechaFin2").val(fin);
                $("#fechaInicio2").val(start);
                $("#proId").val(result.id)
                $("#idStatus").val(result.status.id)
                $("#descrip").val(result.status.descripcion)
                $("#fechaStatus").val(result.fechaStatus)
                $("#fechaRegi").val(result.fechaRegistro)
            }

        });
    }

    $scope.modificar = function () {
        const pattern = new RegExp('^[A-Z]+$', 'i');

        if (!pattern.test($("#clave2").val()) || !pattern.test($("#name2").val())) {
            // Si queremos agregar letras acentuadas y/o letra ñ debemos usar
            // codigos de Unicode (ejemplo: Ñ: \u00D1  ñ: \u00F1)
            Swal.fire({
                type: 'warning',
                title: 'Formato incorrecto',
                text: 'Intentalo nuevamente',
            }).then(function () {

            });
        } else {
            Swal.fire({
                title: '¿Desea modificar este proyecto?',
                text: "Verifica correctamente los datos",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Continuar'
            }).then((result) => {
                if (result.value == true) {
                    var URL = "http://localhost:8080/kanban/proyecto/update";
                    var str = $("#fechaFin2").val();
                    var fin = str.slice(8, 11) + "/" + str.slice(5, 7) + "/" + str.slice(0, 4);
                    var str2 = $("#fechaInicio2").val();
                    var start = str2.slice(8, 11) + "/" + str2.slice(5, 7) + "/" + str2.slice(0, 4);

                    $.ajax({
                        type: "PUT", //tipo de peticion
                        dataType: "json", //que tipo de dato se enviara
                        contentType: "application/json",
                        url: URL, //url del serveer
                        data: JSON.stringify({
                            "id": $("#proId").val(),
                            "clave": $("#clave2").val(),
                            "nombre": $("#name2").val(),
                            "fechaInicio": start,
                            "fechaFinal": fin,
                            "fechaStatus": $("#fechaStatus").val(),
                            "fechaRegistro": $("#fechaRegi").val(),
                            "status": {
                                "id": $("#idStatus").val(),
                                "descripcion": $("#descrip").val()
                            }
                        }),
                        processData: false,
                        success: function (data, status, jQxhr) {
                            $("#name2").val("");
                            $("#clave2").val("");
                            $("#fechaFin2").val("");
                            $("#fechaInicio2").val("");
                            Swal.fire({
                                type: 'success',
                                title: 'Éxito',
                                text: 'Se actualizo correctamente',
                            }).then(function () {
                                document.location.reload();
                            });
                        },
                        error: function (jQxhr, status, errorThrown) {
                            $("#name").val("");
                            $("#clave").val("");
                            $("#fechaFin").val("");
                            $("#fechaInicio").val("");
                            Swal.fire({
                                type: 'error',
                                title: 'Algo salio mal',
                                text: 'Intentalo nuevamente',
                            }).then(function () {
                                document.location.reload();
                            });
                        }
                    });
                }
            })
        }
    }

    $scope.exterminar = function (id) {
        Swal.fire({
            title: '¿Desea eliminar este proyecto?',
            text: "No se podra restaurar el elemento",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar'
        }).then((result) => {
            if (result.value == true) {
                var URL = "http://localhost:8080/kanban/proyecto/delete?id=" + id;
                $.ajax({
                    url: URL,
                    type: "DELETE",
                    success: function (result) {
                        Swal.fire({
                            type: 'success',
                            title: 'Éxito',
                            text: 'Se elimino correctamente',
                        }).then(function () {
                            document.location.reload();
                        });
                    },
                    error: function (result) {
                        Swal.fire({
                            type: 'warning',
                            title: 'Algo salio mal',
                            text: 'Intentalo nuevamente',
                        }).then(function () {
                            document.location.reload();
                        });
                    }
                })
            }
        })
    }
}])