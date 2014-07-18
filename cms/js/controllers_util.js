function upload_img(workspace,index){
	$('iframe[name=upload_to_'+index+']').load(function(){
	    var result_tmp = $(this).contents().text();
	    var result= $.parseJSON(result_tmp);
	    console.log(result);
	    if(result !=''){
		workspace.picture=result.pictureUrl;
		console.log(workspace);
		$('div#ajax_upload_demo_'+index+' img').attr('src',result.pictureUrl);
	    }
	});

  $('div#ajax_upload_demo_'+index+' img').attr('src','img/loading.gif');
  $("#image_upload_form_"+index).submit();  
}
var language_list=[];
language_list.push({checked:false, code: "zh-CN", language: "中文简体"});
language_list.push({checked:false, code: "zh-TW", language: "中文繁体"});
language_list.push({checked:false, code: "de-DE", language: "de-DE"});
language_list.push({checked:true, code: "en-US", language: "en-US"});
language_list.push({checked:false, code: "en-GB", language: "en-GB"});
language_list.push({checked:false, code: "fr-FR", language: "fr-FR"});
language_list.push({checked:false, code: "it-IT", language: "it-IT"});
		  
