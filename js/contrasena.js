var app = angular.module("simen", ['ngRoute']);

app.controller("controllerapp", function($scope, $http, $window) {
    $scope.rol = sessionStorage.getItem("rol")
    $scope.token = sessionStorage.getItem("token")
    $scope.id = sessionStorage.getItem("idUsuario")
    $scope.usuario = sessionStorage.getItem("usuario")
 
    console.log("contraseña");
    if ($scope.rol == 1 || $scope.rol == 2 || $scope.rol == 3) {
        console.log("entre if contraseña");
        $scope.cambioContrasena = function() {
            console.log("entre a cambio contrasena");
            console.log($scope.cambio.newPassword);
            if ($scope.cambio.newPassword === $scope.cambio.newPassword2) {
                console.log("Deberia jalar")
                console.log($scope.cambio.newPassword);
                //alert($scope.cambio.newPassword)

                console.log($scope.cambio);
                let obj = {
                    idUser: $scope.id,
                    oldPassword: $scope.cambio.oldPassword,
                    newPassword: $scope.cambio.newPassword
                }
                $http({
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + $scope.token
                    },
                    url: 'http://172.27.48.1:8080/app/usuario/changePassword',
                    data: JSON.stringify(obj)

                }).then(function(response) {

                    console.log(response)

                    if (response != null) {
                        //console.log("registrado");
                        sessionStorage.setItem("idPass", 1)
                        Swal.fire({
                            icon: 'success',
                            title: 'Exitoso',
                            text: 'Registro Exitoso',

                        });
                        $("#miformulario")[0].reset();
                    }

                }, function(error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'La contraseña actual no es correcta',
                    });
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Las contraseñas no son iguales',
                });
                console.log("Error en cambio")
            }
        }
        $scope.cerrarSesion = function() {
            sessionStorage.clear()
        }
    } else {
        $window.location.href = "/login.html"
    }
});