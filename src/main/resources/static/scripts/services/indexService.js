'use strict';

myApp.factory('indexService', [ '$http', '$q', function($http, $q) {
	return {
		getMenuDetails : function() {
			return $http.get('/menuList').then(function(response) {
				return response.data;
			}, function(errResponse) {
				console.log(errResponse);
				console.error('Error while fetching branch');
				return $q.reject(errResponse);
			});
		}/*,
		getNotifications:function(){
			return $http.get('notifications').then(function(response) {
				 
				return response;
			}, function(errResponse) {
				console.log(errResponse);
				console.error('Error while fetching nextJob');
				return $q.reject(errResponse);
			});
		}*/
	}
} ]);
