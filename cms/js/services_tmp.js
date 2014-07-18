'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
var cmsServices = angular.module('cmsServices', ['ngResource']);
cmsServices.factory('RestService', [ '$resource', function($resource) {
	return $resource('/rest/:type/:id', {type:"@type",id:'@id'}, {
		put: {method:'PUT'},
		get:{method:'GET'},
		post:{method:'POST'},
		delete:{method:'DELETE'}
	});
} ]);





