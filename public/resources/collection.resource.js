(function() {
	angular.module('app.resources')
		.factory('Collection', CollectionResource);

	function CollectionResource (DS) {
		return DS.defineResource({
			name: 'collection',
			endpoint: 'collections'
		});
	}	

}());
