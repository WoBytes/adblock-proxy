
(function(global) {

	if (typeof lychee !== 'undefined') {
		return;
	}



	const _INTERFACEOF_CACHE = {};



	/*
	 * POLYFILLS
	 */

	if (typeof Array.prototype.unique !== 'function') {

		Array.prototype.unique = function() {

			if (this === null || this === undefined) {
				throw new TypeError('Array.prototype.unique called on null or undefined');
			}


			let clone  = [];
			let list   = Object(this);
			let length = this.length >>> 0;
			let value;

			for (let i = 0; i < length; i++) {

				value = list[i];

				if (clone.indexOf(value) === -1) {
					clone.push(value);
				}
			}

			return clone;

		};

	}

	if (typeof Boolean.prototype.toJSON !== 'function') {

		Boolean.prototype.toJSON = function() {
			return this.valueOf();
		};

	}

	if (typeof Date.prototype.toJSON !== 'function') {

		let _format_date = function(n) {
			return n < 10 ? '0' + n : '' + n;
		};

		Date.prototype.toJSON = function() {

			if (isFinite(this.valueOf()) === true) {

				let str = '';

				str += this.getUTCFullYear()                + '-';
				str += _format_date(this.getUTCMonth() + 1) + '-';
				str += _format_date(this.getUTCDate())      + 'T';
				str += _format_date(this.getUTCHours())     + ':';
				str += _format_date(this.getUTCMinutes())   + ':';
				str += _format_date(this.getUTCSeconds())   + 'Z';

				return str;

			}


			return null;

		};

	}

	if (typeof Number.prototype.toJSON !== 'function') {

		Number.prototype.toJSON = function() {
			return this.valueOf();
		};

	}

	if (typeof Object.filter !== 'function') {

		Object.filter = function(object, predicate/*, thisArg */) {

			if (object !== Object(object)) {
				throw new TypeError('Object.filter called on a non-object');
			}

			if (typeof predicate !== 'function') {
				throw new TypeError('predicate must be a function');
			}


			let props   = [];
			let values  = [];
			let thisArg = arguments.length >= 3 ? arguments[2] : void 0;

			for (let prop in object) {

				let value = object[prop];

				if (Object.prototype.hasOwnProperty.call(object, prop)) {

					if (predicate.call(thisArg, value, prop, object)) {
						props.push(prop);
						values.push(value);
					}

				}

			}


			let filtered = {};

			for (let i = 0; i < props.length; i++) {
				filtered[props[i]] = values[i];
			}

			return filtered;

		};

	}

	if (typeof Object.find !== 'function') {

		Object.find = function(object, predicate/*, thisArg */) {

			if (object !== Object(object)) {
				throw new TypeError('Object.find called on a non-object');
			}

			if (typeof predicate !== 'function') {
				throw new TypeError('predicate must be a function');
			}


			let thisArg = arguments.length >= 3 ? arguments[2] : void 0;

			for (let prop in object) {

				let value = object[prop];

				if (Object.prototype.hasOwnProperty.call(object, prop)) {

					if (predicate.call(thisArg, value, prop, object)) {
						return value;
					}

				}

			}

			return undefined;

		};

	}

	if (typeof Object.map !== 'function') {

		Object.map = function(object, predicate/*, thisArg */) {

			if (object !== Object(object)) {
				throw new TypeError('Object.map called on a non-object');
			}

			if (typeof predicate !== 'function') {
				throw new TypeError('predicate must be a function');
			}


			let clone   = {};
			let keys    = Object.keys(object).sort();
			let length  = keys.length >>> 0;
			let thisArg = arguments.length >= 3 ? arguments[2] : void 0;
			let key;
			let value;
			let tmp;


			for (let k = 0; k < length; k++) {

				key   = keys[k];
				value = object[key];
				tmp   = predicate.call(thisArg, value, key);

				if (tmp !== undefined) {
					clone[key] = tmp;
				}

			}


			return clone;

		};

	}

	if (typeof Object.sort !== 'function') {

		Object.sort = function(object) {

			if (object !== Object(object)) {
				throw new TypeError('Object.sort called on a non-object');
			}


			let clone  = {};
			let keys   = Object.keys(object).sort();
			let length = keys.length >>> 0;
			let key;
			let value;

			for (let k = 0; k < length; k++) {

				key   = keys[k];
				value = object[key];

				if (value instanceof Array) {

					clone[key] = value.map(function(element) {

						if (element instanceof Array) {
							return element;
						} else if (element instanceof Object) {
							return Object.sort(element);
						} else {
							return element;
						}

					});

				} else if (value instanceof Object) {

					clone[key] = Object.sort(value);

				} else {

					clone[key] = value;

				}

			}

			return clone;

		};

	}

	if (typeof Object.values !== 'function') {

		Object.values = function(object) {

			if (object !== Object(object)) {
				throw new TypeError('Object.values called on a non-object');
			}


			let values = [];

			for (let prop in object) {

				if (Object.prototype.hasOwnProperty.call(object, prop)) {
					values.push(object[prop]);
				}

			}

			return values;

		};

	}

	if (typeof String.prototype.replaceObject !== 'function') {

		String.prototype.replaceObject = function(object) {

			if (object !== Object(object)) {
				throw new TypeError('String.prototype.replaceObject called on a non-object');
			}


			let clone  = '' + this;
			let keys   = Object.keys(object);
			let values = Object.values(object);


			for (let k = 0, kl = keys.length; k < kl; k++) {

				let key   = keys[k];
				let value = values[k];

				if (value instanceof Array) {
					value = JSON.stringify(value);
				} else if (value instanceof Object) {
					value = JSON.stringify(value);
				} else if (typeof value !== 'string') {
					value = '' + value;
				}


				let pointers = [];
				let pointer  = clone.indexOf('${' + key + '}');

				while (pointer !== -1) {
					pointers.push(pointer);
					pointer = clone.indexOf('${' + key + '}', pointer + 1);
				}


				let offset = 0;

				for (let p = 0, pl = pointers.length; p < pl; p++) {

					let index = pointers[p];

					clone   = clone.substr(0, index + offset) + value + clone.substr(index + offset + key.length + 3);
					offset += (value.length - (key.length + 3));

				}

			}


			return clone;

		};

	}

	if (typeof String.prototype.toJSON !== 'function') {

		String.prototype.toJSON = function() {
			return this.valueOf();
		};

	}



	/*
	 * HELPERS
	 */

	let _environment = null;

	const _bootstrap_environment = function() {

		if (_environment === null) {

			_environment = new lychee.Environment({
				debug: false
			});

		}


		if (this.environment === null) {
			this.setEnvironment(_environment);
		}

	};

	const _resolve_reference = function(identifier) {

		let pointer = this;

		let ns = identifier.split('.');
		for (let n = 0, l = ns.length; n < l; n++) {

			let name = ns[n];

			if (pointer[name] !== undefined) {
				pointer = pointer[name];
			} else {
				pointer = null;
				break;
			}

		}

		return pointer;

	};



	/*
	 * IMPLEMENTATION
	 */

	const Module = {

		debug: true,

		environment: _environment,

		ENVIRONMENTS: {},

		ROOT: {
			lychee:  '/opt/lycheejs',
			project: null
		},

		VERSION: "2017-Q3",



		/*
		 * LIBRARY API
		 */

		diff: function(aobject, bobject) {

			aobject = aobject !== undefined ? aobject : undefined;
			bobject = bobject !== undefined ? bobject : undefined;


			if (aobject instanceof Object && bobject instanceof Object) {

				let akeys = Object.keys(aobject);
				let bkeys = Object.keys(bobject);

				if (akeys.length !== bkeys.length) {
					return true;
				}


				for (let a = 0, al = akeys.length; a < al; a++) {

					let key = akeys[a];

					if (bobject[key] !== undefined) {

						if (aobject[key] !== null && bobject[key] !== null) {

							if (aobject[key] instanceof Object && bobject[key] instanceof Object) {

								if (Module.diff(aobject[key], bobject[key]) === true) {

									// Allows aobject[key].builds = {} and bobject[key].builds = { stuff: {}}
									if (Object.keys(aobject[key]).length > 0) {
										return true;
									}

								}

							} else if (typeof aobject[key] !== typeof bobject[key]) {
								return true;
							}

						}

					} else {
						return true;
					}

				}

			} else if (aobject !== bobject) {

				return true;

			}


			return false;

		},

		enumof: function(template, value) {

			template = template instanceof Object ? template : null;
			value    = typeof value === 'number'  ? value    : null;


			if (template !== null && value !== null) {

				let valid = false;

				for (let val in template) {

					if (value === template[val]) {
						valid = true;
						break;
					}

				}

				return valid;

			}


			return false;

		},

		assignsafe: function(target) {

			target = target instanceof Object ? target : {};


			for (let a = 1, al = arguments.length; a < al; a++) {

				let object = arguments[a];
				if (object) {

					for (let prop in object) {

						if (object.hasOwnProperty(prop) === true) {

							let tvalue = target[prop];
							let ovalue = object[prop];
							if (tvalue instanceof Array && ovalue instanceof Array) {

								Module.assignsafe(target[prop], object[prop]);

							} else if (tvalue instanceof Object && ovalue instanceof Object) {

								Module.assignsafe(target[prop], object[prop]);

							} else if (typeof tvalue === typeof ovalue) {

								target[prop] = object[prop];

							}

						}

					}

				}

			}


			return target;

		},

		assignunlink: function(target) {

			target = target instanceof Object ? target : {};


			for (let a = 1, al = arguments.length; a < al; a++) {

				let object = arguments[a];
				if (object) {

					for (let prop in object) {

						if (object.hasOwnProperty(prop) === true) {

							let tvalue = target[prop];
							let ovalue = object[prop];
							if (tvalue instanceof Array && ovalue instanceof Array) {
								target[prop] = [];
								Module.assignunlink(target[prop], object[prop]);
							} else if (tvalue instanceof Object && ovalue instanceof Object) {
								target[prop] = {};
								Module.assignunlink(target[prop], object[prop]);
							} else {
								target[prop] = object[prop];
							}

						}

					}

				}

			}


			return target;

		},

		interfaceof: function(template, instance) {

			template = template !== undefined ? template : null;
			instance = instance !== undefined ? instance : null;


			if (template !== null && instance !== null) {

				let tname    = template.displayName;
				let iname    = instance.displayName;
				let hashable = typeof tname === 'string' && typeof iname === 'string';
				let hashmap  = _INTERFACEOF_CACHE;
				let valid    = false;


				// 0. Quick validation for identical constructors
				if (hashable === true) {

					if (hashmap[tname] !== undefined && hashmap[tname][iname] !== undefined) {

						return hashmap[tname][iname];

					} else if (tname === iname) {

						if (hashmap[tname] === undefined) {
							hashmap[tname] = {};
						}

						hashmap[tname][iname] = true;

						return hashmap[tname][iname];

					}

				}


				// 1. Interface validation on Template
				if (template instanceof Function && template.prototype instanceof Object && instance instanceof Function && instance.prototype instanceof Object) {

					valid = true;

					for (let method in template.prototype) {

						if (typeof template.prototype[method] !== typeof instance.prototype[method]) {
							valid = false;
							break;
						}

					}


				// 2. Interface validation on Instance
				} else if (template instanceof Function && template.prototype instanceof Object && instance instanceof Object) {

					valid = true;

					for (let method in template.prototype) {

						if (typeof template.prototype[method] !== typeof instance[method]) {
							valid = false;
							break;
						}

					}


				// 3. Interface validation on Struct
				} else if (template instanceof Object && instance instanceof Object) {

					valid = true;

					for (let property in template) {

						if (template.hasOwnProperty(property) && instance.hasOwnProperty(property)) {

							if (typeof template[property] !== typeof instance[property]) {
								valid = false;
								break;
							}

						}

					}

				}


				if (hashable === true) {

					if (hashmap[tname] === undefined) {
						hashmap[tname] = {};
					}

					hashmap[tname][iname] = valid;

				}


				return valid;

			}


			return false;

		},



		/*
		 * ENTITY API
		 */

		deserialize: function(data) {

			data = data instanceof Object ? data : null;


			try {
				data = JSON.parse(JSON.stringify(data));
			} catch (err) {
				data = null;
			}


			if (data !== null) {

				let instance = null;
				let scope    = (this.environment !== null ? this.environment.global : global);


				if (typeof data.reference === 'string') {

					let resolved_module = _resolve_reference.call(scope, data.reference);
					if (typeof resolved_module === 'object') {
						instance = resolved_module;
					}

				} else if (typeof data.constructor === 'string' && data.arguments instanceof Array) {

					let resolved_class = _resolve_reference.call(scope, data.constructor);
					if (typeof resolved_class === 'function') {

						let bindargs = [].splice.call(data.arguments, 0).map(function(value) {

							if (typeof value === 'string' && value.charAt(0) === '#') {

								if (lychee.debug === true) {
									console.log('lychee.deserialize: Injecting "' + value + '" from global');
								}

								let resolved = _resolve_reference.call(scope, value.substr(1));
								if (resolved !== null) {
									value = resolved;
								}

							}

							return value;

						});


						bindargs.reverse();
						bindargs.push(resolved_class);
						bindargs.reverse();


						instance = new (
							resolved_class.bind.apply(
								resolved_class,
								bindargs
							)
						)();

					}

				} else if (data instanceof Object) {

					instance = data;

				}


				if (instance !== null) {

					// High-Level ENTITY API
					if (typeof instance.deserialize === 'function') {

						let blob = data.blob || null;
						if (blob !== null) {
							instance.deserialize(blob);
						}

					// Low-Level ASSET API
					} else if (typeof instance.load === 'function') {
						instance.load();
					}


					return instance;

				} else {

					console.info('lychee.deserialize: Require ' + (data.reference || data.constructor) + ' to deserialize it.');

				}

			}


			return null;

		},

		serialize: function(definition) {

			definition = definition !== undefined ? definition : null;


			let data = null;

			if (definition !== null) {

				if (typeof definition === 'object') {

					if (typeof definition.serialize === 'function') {

						data = definition.serialize();

					} else if (typeof definition.displayName !== 'undefined') {

						if (definition.prototype instanceof Object) {
							console.info('lychee.deserialize: Define ' + (definition.displayName) + '.prototype.serialize() to serialize it.');
						} else {
							console.info('lychee.deserialize: Define ' + (definition.displayName) + '.serialize() to serialize it.');
						}

					} else {

						try {
							data = JSON.parse(JSON.stringify(definition));
						} catch (err) {
							data = null;
						}

					}

				} else if (typeof definition === 'function') {

					data = definition.toString();

				}

			}


			return data;

		},



		/*
		 * CUSTOM API
		 */

		assimilate: function(target) {

			target = typeof target === 'string' ? target : null;


			if (target !== null) {

				_bootstrap_environment.call(this);


				let that = this;


				// XXX: First sandboxed hierarchy
				if (that.environment.sandbox === true) {
					that = that.environment.global.lychee;
				}

				// XXX: Second sandboxed hierarchy
				if (that.environment.sandbox === true) {
					that = that.environment.global.lychee;
				}

				// XXX: Third sandboxed hierarchy
				if (that.environment.sandbox === true) {
					that = that.environment.global.lychee;
				}


				let asset = new lychee.Asset(target, null, false);
				if (asset !== null) {
					asset.load();
				}


				return asset;

			} else {

				console.warn('lychee.assimilate: Invalid target');
				console.info('lychee.assimilate: Use lychee.assimilate(target) where target is a path to an Asset');

			}


			return null;

		},

		define: function(identifier) {

			identifier = typeof identifier === 'string' ? identifier : null;


			if (identifier !== null) {

				_bootstrap_environment.call(this);


				let that       = this;
				let definition = new lychee.Definition({
					id: identifier
				});


				// XXX: First sandboxed hierarchy
				if (that.environment.sandbox === true) {
					that = that.environment.global.lychee;
				}

				// XXX: Second sandboxed hierarchy
				if (that.environment.sandbox === true) {
					that = that.environment.global.lychee;
				}

				// XXX: Third sandboxed hierarchy
				if (that.environment.sandbox === true) {
					that = that.environment.global.lychee;
				}


				definition.exports = function(callback) {

					lychee.Definition.prototype.exports.call(this, callback);
					that.environment.define(this, false);

				};


				return definition;

			} else {

				console.warn('lychee.define: Invalid identifier');
				console.info('lychee.define: Use lychee.define(id).exports(closure)');

			}


			return null;

		},

		import: function(reference) {

			reference = typeof reference === 'string' ? reference : null;


			if (reference !== null) {

				_bootstrap_environment.call(this);


				let instance = null;
				let that     = this;

				// XXX: First sandboxed hierarchy
				if (that.environment.sandbox === true) {
					that = that.environment.global.lychee;
				}

				// XXX: Second sandboxed hierarchy
				if (that.environment.sandbox === true) {
					that = that.environment.global.lychee;
				}

				// XXX: Third sandboxed hierarchy
				if (that.environment.sandbox === true) {
					that = that.environment.global.lychee;
				}


				let resolved_module = _resolve_reference.call(that.environment.global, reference);
				if (resolved_module !== null) {
					instance = resolved_module;
				}


				if (instance === null) {
					console.info('lychee.deserialize: Require ' + (reference) + ' to import it.');
				}


				return instance;

			}


			return null;

		},

		envinit: function(environment, profile) {

			let message = environment !== null;

			environment = environment instanceof lychee.Environment ? environment : null;
			profile     = profile instanceof Object                 ? profile     : {};


			_bootstrap_environment.call(this);


			if (environment !== null) {

				let code        = '\n';
				let id          = (lychee.ROOT.project || '').substr((lychee.ROOT.lychee || '').length) + '/custom';
				let env_profile = Object.assign({}, environment.profile, profile);


				if (environment.id.substr(0, 19) === 'lychee-Environment-') {
					environment.setId(id);
				}


				if (_environment !== null) {

					Object.values(_environment.definitions).forEach(function(definition) {
						environment.define(definition, true);
					});

				}


				code += '\n\n';
				code += 'if (sandbox === null) {\n';
				code += '\tconsole.error("lychee: envinit() failed.");\n';
				code += '\treturn;\n';
				code += '}\n';
				code += '\n\n';


				code += [ 'lychee' ].concat(environment.packages.map(function(pkg) {
					return pkg.id;
				})).map(function(lib) {
					return 'let ' + lib + ' = sandbox.' + lib + ';';
				}).join('\n');

				code += '\n\n';
				code += 'sandbox.MAIN = new ' + environment.build + '(' + JSON.stringify(env_profile) + ');\n';
				code += '\n\n';
				code += 'if (typeof sandbox.MAIN.init === \'function\') {\n';
				code += '\tsandbox.MAIN.init();\n';
				code += '}\n';


				lychee.setEnvironment(environment);


				let result = environment.init(new Function('sandbox', code));
				if (result === true) {
					return true;
				}

			} else if (message === true) {

				console.warn('lychee.envinit: Invalid environment');
				console.info('lychee.envinit: Use lychee.envinit(env, profile) where env is a lychee.Environment instance');

			}


			return false;

		},

		pkginit: function(identifier, settings, profile) {

			identifier = typeof identifier === 'string' ? identifier : null;
			settings   = settings instanceof Object     ? settings   : {};
			profile    = profile instanceof Object      ? profile    : {};


			_bootstrap_environment.call(this);


			if (identifier !== null) {

				let config = new Config('./lychee.pkg');

				config.onload = function() {

					let buffer = this.buffer || null;
					if (buffer instanceof Object) {

						if (buffer.build instanceof Object && buffer.build.environments instanceof Object) {

							let data = buffer.build.environments[identifier] || null;
							if (data instanceof Object) {

								let code         = '\n';
								let env_settings = Object.assign({
									id: lychee.ROOT.project + '/' + identifier.split('/').pop()
								}, data, settings);
								let env_profile  = Object.assign({}, data.profile, profile);
								let environment  = new lychee.Environment(env_settings);


								if (_environment !== null) {

									Object.values(_environment.definitions).forEach(function(definition) {
										environment.define(definition, true);
									});

								}


								code += '\n\n';
								code += 'if (sandbox === null) {\n';
								code += '\tconsole.error("lychee: pkginit() failed.");\n';
								code += '\treturn;\n';
								code += '}\n';
								code += '\n\n';

								code += [ 'lychee' ].concat(env_settings.packages.map(function(pkg) {
									return pkg.id;
								})).map(function(lib) {
									return 'let ' + lib + ' = sandbox.' + lib + ';';
								}).join('\n');

								code += '\n\n';
								code += 'sandbox.MAIN = new ' + env_settings.build + '(' + JSON.stringify(env_profile) + ');\n';
								code += '\n\n';
								code += 'if (typeof sandbox.MAIN.init === \'function\') {\n';
								code += '\tsandbox.MAIN.init();\n';
								code += '}\n';


								lychee.setEnvironment(environment);
								environment.init(new Function('sandbox', code));

							} else {

								console.warn('lychee.pkginit: Invalid settings for "' + identifier + '" in lychee.pkg.');
								console.info('lychee.pkginit: Insert settings at "/build/environments/' + identifier + '" in lychee.pkg.');

							}

						} else {

							console.warn('lychee.pkginit: Invalid package at "' + this.url + '".');
							console.info('lychee.pkginit: Replace lychee.pkg with the one from "/projects/boilerplate".');

						}

					} else {

						console.warn('lychee.pkginit: Invalid package at "' + this.url + '".');
						console.info('lychee.pkginit: Replace lychee.pkg with the one from "/projects/boilerplate".');

					}

				};

				config.load();

				return true;

			}


			return false;

		},

		inject: function(environment) {

			environment = environment instanceof lychee.Environment ? environment : null;


			_bootstrap_environment.call(this);


			if (environment !== null) {

				if (this.environment !== null) {

					let that = this;

					Object.values(environment.definitions).forEach(function(definition) {
						that.environment.define(definition, true);
					});

					let build_old = this.environment.definitions[this.environment.build] || null;
					let build_new = environment.definitions[environment.build]           || null;

					if (build_old === null && build_new !== null) {
						this.environment.build = environment.build;
						this.environment.type  = environment.type;
					}


					return true;

				} else {

					console.warn('lychee.inject: Invalid default environment for injection.');
					console.info('lychee.inject: Use lychee.setEnvironment(env) before using lychee.inject(other).');

				}

			}


			return false;

		},

		setEnvironment: function(environment) {

			environment = environment instanceof lychee.Environment ? environment : null;


			if (environment !== null) {

				this.environment = environment;
				this.debug       = this.environment.debug;

				return true;

			} else {

				this.environment = _environment;
				this.debug       = this.environment.debug;

			}


			return false;

		}

	};


	if (typeof lychee === 'undefined') {
		lychee = global.lychee = Object.assign({}, Module);
	}


	return Module;

})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));


lychee.Asset = typeof lychee.Asset !== 'undefined' ? lychee.Asset : (function(global) {

	/*
	 * HELPERS
	 */

	const _resolve_constructor = function(type) {

		let construct = null;


		if (type === 'fnt')   construct = global.Font;
		if (type === 'json')  construct = global.Config;
		if (type === 'msc')   construct = global.Music;
		if (type === 'pkg')   construct = global.Config;
		if (type === 'png')   construct = global.Texture;
		if (type === 'snd')   construct = global.Sound;
		if (type === 'store') construct = global.Config;


		if (construct === null) {
			construct = global.Stuff || null;
		}


		return construct;

	};



	/*
	 * IMPLEMENTATION
	 */

	const Callback = function(url, type, ignore) {

		url    = typeof url === 'string'  ? url  : null;
		type   = typeof type === 'string' ? type : null;
		ignore = ignore === true;


		let asset = null;

		if (url !== null) {

			if (type === null) {

				if (url.substr(0, 5) === 'data:') {
					type = url.split(';')[0].split('/').pop();
				} else {
					type = url.split('/').pop().split('.').pop();
				}

			}


			let construct = _resolve_constructor(type);
			if (construct !== null) {

				if (url.substr(0, 5) === 'data:') {

					asset = new construct('/tmp/Asset.' + type, ignore);
					asset.deserialize({
						buffer: url
					});

				} else {

					asset = new construct(url, ignore);

				}

			}

		}


		return asset;

	};


	Callback.displayName = 'lychee.Asset';


	return Callback;

})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));


lychee.Debugger = typeof lychee.Debugger !== 'undefined' ? lychee.Debugger : (function(global) {

	/*
	 * HELPERS
	 */

	let _client      = null;
	let _environment = null;

	const _bootstrap_environment = function() {

		if (_environment === null) {

			let currentenv = lychee.environment;
			lychee.setEnvironment(null);

			let defaultenv = lychee.environment;
			lychee.setEnvironment(currentenv);

			_environment = defaultenv;

		}

	};

	const _diff_environment = function(environment) {

		let cache1 = {};
		let cache2 = {};

		let global1 = _environment.global;
		let global2 = environment.global;

		for (let prop1 in global1) {

			if (global1[prop1] === global2[prop1]) continue;

			if (typeof global1[prop1] !== typeof global2[prop1]) {
				cache1[prop1] = global1[prop1];
			}

		}

		for (let prop2 in global2) {

			if (global2[prop2] === global1[prop2]) continue;

			if (typeof global2[prop2] !== typeof global1[prop2]) {
				cache2[prop2] = global2[prop2];
			}

		}


		let diff = Object.assign({}, cache1, cache2);
		if (Object.keys(diff).length > 0) {
			return diff;
		}


		return null;

	};

	const _report_error = function(environment, data) {

		let info = 'Report from ' + data.file + '#L' + data.line + ' in ' + data.method;
		let main = environment.global.MAIN || null;

		if (main !== null) {

			let client = main.client || null;
			if (client !== null) {

				let service = client.getService('debugger');
				if (service !== null) {
					service.report('lychee.Debugger: ' + info, data);
				}

			}

		}


		console.error('lychee.Debugger: ' + info);
		console.error('lychee.Debugger: ' + data.message.trim());

	};



	/*
	 * IMPLEMENTATION
	 */

	const Module = {

		// deserialize: function(blob) {},

		serialize: function() {

			return {
				'reference': 'lychee.Debugger',
				'blob':      null
			};

		},

		expose: function(environment) {

			environment = environment instanceof lychee.Environment ? environment : lychee.environment;


			_bootstrap_environment();


			if (environment !== null && environment !== _environment) {

				let project = environment.id;
				if (project !== null) {

					if (lychee.diff(environment.global, _environment.global) === true) {

						let diff = _diff_environment(environment);
						if (diff !== null) {
							return diff;
						}

					}

				}

			}


			return null;

		},

		report: function(environment, error, referer) {


			_bootstrap_environment();


			environment = environment instanceof lychee.Environment ? environment : null;
			error       = error instanceof Error                    ? error       : null;
			referer     = referer instanceof Object                 ? referer     : null;


			if (environment !== null && error !== null) {

				let definition = null;

				if (referer !== null) {

					if (referer instanceof Stuff) {
						definition = referer.url;
					} else if (referer instanceof lychee.Definition) {
						definition = referer.id;
					}

				}


				let data = {
					project:     environment.id,
					definition:  definition,
					environment: environment.serialize(),
					file:        null,
					line:        null,
					method:      null,
					type:        error.toString().split(':')[0],
					message:     error.message
				};


				if (typeof error.stack === 'string') {

					let callsite = error.stack.split('\n')[0].trim();
					if (callsite.charAt(0) === '/') {

						data.file = callsite.split(':')[0];
						data.line = callsite.split(':')[1] || '';

					} else {

						callsite = error.stack.split('\n').find(function(val) {
							return val.trim().substr(0, 2) === 'at';
						});

						if (typeof callsite === 'string') {

							let tmp1 = callsite.trim().split(' ');
							let tmp2 = tmp1[2] || '';

							if (tmp2.charAt(0) === '(')               tmp2 = tmp2.substr(1);
							if (tmp2.charAt(tmp2.length - 1) === ')') tmp2 = tmp2.substr(0, tmp2.length - 1);

							// XXX: Thanks, Blink. Thanks -_-
							if (tmp2.substr(0, 4) === 'http') {
								tmp2 = '/' + tmp2.split('/').slice(3).join('/');
							}

							let tmp3 = tmp2.split(':');

							data.file   = tmp3[0];
							data.line   = tmp3[1];
							data.code   = '';
							data.method = tmp1[1];

						}

					}

				} else if (typeof Error.captureStackTrace === 'function') {

					let orig = Error.prepareStackTrace;

					Error.prepareStackTrace = function(err, stack) {
						return stack;
					};
					Error.captureStackTrace(new Error());


					let stack    = [].slice.call(error.stack);
					let callsite = stack.shift();
					let FILTER   = [ 'module.js', 'vm.js', 'internal/module.js' ];

					while (callsite !== undefined && FILTER.indexOf(callsite.getFileName()) !== -1) {
						callsite = stack.shift();
					}

					if (callsite !== undefined) {

						data.file   = callsite.getFileName();
						data.line   = callsite.getLineNumber();
						data.code   = '' + (callsite.getFunction() || '').toString();
						data.method = callsite.getFunctionName() || callsite.getMethodName();

					}

					Error.prepareStackTrace = orig;

				}


				_report_error(environment, data);


				return true;

			} else {

				console.error(error);

			}


			return false;

		}

	};


	Module.displayName = 'lychee.Debugger';


	return Module;

})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));


lychee.Definition = typeof lychee.Definition !== 'undefined' ? lychee.Definition : (function(global) {

	const lychee = global.lychee;



	/*
	 * HELPERS
	 */

	const _fuzz_asset = function(type) {

		let asset = {
			url:       '/tmp/Dummy.' + type,
			_is_dummy: true,
			serialize: function() {
				return null;
			}
		};


		let file = this.__file;
		if (file !== null) {
			asset.url = file.split('.').slice(0, -1).join('.') + '.' + type;
		}


		Object.defineProperty(asset, 'buffer', {
			get: function() {
				return null;
			},
			set: function() {
				return false;
			},
			enumerable:   true,
			configurable: false
		});


		return asset;

	};

	const _fuzz_id = function() {

		let found = null;

		if (this.__file !== null) {

			let packages = lychee.environment.packages.filter(function(pkg) {
				return pkg.type === 'source';
			}).map(function(pkg) {

				return {
					id:  pkg.id,
					url: pkg.url.split('/').slice(0, -1).join('/')
				};

			});


			let file = this.__file;
			let ns   = file.split('/');
			let pkg  = packages.find(function(pkg) {
				return file.substr(0, pkg.url.length) === pkg.url;
			}) || null;


			if (pkg !== null) {

				let id    = '';
				let tmp_i = ns.indexOf('source');
				let tmp_s = ns[ns.length - 1];

				if (/\.js$/g.test(tmp_s)) {
					ns[ns.length - 1] = tmp_s.split('.').slice(0, -1).join('.');
				}

				if (tmp_i !== -1) {
					id = ns.slice(tmp_i + 1).join('.');
				}


				found = pkg.id + '.' + id;

			}

		}

		return found;

	};



	/*
	 * IMPLEMENTATION
	 */

	let Composite = function(data) {

		let settings = Object.assign({}, data);


		this.id     = '';
		this.__file = lychee.Environment.__FILENAME || null;

		this._attaches = {
			'json':  _fuzz_asset.call(this, 'json'),
			'fnt':   _fuzz_asset.call(this, 'fnt'),
			'msc':   _fuzz_asset.call(this, 'msc'),
			'pkg':   _fuzz_asset.call(this, 'pkg'),
			'png':   _fuzz_asset.call(this, 'png'),
			'snd':   _fuzz_asset.call(this, 'snd'),
			'store': _fuzz_asset.call(this, 'store')
		};
		this._tags     = {};
		this._requires = [];
		this._includes = [];
		this._exports  = null;
		this._supports = null;


		this.setId(settings.id);


		settings = null;

	};


	Composite.prototype = {

		/*
		 * ENTITY API
		 */

		deserialize: function(blob) {

			if (blob.attaches instanceof Object) {

				let attachesmap = {};

				for (let aid in blob.attaches) {
					attachesmap[aid] = lychee.deserialize(blob.attaches[aid]);
				}

				this.attaches(attachesmap);

			}

			if (blob.tags instanceof Object) {
				this.tags(blob.tags);
			}

			if (blob.requires instanceof Array) {
				this.requires(blob.requires);
			}

			if (blob.includes instanceof Array) {
				this.includes(blob.includes);
			}


			let index1   = 0;
			let index2   = 0;
			let tmp      = null;
			let bindargs = null;

			if (typeof blob.supports === 'string') {

				// Function head
				tmp      = blob.supports.split('{')[0].trim().substr('function '.length);
				bindargs = tmp.substr(1, tmp.length - 2).split(',');

				// Function body
				index1 = blob.supports.indexOf('{') + 1;
				index2 = blob.supports.lastIndexOf('}') - 1;
				bindargs.push(blob.supports.substr(index1, index2 - index1));

				this.supports(Function.apply(Function, bindargs));

			}

			if (typeof blob.exports === 'string') {

				// Function head
				tmp      = blob.exports.split('{')[0].trim().substr('function '.length);
				bindargs = tmp.substr(1, tmp.length - 2).split(',');

				// Function body
				index1 = blob.exports.indexOf('{') + 1;
				index2 = blob.exports.lastIndexOf('}') - 1;
				bindargs.push(blob.exports.substr(index1, index2 - index1));

				this.exports(Function.apply(Function, bindargs));

			}

		},

		serialize: function() {

			let blob     = {};
			let settings = {};


			if (this.id !== '') settings.id = this.id;


			if (Object.keys(this._attaches).length > 0) {

				blob.attaches = {};

				for (let aid in this._attaches) {

					let asset = this._attaches[aid];
					if (asset.url.startsWith('/tmp/Dummy') === false) {

						let data = lychee.serialize(asset);
						if (data !== null) {
							blob.attaches[aid] = data;
						}

					}

				}

			}

			if (Object.keys(this._tags).length > 0) {

				blob.tags = {};

				for (let tid in this._tags) {
					blob.tags[tid] = this._tags[tid];
				}

			}

			if (this._requires.length > 0)          blob.requires = this._requires.slice(0);
			if (this._includes.length > 0)          blob.includes = this._includes.slice(0);
			if (this._supports instanceof Function) blob.supports = this._supports.toString();
			if (this._exports instanceof Function)  blob.exports  = this._exports.toString();


			return {
				'constructor': 'lychee.Definition',
				'arguments':   [ settings ],
				'blob':        Object.keys(blob).length > 0 ? blob : null
			};

		},



		/*
		 * CUSTOM API
		 */

		setId: function(id) {

			id = typeof id === 'string' ? id : null;


			if (id !== null) {

				if (/\./.test(id)) {

					this.id = id;

				} else if (/^([A-Za-z0-9-]+)/g.test(id)) {

					this.id = 'lychee.' + id;

				} else {

					let fuzzed = _fuzz_id.call(this);
					if (fuzzed !== null) {

						this.id = fuzzed;

						console.warn('lychee.Definition: Injecting Identifier "' + fuzzed + '" (' + this.__file + ')');

					} else {

						console.error('lychee.Definition: Invalid Identifier "' + id + '" (' + this.__file + ')');

					}

				}


				return true;

			}


			return false;

		},

		attaches: function(map) {

			map = map instanceof Object ? map : null;


			if (map !== null) {

				for (let id in map) {

					let value = map[id];
					if (value !== undefined) {
						this._attaches[id] = map[id];
					}

				}

			}


			return this;

		},

		exports: function(callback) {

			callback = callback instanceof Function ? callback : null;


			if (callback !== null) {
				this._exports = callback;
			}


			return this;

		},

		includes: function(definitions) {

			definitions = definitions instanceof Array ? definitions : null;


			if (definitions !== null) {

				for (let d = 0, dl = definitions.length; d < dl; d++) {

					let definition = definitions[d];
					if (typeof definition === 'string') {

						if (definition.indexOf('.') !== -1 && this._includes.indexOf(definition) === -1) {
							this._includes.push(definition);
						}

					}

				}

			}


			return this;

		},

		requires: function(definitions) {

			definitions = definitions instanceof Array ? definitions : null;


			if (definitions !== null) {

				for (let d = 0, dl = definitions.length; d < dl; d++) {

					let definition = definitions[d];
					if (typeof definition === 'string') {

						if (definition.indexOf('.') !== -1 && this._requires.indexOf(definition) === -1) {
							this._requires.push(definition);
						}

					}

				}

			}


			return this;

		},

		supports: function(callback) {

			callback = callback instanceof Function ? callback : null;


			if (callback !== null) {
				this._supports = callback;
			}


			return this;

		},

		tags: function(map) {

			map = map instanceof Object ? map : null;


			if (map !== null) {

				for (let id in map) {

					let value = map[id];
					if (typeof value === 'string') {
						this._tags[id] = value;
					}

				}

			}


			return this;

		}

	};


	Composite.displayName           = 'lychee.Definition';
	Composite.prototype.displayName = 'lychee.Definition';


	return Composite;

})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));


lychee.Environment = typeof lychee.Environment !== 'undefined' ? lychee.Environment : (function(global) {

	let   _id     = 0;
	const lychee  = global.lychee;
	const console = global.console;



	/*
	 * EVENTS
	 */

	const _export_loop = function(cache) {

		let that  = this;
		let load  = cache.load;
		let ready = cache.ready;
		let track = cache.track;

		let identifier, definition;


		for (let l = 0, ll = load.length; l < ll; l++) {

			identifier = load[l];
			definition = this.definitions[identifier] || null;


			if (definition !== null) {

				if (ready.indexOf(identifier) === -1) {
					ready.push(identifier);
				}

				load.splice(l, 1);
				track.splice(l, 1);
				ll--;
				l--;

			}

		}


		for (let r = 0, rl = ready.length; r < rl; r++) {

			identifier = ready[r];
			definition = this.definitions[identifier] || null;

			if (definition !== null) {

				let dependencies = _resolve_definition.call(this, definition);
				if (dependencies.length > 0) {

					for (let d = 0, dl = dependencies.length; d < dl; d++) {

						let dependency = dependencies[d];
						if (load.indexOf(dependency) === -1 && ready.indexOf(dependency) === -1) {

							that.load(dependency);
							load.push(dependency);
							track.push(identifier);

						}

					}

				} else {

					_export_definition.call(this, definition);

					ready.splice(r, 1);
					rl--;
					r--;

				}

			}

		}


		if (load.length === 0 && ready.length === 0) {

			cache.active = false;

		} else {

			if (Date.now() > cache.timeout) {
				cache.active = false;
			}

		}

	};



	/*
	 * HELPERS
	 */

	const _detect_features = function(source) {

		if (typeof Proxy === 'undefined') {
			return source;
		}


		let clone = {};
		let proxy = new Proxy(clone, {

			get: function(target, name) {

				// XXX: Remove this and console will crash your program
				if (name === 'splice') return undefined;


				if (target[name] === undefined) {

					let type = typeof source[name];
					if (/boolean|number|string|function/g.test(type)) {
						target[name] = source[name];
					} else if (/object/g.test(type)) {
						target[name] = _detect_features(source[name]);
					} else if (/undefined/g.test(type)) {
						target[name] = undefined;
					}


					if (target[name] === undefined) {
						console.error('lychee.Environment: Unknown feature (data type) "' + name + '" in bootstrap.js');
					}

				}


				return target[name];

			}

		});


		proxy.toJSON = function() {

			let data = {};

			Object.keys(clone).forEach(function(key) {

				if (/toJSON/g.test(key) === false) {

					let type = typeof clone[key];
					if (/boolean|number|string|function/g.test(type)) {
						data[key] = type;
					} else if (/object/g.test(type)) {
						data[key] = clone[key];
					}

				}

			});

			return data;

		};


		return proxy;

	};

	const _inject_features = function(source, features) {

		let target = this;

		Object.keys(features).forEach(function(key) {

			let type = features[key];
			if (/boolean|number|string|function/g.test(type)) {

				target[key] = source[key];

			} else if (typeof type === 'object') {

				if (typeof source[key] === 'object') {

					target[key] = source[key];
					_inject_features.call(target[key], source[key], type);

				}

			}

		});

	};

	const _validate_definition = function(definition) {

		if (!(definition instanceof lychee.Definition)) {
			return false;
		}


		let features  = null;
		let sandbox   = this.sandbox;
		let supported = false;


		if (definition._supports !== null) {

			let detector = _detect_features(Composite.__FEATURES || global);
			if (detector !== null) {

				supported = definition._supports.call(detector, lychee, detector);
				features  = JSON.parse(JSON.stringify(detector));
				detector  = null;

			} else {

				supported = definition._supports.call(global, lychee, global);

			}

		} else {

			supported = true;

		}


		let tagged = true;

		if (Object.keys(definition._tags).length > 0) {

			for (let tag in definition._tags) {

				let value = definition._tags[tag];
				let tags  = this.tags[tag] || null;
				if (tags instanceof Array) {

					if (tags.indexOf(value) === -1) {

						tagged = false;
						break;

					}

				}

			}

		}


		let type = this.type;
		if (type === 'build') {

			if (features !== null && sandbox === true) {
				_inject_features.call(this.global, global, features);
			}

			return tagged;

		} else if (type === 'export') {

			if (features !== null) {

				this.__features = lychee.assignunlink(this.__features, features);

				if (sandbox === true) {
					_inject_features.call(this.global, global, features);
				}

			}

			return tagged;

		} else if (type === 'source') {

			if (features !== null) {

				this.__features = lychee.assignunlink(this.__features, features);

				if (sandbox === true) {
					_inject_features.call(this.global, global, features);
				}

			}

			return supported && tagged;

		}


		return false;

	};

	const _resolve_definition = function(definition) {

		let dependencies = [];

		if (definition instanceof lychee.Definition) {

			for (let i = 0, il = definition._includes.length; i < il; i++) {

				let inc   = definition._includes[i];
				let check = _get_composite.call(this.global, inc);
				if (check === null) {
					dependencies.push(inc);
				}

			}

			for (let r = 0, rl = definition._requires.length; r < rl; r++) {

				let req   = definition._requires[r];
				let check = _get_composite.call(this.global, req);
				if (check === null) {
					dependencies.push(req);
				}

			}

		}

		return dependencies;

	};

	const _export_definition = function(definition) {

		if (_get_composite.call(this.global, definition.id) !== null) {
			return false;
		}


		let namespace  = _get_namespace.call(this.global, definition.id);
		let identifier = definition.id.split('.').pop();


		// XXX: Allow usage of non-existing attachments in definition
		if (this.debug === true) {

			let attachments = Object.values(definition._attaches).filter(function(asset) {
				return asset._is_dummy !== true;
			});
			let info = attachments.length > 0 ? ('(' + attachments.length + ' Attachment(s))') : '';

			this.global.console.log('lychee-Environment (' + this.id + '): Exporting "' + definition.id + '" ' + info);

		}



		/*
		 * 1. Export Composite, Module or Callback
		 */

		let template = null;
		if (definition._exports !== null) {

			try {

				template = definition._exports.call(
					definition._exports,
					this.global.lychee,
					this.global,
					definition._attaches
				) || null;

			} catch (err) {
				lychee.Debugger.report(this, err, definition);
			}

		}



		/*
		 * 2. Assign Composite, Module or Callback
		 */

		if (template !== null) {

			/*
			 * 2.1 Assign and export Composite or Module
			 */

			let includes = definition._includes;
			if (includes.length > 0) {

				let ownenums   = null;
				let ownmethods = null;
				let ownkeys    = Object.keys(template);
				let ownproto   = template.prototype;


				if (ownkeys.length > 0) {

					ownenums = {};

					for (let ok = 0, okl = ownkeys.length; ok < okl; ok++) {

						let ownkey = ownkeys[ok];
						if (ownkey === ownkey.toUpperCase()) {
							ownenums[ownkey] = template[ownkey];
						}

					}

					if (Object.keys(ownenums).length === 0) {
						ownenums = null;
					}

				}

				if (ownproto instanceof Object) {

					ownmethods = {};

					for (let ownmethod in ownproto) {
						ownmethods[ownmethod] = ownproto[ownmethod];
					}

					if (Object.keys(ownmethods).length === 0) {
						ownmethods = null;
					}

				}


				Object.defineProperty(namespace, identifier, {
					value:        template,
					writable:     false,
					enumerable:   true,
					configurable: false
				});


				namespace[identifier].displayName = definition.id;
				namespace[identifier].prototype = {};


				let tplenums   = {};
				let tplmethods = [ namespace[identifier].prototype ];


				for (let i = 0, il = includes.length; i < il; i++) {

					let include = _get_template.call(this.global, includes[i]);
					if (include !== null) {

						let inckeys = Object.keys(include);
						if (inckeys.length > 0) {

							for (let ik = 0, ikl = inckeys.length; ik < ikl; ik++) {

								let inckey = inckeys[ik];
								if (inckey === inckey.toUpperCase()) {
									tplenums[inckey] = include[inckey];
								}

							}

						}

						tplmethods.push(include.prototype);

					} else {

						if (this.debug === true) {
							console.error('lychee-Environment (' + this.id + '): Invalid Inclusion of "' + includes[i] + '"');
						}

					}

				}


				if (ownenums !== null) {

					for (let e in ownenums) {
						tplenums[e] = ownenums[e];
					}

				}

				if (ownmethods !== null) {
					tplmethods.push(ownmethods);
				}


				for (let e in tplenums) {
					namespace[identifier][e] = tplenums[e];
				}

				Object.assign.apply(lychee, tplmethods);
				namespace[identifier].prototype.displayName = definition.id;

				Object.freeze(namespace[identifier].prototype);


			/*
			 * 2.2 Nothing to include, plain Definition
			 */

			} else {

				namespace[identifier] = template;
				namespace[identifier].displayName = definition.id;


				if (template instanceof Object) {
					Object.freeze(namespace[identifier]);
				}

				if (namespace[identifier].prototype instanceof Object) {
					namespace[identifier].prototype.displayName = definition.id;
					Object.freeze(namespace[identifier].prototype);
				}

			}

		} else {

			namespace[identifier] = function() {};
			namespace[identifier].displayName = definition.id;
			namespace[identifier].prototype = {};
			namespace[identifier].prototype.displayName = definition.id;

			Object.freeze(namespace[identifier].prototype);


			this.global.console.error('lychee-Environment (' + this.id + '): Invalid Definition "' + definition.id + '", it is replaced with a Dummy Composite');

		}


		return true;

	};

	const _get_composite = function(identifier) {

		let id = identifier.split('.').pop();

		let pointer = _get_namespace.call(this, identifier);
		if (pointer[id] !== undefined) {
			return pointer;
		}


		return null;

	};

	const _get_namespace = function(identifier) {

		let pointer = this;

		let ns = identifier.split('.'); ns.pop();
		for (let n = 0, l = ns.length; n < l; n++) {

			let name = ns[n];

			if (pointer[name] === undefined) {
				pointer[name] = {};
			}

			pointer = pointer[name];

		}


		return pointer;

	};

	const _get_template = function(identifier) {

		let pointer = this;

		let ns = identifier.split('.');
		for (let n = 0, l = ns.length; n < l; n++) {

			let name = ns[n];

			if (pointer[name] !== undefined) {
				pointer = pointer[name];
			} else {
				pointer = null;
				break;
			}

		}


		return pointer;

	};



	/*
	 * STRUCTS
	 */

	const _Sandbox = function(settings) {

		let that     = this;
		let _std_err = '';
		let _std_out = '';


		this.console = {};
		this.console.log = function() {

			let str = '\n';

			for (let a = 0, al = arguments.length; a < al; a++) {

				let arg = arguments[a];
				if (arg instanceof Object) {
					str += JSON.stringify(arg, null, '\t');
				} else if (typeof arg.toString === 'function') {
					str += arg.toString();
				} else {
					str += arg;
				}

				if (a < al - 1) {
					str += '\t';
				}

			}


			if (str.substr(0, 5) === '\n(E)\t') {
				_std_err += str;
			} else {
				_std_out += str;
			}

		};

		this.console.info = function() {

			let args = [ '(I)\t' ];

			for (let a = 0, al = arguments.length; a < al; a++) {
				args.push(arguments[a]);
			}

			this.log.apply(this, args);

		};

		this.console.warn = function() {

			let args = [ '(W)\t' ];

			for (let a = 0, al = arguments.length; a < al; a++) {
				args.push(arguments[a]);
			}

			this.log.apply(this, args);

		};

		this.console.error = function() {

			let args = [ '(E)\t' ];

			for (let a = 0, al = arguments.length; a < al; a++) {
				args.push(arguments[a]);
			}

			this.log.apply(this, args);

		};

		this.console.deserialize = function(blob) {

			if (typeof blob.stdout === 'string') {
				_std_out = blob.stdout;
			}

			if (typeof blob.stderr === 'string') {
				_std_err = blob.stderr;
			}

		};

		this.console.serialize = function() {

			let blob = {};


			if (_std_out.length > 0) blob.stdout = _std_out;
			if (_std_err.length > 0) blob.stderr = _std_err;


			return {
				'reference': 'console',
				'blob':      Object.keys(blob).length > 0 ? blob : null
			};

		};


		this.Buffer  = global.Buffer;
		this.Config  = global.Config;
		this.Font    = global.Font;
		this.Music   = global.Music;
		this.Sound   = global.Sound;
		this.Texture = global.Texture;


		this.lychee              = {};
		this.lychee.environment  = null;
		this.lychee.ENVIRONMENTS = global.lychee.ENVIRONMENTS;
		this.lychee.VERSION      = global.lychee.VERSION;
		this.lychee.ROOT         = {};
		this.lychee.ROOT.lychee  = global.lychee.ROOT.lychee;
		this.lychee.ROOT.project = global.lychee.ROOT.project;

		[
			'assignsafe',
			'assignunlink',
			'debug',
			'diff',
			'enumof',
			'interfaceof',
			'deserialize',
			'serialize',
			'define',
			'import',
			'envinit',
			'pkginit',
			'setEnvironment',
			'Asset',
			'Debugger',
			'Definition',
			'Environment',
			'Package'
		].forEach(function(identifier) {

			that.lychee[identifier] = global.lychee[identifier];

		});


		this.require = function(path) {
			return global.require(path);
		};

		this.setTimeout = function(callback, timeout) {
			global.setTimeout(callback, timeout);
		};

		this.setInterval = function(callback, interval) {
			global.setInterval(callback, interval);
		};



		/*
		 * INITIALIZATION
		 */

		if (settings instanceof Object) {

			Object.keys(settings).forEach(function(key) {

				let instance = lychee.deserialize(settings[key]);
				if (instance !== null) {
					this[key] = instance;
				}

			}.bind(this));

		}

	};

	_Sandbox.prototype = {

		deserialize: function(blob) {

			if (blob.console instanceof Object) {
				this.console.deserialize(blob.console.blob);
			}

		},

		serialize: function() {

			let settings = {};
			let blob     = {};


			Object.keys(this).filter(function(key) {
				return key.charAt(0) !== '_' && key === key.toUpperCase();
			}).forEach(function(key) {
				settings[key] = lychee.serialize(this[key]);
			}.bind(this));


			blob.lychee         = {};
			blob.lychee.debug   = this.lychee.debug;
			blob.lychee.VERSION = this.lychee.VERSION;
			blob.lychee.ROOT    = this.lychee.ROOT;


			let data = this.console.serialize();
			if (data.blob !== null) {
				blob.console = data;
			}


			return {
				'constructor': '_Sandbox',
				'arguments':   [ settings ],
				'blob':        Object.keys(blob).length > 0 ? blob : null
			};

		}

	};



	/*
	 * IMPLEMENTATION
	 */

	let Composite = function(data) {

		let settings = Object.assign({}, data);


		this.id          = 'lychee-Environment-' + _id++;
		this.build       = 'app.Main';
		this.debug       = true;
		this.definitions = {};
		this.global      = global !== undefined ? global : {};
		this.packages    = [];
		this.sandbox     = false;
		this.tags        = {};
		this.timeout     = 10000;
		this.type        = 'source';

		this.__cache    = {
			active:        false,
			assimilations: [],
			start:         0,
			end:           0,
			retries:       0,
			timeout:       0,
			load:          [],
			ready:         [],
			track:         []
		};
		this.__features = {};


		// Alternative API for lychee.pkg

		if (settings.packages instanceof Array) {

			for (let p = 0, pl = settings.packages.length; p < pl; p++) {

				let pkg = settings.packages[p];
				if (pkg instanceof Array) {
					settings.packages[p] = new lychee.Package(pkg[0], pkg[1]);
				}

			}

		}


		this.setSandbox(settings.sandbox);
		this.setDebug(settings.debug);

		this.setDefinitions(settings.definitions);
		this.setId(settings.id);
		this.setPackages(settings.packages);
		this.setTags(settings.tags);
		this.setTimeout(settings.timeout);

		// Needs this.packages to be ready
		this.setType(settings.type);
		this.setBuild(settings.build);


		settings = null;

	};


	Composite.__FEATURES  = null;
	Composite.__FILENAME  = null;


	Composite.prototype = {

		/*
		 * ENTITY API
		 */

		deserialize: function(blob) {

			if (blob.definitions instanceof Object) {

				for (let id in blob.definitions) {
					this.definitions[id] = lychee.deserialize(blob.definitions[id]);
				}

			}

			let features = lychee.deserialize(blob.features);
			if (features !== null) {
				this.__features = features;
			}

			if (blob.packages instanceof Array) {

				let packages = [];

				for (let p = 0, pl = blob.packages.length; p < pl; p++) {
					packages.push(lychee.deserialize(blob.packages[p]));
				}

				this.setPackages(packages);

				// This is a dirty hack which is allowed here
				this.setType(blob.type);
				this.setBuild(blob.build);

			}

			if (blob.global instanceof Object) {

				this.global = new _Sandbox(blob.global.arguments[0]);

				if (blob.global.blob !== null) {
					this.global.deserialize(blob.global.blob);
				}

			}

		},

		serialize: function() {

			let settings = {};
			let blob     = {};


			if (this.id !== '0')           settings.id      = this.id;
			if (this.build !== 'app.Main') settings.build   = this.build;
			if (this.debug !== true)       settings.debug   = this.debug;
			if (this.sandbox !== true)     settings.sandbox = this.sandbox;
			if (this.timeout !== 10000)    settings.timeout = this.timeout;
			if (this.type !== 'source')    settings.type    = this.type;


			if (Object.keys(this.tags).length > 0) {

				settings.tags = {};

				for (let tagid in this.tags) {
					settings.tags[tagid] = this.tags[tagid];
				}

			}

			if (Object.keys(this.definitions).length > 0) {

				blob.definitions = {};

				for (let defid in this.definitions) {
					blob.definitions[defid] = lychee.serialize(this.definitions[defid]);
				}

			}


			if (Object.keys(this.__features).length > 0) blob.features = lychee.serialize(this.__features);

			if (this.packages.length > 0) {

				blob.packages = [];

				for (let p = 0, pl = this.packages.length; p < pl; p++) {
					blob.packages.push(lychee.serialize(this.packages[p]));
				}

				// This is a dirty hack which is allowed here
				blob.type  = this.type;
				blob.build = this.build;

			}

			if (this.sandbox === true) {
				blob.global = this.global.serialize();
			}


			return {
				'constructor': 'lychee.Environment',
				'arguments':   [ settings ],
				'blob':        Object.keys(blob).length > 0 ? blob : null
			};

		},



		/*
		 * CUSTOM API
		 */

		load: function(identifier) {

			identifier = typeof identifier === 'string' ? identifier : null;


			if (identifier !== null) {

				let tmp    = identifier.split('.');
				let pkg_id = tmp[0];
				let def_id = tmp.slice(1).join('.');


				let definition = this.definitions[identifier] || null;
				if (definition !== null) {

					return true;

				} else {

					let pkg = this.packages.find(function(pkg) {
						return pkg.id === pkg_id;
					}) || null;

					if (pkg !== null && pkg.isReady() === true) {

						let result = pkg.load(def_id, this.tags);
						if (result === true) {

							if (this.debug === true) {
								this.global.console.log('lychee-Environment (' + this.id + '): Loading "' + identifier + '" from Package "' + pkg.id + '"');
							}

						}


						return result;

					}

				}

			}


			return false;

		},

		define: function(definition, inject) {

			definition = definition instanceof lychee.Definition ? definition : null;
			inject     = inject === true;


			if (definition !== null) {

				let filename = Composite.__FILENAME || null;
				if (inject === false && filename !== null) {

					let old_pkg_id = definition.id.split('.')[0];
					let new_pkg_id = null;

					for (let p = 0, pl = this.packages.length; p < pl; p++) {

						let root = this.packages[p].root;
						if (filename.substr(0, root.length) === root) {
							new_pkg_id = this.packages[p].id;
							break;
						}

					}


					let assimilation = true;

					for (let p = 0, pl = this.packages.length; p < pl; p++) {

						let id = this.packages[p].id;
						if (id === old_pkg_id || id === new_pkg_id) {
							assimilation = false;
							break;
						}

					}


					if (assimilation === true) {

						if (this.debug === true) {
							this.global.console.log('lychee-Environment (' + this.id + '): Assimilating Definition "' + definition.id + '"');
						}


						this.__cache.assimilations.push(definition.id);

					} else if (new_pkg_id !== null && new_pkg_id !== old_pkg_id) {

						if (this.debug === true) {
							this.global.console.log('lychee-Environment (' + this.id + '): Injecting Definition "' + definition.id + '" into package "' + new_pkg_id + '"');
						}


						definition.id = new_pkg_id + '.' + definition.id.split('.').slice(1).join('.');

						for (let i = 0, il = definition._includes.length; i < il; i++) {

							let inc = definition._includes[i];
							if (inc.substr(0, old_pkg_id.length) === old_pkg_id) {
								definition._includes[i] = new_pkg_id + inc.substr(old_pkg_id.length);
							}

						}

						for (let r = 0, rl = definition._requires.length; r < rl; r++) {

							let req = definition._requires[r];
							if (req.substr(0, old_pkg_id.length) === old_pkg_id) {
								definition._requires[r] = new_pkg_id + req.substr(old_pkg_id.length);
							}

						}

					}

				} else {

					// XXX: Direct injection has no auto-mapping

				}


				if (_validate_definition.call(this, definition) === true) {

					if (this.debug === true) {
						let info = Object.keys(definition._tags).length > 0 ? ('(' + JSON.stringify(definition._tags) + ')') : '';
						this.global.console.log('lychee-Environment (' + this.id + '): Mapping "' + definition.id + '" ' + info);
					}

					this.definitions[definition.id] = definition;


					return true;

				}

			}


			let info = Object.keys(definition._tags).length > 0 ? ('(' + JSON.stringify(definition._tags) + ')') : '';
			this.global.console.error('lychee-Environment (' + this.id + '): Invalid Definition "' + definition.id + '" ' + info);


			return false;

		},

		init: function(callback) {

			callback = callback instanceof Function ? callback : function() {};


			if (this.debug === true) {
				this.global.lychee.ENVIRONMENTS[this.id] = this;
			}


			let build = this.build;
			let cache = this.__cache;
			let type  = this.type;
			let that  = this;


			if (type === 'source' || type === 'export') {

				let lypkg = this.packages.find(function(pkg) {
					return pkg.id === 'lychee';
				}) || null;

				if (lypkg === null) {

					lypkg = new lychee.Package('lychee', '/libraries/lychee/lychee.pkg');

					if (this.debug === true) {
						this.global.console.log('lychee-Environment (' + this.id + '): Injecting Package "lychee"');
					}

					lypkg.setEnvironment(this);
					this.packages.push(lypkg);

				}

			}


			if (build !== null && cache.active === false) {

				let result = this.load(build);
				if (result === true) {

					if (this.debug === true) {
						this.global.console.log('lychee-Environment (' + this.id + '): BUILD START ("' + this.build + '")');
					}


					cache.start   = Date.now();
					cache.timeout = Date.now() + this.timeout;
					cache.load    = [ build ];
					cache.ready   = [];
					cache.active  = true;


					let onbuildtimeout = function() {

						if (this.debug === true) {
							this.global.console.log('lychee-Environment (' + this.id + '): BUILD TIMEOUT (' + (cache.end - cache.start) + 'ms)');
						}


						// XXX: Always show Dependency Errors
						if (cache.load.length > 0) {

							this.global.console.error('lychee-Environment (' + this.id + '): Invalid Dependencies\n' + cache.load.map(function(value, index) {
								return '\t - ' + value + ' (required by ' + cache.track[index] + ')';
							}).join('\n'));

						}


						try {
							callback.call(this.global, null);
						} catch (err) {
							lychee.Debugger.report(this, err, null);
						}

					};

					let onbuildsuccess = function() {

						if (this.debug === true) {
							this.global.console.log('lychee-Environment (' + this.id + '): BUILD END (' + (cache.end - cache.start) + 'ms)');
						}


						try {
							callback.call(this.global, this.global);
						} catch (err) {
							lychee.Debugger.report(this, err, null);
						}

					};


					let intervalId = setInterval(function() {

						let cache = that.__cache;
						if (cache.active === true) {

							_export_loop.call(that, cache);

						} else if (cache.active === false) {

							if (intervalId !== null) {
								clearInterval(intervalId);
								intervalId = null;
							}


							let assimilations = cache.assimilations;
							if (assimilations.length > 0) {

								for (let a = 0, al = assimilations.length; a < al; a++) {

									let identifier = assimilations[a];
									let definition = that.definitions[identifier] || null;
									if (definition !== null) {
										_export_definition.call(that, definition);
									}

								}

							}


							cache.end = Date.now();


							if (cache.end > cache.timeout) {
								onbuildtimeout.call(that);
							} else {
								onbuildsuccess.call(that);
							}

						}

					}, (1000 / 60) | 0);

				} else {

					cache.retries++;


					if (cache.retries < 3) {

						if (this.debug === true) {
							this.global.console.warn('lychee-Environment (' + this.id + '): Package not ready, retrying in 100ms ...');
						}

						setTimeout(function() {
							that.init(callback);
						}, 100);

					} else {

						this.global.console.error('lychee-Environment (' + this.id + '): Invalid Dependencies\n\t - ' + build + ' (build target)');

					}

				}


				return true;

			}


			return false;

		},

		resolve: function(path) {

			path = typeof path === 'string' ? path : '';


			let proto = path.split(':')[0] || '';
			if (/^http|https/g.test(proto) === false) {
				path = (path.charAt(0) === '/' ? (lychee.ROOT.lychee + path) : (lychee.ROOT.project + '/' + path));
			}


			let tmp = path.split('/');

			for (let t = 0, tl = tmp.length; t < tl; t++) {

				if (tmp[t] === '.') {
					tmp.splice(t, 1);
					tl--;
					t--;
				} else if (tmp[t] === '..') {
					tmp.splice(t - 1, 2);
					tl -= 2;
					t  -= 2;
				}

			}

			return tmp.join('/');

		},

		setBuild: function(identifier) {

			identifier = typeof identifier === 'string' ? identifier : null;


			if (identifier !== null) {

				let type = this.type;
				if (type === 'build') {

					this.build = identifier;

					return true;

				} else {

					let pkg = this.packages.find(function(pkg) {
						return pkg.id === identifier.split('.')[0];
					});

					if (pkg !== null) {

						this.build = identifier;

						return true;

					}

				}

			}


			return false;

		},

		setDebug: function(debug) {

			debug = typeof debug === 'boolean' ? debug : null;


			if (debug !== null) {

				this.debug = debug;

				if (this.sandbox === true) {
					this.global.lychee.debug = debug;
				}

				return true;

			}


			return false;

		},

		setDefinitions: function(definitions) {

			definitions = definitions instanceof Object ? definitions : null;


			if (definitions !== null) {

				for (let identifier in definitions) {

					let definition = definitions[identifier];
					if (definition instanceof lychee.Definition) {
						this.definitions[identifier] = definition;
					}

				}


				return true;

			}


			return false;

		},

		setId: function(id) {

			id = typeof id === 'string' ? id : null;


			if (id !== null) {

				this.id = id;

				return true;

			}


			return false;

		},

		setPackages: function(packages) {

			packages = packages instanceof Array ? packages : null;


			if (packages !== null) {

				this.packages.forEach(function(pkg) {
					pkg.setEnvironment(null);
				});

				this.packages = packages.filter(function(pkg) {

					if (pkg instanceof lychee.Package) {

						if (this.debug === true) {
							this.global.console.log('lychee-Environment (' + this.id + '): Adding Package "' + pkg.id + '"');
						}

						pkg.setEnvironment(this);

						return true;

					}


					return false;

				}.bind(this));


				return true;

			}


			return false;

		},

		setSandbox: function(sandbox) {

			sandbox = typeof sandbox === 'boolean' ? sandbox : null;


			if (sandbox !== null) {

				if (sandbox !== this.sandbox) {

					this.sandbox = sandbox;


					if (sandbox === true) {

						this.global = new _Sandbox();
						this.global.lychee.setEnvironment(this);

					} else {

						this.global = global;

					}

				}


				return true;

			}


			return false;

		},

		setTags: function(tags) {

			tags = tags instanceof Object ? tags : null;


			if (tags !== null) {

				this.tags = {};

				for (let type in tags) {

					let values = tags[type];
					if (values instanceof Array) {

						this.tags[type] = values.filter(function(value) {
							return typeof value === 'string';
						});

					}

				}

				return true;

			}


			return false;

		},

		setTimeout: function(timeout) {

			timeout = typeof timeout === 'number' ? timeout : null;


			if (timeout !== null) {

				this.timeout = timeout;

				return true;

			}


			return false;

		},

		setType: function(type) {

			type = typeof type === 'string' ? type : null;


			if (type !== null) {

				if (type === 'source' || type === 'export' || type === 'build') {

					this.type = type;

					for (let p = 0, pl = this.packages.length; p < pl; p++) {
						this.packages[p].setType(this.type);
					}

					return true;

				}

			}


			return false;

		}

	};


	Composite.displayName           = 'lychee.Environment';
	Composite.prototype.displayName = 'lychee.Environment';


	return Composite;

})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));


lychee.Package = typeof lychee.Package !== 'undefined' ? lychee.Package : (function(global) {

	const lychee = global.lychee;


	/*
	 * HELPERS
	 */

	const _resolve_root = function() {

		let root = this.root;
		let type = this.type;
		if (type === 'source') {
			root += '/source';
		} else if (type === 'export') {
			root += '/source';
		} else if (type === 'build') {
			root += '/build';
		}


		return root;

	};

	const _resolve_path = function(candidate) {

		let path = typeof candidate === 'string' ? candidate.split('/') : null;


		if (path !== null) {

			let type = this.type;
			if (type === 'export') {
				type = 'source';
			}


			let pointer = this.__config.buffer[type].files || null;
			if (pointer !== null) {

				for (let p = 0, pl = path.length; p < pl; p++) {

					let name = path[p];
					if (pointer[name] !== undefined) {
						pointer = pointer[name];
					} else {
						pointer = null;
						break;
					}

				}

			}


			return pointer !== null ? true : false;

		}


		return false;

	};

	const _resolve_attachments = function(candidate) {

		let attachments = {};
		let path        = candidate.split('/');
		if (path.length > 0) {

			let pointer = this.__config.buffer.source.files || null;
			if (pointer !== null) {

				for (let pa = 0, pal = path.length; pa < pal; pa++) {

					let name = path[pa];
					if (pointer[name] !== undefined) {
						pointer = pointer[name];
					} else {
						pointer = null;
						break;
					}

				}


				if (pointer !== null && pointer instanceof Array) {

					let classpath = _resolve_root.call(this) + '/' + path.join('/');

					for (let po = 0, pol = pointer.length; po < pol; po++) {

						let type = pointer[po];
						if (type !== 'js') {
							attachments[type] = classpath + '.' + type;
						}

					}

				}

			}

		}


		return attachments;

	};

	const _resolve_candidates = function(id, tags) {

		tags = tags instanceof Object ? tags : null;


		let that          = this;
		let candidatepath = id.split('.').join('/');
		let candidates    = [];
		let filter_values = function(tags, tag) {

			return tags[tag].map(function(value) {
				return _resolve_tag.call(that, tag, value) + '/' + candidatepath;
			}).filter(function(path) {
				return _resolve_path.call(that, path);
			});

		};


		if (tags !== null) {

			for (let tag in tags) {

				let values = filter_values(tags, tag);
				if (values.length > 0) {
					candidates.push.apply(candidates, values);
				}

			}

		}


		if (_resolve_path.call(this, candidatepath) === true) {
			candidates.push(candidatepath);
		}


		return candidates;

	};

	const _resolve_tag = function(tag, value) {

		tag   = typeof tag === 'string'   ? tag   : null;
		value = typeof value === 'string' ? value : null;


		if (tag !== null && value !== null) {

			let type = this.type;
			if (type === 'export') {
				type = 'source';
			}


			let pointer = this.__config.buffer[type].tags || null;
			if (pointer !== null) {

				if (pointer[tag] instanceof Object) {

					let path = pointer[tag][value] || null;
					if (path !== null) {
						return path;
					}

				}

			}

		}


		return '';

	};

	const _load_candidate = function(id, candidates) {

		if (candidates.length > 0) {

			let map = {
				id:           id,
				candidate:    null,
				candidates:   [].concat(candidates),
				attachments:  [],
				dependencies: [],
				loading:      1
			};


			this.__requests[id] = map;


			let candidate = map.candidates.shift();

			while (candidate !== undefined) {

				if (this.__blacklist[candidate] === 1) {
					candidate = map.candidates.shift();
				} else {
					break;
				}

			}


			// Try to load the first suggested Candidate Implementation
			if (candidate !== undefined) {

				let url            = _resolve_root.call(this) + '/' + candidate + '.js';
				let implementation = new lychee.Asset(url, null, false);
				let attachments    = _resolve_attachments.call(this, candidate);

				if (implementation !== null) {
					_load_candidate_implementation.call(this, candidate, implementation, attachments, map);
				}

			}

		}

	};

	const _load_candidate_implementation = function(candidate, implementation, attachments, map) {

		let that       = this;
		let identifier = this.id + '.' + map.id;


		implementation.onload = function(result) {

			map.loading--;


			if (result === true) {

				let environment = that.environment;
				let definition  = environment.definitions[identifier] || null;
				if (definition !== null) {

					map.candidate = this;


					let attachmentIds = Object.keys(attachments);


					// Temporary delete definition from environment and re-define it after attachments are all loaded
					if (attachmentIds.length > 0) {

						delete environment.definitions[identifier];

						map.loading += attachmentIds.length;


						attachmentIds.forEach(function(assetId) {

							let url   = attachments[assetId];
							let asset = new lychee.Asset(url);
							if (asset !== null) {

								asset.onload = function(result) {

									map.loading--;

									let tmp = {};
									if (result === true) {
										tmp[assetId] = this;
									} else {
										tmp[assetId] = null;
									}

									definition.attaches(tmp);


									if (map.loading === 0) {
										environment.definitions[identifier] = definition;
									}

								};

								asset.load();

							} else {

								map.loading--;

							}

						});

					}


					for (let i = 0, il = definition._includes.length; i < il; i++) {
						environment.load(definition._includes[i]);
					}

					for (let r = 0, rl = definition._requires.length; r < rl; r++) {
						environment.load(definition._requires[r]);
					}


					return true;

				}

			}



			// If code runs through here, candidate was invalid
			delete that.environment.definitions[identifier];
			that.__blacklist[candidate] = 1;

			// Load next candidate, if any available
			if (map.candidates.length > 0) {
				_load_candidate.call(that, map.id, map.candidates);
			}

		};

		implementation.load();

	};



	/*
	 * IMPLEMENTATION
	 */

	let Composite = function(id, url) {

		id  = typeof id === 'string'  ? id  : 'app';
		url = typeof url === 'string' ? url : null;


		this.id   = id;
		this.url  = null;
		this.root = null;

		this.environment = null;
		this.type        = 'source';

		this.__blacklist = {};
		this.__config    = null;
		this.__requests  = {};


		if (url !== null) {

			let that = this;
			let tmp  = url.split('/');

			let file = tmp.pop();
			if (file === 'lychee.pkg') {

				this.root = tmp.join('/');
				this.url  = url;

				this.__config = new Config(this.url);
				this.__config.onload = function(result) {

					if (that.isReady() === false) {
						result = false;
					}


					if (result === true) {
						console.info('lychee.Package-' + that.id + ': Package at "' + this.url + '" ready.');
					} else {
						console.error('lychee.Package-' + that.id + ': Package at "' + this.url + '" corrupt.');
					}

				};
				this.__config.load();

			}

		}

	};


	Composite.prototype = {

		/*
		 * ENTITY API
		 */

		// deserialize: function(blob) {},

		serialize: function() {

			return {
				'constructor': 'lychee.Package',
				'arguments':   [ this.id, this.url ]
			};

		},



		/*
		 * CUSTOM API
		 */

		isReady: function() {

			let ready  = false;
			let config = this.__config;

			if (config !== null && config.buffer !== null) {

				if (config.buffer.source instanceof Object && config.buffer.build instanceof Object) {
					ready = true;
				}

			}


			return ready;

		},

		load: function(id, tags) {

			id   = typeof id === 'string' ? id   : null;
			tags = tags instanceof Object ? tags : null;


			if (id !== null && this.isReady() === true) {

				let request = this.__requests[id] || null;
				if (request === null) {

					let candidates = _resolve_candidates.call(this, id, tags);
					if (candidates.length > 0) {

						_load_candidate.call(this, id, candidates);

						return true;

					} else {

						let info = Object.keys(tags).length > 0 ? ('(' + JSON.stringify(tags) + ')') : '';
						console.error('lychee.Package-' + this.id + ': Invalid Definition "' + id + '" ' + info);

						return false;

					}

				} else {

					return true;

				}

			}


			return false;

		},

		setEnvironment: function(environment) {

			environment = environment instanceof lychee.Environment ? environment : null;


			if (environment !== null) {

				this.environment = environment;

				return true;

			}


			return false;

		},

		setType: function(type) {

			type = typeof type === 'string' ? type : null;


			if (type !== null) {

				if (type === 'source' || type === 'export' || type === 'build') {

					this.type = type;

					return true;

				}

			}


			return false;

		}

	};


	Composite.displayName           = 'lychee.Package';
	Composite.prototype.displayName = 'lychee.Package';


	return Composite;

})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));


(function(lychee, global) {

	let _filename = null;



	/*
	 * FEATURE DETECTION
	 */

	(function(process, selfpath) {

		let cwd  = typeof process.cwd === 'function' ? process.cwd() : '';
		let tmp1 = selfpath.indexOf('/libraries/lychee');

		if (tmp1 !== -1) {
			lychee.ROOT.lychee = selfpath.substr(0, tmp1);
		}


		let tmp2 = selfpath.split('/').slice(0, 3).join('/');
		if (tmp2.substr(0, 13) === '/opt/lycheejs') {
			lychee.ROOT.lychee = tmp2;
		}


		if (cwd !== '') {
			lychee.ROOT.project = cwd;
		}

	})(global.process || {}, typeof __filename === 'string' ? __filename : '');



	/*
	 * HELPERS
	 */

	const _fs = require('fs');

	const _load_asset = function(settings, callback, scope) {

		settings = settings instanceof Object   ? settings : null;
		callback = callback instanceof Function ? callback : null;
		scope    = scope !== undefined          ? scope    : null;


		if (settings !== null && callback !== null && scope !== null) {

			let path     = lychee.environment.resolve(settings.url);
			let encoding = settings.encoding === 'binary' ? 'binary' : 'utf8';


			_fs.readFile(path, encoding, function(error, buffer) {

				let raw = null;
				if (!error) {
					raw = buffer;
				}

				try {
					callback.call(scope, raw);
				} catch (err) {
					lychee.Debugger.report(lychee.environment, err, null);
				}

			});

		}

	};



	/*
	 * POLYFILLS
	 */

	let _std_out = '';
	let _std_err = '';

	const _INDENT         = '    ';
	const _WHITESPACE     = new Array(512).fill(' ').join('');
	const _args_to_string = function(args, offset) {

		offset = typeof offset === 'number' ? offset : null;


		let output  = [];
		let columns = process.stdout.columns;

		for (let a = 0, al = args.length; a < al; a++) {

			let value = args[a];
			let o     = 0;

			if (typeof value === 'function') {

				let tmp = (value).toString().split('\n');

				for (let t = 0, tl = tmp.length; t < tl; t++) {
					output.push(tmp[t].replace(/\t/g, _INDENT));
				}

				o = output.length - 1;

			} else if (value instanceof Object) {

				let tmp = [];

				try {

					let cache = [];

					tmp = JSON.stringify(value, function(key, value) {

						if (value instanceof Object) {

							if (cache.indexOf(value) === -1) {
								cache.push(value);
								return value;
							} else {
								return undefined;
							}

						} else {
							return value;
						}

					}, _INDENT).split('\n');

				} catch (err) {
				}

				if (tmp.length > 1) {

					for (let t = 0, tl = tmp.length; t < tl; t++) {
						output.push(tmp[t].replace(/\t/g, _INDENT));
					}

					o = output.length - 1;

				} else {

					let chunk = output[o];
					if (chunk === undefined) {
						output[o] = tmp[0].trim();
					} else {
						output[o] = (chunk + ' ' + tmp[0]).trim();
					}

				}

			} else if (typeof value === 'string' && value.includes('\n')) {

				let tmp = value.split('\n');

				for (let t = 0, tl = tmp.length; t < tl; t++) {
					output.push(tmp[t].replace(/\t/g, _INDENT));
				}

				o = output.length - 1;

			} else {

				let chunk = output[o];
				if (chunk === undefined) {
					output[o] = ('' + value).replace(/\t/g, _INDENT).trim();
				} else {
					output[o] = (chunk + (' ' + value).replace(/\t/g, _INDENT)).trim();
				}

			}

		}


		let ol = output.length;
		if (ol > 1) {

			if (offset !== null) {

				for (let o = 0; o < ol; o++) {

					let line = output[o];
					let maxl = (o === 0 || o === ol - 1) ? (columns - offset) : columns;
					if (line.length > maxl) {
						output[o] = line.substr(0, maxl);
					} else {
						output[o] = line + _WHITESPACE.substr(0, maxl - line.length);
					}

				}

			}


			return output.join('\n');

		} else {

			if (offset !== null) {

				let line = output[0];
				let maxl = columns - offset * 2;
				if (line.length > maxl) {
					line = line.substr(0, maxl);
				} else {
					line = line + _WHITESPACE.substr(0, maxl - line.length);
				}

				return line;

			}


			return output[0];

		}

	};

	console.clear = function() {

		// clear screen
		// process.stdout.write('\x1B[2J');

		// clear screen and reset cursor
		process.stdout.write('\x1B[2J\x1B[0f');

		// clear scroll buffer
		process.stdout.write('\u001b[3J');

	};

	console.log = function() {

		let al   = arguments.length;
		let args = [ '(L)' ];
		for (let a = 0; a < al; a++) {
			args.push(arguments[a]);
		}

		_std_out += _args_to_string(args) + '\n';

		process.stdout.write('\u001b[49m\u001b[97m ' + _args_to_string(args, 1) + ' \u001b[39m\u001b[49m\u001b[0m\n');

	};

	console.info = function() {

		let al   = arguments.length;
		let args = [ '(I)' ];
		for (let a = 0; a < al; a++) {
			args.push(arguments[a]);
		}

		_std_out += _args_to_string(args) + '\n';

		process.stdout.write('\u001b[42m\u001b[97m ' + _args_to_string(args, 1) + ' \u001b[39m\u001b[49m\u001b[0m\n');

	};

	console.warn = function() {

		let al   = arguments.length;
		let args = [ '(W)' ];
		for (let a = 0; a < al; a++) {
			args.push(arguments[a]);
		}

		_std_out += _args_to_string(args) + '\n';

		process.stdout.write('\u001b[43m\u001b[97m ' + _args_to_string(args, 1) + ' \u001b[39m\u001b[49m\u001b[0m\n');

	};

	console.error = function() {

		let al   = arguments.length;
		let args = [ '(E)' ];
		for (let a = 0; a < al; a++) {
			args.push(arguments[a]);
		}

		_std_err += _args_to_string(args) + '\n';

		process.stderr.write('\u001b[41m\u001b[97m ' + _args_to_string(args, 1) + ' \u001b[39m\u001b[49m\u001b[0m\n');

	};

	console.deserialize = function(blob) {

		if (typeof blob.stdout === 'string') {
			_std_out = blob.stdout;
		}

		if (typeof blob.stderr === 'string') {
			_std_err = blob.stderr;
		}

	};

	console.serialize = function() {

		let blob = {};


		if (_std_out.length > 0) blob.stdout = _std_out;
		if (_std_err.length > 0) blob.stderr = _std_err;


		return {
			'reference': 'console',
			'blob':      Object.keys(blob).length > 0 ? blob : null
		};

	};



	const _META_KEYCODE     = /^(?:\x1b)([a-zA-Z0-9])$/;
	const _FUNCTION_KEYCODE = /^(?:\x1b+)(O|N|\[|\[\[)(?:(\d+)(?:;(\d+))?([~^$])|(?:1;)?(\d+)?([a-zA-Z]))/;

	const _parse_keypress   = function(str) {

		let parts;


		if (Buffer.isBuffer(str)) {

			if (str[0] > 127 && str[1] === undefined) {
				str[0] -= 128;
				str = '\x1b' + str.toString('utf8');
			} else {
				str = str.toString('utf8');
			}

		}


		let key = {
			name:  null,
			ctrl:  false,
			meta:  false,
			shift: false
		};


		// Return
		if (str === '\r' || str === '\n') {

			key.name = 'return';

		// Tab
		} else if (str === '\t') {

			key.name = 'tab';

		// Backspace or Ctrl + H
		} else if (str === '\b' || str === '\x7f' || str === '\x1b\b' || str === '\x1b\x7f') {

			key.name = 'backspace';
			key.meta = (str.charAt(0) === '\x1b');

		// Escape
		} else if (str === '\x1b' || str === '\x1b\x1b') {

			key.name = 'escape';
			key.meta = (str.length === 2);

		// Space
		} else if (str === ' ' || str === '\x1b ') {

			key.name = 'space';
			key.meta = (str.length === 2);

		// Ctrl + Letter
		} else if (str <= '\x1a') {

			key.name = String.fromCharCode(str.charCodeAt(0) + 'a'.charCodeAt(0) - 1);
			key.ctrl = true;

		// Letter
		} else if (str.length === 1 && str >= 'a' && str <= 'z') {

			key.name = str;

		// Shift + Letter
		} else if (str.length === 1 && str >= 'A' && str <= 'Z') {

			// was: key.name = str.toLowerCase();
			key.name = str;
			key.shift = true;

		// Meta + Letter
		} else if ((parts = _META_KEYCODE.exec(str))) {

			key.name = parts[1].toLowerCase();
			key.meta = true;
			key.shift = /^[A-Z]$/.test(parts[1]);

		// Function Key (ANSI ESCAPE SEQUENCE)
		} else if ((parts = _FUNCTION_KEYCODE.exec(str))) {

			let code = (parts[1] || '') + (parts[2] || '') + (parts[4] || '') + (parts[6] || '');
			let mod  = (parts[3] || parts[5] || 1) - 1;

			key.ctrl = !!(mod & 4);
			key.meta = !!(mod & 10);
			key.shift = !!(mod & 1);


			// Parse the key itself
			switch (code) {

				// xterm ESC O letter
				case 'OP':   key.name = 'f1'; break;
				case 'OQ':   key.name = 'f2'; break;
				case 'OR':   key.name = 'f3'; break;
				case 'OS':   key.name = 'f4'; break;

				// xterm ESC [ number ~
				case '[11~': key.name = 'f1'; break;
				case '[12~': key.name = 'f2'; break;
				case '[13~': key.name = 'f3'; break;
				case '[14~': key.name = 'f4'; break;

				// Cygwin/libuv
				case '[[A':  key.name = 'f1'; break;
				case '[[B':  key.name = 'f2'; break;
				case '[[C':  key.name = 'f3'; break;
				case '[[D':  key.name = 'f4'; break;
				case '[[E':  key.name = 'f5'; break;

				// common
				case '[15~': key.name = 'f5';  break;
				case '[17~': key.name = 'f6';  break;
				case '[18~': key.name = 'f7';  break;
				case '[19~': key.name = 'f8';  break;
				case '[20~': key.name = 'f9';  break;
				case '[21~': key.name = 'f10'; break;
				case '[23~': key.name = 'f11'; break;
				case '[24~': key.name = 'f12'; break;

				// xterm ESC [ letter
				case '[A':   key.name = 'up';    break;
				case '[B':   key.name = 'down';  break;
				case '[C':   key.name = 'right'; break;
				case '[D':   key.name = 'left';  break;
				case '[E':   key.name = 'clear'; break;
				case '[F':   key.name = 'end';   break;
				case '[H':   key.name = 'home';  break;

				// xterm ESC O letter
				case 'OA':   key.name = 'up';    break;
				case 'OB':   key.name = 'down';  break;
				case 'OC':   key.name = 'right'; break;
				case 'OD':   key.name = 'left';  break;
				case 'OE':   key.name = 'clear'; break;
				case 'OF':   key.name = 'end';   break;
				case 'OH':   key.name = 'home';  break;

				// xterm ESC [ number ~
				case '[1~':  key.name = 'home';     break;
				case '[2~':  key.name = 'insert';   break;
				case '[3~':  key.name = 'delete';   break;
				case '[4~':  key.name = 'end';      break;
				case '[5~':  key.name = 'pageup';   break;
				case '[6~':  key.name = 'pagedown'; break;

				// Putty
				case '[[5~': key.name = 'pageup';   break;
				case '[[6~': key.name = 'pagedown'; break;

				// misc.
				case '[Z':   key.name = 'tab'; key.shift = true; break;
				default:     key.name = null;                    break;

			}

		}


		if (key.name !== null) {
			return key;
		}


		return null;

	};



	/*
	 * FEATURE DETECTION
	 */

	let _audio_supports_ogg = false;
	let _audio_supports_mp3 = false;

	(function() {

		let consol  = 'console' in global;
		let audio   = false;
		let buffer  = true;
		let image   = false;


		if (lychee.debug === true) {

			let methods = [];

			if (consol)  methods.push('console');
			if (audio)   methods.push('Audio');
			if (buffer)  methods.push('Buffer');
			if (image)   methods.push('Image');

			if (methods.length === 0) {
				console.error('bootstrap.js: Supported methods are NONE');
			} else {
				console.info('bootstrap.js: Supported methods are ' + methods.join(', '));
			}

		}

	})();



	/*
	 * BUFFER IMPLEMENTATION
	 */

	Buffer.prototype.serialize = function() {

		return {
			'constructor': 'Buffer',
			'arguments':   [ this.toString('base64'), 'base64' ]
		};

	};

	Buffer.prototype.map = function(callback) {

		callback = callback instanceof Function ? callback : null;


		let clone = new Buffer(this.length);

		if (callback !== null) {

			for (let b = 0; b < this.length; b++) {
				clone[b] = callback(this[b], b);
			}

		} else {

			for (let b = 0; b < this.length; b++) {
				clone[b] = this[b];
			}

		}

		return clone;

	};




	/*
	 * CONFIG IMPLEMENTATION
	 */

	const _CONFIG_CACHE = {};

	const _clone_config = function(origin, clone) {

		if (origin.buffer !== null) {

			clone.buffer = JSON.parse(JSON.stringify(origin.buffer));

			clone.__load = false;

		}

	};


	const Config = function(url) {

		url = typeof url === 'string' ? url : null;


		this.url    = url;
		this.onload = null;
		this.buffer = null;

		this.__load = true;


		if (url !== null) {

			if (_CONFIG_CACHE[url] !== undefined) {
				_clone_config(_CONFIG_CACHE[url], this);
			} else {
				_CONFIG_CACHE[url] = this;
			}

		}

	};


	Config.prototype = {

		deserialize: function(blob) {

			if (typeof blob.buffer === 'string') {
				this.buffer = JSON.parse(new Buffer(blob.buffer.substr(29), 'base64').toString('utf8'));
				this.__load = false;
			}

		},

		serialize: function() {

			let blob = {};


			if (this.buffer !== null) {
				blob.buffer = 'data:application/json;base64,' + new Buffer(JSON.stringify(this.buffer, null, '\t'), 'utf8').toString('base64');
			}


			return {
				'constructor': 'Config',
				'arguments':   [ this.url ],
				'blob':        Object.keys(blob).length > 0 ? blob : null
			};

		},

		load: function() {

			if (this.__load === false) {

				if (this.onload instanceof Function) {
					this.onload(true);
					this.onload = null;
				}

				return;

			}


			_load_asset({
				url:      this.url,
				encoding: 'utf8'
			}, function(raw) {

				let data = null;
				try {
					data = JSON.parse(raw);
				} catch (err) {
				}


				this.buffer = data;


				if (data === null) {
					console.warn('bootstrap.js: Invalid Config at "' + this.url + '" (No JSON file).');
				}


				if (this.onload instanceof Function) {
					this.onload(data !== null);
					this.onload = null;
				}

			}, this);

		}

	};



	/*
	 * FONT IMPLEMENTATION
	 */

	const _parse_font = function() {

		let data = this.__buffer;

		if (typeof data.kerning === 'number' && typeof data.spacing === 'number') {

			if (data.kerning > data.spacing) {
				data.kerning = data.spacing;
			}

		}


		if (data.texture !== undefined) {

			let texture = new Texture(data.texture);
			let that    = this;

			texture.onload = function() {
				that.texture = this;
			};

			texture.load();

		} else {

			console.warn('bootstrap.js: Invalid Font at "' + this.url + '" (No FNT file).');

		}


		this.baseline   = typeof data.baseline === 'number'   ? data.baseline   : this.baseline;
		this.charset    = typeof data.charset === 'string'    ? data.charset    : this.charset;
		this.lineheight = typeof data.lineheight === 'number' ? data.lineheight : this.lineheight;
		this.kerning    = typeof data.kerning === 'number'    ? data.kerning    : this.kerning;
		this.spacing    = typeof data.spacing === 'number'    ? data.spacing    : this.spacing;


		if (data.font instanceof Object) {

			this.__font.color   = data.font.color   || '#ffffff';
			this.__font.family  = data.font.family  || 'Ubuntu Mono';
			this.__font.outline = data.font.outline || 0;
			this.__font.size    = data.font.size    || 16;
			this.__font.style   = data.font.style   || 'normal';

		}


		_parse_font_characters.call(this);

	};

	const _parse_font_characters = function() {

		let data = this.__buffer;
		let url  = this.url;

		if (_CHAR_CACHE[url] === undefined) {
			_CHAR_CACHE[url] = {};
		}

		if (data.map instanceof Array) {

			let offset = this.spacing;

			for (let c = 0, cl = this.charset.length; c < cl; c++) {

				let id  = this.charset[c];
				let chr = {
					width:      data.map[c] + this.spacing * 2,
					height:     this.lineheight,
					realwidth:  data.map[c],
					realheight: this.lineheight,
					x:          offset - this.spacing,
					y:          0
				};

				offset += chr.width;

				_CHAR_CACHE[url][id] = chr;

			}

		}

	};


	const _CHAR_CACHE = {};
	const _FONT_CACHE = {};

	const _clone_font = function(origin, clone) {

		if (origin.__buffer !== null) {

			clone.__buffer = origin.__buffer;
			clone.__load   = false;

			_parse_font.call(clone);

		}

	};


	const Font = function(url) {

		url = typeof url === 'string' ? url : null;


		this.url        = url;
		this.onload     = null;
		this.texture    = null;

		this.baseline   = 0;
		this.charset    = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
		this.spacing    = 0;
		this.kerning    = 0;
		this.lineheight = 1;

		this.__buffer   = null;
		this.__font     = {
			color:   '#ffffff',
			family:  'Ubuntu Mono',
			outline: 0,
			size:    16,
			style:   'normal'
		};
		this.__load     = true;


		if (url !== null) {

			if (_CHAR_CACHE[url] === undefined) {

				_CHAR_CACHE[url]     = {};
				_CHAR_CACHE[url][''] = {
					width:      0,
					height:     this.lineheight,
					realwidth:  0,
					realheight: this.lineheight,
					x:          0,
					y:          0
				};

			}


			if (_FONT_CACHE[url] !== undefined) {
				_clone_font(_FONT_CACHE[url], this);
			} else {
				_FONT_CACHE[url] = this;
			}

		}

	};


	Font.prototype = {

		deserialize: function(blob) {

			if (typeof blob.buffer === 'string') {
				this.__buffer = JSON.parse(new Buffer(blob.buffer.substr(29), 'base64').toString('utf8'));
				this.__load   = false;
				_parse_font.call(this);
			}

		},

		serialize: function() {

			let blob = {};


			if (this.__buffer !== null) {
				blob.buffer = 'data:application/json;base64,' + new Buffer(JSON.stringify(this.__buffer), 'utf8').toString('base64');
			}


			return {
				'constructor': 'Font',
				'arguments':   [ this.url ],
				'blob':        Object.keys(blob).length > 0 ? blob : null
			};

		},

		measure: function(text) {

			text = typeof text === 'string' ? text : null;


			let buffer = this.__buffer;
			if (buffer !== null) {

				// Cache Usage
				if (this.__load === false) {

					let cache = _CHAR_CACHE[this.url] || null;
					if (cache !== null) {

						let tl = text.length;
						if (tl === 1) {

							if (cache[text] !== undefined) {
								return cache[text];
							}

						} else if (tl > 1) {

							let data = cache[text] || null;
							if (data === null) {

								let width = 0;
								let map   = buffer.map;

								for (let t = 0; t < tl; t++) {

									let m = this.charset.indexOf(text[t]);
									if (m !== -1) {
										width += map[m] + this.kerning;
									}

								}

								if (width > 0) {

									// TODO: Embedded Font ligatures will set x and y values based on settings.map
									data = cache[text] = {
										width:      width,
										height:     this.lineheight,
										realwidth:  width,
										realheight: this.lineheight,
										x:          0,
										y:          0
									};

								}

							}


							return data;

						}


						return cache[''];

					}

				// Temporary Usage
				} else {

					let tl = text.length;
					if (tl === 1) {

						let m = this.charset.indexOf(text);
						if (m !== -1) {

							let offset  = this.spacing;
							let spacing = this.spacing;
							let map     = buffer.map;

							for (let c = 0; c < m; c++) {
								offset += map[c] + spacing * 2;
							}

							return {
								width:      map[m] + spacing * 2,
								height:     this.lineheight,
								realwidth:  map[m],
								realheight: this.lineheight,
								x:          offset - spacing,
								y:          0
							};

						}

					} else if (tl > 1) {

						let width = 0;
						let map   = buffer.map;

						for (let t = 0; t < tl; t++) {

							let m = this.charset.indexOf(text[t]);
							if (m !== -1) {
								width += map[m] + this.kerning;
							}

						}

						if (width > 0) {

							return {
								width:      width,
								height:     this.lineheight,
								realwidth:  width,
								realheight: this.lineheight,
								x:          0,
								y:          0
							};

						}

					}


					return {
						width:      0,
						height:     this.lineheight,
						realwidth:  0,
						realheight: this.lineheight,
						x:          0,
						y:          0
					};

				}

			}


			return null;

		},

		load: function() {

			if (this.__load === false) {

				if (this.onload instanceof Function) {
					this.onload(true);
					this.onload = null;
				}

				return;

			}


			_load_asset({
				url:      this.url,
				encoding: 'utf8'
			}, function(raw) {

				let data = null;
				try {
					data = JSON.parse(raw);
				} catch (err) {
				}


				if (data !== null) {

					this.__buffer = data;
					this.__load   = false;

					_parse_font.call(this);

				}


				if (this.onload instanceof Function) {
					this.onload(data !== null);
					this.onload = null;
				}

			}, this);

		}

	};



	/*
	 * MUSIC IMPLEMENTATION
	 */

	const _MUSIC_CACHE = {};

	const _clone_music = function(origin, clone) {

		if (origin.__buffer.ogg !== null || origin.__buffer.mp3 !== null) {

			clone.__buffer.ogg = origin.__buffer.ogg;
			clone.__buffer.mp3 = origin.__buffer.mp3;
			clone.__load       = false;

		}

	};


	const Music = function(url) {

		url = typeof url === 'string' ? url : null;


		this.url      = url;
		this.onload   = null;
		this.buffer   = null;
		this.volume   = 0.0;
		this.isIdle   = true;

		this.__buffer = { ogg: null, mp3: null };
		this.__load   = true;


		if (url !== null) {

			if (_MUSIC_CACHE[url] !== undefined) {
				_clone_music(_MUSIC_CACHE[url], this);
			} else {
				_MUSIC_CACHE[url] = this;
			}

		}

	};


	Music.prototype = {

		deserialize: function(blob) {

			if (blob.buffer instanceof Object) {

				if (typeof blob.buffer.ogg === 'string') {
					this.__buffer.ogg = new Buffer(blob.buffer.substr(28), 'base64');
				}

				if (typeof blob.buffer.mp3 === 'string') {
					this.__buffer.mp3 = new Buffer(blob.buffer.substr(22), 'base64');
				}


				this.__load = false;

			}

		},

		serialize: function() {

			let blob = {};


			if (this.__buffer.ogg !== null || this.__buffer.mp3 !== null) {

				blob.buffer = {};

				if (this.__buffer.ogg !== null) {
					blob.buffer.ogg = 'data:application/ogg;base64,' + new Buffer(this.__buffer.ogg, 'binary').toString('base64');
				}

				if (this.__buffer.mp3 !== null) {
					blob.buffer.mp3 = 'data:audio/mp3;base64,' + new Buffer(this.__buffer.mp3, 'binary').toString('base64');
				}

			}


			return {
				'constructor': 'Music',
				'arguments':   [ this.url ],
				'blob':        Object.keys(blob).length > 0 ? blob : null
			};

		},

		load: function() {

			if (this.__load === false) {

				if (this.onload instanceof Function) {
					this.onload(true);
					this.onload = null;
				}

				return;

			}


			_load_asset({
				url:      this.url + '.ogg',
				encoding: 'binary'
			}, function(rawogg) {

				_load_asset({
					url:      this.url + '.mp3',
					encoding: 'binary'
				}, function(rawmp3) {

					if (rawogg !== null) {
						this.__buffer.ogg = new Buffer(rawogg, 'binary');
					}

					if (rawmp3 !== null) {
						this.__buffer.mp3 = new Buffer(rawmp3, 'binary');
					}


					this.__load = false;


					if (this.onload instanceof Function) {
						this.onload(rawogg !== null || rawmp3 !== null);
						this.onload = null;
					}

				}, this);

			}, this);

		},

		clone: function() {
			return new Music(this.url);
		},

		play: function() {
			this.isIdle = false;
		},

		pause: function() {
			this.isIdle = true;
		},

		resume: function() {
			this.isIdle = false;
		},

		stop: function() {
			this.isIdle = true;
		},

		setVolume: function(volume) {

			volume = typeof volume === 'number' ? volume : null;


			return false;

		}

	};



	/*
	 * SOUND IMPLEMENTATION
	 */

	const _SOUND_CACHE = {};

	const _clone_sound = function(origin, clone) {

		if (origin.__buffer.ogg !== null || origin.__buffer.mp3 !== null) {

			clone.__buffer.ogg = origin.__buffer.ogg;
			clone.__buffer.mp3 = origin.__buffer.mp3;
			clone.__load       = false;

		}

	};


	const Sound = function(url) {

		url = typeof url === 'string' ? url : null;


		this.url      = url;
		this.onload   = null;
		this.buffer   = null;
		this.volume   = 0.0;
		this.isIdle   = true;

		this.__buffer = { ogg: null, mp3: null };
		this.__load   = true;


		if (url !== null) {

			if (_SOUND_CACHE[url] !== undefined) {
				_clone_sound(_SOUND_CACHE[url], this);
			} else {
				_SOUND_CACHE[url] = this;
			}

		}

	};


	Sound.prototype = {

		deserialize: function(blob) {

			if (blob.buffer instanceof Object) {

				if (typeof blob.buffer.ogg === 'string') {
					this.__buffer.ogg = new Buffer(blob.buffer.substr(28), 'base64');
				}

				if (typeof blob.buffer.mp3 === 'string') {
					this.__buffer.mp3 = new Buffer(blob.buffer.substr(22), 'base64');
				}


				this.__load = false;

			}

		},

		serialize: function() {

			let blob = {};


			if (this.__buffer.ogg !== null || this.__buffer.mp3 !== null) {

				blob.buffer = {};

				if (this.__buffer.ogg !== null) {
					blob.buffer.ogg = 'data:application/ogg;base64,' + new Buffer(this.__buffer.ogg, 'binary').toString('base64');
				}

				if (this.__buffer.mp3 !== null) {
					blob.buffer.mp3 = 'data:audio/mp3;base64,' + new Buffer(this.__buffer.mp3, 'binary').toString('base64');
				}

			}


			return {
				'constructor': 'Sound',
				'arguments':   [ this.url ],
				'blob':        Object.keys(blob).length > 0 ? blob : null
			};

		},

		load: function() {

			if (this.__load === false) {

				if (this.onload instanceof Function) {
					this.onload(true);
					this.onload = null;
				}

				return;

			}


			_load_asset({
				url:      this.url + '.ogg',
				encoding: 'binary'
			}, function(rawogg) {

				_load_asset({
					url:      this.url + '.mp3',
					encoding: 'binary'
				}, function(rawmp3) {

					if (rawogg !== null) {
						this.__buffer.ogg = new Buffer(rawogg, 'binary');
					}

					if (rawmp3 !== null) {
						this.__buffer.mp3 = new Buffer(rawmp3, 'binary');
					}


					this.__load = false;


					if (this.onload instanceof Function) {
						this.onload(rawogg !== null || rawmp3 !== null);
						this.onload = null;
					}

				}, this);

			}, this);

		},

		clone: function() {
			return new Sound(this.url);
		},

		play: function() {
			this.isIdle = false;
		},

		pause: function() {
			this.isIdle = true;
		},

		resume: function() {
			this.isIdle = false;
		},

		stop: function() {
			this.isIdle = true;
		},

		setVolume: function(volume) {

			volume = typeof volume === 'number' ? volume : null;


			return false;

		}

	};



	/*
	 * TEXTURE IMPLEMENTATION
	 */

	let   _TEXTURE_ID    = 0;
	const _TEXTURE_CACHE = {};

	const _parse_texture = function(data) {

		this.width  = (data[0] << 24) | (data[1] << 16) | (data[2] << 8) | data[3];
		this.height = (data[4] << 24) | (data[5] << 16) | (data[6] << 8) | data[7];

	};

	const _clone_texture = function(origin, clone) {

		if (origin.buffer !== null) {

			clone.id     = origin.id;

			clone.buffer = origin.buffer;
			clone.width  = origin.width;
			clone.height = origin.height;

			clone.__load = false;

		}

	};


	const Texture = function(url) {

		url = typeof url === 'string' ? url : null;


		this.id     = _TEXTURE_ID++;
		this.url    = url;
		this.onload = null;
		this.buffer = null;
		this.width  = 0;
		this.height = 0;

		this.__load = true;


		if (url !== null && url.substr(0, 10) !== 'data:image') {

			if (_TEXTURE_CACHE[url] !== undefined) {
				_clone_texture(_TEXTURE_CACHE[url], this);
			} else {
				_TEXTURE_CACHE[url] = this;
			}

		}

	};


	Texture.prototype = {

		deserialize: function(blob) {

			if (typeof blob.buffer === 'string') {
				this.buffer = new Buffer(blob.buffer.substr(22), 'base64');
				this.__load = false;
			}

		},

		serialize: function() {

			let blob = {};


			if (this.buffer !== null) {
				blob.buffer = 'data:image/png;base64,' + this.buffer.toString('base64');
			}


			return {
				'constructor': 'Texture',
				'arguments':   [ this.url ],
				'blob':        Object.keys(blob).length > 0 ? blob : null
			};

		},

		load: function() {

			if (this.__load === false) {

				if (this.onload instanceof Function) {
					this.onload(true);
					this.onload = null;
				}

				return;

			}


			let url = this.url;
			if (url.substr(0, 5) === 'data:') {

				if (url.substr(0, 15) === 'data:image/png;') {

					let b64data = url.substr(15, url.length - 15);
					this.buffer = new Buffer(b64data, 'base64');
					this.__load = false;

					_parse_texture.call(this, this.buffer.slice(16, 24));


					let is_power_of_two = (this.width & (this.width - 1)) === 0 && (this.height & (this.height - 1)) === 0;
					if (lychee.debug === true && is_power_of_two === false) {
						console.warn('bootstrap.js: Texture at data:image/png; is NOT power-of-two');
					}

				} else {

					console.warn('bootstrap.js: Invalid Texture at "' + url.substr(0, 15) + '" (No PNG file).');

				}


				if (this.onload instanceof Function) {
					this.onload(this.buffer !== null);
					this.onload = null;
				}

			} else {

				if (url.split('.').pop() === 'png') {

					_load_asset({
						url:      url,
						encoding: 'binary'
					}, function(raw) {

						if (raw !== null) {

							this.buffer = new Buffer(raw, 'binary');
							this.__load = false;

							_parse_texture.call(this, this.buffer.slice(16, 24));

						}


						let is_power_of_two = (this.width & (this.width - 1)) === 0 && (this.height & (this.height - 1)) === 0;
						if (lychee.debug === true && is_power_of_two === false) {
							console.warn('bootstrap.js: Texture at "' + this.url + '" is NOT power-of-two');
						}


						if (this.onload instanceof Function) {
							this.onload(raw !== null);
							this.onload = null;
						}

					}, this);

				} else {

					console.warn('bootstrap.js: Invalid Texture at "' + this.url + '" (No PNG file).');


					if (this.onload instanceof Function) {
						this.onload(false);
						this.onload = null;
					}

				}

			}

		}

	};



	/*
	 * STUFF IMPLEMENTATION
	 */

	const _STUFF_CACHE = {};

	const _clone_stuff = function(origin, clone) {

		if (origin.buffer !== null) {

			clone.buffer = origin.buffer;

			clone.__load = false;

		}

	};

	const _execute_stuff = function(callback, stuff) {

		let type = stuff.url.split('/').pop().split('.').pop();
		if (type === 'js' && stuff.__ignore === false) {

			_filename = stuff.url;


			let cid = lychee.environment.resolve(stuff.url);
			if (require.cache[cid] !== undefined) {
				delete require.cache[cid];
			}

			try {
				require(cid);
			} catch (err) {
				lychee.Debugger.report(lychee.environment, err, stuff);
			}


			_filename = null;


			callback.call(stuff, true);

		} else {

			callback.call(stuff, true);

		}

	};


	const Stuff = function(url, ignore) {

		url    = typeof url === 'string' ? url : null;
		ignore = ignore === true;


		this.url      = url;
		this.onload   = null;
		this.buffer   = null;

		this.__ignore = ignore;
		this.__load   = true;


		if (url !== null) {

			if (_STUFF_CACHE[url] !== undefined) {
				_clone_stuff(_STUFF_CACHE[url], this);
			} else {
				_STUFF_CACHE[url] = this;
			}

		}

	};


	Stuff.prototype = {

		deserialize: function(blob) {

			if (typeof blob.buffer === 'string') {
				this.buffer = new Buffer(blob.buffer.substr(blob.buffer.indexOf(',') + 1), 'base64').toString('utf8');
				this.__load = false;
			}

		},

		serialize: function() {

			let blob = {};
			let type = this.url.split('/').pop().split('.').pop();
			let mime = 'application/octet-stream';


			if (type === 'js') {
				mime = 'application/javascript';
			}


			if (this.buffer !== null) {
				blob.buffer = 'data:' + mime + ';base64,' + new Buffer(this.buffer, 'utf8').toString('base64');
			}


			return {
				'constructor': 'Stuff',
				'arguments':   [ this.url ],
				'blob':        Object.keys(blob).length > 0 ? blob : null
			};

		},

		load: function() {

			if (this.__load === false) {

				_execute_stuff(function(result) {

					if (this.onload instanceof Function) {
						this.onload(result);
						this.onload = null;
					}

				}, this);


				return;

			}


			_load_asset({
				url:      this.url,
				encoding: 'utf8'
			}, function(raw) {

				if (raw !== null) {
					this.buffer = raw.toString('utf8');
				} else {
					this.buffer = '';
				}


				_execute_stuff(function(result) {

					if (this.onload instanceof Function) {
						this.onload(result);
						this.onload = null;
					}

				}, this);

			}, this);

		}

	};



	/*
	 * FEATURES
	 */

	const _FEATURES = {

		require: function(id) {

			if (id === 'child_process') return {};
			if (id === 'fs')            return {};
			if (id === 'http')          return {};
			if (id === 'https')         return {};
			if (id === 'net')           return {};
			if (id === 'path')          return {};


			throw new Error('Cannot find module \'' + id + '\'');

		},

		process: {
			env: {
				APPDATA: null,
				HOME:    '/home/dev'
			},
			stdin: {
				on: function() {}
			},
			stdout: {
				on:    function() {},
				write: function() {}
			}
		},

		clearInterval: function() {},
		clearTimeout:  function() {},
		setInterval:   function() {},
		setTimeout:    function() {}

	};


	Object.defineProperty(lychee.Environment, '__FEATURES', {

		get: function() {
			return _FEATURES;
		},

		set: function(value) {
			return false;
		}

	});



	/*
	 * EXPORTS
	 */

	// global.Buffer  = Buffer; // Not necessary, node.js data type
	global.Config  = Config;
	global.Font    = Font;
	global.Music   = Music;
	global.Sound   = Sound;
	global.Texture = Texture;
	global.Stuff   = Stuff;
	global.require = require;


	Object.defineProperty(lychee.Environment, '__FILENAME', {

		get: function() {

			if (_filename !== null) {
				return _filename;
			}

			return null;

		},

		set: function() {
			return false;
		}

	});


	module.exports = function(root) {

		let stream      = process.stdin;
		let is_emitting = stream._emitsKeypress === true;
		if (is_emitting === false) {

			// Note: This fixes issues with running IOJS with nohup
			if (stream.isTTY === true) {

				stream._emitsKeypress = true;

				stream.setEncoding('utf8');
				stream.setRawMode(true);
				stream.resume();

				stream.on('data', function(data) {

					if (this.listeners('keypress').length > 0) {

						let key = _parse_keypress(data);
						if (key !== null) {
							this.emit('keypress', key);
						}

					}

				});

			}

		}


		if (typeof root === 'string') {
			lychee.ROOT.project = root;
		}


		return lychee;

	};

})(lychee, global);


lychee.define('Input').tags({
	platform: 'node'
}).includes([
	'lychee.event.Emitter'
]).supports(function(lychee, global) {

	if (
		typeof global.process !== 'undefined'
		&& typeof global.process.stdin === 'object'
		&& typeof global.process.stdin.on === 'function'
	) {
		return true;
	}


	return false;

}).exports(function(lychee, global, attachments) {

	const _process   = global.process;
	const _Emitter   = lychee.import('lychee.event.Emitter');
	const _INSTANCES = [];



	/*
	 * EVENTS
	 */

	const _listeners = {

		keypress: function(key) {

			// TTY conform behaviour
			if (key.ctrl === true && key.name === 'c') {

				key.name  = 'escape';
				key.ctrl  = false;
				key.alt   = false;
				key.shift = false;

			}


			for (let i = 0, l = _INSTANCES.length; i < l; i++) {
				_process_key.call(_INSTANCES[i], key.name, key.ctrl, key.meta, key.shift);
			}

		}

	};



	/*
	 * FEATURE DETECTION
	 */

	(function() {

		let keypress = true;
		if (keypress === true) {
			_process.stdin.on('keypress', _listeners.keypress);
		}


		if (lychee.debug === true) {

			let methods = [];

			if (keypress) methods.push('Keyboard');

			if (methods.length === 0) {
				console.error('lychee.Input: Supported methods are NONE');
			} else {
				console.info('lychee.Input: Supported methods are ' + methods.join(', '));
			}

		}

	})();



	/*
	 * HELPERS
	 */

	const _process_key = function(key, ctrl, alt, shift) {

		if (this.key === false) {

			return false;

		} else if (this.keymodifier === false) {

			if (key === 'ctrl' || key === 'meta' || key === 'shift') {
				return true;
			}

		}


		let name    = '';
		let handled = false;
		let delta   = Date.now() - this.__clock.key;

		if (delta < this.delay) {
			return true;
		} else {
			this.__clock.key = Date.now();
		}


		// 0. Computation: Normal Characters
		if (ctrl  === true) name += 'ctrl-';
		if (alt   === true) name += 'alt-';
		if (shift === true) name += 'shift-';

		name += key.toLowerCase();


		// 1. Event API
		if (key !== null) {

			// allow bind('key') and bind('ctrl-a');

			handled = this.trigger('key', [ key, name, delta ]) || handled;
			handled = this.trigger(name,  [ delta ])            || handled;

		}


		return handled;

	};



	/*
	 * IMPLEMENTATION
	 */

	let Composite = function(data) {

		let settings = Object.assign({}, data);


		this.delay       = 0;
		this.key         = false;
		this.keymodifier = false;
		this.touch       = false;
		this.swipe       = false;

		this.__clock  = {
			key:   Date.now(),
			touch: Date.now(),
			swipe: Date.now()
		};


		this.setDelay(settings.delay);
		this.setKey(settings.key);
		this.setKeyModifier(settings.keymodifier);
		this.setTouch(settings.touch);
		this.setSwipe(settings.swipe);


		_Emitter.call(this);

		_INSTANCES.push(this);

		settings = null;

	};


	Composite.prototype = {

		destroy: function() {

			let found = false;

			for (let i = 0, il = _INSTANCES.length; i < il; i++) {

				if (_INSTANCES[i] === this) {
					_INSTANCES.splice(i, 1);
					found = true;
					il--;
					i--;
				}

			}

			this.unbind();


			return found;

		},



		/*
		 * ENTITY API
		 */

		// deserialize: function(blob) {},

		serialize: function() {

			let data = _Emitter.prototype.serialize.call(this);
			data['constructor'] = 'lychee.Input';

			let settings = {};


			if (this.delay !== 0)           settings.delay       = this.delay;
			if (this.key !== false)         settings.key         = this.key;
			if (this.keymodifier !== false) settings.keymodifier = this.keymodifier;
			if (this.touch !== false)       settings.touch       = this.touch;
			if (this.swipe !== false)       settings.swipe       = this.swipe;


			data['arguments'][0] = settings;


			return data;

		},



		/*
		 * CUSTOM API
		 */

		setDelay: function(delay) {

			delay = typeof delay === 'number' ? delay : null;


			if (delay !== null) {

				this.delay = delay;

				return true;

			}


			return false;

		},

		setKey: function(key) {

			key = typeof key === 'boolean' ? key : null;


			if (key !== null) {

				this.key = key;

				return true;

			}


			return false;

		},

		setKeyModifier: function(keymodifier) {

			keymodifier = typeof keymodifier === 'boolean' ? keymodifier : null;


			if (keymodifier !== null) {

				this.keymodifier = keymodifier;

				return true;

			}


			return false;

		},

		setTouch: function(touch) {

			touch = typeof touch === 'boolean' ? touch : null;


			if (touch !== null) {

				// XXX: No touch support

			}


			return false;

		},

		setScroll: function(scroll) {

			scroll = typeof scroll === 'boolean' ? scroll : null;


			if (scroll !== null) {

				// XXX: No scroll support

			}


			return false;

		},

		setSwipe: function(swipe) {

			swipe = typeof swipe === 'boolean' ? swipe : null;


			if (swipe !== null) {

				// XXX: No swipe support

			}


			return false;

		}

	};


	return Composite;

});


lychee.define('Renderer').tags({
	platform: 'node'
}).supports(function(lychee, global) {

	if (
		typeof global.process !== 'undefined'
		&& typeof global.process.stdout === 'object'
		&& typeof global.process.stdout.write === 'function'
	) {
		return true;
	}


	return false;

}).exports(function(lychee, global, attachments) {

	const _process = global.process;
	let   _id      = 0;



	/*
	 * HELPERS
	 */

	const _draw_ctx = function(x, y, value) {

		let max_x = (this[0] || '').length;
		let max_y = (this    || '').length;

		if (x >= 0 && x < max_x && y >= 0 && y < max_y) {
			this[y][x] = value;
		}

	};

	const _Buffer = function(width, height) {

		this.width  = typeof width === 'number'  ? width  : 1;
		this.height = typeof height === 'number' ? height : 1;


		this.__ctx = [];


		this.resize(this.width, this.height);

	};

	_Buffer.prototype = {

		clear: function() {

			let ctx    = this.__ctx;
			let width  = this.width;
			let height = this.height;

			for (let y = 0; y < height; y++) {

				for (let x = 0; x < width; x++) {
					ctx[y][x] = ' ';
				}

			}

		},

		resize: function(width, height) {

			this.width  = width;
			this.height = height;


			this.__ctx = [];


			for (let y = 0; y < this.height; y++) {

				let line = new Array(this.width);
				for (let x = 0; x < this.width; x++) {
					line[x] = ' ';
				}

				this.__ctx.push(line);

			}

		}

	};



	/*
	 * IMPLEMENTATION
	 */

	let Composite = function(data) {

		let settings = Object.assign({}, data);


		this.alpha      = 1.0;
		this.background = '#000000';
		this.id         = 'lychee-Renderer-' + _id++;
		this.width      = null;
		this.height     = null;
		this.offset     = { x: 0, y: 0 };


		this.__buffer = this.createBuffer(0, 0);
		this.__ctx    = this.__buffer.__ctx;


		this.setAlpha(settings.alpha);
		this.setBackground(settings.background);
		this.setId(settings.id);
		this.setWidth(settings.width);
		this.setHeight(settings.height);


		settings = null;

	};


	Composite.prototype = {

		destroy: function() {

			return true;

		},



		/*
		 * ENTITY API
		 */

		// deserialize: function(blob) {},

		serialize: function() {

			let settings = {};


			if (this.alpha !== 1.0)                           settings.alpha      = this.alpha;
			if (this.background !== '#000000')                settings.background = this.background;
			if (this.id.substr(0, 16) !== 'lychee-Renderer-') settings.id         = this.id;
			if (this.width !== null)                          settings.width      = this.width;
			if (this.height !== null)                         settings.height     = this.height;


			return {
				'constructor': 'lychee.Renderer',
				'arguments':   [ settings ],
				'blob':        null
			};

		},



		/*
		 * SETTERS AND GETTERS
		 */

		setAlpha: function(alpha) {

			alpha = typeof alpha === 'number' ? alpha : null;


			if (alpha !== null) {

				if (alpha >= 0 && alpha <= 1) {

					this.alpha = alpha;

					return true;

				}

			}


			return false;

		},

		setBackground: function(color) {

			color = /(#[AaBbCcDdEeFf0-9]{6})/g.test(color) ? color : null;


			if (color !== null) {

				this.background = color;

				return true;

			}


			return false;

		},

		setId: function(id) {

			id = typeof id === 'string' ? id : null;


			if (id !== null) {

				this.id = id;

				return true;

			}


			return false;

		},

		setWidth: function(width) {

			width = typeof width === 'number' ? width : null;


			if (width !== null) {
				this.width = width;
			} else {
				this.width = _process.stdout.columns - 1;
			}


			this.__buffer.resize(this.width, this.height);
			this.__ctx = this.__buffer.__ctx;
			this.offset.x = 0;


			return true;

		},

		setHeight: function(height) {

			height = typeof height === 'number' ? height : null;


			if (height !== null) {
				this.height = height;
			} else {
				this.height = _process.stdout.rows - 1;
			}


			this.__buffer.resize(this.width, this.height);
			this.__ctx = this.__buffer.__ctx;
			this.offset.y = 0;


			return true;

		},



		/*
		 * BUFFER INTEGRATION
		 */

		clear: function(buffer) {

			buffer = buffer instanceof _Buffer ? buffer : null;


			if (buffer !== null) {

				buffer.clear();

			} else {

				_process.stdout.write('\u001B[2J\u001B[0;0f');

				this.__buffer.clear();

			}


			return true;

		},

		flush: function() {

			let ctx = this.__ctx;

			let line = ctx[0] || '';
			let info = this.width + 'x' + this.height;

			for (let i = 0; i < info.length; i++) {
				line[i] = info[i];
			}

			for (let y = 0; y < this.height; y++) {
				_process.stdout.write(ctx[y].join('') + '\n');
			}

			return true;

		},

		createBuffer: function(width, height) {

			width  = typeof width === 'number'  ? width  : 1;
			height = typeof height === 'number' ? height : 1;


			return new _Buffer(width, height);

		},

		setBuffer: function(buffer) {

			buffer = buffer instanceof _Buffer ? buffer : null;


			if (buffer !== null) {
				this.__ctx = buffer.__ctx;
			} else {
				this.__ctx = this.__buffer.__ctx;
			}


			return true;

		},



		/*
		 * DRAWING API
		 */

		drawArc: function(x, y, start, end, radius, color, background, lineWidth) {

			x          = x | 0;
			y          = y | 0;
			radius     = radius | 0;
			start      = typeof start === 'number'              ? start     : 0;
			end        = typeof end === 'number'                ? end       : 2;
			color      = /(#[AaBbCcDdEeFf0-9]{6})/g.test(color) ? color     : '#000000';
			background = background === true;
			lineWidth  = typeof lineWidth === 'number'          ? lineWidth : 1;


			// TODO: Implement arc-drawing ASCII art algorithm
			// let ctx = this.__ctx;
			// let pi2 = Math.PI * 2;


			return false;

		},

		drawBox: function(x1, y1, x2, y2, color, background, lineWidth) {

			if (this.alpha < 0.5) return;

			x1         = x1 | 0;
			y1         = y1 | 0;
			x2         = x2 | 0;
			y2         = y2 | 0;
			color      = /(#[AaBbCcDdEeFf0-9]{6})/g.test(color) ? color : '#000000';
			background = background === true;
			lineWidth  = typeof lineWidth === 'number' ? lineWidth : 1;


			let ctx = this.__ctx;
			let x = 0;
			let y = 0;


			if (background === true) {

				for (x = x1 + 1; x < x2; x++) {

					for (y = y1 + 1; y < y2; y++) {
						_draw_ctx.call(ctx, x, y, '+');
					}

				}

			}


			// top - right - bottom - left

			y = y1;
			for (x = x1 + 1; x < x2; x++) {
				_draw_ctx.call(ctx, x, y, '-');
			}

			x = x2;
			for (y = y1 + 1; y < y2; y++) {
				_draw_ctx.call(ctx, x, y, '|');
			}

			y = y2;
			for (x = x1 + 1; x < x2; x++) {
				_draw_ctx.call(ctx, x, y, '-');
			}

			x = x1;
			for (y = y1 + 1; y < y2; y++) {
				_draw_ctx.call(ctx, x, y, '|');
			}


			return true;

		},

		drawBuffer: function(x1, y1, buffer, map) {

			x1     = x1 | 0;
			y1     = y1 | 0;
			buffer = buffer instanceof _Buffer ? buffer : null;
			map    = map instanceof Object     ? map    : null;


			if (buffer !== null) {

				let ctx    = this.__ctx;
				let width  = 0;
				let height = 0;
				let x      = 0;
				let y      = 0;
				let r      = 0;


				// XXX: No support for alpha :(

				if (map === null) {

					width  = buffer.width;
					height = buffer.height;

					let x2 = Math.min(x1 + width,  this.__buffer.width);
					let y2 = Math.min(y1 + height, this.__buffer.height);

					for (let cy = y1; cy < y2; cy++) {

						for (let cx = x1; cx < x2; cx++) {
							ctx[cy][cx] = buffer.__ctx[cy - y1][cx - x1];
						}

					}

				} else {

					width  = map.w;
					height = map.h;
					x      = map.x;
					y      = map.y;
					r      = map.r || 0;

					if (r === 0) {

						let x2 = Math.min(x1 + width,  this.__buffer.width);
						let y2 = Math.min(y1 + height, this.__buffer.height);

						for (let cy = y1; cy < y2; cy++) {

							for (let cx = x1; cx < x2; cx++) {
								ctx[cy][cx] = buffer.__ctx[cy - y1 + y][cx - x1 + x];
							}

						}

					} else {

						// XXX: No support for rotation

					}

				}

			}


			return true;

		},

		drawCircle: function(x, y, radius, color, background, lineWidth) {

			x          = x | 0;
			y          = y | 0;
			radius     = radius | 0;
			color      = /(#[AaBbCcDdEeFf0-9]{6})/g.test(color) ? color : '#000000';
			background = background === true;
			lineWidth  = typeof lineWidth === 'number' ? lineWidth : 1;


			// TODO: Implement circle-drawing ASCII art algorithm
			// let ctx = this.__ctx;


			return true;

		},

		drawLine: function(x1, y1, x2, y2, color, lineWidth) {

			x1        = x1 | 0;
			y1        = y1 | 0;
			x2        = x2 | 0;
			y2        = y2 | 0;
			color     = /(#[AaBbCcDdEeFf0-9]{6})/g.test(color) ? color : '#000000';
			lineWidth = typeof lineWidth === 'number' ? lineWidth : 1;


			// TODO: Implement line-drawing ASCII art algorithm
			// let ctx = this.__ctx;


			return false;

		},

		drawTriangle: function(x1, y1, x2, y2, x3, y3, color, background, lineWidth) {

			x1         = x1 | 0;
			y1         = y1 | 0;
			x2         = x2 | 0;
			y2         = y2 | 0;
			x3         = x3 | 0;
			y3         = y3 | 0;
			color      = /(#[AaBbCcDdEeFf0-9]{6})/g.test(color) ? color : '#000000';
			background = background === true;
			lineWidth  = typeof lineWidth === 'number' ? lineWidth : 1;


			// TODO: Implement triangle-drawing ASCII art algorithm
			// let ctx = this.__ctx;


			return false;

		},

		// points, x1, y1, [ ... x(a), y(a) ... ], [ color, background, lineWidth ]
		drawPolygon: function(points, x1, y1) {

			points = typeof points === 'number' ? points : 0;
			x1     = x1 | 0;
			y1     = y1 | 0;


			let l = arguments.length;

			if (points > 3) {

				let optargs = l - (points * 2) - 1;


				let color, background, lineWidth;

				if (optargs === 3) {

					color      = arguments[l - 3];
					background = arguments[l - 2];
					lineWidth  = arguments[l - 1];

				} else if (optargs === 2) {

					color      = arguments[l - 2];
					background = arguments[l - 1];

				} else if (optargs === 1) {

					color      = arguments[l - 1];

				}


				x1         = x1 | 0;
				y1         = y1 | 0;
				color      = /(#[AaBbCcDdEeFf0-9]{6})/g.test(color) ? color : '#000000';
				background = background === true;
				lineWidth  = typeof lineWidth === 'number' ? lineWidth : 1;


				// TODO: Implement polygon-drawing ASCII art algorithm
				// let ctx = this.__ctx;

			}


			return false;

		},

		drawSprite: function(x1, y1, texture, map) {

			x1      = x1 | 0;
			y1      = y1 | 0;
			texture = texture instanceof Texture ? texture : null;
			map     = map instanceof Object      ? map     : null;


			if (texture !== null && texture.buffer !== null) {

				// let ctx = this.__ctx;

				if (map === null) {

					// TODO: Implement sprite-drawing ASCII art algorithm

				} else {

					// TODO: Implement sprite-drawing ASCII art algorithm

				}

			}


			return false;

		},

		drawText: function(x1, y1, text, font, center) {

			x1     = x1 | 0;
			y1     = y1 | 0;
			text   = typeof text === 'string' ? text : null;
			font   = font instanceof Font     ? font : null;
			center = center === true;


			if (text !== null && font !== null) {

				if (center === true) {

					let dim = font.measure(text);

					x1 = (x1 - dim.realwidth / 2) | 0;
					y1 = (y1 - (dim.realheight - font.baseline) / 2) | 0;

				}


				y1 = (y1 - font.baseline / 2) | 0;


				let ctx = this.__ctx;

				let margin  = 0;
				let texture = font.texture;
				if (texture !== null && texture.buffer !== null) {

					for (let t = 0, l = text.length; t < l; t++) {

						let chr = font.measure(text[t]);

						let x = x1 + margin - font.spacing;
						let y = y1;


						_draw_ctx.call(ctx, x, y, text[t]);


						margin += chr.realwidth + font.kerning;

					}


					return true;

				}

			}


			return false;

		}

	};


	return Composite;

});


lychee.define('Stash').tags({
	platform: 'node'
}).includes([
	'lychee.event.Emitter'
]).supports(function(lychee, global) {

	if (typeof global.require === 'function') {

		try {

			global.require('fs');

			return true;

		} catch (err) {

		}

	}


	return false;

}).exports(function(lychee, global, attachments) {

	let   _id         = 0;
	const _Emitter    = lychee.import('lychee.event.Emitter');
	const _PERSISTENT = {
		data: {},
		read: function() {
			return null;
		},
		write: function(id, asset) {
			return false;
		}
	};
	const _TEMPORARY  = {
		data: {},
		read: function() {

			if (Object.keys(this.data).length > 0) {
				return this.data;
			}


			return null;

		},
		write: function(id, asset) {

			if (asset !== null) {
				this.data[id] = asset;
			} else {
				delete this.data[id];
			}

			return true;

		}
	};



	/*
	 * FEATURE DETECTION
	 */

	(function() {

		const _ENCODING = {
			'Config':  'utf8',
			'Font':    'utf8',
			'Music':   'binary',
			'Sound':   'binary',
			'Texture': 'binary',
			'Stuff':   'utf8'
		};


		const _fs      = global.require('fs');
		const _path    = global.require('path');
		const _mkdir_p = function(path, mode) {

			if (mode === undefined) {
				mode = 0o777 & (~process.umask());
			}


			let is_directory = false;

			try {

				is_directory = _fs.lstatSync(path).isDirectory();

			} catch (err) {

				if (err.code === 'ENOENT') {

					if (_mkdir_p(_path.dirname(path), mode) === true) {

						try {
							_fs.mkdirSync(path, mode);
						} catch (err) {
						}

					}

					try {
						is_directory = _fs.lstatSync(path).isDirectory();
					} catch (err) {
					}

				}

			}


			return is_directory;

		};


		let unlink = 'unlinkSync' in _fs;
		let write  = 'writeFileSync' in _fs;
		if (unlink === true && write === true) {

			_PERSISTENT.write = function(id, asset) {

				let result = false;


				let path = lychee.environment.resolve(id);
				if (path.substr(0, lychee.ROOT.project.length) === lychee.ROOT.project) {

					if (asset !== null) {

						let dir = path.split('/').slice(0, -1).join('/');
						if (dir.substr(0, lychee.ROOT.project.length) === lychee.ROOT.project) {
							_mkdir_p(dir);
						}


						let data = lychee.serialize(asset);
						if (data !== null && data.blob !== null && typeof data.blob.buffer === 'string') {

							let encoding = _ENCODING[data.constructor] || _ENCODING['Stuff'];
							let index    = data.blob.buffer.indexOf('base64,') + 7;
							if (index > 7) {

								let buffer = new Buffer(data.blob.buffer.substr(index, data.blob.buffer.length - index), 'base64');

								try {
									_fs.writeFileSync(path, buffer, encoding);
									result = true;
								} catch (err) {
									result = false;
								}

							}

						}

					} else {

						try {
							_fs.unlinkSync(path);
							result = true;
						} catch (err) {
							result = false;
						}

					}

				}


				return result;

			};

		}


		if (lychee.debug === true) {

			let methods = [];

			if (write && unlink) methods.push('Persistent');
			if (_TEMPORARY)      methods.push('Temporary');


			if (methods.length === 0) {
				console.error('lychee.Stash: Supported methods are NONE');
			} else {
				console.info('lychee.Stash: Supported methods are ' + methods.join(', '));
			}

		}

	})();



	/*
	 * HELPERS
	 */

	const _validate_asset = function(asset) {

		if (asset instanceof Object && typeof asset.serialize === 'function') {
			return true;
		}

		return false;

	};

	const _on_batch_remove = function(stash, others) {

		let keys = Object.keys(others);

		for (let k = 0, kl = keys.length; k < kl; k++) {

			let key   = keys[k];
			let index = this.load.indexOf(key);
			if (index !== -1) {

				if (this.ready.indexOf(key) === -1) {
					this.ready.push(null);
					this.load.splice(index, 1);
				}

			}

		}


		if (this.load.length === 0) {
			stash.trigger('batch', [ 'remove', this.ready ]);
			stash.unbind('sync', _on_batch_remove);
		}

	};

	const _on_batch_write = function(stash, others) {

		let keys = Object.keys(others);

		for (let k = 0, kl = keys.length; k < kl; k++) {

			let key   = keys[k];
			let index = this.load.indexOf(key);
			if (index !== -1) {

				if (this.ready.indexOf(key) === -1) {
					this.ready.push(others[key]);
					this.load.splice(index, 1);
				}

			}

		}


		if (this.load.length === 0) {
			stash.trigger('batch', [ 'write', this.ready ]);
			stash.unbind('sync', _on_batch_write);
		}

	};

	const _read_stash = function(silent) {

		silent = silent === true;


		let blob = null;


		let type = this.type;
		if (type === Composite.TYPE.persistent) {

			blob = _PERSISTENT.read();

		} else if (type === Composite.TYPE.temporary) {

			blob = _TEMPORARY.read();

		}


		if (blob !== null) {

			if (Object.keys(this.__assets).length !== Object.keys(blob).length) {

				this.__assets = {};

				for (let id in blob) {
					this.__assets[id] = blob[id];
				}


				if (silent === false) {
					this.trigger('sync', [ this.__assets ]);
				}

			}


			return true;

		}


		return false;

	};

	const _write_stash = function(silent) {

		silent = silent === true;


		let operations = this.__operations;
		let filtered   = {};

		if (operations.length !== 0) {

			while (operations.length > 0) {

				let operation = operations.shift();
				if (operation.type === 'update') {

					filtered[operation.id] = operation.asset;

					if (this.__assets[operation.id] !== operation.asset) {
						this.__assets[operation.id] = operation.asset;
					}

				} else if (operation.type === 'remove') {

					filtered[operation.id] = null;

					if (this.__assets[operation.id] !== null) {
						this.__assets[operation.id] = null;
					}

				}

			}


			let type = this.type;
			if (type === Composite.TYPE.persistent) {

				for (let id in filtered) {
					_PERSISTENT.write(id, filtered[id]);
				}

			} else if (type === Composite.TYPE.temporary) {

				for (let id in filtered) {
					_TEMPORARY.write(id, filtered[id]);
				}

			}


			if (silent === false) {
				this.trigger('sync', [ this.__assets ]);
			}


			return true;

		}


		return false;

	};



	/*
	 * IMPLEMENTATION
	 */

	let Composite = function(data) {

		let settings = Object.assign({}, data);


		this.id   = 'lychee-Stash-' + _id++;
		this.type = Composite.TYPE.persistent;


		this.__assets     = {};
		this.__operations = [];


		this.setId(settings.id);
		this.setType(settings.type);


		_Emitter.call(this);



		/*
		 * INITIALIZATION
		 */

		_read_stash.call(this);


		settings = null;

	};


	Composite.TYPE = {
		persistent: 0,
		temporary:  1
	};


	Composite.prototype = {

		/*
		 * ENTITY API
		 */

		sync: function(silent) {

			silent = silent === true;


			let result = false;


			if (Object.keys(this.__assets).length > 0) {

				this.__operations.push({
					type: 'sync'
				});

			}


			if (this.__operations.length > 0) {
				result = _write_stash.call(this, silent);
			} else {
				result = _read_stash.call(this, silent);
			}


			return result;

		},

		deserialize: function(blob) {

			if (blob.assets instanceof Object) {

				this.__assets = {};

				for (let id in blob.assets) {
					this.__assets[id] = lychee.deserialize(blob.assets[id]);
				}

			}

		},

		serialize: function() {

			let data = _Emitter.prototype.serialize.call(this);
			data['constructor'] = 'lychee.Stash';

			let settings = {};
			let blob     = (data['blob'] || {});


			if (this.id.substr(0, 13) !== 'lychee-Stash-') settings.id   = this.id;
			if (this.type !== Composite.TYPE.persistent)   settings.type = this.type;


			if (Object.keys(this.__assets).length > 0) {

				blob.assets = {};

				for (let id in this.__assets) {
					blob.assets[id] = lychee.serialize(this.__assets[id]);
				}

			}


			data['arguments'][0] = settings;
			data['blob']         = Object.keys(blob).length > 0 ? blob : null;


			return data;

		},



		/*
		 * CUSTOM API
		 */

		batch: function(action, ids, assets) {

			action = typeof action === 'string' ? action : null;
			ids    = ids instanceof Array       ? ids    : null;
			assets = assets instanceof Array    ? assets : null;


			if (action !== null) {

				let cache  = {
					load:  [].slice.call(ids),
					ready: []
				};


				let result = true;
				let that   = this;

				if (action === 'read') {

					for (let i = 0, il = ids.length; i < il; i++) {

						let asset = this.read(ids[i]);
						if (asset !== null) {

							asset.onload = function(result) {

								let index = cache.load.indexOf(this.url);
								if (index !== -1) {
									cache.ready.push(this);
									cache.load.splice(index, 1);
								}

								if (cache.load.length === 0) {
									that.trigger('batch', [ 'read', cache.ready ]);
								}

							};

							asset.load();

						} else {

							result = false;

						}

					}


					return result;

				} else if (action === 'remove') {

					this.bind('#sync', _on_batch_remove, cache);

					for (let i = 0, il = ids.length; i < il; i++) {

						if (this.remove(ids[i]) === false) {
							result = false;
						}

					}

					if (result === false) {
						this.unbind('sync', _on_batch_remove);
					}


					return result;

				} else if (action === 'write' && ids.length === assets.length) {

					this.bind('#sync', _on_batch_write, cache);

					for (let i = 0, il = ids.length; i < il; i++) {

						if (this.write(ids[i], assets[i]) === false) {
							result = false;
						}

					}

					if (result === false) {
						this.unbind('sync', _on_batch_write);
					}


					return result;

				}

			}


			return false;

		},

		read: function(id) {

			id = typeof id === 'string' ? id : null;


			if (id !== null) {

				let asset = new lychee.Asset(id, null, true);
				if (asset !== null) {

					this.__assets[id] = asset;

					return asset;

				}

			}


			return null;

		},

		remove: function(id) {

			id = typeof id === 'string' ? id : null;


			if (id !== null) {

				this.__operations.push({
					type: 'remove',
					id:   id
				});


				_write_stash.call(this);


				return true;

			}


			return false;

		},

		write: function(id, asset) {

			id    = typeof id === 'string'          ? id    : null;
			asset = _validate_asset(asset) === true ? asset : null;


			if (id !== null && asset !== null) {

				this.__operations.push({
					type:  'update',
					id:    id,
					asset: asset
				});


				_write_stash.call(this);


				return true;

			}


			return false;

		},

		setId: function(id) {

			id = typeof id === 'string' ? id : null;


			if (id !== null) {

				this.id = id;

				return true;

			}


			return false;

		},

		setType: function(type) {

			type = lychee.enumof(Composite.TYPE, type) ? type : null;


			if (type !== null) {

				this.type = type;

				return true;

			}


			return false;

		}

	};


	return Composite;

});


lychee.define('Storage').tags({
	platform: 'node'
}).includes([
	'lychee.event.Emitter'
]).supports(function(lychee, global) {

	if (typeof global.require === 'function') {

		try {

			global.require('fs');

			return true;

		} catch (err) {

		}

	}


	return false;

}).exports(function(lychee, global, attachments) {

	let   _id         = 0;
	const _Emitter    = lychee.import('lychee.event.Emitter');
	const _JSON       = {
		encode: JSON.stringify,
		decode: JSON.parse
	};
	const _PERSISTENT = {
		data: {},
		read: function() {
			return false;
		},
		write: function() {
			return false;
		}
	};
	const _TEMPORARY  = {
		data: {},
		read: function() {
			return true;
		},
		write: function() {
			return true;
		}
	};



	/*
	 * FEATURE DETECTION
	 */

	(function() {

		const _fs = global.require('fs');


		let read = 'readFileSync' in _fs;
		if (read === true) {

			_PERSISTENT.read = function() {

				let url = lychee.environment.resolve('./lychee.store');


				let raw = null;
				try {
					raw = _fs.readFileSync(url, 'utf8');
				} catch (err) {
					raw = null;
				}


				let buffer = null;
				try {
					buffer = JSON.parse(raw);
				} catch (err) {
					buffer = null;
				}


				if (buffer !== null) {

					for (let id in buffer) {
						_PERSISTENT.data[id] = buffer[id];
					}


					return true;

				}


				return false;

			};

		}


		let write = 'writeFileSync' in _fs;
		if (write === true) {

			_PERSISTENT.write = function() {

				let buffer = _JSON.encode(_PERSISTENT.data);
				let url    = lychee.environment.resolve('./lychee.store');


				let result = false;
				try {
					result = _fs.writeFileSync(url, buffer, 'utf8');
				} catch (err) {
					result = false;
				}


				return result;

			};

		}


		if (lychee.debug === true) {

			let methods = [];

			if (read && write) methods.push('Persistent');
			if (_TEMPORARY)    methods.push('Temporary');

			if (methods.length === 0) {
				console.error('lychee.Storage: Supported methods are NONE');
			} else {
				console.info('lychee.Storage: Supported methods are ' + methods.join(', '));
			}

		}


		_PERSISTENT.read();

	})();



	/*
	 * HELPERS
	 */

	const _read_storage = function(silent) {

		silent = silent === true;


		let id   = this.id;
		let blob = null;


		let type = this.type;
		if (type === Composite.TYPE.persistent) {
			blob = _PERSISTENT.data[id] || null;
		} else if (type === Composite.TYPE.temporary) {
			blob = _TEMPORARY.data[id]  || null;
		}


		if (blob !== null) {

			if (this.model === null) {

				if (blob['@model'] instanceof Object) {
					this.model = blob['@model'];
				}

			}


			if (Object.keys(this.__objects).length !== Object.keys(blob['@objects']).length) {

				if (blob['@objects'] instanceof Object) {

					this.__objects = {};

					for (let o in blob['@objects']) {
						this.__objects[o] = blob['@objects'][o];
					}


					if (silent === false) {
						this.trigger('sync', [ this.__objects ]);
					}


					return true;

				}

			}

		}


		return false;

	};

	const _write_storage = function(silent) {

		silent = silent === true;


		let operations = this.__operations;
		if (operations.length > 0) {

			while (operations.length > 0) {

				let operation = operations.shift();
				if (operation.type === 'update') {

					if (this.__objects[operation.id] !== operation.object) {
						this.__objects[operation.id] = operation.object;
					}

				} else if (operation.type === 'remove') {

					if (this.__objects[operation.id] !== undefined) {
						delete this.__objects[operation.id];
					}

				}

			}


			let id   = this.id;
			let blob = {
				'@model':   this.model,
				'@objects': this.__objects
			};


			let type = this.type;
			if (type === Composite.TYPE.persistent) {

				_PERSISTENT.data[id] = blob;
				_PERSISTENT.write();

			} else if (type === Composite.TYPE.temporary) {

				_TEMPORARY.data[id] = blob;

			}


			if (silent === false) {
				this.trigger('sync', [ this.__objects ]);
			}


			return true;

		}


		return false;

	};



	/*
	 * IMPLEMENTATION
	 */

	let Composite = function(data) {

		let settings = Object.assign({}, data);


		this.id    = 'lychee-Storage-' + _id++;
		this.model = {};
		this.type  = Composite.TYPE.persistent;


		this.__objects    = {};
		this.__operations = [];


		this.setId(settings.id);
		this.setModel(settings.model);
		this.setType(settings.type);


		_Emitter.call(this);

		settings = null;



		/*
		 * INITIALIZATION
		 */

		_read_storage.call(this);

	};


	Composite.TYPE = {
		persistent: 0,
		temporary:  1
	};


	Composite.prototype = {

		/*
		 * ENTITY API
		 */

		sync: function(silent) {

			silent = silent === true;


			let result = false;


			if (this.__operations.length > 0) {
				result = _write_storage.call(this, silent);
			} else {
				result = _read_storage.call(this, silent);
			}


			return result;

		},

		deserialize: function(blob) {

			if (blob.objects instanceof Object) {

				this.__objects = {};

				for (let o in blob.objects) {

					let object = blob.objects[o];

					if (lychee.interfaceof(this.model, object)) {
						this.__objects[o] = object;
					}

				}

			}

		},

		serialize: function() {

			let data = _Emitter.prototype.serialize.call(this);
			data['constructor'] = 'lychee.Storage';

			let settings = {};
			let blob     = (data['blob'] || {});


			if (this.id.substr(0, 15) !== 'lychee-Storage-') settings.id    = this.id;
			if (Object.keys(this.model).length !== 0)        settings.model = this.model;
			if (this.type !== Composite.TYPE.persistent)     settings.type  = this.type;


			if (Object.keys(this.__objects).length > 0) {

				blob.objects = {};

				for (let o in this.__objects) {

					let object = this.__objects[o];
					if (object instanceof Object) {
						blob.objects[o] = _JSON.decode(_JSON.encode(object));
					}

				}

			}


			data['arguments'][0] = settings;
			data['blob']         = Object.keys(blob).length > 0 ? blob : null;


			return data;

		},



		/*
		 * CUSTOM API
		 */

		create: function() {
			return lychee.assignunlink({}, this.model);
		},

		filter: function(callback, scope) {

			callback = callback instanceof Function ? callback : null;
			scope    = scope !== undefined          ? scope    : this;


			let filtered = [];


			if (callback !== null) {

				for (let o in this.__objects) {

					let object = this.__objects[o];

					if (callback.call(scope, object, o) === true) {
						filtered.push(object);
					}

				}


			}


			return filtered;

		},

		read: function(id) {

			id = typeof id === 'string' ? id : null;


			if (id !== null) {

				let object = this.__objects[id] || null;
				if (object !== null) {
					return object;
				}

			}


			return null;

		},

		remove: function(id) {

			id = typeof id === 'string' ? id : null;


			if (id !== null) {

				let object = this.__objects[id] || null;
				if (object !== null) {

					this.__operations.push({
						type:   'remove',
						id:     id,
						object: object
					});


					_write_storage.call(this);

					return true;

				}

			}


			return false;

		},

		write: function(id, object) {

			id     = typeof id === 'string'                    ? id     : null;
			object = lychee.diff(this.model, object) === false ? object : null;


			if (id !== null && object !== null) {

				this.__operations.push({
					type:   'update',
					id:     id,
					object: object
				});


				_write_storage.call(this);

				return true;

			}


			return false;

		},

		setId: function(id) {

			id = typeof id === 'string' ? id : null;


			if (id !== null) {

				this.id = id;

				return true;

			}


			return false;

		},

		setModel: function(model) {

			model = model instanceof Object ? model : null;


			if (model !== null) {

				this.model = _JSON.decode(_JSON.encode(model));

				return true;

			}


			return false;

		},

		setType: function(type) {

			type = lychee.enumof(Composite.TYPE, type) ? type : null;


			if (type !== null) {

				this.type = type;

				return true;

			}


			return false;

		}

	};


	return Composite;

});


lychee.define('Viewport').tags({
	platform: 'node'
}).includes([
	'lychee.event.Emitter'
]).supports(function(lychee, global) {

	if (
		typeof global.process !== 'undefined'
		&& typeof global.process.stdout === 'object'
		&& typeof global.process.stdout.on === 'function'
	) {
		return true;
	}


	return false;

}).exports(function(lychee, global, attachments) {

	const _process   = global.process;
	const _Emitter   = lychee.import('lychee.event.Emitter');
	const _INSTANCES = [];



	/*
	 * EVENTS
	 */

	const _listeners = {

		resize: function() {

			for (let i = 0, l = _INSTANCES.length; i < l; i++) {
				_process_reshape.call(_INSTANCES[i], _process.stdout.columns, _process.stdout.rows);
			}

		}

	};



	/*
	 * FEATURE DETECTION
	 */

	(function() {

		let resize = true;
		if (resize === true) {
			_process.stdout.on('resize', _listeners.resize);
		}


		if (lychee.debug === true) {

			let methods = [];

			if (resize) methods.push('Resize');

			if (methods.length === 0) {
				console.error('lychee.Viewport: Supported methods are NONE');
			} else {
				console.info('lychee.Viewport: Supported methods are ' + methods.join(', '));
			}

		}

	})();



	/*
	 * HELPERS
	 */

	const _process_reshape = function(width, height) {

		if (width === this.width && height === this.height) {
			return false;
		}


		this.width  = width;
		this.height = height;


		let orientation = null;
		let rotation    = null;

		if (width > height) {

			orientation = 'landscape';
			rotation    = 'landscape';

		} else {

			orientation = 'landscape';
			rotation    = 'landscape';

		}


		return this.trigger('reshape', [ orientation, rotation, width, height ]);

	};



	/*
	 * IMPLEMENTATION
	 */

	let Composite = function(data) {

		let settings = Object.assign({}, data);


		this.fullscreen = false;
		this.width      = _process.stdout.columns;
		this.height     = _process.stdout.rows;

		this.__orientation = 0;


		_Emitter.call(this);

		_INSTANCES.push(this);


		this.setFullscreen(settings.fullscreen);



		/*
		 * INITIALIZATION
		 */

		setTimeout(function() {

			this.width  = 0;
			this.height = 0;

			_process_reshape.call(this, _process.stdout.columns, _process.stdout.rows);

		}.bind(this), 100);


		settings = null;

	};


	Composite.prototype = {

		destroy: function() {

			let found = false;

			for (let i = 0, il = _INSTANCES.length; i < il; i++) {

				if (_INSTANCES[i] === this) {
					_INSTANCES.splice(i, 1);
					found = true;
					il--;
					i--;
				}

			}

			this.unbind();


			return found;

		},



		/*
		 * ENTITY API
		 */

		// deserialize: function(blob) {},

		serialize: function() {

			let data = _Emitter.prototype.serialize.call(this);
			data['constructor'] = 'lychee.Viewport';

			let settings = {};


			if (this.fullscreen !== false) settings.fullscreen = this.fullscreen;


			data['arguments'][0] = settings;


			return data;

		},



		/*
		 * CUSTOM API
		 */

		setFullscreen: function(fullscreen) {

			fullscreen = typeof fullscreen === 'boolean' ? fullscreen : null;


			if (fullscreen !== null) {

				// XXX: No fullscreen support

			}


			return false;

		}

	};


	return Composite;

});


lychee.define('lychee.net.Server').tags({
	platform: 'node'
}).requires([
	'lychee.Storage',
	'lychee.codec.JSON',
	'lychee.net.Remote'
]).includes([
	'lychee.event.Emitter'
]).supports(function(lychee, global) {

	if (typeof global.require === 'function') {

		try {

			global.require('net');
			return true;

		} catch (err) {
		}

	}


	return false;

}).exports(function(lychee, global, attachments) {

	const _net     = global.require('net');
	const _Emitter = lychee.import('lychee.event.Emitter');
	const _JSON    = lychee.import('lychee.codec.JSON');
	const _Remote  = lychee.import('lychee.net.Remote');
	const _Storage = lychee.import('lychee.Storage');
	const _storage = new _Storage({
		id:    'server',
		type:  _Storage.TYPE.persistent,
		model: {
			id:   '[::ffff]:1337',
			type: 'client',
			host: '::ffff',
			port: 1337
		}
	});



	/*
	 * IMPLEMENTATION
	 */

	let Composite = function(data) {

		let settings = Object.assign({}, data);


		this.codec  = _JSON;
		this.host   = null;
		this.port   = 1337;
		this.remote = _Remote;
		this.type   = Composite.TYPE.WS;


		this.__isConnected = false;
		this.__server      = null;


		this.setCodec(settings.codec);
		this.setHost(settings.host);
		this.setPort(settings.port);
		this.setRemote(settings.remote);
		this.setType(settings.type);


		_Emitter.call(this);

		settings = null;


		/*
		 * INITIALIZATION
		 */

		this.bind('connect', function(remote) {

			let id  = (/:/g.test(remote.host) ? '[' + remote.host + ']' : remote.host) + ':' + remote.port;
			let obj = _storage.create();
			if (obj !== null) {

				obj.id   = id;
				obj.type = 'client';
				obj.host = remote.host;
				obj.port = remote.port;

				_storage.write(id, obj);

			}

		}, this);

		this.bind('disconnect', function(remote) {

			let id  = (/:/g.test(remote.host) ? '[' + remote.host + ']' : remote.host) + ':' + remote.port;
			let obj = _storage.read(id);
			if (obj !== null) {
				_storage.remove(id);
			}

		}, this);

	};


	Composite.TYPE = {
		WS:   0,
		HTTP: 1,
		TCP:  2
	};


	Composite.prototype = {

		/*
		 * ENTITY API
		 */

		// deserialize: function(blob) {},

		serialize: function() {

			let data = _Emitter.prototype.serialize.call(this);
			data['constructor'] = 'lychee.net.Server';

			let settings = {};


			if (this.codec !== _JSON)            settings.codec  = lychee.serialize(this.codec);
			if (this.host !== 'localhost')       settings.host   = this.host;
			if (this.port !== 1337)              settings.port   = this.port;
			if (this.remote !== _Remote)         settings.remote = lychee.serialize(this.remote);
			if (this.type !== Composite.TYPE.WS) settings.type   = this.type;


			data['arguments'][0] = settings;


			return data;

		},



		/*
		 * CUSTOM API
		 */

		connect: function() {

			if (this.__isConnected === false) {

				if (lychee.debug === true) {
					console.log('lychee.net.Server: Connected to ' + this.host + ':' + this.port);
				}


				let that   = this;
				let server = new _net.Server({
					allowHalfOpen:  true,
					pauseOnConnect: true
				});


				server.on('connection', function(socket) {

					let host   = socket.remoteAddress || socket.server._connectionKey.split(':')[1];
					let port   = socket.remotePort    || socket.server._connectionKey.split(':')[2];
					let remote = new that.remote({
						codec: that.codec,
						host:  host,
						port:  port,
						type:  that.type
					});

					that.trigger('preconnect', [ remote ]);

					remote.bind('connect', function() {
						that.trigger('connect', [ this ]);
					});

					remote.bind('disconnect', function() {
						that.trigger('disconnect', [ this ]);
					});


					remote.connect(socket);

				});

				server.on('error', function() {
					this.close();
				});

				server.on('close', function() {
					that.__isConnected = false;
					that.__server      = null;
				});

				server.listen(this.port, this.host);


				this.__server      = server;
				this.__isConnected = true;


				return true;

			}


			return false;

		},

		disconnect: function() {

			let server = this.__server;
			if (server !== null) {
				server.close();
			}


			return true;

		},



		/*
		 * TUNNEL API
		 */

		setCodec: function(codec) {

			codec = lychee.interfaceof(_JSON, codec) ? codec : null;


			if (codec !== null) {

				let oldcodec = this.codec;
				if (oldcodec !== codec) {

					this.codec = codec;


					if (this.__isConnected === true) {
						this.disconnect();
						this.connect();
					}

				}


				return true;

			}


			return false;

		},

		setHost: function(host) {

			host = typeof host === 'string' ? host : null;


			if (host !== null) {

				this.host = host;

				return true;

			}


			return false;

		},

		setPort: function(port) {

			port = typeof port === 'number' ? (port | 0) : null;


			if (port !== null) {

				this.port = port;

				return true;

			}


			return false;

		},

		setRemote: function(remote) {

			remote = lychee.interfaceof(_Remote, remote) ? remote : null;


			if (remote !== null) {

				let oldremote = this.remote;
				if (oldremote !== remote) {

					this.remote = remote;


					if (this.__isConnected === true) {
						this.disconnect();
						this.connect();
					}

				}


				return true;

			}


			return false;

		},

		setType: function(type) {

			type = lychee.enumof(Composite.TYPE, type) ? type : null;


			if (type !== null) {

				let oldtype = this.type;
				if (oldtype !== type) {

					this.type = type;


					if (this.__isConnected === true) {
						this.disconnect();
						this.connect();
					}

				}


				return true;

			}


			return false;

		}

	};


	return Composite;

});


lychee.define('lychee.net.socket.HTTP').tags({
	platform: 'node'
}).requires([
	'lychee.net.protocol.HTTP'
]).includes([
	'lychee.event.Emitter'
]).supports(function(lychee, global) {

	if (typeof global.require === 'function') {

		try {

			global.require('net');

			return true;

		} catch (err) {
		}

	}


	return false;

}).exports(function(lychee, global, attachments) {

	const _net      = global.require('net');
	const _Emitter  = lychee.import('lychee.event.Emitter');
	const _Protocol = lychee.import('lychee.net.protocol.HTTP');



	/*
	 * HELPERS
	 */

	const _connect_socket = function(socket, protocol) {

		let that = this;
		if (that.__connection !== socket) {

			socket.on('data', function(blob) {

				let chunks = protocol.receive(blob);
				if (chunks.length > 0) {

					for (let c = 0, cl = chunks.length; c < cl; c++) {
						that.trigger('receive', [ chunks[c].payload, chunks[c].headers ]);
					}

				}

			});

			socket.on('error', function(err) {
				that.trigger('error');
				that.disconnect();
			});

			socket.on('timeout', function() {
				that.trigger('error');
				that.disconnect();
			});

			socket.on('close', function() {
				that.disconnect();
			});

			socket.on('end', function() {
				that.disconnect();
			});


			that.__connection = socket;
			that.__protocol   = protocol;

			that.trigger('connect');

		}

	};

	const _disconnect_socket = function(socket, protocol) {

		let that = this;
		if (that.__connection === socket) {

			socket.removeAllListeners('data');
			socket.removeAllListeners('error');
			socket.removeAllListeners('timeout');
			socket.removeAllListeners('close');
			socket.removeAllListeners('end');

			socket.destroy();
			protocol.close();


			that.__connection = null;
			that.__protocol   = null;

			that.trigger('disconnect');

		}

	};



	/*
	 * IMPLEMENTATION
	 */

	let Composite = function() {

		this.__connection = null;
		this.__protocol   = null;


		_Emitter.call(this);

	};


	Composite.prototype = {

		/*
		 * ENTITY API
		 */

		// deserialize: function(blob) {},

		serialize: function() {

			let data = _Emitter.prototype.serialize.call(this);
			data['constructor'] = 'lychee.net.socket.HTTP';


			return data;

		},



		/*
		 * CUSTOM API
		 */

		connect: function(host, port, connection) {

			host       = typeof host === 'string'       ? host       : null;
			port       = typeof port === 'number'       ? (port | 0) : null;
			connection = typeof connection === 'object' ? connection : null;


			let that     = this;
			// let url      = /:/g.test(host) ? ('http://[' + host + ']:' + port) : ('http://' + host + ':' + port);
			let protocol = null;


			if (host !== null && port !== null) {

				if (connection !== null) {

					protocol = new _Protocol({
						type: _Protocol.TYPE.remote
					});

					connection.allowHalfOpen = true;
					connection.setTimeout(0);
					connection.setNoDelay(true);
					connection.setKeepAlive(true, 0);
					connection.removeAllListeners('timeout');


					_connect_socket.call(that, connection, protocol);

					connection.resume();

				} else {

					protocol   = new _Protocol({
						type: _Protocol.TYPE.client
					});
					connection = new _net.Socket({
						readable: true,
						writable: true
					});

					connection.allowHalfOpen = true;
					connection.setTimeout(0);
					connection.setNoDelay(true);
					connection.setKeepAlive(true, 0);
					connection.removeAllListeners('timeout');


					_connect_socket.call(that, connection, protocol);

					connection.connect({
						host: host,
						port: port
					});

				}


				return true;

			}


			return false;

		},

		send: function(payload, headers, binary) {

			payload = payload instanceof Buffer ? payload : null;
			headers = headers instanceof Object ? headers : null;
			binary  = binary === true;


			if (payload !== null) {

				let connection = this.__connection;
				let protocol   = this.__protocol;

				if (connection !== null && protocol !== null) {

					let chunk = protocol.send(payload, headers, binary);
					let enc   = binary === true ? 'binary' : 'utf8';

					if (chunk !== null) {

						connection.write(chunk, enc);

						return true;
					}

				}

			}


			return false;

		},

		disconnect: function() {

			let connection = this.__connection;
			let protocol   = this.__protocol;

			if (connection !== null && protocol !== null) {

				_disconnect_socket.call(this, connection, protocol);


				return true;

			}


			return false;

		}

	};


	return Composite;

});


lychee.define('lychee.net.socket.WS').tags({
	platform: 'node'
}).requires([
	'lychee.crypto.SHA1',
	'lychee.net.protocol.WS'
]).includes([
	'lychee.event.Emitter'
]).supports(function(lychee, global) {

	if (
		typeof global.require === 'function'
		&& typeof global.setInterval === 'function'
	) {

		try {

			global.require('net');

			return true;

		} catch (err) {
		}

	}


	return false;

}).exports(function(lychee, global, attachments) {

	const _net           = global.require('net');
	const _clearInterval = global.clearInterval;
	const _setInterval   = global.setInterval;
	const _Emitter       = lychee.import('lychee.event.Emitter');
	const _Protocol      = lychee.import('lychee.net.protocol.WS');
	const _SHA1          = lychee.import('lychee.crypto.SHA1');



	/*
	 * HELPERS
	 */

	const _connect_socket = function(socket, protocol) {

		let that = this;
		if (that.__connection !== socket) {

			socket.on('data', function(blob) {

				let chunks = protocol.receive(blob);
				if (chunks.length > 0) {

					for (let c = 0, cl = chunks.length; c < cl; c++) {

						let chunk = chunks[c];
						if (chunk.payload[0] === 136) {

							that.send(chunk.payload, chunk.headers, true);
							that.disconnect();

							return;

						} else {

							that.trigger('receive', [ chunk.payload, chunk.headers ]);

						}

					}

				}

			});

			socket.on('error', function(err) {
				that.trigger('error');
				that.disconnect();
			});

			socket.on('timeout', function() {
				that.trigger('error');
				that.disconnect();
			});

			socket.on('close', function() {
				that.disconnect();
			});

			socket.on('end', function() {
				that.disconnect();
			});


			that.__connection = socket;
			that.__protocol   = protocol;

			that.trigger('connect');

		}

	};

	const _disconnect_socket = function(socket, protocol) {

		let that = this;
		if (that.__connection === socket) {

			socket.removeAllListeners('data');
			socket.removeAllListeners('error');
			socket.removeAllListeners('timeout');
			socket.removeAllListeners('close');
			socket.removeAllListeners('end');

			socket.destroy();
			protocol.close();


			that.__connection = null;
			that.__protocol   = null;

			that.trigger('disconnect');

		}

	};

	const _verify_client = function(headers, nonce) {

		let connection = (headers['connection'] || '').toLowerCase();
		let upgrade    = (headers['upgrade']    || '').toLowerCase();
		let protocol   = (headers['sec-websocket-protocol'] || '').toLowerCase();

		if (connection === 'upgrade' && upgrade === 'websocket' && protocol === 'lycheejs') {

			let accept = (headers['sec-websocket-accept'] || '');
			let expect = (function(nonce) {

				let sha1 = new _SHA1();
				sha1.update(nonce + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11');
				return sha1.digest().toString('base64');

			})(nonce.toString('base64'));


			if (accept === expect) {
				return accept;
			}

		}


		return null;

	};

	const _verify_remote = function(headers) {

		let connection = (headers['connection'] || '').toLowerCase();
		let upgrade    = (headers['upgrade']    || '').toLowerCase();
		let protocol   = (headers['sec-websocket-protocol'] || '').toLowerCase();

		if (connection === 'upgrade' && upgrade === 'websocket' && protocol === 'lycheejs') {

			let host   = headers['host']   || null;
			let nonce  = headers['sec-websocket-key'] || null;
			let origin = headers['origin'] || null;

			if (host !== null && nonce !== null && origin !== null) {

				let handshake = '';
				let accept    = (function(nonce) {

					let sha1 = new _SHA1();
					sha1.update(nonce + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11');
					return sha1.digest().toString('base64');

				})(nonce);


				// HEAD

				handshake += 'HTTP/1.1 101 WebSocket Protocol Handshake\r\n';
				handshake += 'Upgrade: WebSocket\r\n';
				handshake += 'Connection: Upgrade\r\n';

				handshake += 'Sec-WebSocket-Version: '  + '13'       + '\r\n';
				handshake += 'Sec-WebSocket-Origin: '   + origin     + '\r\n';
				handshake += 'Sec-WebSocket-Protocol: ' + 'lycheejs' + '\r\n';
				handshake += 'Sec-WebSocket-Accept: '   + accept     + '\r\n';


				// BODY
				handshake += '\r\n';


				return handshake;

			}

		}


		return null;

	};

	const _upgrade_client = function(host, port, nonce) {

		// let that       = this;
		let handshake  = '';
		let identifier = lychee.ROOT.project;


		if (identifier.substr(0, lychee.ROOT.lychee.length) === lychee.ROOT.lychee) {
			identifier = lychee.ROOT.project.substr(lychee.ROOT.lychee.length + 1);
		}

		for (let n = 0; n < 16; n++) {
			nonce[n] = Math.round(Math.random() * 0xff);
		}



		// HEAD

		handshake += 'GET / HTTP/1.1\r\n';
		handshake += 'Host: ' + host + ':' + port + '\r\n';
		handshake += 'Upgrade: WebSocket\r\n';
		handshake += 'Connection: Upgrade\r\n';
		handshake += 'Origin: lycheejs://' + identifier + '\r\n';
		handshake += 'Sec-WebSocket-Key: ' + nonce.toString('base64') + '\r\n';
		handshake += 'Sec-WebSocket-Version: 13\r\n';
		handshake += 'Sec-WebSocket-Protocol: lycheejs\r\n';


		// BODY
		handshake += '\r\n';


		this.once('data', function(data) {

			let headers = {};
			let lines   = data.toString('utf8').split('\r\n');


			lines.forEach(function(line) {

				let index = line.indexOf(':');
				if (index !== -1) {

					let key = line.substr(0, index).trim().toLowerCase();
					let val = line.substr(index + 1, line.length - index - 1).trim();
					if (/connection|upgrade|sec-websocket-version|sec-websocket-origin|sec-websocket-protocol/g.test(key)) {
						headers[key] = val.toLowerCase();
					} else if (key === 'sec-websocket-accept') {
						headers[key] = val;
					}

				}

			});


			if (headers['connection'] === 'upgrade' && headers['upgrade'] === 'websocket') {

				this.emit('upgrade', {
					headers: headers,
					socket:  this
				});

			} else {

				let err = new Error('connect ECONNREFUSED');
				err.code = 'ECONNREFUSED';

				this.emit('error', err);

			}

		}.bind(this));


		this.write(handshake, 'ascii');

	};

	const _upgrade_remote = function(data) {

		let lines   = data.toString('utf8').split('\r\n');
		let headers = {};


		lines.forEach(function(line) {

			let index = line.indexOf(':');
			if (index !== -1) {

				let key = line.substr(0, index).trim().toLowerCase();
				let val = line.substr(index + 1, line.length - index - 1).trim();
				if (/host|connection|upgrade|origin|sec-websocket-protocol/g.test(key)) {
					headers[key] = val.toLowerCase();
				} else if (key === 'sec-websocket-key') {
					headers[key] = val;
				}

			}

		});


		if (headers['connection'] === 'upgrade' && headers['upgrade'] === 'websocket') {

			this.emit('upgrade', {
				headers: headers,
				socket:  this
			});

		} else {

			this.destroy();

		}

	};



	/*
	 * IMPLEMENTATION
	 */

	let Composite = function() {

		this.__connection = null;
		this.__protocol   = null;


		_Emitter.call(this);

	};


	Composite.prototype = {

		/*
		 * ENTITY API
		 */

		// deserialize: function(blob) {},

		serialize: function() {

			let data = _Emitter.prototype.serialize.call(this);
			data['constructor'] = 'lychee.net.socket.WS';


			return data;

		},



		/*
		 * CUSTOM API
		 */

		connect: function(host, port, connection) {

			host       = typeof host === 'string'       ? host       : null;
			port       = typeof port === 'number'       ? (port | 0) : null;
			connection = typeof connection === 'object' ? connection : null;


			let that = this;
			// let url  = /:/g.test(host) ? ('ws://[' + host + ']:' + port) : ('ws://' + host + ':' + port);


			if (host !== null && port !== null) {

				if (connection !== null) {

					connection.once('data', _upgrade_remote.bind(connection));
					connection.resume();

					connection.once('error', function(err) {

						if (lychee.debug === true) {

							let code = err.code || '';
							if (/ECONNABORTED|ECONNREFUSED|ECONNRESET/.test(code)) {
								console.warn('lychee.net.socket.WS: BAD CONNECTION to ' + host + ':' + port);
							}

						}

						that.trigger('error');
						that.disconnect();

					});

					connection.on('upgrade', function(event) {

						let protocol = new _Protocol({
							type: _Protocol.TYPE.remote
						});
						let socket   = event.socket || null;


						if (socket !== null) {

							let verification = _verify_remote.call(socket, event.headers);
							if (verification !== null) {

								socket.allowHalfOpen = true;
								socket.setTimeout(0);
								socket.setNoDelay(true);
								socket.setKeepAlive(true, 0);
								socket.removeAllListeners('timeout');
								socket.write(verification, 'ascii');


								_connect_socket.call(that, socket, protocol);

							} else {

								if (lychee.debug === true) {
									console.warn('lychee.net.socket.WS: BAD HANDSHAKE to ' + host + ':' + port);
								}


								socket.write('', 'ascii');
								socket.end();
								socket.destroy();

								that.trigger('error');
								that.disconnect();

							}

						}

					});

				} else {

					let nonce     = new Buffer(16);
					let connector = new _net.Socket({
						fd:       null,
						readable: true,
						writable: true
					});


					connector.once('connect', _upgrade_client.bind(connector, host, port, nonce));

					connector.on('upgrade', function(event) {

						let protocol = new _Protocol({
							type: _Protocol.TYPE.client
						});
						let socket   = event.socket || null;


						if (socket !== null) {

							let verification = _verify_client(event.headers, nonce);
							if (verification !== null) {

								socket.setTimeout(0);
								socket.setNoDelay(true);
								socket.setKeepAlive(true, 0);
								socket.removeAllListeners('timeout');


								let interval_id = _setInterval(function() {

									if (socket.writable) {

										let chunk = protocol.ping();
										if (chunk !== null) {
											socket.write(chunk);
										}

									} else {

										_clearInterval(interval_id);
										interval_id = null;

									}

								}.bind(this), 60000);


								_connect_socket.call(that, socket, protocol);

							} else {

								if (lychee.debug === true) {
									console.warn('lychee.net.socket.WS: BAD HANDSHAKE to ' + host + ':' + port);
								}


								socket.end();
								socket.destroy();

								that.trigger('error');
								that.disconnect();

							}

						}

					});

					connector.once('error', function(err) {

						if (lychee.debug === true) {

							let code = err.code || '';
							if (/ECONNABORTED|ECONNREFUSED|ECONNRESET/.test(code)) {
								console.warn('lychee.net.socket.WS: BAD CONNECTION to ' + host + ':' + port);
							}

						}

						that.trigger('error');
						that.disconnect();

						this.end();
						this.destroy();

					});

					connector.connect({
						host: host,
						port: port
					});

				}


				return true;

			}


			return false;

		},

		send: function(payload, headers, binary) {

			payload = payload instanceof Buffer ? payload : null;
			headers = headers instanceof Object ? headers : null;
			binary  = binary === true;


			if (payload !== null) {

				let connection = this.__connection;
				let protocol   = this.__protocol;

				if (connection !== null && protocol !== null) {

					let chunk = protocol.send(payload, headers, binary);
					let enc   = binary === true ? 'binary' : 'utf8';

					if (chunk !== null) {

						connection.write(chunk, enc);

						return true;
					}

				}

			}


			return false;

		},

		disconnect: function() {

			let connection = this.__connection;
			let protocol   = this.__protocol;

			if (connection !== null && protocol !== null) {

				_disconnect_socket.call(this, connection, protocol);


				return true;

			}


			return false;

		}

	};


	return Composite;

});


lychee.define('lychee.ui.entity.Download').tags({
	platform: 'node'
}).includes([
	'lychee.ui.entity.Button'
]).supports(function(lychee, global) {

	if (
		typeof global.require === 'function'
		&& typeof global.process !== 'undefined'
		&& typeof global.process.env === 'object'
	) {

		try {

			global.require('fs');

			return true;

		} catch (err) {

		}

	}


	return false;

}).exports(function(lychee, global, attachments) {

	const _fs     = global.require('fs');
	const _Button = lychee.import('lychee.ui.entity.Button');
	const _HOME   = (function(env) {

		let home    = env.HOME || null;
		let appdata = env.APPDATA || null;

		if (home !== null) {
			return home;
		} else if (appdata !== null) {
			return appdata;
		} else {
			return '/tmp';
		}

	})(global.process.env);



	/*
	 * HELPERS
	 */

	const _MIME_TYPE = {
		'Config':  { name: 'Entity', ext: 'json',    enc: 'utf8'   },
		'Font':    { name: 'Entity', ext: 'fnt',     enc: 'utf8'   },
		'Music':   {
			'mp3': { name: 'Entity', ext: 'msc.mp3', enc: 'binary' },
			'ogg': { name: 'Entity', ext: 'msc.ogg', enc: 'binary' }
		},
		'Sound':   {
			'mp3': { name: 'Entity', ext: 'snd.mp3', enc: 'binary' },
			'ogg': { name: 'Entity', ext: 'snd.ogg', enc: 'binary' }
		},
		'Texture': { name: 'Entity', ext: 'png',     enc: 'binary' },
		'Stuff':   { name: 'Entity', ext: 'stuff',   enc: 'utf8'   }
	};

	const _download = function(asset) {

		let data = asset.serialize();
		let url  = data.arguments[0];
		let name = url.split('/').pop();
		let mime = _MIME_TYPE[data.constructor] || _MIME_TYPE['Stuff'];


		if (data.blob !== null) {

			if (/Music|Sound/.test(data.constructor)) {

				for (let ext in mime) {

					let blob = new Buffer(data.blob.buffer[ext], 'base64');
					let path = _HOME + '/' + name + '.' + mime[ext].ext;

					_fs.writeFileSync(path, blob, mime[ext].enc);

				}

			} else {

				let blob = new Buffer(data.blob.buffer, 'base64');
				let path = _HOME + '/' + name + '.' + mime.ext;

				if (url.substr(0, 5) === 'data:') {
					path = _HOME + '/' + mime.name + '.' + mime.ext;
				}

				_fs.writeFileSync(path, blob, mime.enc);

			}

		}

	};



	/*
	 * IMPLEMENTATION
	 */

	let Composite = function(data) {

		let settings = Object.assign({
			label: 'DOWNLOAD'
		}, data);


		this.value = [];


		this.setValue(settings.value);

		delete settings.value;


		_Button.call(this, settings);

		settings = null;



		/*
		 * INITIALIZATION
		 */

		this.unbind('touch');
		this.bind('touch', function() {

			this.value.forEach(function(asset) {
				_download(asset);
			});

		}, this);

	};


	Composite.prototype = {

		/*
		 * ENTITY API
		 */

		// deserialize: function(blob) {},

		serialize: function() {

			let data = _Button.prototype.serialize.call(this);
			data['constructor'] = 'lychee.ui.entity.Download';


			return data;

		},



		/*
		 * CUSTOM API
		 */

		setValue: function(value) {

			value = value instanceof Array ? value : null;


			if (value !== null) {

				this.value = value.filter(function(asset) {

					if (asset instanceof global.Config)  return true;
					if (asset instanceof global.Font)    return true;
					if (asset instanceof global.Music)   return true;
					if (asset instanceof global.Sound)   return true;
					if (asset instanceof global.Texture) return true;
					if (asset instanceof global.Stuff)   return true;


					return false;

				});


				return true;

			}


			return false;

		}

	};


	return Composite;

});


lychee.define('lychee.ui.entity.Helper').tags({
	platform: 'node'
}).includes([
	'lychee.ui.entity.Button'
]).supports(function(lychee, global) {

	if (typeof global.require === 'function') {

		try {

			global.require('child_process');

			return true;

		} catch (err) {

		}

	}


	return false;

}).attaches({
	"json": lychee.deserialize({"constructor":"Config","arguments":["/libraries/lychee/source/platform/node/ui/entity/Helper.json"],"blob":{"buffer":"data:application/json;base64,ewoJIm1hcCI6IHsKCQkiYm9vdCI6IFsKCQkJewoJCQkJIngiOiAwLAoJCQkJInkiOiAwLAoJCQkJInciOiAzMiwKCQkJCSJoIjogMzIKCQkJfQoJCV0sCgkJImVkaXQiOiBbCgkJCXsKCQkJCSJ4IjogMzIsCgkJCQkieSI6IDAsCgkJCQkidyI6IDMyLAoJCQkJImgiOiAzMgoJCQl9CgkJXSwKCQkiZmlsZSI6IFsKCQkJewoJCQkJIngiOiA2NCwKCQkJCSJ5IjogMCwKCQkJCSJ3IjogMzIsCgkJCQkiaCI6IDMyCgkJCX0KCQldLAoJCSJwcm9maWxlIjogWwoJCQl7CgkJCQkieCI6IDk2LAoJCQkJInkiOiAwLAoJCQkJInciOiAzMiwKCQkJCSJoIjogMzIKCQkJfQoJCV0sCgkJInJlZnJlc2giOiBbCgkJCXsKCQkJCSJ4IjogMCwKCQkJCSJ5IjogMzIsCgkJCQkidyI6IDMyLAoJCQkJImgiOiAzMgoJCQl9CgkJXSwKCQkic3RhcnQiOiBbCgkJCXsKCQkJCSJ4IjogMzIsCgkJCQkieSI6IDMyLAoJCQkJInciOiAzMiwKCQkJCSJoIjogMzIKCQkJfQoJCV0sCgkJInN0b3AiOiBbCgkJCXsKCQkJCSJ4IjogNjQsCgkJCQkieSI6IDMyLAoJCQkJInciOiAzMiwKCQkJCSJoIjogMzIKCQkJfQoJCV0sCgkJInVuYm9vdCI6IFsKCQkJewoJCQkJIngiOiA5NiwKCQkJCSJ5IjogMzIsCgkJCQkidyI6IDMyLAoJCQkJImgiOiAzMgoJCQl9CgkJXSwKCQkid2ViIjogWwoJCQl7CgkJCQkieCI6IDAsCgkJCQkieSI6IDY0LAoJCQkJInciOiAzMiwKCQkJCSJoIjogMzIKCQkJfQoJCV0KCX0sCgkic3RhdGVzIjogewoJCSJib290IjogewoJCQkiYW5pbWF0aW9uIjogZmFsc2UKCQl9LAoJCSJlZGl0IjogewoJCQkiYW5pbWF0aW9uIjogZmFsc2UKCQl9LAoJCSJmaWxlIjogewoJCQkiYW5pbWF0aW9uIjogZmFsc2UKCQl9LAoJCSJwcm9maWxlIjogewoJCQkiYW5pbWF0aW9uIjogZmFsc2UKCQl9LAoJCSJyZWZyZXNoIjogewoJCQkiYW5pbWF0aW9uIjogZmFsc2UKCQl9LAoJCSJzdGFydCI6IHsKCQkJImFuaW1hdGlvbiI6IGZhbHNlCgkJfSwKCQkic3RvcCI6IHsKCQkJImFuaW1hdGlvbiI6IGZhbHNlCgkJfSwKCQkidW5ib290IjogewoJCQkiYW5pbWF0aW9uIjogZmFsc2UKCQl9LAoJCSJ3ZWIiOiB7CgkJCSJhbmltYXRpb24iOiBmYWxzZQoJCX0KCX0KfQ=="}}),
	"png": lychee.deserialize({"constructor":"Texture","arguments":["/libraries/lychee/source/platform/node/ui/entity/Helper.png"],"blob":{"buffer":"data:image/png;base64,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"}})
}).exports(function(lychee, global, attachments) {

	const _child_process = global.require('child_process');
	const _Button        = lychee.import('lychee.ui.entity.Button');
	const _CONFIG        = attachments["json"].buffer;
	const _TEXTURE       = attachments["png"];
	const _ROOT          = lychee.ROOT.lychee;



	/*
	 * HELPERS
	 */

	const _is_value = function(value) {

		value = typeof value === 'string' ? value : null;


		if (value !== null) {

			let action   = value.split('=')[0] || '';
			let resource = value.split('=')[1] || '';
			let data     = value.split('=')[2] || '';


			if (action === 'boot' && resource !== '') {

				return true;

			} else if (action === 'profile' && resource !== '' && data !== '') {

				return true;

			} else if (action === 'unboot') {

				return true;

			} else if (/^(start|stop|edit|file|web)$/g.test(action) && resource !== '') {

				return true;

			} else if (action === 'refresh') {

				return true;

			}

		}


		return false;

	};

	const _help = function(value) {

		let action = value.split('=')[0];
		let result = false;


		if (action === 'refresh') {

			// TODO: How to refresh the local program?
			// Restart with same arguments might fail due to serialization.

		} else {

			try {

				let helper = _child_process.execFile(_ROOT + '/bin/helper.sh', [
					'lycheejs://' + value
				], {
					cwd: _ROOT
				}, function(error, stdout, stderr) {

					stderr = (stderr.trim() || '').toString();

					if (stderr !== '') {

						if (lychee.debug === true) {

							stderr.trim().split('\n').forEach(function(line) {
								console.error('lychee.ui.entity.Helper: "' + line.trim() + '"');
							});

						}

					}

				});

				helper.stdout.on('data', function(lines) {});
				helper.stderr.on('data', function(lines) {});

				helper.on('error', function() {
					this.kill('SIGTERM');
				});

				helper.on('exit', function(code) {});

				result = true;

			} catch (err) {

				result = false;

			}

		}


		return result;

	};



	/*
	 * IMPLEMENTATION
	 */

	let Composite = function(data) {

		let settings = Object.assign({
			label: 'HELPER'
		}, data);


		this.__action = null;


		_Button.call(this, settings);

		settings = null;



		/*
		 * INITIALIZATION
		 */

		this.bind('change', function(value) {
			return _help(value);
		}, this);

	};


	Composite.prototype = {

		/*
		 * ENTITY API
		 */

		// deserialize: function(blob) {},

		serialize: function() {

			let data = _Button.prototype.serialize.call(this);
			data['constructor'] = 'lychee.ui.entity.Helper';


			return data;

		},

		render: function(renderer, offsetX, offsetY) {

			if (this.visible === false) return;


			let action   = this.__action;
			let alpha    = this.alpha;
			let font     = this.font;
			let label    = this.label;
			let position = this.position;
			let x        = position.x + offsetX;
			let y        = position.y + offsetY;
			let hwidth   = this.width  / 2;
			let hheight  = this.height / 2;


			if (alpha !== 1) {
				renderer.setAlpha(alpha);
			}


			renderer.drawBox(
				x - hwidth,
				y - hheight,
				x + hwidth,
				y + hheight,
				'#545454',
				true
			);


			let pulse = this.__pulse;
			if (pulse.active === true) {

				renderer.setAlpha(pulse.alpha);

				renderer.drawBox(
					x - hwidth,
					y - hheight,
					x + hwidth,
					y + hheight,
					'#32afe5',
					true
				);

				renderer.setAlpha(1.0);

			}


			if (action !== null) {

				let map = _CONFIG.map[action] || null;
				if (map !== null) {

					if (this.width > 96) {

						renderer.drawSprite(
							x - hwidth,
							y - hheight,
							_TEXTURE,
							map[0]
						);

						renderer.drawText(
							x,
							y,
							label,
							font,
							true
						);

					} else {

						renderer.drawSprite(
							x - map[0].w / 2,
							y - hheight,
							_TEXTURE,
							map[0]
						);

					}

				} else if (label !== null && font !== null) {

					renderer.drawText(
						x,
						y,
						label,
						font,
						true
					);

				}

			} else if (label !== null && font !== null) {

				renderer.drawText(
					x,
					y,
					label,
					font,
					true
				);

			}


			if (alpha !== 1) {
				renderer.setAlpha(1.0);
			}

		},



		/*
		 * CUSTOM API
		 */

		setValue: function(value) {

			value = typeof value === 'string' ? value : null;


			if (value !== null && _is_value(value) === true) {

				this.value    = value;
				this.__action = value.split('=')[0] || null;

				return true;

			}


			return false;

		}

	};


	return Composite;

});


lychee.define('lychee.ui.entity.Upload').tags({
	platform: 'node'
}).includes([
	'lychee.ui.entity.Button'
]).supports(function(lychee, global) {

	// XXX: This is a stub API

	return true;

}).exports(function(lychee, global, attachments) {

	const _Button = lychee.import('lychee.ui.entity.Button');



	/*
	 * IMPLEMENTATION
	 */

	let Composite = function(data) {

		let settings = Object.assign({
			label: 'UPLOAD'
		}, data);


		this.type  = Composite.TYPE.asset;
		this.value = [];


		this.setType(settings.type);
		this.setValue(settings.value);

		delete settings.type;
		delete settings.value;


		_Button.call(this, settings);

		settings = null;



		/*
		 * INITIALIZATION
		 */

		this.unbind('touch');
		this.bind('touch', function() {

			// TODO: Show file dialog
			// TODO: trigger 'change' with null on no selection
			// TODO: trigger 'change' with Asset array on selection

		}, this);

	};


	Composite.TYPE = {
		'all':     0,
		'config':  1,
		'font':    2,
		'music':   3,
		'sound':   4,
		'texture': 5,
		'stuff':   6
	};


	Composite.prototype = {

		/*
		 * ENTITY API
		 */

		// deserialize: function(blob) {},

		serialize: function() {

			let data = _Button.prototype.serialize.call(this);
			data['constructor'] = 'lychee.ui.entity.Upload';


			return data;

		},



		/*
		 * CUSTOM API
		 */

		setType: function(type) {

			type = lychee.enumof(Composite.TYPE, type) ? type : null;


			if (type !== null) {

				this.type = type;

				return true;

			}


			return false;

		},

		setValue: function(value) {

			value = value instanceof Array ? value : null;


			if (value !== null) {

				this.value = value.filter(function(asset) {

					if (asset instanceof global.Config)  return true;
					if (asset instanceof global.Font)    return true;
					if (asset instanceof global.Music)   return true;
					if (asset instanceof global.Sound)   return true;
					if (asset instanceof global.Texture) return true;
					if (asset instanceof global.Stuff)   return true;


					return false;

				});


				return true;

			}


			return false;

		}

	};


	return Composite;

});


(function(lychee, global) {

	let environment = lychee.deserialize({"constructor":"lychee.Environment","arguments":[{"id":"/libraries/fertilizer/dist","build":"fertilizer.Main","debug":false,"sandbox":false,"timeout":5000,"type":"build","tags":{"platform":["node"]}}],"blob":{"definitions":{"fertilizer.Main":{"constructor":"lychee.Definition","arguments":[{"id":"fertilizer.Main"}],"blob":{"attaches":{},"requires":["lychee.Input","lychee.codec.JSON","fertilizer.data.Shell","fertilizer.template.html.Application","fertilizer.template.html.Library","fertilizer.template.html-nwjs.Application","fertilizer.template.html-nwjs.Library","fertilizer.template.html-webview.Application","fertilizer.template.html-webview.Library","fertilizer.template.node.Application","fertilizer.template.node.Library"],"includes":["lychee.event.Emitter"],"exports":"function (lychee, global, attachments) {\n\n\tconst _lychee   = lychee.import('lychee');\n\tconst _template = lychee.import('fertilizer.template');\n\tconst _Emitter  = lychee.import('lychee.event.Emitter');\n\tconst _Input    = lychee.import('lychee.Input');\n\tconst _Template = lychee.import('fertilizer.Template');\n\tconst _JSON     = lychee.import('lychee.codec.JSON');\n\n\n\n\t/*\n\t * IMPLEMENTATION\n\t */\n\n\tlet Composite = function(settings) {\n\n\t\tthis.settings = _lychee.assignunlink({\n\t\t\tproject:    null,\n\t\t\tidentifier: null,\n\t\t\tsettings:   null\n\t\t}, settings);\n\n\t\tthis.defaults = _lychee.assignunlink({\n\t\t\tproject:    null,\n\t\t\tidentifier: null,\n\t\t\tsettings:   null\n\t\t}, this.settings);\n\n\n\t\t_Emitter.call(this);\n\n\t\tsettings = null;\n\n\n\n\t\t/*\n\t\t * INITIALIZATION\n\t\t */\n\n\t\tthis.bind('load', function() {\n\n\t\t\tlet identifier = this.settings.identifier || null;\n\t\t\tlet project    = this.settings.project    || null;\n\t\t\tlet data       = this.settings.settings   || null;\n\n\t\t\tif (identifier !== null && project !== null && data !== null) {\n\n\t\t\t\tlet platform = data.tags.platform[0] || null;\n\t\t\t\tlet variant  = data.variant || null;\n\t\t\t\tlet settings = _JSON.decode(_JSON.encode(Object.assign({}, data, {\n\t\t\t\t\tdebug:   false,\n\t\t\t\t\tsandbox: true,\n\t\t\t\t\ttimeout: 5000,\n\t\t\t\t\ttype:    'export'\n\t\t\t\t})));\n\n\n\t\t\t\tlet profile = {};\n\t\t\t\tif (settings.profile instanceof Object) {\n\t\t\t\t\tprofile = settings.profile;\n\t\t\t\t}\n\n\n\t\t\t\tif (platform !== null && /application|library/g.test(variant)) {\n\n\t\t\t\t\tif (settings.packages instanceof Array) {\n\n\t\t\t\t\t\tsettings.packages = settings.packages.map(function(pkg) {\n\n\t\t\t\t\t\t\tlet id   = pkg[0];\n\t\t\t\t\t\t\tlet path = pkg[1];\n\t\t\t\t\t\t\tif (path.substr(0, 2) === './') {\n\t\t\t\t\t\t\t\tpath = project + '/' + path.substr(2);\n\t\t\t\t\t\t\t}\n\n\n\t\t\t\t\t\t\treturn [ id, path ];\n\n\t\t\t\t\t\t});\n\n\t\t\t\t\t}\n\n\n\t\t\t\t\tlet that           = this;\n\t\t\t\t\tlet environment    = new _lychee.Environment(settings);\n\t\t\t\t\tlet fertilizer_pkg = environment.packages.filter(function(pkg) {\n\t\t\t\t\t\treturn pkg.id === 'fertilizer';\n\t\t\t\t\t})[0] || null;\n\n\t\t\t\t\tif (fertilizer_pkg !== null) {\n\n\t\t\t\t\t\tfor (let id in _lychee.environment.definitions) {\n\t\t\t\t\t\t\tenvironment.define(_lychee.environment.definitions[id]);\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\n\t\t\t\t\t_lychee.debug = false;\n\t\t\t\t\t_lychee.setEnvironment(environment);\n\n\n\t\t\t\t\tenvironment.init(function(sandbox) {\n\n\t\t\t\t\t\tif (sandbox !== null) {\n\n\t\t\t\t\t\t\t// IMPORTANT: Don't use Environment's imperative API here!\n\t\t\t\t\t\t\t// Environment identifier is /libraries/lychee/main instead of /libraries/lychee/html/main\n\n\t\t\t\t\t\t\tenvironment.id       = project + '/' + identifier.split('/').pop();\n\t\t\t\t\t\t\tenvironment.type     = 'build';\n\t\t\t\t\t\t\tenvironment.debug    = that.defaults.settings.debug;\n\t\t\t\t\t\t\tenvironment.sandbox  = that.defaults.settings.sandbox;\n\t\t\t\t\t\t\tenvironment.packages = [];\n\n\n\t\t\t\t\t\t\t_lychee.setEnvironment(null);\n\n\n\t\t\t\t\t\t\tthat.trigger('init', [ project, identifier, platform, variant, environment, profile ]);\n\n\t\t\t\t\t\t} else {\n\n\t\t\t\t\t\t\tconsole.error('fertilizer: FAILURE (\"' + project + ' | ' + identifier + '\") at \"load\" event');\n\n\t\t\t\t\t\t\tif (typeof environment.global.console.serialize === 'function') {\n\n\t\t\t\t\t\t\t\tlet debug = environment.global.console.serialize();\n\t\t\t\t\t\t\t\tif (debug.blob !== null) {\n\n\t\t\t\t\t\t\t\t\t(debug.blob.stderr || '').trim().split('\\n').map(function(line) {\n\t\t\t\t\t\t\t\t\t\treturn (line.indexOf(':') !== -1 ? line.split(':')[1].trim() : '');\n\t\t\t\t\t\t\t\t\t}).forEach(function(line) {\n\t\t\t\t\t\t\t\t\t\tconsole.error('fertilizer: ' + line);\n\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t}\n\n\n\t\t\t\t\t\t\tthat.destroy(1);\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t});\n\n\n\t\t\t\t\treturn true;\n\n\t\t\t\t}\n\n\t\t\t} else if (project !== null) {\n\n\t\t\t\tthis.trigger('init', [ project, identifier, null, null ]);\n\n\t\t\t\treturn true;\n\n\t\t\t} else {\n\n\t\t\t\tconsole.error('fertilizer: FAILURE (\"' + project + ' | ' + identifier + '\") at \"load\" event');\n\t\t\t\tthis.destroy(1);\n\n\n\t\t\t\treturn false;\n\n\t\t\t}\n\n\t\t}, this, true);\n\n\t\tthis.bind('init', function(project, identifier, platform, variant, environment, profile) {\n\n\t\t\tlet construct = null;\n\t\t\tif (platform !== null && variant !== null && typeof _template[platform] === 'object') {\n\t\t\t\tconstruct = _template[platform][variant.charAt(0).toUpperCase() + variant.substr(1).toLowerCase()] || null;\n\t\t\t} else {\n\t\t\t\tconstruct = _Template;\n\t\t\t}\n\n\n\t\t\tif (construct !== null) {\n\n\t\t\t\tlychee.ROOT.project                           = _lychee.ROOT.lychee + project;\n\t\t\t\tlychee.environment.global.lychee.ROOT.project = _lychee.ROOT.lychee + project;\n\n\n\t\t\t\tlet template = new construct({});\n\t\t\t\tif (template instanceof _Template) {\n\n\t\t\t\t\t// XXX: Third-party project\n\n\t\t\t\t\ttemplate.setSandbox(project + '/build');\n\n\t\t\t\t\ttemplate.then('configure-project');\n\t\t\t\t\ttemplate.then('build-project');\n\t\t\t\t\ttemplate.then('package-project');\n\n\t\t\t\t} else {\n\n\t\t\t\t\t// XXX: lychee.js project\n\n\t\t\t\t\ttemplate.setEnvironment(environment);\n\t\t\t\t\ttemplate.setProfile(profile);\n\t\t\t\t\ttemplate.setSandbox(project + '/build/' + identifier);\n\n\t\t\t\t\ttemplate.then('configure');\n\t\t\t\t\ttemplate.then('configure-project');\n\t\t\t\t\ttemplate.then('build');\n\t\t\t\t\ttemplate.then('build-project');\n\t\t\t\t\ttemplate.then('package');\n\t\t\t\t\ttemplate.then('package-project');\n\n\t\t\t\t}\n\n\n\t\t\t\ttemplate.bind('configure-project', function(oncomplete) {\n\n\t\t\t\t\tthis.shell.exec(project + '/bin/configure.sh ' + identifier, function(result) {\n\n\t\t\t\t\t\tif (result === true) {\n\t\t\t\t\t\t\tconsole.info('fertilizer: CONFIGURE-PROJECT SUCCESS');\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tconsole.warn('fertilizer: CONFIGURE-PROJECT FAILURE');\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\toncomplete(true);\n\n\t\t\t\t\t});\n\n\t\t\t\t}, template);\n\n\t\t\t\ttemplate.bind('build-project', function(oncomplete) {\n\n\t\t\t\t\tthis.shell.exec(project + '/bin/build.sh ' + identifier, function(result) {\n\n\t\t\t\t\t\tif (result === true) {\n\t\t\t\t\t\t\tconsole.info('fertilizer: BUILD-PROJECT SUCCESS');\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tconsole.warn('fertilizer: BUILD-PROJECT FAILURE');\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\toncomplete(true);\n\n\t\t\t\t\t});\n\n\t\t\t\t}, template);\n\n\t\t\t\ttemplate.bind('package-project', function(oncomplete) {\n\n\t\t\t\t\tthis.shell.exec(project + '/bin/package.sh ' + identifier, function(result) {\n\n\t\t\t\t\t\tif (result === true) {\n\n\t\t\t\t\t\t\tconsole.info('fertilizer: PACKAGE-PROJECT SUCCESS');\n\t\t\t\t\t\t\toncomplete(true);\n\n\t\t\t\t\t\t} else {\n\n\t\t\t\t\t\t\tconsole.warn('fertilizer: PACKAGE-PROJECT FAILURE');\n\t\t\t\t\t\t\toncomplete(true);\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t});\n\n\t\t\t\t}, template);\n\n\n\t\t\t\ttemplate.bind('complete', function() {\n\n\t\t\t\t\tconsole.info('fertilizer: SUCCESS (\"' + project + ' | ' + identifier + '\")');\n\t\t\t\t\tthis.destroy(0);\n\n\t\t\t\t}, this);\n\n\t\t\t\ttemplate.bind('error', function(event) {\n\n\t\t\t\t\tconsole.error('fertilizer: FAILURE (\"' + project + ' | ' + identifier + '\") at \"' + event + '\" event');\n\t\t\t\t\tthis.destroy(1);\n\n\t\t\t\t}, this);\n\n\n\t\t\t\ttemplate.init();\n\n\n\t\t\t\treturn true;\n\n\t\t\t}\n\n\n\t\t\tconsole.error('fertilizer: FAILURE (\"' + project + ' | ' + identifier + '\") at \"init\" event');\n\t\t\tthis.destroy(1);\n\n\n\t\t\treturn false;\n\n\t\t}, this, true);\n\n\t};\n\n\n\tComposite.prototype = {\n\n\t\t/*\n\t\t * ENTITY API\n\t\t */\n\n\t\t// deserialize: function(blob) {},\n\n\t\tserialize: function() {\n\n\t\t\tlet data = _Emitter.prototype.serialize.call(this);\n\t\t\tdata['constructor'] = 'fertilizer.Main';\n\n\n\t\t\tlet settings = _lychee.assignunlink({}, this.settings);\n\t\t\tlet blob     = data['blob'] || {};\n\n\n\t\t\tdata['arguments'][0] = settings;\n\t\t\tdata['blob']         = Object.keys(blob).length > 0 ? blob : null;\n\n\n\t\t\treturn data;\n\n\t\t},\n\n\n\n\t\t/*\n\t\t * MAIN API\n\t\t */\n\n\t\tinit: function() {\n\n\t\t\tthis.trigger('load');\n\n\t\t\treturn true;\n\n\t\t},\n\n\t\tdestroy: function(code) {\n\n\t\t\tcode = typeof code === 'number' ? code : 0;\n\n\n\t\t\tthis.trigger('destroy', [ code ]);\n\n\t\t\treturn true;\n\n\t\t}\n\n\t};\n\n\n\treturn Composite;\n\n}"}},"lychee.event.Emitter":{"constructor":"lychee.Definition","arguments":[{"id":"lychee.event.Emitter"}],"blob":{"attaches":{},"exports":"function (lychee, global, attachments) {\n\n\t/*\n\t * HELPERS\n\t */\n\n\tconst _bind = function(event, callback, scope, once) {\n\n\t\tif (event === null || callback === null) {\n\t\t\treturn false;\n\t\t}\n\n\n\t\tlet pass_event = false;\n\t\tlet pass_self  = false;\n\n\t\tlet modifier = event.charAt(0);\n\t\tif (modifier === '@') {\n\n\t\t\tevent      = event.substr(1, event.length - 1);\n\t\t\tpass_event = true;\n\n\t\t} else if (modifier === '#') {\n\n\t\t\tevent     = event.substr(1, event.length - 1);\n\t\t\tpass_self = true;\n\n\t\t}\n\n\n\t\tif (this.___events[event] === undefined) {\n\t\t\tthis.___events[event] = [];\n\t\t}\n\n\n\t\tthis.___events[event].push({\n\t\t\tpass_event: pass_event,\n\t\t\tpass_self:  pass_self,\n\t\t\tcallback:   callback,\n\t\t\tscope:      scope,\n\t\t\tonce:       once\n\t\t});\n\n\n\t\treturn true;\n\n\t};\n\n\tconst _relay = function(event, instance, once) {\n\n\t\tif (event === null || instance === null) {\n\t\t\treturn false;\n\t\t}\n\n\n\t\tlet callback = function() {\n\n\t\t\tlet event = arguments[0];\n\t\t\tlet data  = [];\n\n\t\t\tfor (let a = 1, al = arguments.length; a < al; a++) {\n\t\t\t\tdata.push(arguments[a]);\n\t\t\t}\n\n\t\t\tthis.trigger(event, data);\n\n\t\t};\n\n\n\t\tif (this.___events[event] === undefined) {\n\t\t\tthis.___events[event] = [];\n\t\t}\n\n\n\t\tthis.___events[event].push({\n\t\t\tpass_event: true,\n\t\t\tpass_self:  false,\n\t\t\tcallback:   callback,\n\t\t\tscope:      instance,\n\t\t\tonce:       once\n\t\t});\n\n\n\t\treturn true;\n\n\t};\n\n\tconst _trigger = function(event, data) {\n\n\t\tif (this.___events !== undefined && this.___events[event] !== undefined) {\n\n\t\t\tlet value = undefined;\n\n\t\t\tfor (let e = 0; e < this.___events[event].length; e++) {\n\n\t\t\t\tlet args  = [];\n\t\t\t\tlet entry = this.___events[event][e];\n\n\t\t\t\tif (entry.pass_event === true) {\n\n\t\t\t\t\targs.push(event);\n\n\t\t\t\t} else if (entry.pass_self === true) {\n\n\t\t\t\t\targs.push(this);\n\n\t\t\t\t}\n\n\n\t\t\t\tif (data !== null) {\n\t\t\t\t\targs.push.apply(args, data);\n\t\t\t\t}\n\n\n\t\t\t\tlet result = entry.callback.apply(entry.scope, args);\n\t\t\t\tif (result !== undefined) {\n\t\t\t\t\tvalue = result;\n\t\t\t\t}\n\n\n\t\t\t\tif (entry.once === true) {\n\n\t\t\t\t\tif (this.unbind(event, entry.callback, entry.scope) === true) {\n\t\t\t\t\t\te--;\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\tif (value !== undefined) {\n\t\t\t\treturn value;\n\t\t\t} else {\n\t\t\t\treturn true;\n\t\t\t}\n\n\t\t}\n\n\n\t\treturn false;\n\n\t};\n\n\tconst _unbind = function(event, callback, scope) {\n\n\t\tlet found = false;\n\n\t\tif (event !== null) {\n\n\t\t\tfound = _unbind_event.call(this, event, callback, scope);\n\n\t\t} else {\n\n\t\t\tfor (event in this.___events) {\n\n\t\t\t\tlet result = _unbind_event.call(this, event, callback, scope);\n\t\t\t\tif (result === true) {\n\t\t\t\t\tfound = true;\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t}\n\n\n\t\treturn found;\n\n\t};\n\n\tconst _unbind_event = function(event, callback, scope) {\n\n\t\tif (this.___events !== undefined && this.___events[event] !== undefined) {\n\n\t\t\tlet found = false;\n\n\t\t\tfor (let e = 0, el = this.___events[event].length; e < el; e++) {\n\n\t\t\t\tlet entry = this.___events[event][e];\n\n\t\t\t\tif ((callback === null || entry.callback === callback) && (scope === null || entry.scope === scope)) {\n\n\t\t\t\t\tfound = true;\n\n\t\t\t\t\tthis.___events[event].splice(e, 1);\n\t\t\t\t\tel--;\n\t\t\t\t\te--;\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\treturn found;\n\n\t\t}\n\n\n\t\treturn false;\n\n\t};\n\n\n\n\t/*\n\t * IMPLEMENTATION\n\t */\n\n\tlet Composite = function() {\n\n\t\tthis.___events   = {};\n\t\tthis.___timeline = {\n\t\t\tbind:    [],\n\t\t\ttrigger: [],\n\t\t\trelay:   [],\n\t\t\tunbind:  []\n\t\t};\n\n\t};\n\n\n\tComposite.prototype = {\n\n\t\t/*\n\t\t * ENTITY API\n\t\t */\n\n\t\tdeserialize: function(blob) {\n\n\t\t\tif (blob.events instanceof Object) {\n\t\t\t\t// TODO: deserialize events\n\t\t\t}\n\n\t\t\tif (blob.timeline instanceof Object) {\n\t\t\t\t// TODO: deserialize timeline\n\t\t\t}\n\n\t\t},\n\n\t\tserialize: function() {\n\n\t\t\tlet blob = {};\n\n\n\t\t\tif (Object.keys(this.___events).length > 0) {\n\n\t\t\t\tblob.events = {};\n\n\t\t\t\tfor (let event in this.___events) {\n\n\t\t\t\t\tblob.events[event] = [];\n\n\t\t\t\t\tfor (let e = 0, el = this.___events[event].length; e < el; e++) {\n\n\t\t\t\t\t\tlet entry = this.___events[event][e];\n\n\t\t\t\t\t\tblob.events[event].push({\n\t\t\t\t\t\t\tpass_event: entry.pass_event,\n\t\t\t\t\t\t\tpass_self:  entry.pass_self,\n\t\t\t\t\t\t\tcallback:   lychee.serialize(entry.callback),\n\t\t\t\t\t\t\t// scope:      lychee.serialize(entry.scope),\n\t\t\t\t\t\t\tscope:      null,\n\t\t\t\t\t\t\tonce:       entry.once\n\t\t\t\t\t\t});\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\tif (this.___timeline.bind.length > 0 || this.___timeline.trigger.length > 0 || this.___timeline.unbind.length > 0) {\n\n\t\t\t\tblob.timeline = {};\n\n\n\t\t\t\tif (this.___timeline.bind.length > 0) {\n\n\t\t\t\t\tblob.timeline.bind = [];\n\n\t\t\t\t\tfor (let b = 0, bl = this.___timeline.bind.length; b < bl; b++) {\n\t\t\t\t\t\tblob.timeline.bind.push(this.___timeline.bind[b]);\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t\tif (this.___timeline.trigger.length > 0) {\n\n\t\t\t\t\tblob.timeline.trigger = [];\n\n\t\t\t\t\tfor (let t = 0, tl = this.___timeline.trigger.length; t < tl; t++) {\n\t\t\t\t\t\tblob.timeline.trigger.push(this.___timeline.trigger[t]);\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t\tif (this.___timeline.unbind.length > 0) {\n\n\t\t\t\t\tblob.timeline.unbind = [];\n\n\t\t\t\t\tfor (let u = 0, ul = this.___timeline.unbind.length; u < ul; u++) {\n\t\t\t\t\t\tblob.timeline.unbind.push(this.___timeline.unbind[u]);\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\treturn {\n\t\t\t\t'constructor': 'lychee.event.Emitter',\n\t\t\t\t'arguments':   [],\n\t\t\t\t'blob':        Object.keys(blob).length > 0 ? blob : null\n\t\t\t};\n\n\t\t},\n\n\n\n\t\t/*\n\t\t * CUSTOM API\n\t\t */\n\n\t\tbind: function(event, callback, scope, once) {\n\n\t\t\tevent    = typeof event === 'string'    ? event    : null;\n\t\t\tcallback = callback instanceof Function ? callback : null;\n\t\t\tscope    = scope !== undefined          ? scope    : this;\n\t\t\tonce     = once === true;\n\n\n\t\t\tlet result = _bind.call(this, event, callback, scope, once);\n\t\t\tif (result === true && lychee.debug === true) {\n\n\t\t\t\tthis.___timeline.bind.push({\n\t\t\t\t\ttime:     Date.now(),\n\t\t\t\t\tevent:    event,\n\t\t\t\t\tcallback: lychee.serialize(callback),\n\t\t\t\t\t// scope:    lychee.serialize(scope),\n\t\t\t\t\tscope:    null,\n\t\t\t\t\tonce:     once\n\t\t\t\t});\n\n\t\t\t}\n\n\n\t\t\treturn result;\n\n\t\t},\n\n\t\trelay: function(event, instance, once) {\n\n\t\t\tevent    = typeof event === 'string'               ? event    : null;\n\t\t\tinstance = lychee.interfaceof(Composite, instance) ? instance : null;\n\t\t\tonce     = once === true;\n\n\n\t\t\tlet result = _relay.call(this, event, instance, once);\n\t\t\tif (result === true && lychee.debug === true) {\n\n\t\t\t\tthis.___timeline.relay.push({\n\t\t\t\t\ttime:     Date.now(),\n\t\t\t\t\tevent:    event,\n\t\t\t\t\tinstance: lychee.serialize(instance),\n\t\t\t\t\tonce:     once\n\t\t\t\t});\n\n\t\t\t}\n\n\n\t\t\treturn result;\n\n\t\t},\n\n\t\ttrigger: function(event, data) {\n\n\t\t\tevent = typeof event === 'string' ? event : null;\n\t\t\tdata  = data instanceof Array     ? data  : null;\n\n\n\t\t\tlet result = _trigger.call(this, event, data);\n\t\t\tif (result === true && lychee.debug === true) {\n\n\t\t\t\tthis.___timeline.trigger.push({\n\t\t\t\t\ttime:  Date.now(),\n\t\t\t\t\tevent: event,\n\t\t\t\t\tdata:  lychee.serialize(data)\n\t\t\t\t});\n\n\t\t\t}\n\n\n\t\t\treturn result;\n\n\t\t},\n\n\t\tunbind: function(event, callback, scope) {\n\n\t\t\tevent    = typeof event === 'string'    ? event    : null;\n\t\t\tcallback = callback instanceof Function ? callback : null;\n\t\t\tscope    = scope !== undefined          ? scope    : null;\n\n\n\t\t\tlet result = _unbind.call(this, event, callback, scope);\n\t\t\tif (result === true) {\n\n\t\t\t\tthis.___timeline.unbind.push({\n\t\t\t\t\ttime:     Date.now(),\n\t\t\t\t\tevent:    event,\n\t\t\t\t\tcallback: lychee.serialize(callback),\n\t\t\t\t\t// scope:    lychee.serialize(scope)\n\t\t\t\t\tscope:    null\n\t\t\t\t});\n\n\t\t\t}\n\n\n\t\t\treturn result;\n\n\t\t}\n\n\t};\n\n\n\treturn Composite;\n\n}"}},"lychee.Input":{"constructor":"lychee.Definition","arguments":[{"id":"lychee.Input"}],"blob":{"attaches":{},"tags":{"platform":"node"},"includes":["lychee.event.Emitter"],"supports":"function (lychee, global) {\n\n\tif (\n\t\ttypeof global.process !== 'undefined'\n\t\t&& typeof global.process.stdin === 'object'\n\t\t&& typeof global.process.stdin.on === 'function'\n\t) {\n\t\treturn true;\n\t}\n\n\n\treturn false;\n\n}","exports":"function (lychee, global, attachments) {\n\n\tconst _process   = global.process;\n\tconst _Emitter   = lychee.import('lychee.event.Emitter');\n\tconst _INSTANCES = [];\n\n\n\n\t/*\n\t * EVENTS\n\t */\n\n\tconst _listeners = {\n\n\t\tkeypress: function(key) {\n\n\t\t\t// TTY conform behaviour\n\t\t\tif (key.ctrl === true && key.name === 'c') {\n\n\t\t\t\tkey.name  = 'escape';\n\t\t\t\tkey.ctrl  = false;\n\t\t\t\tkey.alt   = false;\n\t\t\t\tkey.shift = false;\n\n\t\t\t}\n\n\n\t\t\tfor (let i = 0, l = _INSTANCES.length; i < l; i++) {\n\t\t\t\t_process_key.call(_INSTANCES[i], key.name, key.ctrl, key.meta, key.shift);\n\t\t\t}\n\n\t\t}\n\n\t};\n\n\n\n\t/*\n\t * FEATURE DETECTION\n\t */\n\n\t(function() {\n\n\t\tlet keypress = true;\n\t\tif (keypress === true) {\n\t\t\t_process.stdin.on('keypress', _listeners.keypress);\n\t\t}\n\n\n\t\tif (lychee.debug === true) {\n\n\t\t\tlet methods = [];\n\n\t\t\tif (keypress) methods.push('Keyboard');\n\n\t\t\tif (methods.length === 0) {\n\t\t\t\tconsole.error('lychee.Input: Supported methods are NONE');\n\t\t\t} else {\n\t\t\t\tconsole.info('lychee.Input: Supported methods are ' + methods.join(', '));\n\t\t\t}\n\n\t\t}\n\n\t})();\n\n\n\n\t/*\n\t * HELPERS\n\t */\n\n\tconst _process_key = function(key, ctrl, alt, shift) {\n\n\t\tif (this.key === false) {\n\n\t\t\treturn false;\n\n\t\t} else if (this.keymodifier === false) {\n\n\t\t\tif (key === 'ctrl' || key === 'meta' || key === 'shift') {\n\t\t\t\treturn true;\n\t\t\t}\n\n\t\t}\n\n\n\t\tlet name    = '';\n\t\tlet handled = false;\n\t\tlet delta   = Date.now() - this.__clock.key;\n\n\t\tif (delta < this.delay) {\n\t\t\treturn true;\n\t\t} else {\n\t\t\tthis.__clock.key = Date.now();\n\t\t}\n\n\n\t\t// 0. Computation: Normal Characters\n\t\tif (ctrl  === true) name += 'ctrl-';\n\t\tif (alt   === true) name += 'alt-';\n\t\tif (shift === true) name += 'shift-';\n\n\t\tname += key.toLowerCase();\n\n\n\t\t// 1. Event API\n\t\tif (key !== null) {\n\n\t\t\t// allow bind('key') and bind('ctrl-a');\n\n\t\t\thandled = this.trigger('key', [ key, name, delta ]) || handled;\n\t\t\thandled = this.trigger(name,  [ delta ])            || handled;\n\n\t\t}\n\n\n\t\treturn handled;\n\n\t};\n\n\n\n\t/*\n\t * IMPLEMENTATION\n\t */\n\n\tlet Composite = function(data) {\n\n\t\tlet settings = Object.assign({}, data);\n\n\n\t\tthis.delay       = 0;\n\t\tthis.key         = false;\n\t\tthis.keymodifier = false;\n\t\tthis.touch       = false;\n\t\tthis.swipe       = false;\n\n\t\tthis.__clock  = {\n\t\t\tkey:   Date.now(),\n\t\t\ttouch: Date.now(),\n\t\t\tswipe: Date.now()\n\t\t};\n\n\n\t\tthis.setDelay(settings.delay);\n\t\tthis.setKey(settings.key);\n\t\tthis.setKeyModifier(settings.keymodifier);\n\t\tthis.setTouch(settings.touch);\n\t\tthis.setSwipe(settings.swipe);\n\n\n\t\t_Emitter.call(this);\n\n\t\t_INSTANCES.push(this);\n\n\t\tsettings = null;\n\n\t};\n\n\n\tComposite.prototype = {\n\n\t\tdestroy: function() {\n\n\t\t\tlet found = false;\n\n\t\t\tfor (let i = 0, il = _INSTANCES.length; i < il; i++) {\n\n\t\t\t\tif (_INSTANCES[i] === this) {\n\t\t\t\t\t_INSTANCES.splice(i, 1);\n\t\t\t\t\tfound = true;\n\t\t\t\t\til--;\n\t\t\t\t\ti--;\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t\tthis.unbind();\n\n\n\t\t\treturn found;\n\n\t\t},\n\n\n\n\t\t/*\n\t\t * ENTITY API\n\t\t */\n\n\t\t// deserialize: function(blob) {},\n\n\t\tserialize: function() {\n\n\t\t\tlet data = _Emitter.prototype.serialize.call(this);\n\t\t\tdata['constructor'] = 'lychee.Input';\n\n\t\t\tlet settings = {};\n\n\n\t\t\tif (this.delay !== 0)           settings.delay       = this.delay;\n\t\t\tif (this.key !== false)         settings.key         = this.key;\n\t\t\tif (this.keymodifier !== false) settings.keymodifier = this.keymodifier;\n\t\t\tif (this.touch !== false)       settings.touch       = this.touch;\n\t\t\tif (this.swipe !== false)       settings.swipe       = this.swipe;\n\n\n\t\t\tdata['arguments'][0] = settings;\n\n\n\t\t\treturn data;\n\n\t\t},\n\n\n\n\t\t/*\n\t\t * CUSTOM API\n\t\t */\n\n\t\tsetDelay: function(delay) {\n\n\t\t\tdelay = typeof delay === 'number' ? delay : null;\n\n\n\t\t\tif (delay !== null) {\n\n\t\t\t\tthis.delay = delay;\n\n\t\t\t\treturn true;\n\n\t\t\t}\n\n\n\t\t\treturn false;\n\n\t\t},\n\n\t\tsetKey: function(key) {\n\n\t\t\tkey = typeof key === 'boolean' ? key : null;\n\n\n\t\t\tif (key !== null) {\n\n\t\t\t\tthis.key = key;\n\n\t\t\t\treturn true;\n\n\t\t\t}\n\n\n\t\t\treturn false;\n\n\t\t},\n\n\t\tsetKeyModifier: function(keymodifier) {\n\n\t\t\tkeymodifier = typeof keymodifier === 'boolean' ? keymodifier : null;\n\n\n\t\t\tif (keymodifier !== null) {\n\n\t\t\t\tthis.keymodifier = keymodifier;\n\n\t\t\t\treturn true;\n\n\t\t\t}\n\n\n\t\t\treturn false;\n\n\t\t},\n\n\t\tsetTouch: function(touch) {\n\n\t\t\ttouch = typeof touch === 'boolean' ? touch : null;\n\n\n\t\t\tif (touch !== null) {\n\n\t\t\t\t// XXX: No touch support\n\n\t\t\t}\n\n\n\t\t\treturn false;\n\n\t\t},\n\n\t\tsetScroll: function(scroll) {\n\n\t\t\tscroll = typeof scroll === 'boolean' ? scroll : null;\n\n\n\t\t\tif (scroll !== null) {\n\n\t\t\t\t// XXX: No scroll support\n\n\t\t\t}\n\n\n\t\t\treturn false;\n\n\t\t},\n\n\t\tsetSwipe: function(swipe) {\n\n\t\t\tswipe = typeof swipe === 'boolean' ? swipe : null;\n\n\n\t\t\tif (swipe !== null) {\n\n\t\t\t\t// XXX: No swipe support\n\n\t\t\t}\n\n\n\t\t\treturn false;\n\n\t\t}\n\n\t};\n\n\n\treturn Composite;\n\n}"}},"lychee.codec.JSON":{"constructor":"lychee.Definition","arguments":[{"id":"lychee.codec.JSON"}],"blob":{"attaches":{},"exports":"function (lychee, global, attachments) {\n\n\t/*\n\t * HELPERS\n\t */\n\n\tconst _CHARS_SEARCH = /[\\\\\"\\u0000-\\u001f\\u007f-\\u009f\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]/g;\n\tconst _CHARS_META   = {\n\t\t'\\r': '',    // FUCK YOU, Microsoft!\n\t\t'\\b': '\\\\b',\n\t\t'\\t': '\\\\t',\n\t\t'\\n': '\\\\n',\n\t\t'\\f': '\\\\f',\n\t\t'\"':  '\\\\\"',\n\t\t'\\\\': '\\\\\\\\'\n\t};\n\n\tconst _desanitize_string = function(san) {\n\n\t\tlet str = san;\n\n\t\t// str = str.replace(/\\\\b/g, '\\b');\n\t\t// str = str.replace(/\\\\f/g, '\\f');\n\t\tstr = str.replace(/\\\\t/g, '\\t');\n\t\tstr = str.replace(/\\\\n/g, '\\n');\n\t\tstr = str.replace(/\\\\\\\\/g, '\\\\');\n\n\t\treturn str;\n\n\t};\n\n\tconst _sanitize_string = function(str) {\n\n\t\tlet san = str;\n\n\t\tif (_CHARS_SEARCH.test(san)) {\n\n\t\t\tsan = san.replace(_CHARS_SEARCH, function(char) {\n\n\t\t\t\tlet meta = _CHARS_META[char];\n\t\t\t\tif (meta !== undefined) {\n\t\t\t\t\treturn meta;\n\t\t\t\t} else {\n\t\t\t\t\treturn '\\\\u' + (char.charCodeAt(0).toString(16)).slice(-4);\n\t\t\t\t}\n\n\t\t\t});\n\n\t\t}\n\n\t\treturn san;\n\n\t};\n\n\n\n\tconst _Stream = function(buffer, mode) {\n\n\t\tthis.__buffer = typeof buffer === 'string'        ? buffer : '';\n\t\tthis.__mode   = lychee.enumof(_Stream.MODE, mode) ? mode   : 0;\n\n\t\tthis.__index  = 0;\n\n\t};\n\n\n\t_Stream.MODE = {\n\t\tread:  0,\n\t\twrite: 1\n\t};\n\n\n\t_Stream.prototype = {\n\n\t\ttoString: function() {\n\t\t\treturn this.__buffer;\n\t\t},\n\n\t\tpointer: function() {\n\t\t\treturn this.__index;\n\t\t},\n\n\t\tlength: function() {\n\t\t\treturn this.__buffer.length;\n\t\t},\n\n\t\tread: function(bytes) {\n\n\t\t\tlet buffer = '';\n\n\t\t\tbuffer       += this.__buffer.substr(this.__index, bytes);\n\t\t\tthis.__index += bytes;\n\n\t\t\treturn buffer;\n\n\t\t},\n\n\t\tsearch: function(array) {\n\n\t\t\tlet bytes = Infinity;\n\n\t\t\tfor (let a = 0, al = array.length; a < al; a++) {\n\n\t\t\t\tlet token = array[a];\n\t\t\t\tlet size  = this.__buffer.indexOf(token, this.__index + 1) - this.__index;\n\t\t\t\tif (size > -1 && size < bytes) {\n\t\t\t\t\tbytes = size;\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\tif (bytes === Infinity) {\n\t\t\t\treturn 0;\n\t\t\t}\n\n\n\t\t\treturn bytes;\n\n\t\t},\n\n\t\tseek: function(bytes) {\n\n\t\t\tif (bytes > 0) {\n\t\t\t\treturn this.__buffer.substr(this.__index, bytes);\n\t\t\t} else {\n\t\t\t\treturn this.__buffer.substr(this.__index + bytes, Math.abs(bytes));\n\t\t\t}\n\n\t\t},\n\n\t\twrite: function(buffer) {\n\n\t\t\tthis.__buffer += buffer;\n\t\t\tthis.__index  += buffer.length;\n\n\t\t}\n\n\t};\n\n\n\n\t/*\n\t * ENCODER and DECODER\n\t */\n\n\tconst _encode = function(stream, data) {\n\n\t\t// Boolean, Null (or EOS), Undefined, Infinity, NaN\n\t\tif (\n\t\t\ttypeof data === 'boolean'\n\t\t\t|| data === null\n\t\t\t|| data === undefined\n\t\t\t|| (\n\t\t\t\ttypeof data === 'number'\n\t\t\t\t&& (\n\t\t\t\t\tdata === Infinity\n\t\t\t\t\t|| data === -Infinity\n\t\t\t\t\t|| isNaN(data) === true\n\t\t\t\t)\n\t\t\t)\n\t\t) {\n\n\t\t\tif (data === null) {\n\t\t\t\tstream.write('null');\n\t\t\t} else if (data === undefined) {\n\t\t\t\tstream.write('undefined');\n\t\t\t} else if (data === false) {\n\t\t\t\tstream.write('false');\n\t\t\t} else if (data === true) {\n\t\t\t\tstream.write('true');\n\t\t\t} else if (data === Infinity) {\n\t\t\t\tstream.write('Infinity');\n\t\t\t} else if (data === -Infinity) {\n\t\t\t\tstream.write('-Infinity');\n\t\t\t} else if (isNaN(data) === true) {\n\t\t\t\tstream.write('NaN');\n\t\t\t}\n\n\n\t\t// 123,12.3: Integer or Float\n\t\t} else if (typeof data === 'number') {\n\n\t\t\tlet type = 1;\n\t\t\tif (data < 268435456 && data !== (data | 0)) {\n\t\t\t\ttype = 2;\n\t\t\t}\n\n\n\t\t\t// Negative value\n\t\t\tlet sign = 0;\n\t\t\tif (data < 0) {\n\t\t\t\tdata = -data;\n\t\t\t\tsign = 1;\n\t\t\t}\n\n\n\t\t\tif (sign === 1) {\n\t\t\t\tstream.write('-');\n\t\t\t}\n\n\n\t\t\tif (type === 1) {\n\t\t\t\tstream.write('' + data.toString());\n\t\t\t} else {\n\t\t\t\tstream.write('' + data.toString());\n\t\t\t}\n\n\n\t\t// \"\": String\n\t\t} else if (typeof data === 'string') {\n\n\t\t\tdata = _sanitize_string(data);\n\n\n\t\t\tstream.write('\"');\n\n\t\t\tstream.write(data);\n\n\t\t\tstream.write('\"');\n\n\n\t\t// []: Array\n\t\t} else if (data instanceof Array) {\n\n\t\t\tstream.write('[');\n\n\t\t\tfor (let d = 0, dl = data.length; d < dl; d++) {\n\n\t\t\t\t_encode(stream, data[d]);\n\n\t\t\t\tif (d < dl - 1) {\n\t\t\t\t\tstream.write(',');\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t\tstream.write(']');\n\n\n\t\t// {}: Object\n\t\t} else if (data instanceof Object && typeof data.serialize !== 'function') {\n\n\t\t\tstream.write('{');\n\n\t\t\tlet keys = Object.keys(data);\n\n\t\t\tfor (let k = 0, kl = keys.length; k < kl; k++) {\n\n\t\t\t\tlet key = keys[k];\n\n\t\t\t\t_encode(stream, key);\n\t\t\t\tstream.write(':');\n\n\t\t\t\t_encode(stream, data[key]);\n\n\t\t\t\tif (k < kl - 1) {\n\t\t\t\t\tstream.write(',');\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t\tstream.write('}');\n\n\n\t\t// Custom High-Level Implementation\n\t\t} else if (data instanceof Object && typeof data.serialize === 'function') {\n\n\t\t\tstream.write('%');\n\n\t\t\tlet blob = lychee.serialize(data);\n\n\t\t\t_encode(stream, blob);\n\n\t\t\tstream.write('%');\n\n\t\t}\n\n\t};\n\n\tconst _decode = function(stream) {\n\n\t\tlet value  = undefined;\n\t\tlet seek   = '';\n\t\tlet size   = 0;\n\t\tlet tmp    = 0;\n\t\tlet errors = 0;\n\t\tlet check  = null;\n\n\n\t\tif (stream.pointer() < stream.length()) {\n\n\t\t\tseek = stream.seek(1);\n\n\n\t\t\t// Boolean, Null (or EOS), Undefined, Infinity, NaN\n\t\t\tif (stream.seek(4) === 'null') {\n\t\t\t\tstream.read(4);\n\t\t\t\tvalue = null;\n\t\t\t} else if (stream.seek(9) === 'undefined') {\n\t\t\t\tstream.read(9);\n\t\t\t\tvalue = undefined;\n\t\t\t} else if (stream.seek(5) === 'false') {\n\t\t\t\tstream.read(5);\n\t\t\t\tvalue = false;\n\t\t\t} else if (stream.seek(4) === 'true') {\n\t\t\t\tstream.read(4);\n\t\t\t\tvalue = true;\n\t\t\t} else if (stream.seek(8) === 'Infinity') {\n\t\t\t\tstream.read(8);\n\t\t\t\tvalue = Infinity;\n\t\t\t} else if (stream.seek(9) === '-Infinity') {\n\t\t\t\tstream.read(9);\n\t\t\t\tvalue = -Infinity;\n\t\t\t} else if (stream.seek(3) === 'NaN') {\n\t\t\t\tstream.read(3);\n\t\t\t\tvalue = NaN;\n\n\n\t\t\t// 123: Number\n\t\t\t} else if (seek === '-' || !isNaN(parseInt(seek, 10))) {\n\n\t\t\t\tsize = stream.search([ ',', ']', '}' ]);\n\n\t\t\t\tif (size > 0) {\n\n\t\t\t\t\ttmp = stream.read(size);\n\n\t\t\t\t\tif (tmp.indexOf('.') !== -1) {\n\t\t\t\t\t\tvalue = parseFloat(tmp, 10);\n\t\t\t\t\t} else {\n\t\t\t\t\t\tvalue = parseInt(tmp, 10);\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t// \"\": String\n\t\t\t} else if (seek === '\"') {\n\n\t\t\t\tstream.read(1);\n\n\t\t\t\tsize = stream.search([ '\"' ]);\n\n\t\t\t\tif (size > 0) {\n\t\t\t\t\tvalue = stream.read(size);\n\t\t\t\t} else {\n\t\t\t\t\tvalue = '';\n\t\t\t\t}\n\n\n\t\t\t\tcheck = stream.read(1);\n\n\n\t\t\t\tlet unichar = stream.seek(-2);\n\n\t\t\t\twhile (check === '\"' && unichar.charAt(0) === '\\\\') {\n\n\t\t\t\t\tif (value.charAt(value.length - 1) === '\\\\') {\n\t\t\t\t\t\tvalue = value.substr(0, value.length - 1) + check;\n\t\t\t\t\t}\n\n\t\t\t\t\tsize    = stream.search([ '\"' ]);\n\t\t\t\t\tvalue  += stream.read(size);\n\t\t\t\t\tcheck   = stream.read(1);\n\t\t\t\t\tunichar = stream.seek(-2);\n\n\t\t\t\t}\n\n\t\t\t\tvalue = _desanitize_string(value);\n\n\t\t\t// []: Array\n\t\t\t} else if (seek === '[') {\n\n\t\t\t\tvalue = [];\n\n\n\t\t\t\tsize  = stream.search([ ']' ]);\n\t\t\t\tcheck = stream.read(1).trim() + stream.seek(size).trim();\n\n\t\t\t\tif (check !== '[]') {\n\n\t\t\t\t\twhile (errors === 0) {\n\n\t\t\t\t\t\tvalue.push(_decode(stream));\n\n\t\t\t\t\t\tcheck = stream.seek(1);\n\n\t\t\t\t\t\tif (check === ',') {\n\t\t\t\t\t\t\tstream.read(1);\n\t\t\t\t\t\t} else if (check === ']') {\n\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\terrors++;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t\tstream.read(1);\n\n\t\t\t\t} else {\n\n\t\t\t\t\tstream.read(size);\n\n\t\t\t\t}\n\n\n\t\t\t// {}: Object\n\t\t\t} else if (seek === '{') {\n\n\t\t\t\tvalue = {};\n\n\n\t\t\t\tstream.read(1);\n\n\t\t\t\twhile (errors === 0) {\n\n\t\t\t\t\tif (stream.seek(1) === '}') {\n\t\t\t\t\t\tbreak;\n\t\t\t\t\t}\n\n\n\t\t\t\t\tlet object_key = _decode(stream);\n\t\t\t\t\tcheck = stream.seek(1);\n\n\t\t\t\t\tif (check === '}') {\n\t\t\t\t\t\tbreak;\n\t\t\t\t\t} else if (check === ':') {\n\t\t\t\t\t\tstream.read(1);\n\t\t\t\t\t} else if (check !== ':') {\n\t\t\t\t\t\terrors++;\n\t\t\t\t\t}\n\n\t\t\t\t\tlet object_value = _decode(stream);\n\t\t\t\t\tcheck = stream.seek(1);\n\n\n\t\t\t\t\tvalue[object_key] = object_value;\n\n\n\t\t\t\t\tif (check === '}') {\n\t\t\t\t\t\tbreak;\n\t\t\t\t\t} else if (check === ',') {\n\t\t\t\t\t\tstream.read(1);\n\t\t\t\t\t} else {\n\t\t\t\t\t\terrors++;\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t\tstream.read(1);\n\n\t\t\t// %%: Custom High-Level Implementation\n\t\t\t} else if (seek === '%') {\n\n\t\t\t\tstream.read(1);\n\n\t\t\t\tlet blob = _decode(stream);\n\n\t\t\t\tvalue = lychee.deserialize(blob);\n\t\t\t\tcheck = stream.read(1);\n\n\t\t\t\tif (check !== '%') {\n\t\t\t\t\tvalue = undefined;\n\t\t\t\t}\n\n\t\t\t} else {\n\n\t\t\t\t// Invalid seek, assume it's a space character\n\n\t\t\t\tstream.read(1);\n\t\t\t\treturn _decode(stream);\n\n\t\t\t}\n\n\t\t}\n\n\n\t\treturn value;\n\n\t};\n\n\n\n\t/*\n\t * IMPLEMENTATION\n\t */\n\n\tconst Module = {\n\n\t\t/*\n\t\t * ENTITY API\n\t\t */\n\n\t\t// deserialize: function(blob) {},\n\n\t\tserialize: function() {\n\n\t\t\treturn {\n\t\t\t\t'reference': 'lychee.codec.JSON',\n\t\t\t\t'blob':      null\n\t\t\t};\n\n\t\t},\n\n\n\n\t\t/*\n\t\t * CUSTOM API\n\t\t */\n\n\t\tencode: function(data) {\n\n\t\t\tdata = data instanceof Object ? data : null;\n\n\n\t\t\tif (data !== null) {\n\n\t\t\t\tlet stream = new _Stream('', _Stream.MODE.write);\n\n\t\t\t\t_encode(stream, data);\n\n\t\t\t\treturn new Buffer(stream.toString(), 'utf8');\n\n\t\t\t}\n\n\n\t\t\treturn null;\n\n\t\t},\n\n\t\tdecode: function(data) {\n\n\t\t\tdata = data instanceof Buffer ? data : null;\n\n\n\t\t\tif (data !== null) {\n\n\t\t\t\tlet stream = new _Stream(data.toString('utf8'), _Stream.MODE.read);\n\t\t\t\tlet object = _decode(stream);\n\t\t\t\tif (object !== undefined) {\n\t\t\t\t\treturn object;\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\treturn null;\n\n\t\t}\n\n\t};\n\n\n\treturn Module;\n\n}"}},"fertilizer.data.Shell":{"constructor":"lychee.Definition","arguments":[{"id":"fertilizer.data.Shell"}],"blob":{"attaches":{},"tags":{"platform":"node"},"supports":"function (lychee, global) {\n\n\tif (typeof global.require === 'function') {\n\n\t\ttry {\n\n\t\t\tglobal.require('child_process');\n\t\t\tglobal.require('path');\n\n\t\t\treturn true;\n\n\t\t} catch (err) {\n\t\t}\n\n\t}\n\n\n\treturn false;\n\n}","exports":"function (lychee, global, attachments) {\n\n\tconst _child_process = require('child_process');\n\tconst _ROOT          = lychee.ROOT.lychee;\n\n\n\n\t/*\n\t * IMPLEMENTATION\n\t */\n\n\tlet Composite = function() {\n\n\t\tthis.__stack = [];\n\n\t};\n\n\n\tComposite.prototype = {\n\n\t\t/*\n\t\t * ENTITY API\n\t\t */\n\n\t\tdeserialize: function(blob) {\n\n\t\t\tif (blob.stack instanceof Array) {\n\n\t\t\t\tfor (let s = 0, sl = blob.stack.length; s < sl; s++) {\n\t\t\t\t\tthis.__stack.push(blob.stack[s]);\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t},\n\n\t\tserialize: function() {\n\n\t\t\tlet blob = {};\n\n\n\t\t\tif (this.__stack.length > 0) {\n\t\t\t\tblob.stack = this.__stack.map(lychee.serialize);\n\t\t\t}\n\n\n\t\t\treturn {\n\t\t\t\t'constructor': 'fertilizer.data.Shell',\n\t\t\t\t'arguments':   [],\n\t\t\t\t'blob':        Object.keys(blob).length > 0 ? blob : null\n\t\t\t};\n\n\t\t},\n\n\n\n\t\t/*\n\t\t * CUSTOM API\n\t\t */\n\n\t\texec: function(command, callback, scope) {\n\n\t\t\tcommand  = typeof command === 'string'  ? command  : null;\n\t\t\tcallback = callback instanceof Function ? callback : null;\n\t\t\tscope    = scope !== undefined          ? scope    : this;\n\n\n\t\t\tif (command !== null) {\n\n\t\t\t\tlet that = this;\n\t\t\t\tlet args = command.split(' ').slice(1);\n\t\t\t\tlet cmd  = command.split(' ')[0];\n\t\t\t\tlet file = _ROOT + (cmd.charAt(0) !== '/' ? '/' : '') + cmd;\n\t\t\t\tlet ext  = file.split('.').pop();\n\t\t\t\tlet path = file.split('/').slice(0, -1).join('/');\n\t\t\t\tif (path.split('/').pop() === 'bin') {\n\t\t\t\t\tpath = path.split('/').slice(0, -1).join('/');\n\t\t\t\t}\n\n\n\t\t\t\tif (ext === 'js') {\n\n\t\t\t\t\targs.reverse();\n\t\t\t\t\targs.push(file);\n\t\t\t\t\targs.push('env:node');\n\t\t\t\t\targs.reverse();\n\n\t\t\t\t\tfile = _ROOT + '/bin/helper.sh';\n\n\t\t\t\t}\n\n\n\t\t\t\tif (callback !== null) {\n\n\t\t\t\t\ttry {\n\n\t\t\t\t\t\t_child_process.execFile(file, args, {\n\t\t\t\t\t\t\tcwd: path\n\t\t\t\t\t\t}, function(error, stdout, stderr) {\n\n\t\t\t\t\t\t\tthat.__stack.push({\n\t\t\t\t\t\t\t\targs:   args,\n\t\t\t\t\t\t\t\tfile:   file,\n\t\t\t\t\t\t\t\tpath:   path,\n\t\t\t\t\t\t\t\tstdout: stdout.toString(),\n\t\t\t\t\t\t\t\tstderr: stderr.toString()\n\t\t\t\t\t\t\t});\n\n\n\t\t\t\t\t\t\tif (error) {\n\t\t\t\t\t\t\t\tcallback.call(scope, false);\n\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\tcallback.call(scope, true);\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t});\n\n\t\t\t\t\t} catch (err) {\n\n\t\t\t\t\t\tcallback.call(scope, false);\n\n\t\t\t\t\t}\n\n\n\t\t\t\t\treturn true;\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\treturn false;\n\n\t\t},\n\n\t\ttrace: function(limit) {\n\n\t\t\tlimit = typeof limit === 'number' ? (limit | 0) : null;\n\n\n\t\t\tlet stack = this.__stack;\n\t\t\tif (limit !== null) {\n\t\t\t\tstack = stack.slice(stack.length - limit, limit);\n\t\t\t}\n\n\n\t\t\tstack.forEach(function(context) {\n\n\t\t\t\tlet dir = context.path;\n\t\t\t\tlet cmd = context.file;\n\t\t\t\tlet out = context.stdout.trim();\n\t\t\t\tlet err = context.stderr.trim();\n\n\t\t\t\tif (cmd.substr(0, dir.length) === dir) {\n\t\t\t\t\tcmd = '.' + cmd.substr(dir.length);\n\t\t\t\t}\n\n\t\t\t\tif (context.args.length > 0) {\n\t\t\t\t\tcmd += ' ';\n\t\t\t\t\tcmd += context.args.join(' ');\n\t\t\t\t}\n\n\t\t\t\tconsole.log('');\n\t\t\t\tconsole.log('cd ' + dir + ';');\n\t\t\t\tconsole.log(cmd + ';');\n\t\t\t\tconsole.log('');\n\n\t\t\t\tif (out.length > 0) {\n\t\t\t\t\tconsole.log(out);\n\t\t\t\t}\n\n\t\t\t\tif (err.length > 0) {\n\t\t\t\t\tconsole.error(err);\n\t\t\t\t}\n\n\t\t\t\tconsole.log('');\n\n\t\t\t});\n\n\n\t\t\treturn true;\n\n\t\t}\n\n\t};\n\n\n\treturn Composite;\n\n}"}},"fertilizer.template.html.Application":{"constructor":"lychee.Definition","arguments":[{"id":"fertilizer.template.html.Application"}],"blob":{"attaches":{"appcache.tpl":{"constructor":"Stuff","arguments":["/libraries/fertilizer/source/template/html/Application.appcache.tpl"],"blob":{"buffer":"data:application/octet-stream;base64,Q0FDSEUgTUFOSUZFU1QKCkNBQ0hFOgovZmF2aWNvbi5pY28KY29yZS5qcwppY29uLnBuZwppbmRleC5odG1sCm1hbmlmZXN0Lmpzb24KCk5FVFdPUks6Ci9hcGkKaHR0cDovL2hhcnZlc3Rlci5hcnRpZmljaWFsLmVuZ2luZWVyaW5nOjQ4NDgKaHR0cDovL2xvY2FsaG9zdDo0ODQ4Cgo="}},"config.tpl":{"constructor":"Stuff","arguments":["/libraries/fertilizer/source/template/html/Application.config.tpl"],"blob":{"buffer":"data:application/octet-stream;base64,ewoJInNob3J0X25hbWUiOiAgIiR7aWR9IiwKCSJuYW1lIjogICAgICAgICIke2lkfSAocG93ZXJlZCBieSBseWNoZWUuanMpIiwKCSJ2ZXJzaW9uIjogICAgICIke3ZlcnNpb259IiwKCSJkaXNwbGF5IjogICAgICJzdGFuZGFsb25lIiwKCSJvcmllbnRhdGlvbiI6ICJsYW5kc2NhcGUiLAoJImljb25zIjogW3sKCQkic3JjIjogICAiaWNvbi5wbmciLAoJCSJzaXplcyI6ICIxMjh4MTI4IiwKCQkidHlwZSI6ICAiaW1hZ2UvcG5nIgoJfV0sCgkic3RhcnRfdXJsIjogICAgICAgICJpbmRleC5odG1sIiwKCSJ0aGVtZV9jb2xvciI6ICAgICAgIiMyZjM3MzYiLAoJImJhY2tncm91bmRfY29sb3IiOiAiIzQwNTA1MCIKfQoK"}},"icon.png":{"constructor":"Texture","arguments":["/libraries/fertilizer/source/template/html/Application.icon.png"],"blob":{"buffer":"data:image/png;base64,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"}},"index.tpl":{"constructor":"Stuff","arguments":["/libraries/fertilizer/source/template/html/Application.index.tpl"],"blob":{"buffer":"data:application/octet-stream;base64,PCFET0NUWVBFIGh0bWw+CjxodG1sIG1hbmlmZXN0PSJpbmRleC5hcHBjYWNoZSI+CjxoZWFkPgoJPG1ldGEgY2hhcnNldD0idXRmLTgiPgoJPHRpdGxlPiR7aWR9PC90aXRsZT4KCgk8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEsIG1pbmltdW0tc2NhbGU9MSwgbWF4aW11bS1zY2FsZT0xLCB1c2VyLXNjYWxhYmxlPW5vIj4KCTxtZXRhIG5hbWU9ImFwcGxlLW1vYmlsZS13ZWItYXBwLWNhcGFibGUiIGNvbnRlbnQ9InllcyI+Cgk8bWV0YSBuYW1lPSJhcHBsZS1tb2JpbGUtd2ViLWFwcC1zdGF0dXMtYmFyLXN0eWxlIiBjb250ZW50PSJibGFjay10cmFuc2x1Y2VudCI+Cgk8bWV0YSBodHRwLWVxdWl2PSJYLVVBLUNvbXBhdGlibGUiIGNvbnRlbnQ9IklFPWVkZ2UiIC8+Cgk8bGluayByZWw9Im1hbmlmZXN0IiBocmVmPSIuL21hbmlmZXN0Lmpzb24iPgoJPGxpbmsgcmVsPSJpY29uIiBocmVmPSIuL2ljb24ucG5nIiBzaXplcz0iMTI4eDEyOCIgdHlwZT0iaW1hZ2UvcG5nIj4KCgk8c2NyaXB0IHNyYz0iLi9jb3JlLmpzIj48L3NjcmlwdD4KCgk8c3R5bGU+CgkJYm9keSB7CgkJCW1hcmdpbjogMDsKCQkJcGFkZGluZzogMDsKCQkJb3ZlcmZsb3c6IGhpZGRlbjsKCQl9CgkJCgkJLmx5Y2hlZS1SZW5kZXJlci1jYW52YXMgewoJCQlkaXNwbGF5OiBibG9jazsKCQkJbWFyZ2luOiAwIGF1dG87CgkJCXVzZXItc2VsZWN0OiBub25lOwoJCQktbW96LXVzZXItc2VsZWN0OiBub25lOwoJCQktbXMtdXNlci1zZWxlY3Q6IG5vbmU7CgkJCS13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7CgkJfQoJPC9zdHlsZT4KCjwvaGVhZD4KPGJvZHk+CjxzY3JpcHQ+CihmdW5jdGlvbihseWNoZWUsIGdsb2JhbCkgewoKCWxldCBlbnZpcm9ubWVudCA9IGx5Y2hlZS5kZXNlcmlhbGl6ZSgke2Jsb2J9KTsKCWlmIChlbnZpcm9ubWVudCAhPT0gbnVsbCkgewoJCWx5Y2hlZS5lbnZpbml0KGVudmlyb25tZW50LCAke3Byb2ZpbGV9KTsKCX0KCn0pKGx5Y2hlZSwgdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB0aGlzKTsKPC9zY3JpcHQ+CjwvYm9keT4KPC9odG1sPgo="}}},"includes":["fertilizer.Template"],"exports":"function (lychee, global, attachments) {\n\n\tconst _Template  = lychee.import('fertilizer.Template');\n\tconst _TEMPLATES = {\n\t\tconfig:   attachments[\"config.tpl\"],\n\t\tappcache: attachments[\"appcache.tpl\"],\n\t\tcore:     null,\n\t\ticon:     attachments[\"icon.png\"],\n\t\tindex:    attachments[\"index.tpl\"]\n\t};\n\n\n\n\t/*\n\t * IMPLEMENTATION\n\t */\n\n\tlet Composite = function(data) {\n\n\t\t_Template.call(this, data);\n\n\n\t\tthis.__appcache = lychee.deserialize(lychee.serialize(_TEMPLATES.appcache));\n\t\tthis.__config   = lychee.deserialize(lychee.serialize(_TEMPLATES.config));\n\t\tthis.__core     = lychee.deserialize(lychee.serialize(_TEMPLATES.core));\n\t\tthis.__icon     = lychee.deserialize(lychee.serialize(_TEMPLATES.icon));\n\t\tthis.__index    = lychee.deserialize(lychee.serialize(_TEMPLATES.index));\n\n\n\n\t\t/*\n\t\t * INITIALIZATION\n\t\t */\n\n\t\tthis.bind('configure', function(oncomplete) {\n\n\t\t\tconsole.log('fertilizer: CONFIGURE');\n\n\n\t\t\tlet that   = this;\n\t\t\tlet load   = 3;\n\t\t\tlet config = this.stash.read('./manifest.json');\n\t\t\tlet core   = this.stash.read('/libraries/lychee/build/html/core.js');\n\t\t\tlet icon   = this.stash.read('./icon.png');\n\n\t\t\tif (config !== null) {\n\n\t\t\t\tconfig.onload = function(result) {\n\n\t\t\t\t\tif (result === true) {\n\t\t\t\t\t\tthat.__config = this;\n\t\t\t\t\t}\n\n\t\t\t\t\tif ((--load) === 0) {\n\t\t\t\t\t\toncomplete(true);\n\t\t\t\t\t}\n\n\t\t\t\t};\n\n\t\t\t\tconfig.load();\n\n\t\t\t}\n\n\t\t\tif (core !== null) {\n\n\t\t\t\tcore.onload = function(result) {\n\n\t\t\t\t\tif (result === true) {\n\t\t\t\t\t\tthat.__core = this;\n\t\t\t\t\t}\n\n\t\t\t\t\tif ((--load) === 0) {\n\t\t\t\t\t\toncomplete(true);\n\t\t\t\t\t}\n\n\t\t\t\t};\n\n\t\t\t\tcore.load();\n\n\t\t\t}\n\n\t\t\tif (icon !== null) {\n\n\t\t\t\ticon.onload = function(result) {\n\n\t\t\t\t\tif (result === true) {\n\t\t\t\t\t\tthat.__icon = this;\n\t\t\t\t\t}\n\n\t\t\t\t\tif ((--load) === 0) {\n\t\t\t\t\t\toncomplete(true);\n\t\t\t\t\t}\n\n\t\t\t\t};\n\n\t\t\t\ticon.load();\n\n\t\t\t}\n\n\n\t\t\tif (config === null && core === null && icon === null) {\n\t\t\t\toncomplete(false);\n\t\t\t}\n\n\t\t}, this);\n\n\t\tthis.bind('build', function(oncomplete) {\n\n\t\t\tlet env   = this.environment;\n\t\t\tlet stash = this.stash;\n\n\t\t\tif (env !== null && stash !== null) {\n\n\t\t\t\tconsole.log('fertilizer: BUILD ' + env.id);\n\n\n\t\t\t\tlet sandbox  = this.sandbox;\n\t\t\t\tlet appcache = this.__appcache;\n\t\t\t\tlet config   = this.__config;\n\t\t\t\tlet core     = this.__core;\n\t\t\t\tlet icon     = this.__icon;\n\t\t\t\tlet index    = this.__index;\n\n\n\t\t\t\tif (!(config instanceof Config)) {\n\n\t\t\t\t\tconfig        = new Config();\n\t\t\t\t\tconfig.buffer = JSON.parse(_TEMPLATES.config.buffer.replaceObject({\n\t\t\t\t\t\tdebug:   env.debug,\n\t\t\t\t\t\tid:      env.id,\n\t\t\t\t\t\tversion: lychee.VERSION\n\t\t\t\t\t}));\n\n\t\t\t\t}\n\n\t\t\t\tindex.buffer = index.buffer.replaceObject({\n\t\t\t\t\tblob:    env.serialize(),\n\t\t\t\t\tid:      env.id,\n\t\t\t\t\tprofile: this.profile\n\t\t\t\t});\n\n\n\t\t\t\tstash.write(sandbox + '/manifest.json',  config);\n\t\t\t\tstash.write(sandbox + '/core.js',        core);\n\t\t\t\tstash.write(sandbox + '/icon.png',       icon);\n\t\t\t\tstash.write(sandbox + '/index.appcache', appcache);\n\t\t\t\tstash.write(sandbox + '/index.html',     index);\n\n\n\t\t\t\toncomplete(true);\n\n\t\t\t} else {\n\n\t\t\t\toncomplete(false);\n\n\t\t\t}\n\n\t\t}, this);\n\n\t\tthis.bind('package', function(oncomplete) {\n\t\t\tconsole.log('fertilizer: PACKAGE');\n\t\t\toncomplete(true);\n\t\t}, this);\n\n\t};\n\n\n\tComposite.prototype = {\n\n\t\t/*\n\t\t * ENTITY API\n\t\t */\n\n\t\t// deserialize: function(blob) {},\n\n\t\tserialize: function() {\n\n\t\t\tlet data = _Template.prototype.serialize.call(this);\n\t\t\tdata['constructor'] = 'fertilizer.template.html.Application';\n\n\n\t\t\treturn data;\n\n\t\t}\n\n\t};\n\n\n\treturn Composite;\n\n}"}},"fertilizer.Template":{"constructor":"lychee.Definition","arguments":[{"id":"fertilizer.Template"}],"blob":{"attaches":{},"requires":["lychee.Stash","fertilizer.data.Shell"],"includes":["lychee.event.Flow"],"exports":"function (lychee, global, attachments) {\n\n\tconst _Flow  = lychee.import('lychee.event.Flow');\n\tconst _Stash = lychee.import('lychee.Stash');\n\tconst _Shell = lychee.import('fertilizer.data.Shell');\n\n\n\n\t/*\n\t * IMPLEMENTATION\n\t */\n\n\tlet Composite = function(data) {\n\n\t\tlet settings = Object.assign({}, data);\n\n\n\t\tthis.environment = null;\n\t\tthis.sandbox     = '';\n\t\tthis.settings    = {};\n\t\tthis.profile     = null;\n\t\tthis.shell       = new _Shell();\n\t\tthis.stash       = new _Stash({\n\t\t\ttype: _Stash.TYPE.persistent\n\t\t});\n\n\n\t\tthis.setEnvironment(settings.environment);\n\t\tthis.setProfile(settings.profile);\n\t\tthis.setSandbox(settings.sandbox);\n\t\tthis.setSettings(settings.settings);\n\n\n\t\t_Flow.call(this);\n\n\t\tsettings = null;\n\n\t};\n\n\n\tComposite.prototype = {\n\n\t\t/*\n\t\t * ENTITY API\n\t\t */\n\n\t\tdeserialize: function(blob) {\n\n\t\t\tlet environment = lychee.deserialize(blob.environment);\n\t\t\tlet shell       = lychee.deserialize(blob.shell);\n\t\t\tlet stash       = lychee.deserialize(blob.stash);\n\n\t\t\tif (environment !== null) {\n\t\t\t\tthis.setEnvironment(environment);\n\t\t\t}\n\n\t\t\tif (shell !== null) {\n\t\t\t\tthis.shell = shell;\n\t\t\t}\n\n\t\t\tif (stash !== null) {\n\t\t\t\tthis.stash = stash;\n\t\t\t}\n\n\t\t},\n\n\t\tserialize: function() {\n\n\t\t\tlet data = _Flow.prototype.serialize.call(this);\n\t\t\tdata['constructor'] = 'fertilizer.Template';\n\n\n\t\t\tlet settings = data['arguments'][0] || {};\n\t\t\tlet blob     = data['blob'] || {};\n\n\n\t\t\tif (this.profile !== null)                 settings.profile  = this.profile;\n\t\t\tif (this.sandbox !== '')                   settings.sandbox  = this.sandbox;\n\t\t\tif (Object.keys(this.settings).length > 0) settings.settings = this.settings;\n\n\n\t\t\tif (this.environment !== null) blob.environment = lychee.serialize(this.environment);\n\t\t\tif (this.shell !== null)       blob.shell       = lychee.serialize(this.shell);\n\t\t\tif (this.stash !== null)       blob.stash       = lychee.serialize(this.stash);\n\n\n\t\t\tdata['arguments'][0] = settings;\n\t\t\tdata['blob']         = Object.keys(blob).length > 0 ? blob : null;\n\n\n\t\t\treturn data;\n\n\t\t},\n\n\n\n\t\t/*\n\t\t * CUSTOM API\n\t\t */\n\n\t\tsetEnvironment: function(environment) {\n\n\t\t\tenvironment = environment instanceof lychee.Environment ? environment : null;\n\n\n\t\t\tif (environment !== null) {\n\n\t\t\t\tthis.environment = environment;\n\n\t\t\t\treturn true;\n\n\t\t\t}\n\n\n\t\t\treturn false;\n\n\t\t},\n\n\t\tsetProfile: function(profile) {\n\n\t\t\tprofile = profile instanceof Object ? profile : null;\n\n\n\t\t\tif (profile !== null) {\n\n\t\t\t\tthis.profile = profile;\n\n\t\t\t\treturn true;\n\n\t\t\t}\n\n\n\t\t\treturn false;\n\n\t\t},\n\n\t\tsetSandbox: function(sandbox) {\n\n\t\t\tsandbox = typeof sandbox === 'string' ? sandbox : null;\n\n\n\t\t\tif (sandbox !== null) {\n\n\t\t\t\tthis.sandbox = sandbox;\n\n\n\t\t\t\treturn true;\n\n\t\t\t}\n\n\n\t\t\treturn false;\n\n\t\t},\n\n\t\tsetSettings: function(settings) {\n\n\t\t\tsettings = settings instanceof Object ? settings : null;\n\n\n\t\t\tif (settings !== null) {\n\n\t\t\t\tthis.settings = settings;\n\n\t\t\t\treturn true;\n\n\t\t\t}\n\n\n\t\t\treturn false;\n\n\t\t}\n\n\t};\n\n\n\treturn Composite;\n\n}"}},"fertilizer.template.html.Library":{"constructor":"lychee.Definition","arguments":[{"id":"fertilizer.template.html.Library"}],"blob":{"attaches":{"tpl":{"constructor":"Stuff","arguments":["/libraries/fertilizer/source/template/html/Library.tpl"],"blob":{"buffer":"data:application/octet-stream;base64,CihmdW5jdGlvbihseWNoZWUsIGdsb2JhbCkgewoKCWxldCBlbnZpcm9ubWVudCA9IGx5Y2hlZS5kZXNlcmlhbGl6ZSgke2Jsb2J9KTsKCWlmIChlbnZpcm9ubWVudCAhPT0gbnVsbCkgewoJCWVudmlyb25tZW50LmluaXQoKTsKCX0KCglseWNoZWUuRU5WSVJPTk1FTlRTWycke2lkfSddID0gZW52aXJvbm1lbnQ7Cgp9KShseWNoZWUsIHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogdGhpcyk7Cgo="}}},"includes":["fertilizer.Template"],"exports":"function (lychee, global, attachments) {\n\n\tconst _Template = lychee.import('fertilizer.Template');\n\tconst _TEMPLATE = attachments[\"tpl\"];\n\n\n\n\t/*\n\t * IMPLEMENTATION\n\t */\n\n\tlet Composite = function(data) {\n\n\t\t_Template.call(this, data);\n\n\n\t\tthis.__index = lychee.deserialize(lychee.serialize(_TEMPLATE));\n\n\n\n\t\t/*\n\t\t * INITIALIZATION\n\t\t */\n\n\t\tthis.bind('configure', function(oncomplete) {\n\t\t\tconsole.log('fertilizer: CONFIGURE');\n\t\t\toncomplete(true);\n\t\t}, this);\n\n\t\tthis.bind('build', function(oncomplete) {\n\n\t\t\tlet env   = this.environment;\n\t\t\tlet stash = this.stash;\n\n\t\t\tif (env !== null && stash !== null) {\n\n\t\t\t\tconsole.log('fertilizer: BUILD ' + env.id);\n\n\n\t\t\t\tlet sandbox = this.sandbox;\n\t\t\t\tlet index   = this.__index;\n\n\n\t\t\t\tindex.buffer = index.buffer.replaceObject({\n\t\t\t\t\tblob: env.serialize(),\n\t\t\t\t\tid:   env.id\n\t\t\t\t});\n\n\n\t\t\t\tstash.write(sandbox + '/index.js', index);\n\n\n\t\t\t\toncomplete(true);\n\n\t\t\t} else {\n\n\t\t\t\toncomplete(false);\n\n\t\t\t}\n\n\t\t}, this);\n\n\t\tthis.bind('package', function(oncomplete) {\n\t\t\tconsole.log('fertilizer: PACKAGE');\n\t\t\toncomplete(true);\n\t\t}, this);\n\n\t};\n\n\n\tComposite.prototype = {\n\n\t\t/*\n\t\t * ENTITY API\n\t\t */\n\n\t\t// deserialize: function(blob) {},\n\n\t\tserialize: function() {\n\n\t\t\tlet data = _Template.prototype.serialize.call(this);\n\t\t\tdata['constructor'] = 'fertilizer.template.html.Library';\n\n\n\t\t\treturn data;\n\n\t\t}\n\n\t};\n\n\n\treturn Composite;\n\n}"}},"fertilizer.template.html-nwjs.Application":{"constructor":"lychee.Definition","arguments":[{"id":"fertilizer.template.html-nwjs.Application"}],"blob":{"attaches":{"config.tpl":{"constructor":"Stuff","arguments":["/libraries/fertilizer/source/template/html-nwjs/Application.config.tpl"],"blob":{"buffer":"data:application/octet-stream;base64,ewoJIm1haW4iOiAgICAgICAgICIuL2luZGV4Lmh0bWwiLAoJIm5hbWUiOiAgICAgICAgICIke2lkfSIsCgkiZGVzY3JpcHRpb24iOiAgIiR7aWR9IChwb3dlcmVkIGJ5IGx5Y2hlZS5qcykiLAoJInZlcnNpb24iOiAgICAgICIke3ZlcnNpb259IiwKCSJ3aW5kb3ciOiB7CgkJInRpdGxlIjogICAgIiR7aWR9IChwb3dlcmVkIGJ5IGx5Y2hlZS5qcykiLAoJCSJpY29uIjogICAgICIuL2ljb24ucG5nIiwKCQkidG9vbGJhciI6ICAke2RlYnVnfSwKCQkiZnJhbWUiOiAgICB0cnVlLAoJCSJ3aWR0aCI6ICAgIDY0MCwKCQkiaGVpZ2h0IjogICA0ODAsCgkJInBvc2l0aW9uIjogImNlbnRlciIKCX0sCgkid2Via2l0IjogewoJCSJwbHVnaW4iOiBmYWxzZQoJfQp9Cg=="}},"icon.png":{"constructor":"Texture","arguments":["/libraries/fertilizer/source/template/html-nwjs/Application.icon.png"],"blob":{"buffer":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH4AIFDwoZAlYVBwAAGqRJREFUeNrtnXt8VNW593/P2nuSSTKXABIBL5VLFIskE4KXWtAAkWTPTDh6jqmvFu3pe7Raj5cjVcvbHivS11dbseKthZ7TntNatUotlswl4U61XoFMoDkqyKW1cgkFMrMnySQzez3vHwmYyySZCUmIsr+fDx8+n8yavdde67ef9axnPWsNYGJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJi8vmDzoSHrJs/P49UdarB4iJmYzoJmkqgsQCsAGIMPkISHzCJPyskP0owfzAjGDxiCuBzynZN+7KAMhfEc8DIA8sjTGQl0BSW9LFQ8AZkYp9Q1UMykRgHoU6UjNkCPEWCdhNxDIw8gA4zyU2SaGOx3/+BKYARTMjrPQcGLwRQAeAjJt5gGMYmRVUnkoEnWPBLLTk5v7xy1aqW3q6xtaIi2xI3bmXQDRJ0v+T4fkVY5hJxKRj5DFpDCl50+XyfmgIYKea9rGIGFLlYMjIF6AVHS9Q3cfPmGACENM93AJ6lWNQ7pq9ZczjVa9a73ePamFYC2FQU9C8HgH0lJdZwdvYCMBYCaGbC40WBQMgUwGmi1u12EWMpWDRKMh6fEQz+z4nPGKCQ5n4KoLjr8ku/S0uWyHSvz0uWiLr33l8GhnQF/fd3sTZlFdOgyMUkYSfBDxUEAjtNAQwT72iaIxO0VDBdkGDl/uKaNR/3GA7KvT8kyERhdeCRUx5aNM9SAAlX0L+0hwi93nwy5JNg7LZmqEumrlmjm/OKoXTuyjylIc37dq3b/Q+9WoZy9z+H3J4Vg3VPBqi23PsfIbf75l5FUu75x5DmfbtO0+aaFmAIeLWyUslvanmIwNMF4dYCv/940s73evMpwSst9uzyaatWtQ3W/bcWF1vUvPHVwqB/LVhb9WFvlskK+jlA+3fZsr//tVWrDFMAg2TysyBeZlDQFfQ911u5TSUlam5WzgZF4JsFfv/eQfc5vN58Mvjnu2zZpb11LgO0w+29hxmlVou46fMwJIiRXLmdCxacbSXhA/GzfXU+AIy2Zt8JYPVQdD4AFPl8u5k5kK83397H28SFAd/TxFgeazP+UDd/fp4pgIFO7zTtXBk3VkvwosJAoLqfwM9YJqpsbGl6bijrZBw5vJwIN22tqDirr3KF1b4NYFoMxfJ6yOs9xxRAmtSXlY1miN8S8e0zAoGt/ZVXSHmAJR6fs3lzYijrNXPbtjgTP6HEjUX9lXXV+N4TrNwBg3+7w+MZZbrwqTpcFRXZIc2zPlReMSvF8mfVae7NPIz+TJ3m3rxd08amUnaH231Vnduz7q3KyizTAqSAGucVYHreVV31ZirlFYPvklCWE8DD2GzPCabbUylZEAj8EUwrs6NNz5sC6O/NKvf8CxMfdlX7VqdSflNJiUqMst02a9Vw1vNYS/R1kPC8WlmppFK+MOj7HQOR2nLPN0bcCzdSKrLN47mYJd1kNBwsT/U7uVl2LyAD6cy5a6+9NleJx6ktkbBmqGqWwtxsELUaFgsXvf56YyrXmLN5cyKkedZeFG1xA0hJfBm2nAfj0eaaHfMr3u0tlnDGCoABqpO8nBW6Y+a2bfGUzRfJm6Q0Huwy5no8k6QBF4Mnk6DJYEwCYDl5r9ZECxOiFkUFSzQniLLBAFoTtpDm6TROcxuI9rHkPQTxsVC4rvMUUwj8iiV+mKoApq1a1bZjfsW3pSKXM6AN75A1wgNBteWeb0DQxKKAb0k6zqIalz4m+RBBzANwJQAbg/cQiTpA7hIJ5eMsJbEvPxhsTbdOuzUtMyLEJFXSFCbkQ8IF4kkAogDeYsgNxOKxZnt2WV9LzD2eVfM8CuL6okDgJVMAAOpLKm2JrOa1Tbbseak05NaKimwlLj2C6D6AzwbRa4DcqDbnvDlt86rocNTXyIrONiDmEnA9A58K0PK4SoGZVVXNKQk3wRsSKs1LpfwXXgB1mud+yThSVO3/VZ/BHrd7pgDdQcxTAPKBMIMN8airpqr+dNU9pGlFILGIJe8AkRdMuxSFVxT4/dv6fGa3+1bJZDuRa3DGCmC3pmU2QWyx2LKv6m3xprbc6ybCdwi8B1KsKKyp2t4hnLcKgv6vns6xlAGq0zxvuIL+WR3+R7Fh0B1EPFFAPlkQDAaTWoH2xaU/Oluic04kr5yR08AolFuY+IVknR8qr5gVKvdsBPEcMtpuLAz6v3Wi87dWVJwvCftPtyNFAIPx6c75/3AeABT4/duKqn23KRbl65KpNFTu2ViraV/t/r12R5dfilhzvn5GzwIIfFOire3aLqZe08YSaBmYKcGJr8+srjnYI/gTl5cT4e2RMZHidwyRuBTAJyf+0pF+9p3t1yyYIFT8OOT23JpQxAMzq6r+fqJMDPJXWUK8BuAXZ6QFqPV68wF8OnP9+vBngSDvPAFlDUP5pavad8vMmp6dDwBEKGaBbSMikiawjQnFyT6bsW7NAVfQvxCEX6sJrgp5PHNOfHZFMBhh5qMht/vCM1IAlMAtRPybz8Z69wOS+A7OVLUZwaot/XzdJeLxupEggGbmEEBFfVbW799kkXEPGHe1J6qeNIG/IYkbz0wfQPDVak7ORgYo5Pb8BER5rqD/a6lE4xjIKly7tmkkCOCKYDBCxLZ+A0E1NccKL7u0koBzQ5pnGQOUw7yOQVefcbOAraWlTosl86XCoN/TV9JlMvaVlFjDWTmvu4L+8oHc+915143JzojlshC5nEA2qWgmKRub26yNl29YfXRAU1m3Z102S2+qAaeQ5lnKRLIo4FsS0jzVMcivXREMRs4YJ9CiZl7NwB9D5Z6FBIwrDPq/lep3w5n2yURyT0pCKy62WMaOv4oh3QAVgTAdaDvLgABku/1j2W4IMzPaENI8fwdjJwjbCTIQb2h4I5XQNDP2thjqRAApxfhdQf8PQprnF7Vu903MeCNTitkA/GeMAJgwk0jUMctFjpameenZLHkuS/6kzzdyfsVEVuR9AG5hsDMNQ3cWCHMAzGGI76h548K1mvu/wXJ5UXX1/j7M6F8M1TgvVQEAQA7knU0sNgD0LCu49HQJ4LT4AESYKqVxs1BwT7qBECI6G0QNyTt+fk5I8zzLitwF4G4AzlOsqpNA9xIpu0Oa55m6+fNzkhWSoCNgkVb+X34w2ApJi8C4gZgvOqOcQGa+AETx/kKmvXw7D8Q9BFBXXn4RK5YdAO4aAsumArhbKpa6pNM2kg3EMu0EUFeN7z0CCxAmnVECkIxxAvJnA/suj2aiY53/tlPTJjMpG4GhbUgCJoNp4w6PZ1LX/leOEtGYAT2P4OcJGHfGCGBTSYlKRPZ4Q8MbA6owURaYu6yiGaCfApgwTI9wjpT4eZc6KbKF288aSJuMnJwtzLCnml102p3AhoYGm9VqPQdAHhGNl1KOI6KzmdlJRBYAowBYmNnW0tJy7bhx47rM18eNGuVsjbXF00n86DreIlMSnZxutcfaaf4wt9u87eXer8yo9r0NADIhYiAekACmrVrVFtI8Rv6RI3YAPWIghw4dysnKynqdiKIA4gCOM3OciMLMfFgIcYiZDwJoiMVin+bl5UVPSQDMnBUOh8erqjqJmScx8yQAk4hoEjNPBpDbqSyI6IRz1t1Zg81mmwKgS8QuFm09j1Qa8Do4ETIypGz7zISJr5yOFSFBfCXQvh5hgFoFOHPAPhHQLK3W85MJwGaz5UspS7u37Yn/mT97eqvVikgkEgNwgJn3EtFeAHuJaK9hGHstFsvBnJycA10EEIlEvgHgOgAXAPiSruu5QghIKbsLYyDO3oXdBcBC8AjJhjrVqcwgPgSBE4J7acP8NC9mPfHCdu47IQQMw0AkEmkE8BcA+wGsFna7/cUOJU/t/HYPEj085qxsy98A5Ax8BoG2NiEyTo7/TH86Lf0PefK+CjiTgNZT6P5soO2vvXw82FPEXABfBvCh3W5/WRBRwuFw/IiIik6YtEGc7k3tMaYdPx4GoO7WtAGZTAG0Cv7M3HaMwzXD2/kIFAYC756skyqtIB5QYkd9ZWUGAGXvqFHRXtpwsAXwNhEVOhyOxUTUdnIWYLfbP7Db7bOZeRGAwVpo6bFK1rF9K6K3hz8HMg1sAVF2F1EI3AlguM7t+RsMcVeXOhkii4ABCSAejZUwSO8jtb1okOrdxMyL7Hb7bLvd/kHSaSARGU6n8ylVVS8C8MIg3PTiI+3ebffh83BHpw1g6KWjwkCXzZkFfv9eEM8F8PEQd/5uVmhu4dqqfd3e07ES+PvALmncRcyHeptxdQzNp4rPMIxLnE7nU0Rk9BsHyM7O/tThcNwihChFGvHtZBY7MzOzsKcJpf0AUFtecWn6CuAGAD325bkCgV1kxF0gegbAYG8STYDomYQqXEU+3+4kdRqbLDrZH3WadgWI4iAk3dJutVqLAJxKfGAvM3sdDkfFqFGj9qcdCLLZbBvsdvsMZl6KAZo4Zr40iSP3IUnxIkEu31dSkt78WVIDg5NuzCxcu7bJFfDdy2zkE7A82bQqTY6D8JQknuIK+O7tLY2bgLMApHWw5G5Ny2SIZQC/wkQf9dJ2MwdY7xgzL7Xb7Zc4nU7/KUUCiajF6XQ+zMwFRJS2s0VEc3u+MNjKZOSz4OfDWTnPp9f/8hMmOr9Px6O6en9h0H/f8ZamsRCYy8AygDYC1M9bSg0ANhDRE8w053hLU54r4F80IxD4Sz/z+C8JKf+axryfmkisIMZzzJQPg99Pte1SaO8aZi5wOp0PE1G/+yxSjgQ6nc7dAMqj0WiplPJJAAUpfnUOM2dSp+hdPNG6xWLJvN0V8Htq3d4LQ5pnqSvo/0EqFxvV0rI3nJWTUsy/w+Hc1PGvPXLYvjdwNCdELiBzANFEqmw0LJZjqe4NTBKcmpTdMaylQqjc/Sgx9hZW+38b0tw1McHPJnn7M3RdL0mjGh8R0UN2u33VkLvBzKzqun57JBI5FIlEuL9/uq7P6Tn+uTe3m0FQreZ5olZzL+clS1Jam6jVPFswgki1PrxkiQhpnmdCmudxoD27KaR5NyQrq+v6nFTaNhKJHNJ1/XZmHtAKqBiY4ilht9tXxmKxKQC+B+BYP4Ip62kGaUsLMJcALgr6HyASf6179/3f1ZeVjU5hHt5SX1JpGwmd/46mOUT7fsE+2VpRcVbdu++9RkR7XEH/YgCIZNmuAXhLqm3WjWMAvheLxabY7faVRJQYNgGcIC8vL+pwOB6Lx+MTiWgJgHAvRa9n5i6LBazQbxjKws+8eN9PJMTTcWHx15V75/WjwNq4NeYaCQLIZGUGM23v0+RrFfPVBFeRpJ8UBnxPd+rkhQrki0k6nwBc38vlwkS0JB6PT3Q4HI+lu/gzqAI4wZgxYyJ2u/2R1tbW85j535h7pGxN1nW9yw6ZjlO3xm8tLT2ZtTMjWLWltc3iZeKb6jTvi9uvWTAh+UwQ20hw8UgQABEXA0gqgJDXe05I87zMzJUWGfcU1vjf6Gw5QBg1PRjck8T8zwIwuXsQlZkfkVJOtNvtj4wZM2ZQkkgHNXNm7NixOoCnmfmnkUjkRgD/1hFiBoBbAHQ59oUEv6RarDcDOHm6V0dm7r9sL/d+RajyhZDbU2cB/3haIHAyWBJX6T01IX8E4OnTrgDGZUTGK13MfVnZeItQH2QDBQT5fVd18J3uX8ti+mcm/LaXq97cyRrUAljucDheJqL4oAt4qNtH1/VpzHwzgOvtdvv0zlOTVDaHhso9ZSRwPzN/AilWuGp877U7kSNgc+iSJaLu3fe3uIL+2QBQ53ZfzqA7wDgHEMtcwaq1Sf2B4mKLmjduUw7kvO6p5Mxs1XX9Q7Svb7zgcDjeHFILNmyNxWw9ePCgmDBhQpdgSsjtXQTguCvg+68+PW2320VM3wbhYkgOEFEhBB4t9Pv/fLoEUFdWMYMFLyLw/zCgAfxnKcWKGTW+ur59As+3iNlaWB14pvtnBw4cyB4/frwkomHZNXz6zweYPz+HlYz1qR6Y8FZlZVa23lIO4kUMnEuE1WxgQ1am8sfhOJr1wwUL7C2txlVCoFQC1wnwfglleW6LXp1KhnO6z/uFE8Dx48dzR40a1djNzC8E6CJXte+hVK+ztaIiW0kYAQFezEylTOJKAjsI9BfJMgRSdpPEbmervmcge/D3lZRYIzk5U6QUUwC+UACFDD6fgIgE3hLE6yXjydyW5tJ0rt8eA6BaV9D3Sipt84URADNbIpHI94noNinlJbm5ucc7h0brNHc1sbynsLr6o9Qjap5XFJLf6+xJb3e7v6SwKGBCPjNPIcZEJmRT+14gAIgTdawRMJpByG6vH3LRcZgUAwKgJkG8jyV/DIHdCUXZMbOq6mS4t+Pw6IddQf/CVOu7zeO5WEh6sijoc/eY1B875lRVtZ6IXrPZbA92jpwOJcOyM0jX9YsjkciLJ2YEQogfAfhWJxXyDkO5Vyq0or6ysizVo95Z8EtS0kIAJ38YoiNu32vsvr6k0mbkNFtIUTLYMHJIUZrYMNqQiLels+GUDL6ZJV5OtfxuTctslvwzJk66DU5V1WUAzmHme3RdnxeNRr9us9nqPtcWgJkpGo3eBuApZu6cxMFEVGq32zd2cwi/ScwFhUH/falc/9XKSuXCaMubiYaDVw00y3ggbCopUUdl2d7YZcualeoZhSHN8wyBthYGfb/u/lkkEpkNYEu3/ogBWGK3258gIjlUzzJk+wIaGhpsuq7/nplXduv89lgO83PMXTNpXQHffzEht07zXp/KPdobn4Pq2HEVwzlu5lpzriNwVeqd772BmbKSdX5HG6xM8jJaATyu6/rvOhJDPj8CaGxsnGS1Wt8GcG0fxS7Wdb3Hb/o052TfyeA7tpd5SlO5V2tbxvNMuHe4DotmgATxv8ZV8fNUyteWe0sA+b9zY9G7exkeHwFwcR+XuM5qtb7V2Ng46XMhgEgkMlsI8TaAS1Io/mAkElnQ+Q9XrlrVIgQqhcDDO8sX9LvkfPmG1UcJ/E6d2+0ZDgGE3O4FEvSnzuf99Bm7IP4hZ2bckGymEA6HNQAPpHDb6UKI96PRaOmIFkA4HL4LwEYAqW6UJAC/7K7uAr//OBT6X5KMFaEy72X9XUSCl4Hpu1uLiy1D2flbi4stxPSAoYqn+p3va9oVJOl5mVBuSJZn0NjYOImIXkijD0ZLKYMdbTyyBMDMFA6HlxDRswOYWYwRQvgbGxu7/KiCy+f7VJUJLyn86A5N0/q6QMfv/L6qnj3+7iGdMuWNW0TAi/29/dvLPKXM4v+RjF83Y92aA90/P3r0qEMI8QcA6W4oVYnoWV3Xn2ZmMSIEwMwWXdf/m4gePoXLTBVC/J6Zu/yowrSammNqc/Z1EsqddW5vn+P8Llv2T4nlgm1lC6YMScSyvPwiMMoKLr90ZV/+QcjtXUQCd1ti2QsK165tSNJeWRaL5Q8pDpG9tfk9uq7/kplP2eKdkuN04MCBbJvN9iqAQRl/iWidzWZb0D0O3nEi54MALrfIxK3TamqSJqBsK1swRRHGf1hs2WWD+bNxuzUts4nEOpLGbb0FqraWljpVS8ZKJvGh67KZS5P9WmlHmtfvB6u9mHl9W1vbP3aswg6vABobG0cJIYIALh/UwATRulgs9k/JHqpO0+YylEeJ5LLCQOC15GOv9xaAZ6Vz7lB/Xn+d5v4FE9b3dsJ3bbmnkogWSdDi3o64O3LkiD0jI+P3RDTYjtw7Ukp358jqkAsgEomMYeZ1ndb6BzuAFFJV1dN9JyvQvhgTixsPA3whCPe7AoFdPc21+2GGUNNZW+jd6/c+xszRoqD/0e6f7ZhfMZUV+SSI6tXmrKW9nVbe1NQ0IZFI+IloSLKYiGg7M893OBxHh1wAuq6PZeb1SD0reMCxJCnlzbm5uUnX1He43dMlY2l7hjUe774sHCp3PwlBVHjZpfcP/Mejtz4FljFXMPDd7vc2QP+HGFYJ+e+df7g6SXtdzcwvYegPsPhACDHXZrMdGjIBRKPRs6WUGwBMG6agm8HMjzkcjv/b2+LI9jJvoRC8GCAbgN8027LWnPjdgVC5+z4mKskgvr1zRlF/tJ/xm1hBjPUn1uzfqqzMytGbrmUSNzGxrkrl8enVa3b0YcWskUjk34loMU5td0861Ash5tlstsODLoCON39LP1GroeIjwzDKe9ve9FmnGTcCuJbBe4mwHkJsJMM4j1k8SYJeRaLtP/ta8KkvqbTFrU23geifIGkRCeMAoMxl4mvAuABEqxNG/OXezjDu5B9N7PCPTsfpXx8Q0dV2u/3IoAng2LFjTovFspGZZwzzwxwG8GsA/+lwOHalEa27kJjmgTCHGRNAdISYMxjIB2MPEd6MS96nqurBRCIxPoMwSYJmAZhMRLuY0AbmsUQ4wKCNgNyYzNfox0+6EMCtaM+FPHs4G42Itsfj8bmjR48On7IAOqZ61QBmD1P9/w5gtRDilZycnM3dd7MOKIJXUXGWGsdUgrwIhEsY/GVAjAVxFphaABwRJOtZUr0k+aGhqh+lEupN0aFVmpqa5kgpv4b2k1jOGqZ2fCMajZZ3T8FLSwAdQZ7XAbiHcpwnohAzrxdCrO/o9AS+gDCzCIfDRUKIUmYuJaLZADKH8H7rHQ6Ht6/kEupLubquvwygcpDrlWDmnUKIPzHzulgstvFUNzd8Xuk4cW0uEV0jpfwqEU3H4CfprLLb7Tf2Zkmpl84nXddXArhtECpwEMA2Zt6mKMqbkUjkrf7M0pkKM1vC4XABEc0iomIAxR1O96kudf/Kbrd/k5IcbEW9ODA/AvBgmjc5DuDPzFwvhNgJoF5KudPpdB4zu3bghMPh0UKI6QCmSSmnE9E0tK8jpPuL5D92OBzf7VcAuq5/m5l/msx0A/gbgH0A9hHRPinlfiLaJ4TYk24AwuTUiEaj46SUk5l5ohDiAmaeCODEv3OTDSVEdKfdbv9ZrwJobGycpCjKUgBHmfkwgANE9FfDMPY5nc5PvqjO2RdwKFHD4fB5iqJMZObzAUwgorMBjDEM4we5ubl7zVYyMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMfk88/8BZKlMhEk1RTgAAAAASUVORK5CYII="}},"index.tpl":{"constructor":"Stuff","arguments":["/libraries/fertilizer/source/template/html-nwjs/Application.index.tpl"],"blob":{"buffer":"data:application/octet-stream;base64,PCFET0NUWVBFIEh0bWw+CjxodG1sPgo8aGVhZD4KCTxtZXRhIGNoYXJzZXQ9InV0Zi04Ij4KCTx0aXRsZT4ke2lkfTwvdGl0bGU+CgoJPG1ldGEgbmFtZT0idmlld3BvcnQiIGNvbnRlbnQ9IndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLCBtaW5pbXVtLXNjYWxlPTEsIG1heGltdW0tc2NhbGU9MSwgdXNlci1zY2FsYWJsZT1ubyI+Cgk8bWV0YSBuYW1lPSJhcHBsZS1tb2JpbGUtd2ViLWFwcC1jYXBhYmxlIiBjb250ZW50PSJ5ZXMiPgoJPG1ldGEgbmFtZT0iYXBwbGUtbW9iaWxlLXdlYi1hcHAtc3RhdHVzLWJhci1zdHlsZSIgY29udGVudD0iYmxhY2stdHJhbnNsdWNlbnQiPgoJPG1ldGEgaHR0cC1lcXVpdj0iWC1VQS1Db21wYXRpYmxlIiBjb250ZW50PSJJRT1lZGdlIiAvPgoJPGxpbmsgcmVsPSJpY29uIiBocmVmPSIuL2ljb24ucG5nIiBzaXplcz0iMTI4eDEyOCIgdHlwZT0iaW1hZ2UvcG5nIj4KCgk8c2NyaXB0IHNyYz0iLi9jb3JlLmpzIj48L3NjcmlwdD4KCgk8c3R5bGU+CgkJYm9keSB7CgkJCW1hcmdpbjogMDsKCQkJcGFkZGluZzogMDsKCQkJb3ZlcmZsb3c6IGhpZGRlbjsKCQl9CgkJCgkJLmx5Y2hlZS1SZW5kZXJlci1jYW52YXMgewoJCQlkaXNwbGF5OiBibG9jazsKCQkJbWFyZ2luOiAwIGF1dG87CgkJCXVzZXItc2VsZWN0OiBub25lOwoJCQktbW96LXVzZXItc2VsZWN0OiBub25lOwoJCQktbXMtdXNlci1zZWxlY3Q6IG5vbmU7CgkJCS13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7CgkJfSAKCTwvc3R5bGU+Cgo8L2hlYWQ+Cjxib2R5Pgo8c2NyaXB0PgooZnVuY3Rpb24obHljaGVlLCBnbG9iYWwpIHsKCglsZXQgZW52aXJvbm1lbnQgPSBseWNoZWUuZGVzZXJpYWxpemUoJHtibG9ifSk7CglpZiAoZW52aXJvbm1lbnQgIT09IG51bGwpIHsKCQlseWNoZWUuZW52aW5pdChlbnZpcm9ubWVudCwgJHtwcm9maWxlfSk7Cgl9Cgp9KShseWNoZWUsIHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogdGhpcyk7Cjwvc2NyaXB0Pgo8L2JvZHk+CjwvaHRtbD4K"}}},"includes":["fertilizer.Template"],"exports":"function (lychee, global, attachments) {\n\n\tconst _Template  = lychee.import('fertilizer.Template');\n\tconst _TEMPLATES = {\n\t\tconfig: attachments[\"config.tpl\"],\n\t\tcore:   null,\n\t\ticon:   attachments[\"icon.png\"],\n\t\tindex:  attachments[\"index.tpl\"]\n\t};\n\n\n\n\t/*\n\t * IMPLEMENTATION\n\t */\n\n\tlet Composite = function(data) {\n\n\t\t_Template.call(this, data);\n\n\n\t\tthis.__config = lychee.deserialize(lychee.serialize(_TEMPLATES.config));\n\t\tthis.__core   = lychee.deserialize(lychee.serialize(_TEMPLATES.core));\n\t\tthis.__icon   = lychee.deserialize(lychee.serialize(_TEMPLATES.icon));\n\t\tthis.__index  = lychee.deserialize(lychee.serialize(_TEMPLATES.index));\n\n\n\n\t\t/*\n\t\t * INITIALIZATION\n\t\t */\n\n\t\tthis.bind('configure', function(oncomplete) {\n\n\t\t\tconsole.log('fertilizer: CONFIGURE');\n\n\t\t\tlet that   = this;\n\t\t\tlet load   = 3;\n\t\t\tlet config = this.stash.read('./package.json');\n\t\t\tlet core   = this.stash.read('/libraries/lychee/build/html-nwjs/core.js');\n\t\t\tlet icon   = this.stash.read('./icon.png');\n\n\t\t\tif (config !== null) {\n\n\t\t\t\tconfig.onload = function(result) {\n\n\t\t\t\t\tif (result === true) {\n\t\t\t\t\t\tthat.__config = this;\n\t\t\t\t\t}\n\n\t\t\t\t\tif ((--load) === 0) {\n\t\t\t\t\t\toncomplete(true);\n\t\t\t\t\t}\n\n\t\t\t\t};\n\n\t\t\t\tconfig.load();\n\n\t\t\t}\n\n\t\t\tif (core !== null) {\n\n\t\t\t\tcore.onload = function(result) {\n\n\t\t\t\t\tif (result === true) {\n\t\t\t\t\t\tthat.__core = this;\n\t\t\t\t\t}\n\n\t\t\t\t\tif ((--load) === 0) {\n\t\t\t\t\t\toncomplete(true);\n\t\t\t\t\t}\n\n\t\t\t\t};\n\n\t\t\t\tcore.load();\n\n\t\t\t}\n\n\t\t\tif (icon !== null) {\n\n\t\t\t\ticon.onload = function(result) {\n\n\t\t\t\t\tif (result === true) {\n\t\t\t\t\t\tthat.__icon = this;\n\t\t\t\t\t}\n\n\t\t\t\t\tif ((--load) === 0) {\n\t\t\t\t\t\toncomplete(true);\n\t\t\t\t\t}\n\n\t\t\t\t};\n\n\t\t\t\ticon.load();\n\n\t\t\t}\n\n\n\t\t\tif (config === null && core === null && icon === null) {\n\t\t\t\toncomplete(false);\n\t\t\t}\n\n\t\t}, this);\n\n\t\tthis.bind('build', function(oncomplete) {\n\n\t\t\tlet env   = this.environment;\n\t\t\tlet stash = this.stash;\n\n\n\t\t\tif (env !== null && stash !== null) {\n\n\t\t\t\tconsole.log('fertilizer: BUILD ' + env.id);\n\n\n\t\t\t\tlet sandbox = this.sandbox;\n\t\t\t\tlet config  = this.__config;\n\t\t\t\tlet core    = this.__core;\n\t\t\t\tlet icon    = this.__icon;\n\t\t\t\tlet index   = this.__index;\n\n\n\t\t\t\tif (!(config instanceof Config)) {\n\n\t\t\t\t\tconfig = new Config();\n\t\t\t\t\tconfig.buffer = JSON.parse(_TEMPLATES.config.buffer.replaceObject({\n\t\t\t\t\t\tdebug:   env.debug,\n\t\t\t\t\t\tid:      env.id,\n\t\t\t\t\t\tversion: lychee.VERSION\n\t\t\t\t\t}));\n\n\t\t\t\t}\n\n\t\t\t\tindex.buffer = index.buffer.replaceObject({\n\t\t\t\t\tblob:    env.serialize(),\n\t\t\t\t\tid:      env.id,\n\t\t\t\t\tprofile: this.profile\n\t\t\t\t});\n\n\n\t\t\t\tstash.write(sandbox + '/package.json', config);\n\t\t\t\tstash.write(sandbox + '/core.js',      core);\n\t\t\t\tstash.write(sandbox + '/icon.png',     icon);\n\t\t\t\tstash.write(sandbox + '/index.html',   index);\n\n\n\t\t\t\toncomplete(true);\n\n\t\t\t} else {\n\n\t\t\t\toncomplete(false);\n\n\t\t\t}\n\n\t\t}, this);\n\n\t\tthis.bind('package', function(oncomplete) {\n\n\t\t\tlet name    = this.environment.id.split('/')[2];\n\t\t\tlet sandbox = this.sandbox;\n\t\t\tlet shell   = this.shell;\n\n\n\t\t\tif (sandbox !== '') {\n\n\t\t\t\tconsole.log('fertilizer: PACKAGE ' + sandbox + ' ' + name);\n\n\n\t\t\t\tshell.exec('/bin/runtime/html-nwjs/package.sh ' + sandbox + ' ' + name, function(result) {\n\n\t\t\t\t\tif (result === true) {\n\n\t\t\t\t\t\toncomplete(true);\n\n\t\t\t\t\t} else {\n\n\t\t\t\t\t\tshell.trace();\n\t\t\t\t\t\toncomplete(false);\n\n\t\t\t\t\t}\n\n\t\t\t\t});\n\n\t\t\t} else {\n\n\t\t\t\toncomplete(false);\n\n\t\t\t}\n\n\t\t}, this);\n\n\t};\n\n\n\tComposite.prototype = {\n\n\t\t/*\n\t\t * ENTITY API\n\t\t */\n\n\t\t// deserialize: function(blob) {},\n\n\t\tserialize: function() {\n\n\t\t\tlet data = _Template.prototype.serialize.call(this);\n\t\t\tdata['constructor'] = 'fertilizer.template.html-nwjs.Application';\n\n\n\t\t\treturn data;\n\n\t\t}\n\n\t};\n\n\n\treturn Composite;\n\n}"}},"fertilizer.template.html-nwjs.Library":{"constructor":"lychee.Definition","arguments":[{"id":"fertilizer.template.html-nwjs.Library"}],"blob":{"attaches":{"tpl":{"constructor":"Stuff","arguments":["/libraries/fertilizer/source/template/html-nwjs/Library.tpl"],"blob":{"buffer":"data:application/octet-stream;base64,CihmdW5jdGlvbihseWNoZWUsIGdsb2JhbCkgewoKCWxldCBlbnZpcm9ubWVudCA9IGx5Y2hlZS5kZXNlcmlhbGl6ZSgke2Jsb2J9KTsKCWlmIChlbnZpcm9ubWVudCAhPT0gbnVsbCkgewoJCWVudmlyb25tZW50LmluaXQoKTsKCX0KCglseWNoZWUuRU5WSVJPTk1FTlRTWycke2lkfSddID0gZW52aXJvbm1lbnQ7Cgp9KShseWNoZWUsIHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogdGhpcyk7Cgo="}}},"includes":["fertilizer.Template"],"exports":"function (lychee, global, attachments) {\n\n\tconst _Template = lychee.import('fertilizer.Template');\n\tconst _TEMPLATE = attachments[\"tpl\"];\n\n\n\n\t/*\n\t * IMPLEMENTATION\n\t */\n\n\tlet Composite = function(data) {\n\n\t\t_Template.call(this, data);\n\n\n\t\tthis.__index = lychee.deserialize(lychee.serialize(_TEMPLATE));\n\n\n\n\t\t/*\n\t\t * INITIALIZATION\n\t\t */\n\n\t\tthis.bind('configure', function(oncomplete) {\n\t\t\tconsole.log('fertilizer: CONFIGURE');\n\t\t\toncomplete(true);\n\t\t}, this);\n\n\t\tthis.bind('build', function(oncomplete) {\n\n\t\t\tlet env   = this.environment;\n\t\t\tlet stash = this.stash;\n\n\t\t\tif (env !== null && stash !== null) {\n\n\t\t\t\tconsole.log('fertilizer: BUILD ' + env.id);\n\n\n\t\t\t\tlet sandbox = this.sandbox;\n\t\t\t\tlet index   = this.__index;\n\n\n\t\t\t\tindex.buffer = index.buffer.replaceObject({\n\t\t\t\t\tblob: env.serialize(),\n\t\t\t\t\tid:   env.id\n\t\t\t\t});\n\n\n\t\t\t\tstash.write(sandbox + '/index.js', index);\n\n\n\t\t\t\toncomplete(true);\n\n\t\t\t} else {\n\n\t\t\t\toncomplete(false);\n\n\t\t\t}\n\n\t\t}, this);\n\n\t\tthis.bind('package', function(oncomplete) {\n\t\t\tconsole.log('fertilizer: PACKAGE');\n\t\t\toncomplete(true);\n\t\t}, this);\n\n\t};\n\n\n\tComposite.prototype = {\n\n\t\t/*\n\t\t * ENTITY API\n\t\t */\n\n\t\t// deserialize: function(blob) {},\n\n\t\tserialize: function() {\n\n\t\t\tlet data = _Template.prototype.serialize.call(this);\n\t\t\tdata['constructor'] = 'fertilizer.template.html-nwjs.Library';\n\n\n\t\t\treturn data;\n\n\t\t}\n\n\t};\n\n\n\treturn Composite;\n\n}"}},"fertilizer.template.html-webview.Application":{"constructor":"lychee.Definition","arguments":[{"id":"fertilizer.template.html-webview.Application"}],"blob":{"attaches":{"icon.png":{"constructor":"Texture","arguments":["/libraries/fertilizer/source/template/html-webview/Application.icon.png"],"blob":{"buffer":"data:image/png;base64,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/NmwGoA9e/agqqpqIoB/FvlY/jEALZZlLfH7/buAD0+wKSVlAPYFHtm27QMwyxjzrwBmAji4iF/tUmb+3bAYANu2EY/HR1uW9TaA6iIS0i4ATwNYZYxZHgwG3wCALVu2YOLEiaodZUjfyM1wODyaiOYikZH6LBReCrFMzGbmJ3JqAGzbhuM4lUS0G0ChD4ZfIaIV8Xh8eVVV1YqampoeVXglk2c7evToff8Oh8NTiWg2gFlIxFwUdBCWMeakYDABSBYPAAACRUlEQVS4NicGIBKJoK2tzaqvr38bwDgUzpkCDoAXAKwiopcdx3kxGAxu7SMUna1XskIkEvHH4/FTieg0AB9DYifniAJ7zCOj0eibbgOFXGlGnzjsVgCT8/hy7QBeRmKGfjURvRwIBN5WZVfyOIwYaYyZAuDkPp98prfvATDWGNPhJho1o7b02b++HMCcYXqJrQBeAbAh+WlNrb8rSjEQDoePIqITARyLRHLYRgxfkti2WCw23uv1vpdpt6Wr7jJH5+DtRiIl+AYi2myM2WiMeS0YDG46kAFSlBLxGCYCOM4Yc3TSUzgaif0ch2b5VhuY+SOZtqiTC+X/dwC3D6En34xEHPkbRPSG4zibUjPwKXKxzVFRCpkDBZWJSAOAI40xRxHRkQCOBHAEElvCA4O4zRPMPDtdJ0oZ3JiZRHSgpYVuADuRSOC4FcBWItrqOM5bALb0nYTrM4Gi6+uK4oL+FDYcDo9OGoNDieiwpNcwMelJjAVwIH//Dmb+0qA8gOTpt+8YY7ZblrXTGLOTmSNaRYpSmDiOUyEi4yzLGktE44wxhwP4HTNrIlpFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURSlqPg/8yAgOX81704AAAAASUVORK5CYII="}},"index.tpl":{"constructor":"Stuff","arguments":["/libraries/fertilizer/source/template/html-webview/Application.index.tpl"],"blob":{"buffer":"data:application/octet-stream;base64,PCFET0NUWVBFIGh0bWw+CjxodG1sPgo8aGVhZD4KCTx0aXRsZT4ke2lkfTwvdGl0bGU+Cgk8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEsIG1pbmltdW0tc2NhbGU9MSwgbWF4aW11bS1zY2FsZT0xLCB1c2VyLXNjYWxhYmxlPW5vIj4KCTxtZXRhIG5hbWU9ImFwcGxlLW1vYmlsZS13ZWItYXBwLWNhcGFibGUiIGNvbnRlbnQ9InllcyI+Cgk8bWV0YSBuYW1lPSJhcHBsZS1tb2JpbGUtd2ViLWFwcC1zdGF0dXMtYmFyLXN0eWxlIiBjb250ZW50PSJibGFjay10cmFuc2x1Y2VudCI+Cgk8bWV0YSBodHRwLWVxdWl2PSJYLVVBLUNvbXBhdGlibGUiIGNvbnRlbnQ9IklFPWVkZ2UiIC8+CgoJPHNjcmlwdCBzcmM9Ii4vY29yZS5qcyI+PC9zY3JpcHQ+CgoJPHN0eWxlPgoJCWJvZHkgewoJCQltYXJnaW46IDA7CgkJCXBhZGRpbmc6IDA7CgkJfQoJCQoJCS5seWNoZWUtUmVuZGVyZXItY2FudmFzIHsKCQkJZGlzcGxheTogYmxvY2s7CgkJCW1hcmdpbjogMCBhdXRvOwoJCQl1c2VyLXNlbGVjdDogbm9uZTsKCQkJLW1vei11c2VyLXNlbGVjdDogbm9uZTsKCQkJLW1zLXVzZXItc2VsZWN0OiBub25lOwoJCQktd2Via2l0LXVzZXItc2VsZWN0OiBub25lOwoJCX0gCgk8L3N0eWxlPgoKPC9oZWFkPgo8Ym9keT4KPHNjcmlwdD4KKGZ1bmN0aW9uKGx5Y2hlZSwgZ2xvYmFsKSB7CgoJbGV0IGVudmlyb25tZW50ID0gbHljaGVlLmRlc2VyaWFsaXplKCR7YmxvYn0pOwoJaWYgKGVudmlyb25tZW50ICE9PSBudWxsKSB7CgkJbHljaGVlLmVudmluaXQoZW52aXJvbm1lbnQsICR7cHJvZmlsZX0pOwoJfQoKfSkobHljaGVlLCB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHRoaXMpOwo8L3NjcmlwdD4KPC9ib2R5Pgo8L2h0bWw+Cg=="}}},"includes":["fertilizer.Template"],"exports":"function (lychee, global, attachments) {\n\n\tconst _Template  = lychee.import('fertilizer.Template');\n\tconst _TEMPLATES = {\n\t\tcore:  null,\n\t\ticon:  attachments[\"icon.png\"],\n\t\tindex: attachments[\"index.tpl\"]\n\t};\n\n\n\n\t/*\n\t * IMPLEMENTATION\n\t */\n\n\tlet Composite = function(data) {\n\n\t\t_Template.call(this, data);\n\n\n\t\tthis.__core  = lychee.deserialize(lychee.serialize(_TEMPLATES.core));\n\t\tthis.__icon  = lychee.deserialize(lychee.serialize(_TEMPLATES.icon));\n\t\tthis.__index = lychee.deserialize(lychee.serialize(_TEMPLATES.index));\n\n\n\n\t\t/*\n\t\t * INITIALIZATION\n\t\t */\n\n\t\tthis.bind('configure', function(oncomplete) {\n\n\t\t\tconsole.log('fertilizer: CONFIGURE');\n\n\t\t\tlet that = this;\n\t\t\tlet load = 2;\n\t\t\tlet core = this.stash.read('/libraries/lychee/build/html-webview/core.js');\n\t\t\tlet icon = this.stash.read('./icon.png');\n\n\t\t\tif (core !== null) {\n\n\t\t\t\tcore.onload = function(result) {\n\n\t\t\t\t\tif (result === true) {\n\t\t\t\t\t\tthat.__core = this;\n\t\t\t\t\t}\n\n\t\t\t\t\tif ((--load) === 0) {\n\t\t\t\t\t\toncomplete(true);\n\t\t\t\t\t}\n\n\t\t\t\t};\n\n\t\t\t\tcore.load();\n\n\t\t\t}\n\n\t\t\tif (icon !== null) {\n\n\t\t\t\ticon.onload = function(result) {\n\n\t\t\t\t\tif (result === true) {\n\t\t\t\t\t\tthat.__icon = this;\n\t\t\t\t\t}\n\n\t\t\t\t\tif ((--load) === 0) {\n\t\t\t\t\t\toncomplete(true);\n\t\t\t\t\t}\n\n\t\t\t\t};\n\n\t\t\t\ticon.load();\n\n\t\t\t}\n\n\n\t\t\tif (core === null && icon === null) {\n\t\t\t\toncomplete(false);\n\t\t\t}\n\n\t\t}, this);\n\n\t\tthis.bind('build', function(oncomplete) {\n\n\t\t\tlet env   = this.environment;\n\t\t\tlet stash = this.stash;\n\n\n\t\t\tif (env !== null && stash !== null) {\n\n\t\t\t\tconsole.log('fertilizer: BUILD ' + env.id);\n\n\n\t\t\t\tlet sandbox = this.sandbox;\n\t\t\t\tlet core    = this.__core;\n\t\t\t\tlet icon    = this.__icon;\n\t\t\t\tlet index   = this.__index;\n\n\n\t\t\t\tindex.buffer = index.buffer.replaceObject({\n\t\t\t\t\tblob:    env.serialize(),\n\t\t\t\t\tid:      env.id,\n\t\t\t\t\tprofile: this.profile\n\t\t\t\t});\n\n\n\t\t\t\tstash.write(sandbox + '/core.js',    core);\n\t\t\t\tstash.write(sandbox + '/icon.png',   icon);\n\t\t\t\tstash.write(sandbox + '/index.html', index);\n\n\n\t\t\t\toncomplete(true);\n\n\t\t\t} else {\n\n\t\t\t\toncomplete(false);\n\n\t\t\t}\n\n\t\t}, this);\n\n\t\tthis.bind('package', function(oncomplete) {\n\n\t\t\tlet name    = this.environment.id.split('/')[2];\n\t\t\tlet sandbox = this.sandbox;\n\t\t\tlet shell   = this.shell;\n\n\n\t\t\tif (sandbox !== '') {\n\n\t\t\t\tconsole.log('fertilizer: PACKAGE ' + sandbox + ' ' + name);\n\n\n\t\t\t\tshell.exec('/bin/runtime/html-webview/package.sh ' + sandbox + ' ' + name, function(result) {\n\n\t\t\t\t\tif (result === true) {\n\n\t\t\t\t\t\toncomplete(true);\n\n\t\t\t\t\t} else {\n\n\t\t\t\t\t\tshell.trace();\n\t\t\t\t\t\toncomplete(false);\n\n\t\t\t\t\t}\n\n\t\t\t\t});\n\n\t\t\t} else {\n\n\t\t\t\toncomplete(false);\n\n\t\t\t}\n\n\t\t}, this);\n\n\t};\n\n\n\tComposite.prototype = {\n\n\t\t/*\n\t\t * ENTITY API\n\t\t */\n\n\t\t// deserialize: function(blob) {},\n\n\t\tserialize: function() {\n\n\t\t\tlet data = _Template.prototype.serialize.call(this);\n\t\t\tdata['constructor'] = 'fertilizer.template.html-webview.Application';\n\n\n\t\t\treturn data;\n\n\t\t}\n\n\t};\n\n\n\treturn Composite;\n\n}"}},"fertilizer.template.html-webview.Library":{"constructor":"lychee.Definition","arguments":[{"id":"fertilizer.template.html-webview.Library"}],"blob":{"attaches":{"tpl":{"constructor":"Stuff","arguments":["/libraries/fertilizer/source/template/html-webview/Library.tpl"],"blob":{"buffer":"data:application/octet-stream;base64,CihmdW5jdGlvbihseWNoZWUsIGdsb2JhbCkgewoKCWxldCBlbnZpcm9ubWVudCA9IGx5Y2hlZS5kZXNlcmlhbGl6ZSgke2Jsb2J9KTsKCWlmIChlbnZpcm9ubWVudCAhPT0gbnVsbCkgewoJCWVudmlyb25tZW50LmluaXQoKTsKCX0KCglseWNoZWUuRU5WSVJPTk1FTlRTWycke2lkfSddID0gZW52aXJvbm1lbnQ7Cgp9KShseWNoZWUsIHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogdGhpcyk7Cgo="}}},"includes":["fertilizer.Template"],"exports":"function (lychee, global, attachments) {\n\n\tconst _Template = lychee.import('fertilizer.Template');\n\tconst _TEMPLATE = attachments[\"tpl\"];\n\n\n\n\t/*\n\t * IMPLEMENTATION\n\t */\n\n\tlet Composite = function(data) {\n\n\t\t_Template.call(this, data);\n\n\n\t\tthis.__index = lychee.deserialize(lychee.serialize(_TEMPLATE));\n\n\n\n\t\t/*\n\t\t * INITIALIZATION\n\t\t */\n\n\t\tthis.bind('configure', function(oncomplete) {\n\t\t\tconsole.log('fertilizer: CONFIGURE');\n\t\t\toncomplete(true);\n\t\t}, this);\n\n\t\tthis.bind('build', function(oncomplete) {\n\n\t\t\tlet env   = this.environment;\n\t\t\tlet stash = this.stash;\n\n\t\t\tif (env !== null && stash !== null) {\n\n\t\t\t\tconsole.log('fertilizer: BUILD ' + env.id);\n\n\n\t\t\t\tlet sandbox = this.sandbox;\n\t\t\t\tlet index   = this.__index;\n\n\n\t\t\t\tindex.buffer = index.buffer.replaceObject({\n\t\t\t\t\tblob: env.serialize(),\n\t\t\t\t\tid:   env.id\n\t\t\t\t});\n\n\n\t\t\t\tstash.write(sandbox + '/index.js', index);\n\n\n\t\t\t\toncomplete(true);\n\n\t\t\t} else {\n\n\t\t\t\toncomplete(false);\n\n\t\t\t}\n\n\t\t}, this);\n\n\t\tthis.bind('package', function(oncomplete) {\n\t\t\tconsole.log('fertilizer: PACKAGE');\n\t\t\toncomplete(true);\n\t\t}, this);\n\n\t};\n\n\n\tComposite.prototype = {\n\n\t\t/*\n\t\t * ENTITY API\n\t\t */\n\n\t\t// deserialize: function(blob) {},\n\n\t\tserialize: function() {\n\n\t\t\tlet data = _Template.prototype.serialize.call(this);\n\t\t\tdata['constructor'] = 'fertilizer.template.html-webview.Library';\n\n\n\t\t\treturn data;\n\n\t\t}\n\n\t};\n\n\n\treturn Composite;\n\n}"}},"fertilizer.template.node.Application":{"constructor":"lychee.Definition","arguments":[{"id":"fertilizer.template.node.Application"}],"blob":{"attaches":{"index.tpl":{"constructor":"Stuff","arguments":["/libraries/fertilizer/source/template/node/Application.index.tpl"],"blob":{"buffer":"data:application/octet-stream;base64,CnJlcXVpcmUoJy4vY29yZS5qcycpKF9fZGlybmFtZSk7CgoKKGZ1bmN0aW9uKGx5Y2hlZSwgZ2xvYmFsKSB7CgoJbGV0IGVudmlyb25tZW50ID0gbHljaGVlLmRlc2VyaWFsaXplKCR7YmxvYn0pOwoJaWYgKGVudmlyb25tZW50ICE9PSBudWxsKSB7CgkJbHljaGVlLmVudmluaXQoZW52aXJvbm1lbnQsICR7cHJvZmlsZX0pOwoJfQoKfSkobHljaGVlLCB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHRoaXMpOwoK"}}},"includes":["fertilizer.Template"],"exports":"function (lychee, global, attachments) {\n\n\tconst _Template  = lychee.import('fertilizer.Template');\n\tconst _TEMPLATES = {\n\t\tcore:  null,\n\t\tindex: attachments[\"index.tpl\"]\n\t};\n\n\n\n\t/*\n\t * IMPLEMENTATION\n\t */\n\n\tlet Composite = function(data) {\n\n\t\t_Template.call(this, data);\n\n\n\t\tthis.__core  = lychee.deserialize(lychee.serialize(_TEMPLATES.core));\n\t\tthis.__index = lychee.deserialize(lychee.serialize(_TEMPLATES.index));\n\n\n\n\t\t/*\n\t\t * INITIALIZATION\n\t\t */\n\n\t\tthis.bind('configure', function(oncomplete) {\n\n\t\t\tconsole.log('fertilizer: CONFIGURE');\n\n\n\t\t\tlet that = this;\n\t\t\tlet load = 1;\n\t\t\tlet core = this.stash.read('/libraries/lychee/build/node/core.js');\n\n\t\t\tif (core !== null) {\n\n\t\t\t\tcore.onload = function(result) {\n\n\t\t\t\t\tif (result === true) {\n\t\t\t\t\t\tthat.__core = this;\n\t\t\t\t\t}\n\n\t\t\t\t\tif ((--load) === 0) {\n\t\t\t\t\t\toncomplete(true);\n\t\t\t\t\t}\n\n\t\t\t\t};\n\n\t\t\t\tcore.load();\n\n\t\t\t}\n\n\n\t\t\tif (core === null) {\n\t\t\t\toncomplete(false);\n\t\t\t}\n\n\t\t}, this);\n\n\t\tthis.bind('build', function(oncomplete) {\n\n\t\t\tlet env   = this.environment;\n\t\t\tlet stash = this.stash;\n\n\t\t\tif (env !== null && stash !== null) {\n\n\t\t\t\tconsole.log('fertilizer: BUILD ' + env.id);\n\n\n\t\t\t\tlet sandbox = this.sandbox;\n\t\t\t\tlet core    = this.__core;\n\t\t\t\tlet index   = this.__index;\n\n\n\t\t\t\tindex.buffer = index.buffer.replaceObject({\n\t\t\t\t\tblob:    env.serialize(),\n\t\t\t\t\tid:      env.id,\n\t\t\t\t\tprofile: this.profile\n\t\t\t\t});\n\n\n\t\t\t\tstash.write(sandbox + '/core.js',  core);\n\t\t\t\tstash.write(sandbox + '/index.js', index);\n\n\n\t\t\t\toncomplete(true);\n\n\t\t\t} else {\n\n\t\t\t\toncomplete(false);\n\n\t\t\t}\n\n\t\t}, this);\n\n\t\tthis.bind('package', function(oncomplete) {\n\n\t\t\tlet name    = this.environment.id.split('/')[2];\n\t\t\tlet sandbox = this.sandbox;\n\t\t\tlet shell   = this.shell;\n\n\n\t\t\tif (sandbox !== '') {\n\n\t\t\t\tconsole.log('fertilizer: PACKAGE ' + sandbox + ' ' + name);\n\n\n\t\t\t\tshell.exec('/bin/runtime/node/package.sh ' + sandbox + ' ' + name, function(result) {\n\n\t\t\t\t\tif (result === true) {\n\n\t\t\t\t\t\toncomplete(true);\n\n\t\t\t\t\t} else {\n\n\t\t\t\t\t\tshell.trace();\n\t\t\t\t\t\toncomplete(false);\n\n\t\t\t\t\t}\n\n\t\t\t\t});\n\n\t\t\t} else {\n\n\t\t\t\toncomplete(false);\n\n\t\t\t}\n\n\t\t}, this);\n\n\t};\n\n\n\tComposite.prototype = {\n\n\t\t/*\n\t\t * ENTITY API\n\t\t */\n\n\t\t// deserialize: function(blob) {},\n\n\t\tserialize: function() {\n\n\t\t\tlet data = _Template.prototype.serialize.call(this);\n\t\t\tdata['constructor'] = 'fertilizer.template.node.Application';\n\n\n\t\t\treturn data;\n\n\t\t}\n\n\t};\n\n\n\treturn Composite;\n\n}"}},"fertilizer.template.node.Library":{"constructor":"lychee.Definition","arguments":[{"id":"fertilizer.template.node.Library"}],"blob":{"attaches":{"tpl":{"constructor":"Stuff","arguments":["/libraries/fertilizer/source/template/node/Library.tpl"],"blob":{"buffer":"data:application/octet-stream;base64,CihmdW5jdGlvbihseWNoZWUsIGdsb2JhbCkgewoKCWxldCBlbnZpcm9ubWVudCA9IGx5Y2hlZS5kZXNlcmlhbGl6ZSgke2Jsb2J9KTsKCWlmIChlbnZpcm9ubWVudCAhPT0gbnVsbCkgewoJCWVudmlyb25tZW50LmluaXQoKTsKCX0KCglseWNoZWUuRU5WSVJPTk1FTlRTWycke2lkfSddID0gZW52aXJvbm1lbnQ7Cgp9KShseWNoZWUsIHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogdGhpcyk7Cgo="}}},"includes":["fertilizer.Template"],"exports":"function (lychee, global, attachments) {\n\n\tconst _Template = lychee.import('fertilizer.Template');\n\tconst _TEMPLATE = attachments[\"tpl\"];\n\n\n\n\t/*\n\t * IMPLEMENTATION\n\t */\n\n\tlet Composite = function(data) {\n\n\t\t_Template.call(this, data);\n\n\n\t\tthis.__index = lychee.deserialize(lychee.serialize(_TEMPLATE));\n\n\n\n\t\t/*\n\t\t * INITIALIZATION\n\t\t */\n\n\t\tthis.bind('configure', function(oncomplete) {\n\t\t\tconsole.log('fertilizer: CONFIGURE');\n\t\t\toncomplete(true);\n\t\t}, this);\n\n\t\tthis.bind('build', function(oncomplete) {\n\n\t\t\tlet env   = this.environment;\n\t\t\tlet stash = this.stash;\n\n\t\t\tif (env !== null && stash !== null) {\n\n\t\t\t\tconsole.log('fertilizer: BUILD ' + env.id);\n\n\n\t\t\t\tlet sandbox = this.sandbox;\n\t\t\t\tlet index   = this.__index;\n\n\n\t\t\t\tindex.buffer = index.buffer.replaceObject({\n\t\t\t\t\tblob: env.serialize(),\n\t\t\t\t\tid:   env.id\n\t\t\t\t});\n\n\n\t\t\t\tstash.write(sandbox + '/index.js', index);\n\n\n\t\t\t\toncomplete(true);\n\n\t\t\t} else {\n\n\t\t\t\toncomplete(false);\n\n\t\t\t}\n\n\t\t}, this);\n\n\t\tthis.bind('package', function(oncomplete) {\n\t\t\tconsole.log('fertilizer: PACKAGE');\n\t\t\toncomplete(true);\n\t\t}, this);\n\n\t};\n\n\n\tComposite.prototype = {\n\n\t\t/*\n\t\t * ENTITY API\n\t\t */\n\n\t\t// deserialize: function(blob) {},\n\n\t\tserialize: function() {\n\n\t\t\tlet data = _Template.prototype.serialize.call(this);\n\t\t\tdata['constructor'] = 'fertilizer.template.node.Library';\n\n\n\t\t\treturn data;\n\n\t\t}\n\n\t};\n\n\n\treturn Composite;\n\n}"}},"lychee.event.Flow":{"constructor":"lychee.Definition","arguments":[{"id":"lychee.event.Flow"}],"blob":{"attaches":{},"includes":["lychee.event.Emitter"],"exports":"function (lychee, global, attachments) {\n\n\tconst _Emitter = lychee.import('lychee.event.Emitter');\n\n\n\n\t/*\n\t * HELPERS\n\t */\n\n\tconst _process_recursive = function(event, result) {\n\n\t\tif (result === true) {\n\n\t\t\tif (this.___timeout === null) {\n\n\t\t\t\tthis.___timeout = setTimeout(function() {\n\n\t\t\t\t\tthis.___timeout = null;\n\t\t\t\t\t_process_stack.call(this);\n\n\t\t\t\t}.bind(this), 0);\n\n\t\t\t}\n\n\t\t} else {\n\n\t\t\tthis.trigger('error', [ event ]);\n\n\t\t}\n\n\t};\n\n\tconst _process_stack = function() {\n\n\t\tlet entry = this.___stack.shift() || null;\n\t\tif (entry !== null) {\n\n\t\t\tlet data  = entry.data;\n\t\t\tlet event = entry.event;\n\t\t\tlet args  = [ event, [] ];\n\n\t\t\tif (data !== null) {\n\t\t\t\targs[1].push.apply(args[1], data);\n\t\t\t}\n\n\t\t\targs[1].push(_process_recursive.bind(this, event));\n\n\n\t\t\tlet result = this.trigger.apply(this, args);\n\t\t\tif (result === false) {\n\t\t\t\tthis.trigger('error', [ event ]);\n\t\t\t}\n\n\t\t} else {\n\n\t\t\tthis.trigger('complete');\n\n\t\t}\n\n\t};\n\n\n\n\t/*\n\t * IMPLEMENTATION\n\t */\n\n\tlet Composite = function() {\n\n\t\tthis.___init    = false;\n\t\tthis.___stack   = [];\n\t\tthis.___timeout = null;\n\n\t\t_Emitter.call(this);\n\n\t};\n\n\n\tComposite.prototype = {\n\n\t\t/*\n\t\t * ENTITY API\n\t\t */\n\n\t\t// deserialize: function(blob) {},\n\n\t\tserialize: function() {\n\n\t\t\tlet data = _Emitter.prototype.serialize.call(this);\n\t\t\tdata['constructor'] = 'lychee.event.Flow';\n\n\t\t\tlet blob = (data['blob'] || {});\n\n\n\t\t\tif (this.___stack.length > 0) {\n\n\t\t\t\tblob.stack = [];\n\n\t\t\t\tfor (let s = 0, sl = this.___stack.length; s < sl; s++) {\n\n\t\t\t\t\tlet entry = this.___stack[s];\n\n\t\t\t\t\tblob.stack.push({\n\t\t\t\t\t\tevent: entry.event,\n\t\t\t\t\t\tdata:  lychee.serialize(entry.data)\n\t\t\t\t\t});\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\tdata['blob'] = Object.keys(blob).length > 0 ? blob : null;\n\n\n\t\t\treturn data;\n\n\t\t},\n\n\n\n\t\t/*\n\t\t * CUSTOM API\n\t\t */\n\n\t\tthen: function(event, data) {\n\n\t\t\tevent = typeof event === 'string' ? event : null;\n\t\t\tdata  = data instanceof Array     ? data  : null;\n\n\n\t\t\tif (event !== null) {\n\n\t\t\t\tthis.___stack.push({\n\t\t\t\t\tevent: event,\n\t\t\t\t\tdata:  data\n\t\t\t\t});\n\n\t\t\t\treturn true;\n\n\t\t\t}\n\n\n\t\t\treturn false;\n\n\t\t},\n\n\t\tinit: function() {\n\n\t\t\tif (this.___init === false) {\n\n\t\t\t\tthis.___init = true;\n\n\n\t\t\t\tif (this.___stack.length > 0) {\n\n\t\t\t\t\t_process_stack.call(this);\n\n\t\t\t\t\treturn true;\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\treturn false;\n\n\t\t}\n\n\t};\n\n\n\treturn Composite;\n\n}"}},"lychee.Stash":{"constructor":"lychee.Definition","arguments":[{"id":"lychee.Stash"}],"blob":{"attaches":{},"tags":{"platform":"node"},"includes":["lychee.event.Emitter"],"supports":"function (lychee, global) {\n\n\tif (typeof global.require === 'function') {\n\n\t\ttry {\n\n\t\t\tglobal.require('fs');\n\n\t\t\treturn true;\n\n\t\t} catch (err) {\n\n\t\t}\n\n\t}\n\n\n\treturn false;\n\n}","exports":"function (lychee, global, attachments) {\n\n\tlet   _id         = 0;\n\tconst _Emitter    = lychee.import('lychee.event.Emitter');\n\tconst _PERSISTENT = {\n\t\tdata: {},\n\t\tread: function() {\n\t\t\treturn null;\n\t\t},\n\t\twrite: function(id, asset) {\n\t\t\treturn false;\n\t\t}\n\t};\n\tconst _TEMPORARY  = {\n\t\tdata: {},\n\t\tread: function() {\n\n\t\t\tif (Object.keys(this.data).length > 0) {\n\t\t\t\treturn this.data;\n\t\t\t}\n\n\n\t\t\treturn null;\n\n\t\t},\n\t\twrite: function(id, asset) {\n\n\t\t\tif (asset !== null) {\n\t\t\t\tthis.data[id] = asset;\n\t\t\t} else {\n\t\t\t\tdelete this.data[id];\n\t\t\t}\n\n\t\t\treturn true;\n\n\t\t}\n\t};\n\n\n\n\t/*\n\t * FEATURE DETECTION\n\t */\n\n\t(function() {\n\n\t\tconst _ENCODING = {\n\t\t\t'Config':  'utf8',\n\t\t\t'Font':    'utf8',\n\t\t\t'Music':   'binary',\n\t\t\t'Sound':   'binary',\n\t\t\t'Texture': 'binary',\n\t\t\t'Stuff':   'utf8'\n\t\t};\n\n\n\t\tconst _fs      = global.require('fs');\n\t\tconst _path    = global.require('path');\n\t\tconst _mkdir_p = function(path, mode) {\n\n\t\t\tif (mode === undefined) {\n\t\t\t\tmode = 0o777 & (~process.umask());\n\t\t\t}\n\n\n\t\t\tlet is_directory = false;\n\n\t\t\ttry {\n\n\t\t\t\tis_directory = _fs.lstatSync(path).isDirectory();\n\n\t\t\t} catch (err) {\n\n\t\t\t\tif (err.code === 'ENOENT') {\n\n\t\t\t\t\tif (_mkdir_p(_path.dirname(path), mode) === true) {\n\n\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\t_fs.mkdirSync(path, mode);\n\t\t\t\t\t\t} catch (err) {\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t\ttry {\n\t\t\t\t\t\tis_directory = _fs.lstatSync(path).isDirectory();\n\t\t\t\t\t} catch (err) {\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\treturn is_directory;\n\n\t\t};\n\n\n\t\tlet unlink = 'unlinkSync' in _fs;\n\t\tlet write  = 'writeFileSync' in _fs;\n\t\tif (unlink === true && write === true) {\n\n\t\t\t_PERSISTENT.write = function(id, asset) {\n\n\t\t\t\tlet result = false;\n\n\n\t\t\t\tlet path = lychee.environment.resolve(id);\n\t\t\t\tif (path.substr(0, lychee.ROOT.project.length) === lychee.ROOT.project) {\n\n\t\t\t\t\tif (asset !== null) {\n\n\t\t\t\t\t\tlet dir = path.split('/').slice(0, -1).join('/');\n\t\t\t\t\t\tif (dir.substr(0, lychee.ROOT.project.length) === lychee.ROOT.project) {\n\t\t\t\t\t\t\t_mkdir_p(dir);\n\t\t\t\t\t\t}\n\n\n\t\t\t\t\t\tlet data = lychee.serialize(asset);\n\t\t\t\t\t\tif (data !== null && data.blob !== null && typeof data.blob.buffer === 'string') {\n\n\t\t\t\t\t\t\tlet encoding = _ENCODING[data.constructor] || _ENCODING['Stuff'];\n\t\t\t\t\t\t\tlet index    = data.blob.buffer.indexOf('base64,') + 7;\n\t\t\t\t\t\t\tif (index > 7) {\n\n\t\t\t\t\t\t\t\tlet buffer = new Buffer(data.blob.buffer.substr(index, data.blob.buffer.length - index), 'base64');\n\n\t\t\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\t\t\t_fs.writeFileSync(path, buffer, encoding);\n\t\t\t\t\t\t\t\t\tresult = true;\n\t\t\t\t\t\t\t\t} catch (err) {\n\t\t\t\t\t\t\t\t\tresult = false;\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t} else {\n\n\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\t_fs.unlinkSync(path);\n\t\t\t\t\t\t\tresult = true;\n\t\t\t\t\t\t} catch (err) {\n\t\t\t\t\t\t\tresult = false;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\n\t\t\t\treturn result;\n\n\t\t\t};\n\n\t\t}\n\n\n\t\tif (lychee.debug === true) {\n\n\t\t\tlet methods = [];\n\n\t\t\tif (write && unlink) methods.push('Persistent');\n\t\t\tif (_TEMPORARY)      methods.push('Temporary');\n\n\n\t\t\tif (methods.length === 0) {\n\t\t\t\tconsole.error('lychee.Stash: Supported methods are NONE');\n\t\t\t} else {\n\t\t\t\tconsole.info('lychee.Stash: Supported methods are ' + methods.join(', '));\n\t\t\t}\n\n\t\t}\n\n\t})();\n\n\n\n\t/*\n\t * HELPERS\n\t */\n\n\tconst _validate_asset = function(asset) {\n\n\t\tif (asset instanceof Object && typeof asset.serialize === 'function') {\n\t\t\treturn true;\n\t\t}\n\n\t\treturn false;\n\n\t};\n\n\tconst _on_batch_remove = function(stash, others) {\n\n\t\tlet keys = Object.keys(others);\n\n\t\tfor (let k = 0, kl = keys.length; k < kl; k++) {\n\n\t\t\tlet key   = keys[k];\n\t\t\tlet index = this.load.indexOf(key);\n\t\t\tif (index !== -1) {\n\n\t\t\t\tif (this.ready.indexOf(key) === -1) {\n\t\t\t\t\tthis.ready.push(null);\n\t\t\t\t\tthis.load.splice(index, 1);\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t}\n\n\n\t\tif (this.load.length === 0) {\n\t\t\tstash.trigger('batch', [ 'remove', this.ready ]);\n\t\t\tstash.unbind('sync', _on_batch_remove);\n\t\t}\n\n\t};\n\n\tconst _on_batch_write = function(stash, others) {\n\n\t\tlet keys = Object.keys(others);\n\n\t\tfor (let k = 0, kl = keys.length; k < kl; k++) {\n\n\t\t\tlet key   = keys[k];\n\t\t\tlet index = this.load.indexOf(key);\n\t\t\tif (index !== -1) {\n\n\t\t\t\tif (this.ready.indexOf(key) === -1) {\n\t\t\t\t\tthis.ready.push(others[key]);\n\t\t\t\t\tthis.load.splice(index, 1);\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t}\n\n\n\t\tif (this.load.length === 0) {\n\t\t\tstash.trigger('batch', [ 'write', this.ready ]);\n\t\t\tstash.unbind('sync', _on_batch_write);\n\t\t}\n\n\t};\n\n\tconst _read_stash = function(silent) {\n\n\t\tsilent = silent === true;\n\n\n\t\tlet blob = null;\n\n\n\t\tlet type = this.type;\n\t\tif (type === Composite.TYPE.persistent) {\n\n\t\t\tblob = _PERSISTENT.read();\n\n\t\t} else if (type === Composite.TYPE.temporary) {\n\n\t\t\tblob = _TEMPORARY.read();\n\n\t\t}\n\n\n\t\tif (blob !== null) {\n\n\t\t\tif (Object.keys(this.__assets).length !== Object.keys(blob).length) {\n\n\t\t\t\tthis.__assets = {};\n\n\t\t\t\tfor (let id in blob) {\n\t\t\t\t\tthis.__assets[id] = blob[id];\n\t\t\t\t}\n\n\n\t\t\t\tif (silent === false) {\n\t\t\t\t\tthis.trigger('sync', [ this.__assets ]);\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\treturn true;\n\n\t\t}\n\n\n\t\treturn false;\n\n\t};\n\n\tconst _write_stash = function(silent) {\n\n\t\tsilent = silent === true;\n\n\n\t\tlet operations = this.__operations;\n\t\tlet filtered   = {};\n\n\t\tif (operations.length !== 0) {\n\n\t\t\twhile (operations.length > 0) {\n\n\t\t\t\tlet operation = operations.shift();\n\t\t\t\tif (operation.type === 'update') {\n\n\t\t\t\t\tfiltered[operation.id] = operation.asset;\n\n\t\t\t\t\tif (this.__assets[operation.id] !== operation.asset) {\n\t\t\t\t\t\tthis.__assets[operation.id] = operation.asset;\n\t\t\t\t\t}\n\n\t\t\t\t} else if (operation.type === 'remove') {\n\n\t\t\t\t\tfiltered[operation.id] = null;\n\n\t\t\t\t\tif (this.__assets[operation.id] !== null) {\n\t\t\t\t\t\tthis.__assets[operation.id] = null;\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\tlet type = this.type;\n\t\t\tif (type === Composite.TYPE.persistent) {\n\n\t\t\t\tfor (let id in filtered) {\n\t\t\t\t\t_PERSISTENT.write(id, filtered[id]);\n\t\t\t\t}\n\n\t\t\t} else if (type === Composite.TYPE.temporary) {\n\n\t\t\t\tfor (let id in filtered) {\n\t\t\t\t\t_TEMPORARY.write(id, filtered[id]);\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\tif (silent === false) {\n\t\t\t\tthis.trigger('sync', [ this.__assets ]);\n\t\t\t}\n\n\n\t\t\treturn true;\n\n\t\t}\n\n\n\t\treturn false;\n\n\t};\n\n\n\n\t/*\n\t * IMPLEMENTATION\n\t */\n\n\tlet Composite = function(data) {\n\n\t\tlet settings = Object.assign({}, data);\n\n\n\t\tthis.id   = 'lychee-Stash-' + _id++;\n\t\tthis.type = Composite.TYPE.persistent;\n\n\n\t\tthis.__assets     = {};\n\t\tthis.__operations = [];\n\n\n\t\tthis.setId(settings.id);\n\t\tthis.setType(settings.type);\n\n\n\t\t_Emitter.call(this);\n\n\n\n\t\t/*\n\t\t * INITIALIZATION\n\t\t */\n\n\t\t_read_stash.call(this);\n\n\n\t\tsettings = null;\n\n\t};\n\n\n\tComposite.TYPE = {\n\t\tpersistent: 0,\n\t\ttemporary:  1\n\t};\n\n\n\tComposite.prototype = {\n\n\t\t/*\n\t\t * ENTITY API\n\t\t */\n\n\t\tsync: function(silent) {\n\n\t\t\tsilent = silent === true;\n\n\n\t\t\tlet result = false;\n\n\n\t\t\tif (Object.keys(this.__assets).length > 0) {\n\n\t\t\t\tthis.__operations.push({\n\t\t\t\t\ttype: 'sync'\n\t\t\t\t});\n\n\t\t\t}\n\n\n\t\t\tif (this.__operations.length > 0) {\n\t\t\t\tresult = _write_stash.call(this, silent);\n\t\t\t} else {\n\t\t\t\tresult = _read_stash.call(this, silent);\n\t\t\t}\n\n\n\t\t\treturn result;\n\n\t\t},\n\n\t\tdeserialize: function(blob) {\n\n\t\t\tif (blob.assets instanceof Object) {\n\n\t\t\t\tthis.__assets = {};\n\n\t\t\t\tfor (let id in blob.assets) {\n\t\t\t\t\tthis.__assets[id] = lychee.deserialize(blob.assets[id]);\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t},\n\n\t\tserialize: function() {\n\n\t\t\tlet data = _Emitter.prototype.serialize.call(this);\n\t\t\tdata['constructor'] = 'lychee.Stash';\n\n\t\t\tlet settings = {};\n\t\t\tlet blob     = (data['blob'] || {});\n\n\n\t\t\tif (this.id.substr(0, 13) !== 'lychee-Stash-') settings.id   = this.id;\n\t\t\tif (this.type !== Composite.TYPE.persistent)   settings.type = this.type;\n\n\n\t\t\tif (Object.keys(this.__assets).length > 0) {\n\n\t\t\t\tblob.assets = {};\n\n\t\t\t\tfor (let id in this.__assets) {\n\t\t\t\t\tblob.assets[id] = lychee.serialize(this.__assets[id]);\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\tdata['arguments'][0] = settings;\n\t\t\tdata['blob']         = Object.keys(blob).length > 0 ? blob : null;\n\n\n\t\t\treturn data;\n\n\t\t},\n\n\n\n\t\t/*\n\t\t * CUSTOM API\n\t\t */\n\n\t\tbatch: function(action, ids, assets) {\n\n\t\t\taction = typeof action === 'string' ? action : null;\n\t\t\tids    = ids instanceof Array       ? ids    : null;\n\t\t\tassets = assets instanceof Array    ? assets : null;\n\n\n\t\t\tif (action !== null) {\n\n\t\t\t\tlet cache  = {\n\t\t\t\t\tload:  [].slice.call(ids),\n\t\t\t\t\tready: []\n\t\t\t\t};\n\n\n\t\t\t\tlet result = true;\n\t\t\t\tlet that   = this;\n\n\t\t\t\tif (action === 'read') {\n\n\t\t\t\t\tfor (let i = 0, il = ids.length; i < il; i++) {\n\n\t\t\t\t\t\tlet asset = this.read(ids[i]);\n\t\t\t\t\t\tif (asset !== null) {\n\n\t\t\t\t\t\t\tasset.onload = function(result) {\n\n\t\t\t\t\t\t\t\tlet index = cache.load.indexOf(this.url);\n\t\t\t\t\t\t\t\tif (index !== -1) {\n\t\t\t\t\t\t\t\t\tcache.ready.push(this);\n\t\t\t\t\t\t\t\t\tcache.load.splice(index, 1);\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\tif (cache.load.length === 0) {\n\t\t\t\t\t\t\t\t\tthat.trigger('batch', [ 'read', cache.ready ]);\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t};\n\n\t\t\t\t\t\t\tasset.load();\n\n\t\t\t\t\t\t} else {\n\n\t\t\t\t\t\t\tresult = false;\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\n\t\t\t\t\treturn result;\n\n\t\t\t\t} else if (action === 'remove') {\n\n\t\t\t\t\tthis.bind('#sync', _on_batch_remove, cache);\n\n\t\t\t\t\tfor (let i = 0, il = ids.length; i < il; i++) {\n\n\t\t\t\t\t\tif (this.remove(ids[i]) === false) {\n\t\t\t\t\t\t\tresult = false;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t\tif (result === false) {\n\t\t\t\t\t\tthis.unbind('sync', _on_batch_remove);\n\t\t\t\t\t}\n\n\n\t\t\t\t\treturn result;\n\n\t\t\t\t} else if (action === 'write' && ids.length === assets.length) {\n\n\t\t\t\t\tthis.bind('#sync', _on_batch_write, cache);\n\n\t\t\t\t\tfor (let i = 0, il = ids.length; i < il; i++) {\n\n\t\t\t\t\t\tif (this.write(ids[i], assets[i]) === false) {\n\t\t\t\t\t\t\tresult = false;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t\tif (result === false) {\n\t\t\t\t\t\tthis.unbind('sync', _on_batch_write);\n\t\t\t\t\t}\n\n\n\t\t\t\t\treturn result;\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\treturn false;\n\n\t\t},\n\n\t\tread: function(id) {\n\n\t\t\tid = typeof id === 'string' ? id : null;\n\n\n\t\t\tif (id !== null) {\n\n\t\t\t\tlet asset = new lychee.Asset(id, null, true);\n\t\t\t\tif (asset !== null) {\n\n\t\t\t\t\tthis.__assets[id] = asset;\n\n\t\t\t\t\treturn asset;\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\treturn null;\n\n\t\t},\n\n\t\tremove: function(id) {\n\n\t\t\tid = typeof id === 'string' ? id : null;\n\n\n\t\t\tif (id !== null) {\n\n\t\t\t\tthis.__operations.push({\n\t\t\t\t\ttype: 'remove',\n\t\t\t\t\tid:   id\n\t\t\t\t});\n\n\n\t\t\t\t_write_stash.call(this);\n\n\n\t\t\t\treturn true;\n\n\t\t\t}\n\n\n\t\t\treturn false;\n\n\t\t},\n\n\t\twrite: function(id, asset) {\n\n\t\t\tid    = typeof id === 'string'          ? id    : null;\n\t\t\tasset = _validate_asset(asset) === true ? asset : null;\n\n\n\t\t\tif (id !== null && asset !== null) {\n\n\t\t\t\tthis.__operations.push({\n\t\t\t\t\ttype:  'update',\n\t\t\t\t\tid:    id,\n\t\t\t\t\tasset: asset\n\t\t\t\t});\n\n\n\t\t\t\t_write_stash.call(this);\n\n\n\t\t\t\treturn true;\n\n\t\t\t}\n\n\n\t\t\treturn false;\n\n\t\t},\n\n\t\tsetId: function(id) {\n\n\t\t\tid = typeof id === 'string' ? id : null;\n\n\n\t\t\tif (id !== null) {\n\n\t\t\t\tthis.id = id;\n\n\t\t\t\treturn true;\n\n\t\t\t}\n\n\n\t\t\treturn false;\n\n\t\t},\n\n\t\tsetType: function(type) {\n\n\t\t\ttype = lychee.enumof(Composite.TYPE, type) ? type : null;\n\n\n\t\t\tif (type !== null) {\n\n\t\t\t\tthis.type = type;\n\n\t\t\t\treturn true;\n\n\t\t\t}\n\n\n\t\t\treturn false;\n\n\t\t}\n\n\t};\n\n\n\treturn Composite;\n\n}"}}},"features":{"process":{"stdin":{"on":"function"}},"require":"function"}}});
	if (environment !== null) {
		environment.init();
	}

	lychee.ENVIRONMENTS['/libraries/fertilizer/dist'] = environment;

})(lychee, typeof global !== 'undefined' ? global : this);



lychee.inject(lychee.ENVIRONMENTS["/libraries/fertilizer/dist"]);



