myApp.controller('CompanyEditController', ['$uibModalInstance','$scope','items','companyService', function($uibModalInstance, $scope, items,companyService) {
 	$scope.company = {id : null,	name : '',	addressLine2 : '',addressLine2 : '',country : '',	state : '',city : '',zipcode : '',	lattitude : '',longitude : '',phone1 : '',phone2 : '',	email1 : '',email2 : ''	}
	$scope.company  = items;
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
		if($scope.company.name==undefined){
			$scope.mandatoryFieldReq = true;
 		}else{
			$scope.mandatoryFieldReq = false;
		companyService.updateCompany($scope.company).then(updateSuccess, errorUpdate);
 		}
 		function updateSuccess(response) {
			$uibModalInstance.close({messageSuccess: 'Record updated successfuly'});
		}
		function errorUpdate(error) {
			$uibModalInstance.close({messageFail: 'Fail to update. Please check the log'});
		}
	}
}]);
