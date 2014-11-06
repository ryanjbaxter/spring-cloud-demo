
angular.module('statusApp.status', ['statusApp.services'])
.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.otherwise({
    templateUrl: 'js/status/status.html',
    controller: 'StatusController'
  });
}])
.controller('StatusController', ['$scope', 'StatusService', 'AuthService', '$rootScope', function($scope, StatusService, AuthService, $rootScope) {
  $scope.isAuthenticated = AuthService.isAuthenticated();
  $scope.status = {};
  $scope.statuses = StatusService.query();
  $scope.submit = function() {
	StatusService.save($scope.status).$promise.then(function(savedStatus) {
	  $scope.statuses.push(savedStatus);
	  $scope.status.msg = '';
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
  
  $scope.$on('logout', function(event, msg) {
    $scope.isAuthenticated = AuthService.isAuthenticated();
  });
}]);