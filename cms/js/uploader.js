$(document).ready(
		function() {
			$('#image_upload_form').submit(function() {
				$('div#ajax_upload_demo img').attr('src', 'img/loading.gif');
			});
			$('iframe[name=upload_to]').load(
					function() {
						var result = $(this).contents().text();
						if (result != '') {
							if (result == 'Err:big') {
								$('div#ajax_upload_demo img').attr('src',
										'img/avatar_big.jpg');
								return;
							}
							if (result == 'Err:format') {
								$('div#ajax_upload_demo img').attr('src',
										'img/avatar_invalid.jpg');
								return;
							}	
							$('div#ajax_upload_demo img').attr('src',
									$(this).contents().text()+'_carl');
						}
					});
		});