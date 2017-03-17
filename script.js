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
  .service("getService", function ($http, $log) {
    var getS = this
    this.getData = function () {
      return $http.get('data.json')
    }
  })
  .controller("searchCtrl", ["$scope", "$log", "$http", "getService",
    function ($scope, $log, $http, getService) {
      getService.getData().then(function (data) {
        $scope.data = data.data
      })
    }])
  .controller("cardCtrl",
  ["$scope",
    "$routeParams",
    "getService",
    "$log",
    function ($scope, $routeParams, getService, $log) {
      var id = $routeParams.id
      getService.getData().then(function (data) {
        $scope.data = data.data.filter(item => item.id === +id)[0]
        $scope.data.firstName = $scope.data.name.split(" ")[0];
        $scope.data.lastName = $scope.data.name.split(" ")[1];
        $log.log($scope.data)
      })
    }])

