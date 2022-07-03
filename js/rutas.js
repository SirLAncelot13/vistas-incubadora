var app = angular.module("simen", ["ngRoute"])
.config(function($routeProvider){
    $routeProvider
        .when("/", {
            controller: "appCtrl",
            controllerAs: "vm",
            templateUrl: "home.html"
        })
        .when("/descargas", {
            controller: "appCtrl",
            controllerAs: "vm",
            templateUrl: "descargas.html"
        })
        .when("/opciones", {
            controller: "appCtrl",
            controllerAs: "vm",
            templateUrl: "opciones.html"
        });
})
.controller("appCtrl", function(){
    //código del controlador (lo estoy usando en todas las rutas, en este sencillo ejemplo)
});