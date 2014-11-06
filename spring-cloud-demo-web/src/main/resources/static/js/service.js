
var services = angular.module('statusApp.services', ['ngResource']);

services.factory('StatusService', function($resource) {
  return $resource('/api/status/:id', {id : "@id"});
});

services.factory("AuthService", ['$resource', '$cookies', '$rootScope', function($resource, $cookies, $rootScope) {
	  return {
	    isAuthenticated : function() {
	      return $cookies['JSESSIONID'] != undefined && $cookies['JSESSIONID'] != null && $cookies['JSESSIONID'].length != 0;
	    },
	    
	    logout : function() {
	      delete $cookies['JSESSIONID'];
	      $rootScope.$broadcast('logout', {});
	    }
	  };
	}]);