myApp.controller('HomeController', ['$rootScope','$scope', '$http', '$timeout', '$interval', 'uiGridConstants', 'uiGridGroupingConstants','$location',
		function($rootScope,$scope, $http, $timeout, $interval, uiGridConstants, uiGridGroupingConstants,$location) {
			console.log($rootScope);
			if(!$rootScope.authenticated){
				$http.get('/login').then(successCallback, errorCallback);
				window.location = '/#!/';
			//	 $location.path("/");
				//call login method
			}
	$http.get('/home').then(successCallback, errorCallback);
	

	function successCallback(data) {
		$http.get('api/categories').then(successCallback, errorCallback);

		function successCallback(response) {
			 $scope.myData = response.data._embedded.categories;
		}
		function errorCallback(error) {
			// error code
		}
	}
	function errorCallback(error) {
		// error code
	}

			/*function successCallback(data) {
				$scope.greeting = data;
			}
			function errorCallback(error) {
				// error code
			}

			var paginationOptions = {
				sort : null
			};

			$scope.gridOptions = {
				paginationPageSizes : [ 25, 50, 75 ],
				paginationPageSize : 5,
				useExternalPagination : true,
				useExternalSorting : true,
				enableGridMenu : true,
				columnDefs : [ {
					name : 'id'
				}, {
					name : 'categoryName',
					enableSorting : false
				} ],

				exporterAllDataFn : function() {
					return getPage(1, $scope.gridOptions.totalItems, paginationOptions.sort).then(function() {
						$scope.gridOptions.useExternalPagination = false;
						$scope.gridOptions.useExternalSorting = false;
						getPage = null;
					});
				},

				onRegisterApi : function(gridApi) {
					$scope.gridApi = gridApi;
					$scope.gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
						if (getPage) {
							if (sortColumns.length > 0) {
								paginationOptions.sort = sortColumns[0].sort.direction;
							} else {
								paginationOptions.sort = null;
							}
							getPage(grid.options.paginationCurrentPage, grid.options.paginationPageSize, paginationOptions.sort)
						}
					});
					gridApi.pagination.on.paginationChanged($scope, function(newPage, pageSize) {
						if (getPage) {
							getPage(newPage, pageSize, paginationOptions.sort);
						}
					});
				}
			};

			var getPage = function(curPage, pageSize, sort) {
				var url = 'api/categories';
					var _scope = $scope;

				$http.get(url).then(successCallback, errorCallback);

				function successCallback(response) {
					var firstRow = (curPage - 1) * pageSize;
					$scope.gridOptions.totalItems = response.data._embedded.categories.length	;
					$scope.gridOptions.data = response.data._embedded.categories.slice(firstRow,firstRow+pageSize);
				}
				function errorCallback(error) {
					// error code
				}
			};

			getPage(1, $scope.gridOptions.paginationPageSize);*/

		} ]);