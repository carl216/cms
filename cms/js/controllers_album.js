'use strict';

/* Controllers */
'use strict';

/* Controllers */

var Controllers_album = angular.module('Controllers_album', []);

Controllers_album.controller('AlbumListCtrl', ['$scope','RestService', function($scope,RestService) {
	var page_index=1;
	var page_size=10;
	var max_page=1;
	var ids=[]
	$scope.album_list = RestService.get({type:'album',id:'list'},{first:0,max:page_size}, function(data) {
		 console.log(data);
		 max_page=Math.ceil(data.totalCount/page_size);
		 init_page();
    });
	
	$scope.selAlbum=function(id,secl){
		alert("id = "+id + " sec = "+secl);
		if(ids.indexOf(id)>1){
			ids.splice(ids.indexOf(id),1);			
		}else{			
			ids.push(id);
		}	
	}
	$scope.batchpublish = function(status){
		$( "#dialog-confirm" ).removeClass('hide').dialog({
			resizable: false,
			modal: true,
			title: "<div class='widget-header'><h4 class='smaller'><i class='icon-warning-sign red'></i> Empty the recycle bin?</h4></div>",
			title_html: true,
			buttons: [
				{
					html: "<i class='icon-trash bigger-110'></i>&nbsp; Delete all items",
					"class" : "btn btn-danger btn-xs",
					"ng-click" : "1111",
					click: function() {
						$scope.album_list.albumList.splice(index,1);
					    AlbumDel.delete({id:ablum.id});
						$( this ).dialog( "close" );
					}
				}
				,
				{
					html: "<i class='icon-remove bigger-110'></i>&nbsp; Cancel",
					"class" : "btn btn-xs",
					"ng-click" : "1111",
					click: function() {
						$( this ).dialog( "close" );
					}
				}
			]
			});
		RestService.put({type:'album',id:'batchpublish'},{status:status,ids:ids},function(data){			
		});
	}
	$scope.publish= function(){
		
	}
	
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
		$scope.album_list = RestService.get({type:'album',id:'list'},{first:(page_index-1)*page_size,max:page_size}, function(data) {
			 console.log(data);
			 max_page=Math.ceil(data.totalCount/page_size);
			 page_index=index;
			 init_page();
	    });
	}
    $scope.orderProp = 'id'; 
    $scope.dodelete = function(ablum,index) {
		$( "#dialog-confirm" ).removeClass('hide').dialog({
			resizable: false,
			modal: true,
			title: "<div class='widget-header'><h4 class='smaller'><i class='icon-warning-sign red'></i> Empty the recycle bin?</h4></div>",
			title_html: true,
			buttons: [
				{
					html: "<i class='icon-trash bigger-110'></i>&nbsp; Delete all items",
					"class" : "btn btn-danger btn-xs",
					"ng-click" : "1111",
					click: function() {
						$scope.album_list.albumList.splice(index,1);
						RestService.delete({type:'album',id:ablum.id});
						$( this ).dialog( "close" );
					}
				}
				,
				{
					html: "<i class='icon-remove bigger-110'></i>&nbsp; Cancel",
					"class" : "btn btn-xs",
					"ng-click" : "1111",
					click: function() {
						$( this ).dialog( "close" );
					}
				}
			]
			});
      };
      
     var showmessage= function(title,content){
    	 
     } 
    $scope.search = function(name) {
    	$scope.album_list=Album.get({id:'list',first:0,max:10,name:name}, function(resp) {
   		 console.log(resp);
        });
	}
}]);

Controllers_album.controller('AlbumAddCtrl', ['$scope','RestService', function($scope,RestService) {
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
	var tmp=[];
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
	  	  	  
	  var tree_data = {
				'for-sale' : {id:1,name: 'For Sale', type: 'folder'}	,
				'vehicles' : {id:2,name: 'Vehicles', type: 'folder'}	,
				'tickets' : {id:3,name: 'Tickets', type: 'item'}	,
			}
			tree_data['for-sale']['additionalParameters'] = {
				'children' : {
					'appliances' : {id:4,name: 'Appliances', type: 'item'},
					'arts-crafts' : {id:5,name: 'Arts & Crafts', type: 'item'},
					'clothing' : {id:6,name: 'Clothing', type: 'item'},
					'computers' : {id:7,name: 'Computers', type: 'item'},
					'jewelry' : {id:8,name: 'Jewelry', type: 'item'},
					'office-business' : {id:9,name: 'Office & Business', type: 'item'},
					'sports-fitness' : {id:10,name: 'Sports & Fitness', type: 'item'}
				}
			}
			tree_data['vehicles']['additionalParameters'] = {
				'children' : {
					'cars' : {id:11,name: 'Cars', type: 'folder'},
					'motorcycles' : {id:12,name: 'Motorcycles', type: 'item'},
					'boats' : {id:13,name: 'Boats', type: 'item'}
				}
			}
			tree_data['vehicles']['additionalParameters']['children']['cars']['additionalParameters'] = {
				'children' : {
					'classics' : {id:14,name: 'Classics', type: 'item'},
					'convertibles' : {id:15,name: 'Convertibles', type: 'item'},
					'coupes' : {id:16,name: 'Coupes', type: 'item'},
					'hatchbacks' : {id:17,name: 'Hatchbacks', type: 'item'},
					'hybrids' : {id:18,name: 'Hybrids', type: 'item'},
					'suvs' : {id:19,name: 'SUVs', type: 'item'},
					'sedans' : {id:20,name: 'Sedans', type: 'item'},
					'trucks' : {id:21,name: 'Trucks', type: 'item'}
				}
			}
	  $scope.submit_form=function(){
		  var form={};
		  var params=[];
		  for ( var i=0; i< $scope.workspaces.length;i++) {
			params.push({language:$scope.workspaces[i].language,name:$scope.workspaces[i].name,poster:"",artist:$scope.workspaces[i].artist,intro:$scope.workspaces[i].intro});
			
		  }  
		  console.log({releaseYear:$scope.releaseYear,score:$scope.score,price:$scope.price,rentPrice:$scope.rentPrice,categoryIds:$scope.categories,status:$scope.status ? 8 :12 ,defaultLang:'en-US',params:params});
		  RestService.post({type:"album"},{releaseYear:$scope.releaseYear,score:$scope.score,price:$scope.price,rentPrice:$scope.rentPrice,categoryIds:$scope.categories,status:$scope.status ? 8 :12 ,defaultLang:'en-US',params:params}, function(resp)
				  {
			  		window.history.go(-1);
			  		console.log(resp);
			 });
	  }
	  var treeDataSource = new DataSourceTree({data: tree_data});
	  console.log(tree_data);
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

Controllers_album.controller('AlbumEditCtrl', ['$scope','$routeParams','RestService', function($scope,$routeParams,RestService) {
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
	$scope.list = RestService.get({type:'album',id: $routeParams.id}, function(data) {
			for ( var item in data.album.params) {
				 tmp.push(data.album.params[item].language);				 
			}
			for(var i=1;i <= data.album.score;i++){
				$scope["s"+i]=true;
			}
			$scope.status=data.album.status==8 ? false :true;
			$scope.categories=data.album.categories;
			$scope.releaseYear=data.album.releaseYear;
			$scope.price=data.album.price;
			$scope.rentPrice=data.album.rentPrice;
    		setAllInactive();
      });
	  $scope.workspaces = $scope.list; 
      $scope.deleteWorkspace = function (index,id) { 
      if(confirm( 'Are you sure you want to delete?' )){
    		$scope.workspaces.album.params.splice(index,1); 
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
    		  angular.forEach($scope.workspaces.album.params, function(workspace) { 
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
    			  for ( var i=0; i< $scope.workspaces.album.params.length;i++) {
    				  params_tmp.push({id:$scope.workspaces.album.params[i].id,language:$scope.workspaces.album.params[i].language,name:$scope.workspaces.album.params[i].name,poster:"",artist:$scope.workspaces.album.params[i].artist,intro:$scope.workspaces.album.params[i].intro});    				   				  
    			  } 
    			  alert(JSON.stringify($scope.list));
    			  RestService.put({type:'album',id:$scope.list.album.id},{deleteIds:deleteIds,id:$scope.list.album.id,releaseYear:$scope.releaseYear,score:$scope.score,price:$scope.price,rentPrice:$scope.rentPrice,categoryIds:$scope.categories,status:$scope.status ? 8 :12 ,defaultLang:'en-US',params:params_tmp}, function(resp)
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
    		  var tree_data = {
    					'for-sale' : {id:1,name: 'For Sale', type: 'folder'}	,
    					'vehicles' : {id:2,name: 'Vehicles', type: 'folder'}	,
    					'tickets' : {id:3,name: 'Tickets', type: 'item'}	,
    				}
    				tree_data['for-sale']['additionalParameters'] = {
    					'children' : {
    						'appliances' : {id:4,name: 'Appliances', type: 'item'},
    						'arts-crafts' : {id:5,name: 'Arts & Crafts', type: 'item'},
    						'clothing' : {id:6,name: 'Clothing', type: 'item'},
    						'computers' : {id:7,name: 'Computers', type: 'item'},
    						'jewelry' : {id:8,name: 'Jewelry', type: 'item'},
    						'office-business' : {id:9,name: 'Office & Business', type: 'item'},
    						'sports-fitness' : {id:10,name: 'Sports & Fitness', type: 'item'}
    					}
    				}
    				tree_data['vehicles']['additionalParameters'] = {
    					'children' : {
    						'cars' : {id:11,name: 'Cars', type: 'folder'},
    						'motorcycles' : {id:12,name: 'Motorcycles', type: 'item'},
    						'boats' : {id:13,name: 'Boats', type: 'item'}
    					}
    				}
    				tree_data['vehicles']['additionalParameters']['children']['cars']['additionalParameters'] = {
    					'children' : {
    						'classics' : {id:14,name: 'Classics', type: 'item'},
    						'convertibles' : {id:15,name: 'Convertibles', type: 'item'},
    						'coupes' : {id:16,name: 'Coupes', type: 'item'},
    						'hatchbacks' : {id:17,name: 'Hatchbacks', type: 'item'},
    						'hybrids' : {id:18,name: 'Hybrids', type: 'item'},
    						'suvs' : {id:19,name: 'SUVs', type: 'item'},
    						'sedans' : {id:20,name: 'Sedans', type: 'item'},
    						'trucks' : {id:21,name: 'Trucks', type: 'item'}
    					}
    				}
    		  var treeDataSource = new DataSourceTree({data: tree_data});
    		  console.log(tree_data);
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