
lychee.define('app.net.server.API').requires([
	'app.data.Filesystem'
]).exports(function(lychee, global, attachments) {

	const _Filesystem = lychee.import('app.data.Filesystem');
	const _CACHE      = new _Filesystem({ root: '/settings' });
	const _DEFAULTS   = {
		css: false,
		js:  false,
		img: false,
		vid: false
	};



	/*
	 * HELPERS
	 */

	const _get_headers = function(result) {

		let status = '406 Not Acceptable';
		if (result === undefined || result === true) {
			status = '200 OK';
		}


		let headers = {
			'status':                      status,
			'access-control-allow-origin': '*',
			'content-control':             'no-transform',
			'content-type':                'application/json',
			'expires':                     new Date(Date.now()).toUTCString(),
			'vary':                        'Accept-Encoding',
			'@binary':                     false
		};


		return headers;

	};

	const _read_settings = function(host, callback) {

		let path = '/' + host + '.json';
		let info = _CACHE.info(path);
		if (info !== null) {

			_CACHE.read(path, function(raw) {

				let data = null;
				if (raw !== null) {

					try {
						data = JSON.parse(raw.toString('utf8'));
					} catch (err) {
					}

				}

				if (data !== null) {

					callback(data);

				} else {

					callback(_DEFAULTS);

				}

			});

		} else {

			callback(_DEFAULTS);

		}

	};

	const _write_settings = function(host, data, callback) {

		let path   = '/' + host + '.json';
		let tmp    = Object.assign({}, data);
		let buffer = JSON.stringify(tmp, null, '\t');


		_CACHE.write(path, buffer, function(result) {
			callback(result);
		});

	};



	/*
	 * IMPLEMENTATION
	 */

	const Module = {

		/*
		 * MODULE API
		 */

		// deserialize: function(blob) {},

		serialize: function() {

			return {
				'reference': 'app.net.server.API',
				'arguments': []
			};

		},



		/*
		 * CUSTOM API
		 */

		receive: function(payload, headers) {

			payload = payload !== undefined     ? payload : null;
			headers = headers instanceof Object ? headers : {};


			let path   = null;
			let tunnel = this.tunnel;
			let host   = headers['host'];
			let url    = headers['url'];
			let method = headers['method'];


			if (payload instanceof Buffer) {

				try {
					payload = JSON.parse(payload.toString('utf8'));
				} catch (err) {
				}

			}


			let index = url.indexOf('/adblock/api');
			if (index !== -1) {
				path = url.substr(index + 12).trim();
			}


			if (path === '/settings' && method === 'GET') {

				_read_settings(host, function(data) {
					tunnel.send(JSON.stringify(data), _get_headers(data !== null));
				});

				return true;

			} else if (path === '/settings' && method === 'POST') {

				_write_settings(host, payload, function(result) {

					tunnel.send(JSON.stringify({
						message: 'OKAY'
					}), _get_headers(result));

				});

				return true;

			}


			return false;

		}

	};


	return Module;

});

