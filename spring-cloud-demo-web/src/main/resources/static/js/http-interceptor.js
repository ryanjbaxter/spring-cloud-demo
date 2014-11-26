angular.module('status.httpInterceptor',[]).factory('statusHttpInterceptor', ['$q', '$injector', function($q, $injector) {
  var interceptor = {
    responseError: function(response) {
      var AuthService = $injector.get('AuthService')
      // Session has expired
      if (response.status == 403){
        AuthService.logout();
      }
      return $q.reject(response);
    }
  };
  return interceptor;
}])
.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('statusHttpInterceptor');
}]);