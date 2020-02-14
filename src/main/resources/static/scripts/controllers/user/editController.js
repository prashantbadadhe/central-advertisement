myApp.controller('UserEditController', ['$uibModalInstance','$scope','items','userService','$log', function($uibModalInstance, $scope, items,userService,$log) {
	$scope.user = {id : null,	username : '', password : '', firstName : '', lastName : '', addressLine2 : '',addressLine2 : '',country : '',	state : '',city : '',zipcode : '',	lattitude : '',longitude : '',phone1 : '',phone2 : '',	email1 : '',email2 : '', role:''}
	$scope.user  = items;
	$scope.editMode = true;
	$scope.createMode = false;
	$scope.roleList=[];
	$scope.newRole ='';
 	$scope.onCancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
 
	$scope.getRoles = function(){
		userService.getRoles().then(successCallback, errorCallback);
		function successCallback(response) {
			$scope.roleList = response.data._embedded.roles;
			if($scope.user.role!=undefined){
				$scope.newRole =$scope.user.role.id.toString();

			}
		}
		function errorCallback(error) {
			$uibModalInstance.close({messageFail: 'Fail to fetch role Details. Please check the log'});
			$log.error('Fail to fetch role Details.');
		}
	},
	$scope.save = function(){
		console.log($scope.newRole);
		var result = $scope.roleList.filter(function( obj ) {
			  return obj.id == $scope.newRole;
			});
		$scope.user.role =	result[0];
 		delete $scope.user.role._links;
		delete $scope.user._links;
		delete $scope.user.registered;
		delete $scope.user.slno;
		userService.updateUser($scope.user).then(updateSuccess, errorUpdate);
 		function updateSuccess(response) {
			$uibModalInstance.close({messageSuccess: 'Record updated successfuly'});
		}
		function errorUpdate(error) {
			$uibModalInstance.close({messageFail: 'Fail to update. Please check the log'});
			$log.error('Fail to update')
		}
	},
	$scope.getRoles();
}]);
