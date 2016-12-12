
lychee.define('app.net.Server').requires([
	'app.net.Remote',
	'app.net.server.File',
	'app.net.server.Request'
]).includes([
	'lychee.net.Server'
]).exports(function(lychee, global, attachments) {

	const _File    = lychee.import('app.net.server.File');
	const _Remote  = lychee.import('app.net.Remote');
	const _Request = lychee.import('app.net.server.Request');
	const _Server  = lychee.import('lychee.net.Server');
	const _CODEC   = {
		encode: function(data) { return data; },
		decode: function(data) { return data; }
	};



	/*
	 * IMPLEMENTATION
	 */

	let Composite = function(data) {

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
						'access-control-allow-origin':  'http://localhost',
						'access-control-allow-methods': 'GET, POST',
						'access-control-max-age':       '3600'
					});

				} else {

					let file = _File.receive.call({ tunnel: this }, payload, headers);
					if (file === false) {

						let request = _Request.receive.call({ tunnel: this }, payload, headers);
						if (request === false) {

							this.send('No Network Connection.', {
								'status':       '404 Not Found',
								'content-type': 'text/plain; charset=utf-8'
							});

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

