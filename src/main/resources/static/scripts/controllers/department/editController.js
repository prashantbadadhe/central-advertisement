myApp.controller('DepartmentEditController', ['$uibModalInstance','$scope','items','departmentService','$log', function($uibModalInstance, $scope, items,departmentService,$log,FileUploader) {
	$scope.department = {name : '',	type : '',branch : '',	createdAt : '',updatedAt : ''	}
	$scope.department  = items;
	$scope.editMode = true;
	$scope.createMode = false;
	$scope.branchList=[];
	$scope.newBranch ='';
 	$scope.onCancel = function() {
		$uibModalInstance.dismiss('cancel');
	};

	$scope.getBranches = function(){
		departmentService.getBranches().then(successCallback, errorCallback);
		function successCallback(response) {
			$scope.branchList = response.data._embedded.branches;
			if($scope.department.branch!=undefined){
				$scope.newBranch =$scope.department.branch.id.toString();

			}
		}
		function errorCallback(error) {
			$uibModalInstance.close({messageFail: 'Fail to fetch branch Details. Please check the log'});
			$log.error('Fail to fetch branch Details.');
		}
	},
	$scope.save = function(){
		console.log($scope.newBranch);
		var result = $scope.branchList.filter(function( obj ) {
			  return obj.id == $scope.newBranch;
			});
		$scope.department.branch =	result[0];
 		delete $scope.department.branch._links;
		delete $scope.department._links;
		delete $scope.department.registered;
		delete $scope.department.slno;
		departmentService.updateDepartment($scope.department).then(updateSuccess, errorUpdate);
 		function updateSuccess(response) {
			$uibModalInstance.close({messageSuccess: 'Record updated successfuly'});
		}
		function errorUpdate(error) {
			$uibModalInstance.close({messageFail: 'Fail to update. Please check the log'});
			$log.error('Fail to update')
		}
	},
	$scope.getBranches();
}]);
