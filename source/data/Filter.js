
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

	const _DEFAULTS = {
		css: false,
		js:  false,
		img: false,
		vid: false
	};

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
				return Object.assign({}, _DEFAULTS, data);
			}

		}


		return _DEFAULTS;

	};

	const _get_head = function(content) {

		let i1 = content.indexOf('<head');
		let i2 = content.indexOf('</head', i1);
		let i3 = content.indexOf('>', i1);

		if (i1 !== -1 && i2 !== -1) {
			return content.substr(i3 + 1, i2 - i3 - 1).split('\n');
		}

		// TODO: Filter returned array and allow only <script>
		// and <link rel="stylesheet">
		// AND <style>...</style>

		return [];

	};

	const _get_body = function(content) {

		let i1 = content.indexOf('<body');
		let i2 = content.indexOf('</body>', i1);
		let i3 = content.indexOf('>', i1);

		if (i1 !== -1 && i2 !== -1) {
			return content.substr(i3 + 1, i2 - i3 - 1).split('\n');
		}

		return [];

	};

	const _filter = function(settings, data) {

		let last_css = -1;
		let last_js  = -1;
		let last_img = -1;
		let last_vid = -1;


		if (settings.css === false) {

			data.forEach(function(line, l) {

				let i1 = line.indexOf('<link');
				let i2 = line.indexOf('>', i1);

				while (i1 !== -1 && i2 !== -1) {

					line = line.substr(0, i1) + line.substr(i2 + 9);
					i1   = line.indexOf('<link');
					i2   = line.indexOf('>', i1);

				}

				data[l] = line;

			});


			data.forEach(function(line, l) {

				let i1 = line.indexOf('<style');
				let i2 = line.indexOf('</style>', i1);

				while (i1 !== -1 && i2 !== -1) {

					line = line.substr(0, i1) + line.substr(i2 + 8);
					i1   = line.indexOf('<style');
					i2   = line.indexOf('</style>', i1);

				}

				if (i1 !== -1) {

					line = line.substr(0, i1);
					last_css = l;

				} else if (i2 !== -1) {

					line = line.substr(i2 + 9);
					last_css = -1;

				} else if (last_css !== -1) {

					line = '';

				}

				data[l] = line;

			});

		}


		// Filter JS
		if (settings.js === false) {

			data.forEach(function(line, l) {

				let i1 = line.indexOf('<script');
				let i2 = line.indexOf('</script>', i1);

				while (i1 !== -1 && i2 !== -1) {

					line = line.substr(0, i1) + line.substr(i2 + 9);
					i1   = line.indexOf('<script');
					i2   = line.indexOf('</script>');

				}

				if (i1 !== -1) {

					line = line.substr(0, i1);
					last_js = l;

				} else if (i2 !== -1) {

					line = line.substr(i2 + 9);
					last_js = -1;

				} else if (last_js !== -1) {

					line = '';

				}

				data[l] = line;

			});

		}


		// Filter Images
		if (settings.img === false) {

			data.forEach(function(line, l) {

				let i1 = line.indexOf('<img');
				let i2 = line.indexOf('>', i1);

				while (i1 !== -1 && i2 !== -1) {

					line = line.substr(0, i1) + line.substr(i2 + 1);
					i1   = line.indexOf('<img');
					i2   = line.indexOf('>', i1);

				}


				i1 = line.indexOf('<svg');
				i2 = line.indexOf('</svg>', i1);

				while (i1 !== -1 && i2 !== -1) {

					line = line.substr(0, i1) + line.substr(i2 + 6);
					i1   = line.indexOf('<svg');
					i2   = line.indexOf('</svg>', i1);

				}

				if (i1 !== -1) {

					line = line.substr(0, i1);
					last_img = l;

				} else if (i2 !== -1) {

					line = line.substr(i2 + 8);
					last_img = -1;

				} else if (last_img !== -1) {

					line = '';

				}


				data[l] = line;

			});

		}


		// Filter Videos
		if (settings.vid === false) {

			data.forEach(function(line, l) {

				let i1 = line.indexOf('<video');
				let i2 = line.indexOf('</video>', i1);

				while (i1 !== -1 && i2 !== -1) {

					line = line.substr(0, i1) + line.substr(i2 + 8);
					i1   = line.indexOf('<video');
					i2   = line.indexOf('</video>', i1);

				}

				if (i1 !== -1) {

					line = line.substr(0, i1);
					last_vid = l;

				} else if (i2 !== -1) {

					line = line.substr(i2 + 8);
					last_vid = -1;

				} else if (last_vid !== -1) {

					line = '';

				}


				data[l] = line;

			});

		}

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


			let template = inject.toString('utf8');
			let settings = _get_settings(host);

			let head = _get_head(payload.toString('utf8'));
			let body = _get_body(payload.toString('utf8'));


			_filter(settings, head);
			_filter(settings, body);


			head = head.filter(line => line.trim().length > 0);
			body = body.filter(line => line.trim().length > 0);


			template = template.replace('<!-- HEAD -->', head.join('\n'));
			template = template.replace('<!-- BODY -->', body.join('\n'));


			return new Buffer(template, 'utf8');

		}

	};


	return Composite;

});

