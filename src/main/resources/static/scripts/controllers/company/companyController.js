myApp
		.controller(
				'CompanyController',
				[
						'$scope',
						'$http',
						'$uibModal',
						'companyService',
						'$filter',
						'$interval',
						'$timeout',
						'uiGridConstants',
						'$log',
						function($scope, $http, $uibModal, companyService, $filter, $interval, $timeout, uiGridConstants, $log) {
							var self = this;
							self.company = {
								id : null,
								name : '',
								addressLine2 : '',
								addressLine2 : '',
								country : '',
								state : '',
								city : '',
								zipcode : '',
								lattitude : '',
								longitude : '',
								phone1 : '',
								phone2 : '',
								email1 : '',
								email2 : ''
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
							$scope.pageName = 'Company';
							$scope.pageUrl = 'company';
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

										},
										{
											field : 'addressLine1',
											enableCellEdit : true,
											displayName : 'Address',
											cellClass : 'noborder',
											cellTemplate : '<span>{{row.entity.addressLine1}}<span ng-if = "row.entity.addressLine2.length!=0">, </span> {{row.entity.addressLine2}} <span ng-if = "row.entity.city.length!=0">, City:</span> {{row.entity.city}}<span ng-if = "row.entity.state.length!=0">, State:</span>{{row.entity.state}}<span ng-if = "row.entity.country.length!=0">, Country:</span>{{row.entity.country}}<span ng-if = "row.entity.zipcode.length!=0">, zipcode:</span> {{row.entity.zipcode}}</span>',
											cellTooltip : 'Select to delete and dubble click to edit'
										}, {
											field : 'phone1',
											displayName : ' Phones',
											cellClass : 'noborder',
											cellTemplate : '<span>{{row.entity.phone1}} <span ng-if = "row.entity.phone2.length!=0"> / </span>{{row.entity.phone2}}</span>',
											cellTooltip : 'Select to delete and dubble click to edit'

										}, {
											field : 'email1',
											displayName : ' Emails',
											cellClass : 'noborder',
											cellTemplate : '<span>{{row.entity.email1}}<span ng-if = "row.entity.email2.length!=0"> / </span> {{row.entity.email2}}</span>',
											cellTooltip : 'Select to delete and dubble click to edit'

										} ]

							};
							self.deleteSelected = function() {
								angular.forEach(self.gridApi.selection.getSelectedRows(), function(data, index) {
									self.gridOptions.data.splice(self.gridOptions.data.lastIndexOf(data), 1);

									companyService.deleteCompnay(data).then(successCallback, errorCallback);
								});
								function successCallback(response) {
									self.enableDeleteButton = 0;
									$scope.showSuccessAlert("Record deleted successfully");
									self.getCompany();
								}
								function errorCallback(error) {
									if (error.data.message.search("could not execute statement") != -1) {
										$scope.showFailAlert("Fail to delete record : Either database is down or there is branch recored exists for this company. Please check log for more details.");
										$log.error("Fail to delete record : Either database is down or there is branch recored exists for this company : " + error.data.message);
									} else {
										$scope.showFailAlert("Fail to delete record : ");
										$log.error("Fail to delete record : " + error.data.message);
									}
									self.getCompany();
								}

							},

							self.openEditModal = function(rowDetails) {
								var modalInstance = $uibModal.open({
									templateUrl : '../partials/companyInputs.html',
									controller : 'CompanyEditController',
									resolve : {
										items : function() {
											// self.company = rowDetails.entity;
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
									templateUrl : '../partials/companyInputs.html',
									controller : 'CompanyCreateController'

								});
								modalInstance.result.then(function(returnedInput) {
									self.getCompany();
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

							self.getCompany = function() {
								if (self.responeData.length > 0) {
									self.responeData.length = [];
								}
								companyService.getCompanies().then(successCallback, errorCallback);
								function successCallback(response) {
									self.pushGridData(response.data._embedded.companies)
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
							}, self.getCompany();
							self.refreshData = function() {
								self.gridOptions.data = $filter('filter')(self.responeData, self.searchText, undefined);
							};
							setSidebarMenuSelection("company");

						} ]);