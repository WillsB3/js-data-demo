(function() {
	angular.module('app.resources')
		.factory('Document', DocumentResource);

	function DocumentResource (DS, getEndpoint) {
		var dr = DS.defineResource({
			name: 'document',
			endpoint: 'documents',
			idAttribute: 'c_id',
			relations: {
				belongsTo: {
					collection: {
						parent: true,
						localField: 'collection',
						localKey: 'collection_id'
					}
				}
			},
			computed: {
				c_id: ['collection_id', 'document_id', function (collectionId, documentId) {
					return collectionId + ':' + documentId;
				}]
			}
		});
		
		dr.getEndpoint = getEndpoint;
		
		return dr;
	}

}());
