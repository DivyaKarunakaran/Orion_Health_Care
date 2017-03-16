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
        $log.log($scope.data)
      })
    }])
//$('#search').keyup(function() {
//	var searchField = $('#search').val();
//	var myExp = new RegExp(searchField, "i");
//	$.getJSON('data.json', function(data) {
//		var output = '<ul class="searchresults">';
//		$.each(data, function(key, val) {
//			if (val.name.search(myExp) != -1) {
//				output += '<li>';
//				output += '<h4>'+ val.name +'</h4>';
//				
//				output += '<p>'+ val.email +'</p>';
//				output += '<p>'+ val.phone +'</p>';
//                output += '<p>'+ val.website +'</p>';
//				
//				
//				output += '</li>';
//			}
//		});
//		output += '</ul>';
//		$('#update').html(output);
//	}); //get JSON
//});

