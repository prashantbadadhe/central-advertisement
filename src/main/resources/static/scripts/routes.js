myApp
		.config(function($routeProvider, $httpProvider, $locationProvider) {
			$routeProvider.when(
					'/',
					{
						url : 'loginpage.html',

						redirectTo : function(obj, path, search) {
							if (window.location.hash === ""
									|| window.location.hash.length < 4) {
								window.location.href = "/loginpage.html";
							} else {
								$routeProvider.when('/dashboard', {
									templateUrl : '/dashboard',
									controller : 'DashboardController'
								})
							}
						}
					}).when('/register', {
				templateUrl : 'partials/register.html',
				controller : 'RegisterController'
			}).when('/logout', {
				templateUrl : '/logout',
				controller : 'IndexController'
			}).when('/dashboard', {
				templateUrl : '/dashboard',
				controller : 'DashboardController'
			}).when('/branch', {
				templateUrl : 'partials/branch.html',
				controller : 'BranchController'
			}).when('/fileupload', {
				templateUrl : 'partials/upload.html'
			}).when('/branchcode', {
				templateUrl : 'partials/branchcode.html'
			}).when('/setting', {
				templateUrl : 'partials/setting.html'
			}).when('/aboutUs', {
				templateUrl : 'partials/aboutus.html'
			}).when('/user', {
				templateUrl : 'partials/user.html',
				controller : 'UserController'
			}).when('/role', {
				templateUrl : 'partials/role.html',
				controller : 'RoleController'
			}).otherwise('/');

			$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
		});