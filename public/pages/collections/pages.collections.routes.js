(function() {

	angular.module('app.pages')
		.config(config)
		.controller('CollectionsCtrl', CollectionsController);

	function config ($routeProvider) {
		$routeProvider
			.when('/collections', {
				templateUrl: 'pages/collections/pages.collections.html',
				controller: 'CollectionsCtrl',
				controllerAs: 'CollectionsCtrl',
				resolve: {
					collections: function (Collection) {
						return Collection.findAll({});
					}
				}
			});
	}

	function CollectionsController ($scope, collections) {
		$scope.collections = collections;
	}

}());
