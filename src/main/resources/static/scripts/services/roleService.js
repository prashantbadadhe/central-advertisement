'use strict';

myApp.factory('roleService', [ '$http', '$q', function($http, $q) {
	return {
		getRoles : function() {

			return $http.get('api/roles').then(function(response) {
			 
				return response;
			}, function(errResponse) {
				console.log(errResponse);
				console.error('Error while fetching role');
				return $q.reject(errResponse);
			});

		},
		createRole : function(role) {
			return $http.post('api/roles',role).then(function(response) {
				return response;
			}, function(errResponse) {
				console.log(errResponse);
 				return $q.reject(errResponse);
			});

		},
		updateRole : function(role){
 	console.log(role);
 	return $http.put(role._links.self.href,role).then(function(response) {
		return response;
	}, function(errResponse) {
		console.log(errResponse);
 		return $q.reject(errResponse);
	});
		},
		deleteRole : function(role){
			
 		 	return $http.delete(role._links.self.href).then(function(response) {
				return response;
			}, function(errResponse) {
				console.log(errResponse);
		 		return $q.reject(errResponse);
			});
				}
		
	};

} ]);
