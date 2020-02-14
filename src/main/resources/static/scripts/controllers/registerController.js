myApp.controller('RegisterController',
    function ($scope, $http, $location) {
        var self = this;
		self.registration = {id : null,username : '',password : ''};
		self.passwordconfirmation='';
        $scope.register = function () {
        	if(self.passwordconfirmation!=self.registration.password){
        		  $location.path("/register");
        	}else{
            $http.post('users', self.registration).then(successCallback, errorCallback);
            function successCallback(data){
            	  $location.path("/dashboard");
  	      }
  	      function errorCallback(error){
  	    	  $scope.error = true;
  	      }
  		
        	}
        }
        $scope.items = [
                        'The first choice!',
                        'And another choice for you.',
                        'but wait! A third!'
                      ];

                      $scope.status = {
                        isopen: false
                      };

                      $scope.toggled = function(open) {
                        $log.log('Dropdown is now: ', open);
                      };

                      $scope.toggleDropdown = function($event) {
                        $event.preventDefault();
                        $event.stopPropagation();
                        $scope.status.isopen = !$scope.status.isopen;
                      };

                      $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));
});