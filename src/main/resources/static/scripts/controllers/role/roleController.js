myApp
		.controller(
				'RoleController',
				[
						'$scope',
						'$http',
						'$uibModal',
						'roleService',
						'$filter',
						'$interval',
						'$timeout',
						'uiGridConstants',
						'$log',
						function($scope, $http, $uibModal, roleService, $filter, $interval, $timeout, uiGridConstants, $log) {
							var self = this;
							self.role = {
								id : null,
								name : ''
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
							$scope.pageName = 'Role';
							$scope.pageUrl = 'role';
							self.gridOptions = {
								data : self.responeData,
								// enableSelectAll: true,
								enableHighlighting : true,
								enableRowHeaderSelection : false,
								// enableCellEdit : true,
								enableSorting : true,
								/* showGridFooter : true, */
								exporterMenuCsv : false,
								enableGridMenu : true,
								paginationPageSizes : [ 25, 50, 75 ],
								paginationPageSize : 15,
								enableColumnResizing : true,
								/* enableHorizontalScrollbar : 2, */
								enableRowSelection : true,
								/* enableRowHashing:true, */
								appScopeProvider : {
									onDblClick : function(row) {
										self.openEditModal(row);
									}
								},

								rowTemplate : "../partials/uiGridTemplate.html",
								onRegisterApi : function(gridApi) {
									self.gridApi = gridApi;
									self.gridApi.core.handleWindowResize();
									/*
									 * $interval( function() {
									 * self.gridApi.core.handleWindowResize(); },
									 * 50, 10);
									 */
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
											name : 'id',
											width : 50,
											enableFiltering : false,
											cellClass : 'noborder',
											cellTooltip : 'Select to delete and dubble click to edit'

										},
										{
											field : 'name',
											displayName : 'name',
											cellClass : 'noborder',
											cellTooltip : 'Select to delete and dubble click to edit'

										} ]

							};
							self.deleteSelected = function() {
								angular.forEach(self.gridApi.selection.getSelectedRows(), function(data, index) {
									self.gridOptions.data.splice(self.gridOptions.data.lastIndexOf(data), 1);

									roleService.deleteRole(data).then(successCallback, errorCallback);
								});
								function successCallback(response) {
									self.enableDeleteButton = 0;
									$scope.showSuccessAlert("Record deleted successfully");
									self.getRole();
								}
								function errorCallback(error) {
									if (error.data.message.search("could not execute statement") != -1) {
										$scope.showFailAlert("Fail to delete record : Either database is down or there is branch recored exists for this role. Please check log for more details.");
										$log.error("Fail to delete record : Either database is down or there is branch recored exists for this role : " + error.data.message);
									} else {
										$scope.showFailAlert("Fail to delete record : ");
										$log.error("Fail to delete record : " + error.data.message);
									}
									self.getRole();
								}

							},

							self.openEditModal = function(rowDetails) {
								var modalInstance = $uibModal.open({
									templateUrl : '../partials/roleInputs.html',
									controller : 'RoleEditController',
									resolve : {
										items : function() {
											// self.role = rowDetails.entity;
											return rowDetails.entity;
										}
									}
								});
								modalInstance.result.then(function(returnedInput) {
									if (returnedInput.messageSuccess) {
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
									templateUrl : '../partials/roleInputs.html',
									controller : 'RoleCreateController'

								});
								modalInstance.result.then(function(returnedInput) {
									self.getRole();
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
								}, 5000);

							}, $scope.showFailAlert = function(msg) {
								$scope.messageFailText = msg;
								$scope.alerts.push(msg);
								$timeout(function() {
									$scope.messageFailText = '';
									$scope.alerts.splice($scope.alerts.indexOf(alert), 1);
								}, 10000);

							},

							self.getRole = function() {
								if (self.responeData.length > 0) {
									self.responeData.length = [];
								}
								roleService.getRoles().then(successCallback, errorCallback);
								function successCallback(response) {
									self.pushGridData(response.data._embedded.roles)
								}
								function errorCallback(error) {
									console.log("Some erorr occure" + error);
								}
							}, self.pushGridData = function(response) {
								var i = 1;
								var data = response;
								data.forEach(function(row) {
									row.id = i;
									i++;
									row.registered = new Date(row.registered)
									self.responeData.push(row);
								});
							}, self.getRole();
							self.refreshData = function() {
								self.gridOptions.data = $filter('filter')(self.responeData, self.searchText, undefined);
							};

							setSidebarMenuSelection("role");
						} ]);