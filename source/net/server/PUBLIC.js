
lychee.define('app.net.server.PUBLIC').requires([
	'app.data.Filesystem'
]).exports(function(lychee, global, attachments) {

	const _Filesystem = lychee.import('app.data.Filesystem');
	const _CACHE      = new _Filesystem({ root: '/public' });
	const _PAYLOADS   = {};
	const _MIME       = {
		'default': { binary: true,  type: 'application/octet-stream' },
		'css':     { binary: false, type: 'text/css'                 },
		'html':    { binary: false, type: 'text/html'                },
		'js':      { binary: false, type: 'application/javascript'   }
	};



	/*
	 * HELPERS
	 */

	const _get_headers = function(info, mime) {

		let headers = {
			'status':          '200 OK',
			'e-tag':           '"' + info.length + '-' + Date.parse(info.mtime) + '"',
			'last-modified':   new Date(info.mtime).toUTCString(),
			'content-control': 'no-transform',
			'content-type':    mime.type,
			'expires':         new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toUTCString(),
			'vary':            'Accept-Encoding',
			'@binary':         mime.binary
		};


		if (mime.type.substr(0, 4) === 'text') {
			headers['content-type'] = mime.type + '; charset=utf-8';
		}


		return headers;

	};

	const _replace_server = function(payload) {

		let main = lychee.import('MAIN');
		if (main !== null && payload !== null) {

			let host = main.host;
			let port = main.port;

			if (host === null) {
				host = 'localhost';
			}

			let url = host + ':' + port;
			if (url !== '127.0.0.1:8080' && url !== 'localhost:8080') {
				let data = payload.toString('utf8');
				data = data.split('localhost:8080').join(url);
				payload = new Buffer(data, 'utf8');
			}

		}

		return payload;

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
				'reference': 'app.net.server.PUBLIC',
				'arguments': []
			};

		},



		/*
		 * CUSTOM API
		 */

		get: function(url) {

			url = typeof url === 'string' ? url : '';


			let path = url;
			if (path.startsWith('/public')) {
				path = path.substr(7);
			}

			let payload = _PAYLOADS[path] || null;
			if (payload === null) {
				payload = _PAYLOADS[path] = _replace_server(_CACHE.read(path));
			}

			return payload;

		},

		receive: function(payload, headers) {

			let info   = null;
			let path   = null;
			let tunnel = this.tunnel;
			let url    = headers['url'];
			let mime   = _MIME[url.split('.').pop()] || _MIME['default'];

			let index = url.indexOf('/adblock/public');
			if (index !== -1) {
				path = url.substr(index + 15);
				info = _CACHE.info(path);
			}


			if (info !== null && info.type === 'file') {

				_CACHE.read(path, function(payload) {
					payload = _replace_server(payload);
					tunnel.send(payload, _get_headers(info, mime));
				});

				return true;

			}


			return false;

		}

	};


	return Module;

});

