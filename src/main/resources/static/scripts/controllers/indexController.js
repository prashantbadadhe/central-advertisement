myApp
		.controller(
				'IndexController',
				[
						'$rootScope',
						'$scope',
						'$http',
						'$location',
						'indexService',
						'$sce',
						function($rootScope, $scope, $http, $location,
								indexService, $sce) {

							$scope.menu = '';
							$scope.count = 0;
							$scope.userDetails = {};
							$scope.nextWeekJob = '';
							$scope.projectNames = {};
							$scope.projectName = '';

									$scope.logout = function() {
										$rootScope.logoutClicked = true;
										$http.get('logout').then(
												successCallback, errorCallback);
										function successCallback(data) {
											$rootScope.authenticated = true;
											window.location.href = "/loginpage.html";
										}
										function errorCallback(error) {
											$rootScope.authenticated = false;
											window.location.href = "/loginpage.html";
											console.log("Some erorr occure"
													+ error);
										}
									},
									$scope.renderHtml = function() {

										if ($scope.count < 1) {
											$scope.count = $scope.count + 1;
											indexService.getMenuDetails().then(
													successCallback,
													errorCallback);

											function successCallback(response) {
												$scope.count = $scope.count + 1;
												$scope.userDetails.firstName = response.firstName;
												$scope.userDetails.userId = response.userId;
												$scope.userDetails.userName = response.userName;
												$scope.userDetails.firstName = response.firstName;
												$scope.userDetails.lastName = response.lastName;
												$scope.userDetails.email = response.email;
												$scope.userDetails.roleId = response.roleId;
												$scope.userDetails.roleName = response.roleName;
												$scope.userDetails.isEmployee = response.isEmployee;
												return $scope.userDetails;
											}
											function errorCallback(error) {
												$scope.count = $scope.count + 1;
												$uibModalInstance
														.close({
															messageFail : 'Fail to fetch company Details. Please check the log'
														});
												$log
														.error('Fail to fetch company Details.');
											}
										}
									}
							$scope.menuObject = [ {
								"liclass" : "dashboard",
								"ngshow" : "authenticated",
								"nghref" : "#!/dashboard",
								"iclass" : "icon-home",
								"spanclass" : "title",
								"screenName" : "Dashboard",
								"selectclass" : "selected",
								"role" : "admin",
								"role1" : "user"
							}, {
								"liclass" : "branch",
								"ngshow" : "authenticated",
								"nghref" : "#!/branch",
								"iclass" : "glyphicon glyphicon-leaf",
								"spanclass" : "title",
								"screenName" : "Branches",
								"selectclass" : "selected",
								"role" : "admin",
								"role1" : "user"
							}, {
								"liclass" : "fileupload",
								"ngshow" : "authenticated",
								"nghref" : "#!/fileupload",
								"iclass" : "glyphicon glyphicon-screenshot",
								"spanclass" : "title",
								"screenName" : "File Upload",
								"selectclass" : "selected",
								"role" : "admin",
								"role1" : "user"
							}, {
								"liclass" : "branchcode",
								"ngshow" : "authenticated",
								"nghref" : "#!/branchcode",
								"iclass" : "glyphicon glyphicon-lock",
								"spanclass" : "title",
								"screenName" : "Get Branch Code",
								"selectclass" : "selected",
								"role" : "admin"
							},,{
								"liclass":"user",
								"ngshow":"authenticated",
								"nghref":"#!/user",
								"iclass":"glyphicon glyphicon-user",
								"spanclass":"title",
								"screenName" : "Users",
								"selectclass":"selected" ,
								"role":"admin"
							},{
								"liclass":"role",
								"ngshow":"authenticated",
								"nghref":"#!/role",
								"iclass":"glyphicon glyphicon-grain",
								"spanclass":"title",
								"screenName" : "Roles",
								"selectclass":"selected" ,
								"role":"admin"
							},{
								"liclass" : "aboutUs",
								"ngshow" : "authenticated",
								"nghref" : "#!/aboutUs",
								"iclass" : "icon-users",
								"spanclass" : "title",
								"screenName" : "About Us",
								"selectclass" : "selected",
								"role" : "admin",
								"role1" : "user"
							} ];
							$scope.topMenuAdmin = [  {
								"liclass" : "branchcode",
								"ngshow" : "authenticated",
								"nghref" : "#!/branchcode",
								"iclass" : "glyphicon glyphicon-lock",
								"spanclass" : "title",
								"screenName" : "Get Branch Code",
								"selectclass" : "selected",
								"role" : "admin"
							},{
								"liclass":"user",
								"ngshow":"authenticated",
								"nghref":"#!/user",
								"iclass":"glyphicon glyphicon-user",
								"spanclass":"title",
								"screenName" : "Users",
								"selectclass":"selected" ,
								"role":"admin"
							},{
								"liclass":"role",
								"ngshow":"authenticated",
								"nghref":"#!/role",
								"iclass":"glyphicon glyphicon-grain",
								"spanclass":"title",
								"screenName" : "Roles",
								"selectclass":"selected" ,
								"role":"admin"
							}];
						} ]);