myApp.controller('LandingController', [ '$scope', '$http', 'uiGridConstants',   function ($scope, $http,uiGridConstants) {
	
	 var paginationOptions = {
		      sort: null
		    };
		 
	 $scope.gridOptions = {
		      paginationPageSizes: [25, 50, 75],
		      paginationPageSize: 25,
		      useExternalPagination: true,
		      useExternalSorting: true,
		      enableGridMenu: true,
		      columnDefs: [
		        { name: 'name' },
		        { name: 'gender', enableSorting: false },
		        { name: 'company', enableSorting: false }
		      ],
	
		      exporterAllDataFn: function() {
		          return getPage(1, $scope.gridOptions.totalItems, paginationOptions.sort)
		          .then(function() {
		            $scope.gridOptions.useExternalPagination = false;
		            $scope.gridOptions.useExternalSorting = false;
		            getPage = null;
		          });
		        },
		        
		        onRegisterApi: function(gridApi) {
		            $scope.gridApi = gridApi;
		            $scope.gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
		              if(getPage) {
		                if (sortColumns.length > 0) {
		                  paginationOptions.sort = sortColumns[0].sort.direction;
		                } else {
		                  paginationOptions.sort = null;
		                }
		                getPage(grid.options.paginationCurrentPage, grid.options.paginationPageSize, paginationOptions.sort)
		              }
		            });
		            gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
		              if(getPage) {
		                getPage(newPage, pageSize, paginationOptions.sort);
		              }
		            });
		          }
		        };
	 
	 var getPage = function(curPage, pageSize, sort) {
	      var url   = 'api/suppliers';
	   /*   switch(sort) {
	        case uiGridConstants.ASC:
	          url = '/data/100_ASC.json';
	          break;
	        case uiGridConstants.DESC:
	          url = '/data/100_DESC.json';
	          break;
	        default:
	          url = '/data/100.json';
	          break;
	      }*/
	      
	      var _scope = $scope;
	      
	      $http.get('api/suppliers').then(successCallback, errorCallback);

	      function successCallback(response){
	    	   var firstRow = (curPage - 1) * pageSize;
		        $scope.gridOptions.totalItems = 100;
		        $scope.gridOptions.data = response;///.slice(firstRow, firstRow + pageSize)
	      }
	      function errorCallback(error){
	          //error code
	      }
	/*      return $http.get(url)
	      .success(function (data) {
	        var firstRow = (curPage - 1) * pageSize;
	        $scope.gridOptions.totalItems = 100;
	        $scope.gridOptions.data = data.slice(firstRow, firstRow + pageSize)
	      });*/
	    };
	 
	    getPage(1, $scope.gridOptions.paginationPageSize);
	  }
	]);
	
 