myApp.directive("alertSuccess", function(){
	return{
		restrict:'E',
		template:'	<div class="alert alert-success text-center" data-ng-show="messageSuccessText"><strong>Success! </strong>	<alert ng-repeat="alert in alerts track by $index" type="alert.type" close="alert.close()">  {{messageSuccessText}}</alert></div>'
	}
}).directive("alertFail", function(){
	return{
		restrict:'E',
		template:'<div class="alert alert-danger text-center" data-ng-show="messageFailText"> <alert ng-repeat="alert in alerts track by $index" type="alert.type" close="alert.close()"> <strong>Danger! </strong>{{messageFailText}}</alert></div>'
	}
}).directive("bottomAlert", function(){
	return{
		restrict:'E',
		template:'	<div class="scroller" style="height: 20px;" data-always-visible="1" data-rail-visible="0"><ul class="feeds"><li><div class="cont">	<div class="label label-sm label-info"><i class="fa fa-bell-o"></i> <strong>Double click on any record to edit</strong> <i class="fa fa-bell-o"></i> <strong>Select to delete </strong></div>	</div>	</li></ul></div>'
	}
});