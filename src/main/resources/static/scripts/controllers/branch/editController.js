myApp
		.controller(
				'BranchEditController',
				[
						'$uibModalInstance',
						'$scope',
						'items',
						'branchService',
						'$log',
						function($uibModalInstance, $scope, items,
								branchService, $log) {
							$scope.branch = {
								id : null,
								name : '',
								addressLine2 : '',
								addressLine2 : '',
								country : '',
								state : '',
								city : '',
								zipcode : '',
								phone1 : '',
								email1 : '',
								company : ''
							}
							$scope.branch = items;
							$scope.editMode = true;
							$scope.createMode = false;
							$scope.companyList = [];
							$scope.newCompany = '';
							$scope.onCancel = function() {
								$uibModalInstance.dismiss('cancel');
							};

									$scope.getCompanies = function() {
										branchService.getCompanies().then(
												successCallback, errorCallback);
										function successCallback(response) {
											$scope.companyList = response.data._embedded.companies;
											if ($scope.branch.company != undefined) {
												$scope.newCompany = $scope.branch.company.id
														.toString();

											}
										}
										function errorCallback(error) {
											$uibModalInstance
													.close({
														messageFail : 'Fail to fetch company Details. Please check the log'
													});
											$log
													.error('Fail to fetch company Details.');
										}
									},
									$scope.save = function() {
										console.log($scope.newCompany);
										var result = $scope.companyList
												.filter(function(obj) {
													return obj.id == $scope.newCompany;
												});
										$scope.branch.company = result[0];
										delete $scope.branch.company._links;
										delete $scope.branch._links;
										delete $scope.branch.registered;
										delete $scope.branch.slno;
										branchService.updateBranch(
												$scope.branch).then(
												updateSuccess, errorUpdate);
										function updateSuccess(response) {
											$uibModalInstance
													.close({
														messageSuccess : 'Record updated successfuly'
													});
										}
										function errorUpdate(error) {
											$uibModalInstance
													.close({
														messageFail : 'Fail to update. Please check the log'
													});
											$log.error('Fail to update')
										}
									}, $scope.getCompanies();
						} ]);
