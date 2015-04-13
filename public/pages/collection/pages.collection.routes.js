(function() {

	angular.module('app.pages')
		.config(config)
		.controller('CollectionCtrl', CollectionController);

	function config ($routeProvider) {
		$routeProvider
			.when('/collections/:collectionId', {
				templateUrl: 'pages/collection/pages.collection.html',
				controller: 'CollectionCtrl',
				controllerAs: 'CollectionCtrl',
				resolve: {
					collection: function ($route, Collection) {
						var $routeParams = $route.current.params;
						return Collection.find($routeParams.collectionId);
					}
				}
			});
	}

	function CollectionController ($scope, collection) {
		$scope.collection = collection;
	}

}());
