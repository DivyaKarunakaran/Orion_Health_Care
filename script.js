//Model that handle view and controller
angular.module('contacts', ['ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/searchRes.html',
        controller: "searchCtrl"
      })
      .when('/card/:id', {
        templateUrl: 'views/card.html',
        controller: 'cardCtrl'
      })
  })

//Asynchronously makes a request to the JSON file using http request and handle the response
  .service("getService", function ($http, $log) {
  var getS = this
  this.getData = function () {
  return $http.get('data.json')
  }
  })

//Controls are Javascript Object, controller handles the data flow in searchRes.html UI
  .controller("searchCtrl", ["$scope", "$log", "$http", "getService",
    function ($scope, $log, $http, getService) {
      getService.getData().then(function (data) {
        $scope.data = data.data
      })
    }])

//Controls the dataflow in card.html UI
  .controller("cardCtrl",
  ["$scope",
    "$routeParams",
    "getService",
    "$log",
    function ($scope, $routeParams, getService, $log) {
      var id = $routeParams.id
      getService.getData().then(function (data) {
       $scope.data = data.data.filter(item => item.id === +id)[0]
       //reads the first name and stores in a array
        $scope.data.firstName = $scope.data.name.split(" ")[0];
       // reads the lastname and stores in a array
        $scope.data.lastName = $scope.data.name.split(" ")[1];
        //debug the JS object flow in the console
        $log.log($scope.data)
      })
    }])

