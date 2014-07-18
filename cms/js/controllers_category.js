'use strict';

/* Controllers */
'use strict';

/* Controllers */

var Controllers_category = angular.module('Controllers_category', []);
Controllers_category.controller('CategoryAddCtrl', ['$scope','RestService', function($scope, RestService) {
	$scope.type="category";
	$scope.language_list=language_list;
	$scope.rows=[];
	$scope.parentId=0;
	$scope.sequence=0;
	var tmp=[];
	$scope.close = function(lang) {
		  $("#test").hide();
		  $("#lang_list").hide();
	};
  var setAllInactive = function() { 
	  angular.forEach($scope.workspaces, function(workspace) { 
	  workspace.active = false; 
	  }); 
	  }; 
  var addNewWorkspace = function() { 
	  $scope.workspaces.push({ 
	  language:"en-US", 
	  active: true 
	  }); 
	  tmp=["en-US"];
	  }; 
	  
	  $scope.workspaces = []; 
	  $scope.addWorkspace = function () { 
			  $("#test").show();
			  $("#lang_list").show();
	  }; 
	  $scope.deleteWorkspace = function (index) { 
	  $scope.workspaces.splice(index,$scope.workspaces.length > 1); 
	  tmp.splice(index,$scope.workspaces.length > 1); 
	  };	  
	  $scope.submit=function(){
		  for ( var item in  $scope.language_list) {
			  if($scope.language_list[item].checked && tmp.indexOf($scope.language_list[item].code)==-1){
				  $scope.workspaces.push({ 
					  language:$scope.language_list[item].code, 
					  active: true 
					  }); 
				  tmp.push($scope.language_list[item].code);
			  }
		}
		$("#test").hide();
		$("#lang_list").hide();
		  
	  } 
	  $scope.submit_form=function(){
		  var form={};
		  var params=[];
		  for ( var i=0; i< $scope.workspaces.length;i++) {
			params.push({language:$scope.workspaces[i].language,name:$scope.workspaces[i].name,picture:$scope.workspaces[i].picture});
		  }  
		  console.log({sequence:$scope.sequence,parentId:$scope.parentId,defaultLang:'en-US',params:params});
		  RestService.post({type:'category'},{sequence:$scope.sequence,parentId:$scope.parentId,defaultLang:'en-US',params:params}, function(resp)
				  {
			  alert(resp.resultCode)
			 // window.history.go(-1);
			  window.location="test.html#/category_list";
			 });
	  }	
	  $scope.upload=function(workspace,index){
		  upload_img(workspace,index);
	  }
	  $scope.img_click=function(index){
		  $("#file_browse_"+index).click();
		  
	  }
	  
}]);


Controllers_category.controller('CategoryEditCtrl',['$scope','$routeParams','RestService', function($scope,$routeParams,RestService) {
	$scope.type="category";
	$scope.language_list=language_list;
	var init=true;
	$("#test").hide();
	$("#lang_list").hide();
	var tmp=[];
	var deleteIds=[];
	$scope.list = RestService.get({type:'category',id: $routeParams.id}, function(data) {
			for ( var item in data.category.params) {
				 tmp.push(data.category.params[item].language);				 
			}			
    		setAllInactive();
      });
	  $scope.workspaces = $scope.list; 
      $scope.deleteWorkspace = function (index,id) { 
      if(confirm( 'Are you sure you want to delete?' )){
    		$scope.workspaces.category.params.splice(index,1); 
    		tmp.splice(index,1); 
    		if(id>0){
    			deleteIds.push(id);
    		}		
    	}
      };       
    	$scope.close = function() {
    			  $("#test").hide();
    			  $("#lang_list").hide();
    	  };
    	var setAllInactive = function() { 
    		  angular.forEach($scope.workspaces.category.params, function(workspace) { 
    		  workspace.active = false; 
    		  }); 
    		  }; 
    	$scope.addWorkspace = function () { 
    				  $("#test").show();
    				  $("#lang_list").show();
    		  }; 
    	$scope.choose_language=function(){
    			  for ( var item in  $scope.language_list) {
    				  if($scope.language_list[item].checked && tmp.indexOf($scope.language_list[item].code)==-1){
    					  $scope.workspaces.category.params.push({ 
    						  language:$scope.language_list[item].code, 
    						  active: true 
    						  }); 
    					  tmp.push($scope.language_list[item].code);
    				  }
    			}
    			  $("#test").hide();
    			  $("#lang_list").hide();
    			  
    		  }
    		  
    		  $scope.submit_form=function(){
    			  alert(JSON.stringify($scope.workspaces));
    			  var form={};
    			  var params_tmp=[];
    			  for ( var i=0; i< $scope.workspaces.category.params.length;i++) {
    				  params_tmp.push({language:$scope.workspaces.category.params[i].language,name:$scope.workspaces.category.params[i].name,id:$scope.workspaces.category.params[i].id,picture:$scope.workspaces.category.params[i].picture});
    				
    			  } 
    			  RestService.put({type:'category',id:$scope.list.category.id},{deleteIds:deleteIds,id:$scope.list.category.id,sequence:$scope.list.category.sequence,parentId:$scope.list.category.parentId,defaultLang:'en-US',params:params_tmp}, function(resp)
    					  {
    				 });

    		  }	 
    		  $scope.upload=function(){
    				$('iframe[name=upload_to]').load(function(){
    				    var result_tmp = $(this).contents().text();
    				    alert(result_tmp);
    				    var result= $.parseJSON(result_tmp);
    				    if(result !=''){
    					if (result == 'Err:big'){
    					    $('div#ajax_upload_demo img').attr('src','img/avatar_big.jpg');
    					    return;
    					}
    					if (result == 'Err:format'){
    					    $('div#ajax_upload_demo img').attr('src','img/avatar_invalid.jpg');
    					    return;
    					}
    					$('div#ajax_upload_demo img').attr('src',result.pitcureUrl);
    				    }   				
    				});
    			  $('div#ajax_upload_demo img').attr('src','img/loading.gif');
    			  $("#image_upload_form").submit();
    			  
    		  }
    		  $scope.img_click=function(){
    			  $("#file_browse").click();
    			  
    		  }
}]);
Controllers_category.controller('CategoryListCtrl', ['$scope','RestService', function($scope,RestService) {
	$scope.type="category";
	var page_index=1;
	var page_size=10;
	var max_page=1;
	$scope.category_list = RestService.get({type:'category',id:'list'},{first:0,max:page_size}, function(data) {
		 console.log(data);
		 max_page=Math.ceil(data.totalCount/page_size);
		 init_page();
    });
	
	var init_page=function (){
		var pages=[];
		if(page_index > 1){
			pages.push({name:'',css:'prev',i_css:'icon-double-angle-left'});
		}else{
			pages.push({name:'',css:'prev disabled',i_css:'icon-double-angle-left'});
		}
		for(var i=1;i <= max_page;i++){
			if(page_index==i){
				pages.push({name:i,css:'active',i_css:''});
			}else{
				pages.push({name:i,css:'',i_css:''});
			}
			
		}
		if(page_index<max_page){
			pages.push({name:'',css:'next',i_css:'icon-double-angle-right'});
		}else{
			pages.push({name:'',css:'next disabled',i_css:'icon-double-angle-right'});
		}
		$scope.pages=pages;
	}
	 init_page();
	$scope.go_page = function(index){
		if(index==0&&page_index>1){
			page_index--;
		}else if(index==max_page+1&&page_index<max_page){
			page_index++;
		}else if(index !=0 && index != max_page+1){
			page_index=index;
		}else{
			return;
		}		
		$scope.category_list = Category.get({categoryId:'list',first:(page_index-1)*page_size,max:page_size}, function(data) {
			 console.log(data);
			 max_page=Math.ceil(data.totalCount/page_size);
			 page_index=index;
			 init_page();
	    });
	}
    $scope.orderProp = 'id'; 
    $scope.dodelete = function(category,index) {
        $scope.category_list.categoryList.splice(index,1);
        RestService.delete({type:'category',id:category.id});
      };
      
    $scope.search = function(name) {
    	$scope.category_list=RestService.get({type:'category',id:'list'},{first:0,max:10,name:name}, function(resp) {
   		 console.log(resp);
        });
	}
}]);	














