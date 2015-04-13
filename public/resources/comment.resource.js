(function() {
	angular.module('app.resources')
		.factory('CommentThread', CommentResource);

	function CommentResource () {
		var cr = DS.defineResource({
			name: 'comment',
			endpoint: 'comments',
			relations: {
				belongsTo: {
					document: {
						parent: true,
						localField: 'document',
						localKey: 'document_id'
					}
				}
			}
		});
		
		cr.getEndpoint = getEndpoint;
		
		return cr;
	}

}());
