'use strict';

// Declare app level module which depends on filters, and services
var cms = angular.module('cms', [ 'ngRoute', 'Controllers_category','Controllers_album','Controllers_book','Controllers_channel','cmsFilters',
		'cmsServices','ui.bootstrap', 'ngGrid' ]);

cms.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/category_list', {
		templateUrl : 'category/list.html',
		controller : 'CategoryListCtrl'
	});
	$routeProvider.when('/category_edit/:id', {
        templateUrl: 'category/edit.html',
        controller: 'CategoryEditCtrl'
      });
	$routeProvider.when('/category_add', {
        templateUrl: 'category/add.html',
        controller: 'CategoryAddCtrl'
      });
	$routeProvider.when('/album_list', {
        templateUrl: 'album/list.html',
        controller: 'AlbumListCtrl'
      });
	$routeProvider.when('/album_add', {
        templateUrl: 'album/add.html',
        controller: 'AlbumAddCtrl'
      });
	$routeProvider.when('/album_edit/:id', {
        templateUrl: 'album/edit.html',
        controller: 'AlbumEditCtrl'
      });
	$routeProvider.when('/book_list', {
        templateUrl: 'book/list.html',
        controller: 'BookListCtrl'
      });
	$routeProvider.when('/book_add', {
        templateUrl: 'book/add.html',
        controller: 'BookAddCtrl'
      });
	$routeProvider.when('/book_edit/:id', {
        templateUrl: 'book/edit.html',
        controller: 'BookEditCtrl'
      });

	$routeProvider.when('/channel_list', {
        templateUrl: 'channel/list.html',
        controller: 'ChannelListCtrl'
      });
	$routeProvider.when('/channel_add', {
        templateUrl: 'channel/add.html',
        controller: 'ChannelAddCtrl'
      });
	$routeProvider.when('/channel_edit/:id', {
        templateUrl: 'channel/edit.html',
        controller: 'ChannelEditCtrl'
      });	
	$routeProvider.when('/city',{templateUrl:'city/list.html', controller:'cityListCtrl'});
	$routeProvider.when('/city/edit/:cityId',{templateUrl:'city/edit.html', controller:'cityEditCtrl'});
	$routeProvider.when('/city/add',{templateUrl:'city/add.html', controller:'cityAddCtrl'});
} ]);

