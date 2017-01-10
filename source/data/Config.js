
lychee.define('app.data.Config').tags({
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
	const _CACHE      = {};
	const _ROOT       = lychee.ROOT.project;



	/*
	 * FEATURE DETECTION
	 */

	const _initialize = function() {

		let fs    = this.fs;
		let root  = this.root;
		let cache = _CACHE[root] || null;
		if (cache === null) {

			cache = _CACHE[root] = {
				hosts: [],
				rules: []
			};

		}


		fs.dir('/hosts', function(files) {

			files.filter(function(file) {
				return file.substr(0, 1) !== '.';
			}).forEach(function(file) {

				fs.read('/hosts/' + file, function(buffer) {
					_parse_hosts(cache, buffer);
				});

			});

		});

		fs.dir('/adblockplus', function(files) {

			files.filter(function(file) {
				return file.substr(0, 1) !== '.';
			}).forEach(function(file) {

				fs.read('/adblockplus/' + file, function(buffer) {
					_parse_adblockplus(cache, buffer);
				});

			});

		});

	};

	const _ADBLOCK_VARIABLES = [
		'$document',
		'$~document',
		'$domain=',
		'$~domain=',
		'$image',
		'$~image',
		'$media',
		'$object',
		'$object-subrequest',
		'$~object-subrequest',
		'$~other',
		'$popup',
		'$script',
		'$~script',
		'$stylesheet',
		'$~stylesheet',
		'$subdocument',
		'$~subdocument',
		'$third-party',
		'$~third-party',
		'$xmlhttprequest',
		'$~xmlhttprequest'
	];

	const _parse_adblockplus = function(cache, buffer) {

		buffer = buffer.toString('utf8').split('\n').map(function(line) {

			line = line.trim();

			for (let a = 0, al = _ADBLOCK_VARIABLES.length; a < al; a++) {

				let variable = _ADBLOCK_VARIABLES[a];
				if (line.includes(variable)) {
					return line.split(variable)[0];
				}

			}

			return line;

		});


		buffer.filter(function(line) {
			return line.indexOf('$') === -1 && line.indexOf('#') === -1 && line.indexOf('^') === -1;
		}).filter(function(line) {
			// Filter out Metadata "[ Whatever ]"
			// Filter out Comments "! Whatever"
			return /(\[|!)/g.test(line.substr(0, 1));
		}).forEach(function(line) {

			let data = {
				host:   null,
				path:   null,
				chunks: []
			};

			if (line.startsWith('@@||')) {

				let tmp1 = line.substr(4).split('/');
				let host = tmp1[0];
				let path = tmp1.slice(1).join('/');

				let i1 = host.indexOf('*');
				if (i1 !== -1) {
					host = host.substr(0, i1);
				}


				let i2 = path.indexOf('*');
				if (i2 !== -1) {

					let chunks = path.split('*').map(function(val) {
						return val.trim();
					}).filter(function(val) {
						return val.length > 0;
					});

					if (chunks.length > 1) {

						data.host   = host;
						data.chunks = chunks;

					} else {

						data.host   = host;
						data.path   = chunks[0];

					}

				} else {

					data.host = host;
					data.path = path;

				}


				cache.rules.push(data);

			} else if (line.startsWith('||')) {

				let tmp1 = line.substr(2).split('/');
				let host = tmp1[0];
				let path = tmp1.slice(1).join('/');

				data.host = host;
				data.path = path;

				cache.rules.push(data);

			} else if (line.startsWith('@@')) {

				let path = line.substr(2);


				let i1 = path.indexOf('*');
				if (i1 !== -1) {

					let chunks = path.split('*').map(function(val) {
						return val.trim();
					}).filter(function(val) {
						return val.length > 0;
					});

					if (chunks.length > 1) {
						data.chunks = chunks;
					} else {
						data.path = chunks[0];
					}

				} else {

					data.path = path;

				}


				cache.rules.push(data);

			} else {

				let i1 = line.indexOf('*');
				if (i1 !== -1) {

					let chunks = line.split('*').map(function(val) {
						return val.trim();
					}).filter(function(val) {
						return val.length > 0;
					});

					if (chunks.length > 1) {
						data.chunks = chunks;
					} else {
						data.path = chunks[0];
					}

					cache.rules.push(data);

				} else {

					data.chunks = [ line ];
					cache.rules.push(data);

				}

			}

		});


		cache.rules.forEach(function(rule) {

			if (rule.host !== null) {

				if (rule.host.endsWith('^')) {
					rule.host = rule.host.substr(0, rule.host.length - 1);
				}

			}

		});

	};

	const _parse_hosts = function(cache, buffer) {

		buffer.toString('utf8').split('\n').map(function(line) {
			return line.trim();
		}).filter(function(line) {
			return line.substr(0, 1) !== '#';
		}).map(function(line) {

			let tmp = line.split(/\s/g);
			if (tmp[0] === '127.0.0.1' || tmp[0] === '0.0.0.0') {
				return tmp[1];
			} else {
				return null;
			}

		}).filter(function(host) {
			return host !== null && host !== 'localhost';
		}).forEach(function(host) {
			cache.hosts.push(host);
		});

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


		_initialize.call(this);

	};


	Composite.prototype = {

		/*
		 * ENTITY API
		 */

		// deserialize: function(blob) {},

		serialize: function() {

			return {
				'constructor': 'app.data.Config',
				'arguments':   [ this.root.substr(_ROOT.length) ]
			};

		},



		/*
		 * CUSTOM API
		 */

		isBlockedHost: function(host) {

			let cache = _CACHE[this.root] || null;
			if (cache !== null) {
				return cache.hosts.indexOf(host) !== -1;
			}


			return false;

		},

		isBlockedLink: function(link) {

			let cache = _CACHE[this.root] || null;
			if (cache !== null) {

				let blocked = false;
				let host    = link.split('/')[2] || null;
				let path    = link.split('/').slice(3).join('/');


				if (host === null) {
					return true;
				}


				for (let r = 0, rl = cache.rules.length; r < rl; r++) {

					let rule = cache.rules[r];
					if (rule.host !== null) {

						if (host.startsWith(rule.host)) {

							if (rule.path !== null) {

								if (path.startsWith(rule.path)) {
									blocked = true;
									break;
								}

							} else if (rule.chunks.length > 0) {

								let chunksvalid = true;

								rule.chunks.forEach(function(val) {

									if (path.indexOf(val) === -1) {
										chunksvalid = false;
									}

								});

								if (chunksvalid === true) {
									blocked = true;
									break;
								}

							}

						}

					} else if (rule.host === null) {

						if (rule.path !== null) {

							if (path.startsWith(rule.path)) {
								blocked = true;
								break;
							}

						} else if (rule.chunks.length > 0) {

							let chunksvalid = true;

							rule.chunks.forEach(function(val) {

								if (path.indexOf(val) === -1) {
									chunksvalid = false;
								}

							});

							if (chunksvalid === true) {
								blocked = true;
								break;
							}

						}

					}

				}


				return blocked;

			}


			return false;

		}

	};


	return Composite;

});

