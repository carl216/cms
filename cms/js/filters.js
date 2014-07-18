'use strict';

/* Filters */

angular.module('cmsFilters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }]).filter('categorytype', function() {
	  //1:电影  2:电视剧  3:唱片专辑    4:电子书   5:radio
		return function(input) {
			var type="undefind";
			switch (input) {
			case "1":
				type="电影"
				break;
			case "2":
				type="电视剧"
				break;
			case "3":
				type="唱片专辑"
				break;
			case "4":
				type="电子书"
				break;			
			default:
				break;
			}
			return type;
		};
	}).filter('uploadinit',function(){
		return function(index) {		
			var btn_choose="Drop images here or click to choose";
			var no_icon = "icon-picture";
			var before_change = function(files, dropped) {
				var allowed_files = [];
				for(var i = 0 ; i < files.length; i++) {
					var file = files[i];
					if(typeof file === "string") {
						//IE8 and browsers that don't support File Object
						if(! (/\.(jpe?g|png|gif|bmp)$/i).test(file) ) return false;
					}
					else {
						var type = $.trim(file.type);
						if( ( type.length > 0 && ! (/^image\/(jpe?g|png|gif|bmp)$/i).test(type) )
								|| ( type.length == 0 && ! (/\.(jpe?g|png|gif|bmp)$/i).test(file.name) )//for android's default browser which gives an empty string for file.type
							) continue;//not an image so don't keep this file
					}
					
					allowed_files.push(file);
				}
				if(allowed_files.length == 0) return false;

				return allowed_files;
			}
			var file_input = $('#id-input-file-'+index);
			file_input.ace_file_input('update_settings', {style:'well',droppable:true,thumbnail:'small','before_change':before_change, 'btn_choose': btn_choose, 'no_icon':no_icon})
			file_input.ace_file_input('reset_input');
			return 'test';
			
		};
	}).filter('uploadsub',function(){
		return function(index) {		
			$('#image_upload_form').submit(function(){
			    $('div#ajax_upload_demo img').attr('src','loading.gif');
			});
			$('iframe[name=upload_to]').load(function(){
			    var result = $(this).contents().text();
			    if(result !=''){
				if (result == 'Err:big'){
				    $('div#ajax_upload_demo img').attr('src','avatar_big.jpg');
				    return;
				}
				if (result == 'Err:format'){
				    $('div#ajax_upload_demo img').attr('src','avatar_invalid.jpg');
				    return;
				}
				$('div#ajax_upload_demo img').attr('src',$(this).contents().text());
			    }
			});
			return 'test';
			
		};
	});

