'use strict';

myApp.factory('branchCodeService', ['$http', '$q', function ($http, $q) {
	return {
		getBranches: function () {
			return $http.get('/api/branches?projection=branchview').then(function (response) {
				return response;
			}, function (errResponse) {
				console.log(errResponse);
				console.error('Error while fetching branch');
				return $q.reject(errResponse);
			});
		},
		
		updateActivationCode: function (branch){
		 	return $http.put('branch/updateActivationCode',branch).then(function(response) {
				return response;
			}, function(errResponse) {
				console.log(errResponse);
				console.error('Error while updating branch code');
		 		return $q.reject(errResponse);
			});
		}
	};
}]);