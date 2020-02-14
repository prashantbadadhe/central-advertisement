myApp.controller(
	'UploadFileController',
	[
		'$rootScope',
		'$window',
		'uploadFileService',
		'$scope',
		'$filter',
		'$timeout',
		function ($rootScope, $window, uploadFileService, $scope, $filter,$timeout) {
			setSidebarMenuSelection("fileupload");
			$rootScope.logoutClicked = false;
			$scope.uploadResult = "";
			$scope.pageName = 'File Upload';
			$scope.pageUrl = 'fileupload';
			$scope.description = "";
			$scope.files = [];
			$scope.branch = 1;
			$scope.showGrid = false;
			$scope.uploaded = false;
			$scope.startDate = '';
			$scope.endDate = '';
			$scope.gridOptions = {};
			$scope.msg = {};
			$scope.rowDataArray = [];
			$scope.rowData = {};
			$scope.duration = 1;
			$scope.applyToAll = false;
			$scope.messageSuccessText = '';
			$scope.messageFailText = '';
			$scope.alerts = [];
			
			$scope.gridOptions = {
				enableSorting: true,
				enableGridMenu: true,
				paginationPageSizes: [2, 3, 5],
				paginationPageSize: 5,
				enableColumnResizing: true,
				rowEditWaitInterval: -1,
				enableRowHashing: false,
				onRegisterApi: function (gridApi) {
					
					$scope.gridApi = gridApi;
					gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {
						if (newValue != oldValue) {
							$scope.rowData = {};
							$scope.rowData.id = rowEntity.id;

							$scope.rowData.column = colDef.name;
							$scope.rowData.contentName = rowEntity.contentName.substring(rowEntity.contentName.lastIndexOf("/") + 1);
							if ("contentStatus" === colDef.name) {
								if (newValue == 1) {
									$scope.rowData.data = true;
								} else {
									$scope.rowData.data = false;
								}
							} else {
								$scope.rowData.data = newValue;
							}
							if ("contentScheduleStart" === colDef.name || "contentScheduleEnd" === colDef.name) {
								$scope.rowData.data = $scope.foramtDate(newValue);
							}

							$scope.rowData.branch = $scope.branch;
							$scope.rowDataArray.push($scope.rowData);
							// $scope.$apply();
						}
					});
				},
				// Grid definition
			
				columnDefs: [
					{
						name: 'id', enableCellEdit: false, width: '10%'
					},
					{
						name: 'contentName', displayName: 'Image', enableCellEdit: false, width: '20%',
						cellTemplate:  '../partials/imageVideoTemplate.html'
					},
					{
						name: 'contentStatus', displayName: 'Status', editableCellTemplate: 'ui-grid/dropdownEditor', width: '10%', cellFilter: 'mapStatus',
						editDropdownValueLabel: 'status', editDropdownOptionsArray: [{
							id: 1, status: 'active'
						}, {
							id: 0, status: 'inactive'
						}]
					}, {
						name: 'contentScheduleStart', displayName: 'Start Date', type: 'date', cellFilter: 'date:"dd-MM-yyyy"', width: '15%'
					}, {
						name: 'contentScheduleEnd', displayName: 'End Date', type: 'date', cellFilter: 'date:"dd-MM-yyyy"', width: '15%'
					}, {
						name: 'duration', displayName: 'Duration', type: 'number', width: '15%'
					}, {
						name: 'contentOrder', displayName: 'Dispaly Order', type: 'number', width: '15%'
					}]
			};
			$scope.durationValues = [{
				id: 1, value: 1
			}, {
				id: 2, value: 2
			}, {
				id: 3, value: 4
			}, {
				id: 4, value: 6
			}, {
				id: 5, value: 8
			}, {
				id: 6, value: 10
			}, {
				id: 7, value: 15
			}, {
				id: 8, value: 20
			}, {
				id: 9, value: 30
			}, {
				id: 10, value: 60
			}];
			$scope.contentIsImage = function(sss){
				$scope.showImage=true;
			},
			$scope.saveState = function () {
 				uploadFileService.updateContent($scope.rowDataArray, $scope.applyToAll).then(successCallback, errorCallback);
				function successCallback(response) {
					$scope.showSuccessAlert("Succesfull updated records");
										$scope.getAllFiles($scope.branch);

				}

				function errorCallback(error) {
					console.log(error);
					$scope.showFailAlert("Fail to update records");

				}



			},
				$scope.showSuccessAlert = function (msg) {
					$scope.messageSuccessText = msg;
					$scope.alerts.push(msg);
					$timeout(function () {
						$scope.messageSuccessText = '';
						$scope.alerts.splice($scope.alerts.indexOf(alert), 1);
					}, 3000);

				},
				 $scope.showFailAlert = function (msg) {
					$scope.messageFailText = msg;
					$scope.alerts.push(msg);
					$timeout(function () {
						$scope.messageFailText = '';
						$scope.alerts.splice($scope.alerts.indexOf(alert), 1);
					}, 3000);

				}
			// Get all fiels
			$scope.updateCheckBoxValue = function () {
				$scope.applyToAll = !$scope.applyToAll;
			}
			$scope.getAllFiles = function (defaultBranch) {
				$scope.showGrid = false;
				if (defaultBranch === 1) {
					$scope.branch = 1;
				}
				uploadFileService.getAllFiles($scope.branch).then(successCallback, errorCallback);

				function successCallback(response) {
					var data = response.data;
					for (i = 0; i < data.length; i++) {
						data[i].contentScheduleStart = new Date(data[i].contentScheduleStart);
						data[i].contentScheduleEnd = new Date(data[i].contentScheduleEnd);
						data[i].contentStatus = data[i].contentStatus ? 1 : 0;
						data[i].showImage =  data[i].contentType.includes("image");
						data[i].showVideo =  data[i].contentType.includes("video");
						$scope.showGrid = true;
					}
					$scope.gridOptions.data = data;
					console.log("File Load successful");
				}
				function errorCallback(error) {
					console.log("File Load Fail");
				}
			}, $scope.getAllFiles(1)
			$scope.upload = function () {
				var data = new FormData();
				data.append("description", $scope.description);
				data.append("branch", $scope.branch);
				data.append("startDate", $scope.startDate);
				data.append("endDate", $scope.endDate);
				data.append("duration", $scope.duration);
				angular.forEach($scope.files, function (file) {
					data.append("files", file);
				});

				uploadFileService.uploadFiles(data).then(successCallback, errorCallback);

				function successCallback(response) {
					$scope.uploaded = true;
					$scope.getAllFiles($scope.branch);

					console.log("File uploaded successful");
					$scope.showSuccessAlert("Succesfull uploded records");
					$scope.files = "";
					$scope.description = "";
					$scope.startDate = "";
					 $scope.endDate = "";
					$scope.duration = "";
 				}

				function errorCallback(error) {
					console.log("File uploaded Fail");
				}
			},
			
				// Format Date
				$scope.foramtDate = function (date) {
					var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();

					if (month.length < 2)
						month = '0' + month;
					if (day.length < 2)
						day = '0' + day;

					return [year, month, day].join('-');
				}, $scope.getBranches = function () {
					uploadFileService.getBranches().then(successCallback, errorCallback);

					function successCallback(response) {
						$scope.branchList = response.data._embedded.branches;
						$scope.branchList.unshift({ "name": "All", "id": 0 })
					}

					function errorCallback(error) {
						$log.error('Fail to upload files.');
					}
				}

			$scope.getBranches();

		}]).filter('mapStatus', function () {
			var genderHash = {
				1: 'active', 0: 'inactive'
			};
			return function (input) {
				if (!input) {
					return 'inactive';
				} else {
					return genderHash[input];
				}
			};
		});