angular.module('statusApp.header', ['statusApp.services', 'ui.bootstrap'])
.controller('HeaderController', ['$scope', '$location', '$routeParams', 'AuthService', '$rootScope', 
                                 function($scope, $location, $routeParams, AuthService, $rootScope) {
  $scope.isAuthenticated = AuthService.isAuthenticated();
  $scope.location = $location;
  
  $scope.logout = function() {
    AuthService.logout();
    $scope.isAuthenticated = AuthService.isAuthenticated();  
  }
}]);