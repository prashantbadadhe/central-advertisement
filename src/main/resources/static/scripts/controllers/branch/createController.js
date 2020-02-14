myApp
		.controller(
				'BranchCreateController',
				[
						'$uibModalInstance',
						'$scope',
						'branchService',
						function($uibModalInstance, $scope, branchService) {
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
								company : '',
								status : ''
							}
							$scope.createMode = true;
							$scope.editMode = false;
							$scope.companyList = [];
							$scope.newCompany = '';
									$scope.onCancel = function() {
										$uibModalInstance.dismiss('cancel');
									},
									$scope.save = function() {
										var result = $scope.companyList
												.filter(function(obj) {
													return obj.id == $scope.newCompany;
												});
										$scope.branch.company = {};
										$scope.branch.company.id = result[0].id;
										$scope.branch.company.name = result[0].name;
										branchService.createBranch(
												$scope.branch).then(
												createSuccess, errorCrerate);
										function createSuccess(response) {
											$uibModalInstance
													.close({
														messageSuccess : 'New record created successfuly'
													});
										}
										function errorCrerate(error) {
											$uibModalInstance
													.close({
														messageFail : 'Fail to create new record. Please check the log'
													});
										}
									},
									$scope.getCompanies = function() {
										branchService.getCompanies().then(
												successCallback, errorCallback);
										function successCallback(response) {
											$scope.companyList = response.data._embedded.companies;
											if ($scope.companyList[0] == undefined
													|| $scope.companyList[0] == null) {
												$scope.newCompany = ''
											} else {
												$scope.newCompany = $scope.companyList[0].id
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
									}, $scope.getCompanies();

						} ]);
