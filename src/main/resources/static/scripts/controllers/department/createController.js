myApp.controller('DepartmentCreateController', ['$uibModalInstance','$scope','departmentService', function($uibModalInstance, $scope, departmentService) {
	$scope.department = {id:null, name : '', type: '', branch: '', createdAt : '',updatedAt : ''}
	$scope.createMode =true;
	$scope.editMode =false;
 	$scope.branchList=[];
	$scope.newBranch ='';
 	$scope.onCancel = function() {
		$uibModalInstance.dismiss('cancel');
	},
	$scope.save = function(){
		var result = $scope.branchList.filter(function(obj) {
			return obj.id == $scope.newBranch;
		});
		$scope.department.branch = {};
		$scope.department.branch.id = result[0].id;
		$scope.department.branch.name = result[0].name;
		 departmentService.createDepartment($scope.department).then(createSuccess, errorCrerate);
		function createSuccess(response) {
			$uibModalInstance.close({
				messageSuccess : 'New record created successfuly'
			});
		}
		function errorCrerate(error) {
			$uibModalInstance.close({
				messageFail : 'Fail to create new record. Please check the log'
			});
		}
 	},
 	$scope.getBranches = function(){
		departmentService.getBranches().then(successCallback, errorCallback);
		function successCallback(response) {
			$scope.branchList = response.data._embedded.branches;
			$scope.newBranch =$scope.branchList[0].id.toString();
		}
		function errorCallback(error) {
			$uibModalInstance.close({messageFail: 'Fail to fetch branch Details. Please check the log'});
			$log.error('Fail to fetch branch Details.');
		}
	},
 
	$scope.getBranches();

 
}]);
