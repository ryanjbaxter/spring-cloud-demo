angular.module('statusApp.container', ['statusApp.services'])
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider.state('home', {
    "url": '/home',
    "templateUrl": "js/container/container.html",
    "controller" : function($scope, $state, AuthService, isAuthenticated) {
      $scope.logout = function() {
        AuthService.logout();
        $scope.isAuthenticated = false;
      };
      $scope.isAuthenticated = isAuthenticated;
      $state.transitionTo('home.status');
    },
    "resolve": {
      isAuthenticated:  function(AuthService) {
        return AuthService.isAuthenticated();
      }
   }
  });
}])
.controller('ContainerController', ['$scope', '$state',
                                 function($scope, $state, isAuthenticated) {
  $state.transitionTo('home.status');
}]);