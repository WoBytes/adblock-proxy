
lychee.define('app.data.Config').tags({
	platform: 'node'
}).supports(function(lychee, global) {

	try {

		require('fs');
		require('path');

		return true;

	} catch(err) {
	}


	return false;

}).requires([
	'app.data.Filesystem'
]).exports(function(lychee, global, attachments) {

	const _Filesystem = lychee.import('app.data.Filesystem');
	const _fs         = require('fs');
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
				hosts: []
			};

		}


		fs.dir('/hosts', function(files) {

			files.forEach(function(file) {

				fs.read('/hosts/' + file, function(buffer) {
					_parse_hosts(cache.hosts, buffer);
				});

			});

		});


		// TODO: Load Adblock Plus files

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
			cache.push(host);
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

			return false;

		}

	};


	return Composite;

});

