(function() {
	angular.module('app', ['app.resources', 'app.pages', 'ngRoute'])
		.config(function ($locationProvider, $routeProvider) {
			$locationProvider.html5Mode(false);
			$routeProvider.otherwise({redirectTo: '/collections'});
		});
}());
