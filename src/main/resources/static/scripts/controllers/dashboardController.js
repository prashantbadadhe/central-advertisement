myApp.controller('DashboardController', ['$rootScope', '$window', 'dashboardService','$scope', function($rootScope,$window, dashboardService,$scope) {
	setSidebarMenuSelection("dashboard");
	$rootScope.logoutClicked = false;
	$scope.companiesCount = 0;
	$scope.branchesCount = 0;
	$scope.rolesCount = 0;
	$scope.departmentsCount = 0;
/*	$scope.companiesCount = 0;
	$scope.branchesCount = 0;
	$scope.rolesCount = 0;
	$scope.departmentsCount = 0;
*/
/*	$scope.projectsCount = 0;
	$scope.agreementsCount = 0;
	$scope.elevatorsCount = 0;
	$scope.elevatorsMtncCount = 0;
	$scope.productDetailsCount = 0;
	$scope.nextJob = 0*/; 
	//$scope.users = 0; 
	dashboardService.getBranchDetails().then(function(response){
		$scope.branchesCount = response.data.page.totalElements;
	});
	/*dashboardService.getDashboard().then(function(response){
		if(!$rootScope.authenticated){
			 window.location.href="/loginpage.html";
		}
	});
	dashboardService.getCompanyDetails().then(function(response){
		$scope.companiesCount = response.data.page.totalElements;
	});
	dashboardService.getBranchDetails().then(function(response){
		$scope.branchesCount = response.data.page.totalElements;
	});
	dashboardService.getDepartmentDetails().then(function(response){
		$scope.departmentsCount = response.data.page.totalElements;
	});*/
/*	dashboardService.getCompanyDetails().then(function(response){
		$scope.companiesCount = response.data.page.totalElements;
	});
	dashboardService.getBranchDetails().then(function(response){
		$scope.branchesCount = response.data.page.totalElements;
	});
	dashboardService.getDepartmentDetails().then(function(response){
		$scope.departmentsCount = response.data.page.totalElements;
	});
	dashboardService.getRoleDetails().then(function(response){
		$scope.rolesCount = response.data.page.totalElements;
	});*/
/*	dashboardService.getProjectDetails().then(function(response){
		$scope.projectsCount = response.data.page.totalElements;
	});
	dashboardService.getAgreementDetails().then(function(response){
		$scope.agreementsCount = response.data.page.totalElements;
	});
	*/
	/*dashboardService.getCustomerDetails().then(function(response){
		$scope.customerCount = response.data.page.totalElements;
	});

	dashboardService.getEmployeeDetails().then(function(response){
		$scope.employeeCount = response.data.page.totalElements;
	});*/
	
	/*dashboardService.getElevatorDetails().then(function(response){
		$scope.elevatorsCount = response.data.page.totalElements;
	});
	
	dashboardService.getElevatorMtncDetails().then(function(response){
		$scope.elevatorsMtncCount = response.data.page.totalElements;
	});
	
	dashboardService.getProductDetails().then(function(response){
		$scope.productDetailsCount = response.data.page.totalElements;
	});
	
	nextJobService.getAllJobs().then(function(response){
		if(response.data!=null && response.data!=undefined){
		$scope.nextJob = response.data.length;
		}
	});*/
	/*dashboardService.getAllUsers().then(function(response){
		$scope.users = response.data._embedded.users.length;
	});*/

} ]);