myApp .directive( "buttonAndSearch", function() {
					return {
						restrict : 'E',
						template : '<div class="table-toolbar remove-bottom-margin"><div class="row"><div class="col-md-9"> <div class="btn-group"> <button type="button" class="btn-grid-position btn green" ng-click="ctrl.openCreateModal()"> Add <i class="fa fa-plus"></i> </button> <button type="button" class="btn-grid-position btn red" ng-if="ctrl.enableDeleteButton>0" ng-click="ctrl.deleteSelected()"> Delete <i class="fa fa-minus"></i> </button> </div></div><div class="col-md-3"> <div class="inner-addon right-addon"> <i class="glyphicon glyphicon-search"></i> <input type="text" class="form-control search-input-field" ng-change="ctrl.refreshData()" placeholder="Search company details" ng-model="ctrl.searchText"> </div></div></div> </div>'
					}
				}).directive( "mainGrid", function() {
					return {
						restrict : 'E',
						template : '<div  ui-grid="ctrl.gridOptions" ui-grid-auto-resize ui-grid-pagination ui-grid-resize-columns ui-grid-move-columns ui-grid-exporter ui-grid-selection	class="grid" external-scopes="gridHandlers"></div>'
					}
				}).directive( "pageBreadcrumb", function() {
					return {
						restrict : 'E',
						template : '<div class=" row "> 	<div class="col-md-12"> 		<ul class="page-breadcrumb breadcrumb"> 			<li><i class="fa fa-home"></i> <a href="#!/dashboard">Dashboard</a> <i class="fa fa-angle-right"></i></li> 			<li><a href="#!/{{pageUrl}}">{{pageName}}</a> <i class="fa fa-angle-right"></i></li> 		</ul> 	</div> </div>'
					}
				}).directive( "phoneInput", function() {
					return {
						restrict : 'E',
						require: 'ngModel',
						 scope: {
					         title: '@',
					         name:'@'
					      },
						template : '	<div class="row "> 	<div class="col-md-6"> 		<h4>{{title}}<span class="required">**</span></h4> 	</div> </div> <div class="group-section"> 	<div class=" form-group row "> 		<div class=" controls col-md-6"> 			<p> 				<input name={{name}}1 type="text" class="inputfield col-md-12" placeholder="Primary mobile number" ng-model="company.phone1" required > 			</p> 				<div class="has-error" ng-show="radixileForm.$dirty"> 									<span ng-show="radixileForm.{{name}}1.$error.required">This is a required field</span> 								</div> 		</div> 		<div class=" controls col-md-6"> 			<p> 				<input   type="text" class="inputfield col-md-12" placeholder="Secondary mobile number" ng-model="company.phone2"> 			</p> 		</div> 	</div> </div>'
					}
				}).directive( "emailInput", function() {
					return {
						restrict : 'E',
						scope: {
					         title: '@'
					      },
						template : '	<div class=" control-group row "><div class=" controls col-md-6"><h4>{{title}}<span class="required">**</span></h4></div> 			</div>  			<div class="group-section"><div class=" control-group row "><div class=" controls col-md-6">	<p><input type="text" class="inputfield col-md-12" placeholder="Primary mail id" ng-model="company.email1" required>	</p></div><div class=" controls col-md-6">	<p><input type="text" class="inputfield col-md-12" placeholder="Secondary mail id" ng-model="company.email2">	</p></div></div> 			</div>'
					}
				}).directive( "addressInput", function() {
					return {
						restrict : 'E',
						scope: {
					         title: '@'
					      },
						template : '	<div class="row "><div class=" controls col-md-6">	<h4>{{title}}</h4></div> 	</div> 	<div class="group-section address-inputbox"><div class=" control-group row ">	<div class=" controls col-md-6"><p>	<input type="text" class="inputfield col-md-12" placeholder="Building Name / Number" ng-model="company.addressLine1"></p>	</div>	<div class=" controls col-md-6"><p>	<input type="text" class="inputfield col-md-12" placeholder="Street Name" ng-model="company.addressLine2"></p>	</div></div><div class=" control-group row ">	<div class=" controls col-md-6"><p>	<input type="text" class="inputfield col-md-12" placeholder="City" ng-model="company.city"></p>	</div>	<div class=" controls col-md-6"><p>	<input type="text" class="inputfield col-md-12" placeholder="State" ng-model="company.state"></p>	</div></div><div class=" control-group row ">	<div class=" controls col-md-6"><p>	<input type="text" class="inputfield col-md-12" placeholder="Country Name" ng-model="company.country"></p>	</div>	<div class=" controls col-md-6"><p>	<input type="text" class="inputfield col-md-12" placeholder="zipcode" ng-model="company.zipcode"></p>	</div></div><div class=" control-group row ">	<div class=" controls col-md-6"><p>	<input type="text" class="inputfield col-md-12 " placeholder="lattitude" ng-model="company.lattitude"></p>	</div>	<div class=" controls col-md-6"><p>	<input type="text" class="inputfield col-md-12 " placeholder="longitude" ng-model="company.longitude"></p>	</div></div> 	</div>'
					}
				}) ;