myApp.controller('LoginController', [ '$rootScope', '$scope', '$http', '$location', '$window',  'loginService', 
		function($rootScope, $scope, $http, $location, $window, loginService) {
			var self = $scope;
			self.credentials = {};
			self.failToLogin='';
			self.attempt=false;
			self.hideshow ='hide';

			if ($rootScope.logoutClicked) {
				loginService.authenticate().then(successCallback, errorCallback);
			}

			self.login = function() {
				$rootScope.logoutClicked = false;
				loginService.authenticate(self.credentials).then(successCallback, errorCallback);
			};

			function successCallback(response) {
				if (response) {
					$window.location.href = $window.location.origin + "#!/dashboard";
					$rootScope.authenticated = true;
					$rootScope.xxx = "abhishekgautam";
					self.error = false;

				} else {
					$rootScope.authenticated = false;
					$location.path("/");
					$window.location.href = $window.location.origin;
					self.error = true;
				}
			}
			function errorCallback(error) {
				if(self.attempt){
					self.hideshow ='';
 					self.failToLogin ='Login Fail Please check your user name and password !';
					console.log("Some erorr occure" + error);
				}else{
					self.attempt= true;
				}

			}
			self.forgotPassword = function() {
				alert("This feature is not available yet. Please contant adming team! Thanks");
			}
 
		} ]);