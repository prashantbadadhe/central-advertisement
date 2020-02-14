myApp
		.controller(
				'UserController',
				[
						'$scope',
						'$http',
						'$uibModal',
						'userService',
						'$filter',
						'$interval',
						'$timeout',
						'uiGridConstants',
						function($scope, $http, $uibModal, userService, $filter, $interval, $timeout, uiGridConstants) {
							var self = this;
							self.user = {
								id : null,
								username : '',
								password : '',
								email : '',
//								
//								lastName : '',
//								addressLine2 : '',
//								addressLine2 : '',
//								country : '',
//								state : '',
//								city : '',
//								zipcode : '',
//								lattitude : '',
//								longitude : '',
//								phone1 : '',
//								phone2 : '',
//								email1 : '',
//								email2 : '',
//								
								role : ''
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
							$scope.pageName = 'User';
							$scope.pageUrl = 'user';
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
											displayName : 'Sr. No.',
											width : 80,
											enableFiltering : false,
											cellClass : 'noborder',
											cellTooltip : 'Select to delete and dubble click to edit'

										},
										{
											field : 'username',
											displayName : 'User Name',
											cellClass : 'noborder',
											cellTooltip : 'Select to delete and dubble click to edit'

										},
										{
											field : 'email',
											displayName : 'Email',
											cellClass : 'noborder',
											cellTooltip : 'Select to delete and dubble click to edit'

										},
										
//										{
//											field : 'firstName',
//											displayName : 'First Name',
//											cellClass : 'noborder',
//											cellTooltip : 'Select to delete and dubble click to edit'
//
//										},
//										{
//											field : 'lastName',
//											displayName : 'Last Name',
//											cellClass : 'noborder',
//											cellTooltip : 'Select to delete and dubble click to edit'
//
//										},
//										{
//											field : 'addressLine1',
//											enableCellEdit : true,
//											displayName : 'Address',
//											cellClass : 'noborder',
//											cellTemplate : '<span>{{row.entity.addressLine1}}<span ng-if = "row.entity.addressLine2.length!=0">, </span> {{row.entity.addressLine2}} <span ng-if = "row.entity.city.length!=0">, City:</span> {{row.entity.city}}<span ng-if = "row.entity.state.length!=0">, State:</span>{{row.entity.state}}<span ng-if = "row.entity.country.length!=0">, Country:</span>{{row.entity.country}}<span ng-if = "row.entity.zipcode.length!=0">, zipcode:</span> {{row.entity.zipcode}}</span>',
//											cellTooltip : 'Select to delete and dubble click to edit'
//										}, {
//											field : 'phone1',
//											displayName : ' Phones',
//											cellClass : 'noborder',
//											cellTemplate : '<span>{{row.entity.phone1}} <span ng-if = "row.entity.phone2.length!=0"> / </span>{{row.entity.phone2}}</span>',
//											cellTooltip : 'Select to delete and dubble click to edit'
//
//										}, {
//											field : 'email1',
//											displayName : ' Emails',
//											cellClass : 'noborder',
//											cellTemplate : '<span>{{row.entity.email1}}<span ng-if = "row.entity.email2.length!=0"> / </span> {{row.entity.email2}}</span>',
//											cellTooltip : 'Select to delete and dubble click to edit'
//
//										},
										{
											field : 'role.name',
											displayName : 'Role Name',
											cellClass : 'noborder',
											cellTooltip : 'Select to delete and dubble click to edit'

										} ]

							};
							self.deleteSelected = function() {
								angular.forEach(self.gridApi.selection.getSelectedRows(), function(data, index) {
									self.gridOptions.data.splice(self.gridOptions.data.lastIndexOf(data), 1);

									userService.deleteUser(data).then(successCallback, errorCallback);
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
								rowDetails.entity.password = "";
								var modalInstance = $uibModal.open({
									templateUrl : '../partials/userInputs.html',
									controller : 'UserEditController',
									resolve : {
										items : function() {
											return rowDetails.entity;
										}
									}
								});
								modalInstance.result.then(function(returnedInput) {
									if (returnedInput.messageSuccess) {
										self.enableDeleteButton = 0;
										self.getUser();
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
									templateUrl : '../partials/userInputs.html',
									controller : 'UserCreateController'

								});
								modalInstance.result.then(function(returnedInput) {
									self.getUser();
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

							self.getUser = function() {
								if (self.responeData.length > 0) {
									self.responeData.length = [];
								}
								userService.getUsers().then(successCallback, errorCallback);
								function successCallback(response) {
									self.pushGridData(response.data._embedded.users)
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
							}, self.getUser();
							self.refreshData = function() {
								self.gridOptions.data = $filter('filter')(self.responeData, self.searchText, undefined);
							};

							setSidebarMenuSelection("user");
						} ]);