'use strict';

myApp.factory('uploadFileService', ['$http', '$q', function ($http, $q) {
	return {
		uploadFiles: function (data) {
			var config = {
				transformRequest: angular.identity,
				transformResponse: angular.identity,
				headers: {
					'Content-Type': undefined
				}
			}
			return $http.post('/upload/mulitplefiles', data, config).then(function (response) {
				return response;
			}, function (errResponse) {
				console.log(errResponse);
				console.error('Error mulitplefiles upload');
				return $q.reject(errResponse);
			});
		},
		getBranches: function () {
			return $http.get('/api/branches?projection=branchview').then(function (response) {
				return response;
			}, function (errResponse) {
				console.log(errResponse);
				console.error('Error while fetching branch');
				return $q.reject(errResponse);
			});
		},
		getAllFiles: function (branch, filename) {
			if (branch != null || branch != undefined) {
				return $http.get('/load/getAllFiles/' + branch).then(function (response) {
					return response;
				}, function (errResponse) {
					console.log(errResponse);
					console.error('Error while fetching branch');
					return $q.reject(errResponse);
				});
			}
		},
		updateContent: function (contentDetails, updateAll) {
			var config = {
				transformRequest: angular.identity,
				transformResponse: angular.identity,
				headers: {
					'Content-Type': undefined
				}
			}
			var data = JSON.stringify(contentDetails);
			return $http.put('/update/contentDetails/' + updateAll, data, config).then(function (response) {
				return response;
			}, function (errResponse) {
				console.log(errResponse);
				return $q.reject(errResponse);
			});
		}
	};
}]);