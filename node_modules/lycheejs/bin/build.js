#!/usr/local/bin/lycheejs-helper env:node



/*
 * BOOTSTRAP
 */

const _fs   = require('fs');
const _path = require('path');
const _ROOT = _path.resolve(__dirname, '../');



/*
 * IMPLEMENTATION
 */

const _GENERIC_FILTERS = [
	[
		'#!/usr/local/bin/lycheejs-helper env:node',
		'#!/usr/bin/env node'
	], [
		'\tlet targets = _fs.readdirSync(_ROOT + \'/libraries/lychee/build\')',
		'\tlet targets = _fs.readdirSync(_ROOT + \'/build\')'
	], [
		'\tlet libraries = _fs.readdirSync(_ROOT + \'/libraries\')',
		'\tlet libraries = []'
	], [
		'\tlet projects = _fs.readdirSync(_ROOT + \'/projects\')',
		'\tlet projects = []'
	], [
		'\tlet profiles = _fs.readdirSync(_ROOT + \'/bin/harvester\')',
		'\tlet profiles = []'
	]
];

const _LYCHEE = 'const lychee = require(_ROOT + \'/libraries/lychee/build/node/core.js\')(_ROOT);';
const _build  = function(identifier) {

	let root = process.env.LYCHEEJS_ROOT || '/opt/lycheejs';
	let path = root + '/libraries/' + identifier + '/bin/' + identifier + '.js';
	let file = _fs.readFileSync(path).toString('utf8');

	file = file.split('\n').map(function(line, l) {

		if (line === _LYCHEE) {

			return line.replace('/libraries/lychee/build/node/core.js', '/build/node/' + identifier + '.js');

		} else {

			for (let f = 0, fl = _GENERIC_FILTERS.length; f < fl; f++) {

				let filter = _GENERIC_FILTERS[f];
				if (line.startsWith(filter[0])) {
					line = filter[1] + line.substr(filter[0].length);
					break;
				}

			}

		}

		return line;

	}).join('\n');


	let i1 = file.indexOf('if (_fs.existsSync(_ROOT');
	let i2 = file.indexOf('}', i1);

	if (i1 !== -1 && i2 !== -1) {
		file = file.substr(0, i1) + file.substr(i2 + 1);
	}


	_fs.writeFileSync(_ROOT + '/bin/' + identifier + '.js', file, 'utf8');

};


_build('breeder');
_build('fertilizer');
_build('harvester');
_build('strainer');

