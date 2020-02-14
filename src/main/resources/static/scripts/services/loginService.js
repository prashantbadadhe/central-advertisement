'use strict';

myApp.factory('loginService', [ '$http', '$q', function($http, $q) {
	return {
		authenticate : function(credentials, callback) {
			var headers = credentials ? {
				authorization : "Basic " + btoa(credentials.username + ":" + credentials.password)
			} : {};

			return $http.get('users', {
				headers : headers
			}).then(function(response) {
				return response.data;
			},
			function(errResponse){
 				return $q.reject(errResponse);
			}
			);

		},
	registerNewUser : function(userDetails){
 		return $http.post('users', userDetails).then(function(response){
			return response;
		},
		function(errResponse){
			return $q.reject(errResponse);
		}
		);
}

	};

}
	
]);
