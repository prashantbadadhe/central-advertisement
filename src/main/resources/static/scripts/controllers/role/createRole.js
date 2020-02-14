myApp.controller('RoleCreateController', ['$uibModalInstance','$scope','roleService', function($uibModalInstance, $scope, roleService) {
	$scope.role = {id : null,	name : ''}
	$scope.createMode =true;
	$scope.editMode =false;
	$scope.mandatoryFieldReq = false;
 	$scope.onCancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
	$scope.changeMandatoryField = function(){
		$scope.mandatoryFieldReq = false;
	}
	$scope.save = function(){
		if($scope.role.name.trim().length==0){
			$scope.mandatoryFieldReq = true;
 		}else{
			$scope.mandatoryFieldReq = false;
 			roleService.createRole($scope.role).then(createSuccess, errorCrerate);
		}

		function createSuccess(response) {
			$uibModalInstance.close({messageSuccess: 'New record created successfuly'});
		}
		function errorCrerate(error) {
			$uibModalInstance.close({messageFail: 'Fail to create new record. Please check the log'});
		}
 	}

 
}]);
