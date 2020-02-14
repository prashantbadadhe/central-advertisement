myApp.controller('RoleEditController', ['$uibModalInstance','$scope','items','roleService', function($uibModalInstance, $scope, items,roleService) {
 	$scope.role = {id : null,	name : '',	}
	$scope.role  = items;
	$scope.editMode = true;
	$scope.createMode = false;
	$scope.mandatoryFieldReq = false;
	$scope.onCancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
	$scope.changeMandatoryField = function(){
		$scope.mandatoryFieldReq = false;
	}
	$scope.save = function(){
		if($scope.role.name==undefined){
			$scope.mandatoryFieldReq = true;
 		}else{
			$scope.mandatoryFieldReq = false;
		roleService.updateRole($scope.role).then(updateSuccess, errorUpdate);
 		}
 		function updateSuccess(response) {
			$uibModalInstance.close({messageSuccess: 'Record updated successfuly'});
		}
		function errorUpdate(error) {
			$uibModalInstance.close({messageFail: 'Fail to update. Please check the log'});
		}
	}
}]);
