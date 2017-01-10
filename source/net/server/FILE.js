
lychee.define('app.net.server.FILE').tags({
	platform: 'node'
}).supports(function(lychee, global) {

	try {

		require('url');

		return true;

	} catch (err) {
	}


	return false;
}).requires([
	'app.data.Filesystem',
	'app.data.Filter',
	'app.net.server.PUBLIC'
]).exports(function(lychee, global, attachments) {

	const _Filesystem = lychee.import('app.data.Filesystem');
	const _Filter     = lychee.import('app.data.Filter');
	const _CACHE      = new _Filesystem('/cache');
	const _FILTER     = new _Filter('/settings');
	const _PUBLIC     = lychee.import('app.net.server.PUBLIC');
	const _MIME       = {
		'default':  { binary: true,  type: 'application/octet-stream'      },
		'appcache': { binary: false, type: 'text/cache-manifest'           },
		'css':      { binary: false, type: 'text/css'                      },
		'env':      { binary: false, type: 'application/json'              },
		'eot':      { binary: false, type: 'application/vnd.ms-fontobject' },
		'gz':       { binary: true,  type: 'application/x-gzip'            },
		'fnt':      { binary: false, type: 'application/json'              },
		'html':     { binary: false, type: 'text/html'                     },
		'ico':      { binary: true,  type: 'image/x-icon'                  },
		'jpg':      { binary: true,  type: 'image/jpeg'                    },
		'js':       { binary: false, type: 'application/javascript'        },
		'json':     { binary: false, type: 'application/json'              },
		'md':       { binary: false, type: 'text/x-markdown'               },
		'mf':       { binary: false, type: 'text/cache-manifest'           },
		'mp3':      { binary: true,  type: 'audio/mp3'                     },
		'ogg':      { binary: true,  type: 'application/ogg'               },
		'pkg':      { binary: false, type: 'application/json'              },
		'store':    { binary: false, type: 'application/json'              },
		'tar':      { binary: true,  type: 'application/x-tar'             },
		'ttf':      { binary: false, type: 'application/x-font-truetype'   },
		'txt':      { binary: false, type: 'text/plain'                    },
		'png':      { binary: true,  type: 'image/png'                     },
		'svg':      { binary: true,  type: 'image/svg+xml'                 },
		'woff':     { binary: true,  type: 'application/font-woff'         },
		'woff2':    { binary: true,  type: 'application/font-woff'         },
		'xml':      { binary: false, type: 'text/xml'                      },
		'zip':      { binary: true,  type: 'application/zip'               }
	};



	/*
	 * HELPERS
	 */

	const _filter_payload = function(host, payload) {
		return _FILTER.process(host, _PUBLIC.get('/index.html'), payload);
	};

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



	/*
	 * IMPLEMENTATION
	 */

	let Module = {

		/*
		 * MODULE API
		 */

		serialize: function() {

			return {
				'reference': 'app.net.server.FILE',
				'arguments': []
			};

		},



		/*
		 * CUSTOM API
		 */

		receive: function(payload, headers) {

			let info   = null;
			let path   = null;
			let tunnel = this.tunnel;
			let url    = headers['url'];
			let mime   = _MIME[url.split('.').pop()] || null;


			if (url.substr(0, 8) === 'https://') {
				url = url.substr(8);
			} else if (url.substr(0, 7) === 'http://') {
				url = url.substr(7);
			}


			// Directory mode
			if (mime === null) {

				if (url.substr(-1) === '/') {
					path = '/' + url + 'index.html';
				} else {
					path = '/' + url + '/index.html';
				}

				mime = _MIME['html'];
				info = _CACHE.info(path);

				// File mode
			} else {

				path = '/' + url;
				info = _CACHE.info(path);

			}


			if (info !== null && info.type === 'file') {

				let timestamp = headers['if-modified-since'] || null;
				if (timestamp !== null) {

					let diff = info.mtime > new Date(timestamp);
					if (diff === false) {

						console.info('304 for ' + path);

						tunnel.send('', {
							'status':        '304 Not Modified',
							'last-modified': info.mtime.toUTCString()
						});

						return true;

					} else {

						console.warn('200 for ' + path);

						_CACHE.read(path, function(payload) {

							if (mime === _MIME['html']) {
								payload = _filter_payload(path.split('/')[1], payload);
							}

							tunnel.send(payload, _get_headers(info, mime));

						});

						return true;

					}

				} else {

					console.warn('200 for ' + path);

					_CACHE.read(path, function(payload) {

						if (mime === _MIME['html']) {
							payload = _filter_payload(path.split('/')[1], payload);
						}

						tunnel.send(payload, _get_headers(info, mime));

					});

					return true;

				}

			}


			return false;

		}

	};


	return Module;

});

