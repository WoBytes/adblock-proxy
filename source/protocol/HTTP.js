
(function(global) {

	/*
	 * CACHE AND STRUCTS
	 */

	var _cache = {};



	/*
	 * HELPERS
	 */

	var _http = require('http');
	var _url  = require('url');



	/*
	 * LIBRARY INTEGRATION
	 */

	module.exports = {

		create: function(host, port, callback, scope) {

			if (_cache[host + ':' + port] !== undefined) return false;


			host     = typeof host === 'string'       ? host       : null;
			port     = typeof port === 'number'       ? (port | 0) : null;
			callback = typeof callback === 'function' ? callback   : function() { return false; };
			scope    = typeof scope !== 'undefined'   ? scope      : this;


			if (port !== null) {

				var server = new _http.Server();

				server.on('request', function(request, response) {


					var options = _url.parse(request.url);

					var data = {
						protocol: (options.protocol || 'http').split(':')[0],
						host:     options.host,
						port:     options.port,
						path:     options.path,
						href:     options.href
					};


					var isblocked = callback.call(scope, data);
					if (isblocked === true) {

						var header = {
							'Content-Length': 24
						};

						response.writeHead(410, header);
						response.write('Blocked by AdBlock Proxy');
						response.end();

					} else {

						request.pause();


						var connector = _http.request(options, function(targetresponse) {

							targetresponse.pause();
							response.writeHead(targetresponse.statusCode, targetresponse.headers);
							targetresponse.pipe(response);
							targetresponse.resume();

						});


						// TODO: Evaluate if a timeout of 500ms is fair enough
						connector.on('socket', function(socket) {
							socket.setTimeout(500);
						});

						connector.on('error', function(err) {

							var header = {
								'Content-Length': 15
							};

							response.writeHead(504, header);
							response.write('Gateway Timeout');
							response.end();

						});

						connector.on('timeout', function() {

							var header = {
								'Content-Length': 15
							};

							response.writeHead(504, header);
							response.write('Gateway Timeout');
							response.end();

						});

						request.pipe(connector);
						request.resume();

					}


					// GC hints
					options   = null;
					data      = null;
					isblocked = null;
					connector = null;

				});

				server.on('error', function(err) {

					var code = err.code;
					if (code === 'EADDRNOTAVAIL') {

						console.error('Error: ' + host + ':' + port + ' is not assigned to this machine.');
						process.exit(253);

					} else if (code === 'EADDRINUSE') {

						console.error('Error: ' + host + ':' + port + ' is already in use by another application.');
						process.exit(253);

					} else if (code === 'EACCES') {

						console.error('Error: ' + host + ':' + port + ' is reserved for root. Please use a port higher than 1024.');
						process.exit(253);

					} else {

						console.error('Error: ' + err.toString());

					}

				});


				if (host !== null) {
					server.listen(port, host);
				} else {
					server.listen(port);
				}


				_cache[host + ':' + port] = server;


				return true;

			}


			return false;

		},

		destroy: function(host, port) {

			var server = _cache[host + ':' + port] || null;
			if (server !== null) {

				delete _cache[host + ':' + port];
				server.close();

				return true;

			}


			return false;

		}

	};

})(this);

