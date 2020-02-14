'use strict';

myApp.factory('companyService', [ '$http', '$q', function($http, $q) {
	return {
		getCompanies : function() {

			return $http.get('api/companies').then(function(response) {
			 
				return response;
			}, function(errResponse) {
				console.log(errResponse);
				console.error('Error while fetching company');
				return $q.reject(errResponse);
			});

		},
		createCompany : function(company) {
			return $http.post('api/companies',company).then(function(response) {
				return response;
			}, function(errResponse) {
				console.log(errResponse);
 				return $q.reject(errResponse);
			});

		},
		updateCompany : function(company){
 	console.log(company);
 	return $http.put(company._links.self.href,company).then(function(response) {
		return response;
	}, function(errResponse) {
		console.log(errResponse);
 		return $q.reject(errResponse);
	});
		},
		deleteCompnay : function(company){
			
 		 	return $http.delete(company._links.self.href).then(function(response) {
				return response;
			}, function(errResponse) {
				console.log(errResponse);
		 		return $q.reject(errResponse);
			});
				}
		
	};

} ]);
