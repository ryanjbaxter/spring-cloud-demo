
var services = angular.module('statusApp.services', ['ngResource', 'ngCookies']);

services.factory('StatusService', function($resource) {
  return $resource('/api/status/:id', {id : "@id"});
});

services.factory("AuthService", ['$resource', '$cookies', '$rootScope', '$cookieStore', '$http', '$q', function($resource, $cookies, $rootScope, $cookieStore, $http, $q) {
	  return {
	    isAuthenticated : function() {
	      var deferred = $q.defer();
	      var csrfToken = $cookieStore.get('csrfToken');
	      var csrfHeader = $cookieStore.get('csrfHeader');
	      var haveToken = csrfToken != undefined && csrfToken != null && csrfToken != 0;
	      if(!haveToken) {
	         $http.get('/csrf').
	         success(function(data, status, headers, config) {
	           if(data.authenticated) {
	           var csrfHeader = headers('X-CSRF-HEADER');
	           var csrfToken = headers('X-CSRF-TOKEN');
	           var user = headers('X-USER-NAME');
	           
	           $http.defaults.headers.common[csrfHeader] = csrfToken;
	           $cookieStore.put('user', user);
	           $cookieStore.put('csrfHeader', csrfHeader);
	           $cookieStore.put('csrfToken', csrfToken);
	           deferred.resolve(true);
	           } else {
	             deferred.resolve(false);
	           }
	         }).
	         error(function(data, status, headers, config) {
	           deferred.reject(false);
	         });
	      } else {
	        $http.defaults.headers.common[csrfHeader] = csrfToken;
	        deferred.resolve(true);
	      }
	      
	      return deferred.promise;
	    },
	    
	    logout : function() {
	      delete $cookies['csrfHeader'];
	      delete $cookies['csrfToken'];
	      delete $cookies['user'];
	      $rootScope.$broadcast('logout', {});
	    }
	  };
	}]);