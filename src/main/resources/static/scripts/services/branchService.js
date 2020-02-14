'use strict';

myApp.factory('branchService', [ '$http', '$q', function($http, $q) {
	return {
		getBranches  : function() {
			return $http.get('/api/branches?projection=branchview').then(function(response) {
				return response;
			}, function(errResponse) {
				console.log(errResponse);
				console.error('Error while fetching branch');
				return $q.reject(errResponse);
			});
		},
		createBranch : function(branch) {
			return $http.post('branch',branch).then(function(response) {
				return response;
			}, function(errResponse) {
				console.log(errResponse);
 				return $q.reject(errResponse);
			});
 /*			return $http({
			        url: 'branch',
			        method: "POST",
			        data: { 'compnay' : branch.company,'name':branch.name }
			    }).then(function(response) {
					return response;
				}, function(errResponse) {
					console.log(errResponse);
	 				return $q.reject(errResponse);
				});*/
		},
		updateBranch : function(branch){
 	console.log(branch);
 // 	/branch._links.self.href
 	return $http.put('branch',branch).then(function(response) {
		return response;
	}, function(errResponse) {
		console.log(errResponse);
 		return $q.reject(errResponse);
	});
		},
		deleteBranch : function(branch){
			
 		 	return $http.delete(branch._links.self.href).then(function(response) {
				return response;
			}, function(errResponse) {
				console.log(errResponse);
		 		return $q.reject(errResponse);
			});
				},
				getCompanies: function(){
					return $http.get('api/companies?projection=companyname').then(function(response) {
						return response;
					}, function(errResponse) {
						console.log(errResponse);
						console.error('Error while fetching company');
						return $q.reject(errResponse);
					});

				}
		
	};

} ]);
