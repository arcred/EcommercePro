var myApp=angular.module('myApp', ['ngStorage','ngRoute','angular.filter']); 
myApp.controller('CatalogueController', ['$scope','$http',function ($scope,$http) {
    
    $scope.insert = function(){
        $http.get('/insertcloud').then(function(response) {
		  console.log("success");	
        });    
    }
    
}]);  