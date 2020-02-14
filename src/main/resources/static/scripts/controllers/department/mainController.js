myApp
		.controller(
				'DepartmentController',
				[
						'$scope',
						'$http',
						'$uibModal',
						'departmentService',
						'$filter',
						'$interval',
						'$timeout',
						'uiGridConstants',
						function($scope, $http, $uibModal, departmentService, $filter, $interval, $timeout, uiGridConstants) {
							var self = this;
							self.department = {
								name : '',
								type : '',
								branch : '',
								createdAt : '',
								updatedAt : ''
							}
							var gridApi;
							self.responeData = [];
							self.gridOptions = [];
							self.showSuccessAlert = false;
							self.messageSuccessText = '';
							$scope.messageFailText = '';
							self.showModal = false;
							$scope.alerts = [];
							self.enableDeleteButton = 0;
							$scope.pageName = 'Department';
							$scope.pageUrl = 'department';
							self.gridOptions = {
								data : self.responeData,
								enableHighlighting : true,
								enableRowHeaderSelection : false,
								enableSorting : true,
								exporterMenuCsv : false,
								enableGridMenu : true,
								paginationPageSizes : [ 25, 50, 75 ],
								paginationPageSize : 15,
								enableColumnResizing : true,
								enableRowSelection : true,
								appScopeProvider : {
									onDblClick : function(row) {
										self.openEditModal(row);
									}
								},

								rowTemplate : "../partials/uiGridTemplate.html",
								onRegisterApi : function(gridApi) {
									self.gridApi = gridApi;
									self.gridApi.core.handleWindowResize();
									gridApi.selection.on.rowSelectionChanged($scope, function(row) {
										if (row.isSelected) {
											self.enableDeleteButton = self.enableDeleteButton + 1;
										} else {
											self.enableDeleteButton = self.enableDeleteButton - 1;
										}

									});

									gridApi.selection.on.rowSelectionChangedBatch($scope, function(rows) {
										var msg = 'rows changed ' + rows.length;
										console.log(msg);
									});

								},

								columnDefs : [
										{
											name : 'slno',
											width : 50,
											enableFiltering : false,
											cellClass : 'noborder',
											cellTooltip : 'Select to delete and dubble click to edit'

										},
										{
											field : 'name',
											displayName : 'Department Name',
											cellClass : 'noborder',
											cellTooltip : 'Select to delete and dubble click to edit'

										},
										{
											
											field : 'type',
											displayName : 'Department Type',
											cellClass : 'noborder',
											cellTooltip : 'Select to delete and dubble click to edit'
										}, {
											
											field : 'branch.name',
											displayName : 'Branch Name',
											cellClass : 'noborder',
											cellTooltip : 'Select to delete and dubble click to edit'

										}, {
											field : 'createdAt',
											displayName : 'Created Date',
											cellClass : 'noborder',
											cellTooltip : 'Select to delete and dubble click to edit'

										},
										{
											field : 'updatedAt',
											displayName : 'Updated Date',
											cellClass : 'noborder',
											cellTooltip : 'Select to delete and dubble click to edit'

										} ]

							};
							self.deleteSelected = function() {
								angular.forEach(self.gridApi.selection.getSelectedRows(), function(data, index) {
									self.gridOptions.data.splice(self.gridOptions.data.lastIndexOf(data), 1);

									departmentService.deleteDepartment(data).then(successCallback, errorCallback);
								});
								function successCallback(response) {
									self.enableDeleteButton = 0;
									$scope.showSuccessAlert("Record deleted successfully");
								}
								function errorCallback(error) {
									$scope.showFailAlert("Fail to delete record"+error.data.message);
								}

							},

							self.openEditModal = function(rowDetails) {
								var modalInstance = $uibModal.open({
									templateUrl : '../partials/departmentInputs.html',
									controller : 'DepartmentEditController',
									resolve : {
										items : function() {
											return rowDetails.entity;
										}
									}
								});
								modalInstance.result.then(function(returnedInput) {
									if (returnedInput.messageSuccess) {
										self.enableDeleteButton = 0;
										self.getDepartment();
										$scope.showSuccessAlert(returnedInput.messageSuccess);
									} else {
										$scope.showFailAlert(returnedInput.messageFail);
									}

								}, function() {
									// dismissed with cancel button
								})
							},

							self.openCreateModal = function() {
								var modalInstance = $uibModal.open({
									templateUrl : '../partials/departmentInputs.html',
									controller : 'DepartmentCreateController'

								});
								modalInstance.result.then(function(returnedInput) {
									self.getDepartment();
									if (returnedInput.messageSuccess) {

										$scope.showSuccessAlert(returnedInput.messageSuccess);
									} else {
										$scope.showFailAlert(returnedInput.messageFail);
									}
								}, function() {
									// dismissed with cancel button
								})
							},

							$scope.showSuccessAlert = function(msg) {
								$scope.messageSuccessText = msg;
								$scope.alerts.push(msg);
								$timeout(function() {
									$scope.messageSuccessText = '';
									$scope.alerts.splice($scope.alerts.indexOf(alert), 1);
								}, 3000);

							}, $scope.showFailAlert = function(msg) {
								$scope.messageFailText = msg;
								$scope.alerts.push(msg);
								$timeout(function() {
									$scope.messageFailText = '';
									$scope.alerts.splice($scope.alerts.indexOf(alert), 1);
								}, 3000);

							},

							self.getDepartment = function() {
								if (self.responeData.length > 0) {
									self.responeData.length = [];
								}
								departmentService.getDepartments().then(successCallback, errorCallback);
								function successCallback(response) {
									self.pushGridData(response.data._embedded.departments)
								}
								function errorCallback(error) {
									console.log("Some erorr occure" + error);
								}
							}, self.pushGridData = function(response) {
								var i = 1;
								var data = response;
								data.forEach(function(row) {
									row.slno = i;
									i++;
									row.registered = new Date(row.registered)
									self.responeData.push(row);
								});
							}, self.getDepartment();
							self.refreshData = function() {
								self.gridOptions.data = $filter('filter')(self.responeData, self.searchText, undefined);
							};

							setSidebarMenuSelection("department");
						} ]);