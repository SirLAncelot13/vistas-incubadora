console.log("Mensaje de prueba");

var miApp = angular.module('myApp', []);
miApp.controller('principalCtrl', ['$scope', function ($scope) {
    $scope.showAllFunctions= function () {
        console.log("Prueba")
        $scope.verProyecto()
    }
    $scope.verProyecto = function () {
        var id= localStorage.getItem("key")
        var URL = "http://172.27.48.1:8080/kanban/proyecto/get?id="+id;
        
        $.ajax({
            type: "GET",//tipo de peticion
            url: URL,//url del serveer
            success: function (result) {
                console.log(result);
                console.log(result.clave);
                var str = result.fechaStatus;
                var fin = str.slice(6,13)+"-"+str.slice(3,5)+"-"+str.slice(0,2);
                console.log($("#claveProyect").val());
                //alert("Clave: "+result.clave)
            }

        });
    }

}])