myApp.controller('CompanyCreateController', ['$uibModalInstance','$scope','companyService', function($uibModalInstance, $scope, companyService) {
	$scope.company = {id : null,	name : '',	addressLine2 : '',addressLine2 : '',country : '',	state : '',city : '',zipcode : '',	lattitude : '',longitude : '',phone1 : '',phone2 : '',	email1 : '',email2 : ''	}
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
		if($scope.company.name.trim().length==0){
			$scope.mandatoryFieldReq = true;
 		}else{
			$scope.mandatoryFieldReq = false;
 			companyService.createCompany($scope.company).then(createSuccess, errorCrerate);
		}

		function createSuccess(response) {
			$uibModalInstance.close({messageSuccess: 'New record created successfuly'});
		}
		function errorCrerate(error) {
			$uibModalInstance.close({messageFail: 'Fail to create new record. Please check the log'});
		}
 	}

 
}]);
