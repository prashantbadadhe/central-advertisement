'use strict';

myApp.factory('userService', [ '$http', '$q', function($http, $q) {
	return {
		getUsers  : function() {
			return $http.get('/api/users?projection=userview').then(function(response) {
				return response;
			}, function(errResponse) {
				console.log(errResponse);
				console.error('Error while fetching user');
				return $q.reject(errResponse);
			});
		},
		createUser : function(user) {
			return $http.post('/users',user).then(function(response) {
				return response;
			}, function(errResponse) {
				console.log(errResponse);
 				return $q.reject(errResponse);
			});
 /*			return $http({
			        url: 'user',
			        method: "POST",
			        data: { 'compnay' : user.company,'name':user.name }
			    }).then(function(response) {
					return response;
				}, function(errResponse) {
					console.log(errResponse);
	 				return $q.reject(errResponse);
				});*/
		},
		updateUser : function(user){
 	console.log(user);
 // 	/user._links.self.href
 	return $http.put('/users',user).then(function(response) {
		return response;
	}, function(errResponse) {
		console.log(errResponse);
 		return $q.reject(errResponse);
	});
		},
		deleteUser : function(user){
			
 		 	return $http.delete(user._links.self.href).then(function(response) {
				return response;
			}, function(errResponse) {
				console.log(errResponse);
		 		return $q.reject(errResponse);
			});
				},
				getRoles: function(){
					return $http.get('api/roles?projection=rolename').then(function(response) {
						return response;
					}, function(errResponse) {
						console.log(errResponse);
						console.error('Error while fetching roles');
						return $q.reject(errResponse);
					});

				}
		
	};

} ]);
