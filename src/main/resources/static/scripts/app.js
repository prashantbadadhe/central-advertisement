var myApp = angular.module(
		'myapp',
		[ 'ngRoute', 'ui.grid', 'ui.grid.cellNav', 'ui.grid.edit', 'ui.grid.resizeColumns', 'ui.grid.pinning', 'ui.grid.selection', 'ui.grid.moveColumns', 'ui.grid.exporter', 'ui.grid.importer',
				'ui.grid.grouping', 'ui.grid.pagination', 'ui.bootstrap', 'ngDragDrop', '720kb.datepicker', 'angularFileUpload' ]).run(function($rootScope) {
	$rootScope.authenticated = true;
	$rootScope.logoutClicked = true;

});
myApp.config(function($logProvider) {
	$logProvider.debugEnabled(true);
});
