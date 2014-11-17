
angular.module('statusApp.status', ['statusApp.services'])
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('home.status', {
    "templateUrl": "js/status/status.html",
    "controller": "StatusController"
  });
}])
.controller('StatusController', ['$scope', 'StatusService', 'AuthService', '$rootScope', '$http', '$cookieStore',
                                 function($scope, StatusService, AuthService, $rootScope, $http, $cookieStore) {
  $scope.status = {};
  $scope.statuses = StatusService.query();
  $scope.submit = function() {
	StatusService.save($scope.status).$promise.then(function(savedStatus) {
	  $scope.statuses.push(savedStatus);
	  $scope.status.status = '';
	}, function(err) {
	  console.error(err);
	});  
  };
  
  $scope.delete = function(status, index) {
    StatusService.delete({id:status.id}).$promise.then(function() {
      $scope.statuses.splice(index, 1);  
    }, function(err) {
      console.error(err);
    })
  };
}]);