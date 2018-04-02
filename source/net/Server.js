
lychee.define('app.net.Server').requires([
	'app.net.Remote',
	'app.net.server.API',
	'app.net.server.PUBLIC',
	'app.net.server.FILE',
	'app.net.server.REQUEST'
]).includes([
	'lychee.net.Server'
]).exports(function(lychee, global, attachments) {

	const _API     = lychee.import('app.net.server.API');
	const _PUBLIC  = lychee.import('app.net.server.PUBLIC');
	const _FILE    = lychee.import('app.net.server.FILE');
	const _Remote  = lychee.import('app.net.Remote');
	const _REQUEST = lychee.import('app.net.server.REQUEST');
	const _Server  = lychee.import('lychee.net.Server');
	const _CODEC   = {
		encode: function(data) {
			return data;
		},
		decode: function(data) {
			return data;
		}
	};



	/*
	 * IMPLEMENTATION
	 */

	const Composite = function(data) {

		let settings = Object.assign({
			codec:  _CODEC,
			remote: _Remote,
			type:   _Server.TYPE.HTTP
		}, data);


		_Server.call(this, settings);

		settings = null;



		/*
		 * INITIALIZATION
		 */

		this.bind('connect', function(remote) {

			remote.bind('receive', function(payload, headers) {

				let method = headers['method'];
				if (method === 'OPTIONS') {

					this.send({}, {
						'status':                       '200 OK',
						'access-control-allow-headers': 'Content-Type',
						'access-control-allow-origin':  '*',
						'access-control-allow-methods': 'GET, POST',
						'access-control-max-age':       '3600'
					});

				} else {

					let url = headers['url'] || '';
					if (url.includes('/adblock/api')) {

						let api = _API.receive.call({ tunnel: this }, payload, headers);
						if (api === false) {

							this.send('{ "message": "Not allowed" }', {
								'status':                       '403 Forbidden',
								'access-control-allow-origin':  '*',
								'access-control-allow-methods': 'GET, POST',
								'content-type':                 'application/json'
							});

						}

					} else if (url.includes('/adblock/public')) {

						let publik = _PUBLIC.receive.call({ tunnel: this }, payload, headers);
						if (publik === false) {

							this.send('Invalid CSRF Request.', {
								'status':       '404 Not Found',
								'content-type': 'text/plain; charset=utf-8'
							});

						}

					} else {

						let file = _FILE.receive.call({ tunnel: this }, payload, headers);
						if (file === false) {

							let request = _REQUEST.receive.call({ tunnel: this }, payload, headers);
							if (request === false) {

								this.send('No Network Connection.', {
									'status':       '404 Not Found',
									'content-type': 'text/plain; charset=utf-8'
								});

							}

						}

					}

				}

			});

		}, this);


		this.connect();

	};


	Composite.prototype = {

		/*
		 * ENTITY API
		 */

		// deserialize: function(blob) {},

		serialize: function() {

			let data = _Server.prototype.serialize.call(this);
			data['constructor'] = 'app.net.Server';


			return data;

		}

	};


	return Composite;

});

