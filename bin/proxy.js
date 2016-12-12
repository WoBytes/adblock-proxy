#!/usr/bin/env node

const _ROOT  = require('path').resolve(__dirname, '../');
const lychee = require(_ROOT + '/node_modules/lycheejs/build/node/lychee.js')(_ROOT);



const _SETTINGS = (function() {

	const args   = process.argv.slice(2).filter(val => val !== '');
	const host   = args.find(val => /--([host]{4})/g.test(val));
	const port   = args.find(val => /--([port]{4})/g.test(val));
	const publik = args.find(val => /--([public]{4})/g.test(val));

	let settings = {
		'host':   '127.0.0.1',
		'port':   8080,
		'public': true
	};


	if (host !== undefined) {
		settings.host = host.split('=')[1];
	}

	if (port !== undefined) {

		let tmp = parseInt(port.split('=')[1], 10);
		if (!isNaN(tmp)) {
			settings.port = tmp;
		}

	}

	if (publik !== undefined) {
		settings['public'] = publik === 'true' ? true : false;
	}


	return settings;

})();



/*
 * ASSIMILATIONS
 */

[
	'source/net/Remote.js',
	'source/data/Filesystem.js',
	'source/data/Config.js',
	'source/net/server/File.js',
	'source/net/server/Request.js',
	'source/net/Server.js'
].forEach(function(path, p) {

	setTimeout(function() {
		lychee.assimilate(path);
	}, p * 100);

});



/*
 * INITIALIZATION
 */

setTimeout(function() {

	lychee.environment.init(function(sandbox) {

		const Server = lychee.import('app.net.Server');

		sandbox.MAIN = new Server({
			'host':   _SETTINGS['host'],
			'port':   _SETTINGS['port'],
			'public': _SETTINGS['public']
		});


		console.info('BOOTING UP THE PROXY');
		console.log('Please wait...');
		console.info('Connect to http://' + sandbox.MAIN.host + ':' + sandbox.MAIN.port);


		new lychee.Input({
			key:         true,
			keymodifier: true
		}).bind('escape', function() {

			console.warn('adblock-proxy: [ESC] pressed, exiting ...');
			process.exit(0);

		}, this);

	});

}, 2000);

