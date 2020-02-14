myApp.controller('UserCreateController', ['$uibModalInstance','$scope','userService', function($uibModalInstance, $scope, userService) {
	$scope.user = {id : null,	username : '', password : '', email : '', firstName : '', lastName : '', addressLine2 : '',addressLine2 : '',country : '',	state : '',city : '',zipcode : '',	lattitude : '',longitude : '',phone1 : '',phone2 : '',	email1 : '',email2 : '', role:''}
	$scope.createMode =true;
	$scope.editMode =false;
 	$scope.roleList=[];
	$scope.newRole ='';
 	$scope.onCancel = function() {
		$uibModalInstance.dismiss('cancel');
	},
	$scope.save = function(){
		var result = $scope.roleList.filter(function(obj) {
			return obj.id == $scope.newRole;
		});
		$scope.user.role = {};
		$scope.user.role.id = result[0].id;
		$scope.user.role.name = result[0].name;
		userService.createUser($scope.user).then(createSuccess, errorCrerate);
		function createSuccess(response) {
			
			if(response.status === 200){
				$uibModalInstance.close({
					messageSuccess : 'New record created successfuly'	
				});
			}else{
				$uibModalInstance.close({
					messageFail : 'Username already exists'
				});
			}
		}
		function errorCrerate(error) {
			$uibModalInstance.close({
				messageFail : 'Fail to create new record. Please check the log'
			});
		}
 	},
 	$scope.getRoles = function(){
		userService.getRoles().then(successCallback, errorCallback);
		function successCallback(response) {
			$scope.roleList = response.data._embedded.roles;
			$scope.newRole =$scope.roleList[0].id.toString();
		}
		function errorCallback(error) {
			$uibModalInstance.close({messageFail: 'Fail to fetch role Details. Please check the log'});
			$log.error('Fail to fetch role Details.');
		}
	},
	$scope.getRoles();

 
}]);
