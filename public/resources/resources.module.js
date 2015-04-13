(function() {
	angular.module('app.resources', ['js-data'])
		.config(config)
		.service('getEndpoint', getEndpoint);

	function config ($locationProvider, DSHttpAdapterProvider) {
		DSHttpAdapterProvider.defaults.basePath = '/';
	}

	// Patched getEndpoint function to handle compound key.
	function getEndpoint(DS, DSUtils) {
		return function _getEndpoint(id, options) {
			options.params = options.params || {};
			var def = this;
			var definitions = DS.definitions;
			var item;
			var parentKey = def.parentKey;
			var endpoint = options.hasOwnProperty("endpoint") ? options.endpoint : def.endpoint;
			var parentField = def.parentField;
			var parentDef = definitions[def.parent];
			var parentId = options.params[parentKey];
			var parentIdParts;
			var backendParentId;

			if (parentId === false || !parentKey || !parentDef) {
				if (parentId === false) {
					delete options.params[parentKey];
				}
				return endpoint;
			} else {
				delete options.params[parentKey];

				if (DSUtils._sn(id)) {
					item = def.get(id);
				} else if (DSUtils._o(id)) {
					item = id;
				}

				if (item) {
					parentId = parentId || item[parentKey] || (item[parentField] ? item[parentField][parentDef.idAttribute] : null);
				}

				if (parentId) {
					var _ret2 = (function () {
						delete options.endpoint;
						var _options = {};
						backendParentId = parentId;

						if (DSUtils.isString(parentId)) {
							parentIdParts = parentId.split(':');
							backendParentId = parentIdParts[parentIdParts.length-1];
						}

						DSUtils.forOwn(options, function (value, key) {
							_options[key] = value;
						});

						return {
							v: DSUtils.makePath(parentDef.getEndpoint(parentId, DSUtils._(parentDef, _options)), backendParentId, endpoint)
						};
					})();

					if (typeof _ret2 === "object") return _ret2.v;
				} else {
					return endpoint;
				}
			}
		};
	}

}());
