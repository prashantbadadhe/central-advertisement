myApp.controller(
	'BranchCodeController',
	[
		'$rootScope',
		'$window',
		'branchCodeService',
		'$scope',
		'$timeout',
		function ($rootScope, $window, branchCodeService, $scope,$timeout) {
			setSidebarMenuSelection("branchcode");
			$rootScope.logoutClicked = false;
			$scope.uploadResult = "";
			$scope.pageName = 'Branch Code';
			$scope.pageUrl = 'branchcode';
			$scope.activationCode = "";
			$scope.branch = 1;
			$scope.branchList = [];
			$scope.branchDetails = {};
			$scope.msg = {};
			$scope.rowDataArray = [];
			$scope.rowData = {};
			$scope.duration = 1;
			$scope.applyToAll = false;
			$scope.messageSuccessText = '';
			$scope.messageFailText = '';
			$scope.alerts = [];

			$scope.getBranches = function () {
					branchCodeService.getBranches().then(successCallback, errorCallback);

					function successCallback(response) {
						$scope.branchList = response.data._embedded.branches;
						$scope.branch = "1";
						$scope.activationCode = response.data._embedded.branches[0].activateCode;
					}

					function errorCallback(error) {
						$log.error('Fail to generate branch activation code.');
					}
				},
				$scope.getActivationCode = function (branch) {
					for(i=0; i<$scope.branchList.length; i++){
						if($scope.branchList[i].id == branch){
							$scope.activationCode = $scope.branchList[i].activateCode;
						}
					}
					
				},
				
				$scope.updateActivationCd = function () {
					branchCodeService.updateActivationCode($scope.branch).then(successCallback, errorCallback);

					function successCallback(response) {
						for(i=0; i<$scope.branchList.length; i++){
							if($scope.branchList[i].id == response.data.id){
								$scope.branchList[i].activateCode = response.data.activateCode;
								$scope.activationCode = response.data.activateCode;
							}
						}
						$scope.showSuccessAlert("Branch code generated successfully");
						console.log("Branch code generated successfully");
					}

					function errorCallback(error) {
						console.log(error);
						$scope.showFailAlert("Fail to generate branch code. Please check the log");
						console.log("Branch code update Fail");
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
				
			$scope.getActivationCode();
			$scope.getBranches();
		}]);			
			