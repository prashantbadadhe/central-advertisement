'use strict';

myApp.factory('dashboardService', [ '$http', '$q', function($http, $q) {
	return {
		getDashboard : function(credentials, callback) {

			return $http.get('dashboard').then(function(response) {
				return response;
			}, function(errResponse) {
				console.log(errResponse);
				console.error('Error while fetching countrys');
				return $q.reject(errResponse);
			});

		}/*,
		getCompanyDetails : function(credentials, callback) {

			return $http.get('api/companies').then(function(response) {
				return response;
			}, function(errResponse) {
				console.log(errResponse);
				console.error('Error while fetching countrys');
				return $q.reject(errResponse);
			});

		}*/,
		getBranchDetails : function(credentials, callback) {

			return $http.get('api/branches').then(function(response) {
				return response;
			}, function(errResponse) {
				console.log(errResponse);
				console.error('Error while fetching countrys');
				return $q.reject(errResponse);
			});

		},
		getDepartmentDetails : function(credentials, callback) {

			return $http.get('api/departments').then(function(response) {
				return response;
			}, function(errResponse) {
				console.log(errResponse);
				console.error('Error while fetching departements');
				return $q.reject(errResponse);
			});

		}/*,
		getRoleDetails : function(credentials, callback) {

			return $http.get('api/roles').then(function(response) {
				return response;
			}, function(errResponse) {
				console.log(errResponse);
				console.error('Error while fetching Roles');
				return $q.reject(errResponse);
			});

		},
		getProjectDetails : function(credentials, callback) {

			return $http.get('api/projects').then(function(response) {
				return response;
			}, function(errResponse) {
				console.log(errResponse);
				console.error('Error while fetching Projects');
				return $q.reject(errResponse);
			});

		},
		
		getAgreementDetails : function(credentials, callback) {

			return $http.get('api/agreements').then(function(response) {
				return response;
			}, function(errResponse) {
				console.log(errResponse);
				console.error('Error while fetching Projects');
				return $q.reject(errResponse);
			});

		},
		
		getCustomerDetails : function(credentials, callback) {

			return $http.get('api/customers').then(function(response) {
				return response;
			}, function(errResponse) {
				console.log(errResponse);
				console.error('Error while fetching customers');
				return $q.reject(errResponse);
			});

		},
		
		getEmployeeDetails : function(credentials, callback) {

			return $http.get('api/employees	').then(function(response) {
				return response;
			}, function(errResponse) {
				console.log(errResponse);
				console.error('Error while fetching customers');
				return $q.reject(errResponse);
			});

		},
		
		getElevatorDetails : function(credentials, callback) {

			return $http.get('api/elevators').then(function(response) {
				return response;
			}, function(errResponse) {
				console.log(errResponse);
				console.error('Error while fetching Projects');
				return $q.reject(errResponse);
			});

		},
		
		getElevatorMtncDetails : function(credentials, callback) {

			return $http.get('api/elevatorMaintenances').then(function(response) {
				return response;
			}, function(errResponse) {
				console.log(errResponse);
				console.error('Error while fetching Projects');
				return $q.reject(errResponse);
			});

		},
		getProductDetails : function(credentials, callback) {

			return $http.get('api/productDetails').then(function(response) {
				return response;
			}, function(errResponse) {
				console.log(errResponse);
				console.error('Error while fetching Product details');
				return $q.reject(errResponse);
			});

		},
		getAllUsers : function(credentials, callback) {

			return $http.get('api/users').then(function(response) {
				return response;
			}, function(errResponse) {
				console.log(errResponse);
				console.error('Error while fetching Projects');
				return $q.reject(errResponse);
			});

		},
		
		getAllJobs : function(credentials, callback) {

			return $http.get('futureJobs').then(function(response) {
			 
				return response;
			}, function(errResponse) {
				console.log(errResponse);
				console.error('Error while fetching nextJob');
				return $q.reject(errResponse);
			});
		}*/
	};

} ]);
