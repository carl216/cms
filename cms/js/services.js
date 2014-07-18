'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).value('version', '0.1').service(
		'sharedProperties', function() {
			var serverUrl = 'http://172.16.11.6:6060';
			var mediaTypes = [ {
				"name" : "Movie",
				"value" : "1"
			}, {
				"name" : "TV",
				"value" : "2"
			}, {
				"name" : "EPG",
				"value" : "3"
			}, {
				"name" : "Music",
				"value" : "4"
			}, {
				"name" : "Book",
				"value" : "5"
			}, {
				"name" : "Magzine",
				"value" : "6"
			}, {
				"name" : "App",
				"value" : "7"
			}, ];
			return {
				getServerUrl : function() {
					return serverUrl;
				},
				setServerUrl : function(value) {
					serverUrl = value;
				},
				getMediaTypes : function() {
					return mediaTypes;
				},
			};
		}).service('fileUpload', [ '$http', function($http) {
			this.uploadFileToUrl = function(file, uploadUrl) {
				var fd = new FormData();
				fd.append('file', file);
				
				return $http.post(uploadUrl, fd, {
					transformRequest : angular.identity,
					headers : {
						'Content-Type' : undefined,
					}
				}).success(function(data) {
					var url = data.pitcureUrl;
					console.log("upload success!");
					$('#returnUrl').val(url);
					alert($('#returnUrl').val());
				}).error(function() {
					console.log("upload failure!");
				});
			};
		
} ]);
