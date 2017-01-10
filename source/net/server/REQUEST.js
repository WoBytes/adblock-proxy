
lychee.define('app.net.server.REQUEST').tags({
	platform: 'node'
}).supports(function(lychee, global) {

	try {

		require('http');
		require('https');
		require('url');

		return true;

	} catch (err) {
	}


	return false;

}).requires([
	'app.data.Config',
	'app.data.Filter',
	'app.data.Filesystem',
	'app.net.server.PUBLIC'
]).exports(function(lychee, global, attachments) {

	const _Config     = lychee.import('app.data.Config');
	const _Filesystem = lychee.import('app.data.Filesystem');
	const _Filter     = lychee.import('app.data.Filter');
	const _http       = require('http');
	const _https      = require('https');
	const _url        = require('url');
	const _CACHE      = new _Filesystem('/cache');
	const _CONFIG     = new _Config('/config.d');
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

	const _request_https = function() {
	};

	const _request_http = function(url, callback) {

		let filtered = false;
		let options  = _url.parse(url);


		if (_CONFIG.isBlockedHost(options.host)) {

			filtered = true;

		} else if (_CONFIG.isBlockedLink(options.href)) {

			filtered = true;

		}


		if (filtered === false) {

			let request = _http.request(options, function(response) {

				let chunks = [];

				response.on('data', function(chunk) {
					chunks.push(chunk);
				});

				response.on('end', function() {
					callback(Buffer.concat(chunks));
				});

			});

			request.write('\n');
			request.end();

		} else {

			callback(null);

		}

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
				'reference': 'app.net.server.REQUEST',
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
			let proto  = null;


			if (url.substr(0, 8) === 'https://') {
				proto = 'https';
				url   = url.substr(8);
			} else if (url.substr(0, 7) === 'http://') {
				proto = 'http';
				url   = url.substr(7);
			}


			if (url.substr(-1) === '/') {

				path = '/' + url + 'index.html';

			} else {

				let tmp = url.split('.').pop();
				if (tmp.length > 4) {
					path = '/' + url + '/index.html';
				} else {
					path = '/' + url;
				}

			}


			info = _CACHE.info(path);


			if (proto === 'http') {

				_request_http('http://' + url, function(payload) {

					let mime = _MIME[url.split('.').pop()] || null;
					if (mime === null) {
						mime = _MIME['html'];
					}


					let headers = null;

					if (payload !== null) {

						_CACHE.write('/' + path, payload);


						if (mime === _MIME['html']) {
							payload = _filter_payload(path.split('/')[0], payload);
						}


						info    = _CACHE.info(path);
						headers = _get_headers(info, mime);

					} else {

						headers = {
							'status':       '404 Not Found',
							'content-type': 'text/plain; charset=utf-8'
						};

						payload = 'Request blocked by AdBlock Proxy.';

					}


					tunnel.send(payload, headers);

				});


				return true;

			} else if (proto === 'https') {

				// TODO: Request HTTPS

			}


			return false;

		}

	};


	return Module;

});

