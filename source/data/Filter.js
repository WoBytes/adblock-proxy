
lychee.define('app.data.Filter').tags({
	platform: 'node'
}).supports(function(lychee, global) {

	try {

		require('path');

		return true;

	} catch (err) {
	}


	return false;

}).requires([
	'app.data.Filesystem'
]).exports(function(lychee, global, attachments) {

	const _Filesystem = lychee.import('app.data.Filesystem');
	const _path       = require('path');
	const _CACHE      = new _Filesystem('/settings');
	const _ROOT       = lychee.ROOT.project;



	/*
	 * HELPERS
	 */

	const _get_settings = function(host) {

		let info = _CACHE.info('/' + host + '.json');
		if (info !== null) {

			let raw  = _CACHE.read('/' + host + '.json');
			let data = null;

			try {
				data = JSON.parse(raw.toString('utf8'));
			} catch (err) {
			}

			if (data !== null) {
				return data.settings || null;
			}

		}


		return null;

	};



	/*
	 * IMPLEMENTATION
	 */

	let Composite = function(root) {

		root = typeof root === 'string' ? root : null;


		if (root !== null) {

			this.fs   = new _Filesystem(_path.normalize(root));
			this.root = _path.normalize(_ROOT + _path.normalize(root));

		} else {

			this.fs   = new _Filesystem('/');
			this.root = _ROOT;

		}

	};


	Composite.prototype = {

		/*
		 * ENTITY API
		 */

		// deserialize: function(blob) {},

		serialize: function() {

			return {
				'constructor': 'app.data.Filter',
				'arguments':   [ this.root.substr(_ROOT.length) ]
			};

		},



		/*
		 * CUSTOM API
		 */

		process: function(host, inject, payload) {

			if (inject === null) {
				inject = '<!DOCTYPE html><body>';
			}


			let controls = inject.toString('utf8');
			let filtered = payload.toString('utf8');
			let settings = _get_settings(host);


			// filtered = _filter_whatever(filtered);


			return new Buffer(controls + '\n' + filtered, 'utf8');

		}

	};


	return Composite;

});

