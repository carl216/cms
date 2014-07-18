'use strict';

/* Controllers */
'use strict';

/* Controllers */

var Controllers_channel = angular.module('Controllers_channel', []);

Controllers_channel.controller('ChannelAddCtrl', ['$scope','$modal', 'RestService', function($scope, RestService) {
	$scope.language_list=[];
	$scope.language_list.push({checked:false, code: "zh-CN", language: "中文简体"});
	$scope.language_list.push({checked:false, code: "zh-TW", language: "中文繁体"});
	$scope.language_list.push({checked:false, code: "de-DE", language: "de-DE"});
	$scope.language_list.push({checked:true, code: "en-US", language: "en-US"});
	$scope.language_list.push({checked:false, code: "en-GB", language: "en-GB"});
	$scope.language_list.push({checked:false, code: "fr-FR", language: "fr-FR"});
	$scope.language_list.push({checked:false, code: "it-IT", language: "it-IT"});
	$scope.rows=[];
	$scope.score=0;
	$scope.status=false;
	$scope.categories=[];
	$scope.releaseYear='';
	$scope.price='';
	$scope.rentPrice='';	
	$scope.channelurl='';
	var tmp=[];
	var tmp_tree=[];
	RestService.get({type:'category',id:"tree"},function(data){
		console.log(data);
		tmp_tree=data.categoryTree
		prase_tree_data(tmp_tree)
		console.log(tmp_tree);
		  var treeDataSource = new DataSourceTree({data: tmp_tree});
			$('#tree1').ace_tree({
				dataSource: treeDataSource ,
				multiSelect:true,
				loadingHTML:'<div class="tree-loading"><i class="icon-refresh icon-spin blue"></i></div>',
				'open-icon' : 'icon-minus',
				'close-icon' : 'icon-plus',
				'selectable' : true,
				'selected-icon' : 'icon-ok',
				'unselected-icon' : 'icon-remove'
			});
	})
	
	for(var i=0;i<Math.ceil($scope.language_list.length);i++){
		$scope.rows.push({index:i});
	}
	$scope.close = function(lang) {
		  $("#test").hide();
		  $("#lang_list").hide();
  };
  /*
	$( "#datepicker" ).datepicker({
		showOtherMonths: true,
		selectOtherMonths: false,
		//isRTL:true,

		

		changeMonth: true,
		changeYear: true,
		
		showButtonPanel: true,
		beforeShow: function() {
			//change button colors
			var datepicker = $(this).datepicker( "widget" );
			setTimeout(function(){
				var buttons = datepicker.find('.ui-datepicker-buttonpane')
				.find('button');
				buttons.eq(0).addClass('btn btn-xs');
				buttons.eq(1).addClass('btn btn-xs btn-success');
				buttons.wrapInner('<span class="bigger-110" />');
			}, 0);
		}

	});		
	*/
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
				setAllInactive(); 
				addNewWorkspace(); 
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
	  
	  $scope.set_score=function(index){
		  $scope.score=index;
	  }
	
	
	  
	  $scope.submit_form=function(){
		  var form={};
		  var params=[];
		  for ( var i=0; i< $scope.workspaces.length;i++) {
			params.push({language:$scope.workspaces[i].language,name:$scope.workspaces[i].name,poster:"",artist:$scope.workspaces[i].artist,intro:$scope.workspaces[i].intro});
			
		  }  
		  console.log({releaseYear:$scope.releaseYear,score:$scope.score,price:$scope.price,rentPrice:$scope.rentPrice,categories:$scope.categories,status:$scope.status ? 8 :12 ,defaultLang:'en-US',params:params});
		  RestService.post({type:'channel'},{releaseYear:$scope.releaseYear,score:$scope.score,price:$scope.price,rentPrice:$scope.rentPrice,categoryIds:$scope.categories,status:$scope.status ? 8 :12 ,defaultLang:'en-US',params:params}, function(resp)
				  {
			  		window.history.go(-1);
			  		console.log(resp);
			 });
	  }
		$('#tree1').on('loaded', function (evt, data) {

		});

		$('#tree1').on('opened', function (evt, data) {

		});

		$('#tree1').on('closed', function (evt, data) {
		});

		$('#tree1').on('selected', function (evt, data) {
			var str='';
			var ids=[];
			for ( var item in data.info) {
				  str+=data.info[item].name+" ";
				  ids.push(data.info[item].id);
			}
			$scope.categories=ids;
			$("#categories").html(str);
		});
	  $("#tree_demo").hide();
	  $scope.choose_categories=function(){
		  $("#test").hide();
		  $("#tree_demo").hide();
	  }
	  $scope.show_categories=function(){
		  $("#test").show();
		  $("#tree_demo").show();
	  }
}]);


Controllers_channel.controller('ChannelEditCtrl',['$scope','$routeParams','RestService', function($scope,$routeParams,RestService) {
	$scope.language_list=[];
	$scope.language_list.push({checked:false, code: "zh-CN", language: "中文简体"});
	$scope.language_list.push({checked:false, code: "zh-TW", language: "中文繁体"});
	$scope.language_list.push({checked:false, code: "de-DE", language: "de-DE"});
	$scope.language_list.push({checked:true, code: "en-US", language: "en-US"});
	$scope.language_list.push({checked:false, code: "en-GB", language: "en-GB"});
	$scope.language_list.push({checked:false, code: "fr-FR", language: "fr-FR"});
	$scope.language_list.push({checked:false, code: "it-IT", language: "it-IT"});
	var init=true;
	var deleteIds=[];
	$scope.rows=[];
	$scope.score=0;	
	$scope.status=false;
	$scope.categories=[];
	$scope.releaseYear='';
	$scope.price='';
	$scope.rentPrice='';	
	$("#test").hide();
	$("#lang_list").hide();
	$scope.s1=false;$scope.s2=false;$scope.s3=false;$scope.s4=false;$scope.s5=false;
	var tmp=[];
	var deleteIds=[];
	$scope.list = RestService.get({type:'channel',id: $routeParams.id}, function(data) {
			for ( var item in data.channel.params) {
				 tmp.push(data.channel.params[item].language);				 
			}
			for(var i=1;i <= data.channel.score;i++){
				$scope["s"+i]=true;
			}
			$scope.status=data.channel.status==8 ? false :true;
			$scope.categories=data.channel.categories;
			$scope.releaseYear=data.channel.releaseYear;
			$scope.price=data.channel.price;
			$scope.rentPrice=data.channel.rentPrice;
    		setAllInactive();
      });
	  $scope.workspaces = $scope.list; 
      $scope.deleteWorkspace = function (index,id) { 
      if(confirm( 'Are you sure you want to delete?' )){
    		$scope.workspaces.channel.params.splice(index,1); 
    		tmp.splice(index,1); 
    		if(id>0){
    			deleteIds.push(id);
    		}		
    	}
      };    
      
  	var tree_data1=RestService.get({type:'channel',id:"tree"},function(data){
		console.log(data);
		tmp_tree=data.categoryTree
		prase_tree_data(tmp_tree)
		console.log(tmp_tree);
		  var treeDataSource = new DataSourceTree({data: tmp_tree});
			$('#tree1').ace_tree({
				dataSource: treeDataSource ,
				multiSelect:true,
				loadingHTML:'<div class="tree-loading"><i class="icon-refresh icon-spin blue"></i></div>',
				'open-icon' : 'icon-minus',
				'close-icon' : 'icon-plus',
				'selectable' : true,
				'selected-icon' : 'icon-ok',
				'unselected-icon' : 'icon-remove'
			});
	})
      
    	$scope.close = function() {
    			  $("#test").hide();
    			  $("#lang_list").hide();
    	  };
    	var setAllInactive = function() { 
    		  angular.forEach($scope.workspaces.channel.params, function(workspace) { 
    		  workspace.active = false; 
    		  }); 
    		  }; 
    	$scope.addWorkspace = function () { 
    				  $("#test").show();
    				  $("#lang_list").show();
    		  }; 
    	$scope.submit=function(){
    			  for ( var item in  $scope.language_list) {
    				  if($scope.language_list[item].checked && tmp.indexOf($scope.language_list[item].code)==-1){
    					  $scope.workspaces.album.params.push({ 
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
    			  var params_tmp=[];
    			  for ( var i=0; i< $scope.workspaces.channel.params.length;i++) {
    				  params_tmp.push({id:$scope.workspaces.channel.params[i].id,language:$scope.workspaces.channel.params[i].language,name:$scope.workspaces.channel.params[i].name,poster:"",artist:$scope.workspaces.channel.params[i].artist,intro:$scope.workspaces.channel.params[i].intro});    				   				  
    			  } 
    			  alert(JSON.stringify($scope.list));
    			  RestService.put({type:'channel',id:$scope.list.channel.id},{deleteIds:deleteIds,id:$scope.list.channel.id,releaseYear:$scope.releaseYear,score:$scope.score,price:$scope.price,rentPrice:$scope.rentPrice,categoryIds:$scope.categories,status:$scope.status ? 8 :12 ,defaultLang:'en-US',params:params_tmp}, function(resp)
    					  {
  			  			window.history.go(-1);
  			  			console.log(resp);
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
    			$('#tree1').on('loaded', function (evt, data) {

    			});

    			$('#tree1').on('opened', function (evt, data) {

    			});

    			$('#tree1').on('closed', function (evt, data) {
    			});

    			$('#tree1').on('selected', function (evt, data) {
    				var str='';
    				var ids=[];
    				for ( var item in data.info) {
    					  str+=data.info[item].name+" ";
    					  ids.push(data.info[item].id);
    				}
    				$scope.categories=ids;
    				$("#categories").html(str);
    			});
    		  $("#tree_demo").hide();
    		  $scope.choose_categories=function(){
    			  $("#test").hide();
    			  $("#tree_demo").hide();
    		  }
    		  $scope.show_categories=function(){
    			  $("#test").show();
    			  $("#tree_demo").show();
    		  }
}]);
Controllers_channel.controller('ChannelListCtrl', ['$scope','RestService', function($scope,RestService) {
	var page_index=1;
	var page_size=10;
	var max_page=1;
	$scope.channel_list = RestService.get({type:'channel',id:'list'},{Pfirst:0,max:page_size}, function(data) {
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
		$scope.channel_list = RestService.get({type:'channel',id:'list'},{first:(page_index-1)*page_size,max:page_size}, function(data) {
			 console.log(data);
			 max_page=Math.ceil(data.totalCount/page_size);
			 page_index=index;
			 init_page();
	    });
	}
    $scope.orderProp = 'id'; 
    $scope.dodelete = function(category,index) {
        $scope.category_list.categoryList.splice(index,1);
        CategoryDel.delete({categoryId:category.id});
      };
      
    $scope.search = function(name) {
    	$scope.category_list=RestService.get({type:'channel',id:'list'},{first:0,max:10,name:name}, function(resp) {
   		 console.log(resp);
        });
	}
}]);	



/*public*/

var prase_tree_data=function(data){
	for ( var i in data) {
		if(data[i].childs.length>0){
			data[i].type="folder";
			prase_tree_data(data[i].childs);
		}else{			
			data[i].type="item";
		}
	} 	
}









































