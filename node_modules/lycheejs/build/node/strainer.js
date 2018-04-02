
lychee = (function(global) {

	if (typeof lychee !== 'undefined') {
		return lychee;
	}



	const _BLOBOF_CACHE      = {};
	const _INTERFACEOF_CACHE = {};



	/*
	 * POLYFILLS
	 */

	if (typeof Array.from !== 'function') {

		Array.from = function(alike/*, predicate, thisArg */) {

			if (alike === null || alike === undefined) {
				throw new TypeError('Array.from requires an array-like object - not null or undefined');
			}


			let construct = this;
			let list      = Object(alike);
			let predicate = arguments.length > 1 ? arguments[1] : void 0;
			let thisArg   = arguments.length > 2 ? arguments[2] : void 0;

			if (typeof predicate !== 'undefined') {

				if (typeof predicate !== 'function') {
					throw new TypeError('Array.from: when provided, the second argument must be a function');
				}

			}

			let length = list.length >>> 0;
			let array  = typeof construct === 'function' ? Object(new construct(length)) : new Array(length);

			for (let i = 0; i < length; i++) {

				let value = list[i];

				if (predicate !== undefined) {

					if (thisArg === undefined) {
						array[i] = predicate(value, i);
					} else {
						array[i] = predicate.call(thisArg, value, i);
					}

				} else {
					array[i] = value;
				}

			}

			array.length = length;

			return array;

		};

	}

	if (typeof Array.prototype.find !== 'function') {

		Array.prototype.find = function(predicate/*, thisArg */) {

			if (this === null || this === undefined) {
				throw new TypeError('Array.prototype.find called on null or undefined');
			}

			if (typeof predicate !== 'function') {
				throw new TypeError('predicate must be a function');
			}


			let list    = Object(this);
			let length  = list.length >>> 0;
			let thisArg = arguments.length >= 2 ? arguments[1] : void 0;
			let value;

			for (let i = 0; i < length; i++) {

				if (i in list) {

					value = list[i];

					if (predicate.call(thisArg, value, i, list)) {
						return value;
					}

				}

			}


			return undefined;

		};

	}

	if (typeof Array.prototype.includes !== 'function') {

		Array.prototype.includes = function(search/*, from */) {

			if (this === null || this === undefined) {
				throw new TypeError('Array.prototype.includes called on null or undefined');
			}


			let list   = Object(this);
			let length = list.length >>> 0;
			let from   = arguments.length >= 2 ? arguments[1] : 0;
			let value;


			if (length === 0 || from >= length) {
				return false;
			}


			let start = Math.max(from >= 0 ? from : (length - Math.abs(from)), 0);

			for (let i = start; i < length; i++) {

				if (i in list) {

					value = list[i];

					if (value === search || (isNaN(value) && isNaN(search))) {
						return true;
					}

				}

			}


			return false;

		};

	}

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

	if (typeof Object.assign !== 'function') {

		Object.assign = function(object /*, ... sources */) {

			if (object !== Object(object)) {
				throw new TypeError('Object.assign called on a non-object');
			}


			for (let a = 1, al = arguments.length; a < al; a++) {

				let source = arguments[a];
				if (source !== undefined && source !== null) {

					for (let key in source) {

						if (Object.prototype.hasOwnProperty.call(source, key) === true) {
							object[key] = source[key];
						}

					}

				}

			}


			return object;

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

	if (typeof String.prototype.endsWith !== 'function') {

		String.prototype.endsWith = function(search/*, from */) {

			if (this === null || this === undefined) {
				throw new TypeError('String.prototype.endsWith called on null or undefined');
			}


			let value  = (this).toString();
			let from   = arguments.length >= 2 ? (arguments[1] | 0) : value.length;
			let tmp    = String(search);
			let length = tmp.length >>> 0;


			let chunk = value.substr(from - length);
			if (chunk === tmp) {
				return true;
			}


			return false;

		};

	}

	if (typeof String.prototype.includes !== 'function') {

		String.prototype.includes = function(search/*, from */) {

			if (this === null || this === undefined) {
				throw new TypeError('String.prototype.includes called on null or undefined');
			}


			let value  = String(this);
			let from   = arguments.length >= 2 ? (arguments[1] | 0) : 0;
			let tmp    = String(search);
			let length = tmp.length >>> 0;

			if (from + length > value.length) {
				return false;
			}


			return value.indexOf(search, from) !== -1;

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

	if (typeof String.prototype.startsWith !== 'function') {

		String.prototype.startsWith = function(search/*, from */) {

			if (this === null || this === undefined) {
				throw new TypeError('String.prototype.startsWith called on null or undefined');
			}


			let value  = (this).toString();
			let from   = arguments.length >= 2 ? (arguments[1] | 0) : 0;
			let tmp    = String(search);
			let length = tmp.length >>> 0;


			let chunk = value.substr(from, length);
			if (chunk === tmp) {
				return true;
			}


			return false;

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
	let _simulation  = null;

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

	const _bootstrap_simulation = function() {

		_bootstrap_environment.call(this);


		if (_simulation === null) {

			_simulation = new lychee.Simulation({
				environment: this.environment
			});

		}


		if (this.simulation === null) {
			this.setSimulation(_simulation);
		}

	};

	const _validate_environment = function(environment) {

		if (environment instanceof lychee.Environment) {
			return true;
		} else if (environment instanceof lychee.Simulation) {
			return true;
		}


		return false;

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
		simulation:  _simulation,

		ENVIRONMENTS: {},
		FEATURES:     {},
		FILENAME:     null,
		PLATFORMS:    [],
		SIMULATIONS:  {},

		ROOT: {
			lychee:  '/opt/lycheejs',
			project: null
		},

		VERSION: "2018-Q1",



		/*
		 * LIBRARY API
		 */

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

							let ovalue = object[prop];
							if (ovalue instanceof Array) {

								target[prop] = [];
								Module.assignunlink(target[prop], object[prop]);

							} else if (ovalue instanceof Object) {

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

		blobof: function(template, blob) {

			template = template !== undefined ? template : null;
			blob     = blob instanceof Object ? blob     : null;


			if (template !== null && blob !== null) {

				let tname    = template.displayName;
				let bname    = blob.reference || blob.constructor || null;
				let hashable = typeof tname === 'string' && typeof bname === 'string';
				let hashmap  = _BLOBOF_CACHE;


				// 0. Quick validation for identical constructors
				if (hashable === true) {

					if (hashmap[tname] !== undefined && hashmap[tname][bname] !== undefined) {

						return hashmap[tname][bname];

					} else if (tname === bname) {

						if (hashmap[tname] === undefined) {
							hashmap[tname] = {};
						}

						hashmap[tname][bname] = true;

						return hashmap[tname][bname];

					} else if (tname !== bname) {

						let instance = lychee.deserialize(blob);
						if (lychee.interfaceof(template, instance) === true) {

							if (hashmap[tname] === undefined) {
								hashmap[tname] = {};
							}

							hashmap[tname][bname] = true;

							return hashmap[tname][bname];

						}

					}

				}

			}


			return false;

		},

		diff: function(aobject, bobject) {

			aobject = aobject !== undefined ? aobject : undefined;
			bobject = bobject !== undefined ? bobject : undefined;


			if (aobject === bobject) {

				return false;

			} else if (aobject instanceof Array && bobject instanceof Array) {

				for (let a = 0, al = aobject.length; a < al; a++) {

					if (bobject[a] !== undefined) {

						if (aobject[a] !== null && bobject[a] !== null) {

							if (aobject[a] instanceof Object && bobject[a] instanceof Object) {

								if (Module.diff(aobject[a], bobject[a]) === true) {

									// Allows aobject[a].builds = {} and bobject[a].builds = { stuff: {}}
									if (Object.keys(aobject[a]).length > 0) {
										return true;
									}

								}

							} else if (typeof aobject[a] !== typeof bobject[a]) {
								return true;
							} else if (aobject[a] !== bobject[a]) {
								return true;
							}

						}

					} else {
						return true;
					}

				}

			} else if (aobject instanceof Object && bobject instanceof Object) {

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
							} else if (aobject[key] !== bobject[key]) {
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

					let resolved_composite = _resolve_reference.call(scope, data.constructor);
					if (typeof resolved_composite === 'function') {

						let bindargs = Array.from(data.arguments).map(function(value) {

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
						bindargs.push(resolved_composite);
						bindargs.reverse();


						instance = new (
							resolved_composite.bind.apply(
								resolved_composite,
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
							console.info('lychee.serialize: Define ' + (definition.displayName) + '.prototype.serialize() to serialize it.');
						} else {
							console.info('lychee.serialize: Define ' + (definition.displayName) + '.serialize() to serialize it.');
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
					id:  identifier,
					url: lychee.FILENAME || null
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
				console.info('lychee.define: Use lychee.define(id).exports(function(lychee, global, attachments) {})');

			}


			return null;

		},

		export: function(reference, sandbox) {

			reference = typeof reference === 'string' ? reference : null;
			sandbox   = sandbox !== undefined         ? sandbox   : global;


			if (reference !== null && sandbox !== null) {

				_bootstrap_environment.call(this);


				let definition = this.environment.definitions[reference] || null;
				if (definition !== null) {
					return definition.export(sandbox);
				}

			}


			return false;

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

			} else {

				console.warn('lychee.import: Invalid reference');
				console.info('lychee.import: Use lychee.import(reference)');

			}


			return null;

		},

		init: function(environment, settings, callback) {

			let message = environment !== null;

			environment = _validate_environment(environment) === true ? environment : null;
			settings    = settings instanceof Object                  ? settings    : null;
			callback    = callback instanceof Function                ? callback    : null;


			_bootstrap_environment.call(this);
			_bootstrap_simulation.call(this);


			if (environment !== null && settings !== null) {

				if (_environment !== null) {

					if (environment instanceof lychee.Environment) {

						Object.values(_environment.definitions).forEach(function(definition) {
							environment.define(definition, true);
						});

					} else if (environment instanceof lychee.Simulation) {

						Object.values(_environment.definitions).forEach(function(definition) {
							environment.environment.define(definition, true);
						});

					}

				}


				if (environment.id.startsWith('lychee-Environment-')) {
					environment.setId((lychee.ROOT.project || '').substr((lychee.ROOT.lychee || '').length) + '/custom');
				}

				for (let id in settings) {

					let method = 'set' + id.charAt(0).toUpperCase() + id.substr(1);
					if (typeof environment[method] === 'function') {
						environment[method](settings[id]);
					}

				}


				if (environment instanceof lychee.Environment) {

					if (callback === null) {

						let code    = '';
						let profile = settings.profile || {};

						code += '\n\n';
						code += 'if (sandbox === null) {\n';
						code += '\tconsole.error(\'lychee: environment.init() failed.\');\n';
						code += '\treturn;\n';
						code += '}\n';
						code += '\n\n';
						code += 'let lychee = sandbox.lychee;\n';

						let packages = environment.packages;
						if (packages instanceof Object && Array.isArray(packages) === false) {

							for (let pid in packages) {

								if (pid !== 'lychee' && /$([a-z]+)/g.test(pid)) {
									code += 'let ' + pid + ' = sandbox.' + pid + ';\n';
								}

							}

						}

						code += '\n\n';
						code += 'sandbox.MAIN = new ' + environment.target + '(' + JSON.stringify(profile) + ');\n';
						code += '\n\n';
						code += 'if (typeof sandbox.MAIN.init === \'function\') {\n';
						code += '\tsandbox.MAIN.init();\n';
						code += '}\n';

						callback = new Function('sandbox', code);

					}


					lychee.setEnvironment(environment);
					environment.init(callback);

				} else if (environment instanceof lychee.Simulation) {

					let simulation = environment;

					environment = simulation.environment;


					if (callback === null) {

						let code = '';

						code += '\n\n';
						code += 'if (sandbox_sim === null) {\n';
						code += '\tconsole.error(\'lychee: simulation.init() failed.\');\n';
						code += '\treturn;\n';
						code += '}\n';
						code += '\n\n';
						code += 'console.info(\'lychee: simulation.init() succeeded.\');\n';

						callback = new Function('sandbox_sim', code);

					}


					lychee.setEnvironment(environment);

					environment.init(function(sandbox) {

						if (sandbox === null) {
							console.error('lychee: environment.init() failed.');
							return;
						}


						console.info('lychee: environment.init() succeeded.');

						lychee.setSimulation(simulation);
						simulation.init(callback);

					});

				}


				return true;

			} else if (message === true) {

				console.warn('lychee.init: Invalid environment');
				console.info('lychee.init: Use lychee.init(env, settings, callback) where env can be a lychee.Environment or lychee.Simulation instance.');

			}


			return false;

		},

		inject: function(environment) {

			let message = environment !== null;

			environment = environment instanceof lychee.Environment ? environment : null;


			_bootstrap_environment.call(this);


			if (environment !== null) {

				if (this.environment !== null) {

					let that = this;

					Object.values(environment.definitions).forEach(function(definition) {
						that.environment.define(definition, true);
					});

					let build_old = this.environment.definitions[this.environment.target] || null;
					let build_new = environment.definitions[environment.target]           || null;

					if (build_old === null && build_new !== null) {
						this.environment.target = environment.target;
						this.environment.type   = environment.type;
					}


					return true;

				} else {

					console.warn('lychee.inject: Invalid default environment for injection.');
					console.info('lychee.inject: Use lychee.setEnvironment(env) before using lychee.inject(other).');

				}

			} else if (message === true) {

				console.warn('lychee.inject: Invalid environment');
				console.info('lychee.inject: Use lychee.inject(env) where env is a lychee.Environment instance');

			}


			return false;

		},

		pkg: function(type, id, callback) {

			type     = typeof type === 'string'     ? type       : null;
			id       = typeof id === 'string'       ? id         : null;
			callback = callback instanceof Function ? callback   : null;


			if (id !== null && type !== null && callback !== null) {

				if (/^(build|review|source)$/g.test(type)) {

					let config = new Config('./lychee.pkg');

					config.onload = function() {

						let buffer = this.buffer || null;
						if (buffer instanceof Object) {

							let settings = buffer[type].environments[id] || null;
							if (settings instanceof Object) {

								let environment = null;
								let profile     = settings.profile || null;

								if (profile !== null) {
									delete settings.profile;
								}

								if (type === 'build' || type === 'source') {
									environment = new lychee.Environment(JSON.parse(JSON.stringify(settings)));
								} else if (type === 'review') {
									environment = new lychee.Simulation(JSON.parse(JSON.stringify(settings)));
								}

								callback(environment, profile);

							} else {

								console.warn('lychee.pkg: Invalid settings for "' + id + '" in lychee.pkg.');
								console.info('lychee.pkg: Insert settings at "/' + type + '/environments/' + id + '" in lychee.pkg.');

								callback(null, null);

							}

						} else {

							console.warn('lychee.pkg: Invalid package at "' + this.url + '".');
							console.info('lychee.pkg: Replace lychee.pkg with the one from "/projects/boilerplate".');

							callback(null, null);

						}

					};

					config.load();

					return true;

				}

			}


			return false;

		},

		specify: function(identifier) {

			identifier = typeof identifier === 'string' ? identifier : null;


			if (identifier !== null) {

				_bootstrap_simulation.call(this);


				let that          = this;
				let specification = new lychee.Specification({
					id:  identifier,
					url: lychee.FILENAME || null
				});


				specification.exports = function(callback) {

					lychee.Specification.prototype.exports.call(this, callback);
					that.simulation.specify(this, false);

				};


				return specification;

			} else {

				console.warn('lychee.specify: Invalid identifier');
				console.info('lychee.specify: Use lychee.specify(id).exports(function(lychee, global, simulation) {})');

			}


			return null;

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

		},

		setSimulation: function(simulation) {

			simulation = simulation instanceof lychee.Simulation ? simulation : null;


			if (simulation !== null) {

				this.simulation = simulation;

				return true;

			} else {

				this.simulation = _simulation;

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

				if (url.startsWith('data:')) {
					type = url.split(';')[0].split('/').pop();
				} else {
					type = url.split('/').pop().split('.').pop();
				}

			}


			let construct = _resolve_constructor(type);
			if (construct !== null) {

				if (url.startsWith('data:')) {

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
	let _error_trace = Error.prepareStackTrace;


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

		let info1 = 'Report from ' + data.file + '#L' + data.line + ' in ' + data.method;
		let info2 = data.message.trim();
		let info3 = data.stacktrace.map(function(callsite) {
			return callsite.file + '#L' + callsite.line + ' in ' + callsite.method;
		}).join('\n');


		let main = environment.global.MAIN || null;
		if (main !== null) {

			let client = main.client || null;
			if (client !== null) {

				let service = client.getService('debugger');
				if (service !== null) {
					service.report('lychee.Debugger: ' + info1, data);
				}

			}

		}


		console.error('lychee.Debugger: ' + info1);

		if (info2.length > 0) {
			console.error('lychee.Debugger: ' + info2);
		}

		if (info3.length > 0) {

			info3.split('\n').forEach(function(line) {
				console.error('lychee.Debugger: ' + line);
			});

		}
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
					type:        null,
					message:     error.message || '',
					stacktrace:  []
				};


				if (typeof error.stack === 'string') {

					let header = error.stack.trim().split('\n')[0].trim();
					let check1 = header.split(':')[0].trim();
					let check2 = header.split(':').slice(1).join(':').trim();

					if (/^(ReferenceError|SyntaxError)$/g.test(check1)) {
						data.type    = check1;
						data.message = check2;
					}


					let stacktrace = error.stack.trim().split('\n').map(function(raw) {

						let file   = null;
						let line   = null;
						let method = null;

						let chunk = raw.trim();
						if (chunk.startsWith('at')) {

							let tmp1 = chunk.substr(2).trim().split(' ');
							if (tmp1.length === 2) {

								method = tmp1[0].trim();

								if (tmp1[1].startsWith('(')) tmp1[1] = tmp1[1].substr(1).trim();
								if (tmp1[1].endsWith(')'))   tmp1[1] = tmp1[1].substr(0, tmp1[1].length - 1).trim();

								let check = tmp1[1];
								if (check.startsWith('http://') || check.startsWith('https://')) {
									tmp1[1] = '/' + check.split('/').slice(3).join('/');
								} else if (check.startsWith('file://')) {
									tmp1[1] = tmp1[1].substr(7);
								}


								let tmp2 = tmp1[1].split(':');
								if (tmp2.length === 3) {
									file = tmp2[0];
									line = tmp2[1];
								} else if (tmp2.length === 2) {
									file = tmp2[0];
									line = tmp2[1];
								} else if (tmp2.length === 1) {
									file = tmp2[0];
								}

							}

						} else if (chunk.includes('@')) {

							let tmp1 = chunk.split('@');
							if (tmp1.length === 2) {

								if (tmp1[0] !== '') {
									method = tmp1[0];
								}

								let check = tmp1[1];
								if (check.startsWith('http://') || check.startsWith('https://')) {
									tmp1[1] = '/' + check.split('/').slice(3).join('/');
								} else if (check.startsWith('file://')) {
									tmp1[1] = tmp1[1].substr(7);
								}


								let tmp2 = tmp1[1].split(':');
								if (tmp2.length === 3) {
									file = tmp2[0];
									line = tmp2[1];
								} else if (tmp2.length === 2) {
									file = tmp2[0];
									line = tmp2[1];
								} else if (tmp2.length === 1) {
									file = tmp2[0];
								}

							}

						}


						if (file !== null) {

							if (file.startsWith('/opt/lycheejs')) {
								file = file.substr(13);
							}

						}

						if (line !== null) {

							let num = parseInt(line, 10);
							if (!isNaN(num)) {
								line = num;
							}

						}


						return {
							method: method,
							file:   file,
							line:   line
						};

					}).filter(function(callsite) {

						if (
							callsite.method === null
							&& callsite.file === null
							&& callsite.line === null
						) {
							return false;
						}

						return true;

					});


					if (stacktrace.length > 0) {

						let callsite = stacktrace[0];

						data.method     = callsite.method;
						data.file       = callsite.file;
						data.line       = callsite.line;
						data.stacktrace = stacktrace;

					}

				} else if (typeof Error.captureStackTrace === 'function') {

					Error.prepareStackTrace = function(err, stack) {
						return stack;
					};
					Error.captureStackTrace(error);
					Error.prepareStackTrace = _error_trace;


					let stacktrace = Array.from(error.stack).map(function(frame) {

						let file   = frame.getFileName()     || null;
						let line   = frame.getLineNumber()   || null;
						let method = frame.getFunctionName() || frame.getMethodName() || null;


						if (method !== null) {

							let type = frame.getTypeName() || null;
							if (type !== null) {
								method = type + '.' + method;
							}

						}

						if (file !== null && file.startsWith('/opt/lycheejs')) {
							file = file.substr(13);
						}


						return {
							file:   file,
							line:   line,
							method: method
						};

					}).filter(function(callsite) {

						if (
							callsite.method === null
							&& callsite.file === null
							&& callsite.line === null
						) {
							return false;
						}

						return true;

					});


					if (stacktrace.length > 0) {

						let callsite = stacktrace[0];

						data.file       = callsite.file;
						data.line       = callsite.line;
						data.method     = callsite.method;
						data.stacktrace = stacktrace;

					}

				}


				_report_error(environment, data);


				return true;

			} else if (error !== null) {

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

	const _DETECTOR_CACHE = {};
	const _WARNING_CACHE  = {};

	const _create_detector = function(platform) {

		platform = typeof platform === 'string' ? platform : null;


		if (platform !== null) {

			let sandbox = _DETECTOR_CACHE[platform] || null;
			if (sandbox === null) {

				if (platform.includes('-') === true) {

					let major = platform.split('-')[0];
					let minor = platform.split('-')[1];
					let clone = Object.assign({}, lychee.FEATURES[major], lychee.FEATURES[major + '-' + minor]);
					let proxy = _create_proxy(clone);
					if (proxy !== null) {
						sandbox = proxy;
					}

				} else {

					let clone = lychee.FEATURES[platform] || null;
					let proxy = _create_proxy(clone);
					if (proxy !== null) {
						sandbox = proxy;
					}

				}


				_DETECTOR_CACHE[platform] = sandbox;

			}


			return sandbox;

		}


		return null;

	};

	const _create_proxy = function(source, path) {

		path = typeof path === 'string' ? path : 'global';


		if (source === null) {
			return source;
		}


		if (typeof Proxy !== 'undefined') {

			let clone = {};
			let proxy = new Proxy(clone, {

				get: function(target, name) {

					// XXX: Remove this and console will crash the program
					if (name === 'splice') return undefined;


					if (target[name] === undefined) {

						let type = typeof source[name];
						if (/boolean|number|string|function/g.test(type)) {
							target[name] = source[name];
						} else if (/object/g.test(type)) {
							target[name] = _create_proxy(source[name], path + '.' + name);
						} else if (/undefined/g.test(type)) {
							target[name] = undefined;
						}


						if (target[name] === undefined) {

							let warned = _WARNING_CACHE[path + '.' + name] || false;
							if (warned === false) {
								_WARNING_CACHE[path + '.' + name] = true;
								console.warn('lychee.Definition: Unknown feature (data type) "' + path + '.' + name + '" in features.js');
							}

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

		}


		return source;

	};

	const _fuzz_asset = function(type) {

		let asset = {
			url:       '/tmp/Dummy.' + type,
			_is_dummy: true,
			serialize: function() {
				return null;
			}
		};


		let url = this.url;
		if (url !== null) {
			asset.url = url.split('.').slice(0, -1).join('.') + '.' + type;
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

		if (this.url !== null) {

			let namespace = null;

			for (let pid in lychee.environment.packages) {

				let pkg  = lychee.environment.packages[pid];
				let base = pkg.url.split('/').slice(0, -1).join('/');

				if (this.url.startsWith(base)) {
					namespace = pkg.id;
				}

			}


			if (namespace !== null) {

				let id    = '';
				let ns    = this.url.split('/');
				let tmp_i = ns.indexOf('source');
				let tmp_s = ns[ns.length - 1];

				if (/\.js$/g.test(tmp_s)) {
					ns[ns.length - 1] = tmp_s.split('.').slice(0, -1).join('.');
				}

				if (tmp_i !== -1 && ns[tmp_i + 1] === 'core') {

					if (ns[tmp_i + 2] === 'lychee') {
						ns.splice(tmp_i + 1, 2);
					} else {
						ns.splice(tmp_i + 1, 1);
					}

				}

				if (tmp_i !== -1) {
					id = ns.slice(tmp_i + 1).join('.');
				}

				if (id !== '') {
					found = namespace + '.' + id;
				} else {
					found = namespace;
				}

			}

		}

		return found;

	};

	const _resolve = function(identifier) {

		let pointer   = this;
		let namespace = identifier.split('.');
		let id        = namespace.pop();

		for (let n = 0, nl = namespace.length; n < nl; n++) {

			let name = namespace[n];

			if (pointer[name] === undefined) {
				pointer[name] = {};
			}

			pointer = pointer[name];

		}


		let check = id.toLowerCase();
		if (check === id) {

			if (pointer[id] === undefined) {
				pointer[id] = {};
			}

			return pointer[id];

		} else {

			if (pointer[id] !== undefined) {
				return pointer[id];
			}

		}


		return null;

	};



	/*
	 * IMPLEMENTATION
	 */

	const Composite = function(data) {

		let settings = Object.assign({}, data);


		this.id  = '';
		this.url = lychee.FILENAME || null;

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


		// XXX: url has to be set first for fuzzing
		this.setUrl(settings.url);
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


			if (typeof blob.supports === 'string') {

				// Function head
				let tmp = blob.exports.split('{')[0].trim();
				if (tmp.startsWith('function')) {
					tmp = tmp.substr('function'.length).trim();
				}

				if (tmp.startsWith('anonymous')) tmp = tmp.substr('anonymous'.length).trim();
				if (tmp.startsWith('('))         tmp = tmp.substr(1).trim();
				if (tmp.endsWith(')'))           tmp = tmp.substr(0, tmp.length - 1).trim();

				let bindargs = tmp.split(',').map(function(name) {
					return name.trim();
				});

				let check = bindargs[bindargs.length - 1];
				if (check.includes('\n')) {
					bindargs[bindargs.length - 1] = check.split('\n')[0];
				}


				// Function body
				let i1 = blob.supports.indexOf('{') + 1;
				let i2 = blob.supports.lastIndexOf('}') - 1;
				bindargs.push(blob.supports.substr(i1, i2 - i1));

				this.supports(Function.apply(Function, bindargs));

			}

			if (typeof blob.exports === 'string') {

				// Function head
				let tmp = blob.exports.split('{')[0].trim();
				if (tmp.startsWith('function')) {
					tmp = tmp.substr('function'.length).trim();
				}

				if (tmp.startsWith('anonymous')) tmp = tmp.substr('anonymous'.length).trim();
				if (tmp.startsWith('('))         tmp = tmp.substr(1).trim();
				if (tmp.endsWith(')'))           tmp = tmp.substr(0, tmp.length - 1).trim();

				let bindargs = tmp.split(',').map(function(name) {
					return name.trim();
				});

				let check = bindargs[bindargs.length - 1];
				if (check.includes('\n')) {
					bindargs[bindargs.length - 1] = check.split('\n')[0];
				}


				// Function body
				let i1 = blob.exports.indexOf('{') + 1;
				let i2 = blob.exports.lastIndexOf('}') - 1;
				bindargs.push(blob.exports.substr(i1, i2 - i1));

				this.exports(Function.apply(Function, bindargs));

			}

		},

		serialize: function() {

			let settings = {};
			let blob     = {};


			if (this.id !== '')  settings.id  = this.id;
			if (this.url !== '') settings.url = this.url;


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

				if (id.includes('.') && /^([A-Za-z0-9-.]+)$/g.test(id)) {

					this.id = id;

					return true;

				} else {

					let fuzzed = _fuzz_id.call(this);
					if (fuzzed !== null) {

						this.id = fuzzed;

						console.warn('lychee.Definition: Injecting Identifier "' + fuzzed + '" (' + this.url + ')');

						return true;

					} else {

						console.error('lychee.Definition: Invalid Identifier "' + id + '" (' + this.url + ')');

					}

				}

			}


			return false;

		},

		setUrl: function(url) {

			url = typeof url === 'string' ? url : null;


			if (url !== null) {

				this.url = url;

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

		check: function(target) {

			target = target instanceof Object ? target : {};


			let features  = null;
			let supported = true;
			let tagged    = true;


			for (let key in this._tags) {

				let tag = this._tags[key];
				let val = target[key] || null;
				if (val instanceof Array) {

					if (val.includes(tag) === false) {
						tagged = false;
						break;
					}

				} else if (typeof val === 'string') {

					if (val !== tag) {
						tagged = false;
						break;
					}

				}

			}


			if (this._supports !== null) {

				supported = false;


				let platform = this._tags.platform || null;
				if (platform !== null) {

					let detector = _create_detector(platform);
					if (detector !== null) {
						supported = this._supports.call(detector, lychee, detector);
						features  = JSON.parse(JSON.stringify(detector));
						detector  = null;
					} else {
						supported = this._supports.call(global, lychee, global);
					}

				} else {

					supported = this._supports.call(global, lychee, global);

				}

			}


			return {
				features:  features,
				supported: supported,
				tagged:    tagged
			};

		},

		export: function(sandbox) {

			sandbox = sandbox !== undefined ? sandbox : global;


			let check = _resolve.call(sandbox, this.id);
			if (check === null) {

				let console   = sandbox.console || global.console;
				let id        = this.id;
				let namespace = _resolve.call(sandbox, id.split('.').slice(0, -1).join('.'));
				let name      = id.split('.').pop();

				if (this._exports !== null) {

					let includes = this._includes.map(function(id) {
						return _resolve.call(sandbox, id);
					});

					let requires = this._requires.map(function(id) {
						return _resolve.call(sandbox, id);
					});


					if (includes.includes(null) === false && requires.includes(null) === false) {

						let template = null;

						try {

							template = this._exports.call(
								this._exports,
								sandbox.lychee,
								sandbox,
								this._attaches
							) || null;

						} catch (err) {
							lychee.Debugger.report(lychee.environment, err, this);
						}


						if (template !== null) {

							if (includes.length > 0) {

								let own_enums   = null;
								let own_methods = null;
								let own_keys    = Object.keys(template);
								let own_proto   = template.prototype;


								if (own_keys.length > 0) {

									own_enums = {};

									for (let ok = 0, okl = own_keys.length; ok < okl; ok++) {

										let own_key = own_keys[ok];
										if (own_key === own_key.toUpperCase()) {
											own_enums[own_key] = template[own_key];
										}

									}

									if (Object.keys(own_enums).length === 0) {
										own_enums = null;
									}

								}


								if (own_proto instanceof Object) {

									own_methods = {};

									for (let own_method in own_proto) {
										own_methods[own_method] = own_proto[own_method];
									}

									if (Object.keys(own_methods).length === 0) {
										own_methods = null;
									}

								}


								Object.defineProperty(namespace, name, {
									value:        template,
									writable:     false,
									enumerable:   true,
									configurable: false
								});

								namespace[name].displayName = id;
								namespace[name].prototype   = {};


								let tpl_enums   = {};
								let tpl_methods = [ namespace[name].prototype ];


								for (let i = 0, il = includes.length; i < il; i++) {

									let include  = includes[i];
									let inc_keys = Object.keys(include);
									if (inc_keys.length > 0) {

										for (let ik = 0, ikl = inc_keys.length; ik < ikl; ik++) {

											let inc_key = inc_keys[ik];
											if (inc_key === inc_key.toUpperCase()) {
												tpl_enums[inc_key] = include[inc_key];
											}

										}

									}

									tpl_methods.push(include.prototype);

								}


								if (own_enums !== null) {

									for (let e in own_enums) {
										tpl_enums[e] = own_enums[e];
									}

								}

								if (own_methods !== null) {
									tpl_methods.push(own_methods);
								}

								for (let e in tpl_enums) {
									namespace[name][e] = tpl_enums[e];
								}


								Object.assign.apply(lychee, tpl_methods);
								namespace[name].prototype.displayName = id;

								Object.freeze(namespace[name].prototype);


								return true;

							} else {

								namespace[name]             = template;
								namespace[name].displayName = id;


								if (template instanceof Object) {
									Object.freeze(namespace[name]);
								}

								if (namespace[name].prototype instanceof Object) {
									namespace[name].prototype.displayName = id;
									Object.freeze(namespace[name].prototype);
								}


								return true;

							}

						} else {

							namespace[name]                       = function() {
								console.warn('Dummy Composite: Replace me with a real Definition!');
							};
							namespace[name].displayName           = id;
							namespace[name].prototype             = {};
							namespace[name].prototype.displayName = id;

							Object.freeze(namespace[name].prototype);

							console.error('lychee.Definition ("' + id + '"): Invalid Definition, replaced with Dummy Composite.');


							return true;

						}

					} else {

						let invalid_includes = this._includes.filter(function(id, i) {
							return includes[i] === null;
						});

						if (invalid_includes.length > 0) {

							for (let i = 0, il = invalid_includes.length; i < il; i++) {
								let tmp = invalid_includes[i];
								console.error('lychee.Definition ("' + id + '"): Invalid Inclusion of "' + tmp + '".');
							}

						}


						let invalid_requires = this._requires.filter(function(id, r) {
							return requires[r] === null;
						});

						if (invalid_requires.length > 0) {

							for (let i = 0, il = invalid_requires.length; i < il; i++) {
								let tmp = invalid_requires[i];
								console.error('lychee.Definition ("' + id + '"): Invalid Requirement of "' + tmp + '".');
							}

						}

					}

				}


				return false;

			}


			return true;

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

						let is_definition = definition.includes('.');
						if (is_definition === true) {

							if (this._includes.includes(definition) === false) {
								this._includes.push(definition);
							}

						}

					} else {
						console.warn('lychee.Definition ("' + this.id + '"): Invalid Inclusion #' + d + '.');
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

						let is_definition = definition.includes('.');
						if (is_definition === true) {

							if (this._requires.includes(definition) === false) {
								this._requires.push(definition);
							}

						}

					} else {
						console.warn('lychee.Definition ("' + this.id + '"): Invalid Requirement #' + d + '.');
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

				for (let tag in map) {

					let val = map[tag];
					if (typeof val === 'string') {
						this._tags[tag] = val;
					} else {
						console.warn('lychee.Definition ("' + this.id + '"): Invalid Tag "' + tag + '".');
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

	let   _id      = 0;
	const _console = global.console;
	const _lychee  = global.lychee;



	/*
	 * EVENTS
	 */

	const _build_loop = function(cache) {

		let load        = cache.load;
		let required_by = cache.required_by;
		let trace       = cache.trace;


		for (let l = 0, ll = load.length; l < ll; l++) {

			let identifier = load[l];
			let definition = this.definitions[identifier] || null;
			if (definition !== null) {

				if (trace.indexOf(identifier) === -1) {
					trace.push(identifier);
				}

				required_by.splice(l, 1);
				load.splice(l, 1);

				ll--;
				l--;

			}

		}


		for (let t = 0, tl = trace.length; t < tl; t++) {

			let identifier = trace[t];
			let definition = this.definitions[identifier] || null;
			if (definition !== null) {

				let dependencies = _resolve_dependencies.call(this, definition);
				if (dependencies.length > 0) {

					for (let d = 0, dl = dependencies.length; d < dl; d++) {

						let dependency = dependencies[d];
						if (load.indexOf(dependency) === -1 && trace.indexOf(dependency) === -1) {

							required_by.push(identifier);

							this.load(dependency);
							load.push(dependency);

						}

					}

				} else {

					definition.export(this.global);

					trace.splice(t, 1);
					tl--;
					t--;

				}

			}

		}


		if (load.length === 0 && trace.length === 0) {

			cache.active = false;

		} else {

			if (Date.now() > cache.timeout) {
				cache.active = false;
			}

		}

	};

	const _on_build_success = function(cache, callback) {

		if (this.debug === true) {
			this.global.console.info('lychee.Environment ("' + this.id + '"): BUILD END (' + (cache.end - cache.start) + 'ms).');
		}


		try {
			callback.call(this.global, this.global);
		} catch (err) {
			_lychee.Debugger.report(this, err, null);
		}

	};

	const _on_build_timeout = function(cache, callback) {

		if (this.debug === true) {
			this.global.console.warn('lychee.Environment ("' + this.id + '"): BUILD TIMEOUT (' + (cache.end - cache.start) + 'ms).');
		}


		// XXX: Always show Dependency Errors
		if (cache.load.length > 0) {

			this.global.console.error('lychee.Environment ("' + this.id + '"): Invalid Dependencies\n' + cache.load.map(function(value, index) {

				let other = cache.required_by[index] || null;
				if (other === null) {
					other = 'lychee.environment';
				}

				return '\t - ' + value + ' (required by ' + other + ')';

			}).join('\n') + '.');

		}


		try {
			callback.call(this.global, null);
		} catch (err) {
			_lychee.Debugger.report(this, err, null);
		}

	};



	/*
	 * HELPERS
	 */

	const _inject_features = function(source, features) {

		let that = this;

		Object.keys(features).forEach(function(key) {

			let type = features[key];
			if (/boolean|number|string|function/g.test(type)) {

				that[key] = source[key];

			} else if (typeof type === 'object') {

				if (typeof source[key] === 'object') {

					that[key] = source[key];

					_inject_features.call(that[key], source[key], type);

				}

			}

		});

	};

	const _validate_definition = function(definition) {

		if (definition instanceof _lychee.Definition) {

			let check = definition.check(this.tags);
			let type  = this.type;


			if (check.features !== null) {

				if (type === 'source' || type === 'export') {
					this.__features = _lychee.assignunlink(this.__features, check.features);
				}

				let sandbox = this.sandbox;
				if (sandbox === true) {
					_inject_features.call(this.global, global, check.features);
				}

			}


			if (type === 'build') {

				if (check.tagged === false) {
					let info = Object.keys(this.tags).length > 0 ? (' (missing tags(' + JSON.stringify(this.tags) + ')).') : '.';
					this.global.console.warn('lychee.Environment ("' + this.id + '"): Untagged Definition "' + definition.id + '"' + info);
				}

				return check.tagged;

			} else if (type === 'export') {

				if (check.tagged === false) {
					let info = Object.keys(this.tags).length > 0 ? (' (missing tags(' + JSON.stringify(this.tags) + ')).') : '.';
					this.global.console.warn('lychee.Environment ("' + this.id + '"): Untagged Definition "' + definition.id + '"' + info);
				}

				return check.tagged;

			} else if (type === 'source') {

				if (check.supported === false) {

					let platforms = this.tags.platform || [];
					if (platforms.length > 0) {

						let info = platforms.map(function(val) {
							return 'lychee.FEATURES[\'' + val + '\']';
						}).join(' or ');
						this.global.console.warn('lychee.Environment ("' + this.id + '"): Unsupported Definition "' + definition.id + '" (missing ' + info + ' entry).');

					}

				}

				if (check.tagged === false) {
					let info = Object.keys(this.tags).length > 0 ? (' (missing tags(' + JSON.stringify(this.tags) + ')).') : '.';
					this.global.console.warn('lychee.Environment ("' + this.id + '"): Untagged Definition "' + definition.id + '"' + info);
				}

				return check.supported && check.tagged;

			}

		}


		return false;

	};

	const _resolve = function(identifier) {

		let pointer = this;
		let path    = identifier.split('.');

		for (let p = 0, pl = path.length; p < pl; p++) {

			let name = path[p];

			if (pointer[name] !== undefined) {
				pointer = pointer[name];
			} else if (pointer[name] === undefined) {
				pointer = null;
				break;
			}

		}

		return pointer;

	};

	const _resolve_dependencies = function(definition) {

		let dependencies = [];

		if (definition instanceof _lychee.Definition) {

			for (let i = 0, il = definition._includes.length; i < il; i++) {

				let inc   = definition._includes[i];
				let check = _resolve.call(this.global, inc);
				if (check === null) {
					dependencies.push(inc);
				}

			}

			for (let r = 0, rl = definition._requires.length; r < rl; r++) {

				let req   = definition._requires[r];
				let check = _resolve.call(this.global, req);
				if (check === null) {
					dependencies.push(req);
				}

			}

		}

		return dependencies;

	};



	/*
	 * STRUCTS
	 */

	const _Sandbox = function(settings, platforms) {

		settings  = settings instanceof Object ? settings  : null;
		platforms = platforms instanceof Array ? platforms : [];


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


			if (str.startsWith('\n(E)\t')) {
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
		this.lychee.debug        = global.lychee.debug;
		this.lychee.environment  = null;
		this.lychee.simulation   = null;
		this.lychee.ENVIRONMENTS = global.lychee.ENVIRONMENTS;
		this.lychee.FEATURES     = global.lychee.FEATURES;
		this.lychee.FILENAME     = global.lychee.FILENAME;
		this.lychee.PLATFORMS    = global.lychee.PLATFORMS;
		this.lychee.SIMULATIONS  = global.lychee.SIMULATIONS;
		this.lychee.ROOT         = {};
		this.lychee.ROOT.lychee  = global.lychee.ROOT.lychee;
		this.lychee.ROOT.project = global.lychee.ROOT.project;
		this.lychee.VERSION      = global.lychee.VERSION;

		[
			// core/lychee.js
			'assignsafe',
			'assignunlink',
			'blobof',
			'diff',
			'enumof',
			'interfaceof',
			'deserialize',
			'serialize',

			'assimilate',
			'define',
			'import',
			'init',
			'inject',
			'pkg',
			'setEnvironment',
			'setSimulation',

			// core/<Identifier>.js
			'Asset',
			'Debugger',
			'Definition',
			'Environment',
			'Package',
			'Simulation',
			'Specification'

		].forEach(function(identifier) {

			this.lychee[identifier] = _lychee[identifier];

		}.bind(this));


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
		 * GLOBAL INJECTION
		 */

		if (settings instanceof Object) {

			Object.keys(settings).forEach(function(key) {

				let instance = _lychee.deserialize(settings[key]);
				if (instance !== null) {
					this[key] = instance;
				}

			}.bind(this));

		}

		/*
		 * FEATURE INJECTION
		 */

		if (platforms.length > 0) {

			platforms.reverse().forEach(function(platform) {

				let features = _lychee.FEATURES[platform] || null;
				if (features instanceof Object) {

					for (let gid in features) {

						if (this[gid] === undefined) {

							let reference = global[gid];
							if (reference instanceof Object) {

								this[gid] = reference;

							} else if (typeof reference === 'function') {

								this[gid] = function() {
									return global[gid].apply(global, arguments);
								};

							} else {

								this[gid] = reference;

							}

						}

					}

				}

			}.bind(this));

		}

	};

	_Sandbox.prototype = {

		displayName: '_Sandbox',

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
				settings[key] = _lychee.serialize(this[key]);
			}.bind(this));


			blob.lychee          = {};
			blob.lychee.debug    = this.lychee.debug;
			blob.lychee.FILENAME = this.lychee.FILENAME;
			blob.lychee.VERSION  = this.lychee.VERSION;
			blob.lychee.ROOT     = this.lychee.ROOT;


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

	const Composite = function(data) {

		let settings = Object.assign({}, data);


		this.id          = 'lychee-Environment-' + _id++;
		this.debug       = true;
		this.definitions = {};
		this.global      = global !== undefined ? global : {};
		this.packages    = {};
		this.sandbox     = false;
		this.tags        = {};
		this.target      = 'app.Main';
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
			trace:         [],
			required_by:   []
		};
		this.__features = {};


		// Alternative API for lychee.pkg

		if (settings.packages instanceof Array) {

			this.global.console.error('lychee.Environment ("' + this.id + '"): Invalid Packages.');
			delete settings.packages;

		} else if (settings.packages instanceof Object) {

			for (let pid in settings.packages) {

				let value = settings.packages[pid];
				if (typeof value === 'string') {

					settings.packages[pid] = new _lychee.Package({
						id:          pid,
						url:         value,
						environment: this
					});

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

		// Needs this.type to be ready
		this.setTarget(settings.target);


		settings = null;

	};


	Composite.prototype = {

		/*
		 * ENTITY API
		 */

		deserialize: function(blob) {

			if (blob.definitions instanceof Object) {

				for (let did in blob.definitions) {
					this.definitions[did] = _lychee.deserialize(blob.definitions[did]);
				}

			}

			let features = _lychee.deserialize(blob.features);
			if (features !== null) {
				this.__features = features;
			}

			if (blob.global instanceof Object) {

				this.global = new _Sandbox(blob.global.arguments[0], this.tags.platform || null);

				if (blob.global.blob !== null) {
					this.global.deserialize(blob.global.blob);
				}

			}

		},

		serialize: function() {

			let settings = {};
			let blob     = {};


			if (this.id !== '')             settings.id      = this.id;
			if (this.debug !== true)        settings.debug   = this.debug;
			if (this.sandbox !== false)     settings.sandbox = this.sandbox;
			if (this.timeout !== 10000)     settings.timeout = this.timeout;
			if (this.target !== 'app.Main') settings.target  = this.target;
			if (this.type !== 'source')     settings.type    = this.type;


			if (Object.keys(this.packages).length > 0) {

				settings.packages = {};

				for (let pid in this.packages) {
					settings.packages[pid] = this.packages[pid].url;
				}

			}

			if (Object.keys(this.tags).length > 0) {

				settings.tags = {};

				for (let tagid in this.tags) {
					settings.tags[tagid] = this.tags[tagid];
				}

			}


			if (Object.keys(this.definitions).length > 0) {

				blob.definitions = {};

				for (let did in this.definitions) {
					blob.definitions[did] = _lychee.serialize(this.definitions[did]);
				}

			}

			if (Object.keys(this.__features).length > 0) blob.features = _lychee.serialize(this.__features);

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

					let pkg = this.packages[pkg_id] || null;
					if (pkg !== null && pkg.config !== null) {

						let result = pkg.load(def_id, this.tags);
						if (result === true) {

							if (this.debug === true) {
								this.global.console.log('lychee.Environment ("' + this.id + '"): Loading "' + identifier + '" from Package "' + pkg.id + '".');
							}

						}


						return result;

					}

				}

			}


			return false;

		},

		define: function(definition, inject) {

			definition = definition instanceof _lychee.Definition ? definition : null;
			inject     = inject === true;


			if (definition !== null) {

				let url = definition.url || null;
				if (url !== null && inject === false) {

					let assimilation = true;
					let new_pkg_id   = null;
					let old_pkg_id   = definition.id.split('.')[0];
					let packages     = this.packages;

					for (let pid in packages) {

						let pkg = packages[pid];

						if (url.startsWith(pkg.root)) {
							new_pkg_id = pkg.id;
						}

						if (pid === old_pkg_id || pid === new_pkg_id) {
							assimilation = false;
						}

					}


					if (assimilation === true) {

						if (this.debug === true) {
							this.global.console.log('lychee.Environment ("' + this.id + '"): Assimilating Definition "' + definition.id + '".');
						}


						this.__cache.assimilations.push(definition.id);

					} else if (new_pkg_id !== null && new_pkg_id !== old_pkg_id) {

						if (this.debug === true) {
							this.global.console.log('lychee.Environment ("' + this.id + '"): Injecting Definition "' + definition.id + '" into Package "' + new_pkg_id + '".');
						}


						definition.id = new_pkg_id + '.' + definition.id.split('.').slice(1).join('.');

						for (let i = 0, il = definition._includes.length; i < il; i++) {

							let inc = definition._includes[i];
							if (inc.startsWith(old_pkg_id)) {
								definition._includes[i] = new_pkg_id + inc.substr(old_pkg_id.length);
							}

						}

						for (let r = 0, rl = definition._requires.length; r < rl; r++) {

							let req = definition._requires[r];
							if (req.startsWith(old_pkg_id)) {
								definition._requires[r] = new_pkg_id + req.substr(old_pkg_id.length);
							}

						}

					}

				} else {

					// XXX: Direct injection has no auto-mapping

				}


				if (_validate_definition.call(this, definition) === true) {

					if (this.debug === true) {
						let info = Object.keys(definition._tags).length > 0 ? (' (' + JSON.stringify(definition._tags) + ')') : '.';
						this.global.console.log('lychee.Environment ("' + this.id + '"): Mapping Definition "' + definition.id + '"' + info);
					}

					this.definitions[definition.id] = definition;


					return true;

				}

			}


			let info = Object.keys(definition._tags).length > 0 ? (' (' + JSON.stringify(definition._tags) + ').') : '.';
			this.global.console.error('lychee.Environment ("' + this.id + '"): Invalid Definition "' + definition.id + '"' + info);


			return false;

		},

		init: function(callback) {

			callback = callback instanceof Function ? callback : function() {};


			if (this.debug === true) {
				this.global.lychee.ENVIRONMENTS[this.id] = this;
			}


			let cache  = this.__cache;
			let target = this.target;

			if (target !== null && cache.active === false) {

				let result = this.load(target);
				if (result === true) {

					if (this.debug === true) {
						this.global.console.info('lychee.Environment ("' + this.id + '"): BUILD START ("' + target + '").');
					}


					cache.start       = Date.now();
					cache.timeout     = Date.now() + this.timeout;
					cache.load        = [ target ];
					cache.trace       = [];
					cache.required_by = [];
					cache.active      = true;


					let interval = setInterval(function() {

						let cache = this.__cache;
						if (cache.active === true) {

							_build_loop.call(this, cache);

						} else if (cache.active === false) {

							if (interval !== null) {
								clearInterval(interval);
								interval = null;
							}


							let assimilations = cache.assimilations;
							if (assimilations.length > 0) {

								for (let a = 0, al = assimilations.length; a < al; a++) {

									let identifier = assimilations[a];
									let definition = this.definitions[identifier] || null;
									if (definition !== null) {
										definition.export(this.global);
									}

								}

							}


							cache.end = Date.now();


							if (cache.end > cache.timeout) {
								_on_build_timeout.call(this, cache, callback);
							} else {
								_on_build_success.call(this, cache, callback);
							}

						}

					}.bind(this), (1000 / 60) | 0);

				} else {

					cache.retries++;


					if (cache.retries < 10) {

						if (this.debug === true) {
							this.global.console.warn('lychee.Environment ("' + this.id + '"): Unready Package "' + target + '" (retrying in 100ms ...).');
						}

						setTimeout(function() {
							this.init(callback);
						}.bind(this), 100);

					} else {

						this.global.console.error('lychee.Environment ("' + this.id + '"): Invalid Dependencies\n\t - ' + target + ' (target).');


						try {
							callback.call(this.global, null);
						} catch (err) {
							_lychee.Debugger.report(this, err, null);
						}

					}

				}


				return true;

			}


			try {
				callback.call(this.global, null);
			} catch (err) {
				_lychee.Debugger.report(this, err, null);
			}


			return false;

		},

		resolve: function(path) {

			path = typeof path === 'string' ? path : '';


			let proto = path.split(':')[0] || '';
			if (/^http|https/g.test(proto) === false) {

				if (path.startsWith(_lychee.ROOT.lychee) === false) {

					if (path.startsWith('/')) {
						path = _lychee.ROOT.lychee + path;
					} else {
						path = _lychee.ROOT.project + '/' + path;
					}

				}

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
					if (definition instanceof _lychee.Definition) {
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

			packages = packages instanceof Object ? packages : null;


			if (packages !== null) {

				for (let pid in this.packages) {

					if (pid !== 'lychee') {
						this.packages[pid].setEnvironment(null);
						delete this.packages[pid];
					}

				}


				for (let pid in packages) {

					let pkg = packages[pid];
					if (pkg instanceof _lychee.Package) {

						if (this.debug === true) {
							this.global.console.log('lychee.Environment ("' + this.id + '"): Adding Package "' + pkg.id + '".');
						}

						pkg.setEnvironment(this);
						this.packages[pid] = pkg;

					}

				}


				let type = this.type;
				if (/^(export|source)$/g.test(type)) {

					let lychee_pkg = this.packages['lychee'] || null;
					if (lychee_pkg === null) {

						lychee_pkg = new _lychee.Package({
							id:          'lychee',
							url:         '/libraries/lychee/lychee.pkg',
							environment: this
						});

						if (this.debug === true) {
							this.global.console.log('lychee.Environment ("' + this.id + '"): Injecting Package "lychee".');
						}

						this.packages['lychee'] = lychee_pkg;

					}

				}

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

						this.global = new _Sandbox(null, this.tags.platform || null);
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

			timeout = typeof timeout === 'number' ? (timeout | 0) : null;


			if (timeout !== null) {

				this.timeout = timeout;

				return true;

			}


			return false;

		},

		setTarget: function(identifier) {

			identifier = typeof identifier === 'string' ? identifier : null;


			if (identifier !== null) {

				let type = this.type;
				if (type === 'build') {

					this.target = identifier;

					return true;

				} else {

					let pid = identifier.split('.')[0];
					let pkg = this.packages[pid] || null;
					if (pkg !== null) {

						this.target = identifier;

						return true;

					}

				}

			}


			return false;

		},

		setType: function(type) {

			type = typeof type === 'string' ? type : null;


			if (type !== null) {

				if (/^(build|export|source)$/g.test(type)) {

					this.type = type;


					if (type === 'export') {
						type = 'source';
					}


					for (let pid in this.packages) {
						this.packages[pid].setType(type);
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

		if (type === 'build') {
			root += '/build';
		} else if (type === 'review') {
			root += '/review';
		} else if (type === 'source') {
			root += '/source';
		}

		return root;

	};

	const _resolve_path = function(candidate) {

		let config = this.config;
		let path   = typeof candidate === 'string' ? candidate.split('/') : null;

		if (config !== null && path !== null) {

			let pointer = config.buffer[this.type].files || null;
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

		let config      = this.config;
		let attachments = {};
		let path        = candidate.split('/');

		if (config !== null && path.length > 0) {

			let pointer = config.buffer.source.files || null;
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

					let definition_path = _resolve_root.call(this) + '/' + path.join('/');

					for (let po = 0, pol = pointer.length; po < pol; po++) {

						let type = pointer[po];
						if (type !== 'js') {
							attachments[type] = definition_path + '.' + type;
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

			if (tags[tag] instanceof Array) {

				return tags[tag].map(function(value) {
					return _resolve_tag.call(that, tag, value) + '/' + candidatepath;
				}).filter(function(path) {
					return _resolve_path.call(that, path);
				});

			}

			return [];

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


		let config = this.config;

		if (config !== null && tag !== null && value !== null) {

			let pointer = config.buffer[this.type].tags || null;
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
				candidates:   Array.from(candidates),
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

				let environment = that.environment || null;
				if (environment !== null) {

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


					// If code runs through here, candidate was invalid
					delete that.environment.definitions[identifier];

				}

			}


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

	const Composite = function(data) {

		let settings = Object.assign({}, data);


		this.id          = 'app';
		this.config      = null;
		this.environment = null;
		this.root        = null;
		this.url         = null;
		this.type        = 'source';

		this.__blacklist = {};
		this.__requests  = {};


		this.setId(settings.id);
		this.setUrl(settings.url);

		this.setEnvironment(settings.environment);
		this.setType(settings.type);

		settings = null;

	};


	Composite.prototype = {

		/*
		 * ENTITY API
		 */

		deserialize: function(blob) {

			if (blob.config instanceof Object) {
				this.config = lychee.deserialize(blob.config);
			}

		},

		serialize: function() {

			let blob     = {};
			let settings = {};


			if (this.id !== '')         settings.id   = this.id;
			if (this.type !== 'source') settings.type = this.type;
			if (this.url !== '')        settings.url  = this.url;


			if (this.config !== null) {
				blob.config = lychee.serialize(this.config);
			}


			return {
				'constructor': 'lychee.Package',
				'arguments':   [ settings ],
				'blob':        Object.keys(blob).length > 0 ? blob : null
			};

		},



		/*
		 * CUSTOM API
		 */

		load: function(id, tags) {

			id   = typeof id === 'string' ? id   : null;
			tags = tags instanceof Object ? tags : null;


			let config = this.config;

			if (id !== null && config !== null) {

				let request = this.__requests[id] || null;
				if (request === null) {

					let candidates = _resolve_candidates.call(this, id, tags);
					if (candidates.length > 0) {

						_load_candidate.call(this, id, candidates);

						return true;

					} else {

						if (tags !== null) {
							let info = Object.keys(tags).length > 0 ? (' (' + JSON.stringify(tags) + ')') : '.';
							console.error('lychee.Package ("' + this.id + '"): Invalid Definition "' + id + '"' + info);
						} else {
							console.error('lychee.Package ("' + this.id + '"): Invalid Definition "' + id + '"');
						}


						return false;

					}

				} else {

					return true;

				}

			}


			return false;

		},

		resolve: function(id, tags) {

			id   = typeof id === 'string' ? id   : null;
			tags = tags instanceof Object ? tags : null;


			let config   = this.config;
			let filtered = [];

			if (id !== null && config !== null) {

				let candidates = _resolve_candidates.call(this, id, tags);
				if (candidates.length > 0) {

					for (let c = 0, cl = candidates.length; c < cl; c++) {
						filtered.push(candidates[c]);
					}

				}

			}

			return filtered;

		},

		setId: function(identifier) {

			identifier = typeof identifier === 'string' ? identifier : null;


			if (identifier !== null && /^([a-z]+)$/g.test(identifier)) {

				this.id = identifier;

				return true;

			}


			return false;

		},

		setUrl: function(url) {

			url = typeof url === 'string' ? url : null;


			if (url !== null && url.endsWith('/lychee.pkg')) {

				this.config = null;
				this.root   = url.split('/').slice(0, -1).join('/');
				this.url    = url;


				let that   = this;
				let config = new Config(url);

				config.onload = function(result) {

					let buffer = this.buffer || null;
					if (
						buffer !== null
						&& buffer instanceof Object
						&& buffer.build instanceof Object
						&& buffer.review instanceof Object
						&& buffer.source instanceof Object
					) {

						console.info('lychee.Package ("' + that.id + '"): Config "' + this.url + '" ready.');

						that.config = this;

					} else {

						console.error('lychee.Package ("' + that.id + '"): Config "' + this.url + '" corrupt.');

					}

				};

				config.load();


				return true;

			}


			return false;

		},

		setEnvironment: function(environment) {

			environment = environment instanceof lychee.Environment ? environment : null;


			if (environment !== null) {

				this.environment = environment;

				return true;

			} else {

				this.environment = null;

			}


			return false;

		},

		setType: function(type) {

			type = typeof type === 'string' ? type : null;


			if (type !== null) {

				if (/^(build|review|source)$/g.test(type)) {

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


lychee.Simulation = typeof lychee.Simulation !== 'undefined' ? lychee.Simulation : (function(global) {

	let   _id      = 0;
	const _console = global.console;
	const _lychee  = global.lychee;



	/*
	 * HELPERS
	 */

	const _get_debug = function() {

		let debug       = _lychee.debug;
		let environment = this.environment;
		if (environment !== null) {
			debug = environment.debug;
		}

		return debug;

	};

	const _get_console = function() {

		let console     = _console;
		let environment = this.environment;
		if (environment !== null) {
			console = environment.global.console;
		}

		return console;

	};

	const _get_global = function() {

		let pointer     = global;
		let environment = this.environment;
		if (environment !== null) {
			pointer = environment.global;
		}

		return pointer;

	};

	const _build_loop = function(cache) {

		let load    = cache.load;
		let trace   = cache.trace;
		let timeout = this.timeout;


		for (let l = 0, ll = load.length; l < ll; l++) {

			let identifier    = load[l];
			let specification = this.specifications[identifier] || null;
			if (specification !== null) {

				if (trace.indexOf(identifier) === -1) {
					trace.push(identifier);
				}

				load.splice(l, 1);
				ll--;
				l--;

			}

		}


		for (let t = 0, tl = trace.length; t < tl; t++) {

			let identifier = trace[t];
			let specification = this.specifications[identifier] || null;
			if (specification !== null) {

				let dependencies = _resolve_dependencies.call(this, specification);
				if (dependencies.length > 0) {

					for (let d = 0, dl = dependencies.length; d < dl; d++) {

						let dependency = dependencies[d];
						if (load.indexOf(dependency) === -1 && trace.indexOf(dependency) === -1) {

							this.load(dependency);
							load.push(dependency);

						}

					}

				} else {

					let sandbox = new _Sandbox(identifier, timeout);
					specification.export(sandbox);
					this.sandboxes[identifier] = sandbox;

					trace.splice(t, 1);
					tl--;
					t--;

				}

			}

		}


		if (load.length === 0 && trace.length === 0) {

			cache.active = false;

		} else {

			if (Date.now() > cache.timeout) {
				cache.active = false;
			}

		}

	};

	const _on_build_success = function(cache, callback) {

		let console     = _get_console.call(this);
		let debug       = _get_debug.call(this);
		let environment = this.environment;
		let sandboxes   = this.sandboxes;


		if (debug === true) {
			console.info('lychee.Simulation ("' + this.id + '"): BUILD END (' + (cache.end - cache.start) + 'ms).');
		}


		try {
			callback.call(environment.global, sandboxes);
		} catch (err) {
			_lychee.Debugger.report(environment, err, null);
		}

	};

	const _on_build_timeout = function(cache, callback) {

		let console     = _get_console.call(this);
		let debug       = _get_debug.call(this);
		let environment = this.environment;


		if (debug === true) {
			console.warn('lychee.Simulation ("' + this.id + '"): BUILD TIMEOUT (' + (cache.end - cache.start) + 'ms).');
		}


		if (cache.load.length > 0) {

			console.error('lychee.Simulation ("' + this.id + '"): Invalid Dependencies\n' + cache.load.map(function(value) {
				return '\t - ' + value;
			}).join('\n') + '.');

		}


		try {
			callback.call(environment.global, null);
		} catch (err) {
			_lychee.Debugger.report(environment, err, null);
		}

	};

	const _resolve = function(identifier) {

		let pointer = this;
		let path    = identifier.split('.');

		for (let p = 0, pl = path.length; p < pl; p++) {

			let name = path[p];

			if (pointer[name] !== undefined) {
				pointer = pointer[name];
			} else if (pointer === undefined) {
				pointer = null;
				break;
			}

		}

		return pointer;

	};

	const _resolve_dependencies = function(specification) {

		let dependencies = [];
		let sandboxes    = this.sandboxes;

		if (specification instanceof _lychee.Specification) {

			for (let r = 0, rl = specification._requires.length; r < rl; r++) {

				let req   = specification._requires[r];
				let check = sandboxes[req] || null;
				if (check === null) {
					dependencies.push(req);
				}

			}

		}


		return dependencies;

	};



	/*
	 * STRUCTS
	 */

	const _assert = function(a, b) {

		let result = lychee.diff(a, b);
		if (result === false) {
			this.results.ok++;
		}

		this.results.all++;

	};

	const _expect = function(assert, callback) {

		this._expect++;


		let that = this;

		callback(function(a, b) {
			that._expect--;
			assert(a, b);
		});

	};

	const _Sandbox = function(identifier, timeout) {

		this._IDENTIFIER = identifier || null;
		this._INSTANCE   = null;
		this._timeout    = timeout;

		this.blob       = {};
		this.settings   = {};
		this.properties = {};
		this.enums      = {};
		this.events     = {};
		this.methods    = {};

	};

	_Sandbox.prototype = {

		/*
		 * ENTITY API
		 */

		deserialize: function(blob) {

			if (blob.instance instanceof Object) {
				this._INSTANCE = lychee.deserialize(blob.instance);
			}

			if (blob.settings instanceof Object) {
				this.settings = lychee.deserialize(blob.settings);
			}

			if (blob.properties instanceof Object) {

				for (let p in blob.properties) {
					this.properties[p] = lychee.deserialize(blob.properties[p]);
				}

			}

			if (blob.enums instanceof Object) {

				for (let e in blob.enums) {
					this.enums[e] = lychee.deserialize(blob.enums[e]);
				}

			}

			if (blob.events instanceof Object) {

				for (let e in blob.events) {
					this.events[e] = lychee.deserialize(blob.events[e]);
				}

			}

			if (blob.methods instanceof Object) {

				for (let m in blob.methods) {
					this.methods[m] = lychee.deserialize(blob.methods[m]);
				}

			}

		},

		serialize: function() {

			let blob = {};


			if (Object.keys(this.settings).length > 0) {
				blob.settings = lychee.serialize(this.settings);
			}

			if (Object.keys(this.properties).length > 0) {

				blob.properties = {};

				for (let p in this.properties) {
					blob.properties[p] = lychee.serialize(this.properties[p]);
				}

			}

			if (Object.keys(this.enums).length > 0) {

				blob.enums = {};

				for (let e in this.enums) {
					blob.enums[e] = lychee.serialize(this.enums[e]);
				}

			}

			if (Object.keys(this.events).length > 0) {

				blob.events = {};

				for (let e in this.events) {
					blob.events[e] = lychee.serialize(this.events[e]);
				}

			}

			if (Object.keys(this.methods).length > 0) {

				blob.methods = {};

				for (let m in this.methods) {
					blob.methods[m] = lychee.serialize(this.methods[m]);
				}

			}


			if (this._INSTANCE !== null) {
				blob.instance = lychee.serialize(this._INSTANCE);
			}


			return {
				'constructor': '_Sandbox',
				'arguments':   [ this._IDENTIFIER ],
				'blob':        Object.keys(blob).length > 0 ? blob : null
			};

		},



		/*
		 * CUSTOM API
		 */

		evaluate: function(callback) {

			callback = callback instanceof Function ? callback : null;


			if (callback !== null) {

				let statistics = {
					properties: {},
					enums:      {},
					events:     {},
					methods:    {}
				};


				if (this._IDENTIFIER !== null) {

					let Definition = lychee.import(this._IDENTIFIER);
					if (Definition !== null) {

						if (Definition.prototype instanceof Object) {

							this._INSTANCE = new Definition(this.settings);

							if (
								Object.keys(this.blob).length > 0
								&& typeof this._INSTANCE.deserialize === 'function'
							) {
								this._INSTANCE.deserialize(this.blob);
							}

						} else {
							this._INSTANCE = Definition;
						}

					}


					if (this._INSTANCE !== null) {

						for (let id in this.properties) {

							statistics.properties[id] = {
								_expect: 0,
								results: {
									ok:  0,
									all: 0
								}
							};

							let assert = _assert.bind(statistics.properties[id]);
							let expect = _expect.bind(statistics.properties[id], assert);

							this.properties[id].call(this._INSTANCE, assert, expect);

						}

						for (let id in this.enums) {

							statistics.enums[id] = {
								_expect: 0,
								results: {
									ok:  0,
									all: 0
								}
							};

							let assert = _assert.bind(statistics.enums[id]);
							let expect = _expect.bind(statistics.enums[id], assert);

							this.enums[id].call(this._INSTANCE, assert, expect);

						}

						for (let id in this.events) {

							statistics.events[id] = {
								_expect: 0,
								results: {
									ok:  0,
									all: 0
								}
							};

							let assert = _assert.bind(statistics.events[id]);
							let expect = _expect.bind(statistics.events[id], assert);

							this.events[id].call(this._INSTANCE, assert, expect);

						}

						for (let id in this.methods) {

							statistics.methods[id] = {
								_expect: 0,
								results: {
									ok:  0,
									all: 0
								}
							};

							let assert = _assert.bind(statistics.methods[id]);
							let expect = _expect.bind(statistics.methods[id], assert);

							this.methods[id].call(this._INSTANCE, assert, expect);

						}


						let timeout  = Date.now() + this._timeout;
						let interval = setInterval(function() {

							if (Date.now() > timeout) {

								clearInterval(interval);
								interval = null;

								callback(statistics);

							} else {

								let stop = true;

								for (let type in statistics) {

									for (let id in statistics[type]) {

										if (statistics[type][id]._expect > 0) {
											stop = false;
											break;
										}

									}

								}

								if (stop === true) {

									clearInterval(interval);
									interval = null;

									callback(statistics);

								}

							}

						}.bind(this), 500);

					} else {

						if (callback !== null) {
							callback(null);
						}

					}

				} else {

					if (callback !== null) {
						callback(null);
					}

				}

			}

		},

		setBlob: function(blob) {

			blob = blob instanceof Object ? blob : null;


			if (blob !== null) {

				this.blob = blob;

				return true;

			}


			return false;

		},

		setSettings: function(settings) {

			settings = settings instanceof Object ? settings : null;


			if (settings !== null) {

				this.settings = settings;

				return true;

			}


			return false;

		},

		setEnum: function(name, callback) {

			name     = typeof name === 'string'     ? name     : null;
			callback = callback instanceof Function ? callback : null;


			if (name !== null && callback !== null) {

				this.enums[name] = callback;

				return true;

			}


			return false;

		},

		setEvent: function(name, callback) {

			name     = typeof name === 'string'     ? name     : null;
			callback = callback instanceof Function ? callback : null;


			if (name !== null && callback !== null) {

				this.events[name] = callback;

				return true;

			}


			return false;

		},

		setMethod: function(name, callback) {

			name     = typeof name === 'string'     ? name     : null;
			callback = callback instanceof Function ? callback : null;


			if (name !== null && callback !== null) {

				this.methods[name] = callback;

				return true;

			}


			return false;

		},

		setProperty: function(name, callback) {

			name     = typeof name === 'string'     ? name     : null;
			callback = callback instanceof Function ? callback : null;


			if (name !== null && callback !== null) {

				this.properties[name] = callback;

				return true;

			}


			return false;

		}

	};



	/*
	 * IMPLEMENTATION
	 */

	const Composite = function(data) {

		let settings = Object.assign({}, data);


		this.id             = 'lychee-Simulation-' + _id++;
		this.environment    = null;
		this.specifications = {};
		this.target         = 'app.Main';
		this.timeout        = 10000;

		this.sandboxes  = {};
		this.__cache    = {
			active:        false,
			assimilations: [],
			start:         0,
			end:           0,
			retries:       0,
			timeout:       0,
			load:          [],
			trace:         []
		};
		this.__packages = {};


		this.setId(settings.id);
		this.setSpecifications(settings.specifications);
		this.setEnvironment(settings.environment);

		this.setTarget(settings.target);
		this.setTimeout(settings.timeout);


		settings = null;

	};


	Composite.prototype = {

		deserialize: function(blob) {

			if (blob.specifications instanceof Object) {

				for (let id in blob.specifications) {
					this.specifications[id] = lychee.deserialize(blob.specifications[id]);
				}

			}

			if (blob.environment instanceof Object) {
				this.setEnvironment(lychee.deserialize(blob.environment));
			}

		},

		serialize: function() {

			let settings = {};
			let blob     = {};


			if (this.id !== '')             settings.id      = this.id;
			if (this.target !== 'app.Main') settings.target  = this.target;
			if (this.timeout !== 10000)     settings.timeout = this.timeout;


			if (Object.keys(this.specifications).length > 0) {

				blob.specifications = {};

				for (let sid in this.specifications) {
					blob.specifications[sid] = lychee.serialize(this.specifications[sid]);
				}

			}


			return {
				'constructor': 'lychee.Simulation',
				'arguments':   [ settings ],
				'blob':        Object.keys(blob).length > 0 ? blob : null
			};

		},

		load: function(identifier) {

			identifier = typeof identifier === 'string' ? identifier : null;


			if (identifier !== null) {

				let tmp    = identifier.split('.');
				let pkg_id = tmp[0];
				let def_id = tmp.slice(1).join('.');


				let specification = this.specifications[identifier] || null;
				if (specification !== null) {

					return true;

				} else {

					let pkg = this.__packages[pkg_id] || null;
					if (pkg !== null && pkg.config !== null) {

						let result = pkg.load(def_id);
						if (result === true) {

							let debug = _get_debug.call(this);
							if (debug === true) {
								console.log('lychee.Simulation ("' + this.id + '"): Loading "' + identifier + '" from Package "' + pkg.id + '".');
							}

						}

						return result;

					}

				}

			}


			return false;

		},

		specify: function(specification, inject) {

			specification = specification instanceof lychee.Specification ? specification : null;
			inject        = inject === true;


			let console = _get_console.call(this);
			let debug   = _get_debug.call(this);


			if (specification !== null) {

				let url = specification.url || null;
				if (url !== null && inject === false) {

					let old_pkg_id   = specification.id.split('.')[0];
					let new_pkg_id   = null;
					let assimilation = true;


					let packages = this.__packages;

					for (let pid in packages) {

						let pkg = packages[pid];

						if (url.startsWith(pkg.root)) {
							new_pkg_id = pkg.id;
						}

						if (pid === old_pkg_id || pid === new_pkg_id) {
							assimilation = false;
						}

					}


					if (assimilation === true) {

						if (debug === true) {
							console.log('lychee.Simulation ("' + this.id + '"): Assimilating Specification "' + specification.id + '".');
						}


						this.__cache.assimilations.push(specification.id);

					} else if (new_pkg_id !== null && new_pkg_id !== old_pkg_id) {

						if (debug === true) {
							console.log('lychee.Simulation ("' + this.id + '"): Injecting Specification "' + specification.id + '" into Package "' + new_pkg_id + '".');
						}


						specification.id = new_pkg_id + '.' + specification.id.split('.').slice(1).join('.');

						for (let r = 0, rl = specification._requires.length; r < rl; r++) {

							let req = specification._requires[r];
							if (req.startsWith(old_pkg_id)) {
								specification._requires[r] = new_pkg_id + req.substr(old_pkg_id.length);
							}

						}

					}

				} else {

					// XXX: Direct injection has no auto-mapping

				}


				if (debug === true) {
					console.log('lychee.Simulation ("' + this.id + '"): Mapping Specification "' + specification.id + '".');
				}


				this.specifications[specification.id] = specification;


				return true;

			}


			console.error('lychee.Simulation ("' + this.id + '"): Invalid Specification "' + specification.id + '".');


			return false;

		},

		init: function(callback) {

			callback = callback instanceof Function ? callback : null;


			let cache       = this.__cache;
			let console     = _get_console.call(this);
			let debug       = _get_debug.call(this);
			let environment = this.environment;
			let target      = this.target;


			if (debug === true) {
				global.lychee.SIMULATIONS[this.id] = this;
			}


			if (target !== null && environment !== null && cache.active === false) {

				let result = this.load(target);
				if (result === true) {

					if (debug === true) {
						console.info('lychee.Simulation ("' + this.id + '"): BUILD START ("' + target + '").');
					}


					cache.start   = Date.now();
					cache.timeout = Date.now() + this.timeout;
					cache.load    = [ target ];
					cache.trace   = [];
					cache.active  = true;


					let timeout  = this.timeout;
					let interval = setInterval(function() {

						let cache = this.__cache;
						if (cache.active === true) {

							_build_loop.call(this, cache);

						} else if (cache.active === false) {

							if (interval !== null) {
								clearInterval(interval);
								interval = null;
							}


							let assimilations = cache.assimilations;
							if (assimilations.length > 0) {

								for (let a = 0, al = assimilations.length; a < al; a++) {

									let identifier    = assimilations[a];
									let specification = this.specifications[identifier] || null;
									if (specification !== null) {

										let sandbox = new _Sandbox(identifier, timeout);
										specification.export(sandbox);
										this.sandboxes[identifier] = sandbox;

									}

								}

							}


							cache.end = Date.now();


							if (cache.end > cache.timeout) {
								_on_build_timeout.call(this, cache, callback);
							} else {
								_on_build_success.call(this, cache, callback);
							}

						}

					}.bind(this), (1000 / 60) | 0);

				} else {

					cache.retries++;


					if (cache.retries < 3) {

						if (debug === true) {
							console.warn('lychee.Simulation ("' + this.id + '"): Unready Package "' + target + '" (retrying in 100ms ...).');
						}

						setTimeout(function() {
							this.init(callback);
						}.bind(this), 100);

					} else {

						console.error('lychee.Simulation ("' + this.id + '"): Invalid Dependencies\n\t - ' + target + ' (target).');


						try {
							callback.call(environment.global || null, null);
						} catch (err) {
							_lychee.Debugger.report(environment, err, null);
						}

					}

				}


				return true;

			}


			try {
				callback.call(environment.global || null, null);
			} catch (err) {
				_lychee.Debugger.report(environment, err, null);
			}


			return false;

		},

		setEnvironment: function(environment) {

			environment = environment instanceof lychee.Environment ? environment : null;


			if (environment !== null) {

				this.environment = environment;
				this.__packages  = {};

				for (let pid in environment.packages) {

					let pkg = environment.packages[pid];

					this.__packages[pid] = new lychee.Package({
						id:   pkg.id,
						url:  pkg.url,
						type: 'review'
					});

				}

				return true;

			} else {

				this.environment = null;
				this.__packages  = {};

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

		setSpecifications: function(specifications) {

			specifications = specifications instanceof Object ? specifications : null;


			if (specifications !== null) {

				for (let identifier in specifications) {

					let specification = specifications[identifier];
					if (specification instanceof lychee.Specification) {
						this.specifications[identifier] = specification;
					}

				}


				return true;

			}


			return false;

		},

		setTarget: function(identifier) {

			identifier = typeof identifier === 'string' ? identifier : null;


			if (identifier !== null) {

				let pid = identifier.split('.')[0];
				let pkg = this.__packages[pid] || null;
				if (pkg !== null) {

					this.target = identifier;

					return true;
				}

			}


			return false;

		},

		setTimeout: function(timeout) {

			timeout = typeof timeout === 'number' ? (timeout | 0) : null;


			if (timeout !== null) {

				this.timeout = timeout;

				return true;

			}


			return false;

		}

	};


	return Composite;

})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));


lychee.Specification = typeof lychee.Specification !== 'undefined' ? lychee.Specification : (function(global) {

	const lychee = global.lychee;



	/*
	 * HELPERS
	 */

	const _fuzz_id = function() {

		let found = null;

		if (this.url !== null) {

			let namespace = null;

			for (let pid in lychee.environment.packages) {

				let pkg  = lychee.environment.packages[pid];
				let base = pkg.url.split('/').slice(0, -1).join('/');

				if (this.url.startsWith(base)) {
					namespace = pkg.id;
				}

			}


			if (namespace !== null) {

				let id    = '';
				let ns    = this.url.split('/');
				let tmp_i = ns.indexOf('review');
				let tmp_s = ns[ns.length - 1];

				if (/\.js$/g.test(tmp_s)) {
					ns[ns.length - 1] = tmp_s.split('.').slice(0, -1).join('.');
				}

				if (tmp_i !== -1 && ns[tmp_i + 1] === 'core') {

					if (ns[tmp_i + 2] === 'lychee') {
						ns.splice(tmp_i + 1, 2);
					} else {
						ns.splice(tmp_i + 1, 1);
					}

				}

				if (tmp_i !== -1) {
					id = ns.slice(tmp_i + 1).join('.');
				}

				if (id !== '') {
					found = namespace + '.' + id;
				} else {
					found = namespace;
				}

			}

		}

		return found;

	};

	const _resolve = function(identifier) {

		let pointer   = this;
		let namespace = identifier.split('.');
		let id        = namespace.pop();

		for (let n = 0, nl = namespace.length; n < nl; n++) {

			let name = namespace[n];

			if (pointer[name] === undefined) {
				pointer[name] = {};
			}

			pointer = pointer[name];

		}


		let check = id.toLowerCase();
		if (check === id) {

			if (pointer[id] === undefined) {
				pointer[id] = {};
			}

			return pointer[id];

		} else {

			if (pointer[id] !== undefined) {
				return pointer[id];
			}

		}


		return null;

	};



	/*
	 * IMPLEMENTATION
	 */

	const Composite = function(data) {

		let settings = Object.assign({}, data);


		this.id  = '';
		this.url = lychee.FILENAME || null;

		this._requires = [];
		this._exports  = null;


		// XXX: url has to be set first for fuzzing
		this.setUrl(settings.url);
		this.setId(settings.id);

		settings = null;

	};


	Composite.prototype = {

		/*
		 * ENTITY API
		 */

		deserialize: function(blob) {

			if (blob.requires instanceof Array) {
				this.requires(blob.requires);
			}


			let index1   = 0;
			let index2   = 0;
			let tmp      = null;
			let bindargs = null;

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

			let settings = {};
			let blob     = {};


			if (this.id !== '')  settings.id  = this.id;
			if (this.url !== '') settings.url = this.url;

			if (this._requires.length > 0)         blob.requires = this._requires.slice(0);
			if (this._exports instanceof Function) blob.exports  = this._exports.toString();


			return {
				'constructor': 'lychee.Specification',
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

				if (id.includes('.') && /^([A-Za-z0-9-.]+)$/g.test(id)) {

					this.id = id;

					return true;

				} else {

					let fuzzed = _fuzz_id.call(this);
					if (fuzzed !== null) {

						this.id = fuzzed;

						console.warn('lychee.Specification: Injecting Identifier "' + fuzzed + '" (' + this.url + ')');

						return true;

					} else {

						console.error('lychee.Specification: Invalid Identifier "' + id + '" (' + this.url + ')');

					}

				}

			}


			return false;

		},

		setUrl: function(url) {

			url = typeof url === 'string' ? url : null;


			if (url !== null) {

				this.url = url;

				return true;

			}


			return false;

		},

		export: function(sandbox) {

			sandbox = sandbox !== undefined ? sandbox : global;


			let console = sandbox.console || global.console;
			let id      = this.id;

			if (this._exports !== null) {

				let requires = this._requires.map(function(id) {
					return _resolve.call(sandbox, id);
				});


				if (requires.includes(null) === false) {

					try {
						this._exports.call(
							this._exports,
							lychee,
							sandbox
						) || null;
					} catch (err) {
						lychee.Debugger.report(lychee.environment, err, this);
					}


					return true;

				} else {

					let invalid_requires = this._requires.filter(function(id, r) {
						return requires[r] === null;
					});

					if (invalid_requires.length > 0) {

						for (let i = 0, il = invalid_requires.length; i < il; i++) {
							let tmp = invalid_requires[i];
							console.error('lychee.Specification ("' + id + '"): Invalid Requirement of "' + tmp + '".');
						}

					}

				}

			}


			return false;

		},

		exports: function(callback) {

			callback = callback instanceof Function ? callback : null;


			if (callback !== null) {
				this._exports = callback;
			}


			return this;

		},

		requires: function(definitions) {

			definitions = definitions instanceof Array ? definitions : null;


			if (definitions !== null) {

				for (let d = 0, dl = definitions.length; d < dl; d++) {

					let definition = definitions[d];
					if (typeof definition === 'string') {

						let is_definition = definition.includes('.');
						let is_namespace  = definition === definition.toLowerCase();

						if (is_definition === true) {

							if (this._requires.includes(definition) === false) {
								this._requires.push(definition);
							}

						} else if (is_namespace === true) {
							this._requires.push(definition);
						}

					}

				}

			}


			return this;

		}

	};


	Composite.displayName           = 'lychee.Specification';
	Composite.prototype.displayName = 'lychee.Specification';


	return Composite;

})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));


["html","html-nwjs","html-webview","nidium","node","node-sdl"].forEach(function(platform) {
	if (lychee.PLATFORMS.includes(platform) === false) {
		lychee.PLATFORMS.push(platform);
	}
});


(function(lychee, global) {

	const _CONTEXT = {
		fillStyle:    '#000000',
		globalAlpha:  1.0,
		lineWidth:    1,
		strokeStyle:  '#000000'
	};

	_CONTEXT.prototype = {

		arc:          function(x, y, radius, start, end) {},
		beginPath:    function() {},
		closePath:    function() {},
		drawImage:    function(image, x, y, width, height, srcx, srcy, src_width, src_height) {},
		fill:         function() {},
		fillRect:     function(x, y, width, height) {},
		setTransform: function(x1, y1, z1, x2, y2, z2) {},
		lineTo:       function(x, y) {},
		moveTo:       function(x, y) {},
		stroke:       function() {},
		strokeRect:   function(x, y, width, height) {}

	};

	const _ELEMENT = {
		id:        '',
		className: '',
		style:     {
			position:        'static',
			width:           1337,
			height:          1337,
			backgroundColor: '#000000',
			pointerEvents:   'none',
			transform:       '',
			zIndex:          0
		}
	};

	_ELEMENT.prototype = {

		getBoundingClientRect: function() {

			return {
				left: 1337,
				top:  1337
			};

		}

	};

	const _CANVAS = Object.assign({}, _ELEMENT);

	_CANVAS.prototype = Object.assign({}, _ELEMENT.prototype, {

		getContext: function(context) {

			if (context === '2d') {
				return _CONTEXT;
			}

			return null;

		}

	});

	const _INPUT = {

		oncancel:     function() {},
		onchange:     function() {},
		onclick:      function() {},
		value:        '',

		click:        function() {},
		setAttribute: function(name, value) {}

	};

	const _FEATURES = {

		innerWidth:  1337,
		innerHeight: 1337,

		CanvasRenderingContext2D: function() {},
		FileReader:               function() {},
		Storage:                  function() {},
		WebSocket:                function(url, protocols) {},
		XMLHttpRequest:           function() {},

		addEventListener:      function(event, callback, bubble) {},
		clearInterval:         function(id) {},
		clearTimeout:          function(id) {},
		requestAnimationFrame: function(callback) {},
		setInterval:           function(callback, delay) {},
		setTimeout:            function(callback, delay) {},

		document: {

			createElement: function(type) {

				if (type === 'a' || type === 'div') {
					return _ELEMENT;
				} else if (type === 'input') {
					return _INPUT;
				} else if (type === 'canvas') {
					return _CANVAS;
				}

				return null;

			},

			querySelectorAll: function(query) {

				if (query === '.lychee-Renderer') {
					return [ _ELEMENT ];
				}

				return null;

			},
			body: {
				appendChild: function(element) {}
			}
		},

		location: {
			href: 'file:///tmp/index.html'
		},

		localStorage: {
			setItem: function(key, value) {},
			getItem: function(key) {}
		},

		sessionStorage: {
			setItem: function(key, value) {},
			getItem: function(key) {}
		}

	};

	_FEATURES.FileReader.prototype.readAsDataURL = function() {};


	lychee.FEATURES['html'] = _FEATURES;

})(lychee, typeof global !== 'undefined' ? global : this);


(function(lychee, global) {

	const _BUFFER = {
		Buffer: function() {}
	};

	const _CHILD_PROCESS = {
		execFile: function(path, args) {}
	};

	const _FS = {
		readFile:      function(path, encoding, callback) {},
		readFileSync:  function(path, encoding) {},
		mkdirSync:     function(path, mode) {},
		unlinkSync:    function(path) {},
		writeFileSync: function(path, data, encoding) {},

		lstatSync:     function(path) {
			return {
				isDirectory: function() {}
			};
		}

	};

	const _Server = function(settings) {

		this.allowHalfOpen  = false;
		this.pauseOnConnect = false;

	};

	_Server.prototype = {

		close:  function() {},
		listen: function(port, host) {},

		on: function(event, callback) {

			if (event === 'connection') {
				callback(new _Socket());
			}

		}

	};

	const _Socket = function(settings) {

		this.allowHalfOpen = false;

	};

	_Socket.prototype = {
		destroy:            function() {},
		on:                 function(event, callback) {},
		removeAllListeners: function(event) {},
		setKeepAlive:       function(flag, delay) {},
		setNoDelay:         function(flag) {},
		setTimeout:         function(delay) {}
	};


	const _NET = {
		Server: _Server,
		Socket: _Socket
	};

	const _PATH = {
		dirname: function(path) {}
	};

	const _FEATURES = {

		require: function(id) {

			if (id === 'buffer')        return _BUFFER;
			if (id === 'child_process') return _CHILD_PROCESS;
			if (id === 'fs')            return _FS;
			if (id === 'net')           return _NET;
			if (id === 'path')          return _PATH;


			throw new Error('Cannot find module \'' + id + '\'');

		},

		process: {
			env: {
				APPDATA: null,
				HOME:    '/home/dev'
			},
			stdin: {
				on: function(event, callback) {}
			},
			stdout: {
				on:    function(event, callback) {},
				write: function(str) {}
			}
		},

		clearInterval: function(id) {},
		clearTimeout:  function(id) {},
		setInterval:   function(callback, delay) {},
		setTimeout:    function(callback, delay) {}

	};


	// XXX: This is an incremental platform of 'html'

	lychee.FEATURES['html-nwjs'] = _FEATURES;

})(lychee, typeof global !== 'undefined' ? global : this);


(function(lychee, global) {

	const _FEATURES = {
	};


	lychee.FEATURES['html-webview'] = _FEATURES;

})(lychee, typeof global !== 'undefined' ? global : this);


(function(lychee, global) {

	const _CONTEXT = {
		fillStyle:    '#000000',
		globalAlpha:  1.0,
		lineWidth:    1,
		strokeStyle:  '#000000'
	};

	_CONTEXT.prototype = {

		arc:          function(x, y, radius, start, end) {},
		beginPath:    function() {},
		closePath:    function() {},
		drawImage:    function(image, x, y, width, height, srcx, srcy, src_width, src_height) {},
		fill:         function() {},
		fillRect:     function(x, y, width, height) {},
		setTransform: function(x1, y1, z1, x2, y2, z2) {},
		lineTo:       function(x, y) {},
		moveTo:       function(x, y) {},
		stroke:       function() {},
		strokeRect:   function(x, y, width, height) {}

	};

	const _Canvas = function(width, height, options) {
		this.width  = 1337;
		this.height = 1337;
		this.__left = 0;
		this.__top  = 0;
	};

	_Canvas.prototype = {

		clear: function() {},

		getContext: function(context) {

			if (context === '2d') {
				return _CONTEXT;
			}

			return null;

		}

	};

	const _File = function(path, options, callback) {
		this.filesize = 1337;
	};

	_File.prototype = {
		openSync:  function(mode, callback) {},
		readSync:  function(bytes, callback) {},
		writeSync: function(buffer, callback) {},
		closeSync: function() {}
	};

	_File.read = function(path, options, callback) {
	};

	const _Socket = function(host, port) {
		this.binary       = false;
		this.encoding     = 'utf8';
		this.onconnect    = null;
		this.ondisconnect = null;
		this.ondrain      = null;
		this.onmessage    = null;
	};

	_Socket.prototype = {
		close:   function() {},
		connect: function(mode) {},
		listen:  function(mode) {},
		write:   function(data) {}
	};


	const _FEATURES = {

		Canvas:                   _Canvas,
		CanvasRenderingContext2D: _CONTEXT,
		File:                     _File,
		Socket:                   _Socket,

		addEventListener:      function(event, callback, bubble) {},
		clearInterval:         function(id) {},
		clearTimeout:          function(id) {},
		requestAnimationFrame: function(callback) {},
		setInterval:           function(callback, delay) {},
		setTimeout:            function(callback, delay) {},

		document: {

			canvas: {

				add:    function(canvas) {},
				remove: function(canvas) {}

			}

		},

		window: {

			innerWidth:  1337,
			innerHeight: 1337,
			left:        0,
			top:         0,

			_onblur:     null,
			_onfocus:    null,

			__nidium__:  {
				build:    'abcdef0123456789',
				revision: 'abcdef0123456789',
				version:  '0.2'
			},

			addEventListener:      function(event, callback) {},
			exec:                  function(cmd) {},
			openFileDialog:        function(types, callback) {},
			requestAnimationFrame: function(callback) {},
			setSize:               function(width, height) {}

		}

	};


	lychee.FEATURES['nidium'] = _FEATURES;

})(lychee, typeof global !== 'undefined' ? global : this);

(function(lychee, global) {

	const _BUFFER = {
		Buffer: function() {}
	};

	const _CHILD_PROCESS = {
		execFile: function(path, args) {}
	};

	const _FS = {
		readFile:      function(path, encoding, callback) {},
		readFileSync:  function(path, encoding) {},
		mkdirSync:     function(path, mode) {},
		unlinkSync:    function(path) {},
		writeFileSync: function(path, data, encoding) {},

		lstatSync:     function(path) {
			return {
				isDirectory: function() {}
			};
		}

	};

	const _Server = function(settings) {

		this.allowHalfOpen  = false;
		this.pauseOnConnect = false;

	};

	_Server.prototype = {

		close:  function() {},
		listen: function(port, host) {},

		on: function(event, callback) {

			if (event === 'connection') {
				callback(new _Socket());
			}

		}

	};

	const _Socket = function(settings) {

		this.allowHalfOpen = false;

	};

	_Socket.prototype = {
		destroy:            function() {},
		on:                 function(event, callback) {},
		removeAllListeners: function(event) {},
		setKeepAlive:       function(flag, delay) {},
		setNoDelay:         function(flag) {},
		setTimeout:         function(delay) {}
	};


	const _NET = {
		Server: _Server,
		Socket: _Socket
	};

	const _PATH = {
		dirname: function(path) {}
	};

	const _FEATURES = {

		require: function(id) {

			if (id === 'buffer')        return _BUFFER;
			if (id === 'child_process') return _CHILD_PROCESS;
			if (id === 'fs')            return _FS;
			if (id === 'net')           return _NET;
			if (id === 'path')          return _PATH;


			throw new Error('Cannot find module \'' + id + '\'');

		},

		process: {
			env: {
				APPDATA: null,
				HOME:    '/home/dev'
			},
			stdin: {
				on: function(event, callback) {}
			},
			stdout: {
				on:    function(event, callback) {},
				write: function(str) {}
			}
		},

		clearInterval: function(id) {},
		clearTimeout:  function(id) {},
		setInterval:   function(callback, delay) {},
		setTimeout:    function(callback, delay) {}

	};


	lychee.FEATURES['node'] = _FEATURES;

})(lychee, typeof global !== 'undefined' ? global : this);


(function(lychee, global) {

	const _FEATURES = {
	};


	lychee.FEATURES['node-sdl'] = _FEATURES;

})(lychee, typeof global !== 'undefined' ? global : this);


(function(lychee, global) {

	let _filename = null;



	/*
	 * FEATURE DETECTION
	 */

	(function(process, selfpath) {

		let tmp1 = selfpath.indexOf('/libraries/lychee');
		if (tmp1 !== -1) {
			lychee.ROOT.lychee = selfpath.substr(0, tmp1);
		}

		let tmp2 = selfpath.split('/').slice(0, 3).join('/');
		if (tmp2.startsWith('/opt/lycheejs')) {
			lychee.ROOT.lychee = tmp2;
		}

		let cwd = typeof process.cwd === 'function' ? process.cwd() : '';
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

			if (consol) methods.push('console');
			if (audio)  methods.push('Audio');
			if (buffer) methods.push('Buffer');
			if (image)  methods.push('Image');

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
		this.kerning    = 0;
		this.spacing    = 0;
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

			text = typeof text === 'string' ? text : '';


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
					this.__buffer.ogg = new Buffer(blob.buffer.ogg.substr(28), 'base64');
				}

				if (typeof blob.buffer.mp3 === 'string') {
					this.__buffer.mp3 = new Buffer(blob.buffer.mp3.substr(22), 'base64');
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
					this.__buffer.ogg = new Buffer(blob.buffer.ogg.substr(28), 'base64');
				}

				if (typeof blob.buffer.mp3 === 'string') {
					this.__buffer.mp3 = new Buffer(blob.buffer.mp3.substr(22), 'base64');
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


		if (url !== null && url.startsWith('data:image') === false) {

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
			if (url.startsWith('data:')) {

				if (url.startsWith('data:image/png;')) {

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

				if (url.endsWith('.png')) {

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

		let url = stuff.url;
		if (url.endsWith('.js') && stuff.__ignore === false) {

			_filename = url;


			let cid = lychee.environment.resolve(url);
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
			let mime = 'application/octet-stream';


			if (this.url.endsWith('.js')) {
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
	 * EXPORTS
	 */

	// XXX: Buffer is node data type
	// global.Buffer  = Buffer;
	global.Config  = Config;
	global.Font    = Font;
	global.Music   = Music;
	global.Sound   = Sound;
	global.Texture = Texture;
	global.Stuff   = Stuff;
	global.require = require;


	Object.defineProperty(lychee, 'FILENAME', {

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


lychee.define('lychee.Input').tags({
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

	const Composite = function(data) {

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


lychee.define('lychee.Renderer').tags({
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

	const _draw_ctx = function(x, y, value, color) {

		let max_x = (this[0] || '').length;
		let max_y = (this    || '').length;

		if (x >= 0 && x < max_x && y >= 0 && y < max_y) {
			this[y][x] = value;
		}

	};



	/*
	 * STRUCTS
	 */

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

	const Composite = function(data) {

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


			if (this.alpha !== 1.0)                               settings.alpha      = this.alpha;
			if (this.background !== '#000000')                    settings.background = this.background;
			if (this.id.startsWith('lychee-Renderer-') === false) settings.id         = this.id;
			if (this.width !== null)                              settings.width      = this.width;
			if (this.height !== null)                             settings.height     = this.height;


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


			let ctx = this.__ctx;
			let dx  = x2 - x1;
			let dy  = y2 - y1;
			let chr = ' ';


			if (dx === 0) {
				chr = dy === 0 ? ' ' : '|';
			} else if (dy === 0) {
				chr = dx === 0 ? ' ' : '-';
			} else if (dx > 0) {
				chr = dy > 0 ? '\\' : '/';
			} else if (dx < 0) {
				chr = dy > 0 ? '/' : '\\';
			}


			if (lineWidth > 1) {

				let dist = lineWidth - 1;

				for (let x = x1 - dist; x < x2 + dist; x++) {

					for (let y = y1 - dist; y < y2 + dist; y++) {
						_draw_ctx.call(ctx, x, y, chr, color);
					}

				}

			} else {

				for (let x = x1; x < x2; x++) {

					for (let y = y1; y < y2; y++) {
						_draw_ctx.call(ctx, x, y, chr, color);
					}

				}

			}


			return true;

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


			let dx_a = x2 - x1;
			let dy_a = y2 - y1;
			if (dx_a !== 0 || dy_a !== 0) {
				this.drawLine(x1, y1, x2, y2, color, lineWidth);
			}

			let dx_b = y3 - y2;
			let dy_b = y3 - y2;
			if (dx_b !== 0 || dy_b !== 0) {
				this.drawLine(x2, y2, x3, y3, color, lineWidth);
			}

			let dx_c = y1 - y3;
			let dy_c = y1 - y3;
			if (dx_c !== 0 || dy_c !== 0) {
				this.drawLine(x3, y3, x1, y1, color, lineWidth);
			}


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


				let ctx = this.__ctx;
				let chr = background === true ? '#' : '+';


				for (let p = 1; p < points; p++) {

					let x = arguments[1 + p * 2]     | 0;
					let y = arguments[1 + p * 2 + 1] | 0;

					if (lineWidth > 1) {

						let dist = lineWidth - 1;

						for (let px = x - dist; px < x + dist; px++) {

							for (let py = y - dist; py < y + dist; py++) {
								_draw_ctx.call(ctx, px, py, chr, color);
							}

						}

					} else {

						_draw_ctx.call(ctx, x, y, chr, color);

					}

				}


				return true;

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


lychee.define('lychee.Stash').tags({
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
				if (path.startsWith(lychee.ROOT.project)) {

					if (asset !== null) {

						let dir = path.split('/').slice(0, -1).join('/');
						if (dir.startsWith(lychee.ROOT.project)) {
							_mkdir_p(dir);
						}


						let data = lychee.serialize(asset);
						let enc  = _ENCODING[data.constructor] || _ENCODING['Stuff'];

						if (data !== null && data.blob instanceof Object) {

							let buffer = data.blob.buffer || null;
							if (buffer instanceof Object) {

								for (let sub in buffer) {

									if (typeof buffer[sub] === 'string') {

										let index = buffer[sub].indexOf('base64,') + 7;
										if (index > 7) {

											let raw = new Buffer(buffer[sub].substr(index, buffer[sub].length - index), 'base64');

											try {
												_fs.writeFileSync(path + '.' + sub, raw, enc);
												result = true;
											} catch (err) {
												result = false;
											}

										}

									}

								}

							} else if (typeof buffer === 'string') {

								let index = buffer.indexOf('base64,') + 7;
								if (index > 7) {

									let raw = new Buffer(buffer.substr(index, buffer.length - index), 'base64');

									try {
										_fs.writeFileSync(path, raw, enc);
										result = true;
									} catch (err) {
										result = false;
									}

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

	const Composite = function(data) {

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


			if (this.id.startsWith('lychee-Stash-') === false) settings.id   = this.id;
			if (this.type !== Composite.TYPE.persistent)       settings.type = this.type;


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
					load:  Array.from(ids),
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


lychee.define('lychee.Storage').tags({
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

	const Composite = function(data) {

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


			if (this.id.startsWith('lychee-Storage-') === false) settings.id    = this.id;
			if (Object.keys(this.model).length !== 0)            settings.model = this.model;
			if (this.type !== Composite.TYPE.persistent)         settings.type  = this.type;


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


lychee.define('lychee.Viewport').tags({
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

	const Composite = function(data) {

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

	const Composite = function(data) {

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

	const Composite = function() {

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

		let handshake  = '';
		let identifier = lychee.ROOT.project;


		if (identifier.startsWith(lychee.ROOT.lychee)) {
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

	const Composite = function() {

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

				if (url.startsWith('data:')) {
					path = _HOME + '/' + mime.name + '.' + mime.ext;
				}

				_fs.writeFileSync(path, blob, mime.enc);

			}

		}

	};



	/*
	 * IMPLEMENTATION
	 */

	const Composite = function(data) {

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
	"png": lychee.deserialize({"constructor":"Texture","arguments":["/libraries/lychee/source/platform/node/ui/entity/Helper.png"],"blob":{"buffer":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAXcklEQVR4Xu2dB7R8V1XGvw9FsWEJIAioFAFBkCpSpUtHQCBSpRlqQOkhSE8oEoqKdBAjAgIqzcSGBiRGQBJFkaLYAEUsRCQgms/1m+z71n3z7sy9M29eZt5/7lnrreT/3sy95+zznd33PtY4tpoC3urVj4vXCIAtB8EIgBEAq6dAkq+RdAVJl5X0vZK+WdIFJX3C9puWfWOSC9r+6rzvD/nMsu/f1O8l+VpJV5N0cUkXqZ9zbP9S35xXxgGSfKukoyX9qKSbSeLf0+Ns212/nzvPJN8p6UWSfkzSI2y/uusLSY6V9DxJvybpsbb/rY8Ah/nvSS4t6URJt2/RO9JEtP+rpEv2HZh9A4ATJ+lnJD1B0rdL+rikd0n6kKSPSPp3SWdLelJtHtxg0EhyAUk/VYv8pnreNST9oqSfbhaX5BskvVzSfeq9V5f0nwWC1w162SH7UJLbSIKb/pck1vgHkj4l6QWSbi3p5rbf37esfQEgCZvyNkm3kvR2SU+x/eczTueLJT3Q9iAAJIGlsak/LOl9ko6R9NeSni3piZJOk3Q3SWz+b0hi058q6VmSflDSKyRdR9IfSXqIbb7bO5L8OOCS9PVzPvxs27xzLSPJd0n6C0l/Iumetr/ARJL8XB1GfvfGIZNbGgB18iHuD9XG/nJN4gK2z51+eZJXSbqj7YvNm1iSb5T0tNoEOAec5dW2YW2TkYSNf62k/5B0odIv7m37na3PwD0eVoDhM8+VdILtL/e8/9OS/rs4WddHryzpUpLusS4QJIED3h09yzY0gCYPlfRSScfb5pAMGvsBwHFF3PvYPjnJDSX9vKQfKFaNrP7j1obAIS5tGxY+cyRBdFxT0smg2TaybNdI8i2S3lCyj7/9uqSftP2ljs9eQtJLJHGyT7P9Iz3vB2hPtw0I94wkF5X0+5KuVFxmLqBaDwDMr7P9D4N2Zj6NeMYpthGPbP6FS9SebvtGM+b9fZIub/u3239fCgBJLlebzCTunIQT8ZeSULp+s5S175B0ZdufqUl+VNInbd+hZwNAMWiGhd1/+sSW7EM0XLI29tvYfEl/K+lBtt/Tfn4SRA5gupOk59t+/H4AUGsBBO+W9P0LbObXwbZtX2uB73QBEAvrf+twvLB1wF5WYvJh09p/khuXiP6ibfZqZywLAAh652JBn07yEEmYHFe3fVYSZPCZJXtfXggFHM+y/fQ+AiSBuyDLPwCYbH82CQomlsB9JQGmB9hGBnICblGnEZPzlZIeZ/vsJN8t6R2SriLpMbbRQ+aOJHM5QN/3Z/09CRzlqbaXonlrozH5MIWxclD4JiMJz8U64jAcYxs68Pu7SvrVEpMfs40IWx4ASUA92v0LmtOU5EFF+OuxKUmuJwkNFKXvNUkw31Cabmr7D4cQsSb++pLzzy/FDxsXWf5M21+ZOukopIAGUxCuw3eeXEri0bY5sX2bzynluafX/Pu+ssjfry8J+uwLALWpKNpsJrrQziirCV3sXnDD0o8Qy78lCeAcZfsG+wUArPl2ki5j+/M1IVjiX5X9+TtlFaAIIgI+nwRzBUvhEn1K2NSCmCyKJmwPGXoz2+gIM0fpIqdKQpn8H6wI2x8eslNl1XyxThjfXeUAXDiy9gWAOunQ+CZFz8keNKOccHDoe9R+wAkQqX8q6bO28RnsjLmTKecOZlYzLlMmGWbQz069GOUPloT5BkJhuR9JgtL3wTq1nYpVF5WTwM7fUgohG4hi+Gf4BWaBoDYfWQjLByjI2/eiMdv+5yG7eQhEQKMjIU6fMoN2nHb0g8/YPjEJ4EMEv9j28YMAkOSBJddx9LQHiLscMraPoEm+p1gp2vl1bOOc6R2l6IFiTDnMu3clwct4kiTMyF8oc4fTipxD4UQ0MGecIQ+3fUqSe5duwHvv1rZKZk1ikwGQBB0GEfcc2zjWBo0k6Gv4a3AO4TCazwHKzobVw0ox39rjfZzsvjcngQWBQrjM9W2zMb0jCV4s5PXf4Fa2jXY/GcWRTkC5LDn/SEmYQDhAsAaQ+5yMc1rfgSOxjqNKBveJkI1UApPAXfG4ons9dpqQs2Ig5UY/o+h1g7Y/hWfsEQG1AWw6svf208pW3w4muWqJgluWtw5F8JN932ttGPYqMg4/Nxv6tA6FDw8fjiU2l4HC+WDb6CE7o/wFxAbwIvK3W/SJgk3kAEmeUw4xWPijOzYfs/z3yh+C4vwxSXBF9gDg4NW8kW28h7tGFwD+pdgsrtbflYQz54wuJ8sUsdEPninpJyThmkQDf9k04oYAoWx3Nr9x/+6YfMUJcDqhWOISZXwCR0/bDZ0EpRMFiM8gHp5hu1ex2zQAJIGmyO2X2n54x+YTccWywkxmoxHZ/1eKMx8HGNDvH7to3wUAUIPMQANHsUMOE3C4rW188rtGbRabDXvCQYHX7blD5f08QJRfHi8fFgXiBMUT9y4RsL+rCBiAxQpBFEAgZB2oRx9g3Mn2tBib+dpNAkAS1ovfhLgG8Ywdd3gdBA4dm49nFF8Im3xbLDQ0/vKjfHjeIeyzAiAqwRiUL07SDTvYLKz1ipKwP5+M02bIKR/ymSSYm/j3EQkAEyAyJzYUhxCyDYcTbBGdBTcvyineP8QCnALlEytk0NgUACRByUPfeU15OKc3HyuJzSe8jmibq9vMWnwfAPDsnVkeNbxusBacGf/UPLAItpBWOmgnzlP6sFnx5CHz2VRYOa5m3serifCdafvosn85LYDgMSXGJt89bABIgpKHCESe4w7fFVwr66ph+7e0jcd0qdEJgArF4trl9HPqT09CuBXFEDaDQtFEoQ5Eay4W1wDgdl2evDYAOkTTA8o1eqgAkAQvHiYw7tv7dmw+7m02H6vmVrbhgkuPLh0AXzFeIxS5JxDpa532m0oimvRO20TXOKUHCQAsAZw/mHg4eLAIdrJ8ugCQhCARrJPkEEzJaw3xWUxxtJnRwGUpPTQWkORz5UjDBIbj7ozKAGLzcYnz90ksZD+jCwBoznch0mWbybDJb66Y/KlJ8C0TcGBTiLPjjFk5wVobwntI9EDB413PICOIbKApEYDr93GSiPYBSsQF0b+h4drJK5PgNEKv6c2mWZDwxAKuYbvtWd31iAp4kUH16OnAVUVc2XwcYbceku0zZH5dACCl60O2MecgCKlHOGZw7Z5UDh4ULsQDm3HzUkIGBXmGTKrrM0lIMkUZRTHE7ENOYuOfVSlonHpOP3kCj7dNYsfCIwlWBi5WNOtVDpTT59kmojlzJIFr4TlF9DaZPqwL+pL0yebv5Fnsd4JdAACBJFWiA2AKEmGD7V61Th2TQQkk4kay5v1sI6/Ol5EEawCTEH8/AwUJUxVN/1j0lfNlIgf0kiQcKMQs64HrEeXEEsAKu41tYhsrG10AwJYn+tYMzCz86DvevCS4dZHP5+vmNxMqjR93MFo/sXH8EK9dxum0Mkqu8EEVPkf3YvMZHMC72MY5t9LRBYBHlayFE3y0K5myUEpo85SVzmbBh1U28LmLuqsXfM1aPl7RUPIoAPibu1LjVjGxfcWmVzGB8RnrpcAIgPXSf+1vHwGw9i1Y7wRGAKyX/mt/+wiAtW/BeicwAmC99F/720cArH0L1juBlQIgCcEiqn86s08WWWplsl6egtCuWsNFnrWfzyYhqkgErj3wPp7c5CsmITJHmdZ0QSk1Bq84qDL1JFRZfcU2+RJLjZUAoCpz8MqRAo7XkPLwfY0kpKOR5UJghizfA401dE02CYGoSdi7Y+zk57Uqo7o+91DbRDJXPpLgGfyybdLflhr7AkBFqAi+UJBIcsYdFkkAnTXjOv2cHjJ/8PmT9Ei8gXKoQfn9S1Fj6ktJCLtSnPpI26SiT0YSUuPfaPsR9W/+S5T0oq1imc7vrmJerXmQogcAOChLjUEAqJIjUrCJDJIpTLwAQsCiKQql8IBByhaBJApHlq6CLRcvETH6AJALz38pEyepk0gd4eBdsfKlVt/zpREA520y2aacxCYTl+YDOylKSWD9BGbIZEEmkatHMInw8aRAcdHRAgAJKYR8mQdcgIRTkh4JAcNaDzTyt0kASEL2L5HZt9gm8RWa7OIASUiCoT0PiTN/P4TufTmB5JZTScJJJ/L31umHFrsmYvhe28dUIQKhZDKLn2SbnPaFRjWJoEkDcX1y43ZGVbkQUycaSZj0iQ3bXeglAz68KQBIQo4j6eEEhu5qm1TvLgDcsUQlpWHoTdBn7ugDQNP+hdyzmRkyScgbACjIwEnJWGUOIRvJa/uVvolMbTJhULJ/9gCgnk32D6KAVHQ+Rwbtq1ZtLWwCAJKQdMNa2QuabuxkXU9zgKINDTEoE0dcU47O92eOmQCo8jBSwai4oQpn7qA+wPakVq8ZSShLRnRQJUz+/qDRqtKlzp+yr86RhC4dtEuB7ZHHSHOEpdKju16wbgAkoTAGC4KGGIi86dTwTiWw8iWoJcCEpbZyZsLOPABAUKqZScleaiQhhYkyJXr8cFoHjSo2QaGcC4AW0EhfoxiEDCUIRn3CoELUeRNaJwBKlEI7OC9Z0bs2n3l3cYAWTRADtLKhVO+Ks/IJZqWFY3pRAErfnUnzp2VHNTSiUJSedbuaOsw52dQAAIBdXTB6NoscPtgdYodkFpJDX7+fLKE1AwDOxgm+SrtAtk2DJDTd+JJtFPA9IwkFO9QDvmhWa5xZAGg6ftDUaacIZBkQVM0+eWw3HprPVkWd6BKTRNRF3ls1DdTQo5fAIhELe4oihzxzXQAoFo6sf7dtMrBniUDM78xrBpmE0jqKZWjOscd0ngUANG8aLmEC7msUO2czaezY26OnWBvlX2TELgyA+j7rul9lDbOGQb2Jphe6RgDgWMPLt1Bd4wwuQBsZdLlrdnVKmQUAzCz64KFR7nskgZ2/cLqryBxkNwCgTdxOJ6xFJ1I+DJIr8R3QIo2U68FjjQAgroDid/FFlOcZAKBJB4W0VAjTW3HXmAUAHA4kh154PzK0eVMSZP+Js3rvdZw8Ch5R4pYGQHEeqmspHMUCQRHa00dwHhrWCABa6VASTuLtHuVvMILPUxQxmfGpdNJyFgAatrHwqenYTEqV6fIxWKGsTiAAALExt5BiBuppjcb36IlHrAJRsnAMYY0AaCqDLzRUcR7ATR9lG0/qIA4A68eXjzk1ccUuO5LgGsaSoNRsaL/eJgq3EAAqNkHQho7l+44irhEA9y8vJ61gqYJaelRRL022qCvY0994nh+gacDMxi1UX9eebRLsWJBMl69BoxWG3VMjN+PEU6PIqSFghLsUcxDTZ+7dAn2TWSMA6MUIgPcdSk4CTWiocamma2t73fMAQIs1So9pSsRDJqMig3iI9jSE7mD/TXeqhdzBrSLJTrY1BTAUPEKxBEsweeAaS9UFdsx/beHgqhGkrx+e1KVG9RQkTkPSCE2994y+WAAVthRh0uhp0nc/CXb5RWzD2meOil5RvowNTgeLwcpMtX2jHGomAKppBWYl1TMUtOInJ4lkZWNdHKDoTJEqzqDO3ghDFllt8ojD0Cm186aWPgDgTsSPTC8Awr6wEvoHULhI8kdnaVg5Y6gohkvQmmyhFLEWACj25HTvjGpTT3SsaZJIVTBl4L0NoIYQbepd6+QAOHnwxuIVvXYX++45gHRb4wCiQ9DVpfMA9iaElFcKPzsJIShxoPLaFYDBTYmJ0d4gCjWp50eJ5ORjgy40KseOrJtdAEhC0If3EwQi0ASHGBT3XmgC9eF1coDiArTBI+eBwlyadA0SbeUCJi2PcD4OoJl70AuAhnDVABr/AImfzfdOss1pnIzKDWDjafFKnH5XdHDoJrQAMEnFSoJVAggJ+mBSAox95x32zWfdACia0jgT3QZvKuvek5PRoj8cm+5oWG5wRPoHoQPMHIMB0HrJg+tmClgKvfcAxUpHi/BNU0S0elgiOgkNopa2ShaZ6CYAoEBARA+PJhyBDQUEWFf0aCD7Cn8H3BH/TdM6Dr9LL3dcCABJyETh8gHsevzrvS9YhOAtkJFeTUSPgScLfQL0L+TKXebd7e+0rJGuR52vWcFlfZHyxQmn3Uy7hwPzI0+T+AGK8TuGKt2LAgDNn9SvQX1/97MBlfNOg+g3LdLocT/v7Ppu3YWw65aNUm7f0GRA1zUycMYmObZ5FGz4lauu7S8lGWWcbi3sIa7uD9om5rLQWAgACz15/PChoMAIgEOxTQc3yREAB0fbQ/HkEQCHYpsObpIjAA6OtofiySMADsU2HdwkRwAcHG0PxZOXAkAS4u/YoHSvJAxLCTU9BfeVvHAoKHaETXIwAKpgk0xbGklzZ930bWKQBgcR0UOuN1nZxRFHGM03ajmDAJCEjedGajphkGXD5hMa5pp17hDAN0/xB4MQMBFCYgQEiyal5OPYTAr05QPgk6fGDB80xRa0IqFIkZTxt7YbJdTd9UQGCddSpYPbmHwBLm1c2EW5meQ68mY1LyWM0CIbSOyfCxj5fwov32+bq0h3dcqoYAUVQOSzoRcQxqRKlYueuWFk5y6/I4+Mh3dF8wDAiSc7lZspTktCiRLFCqSKTzJ8OlqlEJKkIJFs4hOSkJ3LpU8EdADRODaMArPqAujJD7unPIxTzGbDAb5gu5H1ewBQn6N7BwWL3CDOZ4jpU93DNfBk8YxjgyiwBwCVSQqrp4oG1s21QKQWEXKkV8AkObSLA9TvUP5I0b4Y7dEqh4/LpClMvNqQbOINos8RP5UuAGDivafu3YHVk5+OJs8NXqSHk1+GPOeHzBQ6g1CTz104+AfQGVAGSR6hxItSc5I6GHsuLz7iKbzhC+wCAOy6uambpAN+SEmaednRjDWSD8jJRwnk5i8qjmmaiOk4jg2hQBcAkOEft01+WcPquYCRbpkodfTv4Yd0Ze62QemjERQiA/ufH9KZ32ab7mHNM9AhjtpPx5ENodkRNY0uAFCQQRoTvfmazeOWKhQ7lMOdMW0FtD6PS/gDtu/Z+h3+BHoMNhc+H1GEPKyL2QWAUtjIYzvONp6+BgBU98AVqLodAgAyVz9lm9Kw5hkUcFClO91P97DS7oiYdxcHwK37knZPmSQ4eL5qGzt/CACICZxmGxdyAwB8CFQTjRxgg6DTBQA27wwuZG5tHtr+lWw3d/U1m7qrZ27r8xQx0BlsR+ErP8KoA2zQ5jOVLgDgrMGJQ3uSc8sHwOlF/tPqrVEAUQLZYMrFUBIbBRDzEOcRMQHavJ1T4WN0C0Bx7IbRYKun0wUACg9oDMmV5PSX4a7artFEBfERcHMnP9MD5w8KITVt3IhJx9GVVvBu9e6tYPFdACDkS30flSd4/TjhtEynNInOlbRcOYeWY1PRwIYz4ATiEmcKJZD3iA1MSgoc6Rg6hodXsHGresSsWACNiWlSdC/bbDg+fRRBGhbcvSXr9+gASXAj02F00hEkCfff0raFLuO0kh/HBlFgFgCI5+PFo1fPTWyfVSVSNBm6bNNwqSMaSFcRegdMmhQnod/dqeUWpufd4CYRG0SjI3oq88LBVKLiAMIs5B4AAIGH7xTbdK/oCgfjFbyuJJoTcH0M18xTwXrd5ir0I5qah3BxfRlB2P2YgGj8OIZg7/ybjlNvn9IBjqu0Me4KQPmD9aNIYvt/7hDSZium3JsTmOQK1aAAjkD7Vr5DthCdQGjEiFaPLjDhChU55L+0djl+0eaMW0H1DVpkLwCK1WMR4NVDMaQBwaxBejh9aamdJwo4jg2nwCAAtNeQBNlOazbu8KF1Cx04aUwwCfseRLOmDafhoZ7ewgA41KsdJ7+HAiMAthwUIwBGAGw5BbZ8+SMHGAGw5RTY8uWPHGAEwJZTYMuXP3KAEQBbToEtX/7IAUYAbDkFtnz5IwcYAbDlFNjy5Y8cYATAllNgy5c/coARAFtOgS1f/sgBRgBsOQW2fPkjBxgBsOUU2PLljxxgBMCWU2DLlz9ygBEAW06BLV/+yAFGAGw5BbZ8+SMHGAGw5RTY8uWPHGAEwJZTYMuXP3KAEQBbToEtX/7IAbYcAP8PmU3/F/4gW0oAAAAASUVORK5CYII="}})
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

	const Composite = function(data) {

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

	const Composite = function(data) {

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

	let environment = lychee.deserialize({"constructor":"lychee.Environment","arguments":[{"id":"/libraries/strainer/dist","debug":false,"timeout":5000,"target":"strainer.Main","type":"build","tags":{"platform":["node"]}}],"blob":{"definitions":{"strainer.Main":{"constructor":"lychee.Definition","arguments":[{"id":"strainer.Main","url":"/libraries/strainer/source/Main.js"}],"blob":{"attaches":{},"requires":["strainer.flow.Check","strainer.flow.Transcribe"],"includes":["lychee.event.Emitter"],"exports":"function (lychee, global, attachments) {\n\n\tconst _lychee  = lychee.import('lychee');\n\tconst _Emitter = lychee.import('lychee.event.Emitter');\n\tconst _flow    = lychee.import('strainer.flow');\n\n\n\n\t/*\n\t * IMPLEMENTATION\n\t */\n\n\tconst Composite = function(settings) {\n\n\t\tthis.settings = _lychee.assignunlink({\n\t\t\tcwd:     lychee.ROOT.lychee,\n\t\t\taction:  null,\n\t\t\tproject: null\n\t\t}, settings);\n\n\t\tthis.defaults = _lychee.assignunlink({\n\t\t\tcwd:     lychee.ROOT.lychee,\n\t\t\taction:  null,\n\t\t\tproject: null\n\t\t}, this.settings);\n\n\n\t\t_Emitter.call(this);\n\n\n\n\t\t/*\n\t\t * INITIALIZATION\n\t\t */\n\n\t\tthis.bind('load', function() {\n\n\t\t\tlet action  = this.settings.action  || null;\n\t\t\tlet project = this.settings.project || null;\n\n\t\t\tif (action !== null && project !== null) {\n\n\t\t\t\tlet cwd = this.settings.cwd || null;\n\n\t\t\t\t// XXX: lycheejs-strainer check /projects/my-project\n\t\t\t\tif (cwd === _lychee.ROOT.lychee) {\n\n\t\t\t\t\tlychee.ROOT.project                           = _lychee.ROOT.lychee + project;\n\t\t\t\t\tlychee.environment.global.lychee.ROOT.project = _lychee.ROOT.lychee + project;\n\n\t\t\t\t// XXX: cd /opt/lycheejs/projects && lycheejs-strainer check my-project\n\t\t\t\t} else if (cwd.startsWith(_lychee.ROOT.lychee)) {\n\n\t\t\t\t\tif (project.startsWith(_lychee.ROOT.lychee)) {\n\t\t\t\t\t\tproject = project.substr(_lychee.ROOT.lychee.length);\n\t\t\t\t\t}\n\n\t\t\t\t\tlychee.ROOT.project                           = _lychee.ROOT.lychee + project;\n\t\t\t\t\tlychee.environment.global.lychee.ROOT.project = _lychee.ROOT.lychee + project;\n\n\t\t\t\t// XXX: lycheejs-strainer check /home/whatever/my-project\n\t\t\t\t} else {\n\n\t\t\t\t\tlychee.ROOT.lychee                            = '';\n\t\t\t\t\tlychee.ROOT.project                           = project;\n\t\t\t\t\tlychee.environment.global.lychee.ROOT.project = project;\n\n\t\t\t\t\t// XXX: Disable sandbox for external projects\n\t\t\t\t\tlychee.environment.resolve = function(url) {\n\n\t\t\t\t\t\tif (url.startsWith('/libraries') || url.startsWith('/projects')) {\n\t\t\t\t\t\t\treturn '/opt/lycheejs' + url;\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\treturn url;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t};\n\n\t\t\t\t}\n\n\n\t\t\t\tthis.trigger('init', [ project, action ]);\n\n\t\t\t} else {\n\n\t\t\t\tconsole.error('strainer: FAILURE (\"' + project + '\") at \"load\" event');\n\n\t\t\t\tthis.destroy(1);\n\n\t\t\t}\n\n\t\t}, this, true);\n\n\t\tthis.bind('init', function(project, action) {\n\n\t\t\tlet flow = null;\n\t\t\tlet name = action.charAt(0).toUpperCase() + action.substr(1);\n\n\t\t\tif (_flow[name] !== undefined) {\n\n\t\t\t\tflow = new _flow[name]({\n\t\t\t\t\tsandbox:  project,\n\t\t\t\t\tsettings: this.settings\n\t\t\t\t});\n\n\t\t\t}\n\n\n\t\t\tif (flow !== null) {\n\n\t\t\t\tflow.bind('complete', function() {\n\n\t\t\t\t\tif (flow.errors.length === 0) {\n\n\t\t\t\t\t\tconsole.info('strainer: SUCCESS (\"' + project + '\")');\n\n\t\t\t\t\t\tthis.destroy(0);\n\n\t\t\t\t\t} else {\n\n\t\t\t\t\t\tflow.errors.forEach(function(err) {\n\n\t\t\t\t\t\t\tlet path = err.url;\n\t\t\t\t\t\t\tlet rule = err.rule    || 'parser-error';\n\t\t\t\t\t\t\tlet line = err.line    || 0;\n\t\t\t\t\t\t\tlet col  = err.column  || 0;\n\t\t\t\t\t\t\tlet msg  = err.message || 'Parsing error: unknown';\n\t\t\t\t\t\t\tif (msg.endsWith('.') === false) {\n\t\t\t\t\t\t\t\tmsg = msg.trim() + '.';\n\t\t\t\t\t\t\t}\n\n\n\t\t\t\t\t\t\tlet message = '';\n\n\t\t\t\t\t\t\tmessage += path;\n\t\t\t\t\t\t\tmessage += ':' + line;\n\t\t\t\t\t\t\tmessage += ':' + col;\n\t\t\t\t\t\t\tmessage += ': ' + msg;\n\t\t\t\t\t\t\tmessage += ' [' + rule + ']';\n\n\t\t\t\t\t\t\tif (err.rule.startsWith('unguessable-')) {\n\t\t\t\t\t\t\t\tconsole.warn('strainer: ' + message);\n\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\tconsole.error('strainer: ' + message);\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t});\n\n\t\t\t\t\t\tconsole.error('strainer: FAILURE (\"' + project + '\")');\n\n\t\t\t\t\t\tthis.destroy(1);\n\n\t\t\t\t\t}\n\n\t\t\t\t}, this);\n\n\t\t\t\tflow.bind('error', function(event) {\n\n\t\t\t\t\tconsole.error('strainer: FAILURE (\"' + project + '\") at \"' + event + '\" event');\n\n\t\t\t\t\tthis.destroy(1);\n\n\t\t\t\t}, this);\n\n\n\t\t\t\tflow.init();\n\n\t\t\t}\n\n\n\t\t\treturn true;\n\n\t\t}, this, true);\n\n\t};\n\n\n\tComposite.prototype = {\n\n\t\t/*\n\t\t * ENTITY API\n\t\t */\n\n\t\t// deserialize: function(blob) {},\n\n\t\tserialize: function() {\n\n\t\t\tlet data = _Emitter.prototype.serialize.call(this);\n\t\t\tdata['constructor'] = 'strainer.Main';\n\n\n\t\t\tlet settings = _lychee.assignunlink({}, this.settings);\n\t\t\tlet blob     = data['blob'] || {};\n\n\n\t\t\tdata['arguments'][0] = settings;\n\t\t\tdata['blob']         = Object.keys(blob).length > 0 ? blob : null;\n\n\n\t\t\treturn data;\n\n\t\t},\n\n\n\n\t\t/*\n\t\t * MAIN API\n\t\t */\n\n\t\tinit: function() {\n\n\t\t\tthis.trigger('load');\n\n\t\t\treturn true;\n\n\t\t},\n\n\t\tdestroy: function(code) {\n\n\t\t\tcode = typeof code === 'number' ? code : 0;\n\n\n\t\t\tthis.trigger('destroy', [ code ]);\n\n\t\t\treturn true;\n\n\t\t}\n\n\t};\n\n\n\treturn Composite;\n\n}"}},"lychee.event.Emitter":{"constructor":"lychee.Definition","arguments":[{"id":"lychee.event.Emitter","url":"/libraries/lychee/source/event/Emitter.js"}],"blob":{"attaches":{},"exports":"function (lychee, global, attachments) {\n\n\t/*\n\t * HELPERS\n\t */\n\n\tconst _bind = function(event, callback, scope, once) {\n\n\t\tif (event === null || callback === null) {\n\t\t\treturn false;\n\t\t}\n\n\n\t\tlet pass_event = false;\n\t\tlet pass_self  = false;\n\n\t\tlet modifier = event.charAt(0);\n\t\tif (modifier === '@') {\n\n\t\t\tevent      = event.substr(1, event.length - 1);\n\t\t\tpass_event = true;\n\n\t\t} else if (modifier === '#') {\n\n\t\t\tevent     = event.substr(1, event.length - 1);\n\t\t\tpass_self = true;\n\n\t\t}\n\n\n\t\tif (this.___events[event] === undefined) {\n\t\t\tthis.___events[event] = [];\n\t\t}\n\n\n\t\tthis.___events[event].push({\n\t\t\tpass_event: pass_event,\n\t\t\tpass_self:  pass_self,\n\t\t\tcallback:   callback,\n\t\t\tscope:      scope,\n\t\t\tonce:       once\n\t\t});\n\n\n\t\treturn true;\n\n\t};\n\n\tconst _relay = function(event, instance, once) {\n\n\t\tif (event === null || instance === null) {\n\t\t\treturn false;\n\t\t}\n\n\n\t\tlet callback = function() {\n\n\t\t\tlet event = arguments[0];\n\t\t\tlet data  = [];\n\n\t\t\tfor (let a = 1, al = arguments.length; a < al; a++) {\n\t\t\t\tdata.push(arguments[a]);\n\t\t\t}\n\n\t\t\tthis.trigger(event, data);\n\n\t\t};\n\n\n\t\tif (this.___events[event] === undefined) {\n\t\t\tthis.___events[event] = [];\n\t\t}\n\n\n\t\tthis.___events[event].push({\n\t\t\tpass_event: true,\n\t\t\tpass_self:  false,\n\t\t\tcallback:   callback,\n\t\t\tscope:      instance,\n\t\t\tonce:       once\n\t\t});\n\n\n\t\treturn true;\n\n\t};\n\n\tconst _trigger = function(event, data) {\n\n\t\tif (this.___events !== undefined && this.___events[event] !== undefined) {\n\n\t\t\tlet value = undefined;\n\n\t\t\tfor (let e = 0; e < this.___events[event].length; e++) {\n\n\t\t\t\tlet args  = [];\n\t\t\t\tlet entry = this.___events[event][e];\n\n\t\t\t\tif (entry.pass_event === true) {\n\n\t\t\t\t\targs.push(event);\n\n\t\t\t\t} else if (entry.pass_self === true) {\n\n\t\t\t\t\targs.push(this);\n\n\t\t\t\t}\n\n\n\t\t\t\tif (data !== null) {\n\t\t\t\t\targs.push.apply(args, data);\n\t\t\t\t}\n\n\n\t\t\t\tlet result = entry.callback.apply(entry.scope, args);\n\t\t\t\tif (result !== undefined) {\n\t\t\t\t\tvalue = result;\n\t\t\t\t}\n\n\n\t\t\t\tif (entry.once === true) {\n\n\t\t\t\t\tif (this.unbind(event, entry.callback, entry.scope) === true) {\n\t\t\t\t\t\te--;\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\tif (value !== undefined) {\n\t\t\t\treturn value;\n\t\t\t} else {\n\t\t\t\treturn true;\n\t\t\t}\n\n\t\t}\n\n\n\t\treturn false;\n\n\t};\n\n\tconst _unbind = function(event, callback, scope) {\n\n\t\tlet found = false;\n\n\t\tif (event !== null) {\n\n\t\t\tfound = _unbind_event.call(this, event, callback, scope);\n\n\t\t} else {\n\n\t\t\tfor (event in this.___events) {\n\n\t\t\t\tlet result = _unbind_event.call(this, event, callback, scope);\n\t\t\t\tif (result === true) {\n\t\t\t\t\tfound = true;\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t}\n\n\n\t\treturn found;\n\n\t};\n\n\tconst _unbind_event = function(event, callback, scope) {\n\n\t\tif (this.___events !== undefined && this.___events[event] !== undefined) {\n\n\t\t\tlet found = false;\n\n\t\t\tfor (let e = 0, el = this.___events[event].length; e < el; e++) {\n\n\t\t\t\tlet entry = this.___events[event][e];\n\n\t\t\t\tif ((callback === null || entry.callback === callback) && (scope === null || entry.scope === scope)) {\n\n\t\t\t\t\tfound = true;\n\n\t\t\t\t\tthis.___events[event].splice(e, 1);\n\t\t\t\t\tel--;\n\t\t\t\t\te--;\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\treturn found;\n\n\t\t}\n\n\n\t\treturn false;\n\n\t};\n\n\n\n\t/*\n\t * IMPLEMENTATION\n\t */\n\n\tconst Composite = function() {\n\n\t\tthis.___events   = {};\n\t\tthis.___timeline = {\n\t\t\tbind:    [],\n\t\t\ttrigger: [],\n\t\t\trelay:   [],\n\t\t\tunbind:  []\n\t\t};\n\n\t};\n\n\n\tComposite.prototype = {\n\n\t\t/*\n\t\t * ENTITY API\n\t\t */\n\n\t\tdeserialize: function(blob) {\n\n\t\t\tif (blob.events instanceof Object) {\n\t\t\t\t// TODO: deserialize events\n\t\t\t}\n\n\t\t\tif (blob.timeline instanceof Object) {\n\t\t\t\t// TODO: deserialize timeline\n\t\t\t}\n\n\t\t},\n\n\t\tserialize: function() {\n\n\t\t\tlet blob = {};\n\n\n\t\t\tif (Object.keys(this.___events).length > 0) {\n\n\t\t\t\tblob.events = {};\n\n\t\t\t\tfor (let event in this.___events) {\n\n\t\t\t\t\tblob.events[event] = [];\n\n\t\t\t\t\tfor (let e = 0, el = this.___events[event].length; e < el; e++) {\n\n\t\t\t\t\t\tlet entry = this.___events[event][e];\n\n\t\t\t\t\t\tblob.events[event].push({\n\t\t\t\t\t\t\tpass_event: entry.pass_event,\n\t\t\t\t\t\t\tpass_self:  entry.pass_self,\n\t\t\t\t\t\t\tcallback:   lychee.serialize(entry.callback),\n\t\t\t\t\t\t\t// scope:      lychee.serialize(entry.scope),\n\t\t\t\t\t\t\tscope:      null,\n\t\t\t\t\t\t\tonce:       entry.once\n\t\t\t\t\t\t});\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\tif (this.___timeline.bind.length > 0 || this.___timeline.trigger.length > 0 || this.___timeline.unbind.length > 0) {\n\n\t\t\t\tblob.timeline = {};\n\n\n\t\t\t\tif (this.___timeline.bind.length > 0) {\n\n\t\t\t\t\tblob.timeline.bind = [];\n\n\t\t\t\t\tfor (let b = 0, bl = this.___timeline.bind.length; b < bl; b++) {\n\t\t\t\t\t\tblob.timeline.bind.push(this.___timeline.bind[b]);\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t\tif (this.___timeline.trigger.length > 0) {\n\n\t\t\t\t\tblob.timeline.trigger = [];\n\n\t\t\t\t\tfor (let t = 0, tl = this.___timeline.trigger.length; t < tl; t++) {\n\t\t\t\t\t\tblob.timeline.trigger.push(this.___timeline.trigger[t]);\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t\tif (this.___timeline.unbind.length > 0) {\n\n\t\t\t\t\tblob.timeline.unbind = [];\n\n\t\t\t\t\tfor (let u = 0, ul = this.___timeline.unbind.length; u < ul; u++) {\n\t\t\t\t\t\tblob.timeline.unbind.push(this.___timeline.unbind[u]);\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\treturn {\n\t\t\t\t'constructor': 'lychee.event.Emitter',\n\t\t\t\t'arguments':   [],\n\t\t\t\t'blob':        Object.keys(blob).length > 0 ? blob : null\n\t\t\t};\n\n\t\t},\n\n\n\n\t\t/*\n\t\t * CUSTOM API\n\t\t */\n\n\t\tbind: function(event, callback, scope, once) {\n\n\t\t\tevent    = typeof event === 'string'    ? event    : null;\n\t\t\tcallback = callback instanceof Function ? callback : null;\n\t\t\tscope    = scope !== undefined          ? scope    : this;\n\t\t\tonce     = once === true;\n\n\n\t\t\tlet result = _bind.call(this, event, callback, scope, once);\n\t\t\tif (result === true && lychee.debug === true) {\n\n\t\t\t\tthis.___timeline.bind.push({\n\t\t\t\t\ttime:     Date.now(),\n\t\t\t\t\tevent:    event,\n\t\t\t\t\tcallback: lychee.serialize(callback),\n\t\t\t\t\t// scope:    lychee.serialize(scope),\n\t\t\t\t\tscope:    null,\n\t\t\t\t\tonce:     once\n\t\t\t\t});\n\n\t\t\t}\n\n\n\t\t\treturn result;\n\n\t\t},\n\n\t\trelay: function(event, instance, once) {\n\n\t\t\tevent    = typeof event === 'string'               ? event    : null;\n\t\t\tinstance = lychee.interfaceof(Composite, instance) ? instance : null;\n\t\t\tonce     = once === true;\n\n\n\t\t\tlet result = _relay.call(this, event, instance, once);\n\t\t\tif (result === true && lychee.debug === true) {\n\n\t\t\t\tthis.___timeline.relay.push({\n\t\t\t\t\ttime:     Date.now(),\n\t\t\t\t\tevent:    event,\n\t\t\t\t\tinstance: lychee.serialize(instance),\n\t\t\t\t\tonce:     once\n\t\t\t\t});\n\n\t\t\t}\n\n\n\t\t\treturn result;\n\n\t\t},\n\n\t\ttrigger: function(event, data) {\n\n\t\t\tevent = typeof event === 'string' ? event : null;\n\t\t\tdata  = data instanceof Array     ? data  : null;\n\n\n\t\t\tlet result = _trigger.call(this, event, data);\n\t\t\tif (result === true && lychee.debug === true) {\n\n\t\t\t\tthis.___timeline.trigger.push({\n\t\t\t\t\ttime:  Date.now(),\n\t\t\t\t\tevent: event,\n\t\t\t\t\tdata:  lychee.serialize(data)\n\t\t\t\t});\n\n\t\t\t}\n\n\n\t\t\treturn result;\n\n\t\t},\n\n\t\tunbind: function(event, callback, scope) {\n\n\t\t\tevent    = typeof event === 'string'    ? event    : null;\n\t\t\tcallback = callback instanceof Function ? callback : null;\n\t\t\tscope    = scope !== undefined          ? scope    : null;\n\n\n\t\t\tlet result = _unbind.call(this, event, callback, scope);\n\t\t\tif (result === true) {\n\n\t\t\t\tthis.___timeline.unbind.push({\n\t\t\t\t\ttime:     Date.now(),\n\t\t\t\t\tevent:    event,\n\t\t\t\t\tcallback: lychee.serialize(callback),\n\t\t\t\t\t// scope:    lychee.serialize(scope)\n\t\t\t\t\tscope:    null\n\t\t\t\t});\n\n\t\t\t}\n\n\n\t\t\treturn result;\n\n\t\t}\n\n\t};\n\n\n\treturn Composite;\n\n}"}},"strainer.flow.Check":{"constructor":"lychee.Definition","arguments":[{"id":"strainer.flow.Check","url":"/libraries/strainer/source/flow/Check.js"}],"blob":{"attaches":{},"requires":["lychee.Stash","strainer.api.PARSER","strainer.plugin.API","strainer.plugin.ESLINT"],"includes":["lychee.event.Flow"],"exports":"function (lychee, global, attachments) {\n\n\tconst _plugin    = {\n\t\tAPI:    lychee.import('strainer.plugin.API'),\n\t\tESLINT: lychee.import('strainer.plugin.ESLINT')\n\t};\n\tconst _Flow      = lychee.import('lychee.event.Flow');\n\tconst _Stash     = lychee.import('lychee.Stash');\n\tconst _PARSER    = lychee.import('strainer.api.PARSER');\n\tconst _PLATFORMS = lychee.PLATFORMS;\n\tconst _STASH     = new _Stash({\n\t\ttype: _Stash.TYPE.persistent\n\t});\n\n\n\n\t/*\n\t * HELPERS\n\t */\n\n\tconst _walk_directory = function(files, node, path, attachments) {\n\n\t\tif (node instanceof Array) {\n\n\t\t\tif (node.indexOf('js') !== -1) {\n\t\t\t\tfiles.push(path + '.js');\n\t\t\t}\n\n\t\t\tif (attachments === true) {\n\n\t\t\t\tnode.filter(function(ext) {\n\t\t\t\t\treturn ext !== 'js';\n\t\t\t\t}).forEach(function(ext) {\n\t\t\t\t\tfiles.push(path + '.' + ext);\n\t\t\t\t});\n\n\t\t\t}\n\n\t\t} else if (node instanceof Object) {\n\n\t\t\tObject.keys(node).forEach(function(child) {\n\t\t\t\t_walk_directory(files, node[child], path + '/' + child, attachments);\n\t\t\t});\n\n\t\t}\n\n\t};\n\n\tconst _trace_dependencies = function() {\n\n\t\tlet configs      = this.configs;\n\t\tlet dependencies = [];\n\n\t\tconfigs.filter(function(config) {\n\t\t\treturn config !== null;\n\t\t}).map(function(config) {\n\t\t\treturn config.buffer.header || { requires: [], includes: [] };\n\t\t}).forEach(function(header) {\n\n\t\t\tif (header.requires.length > 0) {\n\n\t\t\t\theader.requires.forEach(function(id) {\n\n\t\t\t\t\tif (dependencies.indexOf(id) === -1) {\n\t\t\t\t\t\tdependencies.push(id);\n\t\t\t\t\t}\n\n\t\t\t\t});\n\n\t\t\t}\n\n\t\t\tif (header.includes.length > 0) {\n\n\t\t\t\theader.includes.forEach(function(id) {\n\n\t\t\t\t\tif (dependencies.indexOf(id) === -1) {\n\t\t\t\t\t\tdependencies.push(id);\n\t\t\t\t\t}\n\n\t\t\t\t});\n\n\t\t\t}\n\n\t\t});\n\n\t\tdependencies = dependencies.filter(function(identifier) {\n\n\t\t\tlet config = configs.find(function(other) {\n\n\t\t\t\tlet buffer = other.buffer;\n\t\t\t\tif (buffer !== null) {\n\t\t\t\t\treturn identifier === buffer.header.identifier;\n\t\t\t\t}\n\n\t\t\t\treturn false;\n\n\t\t\t}) || null;\n\n\t\t\tif (config !== null) {\n\t\t\t\treturn false;\n\t\t\t}\n\n\t\t\treturn true;\n\n\t\t});\n\n\t\treturn dependencies;\n\n\t};\n\n\tconst _trace_memory = function(memory, chunk, scope) {\n\n\t\tscope = scope instanceof Object ? scope : null;\n\n\n\t\tlet values = [];\n\n\n\t\tif (chunk.startsWith('_')) {\n\n\t\t\tlet tmp      = chunk.split('.');\n\t\t\tlet variable = memory[tmp.shift()];\n\n\t\t\tif (variable !== undefined) {\n\n\t\t\t\tif (variable.value !== undefined) {\n\n\t\t\t\t\tlet identifier = variable.value.reference;\n\t\t\t\t\tlet config     = this.configs.find(function(other) {\n\n\t\t\t\t\t\tif (other !== null) {\n\n\t\t\t\t\t\t\tlet buffer = other.buffer;\n\t\t\t\t\t\t\tif (buffer !== null) {\n\t\t\t\t\t\t\t\treturn identifier === buffer.header.identifier;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\treturn false;\n\n\t\t\t\t\t}) || null;\n\n\t\t\t\t\tif (config !== null) {\n\n\t\t\t\t\t\tlet memory = config.buffer.memory;\n\t\t\t\t\t\tlet result = config.buffer.result;\n\t\t\t\t\t\tlet check  = tmp.shift();\n\n\t\t\t\t\t\tif (check === 'prototype') {\n\n\t\t\t\t\t\t\tlet mid    = tmp.shift();\n\t\t\t\t\t\t\tlet method = _trace_method.call(this, mid, config);\n\t\t\t\t\t\t\tif (method !== null) {\n\n\t\t\t\t\t\t\t\tif (method.values.length === 1) {\n\n\t\t\t\t\t\t\t\t\tlet value = method.values[0];\n\t\t\t\t\t\t\t\t\tif (value.type === 'undefined' && value.chunk !== undefined) {\n\t\t\t\t\t\t\t\t\t\treturn _trace_memory.call(this, memory, value.chunk, scope);\n\t\t\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\t\t\tvalues.push(value);\n\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t} else {\n\n\t\t\t\t\t\t\t\t\tfor (let v = 0, vl = method.values.length; v < vl; v++) {\n\t\t\t\t\t\t\t\t\t\tvalues.push(method.values[v]);\n\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t} else if (check === check.toUpperCase()) {\n\n\t\t\t\t\t\t\tlet enam = result.enums[check] || null;\n\t\t\t\t\t\t\tif (enam !== null) {\n\n\t\t\t\t\t\t\t\tlet name  = tmp.shift();\n\t\t\t\t\t\t\t\tlet value = enam.values.find(function(val) {\n\t\t\t\t\t\t\t\t\treturn val.name === name;\n\t\t\t\t\t\t\t\t}) || null;\n\n\t\t\t\t\t\t\t\tif (value !== null) {\n\n\t\t\t\t\t\t\t\t\tvalues.push({\n\t\t\t\t\t\t\t\t\t\tchunk: chunk,\n\t\t\t\t\t\t\t\t\t\ttype:  value.value.type,\n\t\t\t\t\t\t\t\t\t\tvalue: value.value.value\n\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t} else if (variable.values !== undefined) {\n\n\t\t\t\t\tlet check = tmp.shift();\n\t\t\t\t\tif (check.startsWith('call(') || check.startsWith('(')) {\n\n\t\t\t\t\t\tfor (let v = 0, vl = variable.values.length; v < vl; v++) {\n\t\t\t\t\t\t\tvalues.push(variable.values[v]);\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t} else if (chunk.startsWith('this.')) {\n\n\t\t\tlet path    = chunk.split('.').slice(1);\n\t\t\tlet pointer = scope[path[0]] || null;\n\t\t\tif (pointer !== null) {\n\n\t\t\t\tif (pointer.value !== undefined && pointer.value.type === 'Object') {\n\n\t\t\t\t\tlet tmp = pointer.value.value;\n\t\t\t\t\tif (tmp instanceof Object) {\n\n\t\t\t\t\t\tfor (let p = 1, pl = path.length; p < pl; p++) {\n\n\t\t\t\t\t\t\tlet prop = path[p];\n\t\t\t\t\t\t\tif (\n\t\t\t\t\t\t\t\t/^([A-Za-z0-9_]+)$/g.test(prop)\n\t\t\t\t\t\t\t\t&& pointer.value !== undefined\n\t\t\t\t\t\t\t\t&& pointer.value.type === 'Object'\n\t\t\t\t\t\t\t) {\n\n\t\t\t\t\t\t\t\tpointer = _PARSER.detect(pointer.value.value[prop]);\n\n\t\t\t\t\t\t\t} else {\n\n\t\t\t\t\t\t\t\tpointer = null;\n\t\t\t\t\t\t\t\tbreak;\n\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\n\t\t\t\tif (pointer !== null) {\n\t\t\t\t\tvalues.push(pointer);\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t}\n\n\n\t\treturn values;\n\n\t};\n\n\tconst _trace_method = function(mid, config) {\n\n\t\tlet configs = this.configs;\n\t\tlet header  = config.buffer.header;\n\t\tlet result  = config.buffer.result;\n\n\n\t\tlet found = null;\n\n\t\tif (result.methods[mid] !== undefined) {\n\n\t\t\tfound = result.methods[mid];\n\n\t\t} else {\n\n\t\t\tfor (let i = 0, il = header.includes.length; i < il; i++) {\n\n\t\t\t\tlet identifier = header.includes[i];\n\t\t\t\tlet definition = configs.find(function(other) {\n\n\t\t\t\t\tlet buffer = other.buffer;\n\t\t\t\t\tif (buffer !== null) {\n\t\t\t\t\t\treturn identifier === buffer.header.identifier;\n\t\t\t\t\t}\n\n\t\t\t\t\treturn false;\n\n\t\t\t\t}) || null;\n\n\t\t\t\tif (definition !== null) {\n\n\t\t\t\t\tlet check = _trace_method.call(this, mid, definition);\n\t\t\t\t\tif (check !== null) {\n\t\t\t\t\t\tfound = check;\n\t\t\t\t\t\tbreak;\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t}\n\n\t\treturn found;\n\n\t};\n\n\tconst _package_files = function(json) {\n\n\t\tlet files = [];\n\n\n\t\tif (json !== null) {\n\n\t\t\tlet root = json.source.files || null;\n\t\t\tif (root !== null) {\n\t\t\t\t_walk_directory(files, root, '', false);\n\t\t\t}\n\n\n\t\t\tfiles = files.map(function(value) {\n\t\t\t\treturn value.substr(1);\n\t\t\t}).filter(function(value) {\n\t\t\t\treturn value.endsWith('bootstrap.js') === false;\n\t\t\t}).filter(function(value) {\n\t\t\t\treturn value.endsWith('features.js') === false;\n\t\t\t}).filter(function(value) {\n\t\t\t\treturn value.indexOf('__') === -1;\n\t\t\t}).sort();\n\n\t\t}\n\n\n\t\treturn files;\n\n\t};\n\n\n\n\t/*\n\t * IMPLEMENTATION\n\t */\n\n\tconst Composite = function(data) {\n\n\t\tlet settings = Object.assign({}, data);\n\n\n\t\tthis.checks   = [];\n\t\tthis.codes    = [];\n\t\tthis.configs  = [];\n\t\tthis.errors   = [];\n\t\tthis.sandbox  = '';\n\t\tthis.settings = {};\n\t\tthis.stash    = new _Stash({\n\t\t\ttype: _Stash.TYPE.persistent\n\t\t});\n\n\t\tthis.__pkg      = null;\n\t\tthis.__packages = {};\n\n\n\t\tthis.setSandbox(settings.sandbox);\n\t\tthis.setSettings(settings.settings);\n\n\n\t\t_Flow.call(this);\n\n\t\tsettings = null;\n\n\n\n\t\t/*\n\t\t * INITIALIZATION\n\t\t */\n\n\t\tthis.bind('read', function(oncomplete) {\n\n\t\t\tlet that    = this;\n\t\t\tlet project = this.settings.project;\n\t\t\tlet sandbox = this.sandbox;\n\t\t\tlet stash   = this.stash;\n\n\t\t\tif (sandbox !== '' && stash !== null) {\n\n\t\t\t\tconsole.log('strainer: READ ' + project);\n\n\t\t\t\tthis.__pkg        = new Config(sandbox + '/lychee.pkg');\n\t\t\t\tthis.__pkg.onload = function(result) {\n\n\t\t\t\t\tif (result === true) {\n\n\t\t\t\t\t\tlet files = _package_files(this.buffer);\n\t\t\t\t\t\tif (files.length > 0) {\n\n\t\t\t\t\t\t\tstash.bind('batch', function(type, assets) {\n\n\t\t\t\t\t\t\t\tthis.codes = assets.filter(function(asset) {\n\t\t\t\t\t\t\t\t\treturn asset !== null;\n\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\toncomplete(true);\n\n\t\t\t\t\t\t\t}, that, true);\n\n\t\t\t\t\t\t\tstash.batch('read', files.map(function(value) {\n\t\t\t\t\t\t\t\treturn sandbox + '/source/' + value;\n\t\t\t\t\t\t\t}));\n\n\t\t\t\t\t\t} else {\n\n\t\t\t\t\t\t\toncomplete(false);\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t} else {\n\n\t\t\t\t\t\toncomplete(false);\n\n\t\t\t\t\t}\n\n\t\t\t\t};\n\n\t\t\t\tthis.__pkg.load();\n\n\t\t\t} else {\n\n\t\t\t\toncomplete(false);\n\n\t\t\t}\n\n\t\t}, this);\n\n\t\tthis.bind('check-eslint', function(oncomplete) {\n\n\t\t\tlet eslint  = _plugin.ESLINT || null;\n\t\t\tlet errors  = this.errors;\n\t\t\tlet project = this.settings.project;\n\n\t\t\tif (eslint !== null) {\n\n\t\t\t\tconsole.log('strainer: CHECK-ESLINT ' + project);\n\n\t\t\t\tthis.checks = this.codes.map(function(asset) {\n\n\t\t\t\t\tlet result         = [];\n\t\t\t\t\tlet eslint_report  = _plugin.ESLINT.check(asset);\n\t\t\t\t\tlet eslint_unfixed = _plugin.ESLINT.fix(asset, eslint_report);\n\n\t\t\t\t\tif (eslint_report.length > 0 && eslint_unfixed.length === 0) {\n\n\t\t\t\t\t\treturn result;\n\n\t\t\t\t\t} else if (eslint_unfixed.length > 0) {\n\n\t\t\t\t\t\teslint_unfixed.map(function(err) {\n\n\t\t\t\t\t\t\treturn {\n\t\t\t\t\t\t\t\turl:     asset.url,\n\t\t\t\t\t\t\t\trule:    err.ruleId  || 'parser-error',\n\t\t\t\t\t\t\t\tline:    err.line    || 0,\n\t\t\t\t\t\t\t\tcolumn:  err.column  || 0,\n\t\t\t\t\t\t\t\tmessage: err.message || ''\n\t\t\t\t\t\t\t};\n\n\t\t\t\t\t\t}).forEach(function(err) {\n\n\t\t\t\t\t\t\tresult.push(err);\n\t\t\t\t\t\t\terrors.push(err);\n\n\t\t\t\t\t\t});\n\n\n\t\t\t\t\t\treturn result;\n\n\t\t\t\t\t}\n\n\n\t\t\t\t\treturn null;\n\n\t\t\t\t});\n\n\n\t\t\t\toncomplete(true);\n\n\t\t\t} else {\n\n\t\t\t\toncomplete(false);\n\n\t\t\t}\n\n\t\t}, this);\n\n\t\tthis.bind('check-api', function(oncomplete) {\n\n\t\t\tlet api     = _plugin.API || null;\n\t\t\tlet errors  = this.errors;\n\t\t\tlet project = this.settings.project;\n\n\t\t\tif (api !== null) {\n\n\t\t\t\tconsole.log('strainer: CHECK-API ' + project);\n\n\n\t\t\t\tthis.configs = this.codes.map(function(asset) {\n\n\t\t\t\t\tlet result      = [];\n\t\t\t\t\tlet api_report  = _plugin.API.check(asset);\n\t\t\t\t\tlet api_unfixed = _plugin.API.fix(asset, api_report);\n\n\t\t\t\t\tif (api_report !== null) {\n\n\t\t\t\t\t\tif (api_unfixed.length > 0) {\n\n\t\t\t\t\t\t\tapi_unfixed.forEach(function(err) {\n\n\t\t\t\t\t\t\t\tresult.push(err);\n\t\t\t\t\t\t\t\terrors.push(err);\n\n\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\tapi_report.errors = result;\n\n\t\t\t\t\t\t}\n\n\n\t\t\t\t\t\tif (asset.url.includes('/source/')) {\n\n\t\t\t\t\t\t\tlet url    = asset.url.replace(/source/, 'api').replace(/\\.js$/, '.json');\n\t\t\t\t\t\t\tlet config = new lychee.Asset(url, 'json', true);\n\t\t\t\t\t\t\tif (config !== null) {\n\t\t\t\t\t\t\t\tconfig.buffer = api_report;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\treturn config;\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\n\t\t\t\t\treturn null;\n\n\t\t\t\t});\n\n\n\t\t\t\toncomplete(true);\n\n\t\t\t} else {\n\n\t\t\t\toncomplete(false);\n\n\t\t\t}\n\n\t\t}, this);\n\n\t\tthis.bind('trace-pkgs', function(oncomplete) {\n\n\t\t\tlet errors  = this.errors;\n\t\t\tlet pkg     = this.__pkg;\n\t\t\tlet project = this.settings.project;\n\t\t\tlet sandbox = this.sandbox;\n\n\t\t\tif (pkg !== null) {\n\n\t\t\t\tconsole.log('strainer: TRACE-PKGS ' + project);\n\n\n\t\t\t\tlet packages     = this.__packages;\n\t\t\t\tlet environments = pkg.buffer.build.environments || null;\n\t\t\t\tif (environments !== null) {\n\n\t\t\t\t\tfor (let id in environments) {\n\n\t\t\t\t\t\tlet pkgs = environments[id].packages || null;\n\t\t\t\t\t\tif (pkgs instanceof Array) {\n\n\t\t\t\t\t\t\terrors.push({\n\t\t\t\t\t\t\t\turl:     pkg.url,\n\t\t\t\t\t\t\t\trule:    'pkg-error',\n\t\t\t\t\t\t\t\tline:    0,\n\t\t\t\t\t\t\t\tcolumn:  0,\n\t\t\t\t\t\t\t\tmessage: 'Invalid settings for Environment \"' + id + '\" (Invalid packages).'\n\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t} else if (pkgs instanceof Object) {\n\n\t\t\t\t\t\t\tfor (let ns in pkgs) {\n\n\t\t\t\t\t\t\t\tlet url = pkgs[ns];\n\t\t\t\t\t\t\t\tif (url === './lychee.pkg') {\n\t\t\t\t\t\t\t\t\turl = sandbox + '/lychee.pkg';\n\t\t\t\t\t\t\t\t}\n\n\n\t\t\t\t\t\t\t\tif (packages[ns] === undefined) {\n\n\t\t\t\t\t\t\t\t\tpackages[ns] = new lychee.Package({\n\t\t\t\t\t\t\t\t\t\tid:  ns,\n\t\t\t\t\t\t\t\t\t\turl: url\n\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t} else if (packages[ns].url !== url) {\n\n\t\t\t\t\t\t\t\t\terrors.push({\n\t\t\t\t\t\t\t\t\t\turl:     pkg.url,\n\t\t\t\t\t\t\t\t\t\trule:    'pkg-error',\n\t\t\t\t\t\t\t\t\t\tline:    0,\n\t\t\t\t\t\t\t\t\t\tcolumn:  0,\n\t\t\t\t\t\t\t\t\t\tmessage: 'Invalid settings for Package \"' + ns + '\" in Environment \"' + id + '\" (Invalid url).'\n\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\n\t\t\t\tif (packages['lychee'] === undefined) {\n\t\t\t\t\tpackages['lychee'] = new lychee.Package({\n\t\t\t\t\t\tid:  'lychee',\n\t\t\t\t\t\turl: '/libraries/lychee/lychee.pkg'\n\t\t\t\t\t});\n\t\t\t\t}\n\n\n\t\t\t\tlet interval_end = Date.now() + 1000;\n\t\t\t\tlet interval_id  = setInterval(function() {\n\n\t\t\t\t\tlet all_ready = true;\n\n\t\t\t\t\tfor (let ns in packages) {\n\n\t\t\t\t\t\tlet pkg = packages[ns];\n\t\t\t\t\t\tif (pkg.config === null) {\n\t\t\t\t\t\t\tall_ready = false;\n\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\n\t\t\t\t\tif (all_ready === true) {\n\n\t\t\t\t\t\tclearInterval(interval_id);\n\t\t\t\t\t\toncomplete(true);\n\n\t\t\t\t\t} else if (Date.now() > interval_end) {\n\n\t\t\t\t\t\tfor (let ns in packages) {\n\n\t\t\t\t\t\t\tlet pkg = packages[ns];\n\t\t\t\t\t\t\tif (pkg.config === null) {\n\n\t\t\t\t\t\t\t\terrors.push({\n\t\t\t\t\t\t\t\t\turl:     pkg.url,\n\t\t\t\t\t\t\t\t\trule:    'pkg-error',\n\t\t\t\t\t\t\t\t\tline:    0,\n\t\t\t\t\t\t\t\t\tcolumn:  0,\n\t\t\t\t\t\t\t\t\tmessage: 'Invalid Package \"' + ns + '\".'\n\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tclearInterval(interval_id);\n\t\t\t\t\t\toncomplete(true);\n\n\t\t\t\t\t}\n\n\t\t\t\t}, 100);\n\n\t\t\t} else {\n\n\t\t\t\toncomplete(false);\n\n\t\t\t}\n\n\t\t}, this);\n\n\n\t\tthis.bind('trace-deps', function(oncomplete) {\n\n\t\t\tlet packages = this.__packages;\n\t\t\tlet project  = this.settings.project;\n\t\t\tlet stash    = this.stash;\n\n\t\t\tif (stash !== null) {\n\n\t\t\t\tlet dependencies = _trace_dependencies.call(this);\n\t\t\t\tif (dependencies.length > 0) {\n\n\t\t\t\t\tconsole.log('strainer: TRACE-DEPS ' + project + ' (' + dependencies.length + ')');\n\n\n\t\t\t\t\tlet candidates = [];\n\n\t\t\t\t\tdependencies.forEach(function(identifier) {\n\n\t\t\t\t\t\tlet ns  = identifier.split('.')[0];\n\t\t\t\t\t\tlet id  = identifier.split('.').slice(1).join('.');\n\t\t\t\t\t\tlet pkg = packages[ns] || null;\n\t\t\t\t\t\tif (pkg !== null) {\n\n\t\t\t\t\t\t\tlet prefix = pkg.url.split('/').slice(0, -1).join('/');\n\t\t\t\t\t\t\tlet found  = false;\n\n\t\t\t\t\t\t\tlet resolved = pkg.resolve(id, null);\n\t\t\t\t\t\t\tif (resolved.length > 0) {\n\t\t\t\t\t\t\t\tcandidates.push(prefix + '/api/' + resolved[0] + '.json');\n\t\t\t\t\t\t\t\tfound = true;\n\t\t\t\t\t\t\t}\n\n\n\t\t\t\t\t\t\tif (found === false) {\n\n\t\t\t\t\t\t\t\tresolved = pkg.resolve(id, {\n\t\t\t\t\t\t\t\t\tplatforms: _PLATFORMS\n\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\tif (resolved.length > 0) {\n\n\t\t\t\t\t\t\t\t\tresolved.forEach(function(path) {\n\t\t\t\t\t\t\t\t\t\tcandidates.push(prefix + '/api/' + path + '.json');\n\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t});\n\n\n\t\t\t\t\tif (candidates.length > 0) {\n\n\t\t\t\t\t\tstash.bind('batch', function(type, assets) {\n\n\t\t\t\t\t\t\tfor (let a = 0, al = assets.length; a < al; a++) {\n\n\t\t\t\t\t\t\t\tlet asset = assets[a];\n\t\t\t\t\t\t\t\tif (asset !== null && asset.buffer !== null) {\n\t\t\t\t\t\t\t\t\tthis.configs.push(asset);\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\tsetTimeout(function() {\n\n\t\t\t\t\t\t\t\tlet unknown_deps = _trace_dependencies.call(this).filter(function(dependency) {\n\t\t\t\t\t\t\t\t\treturn dependencies.includes(dependency) === false;\n\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\tif (unknown_deps.length > 0) {\n\n\t\t\t\t\t\t\t\t\tthis.trigger('trace-deps', [ oncomplete ]);\n\n\t\t\t\t\t\t\t\t} else {\n\n\t\t\t\t\t\t\t\t\toncomplete(true);\n\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t}.bind(this), 100);\n\n\t\t\t\t\t\t}, this, true);\n\n\t\t\t\t\t\tstash.batch('read', candidates);\n\n\t\t\t\t\t} else {\n\n\t\t\t\t\t\toncomplete(true);\n\n\t\t\t\t\t}\n\n\t\t\t\t} else {\n\n\t\t\t\t\toncomplete(true);\n\n\t\t\t\t}\n\n\t\t\t} else {\n\n\t\t\t\toncomplete(false);\n\n\t\t\t}\n\n\t\t}, this);\n\n\t\tthis.bind('trace-api', function(oncomplete) {\n\n\t\t\tlet that    = this;\n\t\t\tlet errors  = this.errors;\n\t\t\tlet configs = this.configs;\n\t\t\tlet project = this.settings.project;\n\n\t\t\tif (configs.length > 0) {\n\n\t\t\t\tconsole.log('strainer: TRACE-API ' + project);\n\n\n\t\t\t\tconfigs.filter(function(config) {\n\t\t\t\t\treturn config !== null;\n\t\t\t\t}).forEach(function(config) {\n\n\t\t\t\t\tlet result     = config.buffer.result;\n\t\t\t\t\tlet memory     = config.buffer.memory;\n\t\t\t\t\tlet methods    = result.methods    || {};\n\t\t\t\t\tlet properties = result.properties || {};\n\t\t\t\t\tlet scope      = properties;\n\n\t\t\t\t\tfor (let pid in properties) {\n\n\t\t\t\t\t\tlet value = properties[pid].value;\n\t\t\t\t\t\tif (value.type === 'undefined' && value.chunk !== undefined) {\n\n\t\t\t\t\t\t\tlet references = _trace_memory.call(that, memory, value.chunk, scope);\n\t\t\t\t\t\t\tif (references.length === 1) {\n\n\t\t\t\t\t\t\t\tproperties[pid].value = references[0];\n\n\n\t\t\t\t\t\t\t\tlet error = config.buffer.errors.find(function(err) {\n\t\t\t\t\t\t\t\t\treturn err.rule === 'unguessable-property-value' && err.message.includes('\"' + pid + '\"');\n\t\t\t\t\t\t\t\t}) || null;\n\n\t\t\t\t\t\t\t\tif (error !== null) {\n\n\t\t\t\t\t\t\t\t\tlet e0 = errors.indexOf(error);\n\t\t\t\t\t\t\t\t\tlet e1 = config.buffer.errors.indexOf(error);\n\n\t\t\t\t\t\t\t\t\tif (e0 !== -1) {\n\t\t\t\t\t\t\t\t\t\terrors.splice(e0, 1);\n\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\tif (e1 !== -1) {\n\t\t\t\t\t\t\t\t\t\tconfig.buffer.errors.splice(e1, 1);\n\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\n\t\t\t\t\tfor (let mid in methods) {\n\n\t\t\t\t\t\tlet values = methods[mid].values;\n\t\t\t\t\t\tif (values.length > 0) {\n\n\t\t\t\t\t\t\tfor (let v = 0, vl = values.length; v < vl; v++) {\n\n\t\t\t\t\t\t\t\tlet value = values[v];\n\t\t\t\t\t\t\t\tif (value.type === 'undefined' && value.chunk !== undefined) {\n\n\t\t\t\t\t\t\t\t\tlet references = _trace_memory.call(that, memory, value.chunk, scope);\n\t\t\t\t\t\t\t\t\tif (references.length > 0) {\n\n\t\t\t\t\t\t\t\t\t\tvalues.splice(v, 1);\n\t\t\t\t\t\t\t\t\t\tvl--;\n\t\t\t\t\t\t\t\t\t\tv--;\n\n\t\t\t\t\t\t\t\t\t\tfor (let r = 0, rl = references.length; r < rl; r++) {\n\n\t\t\t\t\t\t\t\t\t\t\tlet reference = references[r];\n\t\t\t\t\t\t\t\t\t\t\tif (values.indexOf(reference) === -1) {\n\t\t\t\t\t\t\t\t\t\t\t\tvalues.push(reference);\n\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t}\n\n\n\t\t\t\t\t\t\t\t\t\tlet error = config.buffer.errors.find(function(err) {\n\t\t\t\t\t\t\t\t\t\t\treturn err.rule === 'unguessable-return-value' && err.message.includes('\"' + mid + '()\"');\n\t\t\t\t\t\t\t\t\t\t}) || null;\n\n\t\t\t\t\t\t\t\t\t\tif (error !== null) {\n\n\t\t\t\t\t\t\t\t\t\t\tlet e0 = errors.indexOf(error);\n\t\t\t\t\t\t\t\t\t\t\tlet e1 = config.buffer.errors.indexOf(error);\n\n\t\t\t\t\t\t\t\t\t\t\tif (e0 !== -1) {\n\t\t\t\t\t\t\t\t\t\t\t\terrors.splice(e0, 1);\n\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\tif (e1 !== -1) {\n\t\t\t\t\t\t\t\t\t\t\t\tconfig.buffer.errors.splice(e1, 1);\n\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t});\n\n\t\t\t}\n\n\n\t\t\toncomplete(true);\n\n\t\t}, this);\n\n\t\tthis.bind('clean-deps', function(oncomplete) {\n\n\t\t\tlet configs = this.configs;\n\t\t\tlet project = this.settings.project;\n\t\t\tlet sandbox = this.sandbox;\n\n\n\t\t\tlet cleaned_deps = 0;\n\n\t\t\tfor (let c = 0, cl = configs.length; c < cl; c++) {\n\n\t\t\t\tlet config = configs[c];\n\t\t\t\tif (config !== null) {\n\n\t\t\t\t\tif (config.url.startsWith(sandbox) === false) {\n\n\t\t\t\t\t\tcleaned_deps++;\n\t\t\t\t\t\tconfigs.splice(c, 1);\n\t\t\t\t\t\tcl--;\n\t\t\t\t\t\tc--;\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t\tconsole.log('strainer: CLEAN-DEPS ' + project + ' (' + cleaned_deps + ')');\n\n\n\t\t\toncomplete(true);\n\n\t\t}, this);\n\n\t\tthis.bind('write-codes', function(oncomplete) {\n\n\t\t\tlet project = this.settings.project;\n\t\t\tlet stash   = this.stash;\n\n\t\t\tif (project !== null && stash !== null) {\n\n\t\t\t\tconsole.log('strainer: WRITE-CODES ' + project);\n\n\n\t\t\t\tlet codes = this.codes.filter(function(code, c) {\n\t\t\t\t\treturn code._MODIFIED === true;\n\t\t\t\t});\n\n\t\t\t\tif (codes.length > 0) {\n\n\t\t\t\t\tstash.bind('batch', function(type, assets) {\n\n\t\t\t\t\t\tif (assets.length === codes.length) {\n\t\t\t\t\t\t\toncomplete(true);\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\toncomplete(false);\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}, this, true);\n\n\t\t\t\t\tstash.batch('write', codes.map(function(code) {\n\t\t\t\t\t\treturn code.url;\n\t\t\t\t\t}), codes);\n\n\t\t\t\t} else {\n\n\t\t\t\t\toncomplete(true);\n\n\t\t\t\t}\n\n\t\t\t} else {\n\n\t\t\t\toncomplete(false);\n\n\t\t\t}\n\n\t\t}, this);\n\n\t\tthis.bind('write-api', function(oncomplete) {\n\n\t\t\tlet project = this.settings.project;\n\t\t\tlet stash   = this.stash;\n\n\t\t\tif (project !== null && stash !== null) {\n\n\t\t\t\tconsole.log('strainer: WRITE-API ' + project);\n\n\n\t\t\t\tlet configs = this.configs.filter(function(config) {\n\t\t\t\t\treturn config !== null;\n\t\t\t\t});\n\n\t\t\t\tif (configs.length > 0) {\n\n\t\t\t\t\tstash.bind('batch', function(type, assets) {\n\n\t\t\t\t\t\tif (assets.length === configs.length) {\n\t\t\t\t\t\t\toncomplete(true);\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\toncomplete(false);\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}, this, true);\n\n\t\t\t\t\tstash.batch('write', configs.map(function(config) {\n\t\t\t\t\t\treturn config.url;\n\t\t\t\t\t}), configs);\n\n\t\t\t\t} else {\n\n\t\t\t\t\toncomplete(true);\n\n\t\t\t\t}\n\n\t\t\t} else {\n\n\t\t\t\toncomplete(false);\n\n\t\t\t}\n\n\t\t}, this);\n\n\t\tthis.bind('write-pkg', function(oncomplete) {\n\n\t\t\tlet project = this.settings.project;\n\t\t\tlet stash   = this.stash;\n\n\t\t\tif (project !== null && stash !== null) {\n\n\t\t\t\tconsole.log('strainer: WRITE-PKG ' + project);\n\n\n\t\t\t\tlet configs = this.configs.filter(function(config) {\n\t\t\t\t\treturn config !== null;\n\t\t\t\t});\n\n\n\t\t\t\tif (configs.length > 0) {\n\n\t\t\t\t\tlet index = stash.read(project + '/api/strainer.pkg');\n\n\t\t\t\t\tindex.onload = function(result) {\n\n\t\t\t\t\t\tif (result === false) {\n\t\t\t\t\t\t\tthis.buffer = {};\n\t\t\t\t\t\t}\n\n\n\t\t\t\t\t\tlet buffer = this.buffer;\n\n\t\t\t\t\t\tfor (let c = 0, cl = configs.length; c < cl; c++) {\n\n\t\t\t\t\t\t\tlet config     = configs[c];\n\t\t\t\t\t\t\tlet identifier = config.buffer.header.identifier;\n\t\t\t\t\t\t\tlet knowledge  = {};\n\t\t\t\t\t\t\tlet result     = config.buffer.result;\n\n\n\t\t\t\t\t\t\tknowledge.settings   = Object.keys(result.settings);\n\t\t\t\t\t\t\tknowledge.properties = Object.keys(result.properties);\n\t\t\t\t\t\t\tknowledge.enums      = Object.keys(result.enums);\n\t\t\t\t\t\t\tknowledge.events     = Object.keys(result.events);\n\t\t\t\t\t\t\tknowledge.methods    = Object.keys(result.methods).map(function(mid) {\n\t\t\t\t\t\t\t\treturn [ mid, result.methods[mid].hash ];\n\t\t\t\t\t\t\t});\n\n\n\t\t\t\t\t\t\tbuffer[config.url] = {\n\t\t\t\t\t\t\t\tidentifier: identifier,\n\t\t\t\t\t\t\t\ttimestamp:  Date.now(),\n\t\t\t\t\t\t\t\tknowledge:  knowledge\n\t\t\t\t\t\t\t};\n\n\t\t\t\t\t\t}\n\n\n\t\t\t\t\t\tstash.write(index.url, index);\n\t\t\t\t\t\tstash.sync();\n\n\t\t\t\t\t\toncomplete(true);\n\n\t\t\t\t\t};\n\n\t\t\t\t\tindex.load();\n\n\t\t\t\t} else {\n\n\t\t\t\t\toncomplete(true);\n\n\t\t\t\t}\n\n\t\t\t} else {\n\n\t\t\t\toncomplete(false);\n\n\t\t\t}\n\n\t\t}, this);\n\n\n\n\t\t/*\n\t\t * FLOW\n\t\t */\n\n\t\tthis.then('read');\n\n\t\tthis.then('check-eslint');\n\t\tthis.then('check-api');\n\n\t\tthis.then('trace-pkgs');\n\t\tthis.then('trace-deps');\n\t\tthis.then('trace-api');\n\t\tthis.then('clean-deps');\n\n\t\tthis.then('write-codes');\n\t\tthis.then('write-api');\n\t\tthis.then('write-pkg');\n\n\t};\n\n\n\tComposite.prototype = {\n\n\t\t/*\n\t\t * ENTITY API\n\t\t */\n\n\t\tdeserialize: function(blob) {\n\n\t\t\tif (blob.codes instanceof Array) {\n\n\t\t\t\tlet codes = [];\n\n\t\t\t\tfor (let bc1 = 0, bc1l = blob.codes.length; bc1 < bc1l; bc1++) {\n\t\t\t\t\tcodes.push(lychee.deserialize(blob.codes[bc1]));\n\t\t\t\t}\n\n\t\t\t\tif (codes.length > 0) {\n\n\t\t\t\t\tthis.codes = codes.filter(function(asset) {\n\t\t\t\t\t\treturn asset !== null;\n\t\t\t\t\t});\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\tif (blob.configs instanceof Array) {\n\n\t\t\t\tlet configs = [];\n\n\t\t\t\tfor (let bc2 = 0, bc2l = blob.configs.length; bc2 < bc2l; bc2++) {\n\t\t\t\t\tconfigs.push(lychee.deserialize(blob.codes[bc2]));\n\t\t\t\t}\n\n\t\t\t\tif (configs.length > 0) {\n\n\t\t\t\t\tthis.configs = configs.filter(function(asset) {\n\t\t\t\t\t\treturn asset !== null;\n\t\t\t\t\t});\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\tlet stash = lychee.deserialize(blob.stash);\n\t\t\tif (stash !== null) {\n\t\t\t\tthis.stash = stash;\n\t\t\t}\n\n\t\t},\n\n\t\tserialize: function() {\n\n\t\t\tlet data = _Flow.prototype.serialize.call(this);\n\t\t\tdata['constructor'] = 'strainer.flow.Check';\n\n\n\t\t\tlet settings = data['arguments'][0] || {};\n\t\t\tlet blob     = data['blob'] || {};\n\n\n\t\t\tif (this.sandbox !== '')                   settings.sandbox  = this.sandbox;\n\t\t\tif (Object.keys(this.settings).length > 0) settings.settings = this.settings;\n\n\n\t\t\tif (this.stash !== null)     blob.stash   = lychee.serialize(this.stash);\n\t\t\tif (this.codes.length > 0)   blob.codes   = this.codes.map(lychee.serialize);\n\t\t\tif (this.configs.length > 0) blob.configs = this.configs.map(lychee.serialize);\n\n\n\t\t\tdata['arguments'][0] = settings;\n\t\t\tdata['blob']         = Object.keys(blob).length > 0 ? blob : null;\n\n\n\t\t\treturn data;\n\n\t\t},\n\n\n\n\t\t/*\n\t\t * CUSTOM API\n\t\t */\n\n\t\tsetSandbox: function(sandbox) {\n\n\t\t\tsandbox = typeof sandbox === 'string' ? sandbox : null;\n\n\n\t\t\tif (sandbox !== null) {\n\n\t\t\t\tthis.sandbox = sandbox;\n\n\n\t\t\t\treturn true;\n\n\t\t\t}\n\n\n\t\t\treturn false;\n\n\t\t},\n\n\t\tsetSettings: function(settings) {\n\n\t\t\tsettings = settings instanceof Object ? settings : null;\n\n\n\t\t\tif (settings !== null) {\n\n\t\t\t\tthis.settings = settings;\n\n\t\t\t\treturn true;\n\n\t\t\t}\n\n\n\t\t\treturn false;\n\n\t\t}\n\n\t};\n\n\n\treturn Composite;\n\n}"}},"lychee.event.Flow":{"constructor":"lychee.Definition","arguments":[{"id":"lychee.event.Flow","url":"/libraries/lychee/source/event/Flow.js"}],"blob":{"attaches":{},"includes":["lychee.event.Emitter"],"exports":"function (lychee, global, attachments) {\n\n\tconst _Emitter = lychee.import('lychee.event.Emitter');\n\n\n\n\t/*\n\t * HELPERS\n\t */\n\n\tconst _process_recursive = function(event, result) {\n\n\t\tif (result === true) {\n\n\t\t\tif (this.___timeout === null) {\n\n\t\t\t\tthis.___timeout = setTimeout(function() {\n\n\t\t\t\t\tthis.___timeout = null;\n\t\t\t\t\t_process_stack.call(this);\n\n\t\t\t\t}.bind(this), 0);\n\n\t\t\t}\n\n\t\t} else {\n\n\t\t\tthis.trigger('error', [ event ]);\n\n\t\t}\n\n\t};\n\n\tconst _process_stack = function() {\n\n\t\tlet entry = this.___stack.shift() || null;\n\t\tif (entry !== null) {\n\n\t\t\tlet data  = entry.data;\n\t\t\tlet event = entry.event;\n\t\t\tlet args  = [ event, [] ];\n\n\t\t\tif (data !== null) {\n\t\t\t\targs[1].push.apply(args[1], data);\n\t\t\t}\n\n\t\t\targs[1].push(_process_recursive.bind(this, event));\n\n\n\t\t\tlet result = this.trigger.apply(this, args);\n\t\t\tif (result === false) {\n\t\t\t\tthis.trigger('error', [ event ]);\n\t\t\t}\n\n\t\t} else {\n\n\t\t\tthis.trigger('complete');\n\n\t\t}\n\n\t};\n\n\n\n\t/*\n\t * IMPLEMENTATION\n\t */\n\n\tconst Composite = function() {\n\n\t\tthis.___init    = false;\n\t\tthis.___stack   = [];\n\t\tthis.___timeout = null;\n\n\t\t_Emitter.call(this);\n\n\t};\n\n\n\tComposite.prototype = {\n\n\t\t/*\n\t\t * ENTITY API\n\t\t */\n\n\t\t// deserialize: function(blob) {},\n\n\t\tserialize: function() {\n\n\t\t\tlet data = _Emitter.prototype.serialize.call(this);\n\t\t\tdata['constructor'] = 'lychee.event.Flow';\n\n\t\t\tlet blob = (data['blob'] || {});\n\n\n\t\t\tif (this.___stack.length > 0) {\n\n\t\t\t\tblob.stack = [];\n\n\t\t\t\tfor (let s = 0, sl = this.___stack.length; s < sl; s++) {\n\n\t\t\t\t\tlet entry = this.___stack[s];\n\n\t\t\t\t\tblob.stack.push({\n\t\t\t\t\t\tevent: entry.event,\n\t\t\t\t\t\tdata:  lychee.serialize(entry.data)\n\t\t\t\t\t});\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\tdata['blob'] = Object.keys(blob).length > 0 ? blob : null;\n\n\n\t\t\treturn data;\n\n\t\t},\n\n\n\n\t\t/*\n\t\t * CUSTOM API\n\t\t */\n\n\t\tthen: function(event, data) {\n\n\t\t\tevent = typeof event === 'string' ? event : null;\n\t\t\tdata  = data instanceof Array     ? data  : null;\n\n\n\t\t\tif (event !== null) {\n\n\t\t\t\tthis.___stack.push({\n\t\t\t\t\tevent: event,\n\t\t\t\t\tdata:  data\n\t\t\t\t});\n\n\t\t\t\treturn true;\n\n\t\t\t}\n\n\n\t\t\treturn false;\n\n\t\t},\n\n\t\tinit: function() {\n\n\t\t\tif (this.___init === false) {\n\n\t\t\t\tthis.___init = true;\n\n\n\t\t\t\tif (this.___stack.length > 0) {\n\n\t\t\t\t\t_process_stack.call(this);\n\n\t\t\t\t\treturn true;\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\treturn false;\n\n\t\t}\n\n\t};\n\n\n\treturn Composite;\n\n}"}},"strainer.flow.Transcribe":{"constructor":"lychee.Definition","arguments":[{"id":"strainer.flow.Transcribe","url":"/libraries/strainer/source/flow/Transcribe.js"}],"blob":{"attaches":{},"requires":["lychee.Stash","strainer.api.PARSER","strainer.plugin.API"],"includes":["lychee.event.Flow"],"exports":"function (lychee, global, attachments) {\n\n\tconst _plugin = {\n\t\tAPI: lychee.import('strainer.plugin.API')\n\t};\n\tconst _Flow   = lychee.import('lychee.event.Flow');\n\tconst _Stash  = lychee.import('lychee.Stash');\n\tconst _PARSER = lychee.import('strainer.api.PARSER');\n\tconst _STASH  = new _Stash({\n\t\ttype: _Stash.TYPE.persistent\n\t});\n\n\n\n\t/*\n\t * HELPERS\n\t */\n\n\tconst _walk_directory = function(files, node, path) {\n\n\t\tif (node instanceof Array) {\n\n\t\t\tif (node.indexOf('json') !== -1) {\n\t\t\t\tfiles.push(path + '.json');\n\t\t\t}\n\n\t\t} else if (node instanceof Object) {\n\n\t\t\tObject.keys(node).forEach(function(child) {\n\t\t\t\t_walk_directory(files, node[child], path + '/' + child);\n\t\t\t});\n\n\t\t}\n\n\t};\n\n\tconst _package_files = function(json) {\n\n\t\tlet files = [];\n\n\n\t\tif (json !== null) {\n\n\t\t\tlet root = json.api.files || null;\n\t\t\tif (root !== null) {\n\t\t\t\t_walk_directory(files, root, '');\n\t\t\t}\n\n\n\t\t\tfiles = files.map(function(value) {\n\t\t\t\treturn value.substr(1);\n\t\t\t}).filter(function(value) {\n\t\t\t\treturn value.startsWith('core') === false;\n\t\t\t}).filter(function(value) {\n\t\t\t\treturn value.startsWith('platform') === false;\n\t\t\t}).filter(function(value) {\n\t\t\t\treturn value.indexOf('__') === -1;\n\t\t\t}).sort();\n\n\t\t}\n\n\n\t\treturn files;\n\n\t};\n\n\n\n\t/*\n\t * IMPLEMENTATIONS\n\t */\n\n\tconst Composite = function(data) {\n\n\t\tlet settings = Object.assign({}, data);\n\n\n\t\tthis.codes    = [];\n\t\tthis.configs  = [];\n\t\tthis.errors   = [];\n\t\tthis.sandbox  = '';\n\t\tthis.settings = {};\n\t\tthis.stash    = new _Stash({\n\t\t\ttype: _Stash.TYPE.persistent\n\t\t});\n\n\n\t\tthis.__pkg = null;\n\n\n\t\tthis.setSandbox(settings.sandbox);\n\t\tthis.setSettings(settings.settings);\n\n\n\t\t_Flow.call(this, settings);\n\n\t\tsettings = null;\n\n\n\n\t\t/*\n\t\t * INITIALIZATION\n\t\t */\n\n\t\tthis.bind('read', function(oncomplete) {\n\n\t\t\tlet that    = this;\n\t\t\tlet library = this.settings.library;\n\t\t\tlet stash   = this.stash;\n\n\t\t\tif (library !== null && stash !== null) {\n\n\t\t\t\tconsole.log('strainer: READ ' + library);\n\n\n\t\t\t\tthis.__pkg        = new Config(library + '/lychee.pkg');\n\t\t\t\tthis.__pkg.onload = function(result) {\n\n\t\t\t\t\tif (result === true) {\n\n\t\t\t\t\t\tlet files = _package_files(this.buffer);\n\t\t\t\t\t\tif (files.length > 0) {\n\n\t\t\t\t\t\t\tstash.bind('batch', function(type, assets) {\n\n\t\t\t\t\t\t\t\tthis.configs = assets.filter(function(asset) {\n\t\t\t\t\t\t\t\t\treturn asset !== null;\n\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\toncomplete(true);\n\n\t\t\t\t\t\t\t}, that, true);\n\n\t\t\t\t\t\t\tstash.batch('read', files.map(function(value) {\n\t\t\t\t\t\t\t\treturn library + '/api/' + value;\n\t\t\t\t\t\t\t}));\n\n\t\t\t\t\t\t} else {\n\n\t\t\t\t\t\t\toncomplete(false);\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t} else {\n\n\t\t\t\t\t\toncomplete(false);\n\n\t\t\t\t\t}\n\n\t\t\t\t};\n\n\t\t\t\tthis.__pkg.load();\n\n\t\t\t} else {\n\n\t\t\t\toncomplete(false);\n\n\t\t\t}\n\n\t\t}, this);\n\n\t\tthis.bind('transcribe-api', function(oncomplete) {\n\n\t\t\tlet api     = _plugin.API;\n\t\t\tlet configs = this.configs;\n\t\t\tlet library = this.settings.library;\n\t\t\tlet project = this.settings.project;\n\n\t\t\tif (configs.length > 0) {\n\n\t\t\t\tthis.codes = this.configs.map(function(asset) {\n\n\t\t\t\t\tlet url = asset.url.replace(/api/, 'source').replace(/\\.json$/, '.js');\n\t\t\t\t\tif (url.startsWith(library) === true) {\n\t\t\t\t\t\turl = project + url.substr(library.length);\n\t\t\t\t\t}\n\n\n\t\t\t\t\tlet buffer = api.transcribe(asset);\n\t\t\t\t\tif (buffer !== null) {\n\n\t\t\t\t\t\tlet code = new Stuff(url, true);\n\n\t\t\t\t\t\tcode.buffer = buffer;\n\n\t\t\t\t\t\treturn code;\n\n\t\t\t\t\t}\n\n\n\t\t\t\t\treturn null;\n\n\t\t\t\t});\n\n\t\t\t\toncomplete(true);\n\n\t\t\t} else {\n\n\t\t\t\toncomplete(false);\n\n\t\t\t}\n\n\n\t\t}, this);\n\n\t\tthis.bind('write-codes', function(oncomplete) {\n\n\t\t\tlet project = this.settings.project;\n\t\t\tlet stash   = this.stash;\n\n\t\t\tif (project !== null && stash !== null) {\n\n\t\t\t\tconsole.log('strainer: WRITE-CODES ' + project);\n\n\n\t\t\t\tlet codes = this.codes.filter(function(code) {\n\t\t\t\t\treturn code !== null;\n\t\t\t\t});\n\n\t\t\t\tif (codes.length > 0) {\n\n\t\t\t\t\tstash.bind('batch', function(type, assets) {\n\n\t\t\t\t\t\tif (assets.length === codes.length) {\n\t\t\t\t\t\t\toncomplete(true);\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\toncomplete(false);\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}, this, true);\n\n\t\t\t\t\tstash.batch('write', codes.map(function(code) {\n\t\t\t\t\t\treturn code.url;\n\t\t\t\t\t}), codes);\n\n\t\t\t\t} else {\n\n\t\t\t\t\toncomplete(true);\n\n\t\t\t\t}\n\n\t\t\t} else {\n\n\t\t\t\toncomplete(false);\n\n\t\t\t}\n\n\t\t}, this);\n\n\n\n\t\t/*\n\t\t * FLOW\n\t\t */\n\n\t\tthis.then('read');\n\n\t\tthis.then('transcribe-api');\n\n\t\tthis.then('write-codes');\n\n\t};\n\n\n\tComposite.prototype = {\n\n\t\t/*\n\t\t * ENTITY API\n\t\t */\n\n\t\tdeserialize: function(blob) {\n\n\t\t\tif (blob.codes instanceof Array) {\n\n\t\t\t\tlet codes = [];\n\n\t\t\t\tfor (let bc1 = 0, bc1l = blob.codes.length; bc1 < bc1l; bc1++) {\n\t\t\t\t\tcodes.push(lychee.deserialize(blob.codes[bc1]));\n\t\t\t\t}\n\n\t\t\t\tif (codes.length > 0) {\n\n\t\t\t\t\tthis.codes = codes.filter(function(asset) {\n\t\t\t\t\t\treturn asset !== null;\n\t\t\t\t\t});\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\tif (blob.configs instanceof Array) {\n\n\t\t\t\tlet configs = [];\n\n\t\t\t\tfor (let bc2 = 0, bc2l = blob.configs.length; bc2 < bc2l; bc2++) {\n\t\t\t\t\tconfigs.push(lychee.deserialize(blob.codes[bc2]));\n\t\t\t\t}\n\n\t\t\t\tif (configs.length > 0) {\n\n\t\t\t\t\tthis.configs = configs.filter(function(asset) {\n\t\t\t\t\t\treturn asset !== null;\n\t\t\t\t\t});\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\tlet stash = lychee.deserialize(blob.stash);\n\t\t\tif (stash !== null) {\n\t\t\t\tthis.stash = stash;\n\t\t\t}\n\n\t\t},\n\n\t\tserialize: function() {\n\n\t\t\tlet data = _Flow.prototype.serialize.call(this);\n\t\t\tdata['constructor'] = 'strainer.flow.Transcribe';\n\n\n\t\t\tlet settings = data['arguments'][0] || {};\n\t\t\tlet blob     = data['blob'] || {};\n\n\n\t\t\tif (this.sandbox !== '')                   settings.sandbox  = this.sandbox;\n\t\t\tif (Object.keys(this.settings).length > 0) settings.settings = this.settings;\n\n\n\t\t\tif (this.stash !== null)     blob.stash   = lychee.serialize(this.stash);\n\t\t\tif (this.codes.length > 0)   blob.codes   = this.codes.map(lychee.serialize);\n\t\t\tif (this.configs.length > 0) blob.configs = this.configs.map(lychee.serialize);\n\n\n\t\t\tdata['arguments'][0] = settings;\n\t\t\tdata['blob']         = Object.keys(blob).length > 0 ? blob : null;\n\n\n\t\t\treturn data;\n\n\t\t},\n\n\n\n\t\t/*\n\t\t * CUSTOM API\n\t\t */\n\n\t\tsetSandbox: function(sandbox) {\n\n\t\t\tsandbox = typeof sandbox === 'string' ? sandbox : null;\n\n\n\t\t\tif (sandbox !== null) {\n\n\t\t\t\tthis.sandbox = sandbox;\n\n\n\t\t\t\treturn true;\n\n\t\t\t}\n\n\n\t\t\treturn false;\n\n\t\t},\n\n\t\tsetSettings: function(settings) {\n\n\t\t\tsettings = settings instanceof Object ? settings : null;\n\n\n\t\t\tif (settings !== null) {\n\n\t\t\t\tthis.settings = settings;\n\n\t\t\t\treturn true;\n\n\t\t\t}\n\n\n\t\t\treturn false;\n\n\t\t}\n\n\t};\n\n\n\treturn Composite;\n\n}"}},"lychee.Stash":{"constructor":"lychee.Definition","arguments":[{"id":"lychee.Stash","url":"/libraries/lychee/source/platform/node/Stash.js"}],"blob":{"attaches":{},"tags":{"platform":"node"},"includes":["lychee.event.Emitter"],"supports":"function (lychee, global) {\n\n\tif (typeof global.require === 'function') {\n\n\t\ttry {\n\n\t\t\tglobal.require('fs');\n\n\t\t\treturn true;\n\n\t\t} catch (err) {\n\n\t\t}\n\n\t}\n\n\n\treturn false;\n\n}","exports":"function (lychee, global, attachments) {\n\n\tlet   _id         = 0;\n\tconst _Emitter    = lychee.import('lychee.event.Emitter');\n\tconst _PERSISTENT = {\n\t\tdata: {},\n\t\tread: function() {\n\t\t\treturn null;\n\t\t},\n\t\twrite: function(id, asset) {\n\t\t\treturn false;\n\t\t}\n\t};\n\tconst _TEMPORARY  = {\n\t\tdata: {},\n\t\tread: function() {\n\n\t\t\tif (Object.keys(this.data).length > 0) {\n\t\t\t\treturn this.data;\n\t\t\t}\n\n\n\t\t\treturn null;\n\n\t\t},\n\t\twrite: function(id, asset) {\n\n\t\t\tif (asset !== null) {\n\t\t\t\tthis.data[id] = asset;\n\t\t\t} else {\n\t\t\t\tdelete this.data[id];\n\t\t\t}\n\n\t\t\treturn true;\n\n\t\t}\n\t};\n\n\n\n\t/*\n\t * FEATURE DETECTION\n\t */\n\n\t(function() {\n\n\t\tconst _ENCODING = {\n\t\t\t'Config':  'utf8',\n\t\t\t'Font':    'utf8',\n\t\t\t'Music':   'binary',\n\t\t\t'Sound':   'binary',\n\t\t\t'Texture': 'binary',\n\t\t\t'Stuff':   'utf8'\n\t\t};\n\n\n\t\tconst _fs      = global.require('fs');\n\t\tconst _path    = global.require('path');\n\t\tconst _mkdir_p = function(path, mode) {\n\n\t\t\tif (mode === undefined) {\n\t\t\t\tmode = 0o777 & (~process.umask());\n\t\t\t}\n\n\n\t\t\tlet is_directory = false;\n\n\t\t\ttry {\n\n\t\t\t\tis_directory = _fs.lstatSync(path).isDirectory();\n\n\t\t\t} catch (err) {\n\n\t\t\t\tif (err.code === 'ENOENT') {\n\n\t\t\t\t\tif (_mkdir_p(_path.dirname(path), mode) === true) {\n\n\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\t_fs.mkdirSync(path, mode);\n\t\t\t\t\t\t} catch (err) {\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t\ttry {\n\t\t\t\t\t\tis_directory = _fs.lstatSync(path).isDirectory();\n\t\t\t\t\t} catch (err) {\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\treturn is_directory;\n\n\t\t};\n\n\n\t\tlet unlink = 'unlinkSync' in _fs;\n\t\tlet write  = 'writeFileSync' in _fs;\n\t\tif (unlink === true && write === true) {\n\n\t\t\t_PERSISTENT.write = function(id, asset) {\n\n\t\t\t\tlet result = false;\n\n\n\t\t\t\tlet path = lychee.environment.resolve(id);\n\t\t\t\tif (path.startsWith(lychee.ROOT.project)) {\n\n\t\t\t\t\tif (asset !== null) {\n\n\t\t\t\t\t\tlet dir = path.split('/').slice(0, -1).join('/');\n\t\t\t\t\t\tif (dir.startsWith(lychee.ROOT.project)) {\n\t\t\t\t\t\t\t_mkdir_p(dir);\n\t\t\t\t\t\t}\n\n\n\t\t\t\t\t\tlet data = lychee.serialize(asset);\n\t\t\t\t\t\tlet enc  = _ENCODING[data.constructor] || _ENCODING['Stuff'];\n\n\t\t\t\t\t\tif (data !== null && data.blob instanceof Object) {\n\n\t\t\t\t\t\t\tlet buffer = data.blob.buffer || null;\n\t\t\t\t\t\t\tif (buffer instanceof Object) {\n\n\t\t\t\t\t\t\t\tfor (let sub in buffer) {\n\n\t\t\t\t\t\t\t\t\tif (typeof buffer[sub] === 'string') {\n\n\t\t\t\t\t\t\t\t\t\tlet index = buffer[sub].indexOf('base64,') + 7;\n\t\t\t\t\t\t\t\t\t\tif (index > 7) {\n\n\t\t\t\t\t\t\t\t\t\t\tlet raw = new Buffer(buffer[sub].substr(index, buffer[sub].length - index), 'base64');\n\n\t\t\t\t\t\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\t\t\t\t\t\t_fs.writeFileSync(path + '.' + sub, raw, enc);\n\t\t\t\t\t\t\t\t\t\t\t\tresult = true;\n\t\t\t\t\t\t\t\t\t\t\t} catch (err) {\n\t\t\t\t\t\t\t\t\t\t\t\tresult = false;\n\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t} else if (typeof buffer === 'string') {\n\n\t\t\t\t\t\t\t\tlet index = buffer.indexOf('base64,') + 7;\n\t\t\t\t\t\t\t\tif (index > 7) {\n\n\t\t\t\t\t\t\t\t\tlet raw = new Buffer(buffer.substr(index, buffer.length - index), 'base64');\n\n\t\t\t\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\t\t\t\t_fs.writeFileSync(path, raw, enc);\n\t\t\t\t\t\t\t\t\t\tresult = true;\n\t\t\t\t\t\t\t\t\t} catch (err) {\n\t\t\t\t\t\t\t\t\t\tresult = false;\n\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t} else {\n\n\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\t_fs.unlinkSync(path);\n\t\t\t\t\t\t\tresult = true;\n\t\t\t\t\t\t} catch (err) {\n\t\t\t\t\t\t\tresult = false;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\n\t\t\t\treturn result;\n\n\t\t\t};\n\n\t\t}\n\n\n\t\tif (lychee.debug === true) {\n\n\t\t\tlet methods = [];\n\n\t\t\tif (write && unlink) methods.push('Persistent');\n\t\t\tif (_TEMPORARY)      methods.push('Temporary');\n\n\n\t\t\tif (methods.length === 0) {\n\t\t\t\tconsole.error('lychee.Stash: Supported methods are NONE');\n\t\t\t} else {\n\t\t\t\tconsole.info('lychee.Stash: Supported methods are ' + methods.join(', '));\n\t\t\t}\n\n\t\t}\n\n\t})();\n\n\n\n\t/*\n\t * HELPERS\n\t */\n\n\tconst _validate_asset = function(asset) {\n\n\t\tif (asset instanceof Object && typeof asset.serialize === 'function') {\n\t\t\treturn true;\n\t\t}\n\n\t\treturn false;\n\n\t};\n\n\tconst _on_batch_remove = function(stash, others) {\n\n\t\tlet keys = Object.keys(others);\n\n\t\tfor (let k = 0, kl = keys.length; k < kl; k++) {\n\n\t\t\tlet key   = keys[k];\n\t\t\tlet index = this.load.indexOf(key);\n\t\t\tif (index !== -1) {\n\n\t\t\t\tif (this.ready.indexOf(key) === -1) {\n\t\t\t\t\tthis.ready.push(null);\n\t\t\t\t\tthis.load.splice(index, 1);\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t}\n\n\n\t\tif (this.load.length === 0) {\n\t\t\tstash.trigger('batch', [ 'remove', this.ready ]);\n\t\t\tstash.unbind('sync', _on_batch_remove);\n\t\t}\n\n\t};\n\n\tconst _on_batch_write = function(stash, others) {\n\n\t\tlet keys = Object.keys(others);\n\n\t\tfor (let k = 0, kl = keys.length; k < kl; k++) {\n\n\t\t\tlet key   = keys[k];\n\t\t\tlet index = this.load.indexOf(key);\n\t\t\tif (index !== -1) {\n\n\t\t\t\tif (this.ready.indexOf(key) === -1) {\n\t\t\t\t\tthis.ready.push(others[key]);\n\t\t\t\t\tthis.load.splice(index, 1);\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t}\n\n\n\t\tif (this.load.length === 0) {\n\t\t\tstash.trigger('batch', [ 'write', this.ready ]);\n\t\t\tstash.unbind('sync', _on_batch_write);\n\t\t}\n\n\t};\n\n\tconst _read_stash = function(silent) {\n\n\t\tsilent = silent === true;\n\n\n\t\tlet blob = null;\n\n\n\t\tlet type = this.type;\n\t\tif (type === Composite.TYPE.persistent) {\n\n\t\t\tblob = _PERSISTENT.read();\n\n\t\t} else if (type === Composite.TYPE.temporary) {\n\n\t\t\tblob = _TEMPORARY.read();\n\n\t\t}\n\n\n\t\tif (blob !== null) {\n\n\t\t\tif (Object.keys(this.__assets).length !== Object.keys(blob).length) {\n\n\t\t\t\tthis.__assets = {};\n\n\t\t\t\tfor (let id in blob) {\n\t\t\t\t\tthis.__assets[id] = blob[id];\n\t\t\t\t}\n\n\n\t\t\t\tif (silent === false) {\n\t\t\t\t\tthis.trigger('sync', [ this.__assets ]);\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\treturn true;\n\n\t\t}\n\n\n\t\treturn false;\n\n\t};\n\n\tconst _write_stash = function(silent) {\n\n\t\tsilent = silent === true;\n\n\n\t\tlet operations = this.__operations;\n\t\tlet filtered   = {};\n\n\t\tif (operations.length !== 0) {\n\n\t\t\twhile (operations.length > 0) {\n\n\t\t\t\tlet operation = operations.shift();\n\t\t\t\tif (operation.type === 'update') {\n\n\t\t\t\t\tfiltered[operation.id] = operation.asset;\n\n\t\t\t\t\tif (this.__assets[operation.id] !== operation.asset) {\n\t\t\t\t\t\tthis.__assets[operation.id] = operation.asset;\n\t\t\t\t\t}\n\n\t\t\t\t} else if (operation.type === 'remove') {\n\n\t\t\t\t\tfiltered[operation.id] = null;\n\n\t\t\t\t\tif (this.__assets[operation.id] !== null) {\n\t\t\t\t\t\tthis.__assets[operation.id] = null;\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\tlet type = this.type;\n\t\t\tif (type === Composite.TYPE.persistent) {\n\n\t\t\t\tfor (let id in filtered) {\n\t\t\t\t\t_PERSISTENT.write(id, filtered[id]);\n\t\t\t\t}\n\n\t\t\t} else if (type === Composite.TYPE.temporary) {\n\n\t\t\t\tfor (let id in filtered) {\n\t\t\t\t\t_TEMPORARY.write(id, filtered[id]);\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\tif (silent === false) {\n\t\t\t\tthis.trigger('sync', [ this.__assets ]);\n\t\t\t}\n\n\n\t\t\treturn true;\n\n\t\t}\n\n\n\t\treturn false;\n\n\t};\n\n\n\n\t/*\n\t * IMPLEMENTATION\n\t */\n\n\tconst Composite = function(data) {\n\n\t\tlet settings = Object.assign({}, data);\n\n\n\t\tthis.id   = 'lychee-Stash-' + _id++;\n\t\tthis.type = Composite.TYPE.persistent;\n\n\n\t\tthis.__assets     = {};\n\t\tthis.__operations = [];\n\n\n\t\tthis.setId(settings.id);\n\t\tthis.setType(settings.type);\n\n\n\t\t_Emitter.call(this);\n\n\n\n\t\t/*\n\t\t * INITIALIZATION\n\t\t */\n\n\t\t_read_stash.call(this);\n\n\n\t\tsettings = null;\n\n\t};\n\n\n\tComposite.TYPE = {\n\t\tpersistent: 0,\n\t\ttemporary:  1\n\t};\n\n\n\tComposite.prototype = {\n\n\t\t/*\n\t\t * ENTITY API\n\t\t */\n\n\t\tsync: function(silent) {\n\n\t\t\tsilent = silent === true;\n\n\n\t\t\tlet result = false;\n\n\n\t\t\tif (Object.keys(this.__assets).length > 0) {\n\n\t\t\t\tthis.__operations.push({\n\t\t\t\t\ttype: 'sync'\n\t\t\t\t});\n\n\t\t\t}\n\n\n\t\t\tif (this.__operations.length > 0) {\n\t\t\t\tresult = _write_stash.call(this, silent);\n\t\t\t} else {\n\t\t\t\tresult = _read_stash.call(this, silent);\n\t\t\t}\n\n\n\t\t\treturn result;\n\n\t\t},\n\n\t\tdeserialize: function(blob) {\n\n\t\t\tif (blob.assets instanceof Object) {\n\n\t\t\t\tthis.__assets = {};\n\n\t\t\t\tfor (let id in blob.assets) {\n\t\t\t\t\tthis.__assets[id] = lychee.deserialize(blob.assets[id]);\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t},\n\n\t\tserialize: function() {\n\n\t\t\tlet data = _Emitter.prototype.serialize.call(this);\n\t\t\tdata['constructor'] = 'lychee.Stash';\n\n\t\t\tlet settings = {};\n\t\t\tlet blob     = (data['blob'] || {});\n\n\n\t\t\tif (this.id.startsWith('lychee-Stash-') === false) settings.id   = this.id;\n\t\t\tif (this.type !== Composite.TYPE.persistent)       settings.type = this.type;\n\n\n\t\t\tif (Object.keys(this.__assets).length > 0) {\n\n\t\t\t\tblob.assets = {};\n\n\t\t\t\tfor (let id in this.__assets) {\n\t\t\t\t\tblob.assets[id] = lychee.serialize(this.__assets[id]);\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\tdata['arguments'][0] = settings;\n\t\t\tdata['blob']         = Object.keys(blob).length > 0 ? blob : null;\n\n\n\t\t\treturn data;\n\n\t\t},\n\n\n\n\t\t/*\n\t\t * CUSTOM API\n\t\t */\n\n\t\tbatch: function(action, ids, assets) {\n\n\t\t\taction = typeof action === 'string' ? action : null;\n\t\t\tids    = ids instanceof Array       ? ids    : null;\n\t\t\tassets = assets instanceof Array    ? assets : null;\n\n\n\t\t\tif (action !== null) {\n\n\t\t\t\tlet cache  = {\n\t\t\t\t\tload:  Array.from(ids),\n\t\t\t\t\tready: []\n\t\t\t\t};\n\n\n\t\t\t\tlet result = true;\n\t\t\t\tlet that   = this;\n\n\t\t\t\tif (action === 'read') {\n\n\t\t\t\t\tfor (let i = 0, il = ids.length; i < il; i++) {\n\n\t\t\t\t\t\tlet asset = this.read(ids[i]);\n\t\t\t\t\t\tif (asset !== null) {\n\n\t\t\t\t\t\t\tasset.onload = function(result) {\n\n\t\t\t\t\t\t\t\tlet index = cache.load.indexOf(this.url);\n\t\t\t\t\t\t\t\tif (index !== -1) {\n\t\t\t\t\t\t\t\t\tcache.ready.push(this);\n\t\t\t\t\t\t\t\t\tcache.load.splice(index, 1);\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\tif (cache.load.length === 0) {\n\t\t\t\t\t\t\t\t\tthat.trigger('batch', [ 'read', cache.ready ]);\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t};\n\n\t\t\t\t\t\t\tasset.load();\n\n\t\t\t\t\t\t} else {\n\n\t\t\t\t\t\t\tresult = false;\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\n\t\t\t\t\treturn result;\n\n\t\t\t\t} else if (action === 'remove') {\n\n\t\t\t\t\tthis.bind('#sync', _on_batch_remove, cache);\n\n\t\t\t\t\tfor (let i = 0, il = ids.length; i < il; i++) {\n\n\t\t\t\t\t\tif (this.remove(ids[i]) === false) {\n\t\t\t\t\t\t\tresult = false;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t\tif (result === false) {\n\t\t\t\t\t\tthis.unbind('sync', _on_batch_remove);\n\t\t\t\t\t}\n\n\n\t\t\t\t\treturn result;\n\n\t\t\t\t} else if (action === 'write' && ids.length === assets.length) {\n\n\t\t\t\t\tthis.bind('#sync', _on_batch_write, cache);\n\n\t\t\t\t\tfor (let i = 0, il = ids.length; i < il; i++) {\n\n\t\t\t\t\t\tif (this.write(ids[i], assets[i]) === false) {\n\t\t\t\t\t\t\tresult = false;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t\tif (result === false) {\n\t\t\t\t\t\tthis.unbind('sync', _on_batch_write);\n\t\t\t\t\t}\n\n\n\t\t\t\t\treturn result;\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\treturn false;\n\n\t\t},\n\n\t\tread: function(id) {\n\n\t\t\tid = typeof id === 'string' ? id : null;\n\n\n\t\t\tif (id !== null) {\n\n\t\t\t\tlet asset = new lychee.Asset(id, null, true);\n\t\t\t\tif (asset !== null) {\n\n\t\t\t\t\tthis.__assets[id] = asset;\n\n\t\t\t\t\treturn asset;\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\treturn null;\n\n\t\t},\n\n\t\tremove: function(id) {\n\n\t\t\tid = typeof id === 'string' ? id : null;\n\n\n\t\t\tif (id !== null) {\n\n\t\t\t\tthis.__operations.push({\n\t\t\t\t\ttype: 'remove',\n\t\t\t\t\tid:   id\n\t\t\t\t});\n\n\n\t\t\t\t_write_stash.call(this);\n\n\n\t\t\t\treturn true;\n\n\t\t\t}\n\n\n\t\t\treturn false;\n\n\t\t},\n\n\t\twrite: function(id, asset) {\n\n\t\t\tid    = typeof id === 'string'          ? id    : null;\n\t\t\tasset = _validate_asset(asset) === true ? asset : null;\n\n\n\t\t\tif (id !== null && asset !== null) {\n\n\t\t\t\tthis.__operations.push({\n\t\t\t\t\ttype:  'update',\n\t\t\t\t\tid:    id,\n\t\t\t\t\tasset: asset\n\t\t\t\t});\n\n\n\t\t\t\t_write_stash.call(this);\n\n\n\t\t\t\treturn true;\n\n\t\t\t}\n\n\n\t\t\treturn false;\n\n\t\t},\n\n\t\tsetId: function(id) {\n\n\t\t\tid = typeof id === 'string' ? id : null;\n\n\n\t\t\tif (id !== null) {\n\n\t\t\t\tthis.id = id;\n\n\t\t\t\treturn true;\n\n\t\t\t}\n\n\n\t\t\treturn false;\n\n\t\t},\n\n\t\tsetType: function(type) {\n\n\t\t\ttype = lychee.enumof(Composite.TYPE, type) ? type : null;\n\n\n\t\t\tif (type !== null) {\n\n\t\t\t\tthis.type = type;\n\n\t\t\t\treturn true;\n\n\t\t\t}\n\n\n\t\t\treturn false;\n\n\t\t}\n\n\t};\n\n\n\treturn Composite;\n\n}"}},"strainer.plugin.API":{"constructor":"lychee.Definition","arguments":[{"id":"strainer.plugin.API","url":"/libraries/strainer/source/plugin/API.js"}],"blob":{"attaches":{},"requires":["strainer.api.Callback","strainer.api.Composite","strainer.api.Core","strainer.api.Definition","strainer.api.Module","strainer.api.Specification","strainer.fix.API"],"exports":"function (lychee, global, attachments) {\n\n\tconst _FIXES = lychee.import('strainer.fix.API');\n\tconst _api   = {\n\t\tCallback:      lychee.import('strainer.api.Callback'),\n\t\tComposite:     lychee.import('strainer.api.Composite'),\n\t\tCore:          lychee.import('strainer.api.Core'),\n\t\tDefinition:    lychee.import('strainer.api.Definition'),\n\t\tModule:        lychee.import('strainer.api.Module'),\n\t\tSpecification: lychee.import('strainer.api.Specification')\n\t};\n\n\n\n\t/*\n\t * HELPERS\n\t */\n\n\tconst _validate_asset = function(asset) {\n\n\t\tif (asset instanceof Object && typeof asset.serialize === 'function') {\n\t\t\treturn true;\n\t\t}\n\n\t\treturn false;\n\n\t};\n\n\n\n\t/*\n\t * IMPLEMENTATION\n\t */\n\n\tconst Module = {\n\n\t\t// deserialize: function(blob) {},\n\n\t\tserialize: function() {\n\n\t\t\treturn {\n\t\t\t\t'reference': 'strainer.plugin.API',\n\t\t\t\t'arguments': []\n\t\t\t};\n\n\t\t},\n\n\t\tcheck: function(asset) {\n\n\t\t\tasset = _validate_asset(asset) === true ? asset : null;\n\n\n\t\t\tif (asset !== null) {\n\n\t\t\t\tlet header = null;\n\t\t\t\tlet report = null;\n\t\t\t\tlet api    = null;\n\t\t\t\tlet stream = asset.buffer.toString('utf8');\n\t\t\t\tlet first  = stream.trim().split('\\n')[0];\n\n\n\t\t\t\tlet is_core          = asset.url.startsWith('/libraries/lychee/source/core') && first.endsWith('(function(global) {');\n\t\t\t\tlet is_definition    = first.startsWith('lychee.define(');\n\t\t\t\tlet is_specification = first.startsWith('lychee.specify(');\n\t\t\t\tlet i_callback       = stream.lastIndexOf('return Callback;');\n\t\t\t\tlet i_composite      = stream.lastIndexOf('return Composite;');\n\t\t\t\tlet i_module         = stream.lastIndexOf('return Module;');\n\t\t\t\tlet i_check          = Math.max(i_callback, i_composite, i_module);\n\t\t\t\tlet is_callback      = i_check === i_callback;\n\t\t\t\tlet is_composite     = i_check === i_composite;\n\t\t\t\tlet is_module        = i_check === i_module;\n\n\n\t\t\t\tif (is_definition === true) {\n\t\t\t\t\theader = _api['Definition'].check(asset);\n\t\t\t\t} else if (is_specification === true) {\n\t\t\t\t\theader = _api['Specification'].check(asset);\n\t\t\t\t} else if (is_core === true) {\n\t\t\t\t\theader = _api['Core'].check(asset);\n\t\t\t\t} else {\n\n\t\t\t\t\tif (asset.url.includes('/review/')) {\n\t\t\t\t\t\theader = _api['Specification'].check(asset);\n\t\t\t\t\t} else if (asset.url.includes('/source/')) {\n\t\t\t\t\t\theader = _api['Definition'].check(asset);\n\t\t\t\t\t} else {\n\n\t\t\t\t\t\t// XXX: autofix assumes lychee.Definition syntax\n\t\t\t\t\t\theader = _api['Definition'].check(asset);\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\n\t\t\t\tif (is_callback === true) {\n\t\t\t\t\tapi = _api['Callback'] || null;\n\t\t\t\t} else if (is_composite === true) {\n\t\t\t\t\tapi = _api['Composite'] || null;\n\t\t\t\t} else if (is_module === true) {\n\t\t\t\t\tapi = _api['Module'] || null;\n\t\t\t\t}\n\n\n\t\t\t\tif (api !== null) {\n\n\t\t\t\t\treport = api.check(asset, header.result);\n\n\t\t\t\t} else {\n\n\t\t\t\t\t// XXX: autofix assumes lychee.Definition\n\t\t\t\t\treport = {\n\t\t\t\t\t\tmemory: {},\n\t\t\t\t\t\terrors: [],\n\t\t\t\t\t\tresult: {\n\t\t\t\t\t\t\tconstructor: {\n\t\t\t\t\t\t\t\tbody:       null,\n\t\t\t\t\t\t\t\thash:       null,\n\t\t\t\t\t\t\t\tparameters: []\n\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\tsettings:    {},\n\t\t\t\t\t\t\tproperties:  {},\n\t\t\t\t\t\t\tenums:       {},\n\t\t\t\t\t\t\tevents:      {},\n\t\t\t\t\t\t\tmethods:     {}\n\t\t\t\t\t\t}\n\t\t\t\t\t};\n\n\t\t\t\t}\n\n\n\t\t\t\tif (header !== null && report !== null) {\n\n\t\t\t\t\tif (header.errors.length > 0) {\n\n\t\t\t\t\t\tlet errors = [];\n\n\t\t\t\t\t\terrors.push.apply(errors, header.errors);\n\t\t\t\t\t\terrors.push.apply(errors, report.errors);\n\n\t\t\t\t\t\treport.errors = errors;\n\n\t\t\t\t\t}\n\n\n\t\t\t\t\treport.errors.forEach(function(err) {\n\n\t\t\t\t\t\tif (err.url === null) {\n\t\t\t\t\t\t\terr.url = asset.url;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t});\n\n\n\t\t\t\t\tif (is_callback === true) {\n\t\t\t\t\t\theader.result.type = 'Callback';\n\t\t\t\t\t} else if (is_composite === true) {\n\t\t\t\t\t\theader.result.type = 'Composite';\n\t\t\t\t\t} else if (is_module === true) {\n\t\t\t\t\t\theader.result.type = 'Module';\n\t\t\t\t\t}\n\n\n\t\t\t\t\treturn {\n\t\t\t\t\t\theader: header.result,\n\t\t\t\t\t\tmemory: report.memory,\n\t\t\t\t\t\terrors: report.errors,\n\t\t\t\t\t\tresult: report.result\n\t\t\t\t\t};\n\n\t\t\t\t} else if (report !== null) {\n\n\t\t\t\t\treturn {\n\t\t\t\t\t\theader: null,\n\t\t\t\t\t\tmemory: report.memory,\n\t\t\t\t\t\terrors: report.errors,\n\t\t\t\t\t\tresult: report.result\n\t\t\t\t\t};\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\treturn null;\n\n\t\t},\n\n\t\tfix: function(asset, report) {\n\n\t\t\tasset  = _validate_asset(asset) === true ? asset  : null;\n\t\t\treport = report instanceof Object        ? report : null;\n\n\n\t\t\tlet filtered = [];\n\n\t\t\tif (asset !== null && report !== null) {\n\n\t\t\t\tlet code     = asset.buffer.toString('utf8');\n\t\t\t\tlet modified = false;\n\n\n\t\t\t\treport.errors.forEach(function(err) {\n\n\t\t\t\t\tlet rule = err.rule;\n\n\t\t\t\t\tlet fix = _FIXES[rule] || null;\n\t\t\t\t\tif (fix !== null) {\n\n\t\t\t\t\t\tlet result = fix(err, report, code);\n\t\t\t\t\t\tif (result !== null) {\n\t\t\t\t\t\t\tcode     = result;\n\t\t\t\t\t\t\tmodified = true;\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tfiltered.push(err);\n\t\t\t\t\t\t}\n\n\t\t\t\t\t} else {\n\n\t\t\t\t\t\tfiltered.push(err);\n\n\t\t\t\t\t}\n\n\t\t\t\t});\n\n\n\t\t\t\tif (modified === true) {\n\t\t\t\t\tasset.buffer    = new Buffer(code, 'utf8');\n\t\t\t\t\tasset._MODIFIED = true;\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\treturn filtered;\n\n\t\t},\n\n\t\ttranscribe: function(asset) {\n\n\t\t\tasset = _validate_asset(asset) === true ? asset : null;\n\n\n\t\t\tif (asset !== null) {\n\n\t\t\t\tlet report = asset.buffer || {\n\t\t\t\t\theader: {},\n\t\t\t\t\tmemory: {},\n\t\t\t\t\terrors: [],\n\t\t\t\t\tresult: {}\n\t\t\t\t};\n\n\n\t\t\t\t// TODO: Replace asset.buffer.header.identifier\n\t\t\t\t// in case library's definition starts with library namespace\n\n\n\t\t\t\tlet api    = null;\n\t\t\t\tlet header = null;\n\t\t\t\tlet code   = null;\n\n\n\t\t\t\tlet is_core       = asset.url.startsWith('/libraries/lychee/source/core');\n\t\t\t\tlet is_definition = is_core === false && asset.url.includes('/api/');\n\n\n\t\t\t\tif (is_definition === true) {\n\t\t\t\t\theader = _api['Definition'].transcribe(asset);\n\t\t\t\t} else if (is_core === true) {\n\t\t\t\t\theader = _api['Core'].transcribe(asset);\n\t\t\t\t}\n\n\n\t\t\t\tlet type = report.header.type || null;\n\t\t\t\tif (type === 'Callback') {\n\t\t\t\t\tapi = _api['Callback'] || null;\n\t\t\t\t} else if (type === 'Composite') {\n\t\t\t\t\tapi = _api['Composite'] || null;\n\t\t\t\t} else if (type === 'Module') {\n\t\t\t\t\tapi = _api['Module'] || null;\n\t\t\t\t}\n\n\n\t\t\t\tif (header !== null && api !== null) {\n\n\t\t\t\t\tlet tmp = api.transcribe(asset);\n\t\t\t\t\tif (tmp !== null) {\n\t\t\t\t\t\tcode = header.replace('%BODY%', tmp);\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\n\t\t\t\treturn code;\n\n\t\t\t}\n\n\n\t\t\treturn null;\n\n\t\t}\n\n\t};\n\n\n\treturn Module;\n\n}"}},"strainer.plugin.ESLINT":{"constructor":"lychee.Definition","arguments":[{"id":"strainer.plugin.ESLINT","url":"/libraries/strainer/source/platform/node/plugin/ESLINT.js"}],"blob":{"attaches":{},"tags":{"platform":"node"},"requires":["strainer.fix.ESLINT"],"supports":"function (lychee, global) {\n\n\ttry {\n\n\t\tglobal.require('eslint');\n\n\t\treturn true;\n\n\t} catch (err) {\n\n\t\t// XXX: We warn the user later, which\n\t\t// is better than generic failure\n\n\t\treturn true;\n\n\t}\n\n\n\t// XXX: See above\n\t// return false;\n\n}","exports":"function (lychee, global, attachments) {\n\n\tconst _CONFIG = new Config('/.eslintrc.json');\n\tconst _FIXES  = lychee.import('strainer.fix.ESLINT');\n\tlet   _eslint = null;\n\tlet   _escli  = null;\n\n\n\n\t/*\n\t * FEATURE DETECTION\n\t */\n\n\t(function() {\n\n\t\ttry {\n\n\t\t\t_eslint = global.require('eslint');\n\n\n\t\t} catch (err) {\n\n\t\t\tconsole.log('\\n');\n\t\t\tconsole.error('strainer.plugin.ESLINT: Please install ESLint globally.   ');\n\t\t\tconsole.error('                        sudo npm install -g eslint;       ');\n\t\t\tconsole.error('                        cd /opt/lycheejs; npm link eslint;');\n\t\t\tconsole.log('\\n');\n\n\t\t}\n\n\n\t\t_CONFIG.onload = function() {\n\n\t\t\tlet config = null;\n\n\t\t\tif (this.buffer instanceof Object) {\n\n\t\t\t\tconfig         = {};\n\t\t\t\tconfig.envs    = Object.values(this.buffer.env);\n\t\t\t\tconfig.globals = Object.values(this.buffer.globals).map(function(value) {\n\t\t\t\t\treturn value + ':true';\n\t\t\t\t});\n\n\t\t\t}\n\n\t\t\tif (_eslint !== null && config !== null) {\n\t\t\t\t_escli = new _eslint.CLIEngine(config);\n\t\t\t}\n\n\t\t};\n\n\t\t_CONFIG.load();\n\n\t})();\n\n\n\n\t/*\n\t * HELPERS\n\t */\n\n\tconst _validate_asset = function(asset) {\n\n\t\tif (asset instanceof Object && typeof asset.serialize === 'function') {\n\t\t\treturn true;\n\t\t}\n\n\t\treturn false;\n\n\t};\n\n\n\n\t/*\n\t * IMPLEMENTATION\n\t */\n\n\tconst Module = {\n\n\t\t// deserialize: function(blob) {},\n\n\t\tserialize: function() {\n\n\t\t\treturn {\n\t\t\t\t'reference': 'strainer.plugin.ESLINT',\n\t\t\t\t'arguments': []\n\t\t\t};\n\n\t\t},\n\n\t\tcheck: function(asset) {\n\n\t\t\tasset = _validate_asset(asset) === true ? asset : null;\n\n\n\t\t\tlet errors = [];\n\n\t\t\tif (asset !== null) {\n\n\t\t\t\tif (_escli !== null && _eslint !== null) {\n\n\t\t\t\t\tlet url    = asset.url;\n\t\t\t\t\tlet config = null;\n\n\t\t\t\t\ttry {\n\t\t\t\t\t\tconfig = _escli.getConfigForFile(lychee.ROOT.lychee + url);\n\t\t\t\t\t} catch (err) {\n\t\t\t\t\t\tconfig = null;\n\t\t\t\t\t}\n\n\n\t\t\t\t\t// XXX: ESLint by default does ignore the config\n\t\t\t\t\t// given in its CLIEngine constructor -_-\n\t\t\t\t\tif (config === null) {\n\n\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\tconfig = _escli.getConfigForFile('/opt/lycheejs/bin/configure.js');\n\t\t\t\t\t\t} catch (err) {\n\t\t\t\t\t\t\tconfig = null;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\n\t\t\t\t\tlet source = asset.buffer.toString('utf8');\n\t\t\t\t\tlet report = _escli.linter.verify(source, config);\n\t\t\t\t\tif (report.length > 0) {\n\n\t\t\t\t\t\tfor (let r = 0, rl = report.length; r < rl; r++) {\n\t\t\t\t\t\t\terrors.push(report[r]);\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t\treturn errors;\n\n\t\t},\n\n\t\tfix: function(asset, report) {\n\n\t\t\treport = report instanceof Array ? report : null;\n\n\n\t\t\tlet filtered = [];\n\n\t\t\tif (report !== null) {\n\n\t\t\t\tlet code     = asset.buffer.toString('utf8').split('\\n');\n\t\t\t\tlet modified = false;\n\t\t\t\tlet range    = [ 0 ];\n\n\t\t\t\tcode.forEach(function(chunk, c) {\n\t\t\t\t\trange[c + 1] = range[c] + chunk.length + 1;\n\t\t\t\t});\n\n\n\t\t\t\tlet prev_l    = -1;\n\t\t\t\tlet prev_diff = 0;\n\n\t\t\t\treport.forEach(function(err) {\n\n\t\t\t\t\tlet line = err.line;\n\t\t\t\t\tlet rule = err.ruleId;\n\t\t\t\t\tlet l    = line - 1;\n\n\n\t\t\t\t\tlet fix = _FIXES[rule] || null;\n\t\t\t\t\tif (fix !== null) {\n\n\t\t\t\t\t\tlet tmp = err.fix || null;\n\t\t\t\t\t\tif (tmp !== null && tmp.range instanceof Array) {\n\n\t\t\t\t\t\t\tlet diff = 0;\n\t\t\t\t\t\t\tif (l === prev_l) {\n\t\t\t\t\t\t\t\tdiff = prev_diff;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\ttmp.range = tmp.range.map(function(value) {\n\t\t\t\t\t\t\t\treturn value - range[line - 1] + diff;\n\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tlet tmp1 = code[l];\n\t\t\t\t\t\tlet tmp2 = fix(tmp1, err, code, l);\n\n\t\t\t\t\t\tif (l === prev_l) {\n\t\t\t\t\t\t\tprev_diff += tmp2.length - tmp1.length;\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tprev_diff = tmp2.length - tmp1.length;\n\t\t\t\t\t\t\tprev_l    = l;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tif (tmp1 !== tmp2) {\n\t\t\t\t\t\t\tcode[l]  = tmp2;\n\t\t\t\t\t\t\tmodified = true;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t} else {\n\n\t\t\t\t\t\tfiltered.push(err);\n\n\t\t\t\t\t}\n\n\t\t\t\t});\n\n\n\t\t\t\tif (modified === true) {\n\t\t\t\t\tasset.buffer    = new Buffer(code.join('\\n'), 'utf8');\n\t\t\t\t\tasset._MODIFIED = true;\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t\treturn filtered;\n\n\t\t}\n\n\t};\n\n\n\treturn Module;\n\n}"}},"strainer.api.Callback":{"constructor":"lychee.Definition","arguments":[{"id":"strainer.api.Callback","url":"/libraries/strainer/source/api/Callback.js"}],"blob":{"attaches":{},"requires":["strainer.api.PARSER","strainer.api.TRANSCRIPTOR"],"exports":"function (lychee, global, attachments) {\n\n\tconst _PARSER       = lychee.import('strainer.api.PARSER');\n\tconst _TRANSCRIPTOR = lychee.import('strainer.api.TRANSCRIPTOR');\n\n\n\n\t/*\n\t * HELPERS\n\t */\n\n\tconst _validate_asset = function(asset) {\n\n\t\tif (asset instanceof Object && typeof asset.serialize === 'function') {\n\t\t\treturn true;\n\t\t}\n\n\t\treturn false;\n\n\t};\n\n\tconst _find_reference = function(chunk, stream, fuzzy) {\n\n\t\tfuzzy = fuzzy === true;\n\n\n\t\tlet ref = {\n\t\t\tchunk:  '',\n\t\t\tline:   0,\n\t\t\tcolumn: 0\n\t\t};\n\n\t\tlet lines = stream.split('\\n');\n\t\tlet line  = lines.findIndex(function(other) {\n\n\t\t\tif (fuzzy === true) {\n\t\t\t\treturn other.includes(chunk.trim());\n\t\t\t} else {\n\t\t\t\treturn other.trim() === chunk.trim();\n\t\t\t}\n\n\t\t});\n\n\t\tif (line !== -1) {\n\n\t\t\tref.chunk = lines[line];\n\t\t\tref.line  = line + 1;\n\n\t\t\tlet column = lines[line].indexOf(chunk);\n\t\t\tif (column !== -1) {\n\t\t\t\tref.column = column + 1;\n\t\t\t}\n\n\t\t}\n\n\t\treturn ref;\n\n\t};\n\n\tconst _parse_memory = function(memory, stream, errors) {\n\n\t\tlet i1 = stream.indexOf('.exports(function(lychee, global, attachments) {');\n\t\tlet i2 = stream.indexOf('\\n\\tconst Callback =');\n\n\t\tif (i1 !== -1 && i2 !== -1) {\n\n\t\t\tlet body = stream.substr(i1 + 48, i2 - i1 - 48);\n\t\t\tif (body.length > 0) {\n\n\t\t\t\tbody.split('\\n')\n\t\t\t\t\t.filter(line => {\n\t\t\t\t\t\treturn line.startsWith('\\tconst ') || line.startsWith('\\tlet ');\n\t\t\t\t\t})\n\t\t\t\t\t.map(line => line.trim())\n\t\t\t\t\t.forEach(line => {\n\n\t\t\t\t\t\tlet tmp = '';\n\t\t\t\t\t\tif (line.startsWith('const ')) {\n\t\t\t\t\t\t\ttmp = line.substr(6).trim();\n\t\t\t\t\t\t} else if (line.startsWith('let ')) {\n\t\t\t\t\t\t\ttmp = line.substr(4).trim();\n\t\t\t\t\t\t}\n\n\n\t\t\t\t\t\tlet i1 = tmp.indexOf('=');\n\t\t\t\t\t\tif (i1 !== -1) {\n\n\t\t\t\t\t\t\tlet key   = tmp.substr(0, i1).trim();\n\t\t\t\t\t\t\tlet chunk = tmp.substr(i1 + 1).trim();\n\n\t\t\t\t\t\t\tif (key !== '' && chunk !== '') {\n\n\t\t\t\t\t\t\t\tif (chunk.endsWith(';')) {\n\n\t\t\t\t\t\t\t\t\tchunk = chunk.substr(0, chunk.length - 1);\n\t\t\t\t\t\t\t\t\tmemory[key] = _PARSER.detect(chunk);\n\n\t\t\t\t\t\t\t\t} else {\n\n\t\t\t\t\t\t\t\t\tchunk = _PARSER.find(key, body);\n\t\t\t\t\t\t\t\t\tmemory[key] = _PARSER.detect(chunk);\n\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t});\n\n\t\t\t}\n\n\t\t}\n\n\t};\n\n\tconst _parse_constructor = function(constructor, stream) {\n\n\t\tlet i1 = stream.indexOf('\\n\\tconst Callback =');\n\t\tlet i2 = stream.indexOf('\\n\\t};', i1);\n\n\t\tif (i1 !== -1 && i2 !== -1) {\n\n\t\t\tlet body = stream.substr(i1 + 19, i2 - i1 - 16).trim();\n\t\t\tif (body.length > 0) {\n\n\t\t\t\tconstructor.type       = 'function';\n\t\t\t\tconstructor.body       = body;\n\t\t\t\tconstructor.hash       = _PARSER.hash(body);\n\t\t\t\tconstructor.parameters = _PARSER.parameters(body);\n\n\t\t\t}\n\n\t\t}\n\n\t};\n\n\n\n\t/*\n\t * IMPLEMENTATION\n\t */\n\n\tconst Module = {\n\n\t\t// deserialize: function(blob) {},\n\n\t\tserialize: function() {\n\n\t\t\treturn {\n\t\t\t\t'reference': 'strainer.api.Callback',\n\t\t\t\t'arguments': []\n\t\t\t};\n\n\t\t},\n\n\t\tcheck: function(asset) {\n\n\t\t\tasset = _validate_asset(asset) === true ? asset : null;\n\n\n\t\t\tlet errors = [];\n\t\t\tlet memory = {};\n\t\t\tlet result = {\n\t\t\t\tconstructor: {\n\t\t\t\t\tbody:       null,\n\t\t\t\t\thash:       null,\n\t\t\t\t\tparameters: []\n\t\t\t\t},\n\t\t\t\tsettings:    {},\n\t\t\t\tproperties:  {},\n\t\t\t\tenums:       {},\n\t\t\t\tevents:      {},\n\t\t\t\tmethods:     {}\n\t\t\t};\n\n\t\t\tif (asset !== null) {\n\n\t\t\t\tlet stream = asset.buffer.toString('utf8');\n\n\t\t\t\t_parse_memory(memory, stream, errors);\n\t\t\t\t_parse_constructor(result.constructor, stream, errors);\n\n\n\t\t\t\tlet ref = _find_reference('\\n\\tconst Callback = function(', stream, true);\n\t\t\t\tif (ref.chunk === '') {\n\n\t\t\t\t\tref = _find_reference('Callback =', stream, true);\n\n\t\t\t\t\terrors.push({\n\t\t\t\t\t\turl:       null,\n\t\t\t\t\t\trule:      'no-callback',\n\t\t\t\t\t\treference: 'constructor',\n\t\t\t\t\t\tmessage:   'Callback is not constant (missing \"const\" declaration).',\n\t\t\t\t\t\tline:      ref.line,\n\t\t\t\t\t\tcolumn:    ref.column\n\t\t\t\t\t});\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\treturn {\n\t\t\t\terrors: errors,\n\t\t\t\tmemory: memory,\n\t\t\t\tresult: result\n\t\t\t};\n\n\t\t},\n\n\t\ttranscribe: function(asset) {\n\n\t\t\tasset = _validate_asset(asset) === true ? asset : null;\n\n\n\t\t\tif (asset !== null) {\n\n\t\t\t\tlet code = [];\n\n\n\t\t\t\tlet api = asset.buffer;\n\t\t\t\tif (api instanceof Object) {\n\n\t\t\t\t\tlet memory = api.memory || null;\n\t\t\t\t\tlet result = api.result || null;\n\n\n\t\t\t\t\tif (memory instanceof Object) {\n\n\t\t\t\t\t\tfor (let m in memory) {\n\n\t\t\t\t\t\t\tlet chunk = _TRANSCRIPTOR.transcribe(m, memory[m]);\n\t\t\t\t\t\t\tif (chunk !== null) {\n\t\t\t\t\t\t\t\tcode.push('\\t' + chunk);\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\n\t\t\t\t\tlet construct = result.constructor || null;\n\t\t\t\t\tif (construct !== null) {\n\n\t\t\t\t\t\tlet chunk = _TRANSCRIPTOR.transcribe('Callback', construct);\n\t\t\t\t\t\tif (chunk !== null) {\n\t\t\t\t\t\t\tcode.push('');\n\t\t\t\t\t\t\tcode.push('');\n\t\t\t\t\t\t\tcode.push('\\t' + chunk);\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\n\t\t\t\t\tcode.push('');\n\t\t\t\t\tcode.push('');\n\t\t\t\t\tcode.push('\\treturn Callback;');\n\n\t\t\t\t}\n\n\n\t\t\t\tif (code.length > 0) {\n\t\t\t\t\treturn code.join('\\n');\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\treturn null;\n\n\t\t}\n\n\t};\n\n\n\treturn Module;\n\n}"}},"strainer.api.Composite":{"constructor":"lychee.Definition","arguments":[{"id":"strainer.api.Composite","url":"/libraries/strainer/source/api/Composite.js"}],"blob":{"attaches":{},"requires":["strainer.api.PARSER","strainer.api.TRANSCRIPTOR"],"exports":"function (lychee, global, attachments) {\n\n\tconst _PARSER       = lychee.import('strainer.api.PARSER');\n\tconst _TRANSCRIPTOR = lychee.import('strainer.api.TRANSCRIPTOR');\n\n\n\n\t/*\n\t * CACHES\n\t */\n\n\tconst _SERIALIZE = {\n\t\ttype:       'function',\n\t\tbody:       'function() { return {}; }',\n\t\tchunk:      'function() {',\n\t\thash:       _PARSER.hash('function() { return {}; }'),\n\t\tparameters: [],\n\t\tvalues:     [{\n\t\t\ttype: 'SerializationBlob',\n\t\t\tvalue: {\n\t\t\t\t'constructor': null,\n\t\t\t\t'arguments':   [],\n\t\t\t\t'blob':        null\n\t\t\t}\n\t\t}]\n\t};\n\n\tconst _DESERIALIZE = {\n\t\ttype:       'function',\n\t\tbody:       'function(blob) {}',\n\t\tchunk:      'function(blob) {',\n\t\thash:       _PARSER.hash('function(blob) {}'),\n\t\tparameters: [{\n\t\t\tname:  'blob',\n\t\t\ttype:  'SerializationBlob',\n\t\t\tvalue: {}\n\t\t}],\n\t\tvalues: [{\n\t\t\ttype:  'undefined',\n\t\t\tvalue: undefined\n\t\t}]\n\t};\n\n\n\n\t/*\n\t * HELPERS\n\t */\n\n\tconst _validate_asset = function(asset) {\n\n\t\tif (asset instanceof Object && typeof asset.serialize === 'function') {\n\t\t\treturn true;\n\t\t}\n\n\t\treturn false;\n\n\t};\n\n\tconst _find_reference = function(chunk, stream, fuzzy) {\n\n\t\tfuzzy = fuzzy === true;\n\n\n\t\tlet ref = {\n\t\t\tchunk:  '',\n\t\t\tline:   0,\n\t\t\tcolumn: 0\n\t\t};\n\n\t\tlet lines = stream.split('\\n');\n\t\tlet line  = lines.findIndex(function(other) {\n\n\t\t\tif (fuzzy === true) {\n\t\t\t\treturn other.includes(chunk.trim());\n\t\t\t} else {\n\t\t\t\treturn other.trim() === chunk.trim();\n\t\t\t}\n\n\t\t});\n\n\t\tif (line !== -1) {\n\n\t\t\tref.chunk = lines[line];\n\t\t\tref.line  = line + 1;\n\n\t\t\tlet column = lines[line].indexOf(chunk);\n\t\t\tif (column !== -1) {\n\t\t\t\tref.column = column + 1;\n\t\t\t}\n\n\t\t}\n\n\t\treturn ref;\n\n\t};\n\n\tconst _find_enum = function(key, stream) {\n\n\t\tlet str1 = '\\n\\tComposite.' + key + ' = ';\n\t\tlet str2 = ';';\n\n\t\tlet i0 = stream.indexOf('\\n\\tconst Composite =');\n\t\tlet i1 = stream.indexOf(str1, i0);\n\t\tlet i2 = stream.indexOf(str2, i1);\n\n\t\tif (i1 !== -1 && i2 !== -1) {\n\t\t\treturn key + ' = ' + stream.substr(i1 + str1.length, i2 - i1 - str1.length + str2.length);\n\t\t}\n\n\t\treturn 'undefined';\n\n\t};\n\n\tconst _find_statement = function(line, stream) {\n\n\t\tlet i1 = stream.indexOf(line);\n\t\tlet i2 = stream.indexOf(';', i1);\n\n\t\tif (i1 !== -1 && i2 !== -1) {\n\t\t\treturn (line + stream.substr(i1 + line.length, i2 - i1 - line.length + 1)).trim();\n\t\t}\n\n\t\treturn 'undefined';\n\n\t};\n\n\tconst _find_method = function(key, stream) {\n\n\t\tlet str1 = '\\n\\t\\t' + key + ': function';\n\t\tlet str2 = '\\n\\t\\t}';\n\n\t\tlet i0 = stream.indexOf('\\n\\tComposite.prototype = {');\n\t\tlet i1 = stream.indexOf(str1, i0);\n\t\tlet i2 = stream.indexOf(str2, i1);\n\n\t\tif (i1 !== -1 && i2 !== -1) {\n\t\t\treturn 'function' + stream.substr(i1 + str1.length, i2 - i1 - str1.length + str2.length).trim();\n\t\t}\n\n\t\treturn 'undefined';\n\n\t};\n\n\tconst _parse_memory = function(memory, stream, errors) {\n\n\t\tlet i1 = stream.indexOf('.exports(function(lychee, global, attachments) {');\n\t\tlet i2 = stream.indexOf('\\n\\tconst Composite =');\n\n\t\tif (i1 !== -1 && i2 !== -1) {\n\n\t\t\tlet body = stream.substr(i1 + 48, i2 - i1 - 48);\n\t\t\tif (body.length > 0) {\n\n\t\t\t\tbody.split('\\n')\n\t\t\t\t\t.filter(line => {\n\t\t\t\t\t\treturn line.startsWith('\\tconst ') || line.startsWith('\\tlet ');\n\t\t\t\t\t})\n\t\t\t\t\t.map(line => line.trim())\n\t\t\t\t\t.forEach(line => {\n\n\t\t\t\t\t\tlet tmp = '';\n\t\t\t\t\t\tif (line.startsWith('const ')) {\n\t\t\t\t\t\t\ttmp = line.substr(6).trim();\n\t\t\t\t\t\t} else if (line.startsWith('let ')) {\n\t\t\t\t\t\t\ttmp = line.substr(4).trim();\n\t\t\t\t\t\t}\n\n\n\t\t\t\t\t\tlet i1 = tmp.indexOf('=');\n\t\t\t\t\t\tif (i1 !== -1) {\n\n\t\t\t\t\t\t\tlet key   = tmp.substr(0, i1).trim();\n\t\t\t\t\t\t\tlet chunk = tmp.substr(i1 + 1).trim();\n\n\t\t\t\t\t\t\tif (key !== '' && chunk !== '') {\n\n\t\t\t\t\t\t\t\tif (chunk.endsWith(';')) {\n\n\t\t\t\t\t\t\t\t\tchunk = chunk.substr(0, chunk.length - 1);\n\t\t\t\t\t\t\t\t\tmemory[key] = _PARSER.detect(chunk);\n\n\t\t\t\t\t\t\t\t} else {\n\n\t\t\t\t\t\t\t\t\tchunk = _PARSER.find(key, body);\n\t\t\t\t\t\t\t\t\tmemory[key] = _PARSER.detect(chunk);\n\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t});\n\n\t\t\t}\n\n\t\t}\n\n\t};\n\n\tconst _parse_constructor = function(constructor, stream) {\n\n\t\tlet i1 = stream.indexOf('\\n\\tconst Composite =');\n\t\tlet i2 = stream.indexOf('\\n\\t};', i1);\n\n\t\tif (i1 !== -1 && i2 !== -1) {\n\n\t\t\tlet body = stream.substr(i1 + 20, i2 - i1 - 17).trim();\n\t\t\tif (body.length > 0) {\n\n\t\t\t\tconstructor.type       = 'function';\n\t\t\t\tconstructor.body       = body;\n\t\t\t\tconstructor.hash       = _PARSER.hash(body);\n\t\t\t\tconstructor.parameters = _PARSER.parameters(body);\n\n\t\t\t}\n\n\t\t}\n\n\t};\n\n\tconst _parse_settings = function(settings, stream) {\n\n\t\tlet buffer = stream.split('\\n');\n\t\tlet check1 = buffer.findIndex((line, l) => line.startsWith('\\tconst Composite = '));\n\t\tlet check2 = buffer.findIndex((line, l) => (line === '\\t};' && l > check1));\n\n\t\tif (check1 !== -1 && check2 !== -1) {\n\n\t\t\tlet body = buffer.slice(check1, check2).join('\\n').trim().substr(18);\n\t\t\tif (body.length > 0) {\n\n\t\t\t\tlet object = _PARSER.settings(body);\n\t\t\t\tif (Object.keys(object).length > 0) {\n\n\t\t\t\t\tfor (let o in object) {\n\t\t\t\t\t\tsettings[o] = object[o];\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t}\n\n\t};\n\n\tconst _parse_properties = function(properties, stream) {\n\n\t\tlet buffer = stream.split('\\n');\n\t\tlet check1 = buffer.findIndex((line, l) => line.startsWith('\\tconst Composite = '));\n\t\tlet check2 = buffer.findIndex((line, l) => (line === '\\t};' && l > check1));\n\n\t\tif (check1 !== -1 && check2 !== -1) {\n\n\t\t\tlet body = buffer.slice(check1, check2).join('\\n').trim().substr(18);\n\t\t\tif (body.length > 0) {\n\n\t\t\t\tbody.split('\\n').forEach(line => {\n\n\t\t\t\t\tlet chunk = line.trim();\n\t\t\t\t\tif (chunk.startsWith('this.') && chunk.includes(' = ')) {\n\n\t\t\t\t\t\tif (chunk.endsWith('[') || chunk.endsWith('{')) {\n\n\t\t\t\t\t\t\tlet statement = _find_statement(line, body);\n\t\t\t\t\t\t\tif (statement !== 'undefined') {\n\t\t\t\t\t\t\t\tchunk = statement;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t}\n\n\n\t\t\t\t\t\tlet tmp = chunk.split(/this\\.([A-Za-z_]+)([\\s]+)=([\\s]+)([^\\0]*);/g).filter(ch => ch.trim() !== '');\n\t\t\t\t\t\tif (tmp.length === 2) {\n\n\t\t\t\t\t\t\tlet name = tmp[0];\n\t\t\t\t\t\t\tlet prop = _PARSER.detect(tmp[1]);\n\t\t\t\t\t\t\tif (prop.type === 'undefined' && /^([A-Za-z0-9]+)$/g.test(prop.chunk)) {\n\n\t\t\t\t\t\t\t\tlet mutations = _PARSER.mutations(prop.chunk, body);\n\t\t\t\t\t\t\t\tif (mutations.length > 0) {\n\n\t\t\t\t\t\t\t\t\tlet val = mutations.find(function(mutation) {\n\t\t\t\t\t\t\t\t\t\treturn mutation.type !== 'undefined';\n\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t\tif (val !== undefined) {\n\t\t\t\t\t\t\t\t\t\tprop.type  = val.type;\n\t\t\t\t\t\t\t\t\t\tprop.value = val.value;\n\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\tif (\n\t\t\t\t\t\t\t\tproperties[name] === undefined\n\t\t\t\t\t\t\t\t|| (\n\t\t\t\t\t\t\t\t\tprop.type !== 'undefined'\n\t\t\t\t\t\t\t\t\t&& (\n\t\t\t\t\t\t\t\t\t\tproperties[name].value.type === 'undefined'\n\t\t\t\t\t\t\t\t\t\t|| properties[name].value.type === 'null'\n\t\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t) {\n\n\t\t\t\t\t\t\t\tproperties[name] = {\n\t\t\t\t\t\t\t\t\tchunk: chunk,\n\t\t\t\t\t\t\t\t\tvalue: prop\n\t\t\t\t\t\t\t\t};\n\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t});\n\n\t\t\t}\n\n\t\t}\n\n\t};\n\n\tconst _parse_enums = function(enums, stream) {\n\n\t\tlet i1 = stream.indexOf('\\n\\t};', stream.indexOf('\\n\\tconst Composite =')) + 4;\n\t\tlet i2 = stream.indexOf('\\n\\tComposite.prototype =', i1);\n\n\t\tif (i1 !== -1 && i2 !== -1) {\n\n\t\t\tstream.substr(i1, i2 - i1).trim().split('\\n')\n\t\t\t\t.filter(function(line) {\n\n\t\t\t\t\tlet tmp = line.trim();\n\t\t\t\t\tif (tmp.startsWith('Composite.') && tmp.includes('=')) {\n\t\t\t\t\t\treturn true;\n\t\t\t\t\t}\n\n\t\t\t\t\treturn false;\n\n\t\t\t\t}).forEach(function(chunk) {\n\n\t\t\t\t\tlet enam = null;\n\n\t\t\t\t\tif (chunk.includes('//')) {\n\t\t\t\t\t\tchunk = chunk.split('//')[0];\n\t\t\t\t\t}\n\n\n\t\t\t\t\tif (chunk.endsWith(';')) {\n\n\t\t\t\t\t\tenam = _PARSER.enum(chunk.trim());\n\n\t\t\t\t\t} else {\n\n\t\t\t\t\t\tlet name = chunk.split('=')[0].trim().split('.')[1];\n\t\t\t\t\t\tlet body = _find_enum(name, stream);\n\n\t\t\t\t\t\tif (body !== 'undefined') {\n\t\t\t\t\t\t\tenam = _PARSER.enum(body);\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\n\t\t\t\t\tif (enam !== null && enam.name !== undefined) {\n\n\t\t\t\t\t\tif (enam.values !== undefined) {\n\n\t\t\t\t\t\t\tenums[enam.name] = {\n\t\t\t\t\t\t\t\tvalues: enam.values\n\t\t\t\t\t\t\t};\n\n\t\t\t\t\t\t} else if (enam.value !== undefined) {\n\n\t\t\t\t\t\t\tenums[enam.name] = {\n\t\t\t\t\t\t\t\tvalue: enam.value\n\t\t\t\t\t\t\t};\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t});\n\n\t\t}\n\n\t};\n\n\tconst _add_event = function(events, event, method) {\n\n\t\tmethod = typeof method === 'string' ? method : null;\n\n\n\t\tlet cache = events[event.name];\n\t\tif (cache === undefined) {\n\n\t\t\tcache = events[event.name] = {\n\t\t\t\tname:       event.name,\n\t\t\t\tmethods:    [],\n\t\t\t\tparameters: event.parameters\n\t\t\t};\n\n\t\t\tif (method !== null) {\n\t\t\t\tcache.methods.push(method);\n\t\t\t}\n\n\t\t} else {\n\n\t\t\tif (method !== null) {\n\n\t\t\t\tif (cache.methods.includes(method) === false) {\n\t\t\t\t\tcache.methods.push(method);\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\tlet c_params = cache.parameters;\n\t\t\tlet e_params = event.parameters;\n\n\t\t\tif (c_params.length !== e_params.length) {\n\n\t\t\t\tif (c_params.length > e_params.length) {\n\n\t\t\t\t\tc_params.forEach(function(param, c) {\n\n\t\t\t\t\t\tlet other = e_params[c];\n\t\t\t\t\t\tif (other !== undefined) {\n\n\t\t\t\t\t\t\tif (param.type === 'undefined' && other.type !== 'undefined') {\n\t\t\t\t\t\t\t\tparam.chunk = other.chunk;\n\t\t\t\t\t\t\t\tparam.type  = other.type;\n\t\t\t\t\t\t\t\tparam.value = other.value;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t});\n\n\t\t\t\t} else {\n\n\t\t\t\t\te_params.forEach(function(param, e) {\n\n\t\t\t\t\t\tlet other = c_params[e];\n\t\t\t\t\t\tif (other !== undefined) {\n\n\t\t\t\t\t\t\tif (param.type === 'undefined' && other.type !== 'undefined') {\n\t\t\t\t\t\t\t\tparam.chunk = other.chunk;\n\t\t\t\t\t\t\t\tparam.type  = other.type;\n\t\t\t\t\t\t\t\tparam.value = other.value;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t} else if (other === undefined) {\n\t\t\t\t\t\t\tc_params[e] = param;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t});\n\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t}\n\t};\n\n\tconst _parse_events = function(constructor, methods, events, stream, errors) {\n\n\t\tlet construct = constructor.body || null;\n\t\tif (construct !== null) {\n\n\t\t\tlet ewents = _PARSER.events(construct);\n\t\t\tif (ewents.length > 0) {\n\n\t\t\t\tewents.forEach(function(event) {\n\t\t\t\t\t_add_event(events, event);\n\t\t\t\t});\n\n\t\t\t}\n\n\t\t}\n\n\t\tfor (let mid in methods) {\n\n\t\t\tlet method = methods[mid];\n\t\t\tlet body   = method.body;\n\t\t\tlet ewents = _PARSER.events(body);\n\t\t\tif (ewents.length > 0) {\n\n\t\t\t\tewents.forEach(function(event) {\n\t\t\t\t\t_add_event(events, event, mid);\n\t\t\t\t});\n\n\t\t\t}\n\n\t\t}\n\n\t};\n\n\tconst _parse_methods = function(methods, stream, errors) {\n\n\t\tlet buffer = stream.split('\\n');\n\t\tlet check1 = buffer.findIndex((line, l) => (line === '\\tComposite.prototype = {'));\n\t\tlet check2 = buffer.findIndex((line, l) => (line === '\\t};' && l > check1));\n\n\t\tif (check1 !== -1 && check2 !== -1) {\n\n\t\t\tbuffer.slice(check1 + 1, check2).filter(line => {\n\n\t\t\t\tif (line.startsWith('\\t\\t')) {\n\n\t\t\t\t\tlet tmp = line.substr(2);\n\t\t\t\t\tif (/^([A-Za-z0-9]+):\\sfunction/g.test(tmp)) {\n\t\t\t\t\t\treturn true;\n\t\t\t\t\t} else if (tmp.startsWith('// deserialize: function(blob) {}')) {\n\t\t\t\t\t\tmethods['deserialize'] = Object.assign({}, _DESERIALIZE);\n\t\t\t\t\t} else if (tmp.startsWith('// serialize: function() {}')) {\n\t\t\t\t\t\tmethods['serialize'] = Object.assign({}, _SERIALIZE);\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t\treturn false;\n\n\t\t\t}).forEach(chunk => {\n\n\t\t\t\tlet name = chunk.split(':')[0].trim();\n\t\t\t\tlet body = _find_method(name, stream);\n\n\t\t\t\tif (body !== 'undefined') {\n\t\t\t\t\tmethods[name] = _PARSER.detect(body);\n\t\t\t\t}\n\n\t\t\t});\n\n\n\t\t\tlet deserialize = methods['deserialize'];\n\t\t\tif (deserialize !== undefined) {\n\t\t\t\tif (deserialize.parameters.length === 0) deserialize.parameters = lychee.assignunlink([], _DESERIALIZE.parameters);\n\t\t\t\tif (deserialize.values.length === 0)     deserialize.values     = lychee.assignunlink([], _DESERIALIZE.values);\n\t\t\t}\n\n\t\t\tlet serialize = methods['serialize'];\n\t\t\tif (serialize !== undefined) {\n\t\t\t\tif (serialize.parameters.length === 0) serialize.parameters = lychee.assignunlink([], _SERIALIZE.parameters);\n\t\t\t\tif (serialize.values.length === 0)     serialize.values     = lychee.assignunlink([], _SERIALIZE.values);\n\t\t\t}\n\n\n\t\t\tfor (let mid in methods) {\n\n\t\t\t\tlet method = methods[mid];\n\t\t\t\tlet params = method.parameters;\n\t\t\t\tlet ref    = _find_reference(method.chunk, stream);\n\t\t\t\tlet values = method.values;\n\n\t\t\t\tif (params.length > 0) {\n\n\t\t\t\t\tlet found = params.filter(p => p.type === 'undefined' && p.value === undefined).map(p => p.name);\n\t\t\t\t\tif (found.length > 0) {\n\n\t\t\t\t\t\tif (/^(control|render|update|deserialize|serialize)$/g.test(mid) === false) {\n\n\t\t\t\t\t\t\tlet key = found[0];\n\t\t\t\t\t\t\tlet col = ref.chunk.indexOf(key);\n\t\t\t\t\t\t\tif (col !== -1) {\n\t\t\t\t\t\t\t\tcol = col + 1;\n\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\tcol = ref.column;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\terrors.push({\n\t\t\t\t\t\t\t\turl:       null,\n\t\t\t\t\t\t\t\trule:      'no-parameter-value',\n\t\t\t\t\t\t\t\treference: mid,\n\t\t\t\t\t\t\t\tmessage:   'Invalid parameter values for \"' + found.join('\", \"') + '\" for method \"' + mid + '()\".',\n\t\t\t\t\t\t\t\tline:      ref.line,\n\t\t\t\t\t\t\t\tcolumn:    col\n\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t\tif (values.length === 0) {\n\n\t\t\t\t\tif (/^(render|update)$/g.test(mid) === false) {\n\n\t\t\t\t\t\terrors.push({\n\t\t\t\t\t\t\turl:       null,\n\t\t\t\t\t\t\trule:      'no-return-value',\n\t\t\t\t\t\t\treference: mid,\n\t\t\t\t\t\t\tmessage:   'Invalid return value for method \"' + mid + '()\".',\n\t\t\t\t\t\t\tline:      ref.line,\n\t\t\t\t\t\t\tcolumn:    ref.column\n\t\t\t\t\t\t});\n\n\t\t\t\t\t}\n\n\n\t\t\t\t\tmethod.values.push({\n\t\t\t\t\t\ttype:  'undefined',\n\t\t\t\t\t\tvalue: undefined\n\t\t\t\t\t});\n\n\t\t\t\t} else if (values.length > 0) {\n\n\t\t\t\t\tif (/^(serialize|deserialize)$/g.test(mid) === false) {\n\n\t\t\t\t\t\tvalues.forEach(val => {\n\n\t\t\t\t\t\t\tif (val.type === 'undefined' && val.value === undefined) {\n\n\t\t\t\t\t\t\t\tlet message = 'Unguessable return value for method \"' + mid + '()\".';\n\t\t\t\t\t\t\t\tlet chunk   = (val.chunk || '').trim();\n\n\t\t\t\t\t\t\t\tif (chunk !== '') {\n\t\t\t\t\t\t\t\t\tmessage = 'Unguessable return value \"' + chunk + '\" for method \"' + mid + '()\".';\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\terrors.push({\n\t\t\t\t\t\t\t\t\turl:       null,\n\t\t\t\t\t\t\t\t\trule:      'unguessable-return-value',\n\t\t\t\t\t\t\t\t\treference: mid,\n\t\t\t\t\t\t\t\t\tmessage:   message,\n\t\t\t\t\t\t\t\t\tline:      ref.line,\n\t\t\t\t\t\t\t\t\tcolumn:    ref.column\n\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t});\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t}\n\n\t};\n\n\n\n\t/*\n\t * IMPLEMENTATION\n\t */\n\n\tconst Module = {\n\n\t\t// deserialize: function(blob) {},\n\n\t\tserialize: function() {\n\n\t\t\treturn {\n\t\t\t\t'reference': 'strainer.api.Composite',\n\t\t\t\t'arguments': []\n\t\t\t};\n\n\t\t},\n\n\t\tcheck: function(asset, header) {\n\n\t\t\tasset  = _validate_asset(asset) === true ? asset  : null;\n\t\t\theader = header instanceof Object        ? header : {};\n\n\n\t\t\tlet errors = [];\n\t\t\tlet memory = {};\n\t\t\tlet result = {\n\t\t\t\tconstructor: {\n\t\t\t\t\ttype:       null,\n\t\t\t\t\tbody:       null,\n\t\t\t\t\thash:       null,\n\t\t\t\t\tparameters: []\n\t\t\t\t},\n\t\t\t\tsettings:    {},\n\t\t\t\tproperties:  {},\n\t\t\t\tenums:       {},\n\t\t\t\tevents:      {},\n\t\t\t\tmethods:     {}\n\t\t\t};\n\n\t\t\tif (asset !== null) {\n\n\t\t\t\tlet stream = asset.buffer.toString('utf8');\n\n\t\t\t\t_parse_memory(memory, stream, errors);\n\t\t\t\t_parse_constructor(result.constructor, stream, errors);\n\t\t\t\t_parse_settings(result.settings, stream, errors);\n\t\t\t\t_parse_properties(result.properties, stream, errors);\n\t\t\t\t_parse_enums(result.enums, stream, errors);\n\t\t\t\t_parse_methods(result.methods, stream, errors);\n\t\t\t\t_parse_events(result.constructor, result.methods, result.events, stream, errors);\n\n\n\t\t\t\tif (result.constructor.parameters.length === 1) {\n\n\t\t\t\t\tlet check = result.constructor.parameters[0];\n\t\t\t\t\tif (check.name === 'data' || check.name === 'settings') {\n\n\t\t\t\t\t\tcheck.type = 'Object';\n\n\t\t\t\t\t} else if (/^(main|client|remote|server)$/g.test(check.name) === false) {\n\n\t\t\t\t\t\tlet chunk = result.constructor.body.split('\\n')[0];\n\t\t\t\t\t\tlet ref   = _find_reference('\\n\\tconst Composite = ' + chunk, stream);\n\n\t\t\t\t\t\terrors.push({\n\t\t\t\t\t\t\turl:       null,\n\t\t\t\t\t\t\trule:      'no-composite',\n\t\t\t\t\t\t\treference: 'constructor',\n\t\t\t\t\t\t\tmessage:   'Composite has no \"settings\" object.',\n\t\t\t\t\t\t\tline:      ref.line,\n\t\t\t\t\t\t\tcolumn:    ref.column\n\t\t\t\t\t\t});\n\n\t\t\t\t\t}\n\n\t\t\t\t} else {\n\n\t\t\t\t\tlet ref = _find_reference('\\n\\tconst Composite = function(', stream, true);\n\t\t\t\t\tif (ref.chunk === '') {\n\n\t\t\t\t\t\tref = _find_reference('Composite =', stream, true);\n\n\t\t\t\t\t\terrors.push({\n\t\t\t\t\t\t\turl:       null,\n\t\t\t\t\t\t\trule:      'no-composite',\n\t\t\t\t\t\t\treference: 'constructor',\n\t\t\t\t\t\t\tmessage:   'Composite is not constant (missing \"const\" declaration).',\n\t\t\t\t\t\t\tline:      ref.line,\n\t\t\t\t\t\t\tcolumn:    ref.column\n\t\t\t\t\t\t});\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\n\t\t\t\tlet body = result.constructor.body || null;\n\t\t\t\tif (body !== null) {\n\n\t\t\t\t\tlet check = result.constructor.parameters[0] || null;\n\t\t\t\t\tif (check !== null && check.name === 'data') {\n\n\t\t\t\t\t\tlet ref1 = _find_reference('\\n\\t\\tlet settings = ',  body, true);\n\t\t\t\t\t\tlet ref2 = _find_reference('\\n\\t\\tsettings = null;', body);\n\n\t\t\t\t\t\tif (ref1.line !== 0 && ref2.line === 0) {\n\n\t\t\t\t\t\t\tlet ref = _find_reference('\\n\\t\\tlet settings = ', stream, true);\n\n\t\t\t\t\t\t\terrors.push({\n\t\t\t\t\t\t\t\turl:       null,\n\t\t\t\t\t\t\t\trule:      'no-garbage',\n\t\t\t\t\t\t\t\treference: 'constructor',\n\t\t\t\t\t\t\t\tmessage:   'Composite produces garbage (missing \"settings = null\" statement).',\n\t\t\t\t\t\t\t\tline:      ref.line,\n\t\t\t\t\t\t\t\tcolumn:    ref.column\n\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t} else if (ref1.line === 0) {\n\n\t\t\t\t\t\t\tlet ref = _find_reference('\\n\\tconst Composite = function(', stream, true);\n\n\t\t\t\t\t\t\terrors.push({\n\t\t\t\t\t\t\t\turl:       null,\n\t\t\t\t\t\t\t\trule:      'no-settings',\n\t\t\t\t\t\t\t\treference: 'constructor',\n\t\t\t\t\t\t\t\tmessage:   'Composite ignores settings (missing \"let settings = Object.assign({}, data)\" statement).',\n\t\t\t\t\t\t\t\tline:      ref.line,\n\t\t\t\t\t\t\t\tcolumn:    ref.column\n\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\n\t\t\t\t\tfor (let name in memory) {\n\n\t\t\t\t\t\tlet entry = memory[name];\n\t\t\t\t\t\tif (entry.type === 'lychee.Definition') {\n\n\t\t\t\t\t\t\tlet id  = entry.value.reference;\n\t\t\t\t\t\t\tlet ref = _find_reference('\\n\\t\\t' + name + '.call(this', body, true);\n\n\t\t\t\t\t\t\tif (header.includes.includes(id) === false && ref.line !== 0) {\n\n\t\t\t\t\t\t\t\terrors.push({\n\t\t\t\t\t\t\t\t\turl:       null,\n\t\t\t\t\t\t\t\t\trule:      'no-includes',\n\t\t\t\t\t\t\t\t\treference: name,\n\t\t\t\t\t\t\t\t\tmessage:   'Invalid Definition (missing includes() entry for \"' + id + '\").',\n\t\t\t\t\t\t\t\t\tline:      0,\n\t\t\t\t\t\t\t\t\tcolumn:    0\n\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t} else if (header.includes.includes(id) === true && ref.line === 0) {\n\n\t\t\t\t\t\t\t\terrors.push({\n\t\t\t\t\t\t\t\t\turl:       null,\n\t\t\t\t\t\t\t\t\trule:      'no-constructor-call',\n\t\t\t\t\t\t\t\t\treference: name,\n\t\t\t\t\t\t\t\t\tmessage:   'Invalid Definition (missing constructor call for \"' + id + '\").',\n\t\t\t\t\t\t\t\t\tline:      0,\n\t\t\t\t\t\t\t\t\tcolumn:    0\n\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t} else if (header.includes.includes(id) === false && header.requires.includes(id) === false) {\n\n\t\t\t\t\t\t\t\terrors.push({\n\t\t\t\t\t\t\t\t\turl:       null,\n\t\t\t\t\t\t\t\t\trule:      'no-requires',\n\t\t\t\t\t\t\t\t\treference: name,\n\t\t\t\t\t\t\t\t\tmessage:   'Invalid Definition (missing requires() entry for \"' + id + '\").',\n\t\t\t\t\t\t\t\t\tline:      0,\n\t\t\t\t\t\t\t\t\tcolumn:    0\n\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\n\t\t\t\tfor (let p in result.properties) {\n\n\t\t\t\t\tlet property = result.properties[p];\n\t\t\t\t\tif (property.value.type === 'undefined') {\n\n\t\t\t\t\t\tlet method = result.methods['set' + p.charAt(0).toUpperCase() + p.substr(1)] || null;\n\t\t\t\t\t\tif (method !== null) {\n\n\t\t\t\t\t\t\tlet found = method.parameters.find(function(val) {\n\t\t\t\t\t\t\t\treturn p === val.name;\n\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\tif (found !== undefined && found.type !== 'undefined') {\n\t\t\t\t\t\t\t\tproperty.value.type = found.type;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t\tif (property.value.type === 'undefined' && property.value.value === undefined) {\n\n\t\t\t\t\t\tlet ref = _find_reference(property.chunk, stream);\n\n\t\t\t\t\t\terrors.push({\n\t\t\t\t\t\t\turl:       null,\n\t\t\t\t\t\t\trule:      'unguessable-property-value',\n\t\t\t\t\t\t\treference: p,\n\t\t\t\t\t\t\tmessage:   'Unguessable property \"' + p + '\".',\n\t\t\t\t\t\t\tline:      ref.line,\n\t\t\t\t\t\t\tcolumn:    ref.column\n\t\t\t\t\t\t});\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\n\t\t\t\tif (\n\t\t\t\t\tresult.methods['deserialize'] === undefined\n\t\t\t\t\t|| result.methods['serialize'] === undefined\n\t\t\t\t) {\n\n\t\t\t\t\tlet ref = _find_reference('\\n\\tComposite.prototype =', stream, true);\n\n\t\t\t\t\tif (result.methods['deserialize'] === undefined) {\n\n\t\t\t\t\t\terrors.push({\n\t\t\t\t\t\t\turl:       null,\n\t\t\t\t\t\t\trule:      'no-deserialize',\n\t\t\t\t\t\t\treference: 'deserialize',\n\t\t\t\t\t\t\tmessage:   'No \"deserialize()\" method.',\n\t\t\t\t\t\t\tline:      ref.line,\n\t\t\t\t\t\t\tcolumn:    ref.column\n\t\t\t\t\t\t});\n\n\t\t\t\t\t}\n\n\t\t\t\t\tif (result.methods['serialize'] === undefined) {\n\n\t\t\t\t\t\terrors.push({\n\t\t\t\t\t\t\turl:       null,\n\t\t\t\t\t\t\trule:      'no-serialize',\n\t\t\t\t\t\t\treference: 'serialize',\n\t\t\t\t\t\t\tmessage:    'No \"serialize()\" method.',\n\t\t\t\t\t\t\tline:       ref.line,\n\t\t\t\t\t\t\tcolumn:     ref.column\n\t\t\t\t\t\t});\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\treturn {\n\t\t\t\terrors: errors,\n\t\t\t\tmemory: memory,\n\t\t\t\tresult: result\n\t\t\t};\n\n\t\t},\n\n\t\ttranscribe: function(asset) {\n\n\t\t\tasset = _validate_asset(asset) === true ? asset : null;\n\n\n\t\t\tif (asset !== null) {\n\n\t\t\t\tlet code = [];\n\n\n\t\t\t\tlet api = asset.buffer;\n\t\t\t\tif (api instanceof Object) {\n\n\t\t\t\t\tlet memory = api.memory || null;\n\t\t\t\t\tlet result = api.result || null;\n\n\n\t\t\t\t\tif (memory instanceof Object) {\n\n\t\t\t\t\t\tfor (let m in memory) {\n\n\t\t\t\t\t\t\tlet chunk = _TRANSCRIPTOR.transcribe(m, memory[m]);\n\t\t\t\t\t\t\tif (chunk !== null) {\n\t\t\t\t\t\t\t\tcode.push('\\t' + chunk);\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\n\t\t\t\t\tlet construct = result.constructor || null;\n\t\t\t\t\tif (construct !== null) {\n\n\t\t\t\t\t\tlet chunk = _TRANSCRIPTOR.transcribe('Composite', construct);\n\t\t\t\t\t\tif (chunk !== null) {\n\t\t\t\t\t\t\tcode.push('');\n\t\t\t\t\t\t\tcode.push('');\n\t\t\t\t\t\t\tcode.push('\\t' + chunk);\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\n\t\t\t\t\tif (Object.keys(result.methods).length > 0) {\n\n\t\t\t\t\t\tlet chunk = _TRANSCRIPTOR.transcribe('Composite.prototype', result.methods, true);\n\t\t\t\t\t\tif (chunk !== null) {\n\t\t\t\t\t\t\tcode.push('');\n\t\t\t\t\t\t\tcode.push('');\n\t\t\t\t\t\t\tcode.push('\\t' + chunk);\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\n\t\t\t\t\tcode.push('');\n\t\t\t\t\tcode.push('');\n\t\t\t\t\tcode.push('\\treturn Composite;');\n\n\t\t\t\t}\n\n\n\t\t\t\tif (code.length > 0) {\n\t\t\t\t\treturn code.join('\\n');\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\treturn null;\n\n\t\t}\n\n\t};\n\n\n\treturn Module;\n\n}"}},"strainer.api.Definition":{"constructor":"lychee.Definition","arguments":[{"id":"strainer.api.Definition","url":"/libraries/strainer/source/api/Definition.js"}],"blob":{"attaches":{},"requires":["strainer.api.PARSER"],"exports":"function (lychee, global, attachments) {\n\n\tconst _PARSER = lychee.import('strainer.api.PARSER');\n\n\n\n\t/*\n\t * HELPERS\n\t */\n\n\tconst _create_error = function(rule, message) {\n\n\t\treturn {\n\t\t\turl:       null,\n\t\t\trule:      rule,\n\t\t\treference: null,\n\t\t\tmessage:   message,\n\t\t\tline:      0,\n\t\t\tcolumn:    0\n\n\t\t};\n\n\t};\n\n\tconst _validate_asset = function(asset) {\n\n\t\tif (asset instanceof Object && typeof asset.serialize === 'function') {\n\t\t\treturn true;\n\t\t}\n\n\t\treturn false;\n\n\t};\n\n\tconst _parse_value = function(str) {\n\n\t\tlet val = undefined;\n\t\tif (/^(this|global)$/g.test(str) === false) {\n\n\t\t\ttry {\n\t\t\t\tval = eval('(' + str + ')');\n\t\t\t} catch (err) {\n\t\t\t}\n\n\t\t}\n\n\t\treturn val;\n\n\t};\n\n\tconst _parse_identifier = function(result, stream, errors) {\n\n\t\tlet i1  = stream.indexOf('lychee');\n\t\tlet i2  = stream.indexOf('\\n', i1);\n\t\tlet tmp = stream.substr(0, i2).trim();\n\n\t\tif (tmp.startsWith('lychee.define(')) {\n\n\t\t\tlet tmp1 = tmp.split(/lychee\\.define\\(\"?'?([A-Za-z.-]+)\"?'?\\)\\.(.*)/g);\n\t\t\tif (tmp1.length > 1) {\n\n\t\t\t\tlet id = tmp1[1];\n\t\t\t\tif (id.charAt(0) === id.charAt(0).toUpperCase()) {\n\t\t\t\t\tresult.identifier = 'lychee.' + id;\n\t\t\t\t} else {\n\t\t\t\t\tresult.identifier = id;\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t}\n\n\t};\n\n\tconst _parse_supports = function(supports, stream, errors) {\n\n\t\tlet i1 = stream.indexOf('supports(');\n\t\tlet i2 = stream.indexOf('})', i1);\n\n\t\tif (i1 !== -1 && i2 !== -1) {\n\n\t\t\tlet body = stream.substr(i1 + 9, i2 - i1 - 8).trim();\n\t\t\tif (body.length > 0) {\n\n\t\t\t\tsupports.body       = body;\n\t\t\t\tsupports.hash       = _PARSER.hash(body);\n\t\t\t\tsupports.parameters = _PARSER.parameters(body);\n\n\t\t\t}\n\n\t\t}\n\n\t};\n\n\tconst _parse_attaches = function(attaches, stream, errors) {\n\n\t\tlet i1 = stream.indexOf('attaches({');\n\t\tlet i2 = stream.indexOf('\\n})', i1);\n\t\tlet i3 = stream.indexOf('exports(function(lychee, global, attachments) {\\n');\n\n\t\tif (i1 !== -1 && i2 !== -1 && i3 !== -1 && i1 < i3) {\n\n\t\t\tlet tmp1 = stream.substr(i1 + 9, i2 - i1 - 7);\n\t\t\tif (tmp1.length > 0 && tmp1.startsWith('{') && tmp1.endsWith('}')) {\n\n\t\t\t\tlet tmp2 = _parse_value(tmp1);\n\t\t\t\tif (tmp2 !== undefined) {\n\n\t\t\t\t\tfor (let t in tmp2) {\n\t\t\t\t\t\tattaches[t] = lychee.serialize(tmp2[t]);\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t}\n\n\t};\n\n\tconst _parse_tags = function(tags, stream, errors) {\n\n\t\tlet i1 = stream.indexOf('tags({');\n\t\tlet i2 = stream.indexOf('\\n})', i1);\n\t\tlet i3 = stream.indexOf('exports(function(lychee, global, attachments) {\\n');\n\n\t\tif (i1 !== -1 && i2 !== -1 && i3 !== -1 && i1 < i3) {\n\n\t\t\tlet tmp1 = stream.substr(i1 + 5, i2 - i1 - 3);\n\t\t\tif (tmp1.length > 0 && tmp1.startsWith('{') && tmp1.endsWith('}')) {\n\n\t\t\t\tlet tmp2 = _parse_value(tmp1);\n\t\t\t\tif (tmp2 !== undefined) {\n\n\t\t\t\t\tfor (let t in tmp2) {\n\t\t\t\t\t\ttags[t] = tmp2[t];\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t}\n\n\t};\n\n\tconst _parse_requires = function(requires, stream, errors) {\n\n\t\tlet i1 = stream.indexOf('requires([');\n\t\tlet i2 = stream.indexOf('\\n])', i1);\n\t\tlet i3 = stream.indexOf('exports(function(lychee, global, attachments) {\\n');\n\n\t\tif (i1 !== -1 && i2 !== -1 && i3 !== -1 && i1 < i3) {\n\n\t\t\tlet tmp1 = stream.substr(i1 + 9, i2 - i1 - 7);\n\t\t\tif (tmp1.length > 0 && tmp1.startsWith('[') && tmp1.endsWith(']')) {\n\n\t\t\t\tlet tmp2 = _parse_value(tmp1);\n\t\t\t\tif (tmp2 !== undefined && tmp2 instanceof Array) {\n\n\t\t\t\t\ttmp2.forEach(function(value) {\n\n\t\t\t\t\t\tif (requires.indexOf(value) === -1) {\n\t\t\t\t\t\t\trequires.push(value);\n\t\t\t\t\t\t}\n\n\t\t\t\t\t});\n\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t}\n\n\t};\n\n\tconst _parse_includes = function(includes, stream, errors) {\n\n\t\tlet i1 = stream.indexOf('includes([');\n\t\tlet i2 = stream.indexOf('\\n])', i1);\n\t\tlet i3 = stream.indexOf('exports(function(lychee, global, attachments) {\\n');\n\n\t\tif (i1 !== -1 && i2 !== -1 && i3 !== -1 && i1 < i3) {\n\n\t\t\tlet tmp1 = stream.substr(i1 + 9, i2 - i1 - 7);\n\t\t\tif (tmp1.length > 0 && tmp1.startsWith('[') && tmp1.endsWith(']')) {\n\n\t\t\t\tlet tmp2 = _parse_value(tmp1);\n\t\t\t\tif (tmp2 !== undefined && tmp2 instanceof Array) {\n\n\t\t\t\t\ttmp2.forEach(function(value) {\n\n\t\t\t\t\t\tif (includes.indexOf(value) === -1) {\n\t\t\t\t\t\t\tincludes.push(value);\n\t\t\t\t\t\t}\n\n\t\t\t\t\t});\n\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t}\n\n\t};\n\n\n\n\t/*\n\t * IMPLEMENTATION\n\t */\n\n\tconst Module = {\n\n\t\t// deserialize: function(blob) {},\n\n\t\tserialize: function() {\n\n\t\t\treturn {\n\t\t\t\t'reference': 'strainer.api.Definition',\n\t\t\t\t'arguments': []\n\t\t\t};\n\n\t\t},\n\n\t\tcheck: function(asset) {\n\n\t\t\tasset = _validate_asset(asset) === true ? asset : null;\n\n\n\t\t\tlet errors = [];\n\t\t\tlet result = {\n\t\t\t\tidentifier: null,\n\t\t\t\tattaches:   {},\n\t\t\t\ttags:       {},\n\t\t\t\trequires:   [],\n\t\t\t\tincludes:   [],\n\t\t\t\tsupports:   {}\n\t\t\t};\n\n\t\t\tif (asset !== null) {\n\n\t\t\t\tlet stream = asset.buffer.toString('utf8');\n\n\t\t\t\t_parse_identifier(result, stream, errors);\n\t\t\t\t_parse_attaches(result.attaches, stream, errors);\n\t\t\t\t_parse_tags(result.tags, stream, errors);\n\t\t\t\t_parse_requires(result.requires, stream, errors);\n\t\t\t\t_parse_includes(result.includes, stream, errors);\n\t\t\t\t_parse_supports(result.supports, stream, errors);\n\n\t\t\t\t// XXX: exports are unnecessary\n\t\t\t\t// _parse_exports(result.exports, stream, errors);\n\n\n\t\t\t\tlet i1 = stream.indexOf('lychee.define(');\n\t\t\t\tlet i2 = stream.indexOf('exports(function(lychee, global, attachments) {\\n', i1);\n\n\t\t\t\tif (i1 === -1) {\n\n\t\t\t\t\terrors.push({\n\t\t\t\t\t\turl:       null,\n\t\t\t\t\t\trule:      'no-define',\n\t\t\t\t\t\treference: null,\n\t\t\t\t\t\tmessage:   'Invalid Definition (missing define()).',\n\t\t\t\t\t\tline:      0,\n\t\t\t\t\t\tcolumn:    0\n\t\t\t\t\t});\n\n\t\t\t\t}\n\n\t\t\t\tif (i2 === -1) {\n\n\t\t\t\t\terrors.push({\n\t\t\t\t\t\turl:       null,\n\t\t\t\t\t\trule:      'no-exports',\n\t\t\t\t\t\treference: null,\n\t\t\t\t\t\tmessage:   'Invalid Definition (missing exports()).',\n\t\t\t\t\t\tline:      0,\n\t\t\t\t\t\tcolumn:    0\n\t\t\t\t\t});\n\n\t\t\t\t}\n\n\n\t\t\t\tlet i3 = stream.indexOf('requires([\\n');\n\t\t\t\tlet i4 = stream.indexOf('includes([\\n');\n\t\t\t\tlet i5 = stream.indexOf('supports(function(lychee, global) {\\n');\n\t\t\t\tlet i6 = stream.indexOf('exports(function(lychee, global, attachments) {\\n');\n\n\t\t\t\tif (i3 !== -1 && i4 !== -1 && i3 > i4) {\n\t\t\t\t\terrors.push(_create_error('no-meta', 'Invalid Definition (\"requires()\" after \"includes()\").'));\n\t\t\t\t}\n\n\t\t\t\tif (i3 !== -1 && i5 !== -1 && i3 > i5) {\n\t\t\t\t\terrors.push(_create_error('no-meta', 'Invalid Definition (\"requires()\" after \"supports()\").'));\n\t\t\t\t}\n\n\t\t\t\tif (i4 !== -1 && i5 !== -1 && i4 > i5) {\n\t\t\t\t\terrors.push(_create_error('no-meta', 'Invalid Definition (\"includes()\" after \"supports()\").'));\n\t\t\t\t}\n\n\t\t\t\tif (i3 !== -1 && i6 !== -1 && i3 > i6) {\n\t\t\t\t\terrors.push(_create_error('no-meta', 'Invalid Definition (\"requires()\" after \"exports()\").'));\n\t\t\t\t}\n\n\t\t\t\tif (i4 !== -1 && i6 !== -1 && i4 > i6) {\n\t\t\t\t\terrors.push(_create_error('no-meta', 'Invalid Definition (\"includes()\" after \"exports()\").'));\n\t\t\t\t}\n\n\t\t\t\tif (i5 !== -1 && i6 !== -1 && i5 > i6) {\n\t\t\t\t\terrors.push(_create_error('no-meta', 'Invalid Definition (\"supports()\" after \"exports()\").'));\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\treturn {\n\t\t\t\terrors: errors,\n\t\t\t\tresult: result\n\t\t\t};\n\n\t\t},\n\n\t\ttranscribe: function(asset) {\n\n\t\t\tasset = _validate_asset(asset) === true ? asset : null;\n\n\n\t\t\tif (asset !== null) {\n\n\t\t\t\tlet code   = null;\n\t\t\t\tlet report = asset.buffer || {\n\t\t\t\t\theader: {},\n\t\t\t\t\tmemory: {},\n\t\t\t\t\terrors: [],\n\t\t\t\t\tresult: {}\n\t\t\t\t};\n\n\n\t\t\t\tif (report.header instanceof Object) {\n\n\t\t\t\t\tlet identifier = report.header.identifier || null;\n\t\t\t\t\tif (identifier !== null) {\n\n\t\t\t\t\t\tcode = 'lychee.define(\\'' + report.header.identifier + '\\')';\n\n\n\t\t\t\t\t\tlet tags = report.header.tags || {};\n\t\t\t\t\t\tif (Object.keys(tags).length > 0) {\n\t\t\t\t\t\t\tcode += '.tags(';\n\t\t\t\t\t\t\tcode += JSON.stringify(tags, null, '\\t');\n\t\t\t\t\t\t\tcode += ')';\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tlet requires = report.header.requires || [];\n\t\t\t\t\t\tif (requires.length > 0) {\n\t\t\t\t\t\t\tcode += '.requires(';\n\t\t\t\t\t\t\tcode += JSON.stringify(requires, null, '\\t');\n\t\t\t\t\t\t\tcode += ')';\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tlet includes = report.header.includes || [];\n\t\t\t\t\t\tif (includes.length > 0) {\n\t\t\t\t\t\t\tcode += '.includes(';\n\t\t\t\t\t\t\tcode += JSON.stringify(includes, null, '\\t');\n\t\t\t\t\t\t\tcode += ')';\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tlet supports = report.header.support || null;\n\t\t\t\t\t\tif (supports !== null) {\n\t\t\t\t\t\t\tcode += '.supports(';\n\t\t\t\t\t\t\tcode += supports.body;\n\t\t\t\t\t\t\tcode += ')';\n\t\t\t\t\t\t}\n\n\n\t\t\t\t\t\tcode += '.exports(function(lychee, global, attachments) {';\n\t\t\t\t\t\tcode += '\\n\\n%BODY%\\n\\n';\n\t\t\t\t\t\tcode += '});';\n\t\t\t\t\t\tcode += '\\n';\n\n\n\t\t\t\t\t\treturn code;\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\treturn null;\n\n\t\t}\n\n\t};\n\n\n\treturn Module;\n\n}"}},"strainer.api.Core":{"constructor":"lychee.Definition","arguments":[{"id":"strainer.api.Core","url":"/libraries/strainer/source/api/Core.js"}],"blob":{"attaches":{},"requires":["strainer.api.PARSER"],"exports":"function (lychee, global, attachments) {\n\n\tconst _PARSER = lychee.import('strainer.api.PARSER');\n\n\n\n\t/*\n\t * HELPERS\n\t */\n\n\tconst _validate_asset = function(asset) {\n\n\t\tif (asset instanceof Object && typeof asset.serialize === 'function') {\n\t\t\treturn true;\n\t\t}\n\n\t\treturn false;\n\n\t};\n\n\tconst _parse_identifier = function(result, stream, errors) {\n\n\t\tlet i1  = stream.indexOf('lychee');\n\t\tlet i2  = stream.indexOf('\\n', i1);\n\t\tlet tmp = stream.substr(0, i2).trim();\n\n\t\tif (tmp.includes(' = ') && tmp.endsWith('(function(global) {')) {\n\n\t\t\tlet tmp1 = tmp.split(/lychee\\.([A-Za-z]+)\\s=(.*)/g);\n\t\t\tif (tmp1.length > 1) {\n\n\t\t\t\tlet id = tmp1[1];\n\t\t\t\tif (id.charAt(0) === id.charAt(0).toUpperCase()) {\n\t\t\t\t\tresult.identifier = 'lychee.' + id;\n\t\t\t\t}\n\n\t\t\t} else if (tmp === 'lychee = (function(global) {') {\n\n\t\t\t\tresult.identifier = 'lychee';\n\n\t\t\t}\n\n\t\t} else {\n\n\t\t\terrors.push({\n\t\t\t\turl:       null,\n\t\t\t\trule:      'no-define',\n\t\t\t\treference: null,\n\t\t\t\tmessage:   'Invalid Definition (missing \"<lychee.Definition> = (function(global) {})()\").',\n\t\t\t\tline:      0,\n\t\t\t\tcolumn:    0\n\t\t\t});\n\n\t\t}\n\n\t};\n\n\n\n\t/*\n\t * IMPLEMENTATION\n\t */\n\n\tconst Module = {\n\n\t\t// deserialize: function(blob) {},\n\n\t\tserialize: function() {\n\n\t\t\treturn {\n\t\t\t\t'reference': 'strainer.api.Core',\n\t\t\t\t'arguments': []\n\t\t\t};\n\n\t\t},\n\n\t\tcheck: function(asset) {\n\n\t\t\tasset = _validate_asset(asset) === true ? asset : null;\n\n\n\t\t\tlet errors = [];\n\t\t\tlet result = {\n\t\t\t\tidentifier: null,\n\t\t\t\tattaches:   {},\n\t\t\t\ttags:       {},\n\t\t\t\trequires:   [],\n\t\t\t\tincludes:   [],\n\t\t\t\tsupports:   {}\n\t\t\t};\n\n\t\t\tif (asset !== null) {\n\n\t\t\t\tlet stream = asset.buffer.toString('utf8');\n\n\n\t\t\t\t_parse_identifier(result, stream, errors);\n\n\n\t\t\t\tlet i1 = stream.indexOf('=');\n\t\t\t\tlet i2 = stream.indexOf(': (function(global) {\\n', i1);\n\t\t\t\tlet i3 = stream.indexOf('= (function(global) {\\n');\n\n\t\t\t\tif (i1 === -1) {\n\n\t\t\t\t\terrors.push({\n\t\t\t\t\t\turl:       null,\n\t\t\t\t\t\trule:      'no-core-define',\n\t\t\t\t\t\treference: null,\n\t\t\t\t\t\tmessage:   'Invalid Core (missing assignment).',\n\t\t\t\t\t\tline:      0,\n\t\t\t\t\t\tcolumn:    0\n\t\t\t\t\t});\n\n\t\t\t\t}\n\n\t\t\t\tif (i1 !== i3 && i2 === -1) {\n\n\t\t\t\t\terrors.push({\n\t\t\t\t\t\turl:       null,\n\t\t\t\t\t\trule:      'no-core-exports',\n\t\t\t\t\t\treference: null,\n\t\t\t\t\t\tmessage:   'Invalid Core (missing (function(global) {})().',\n\t\t\t\t\t\tline:      0,\n\t\t\t\t\t\tcolumn:    0\n\t\t\t\t\t});\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\treturn {\n\t\t\t\terrors: errors,\n\t\t\t\tresult: result\n\t\t\t};\n\n\t\t},\n\n\t\ttranscribe: function(asset) {\n\n\t\t\tasset = _validate_asset(asset) === true ? asset : null;\n\n\n\t\t\tif (asset !== null) {\n\n\t\t\t\tlet code   = null;\n\t\t\t\tlet report = asset.buffer || {\n\t\t\t\t\theader: {},\n\t\t\t\t\tmemory: {},\n\t\t\t\t\terrors: [],\n\t\t\t\t\tresult: {}\n\t\t\t\t};\n\n\n\t\t\t\tif (report.header instanceof Object) {\n\n\t\t\t\t\tlet identifier = report.header.identifier || null;\n\t\t\t\t\tif (identifier !== null) {\n\n\t\t\t\t\t\tcode = identifier + ' = typeof ' + identifier + ' !== undefined ? ' + identifier + ' : (function(global) {';\n\t\t\t\t\t\tcode += '\\n\\n%BODY%\\n\\n';\n\t\t\t\t\t\tcode += '})(typeof window !== undefined ? window : (typeof global !== undefined ? global : this));';\n\t\t\t\t\t\tcode += '\\n';\n\n\n\t\t\t\t\t\treturn code;\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\treturn null;\n\n\t\t}\n\n\t};\n\n\n\treturn Module;\n\n}"}},"lychee.crypto.MURMUR":{"constructor":"lychee.Definition","arguments":[{"id":"lychee.crypto.MURMUR","url":"/libraries/lychee/source/crypto/MURMUR.js"}],"blob":{"attaches":{},"exports":"function (lychee, global, attachments) {\n\n\tconst _C1  = 0xcc9e2d51;\n\tconst _C1B = 0x85ebca6b;\n\tconst _C2  = 0x1b873593;\n\tconst _C2B = 0xc2b2ae35;\n\n\n\n\t/*\n\t * IMPLEMENTATION\n\t */\n\n\tconst Composite = function() {\n\n\t\tthis.__hash = 0;\n\n\t};\n\n\n\tComposite.prototype = {\n\n\t\t/*\n\t\t * ENTITY API\n\t\t */\n\n\t\t// deserialize: function(blob) {},\n\n\t\tserialize: function() {\n\n\t\t\treturn {\n\t\t\t\t'constructor': 'lychee.crypto.MURMUR',\n\t\t\t\t'arguments':   []\n\t\t\t};\n\n\t\t},\n\n\n\n\t\t/*\n\t\t * CRYPTO API\n\t\t */\n\n\t\tupdate: function(data) {\n\n\t\t\tdata = data instanceof Buffer ? data : new Buffer(data, 'utf8');\n\n\n\t\t\tlet remain = data.length % 4;\n\t\t\tlet bytes  = data.length - remain;\n\n\t\t\tlet b   = 0;\n\t\t\tlet h1  = this.__hash;\n\t\t\tlet h1b = 0;\n\t\t\tlet k1  = 0;\n\n\n\t\t\twhile (b < bytes) {\n\n\t\t\t\tk1 = ((data[b] & 0xff)) | ((data[b + 1] & 0xff) << 8) | ((data[b + 2] & 0xff) << 16) | ((data[b + 3] & 0xff) << 24);\n\t\t\t\tk1 = ((((k1 & 0xffff) * _C1) + ((((k1 >>> 16) * _C1) & 0xffff) << 16))) & 0xffffffff;\n\t\t\t\tk1 = (k1 << 15) | (k1 >>> 17);\n\t\t\t\tk1 = ((((k1 & 0xffff) * _C2) + ((((k1 >>> 16) * _C2) & 0xffff) << 16))) & 0xffffffff;\n\n\t\t\t\th1 ^= k1;\n\t\t\t\th1  = (h1 << 13) | (h1 >>> 19);\n\t\t\t\th1b = ((((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16))) & 0xffffffff;\n\t\t\t\th1  = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16));\n\n\t\t\t\tb += 4;\n\n\t\t\t}\n\n\n\t\t\tk1 = 0;\n\n\n\t\t\tif (remain === 3) {\n\n\t\t\t\tk1 ^= (data[b + 2] & 0xff) << 16;\n\n\t\t\t} else if (remain === 2) {\n\n\t\t\t\tk1 ^= (data[b + 1] & 0xff) << 8;\n\n\t\t\t} else if (remain === 1) {\n\n\t\t\t\tk1 ^= (data[b] & 0xff);\n\n\t\t\t\tk1 = (((k1 & 0xffff) * _C1) + ((((k1 >>> 16) * _C1) & 0xffff) << 16)) & 0xffffffff;\n\t\t\t\tk1 = (k1 << 15) | (k1 >>> 17);\n\t\t\t\tk1 = (((k1 & 0xffff) * _C2) + ((((k1 >>> 16) * _C2) & 0xffff) << 16)) & 0xffffffff;\n\t\t\t\th1 ^= k1;\n\n\t\t\t}\n\n\n\t\t\th1 ^= data.length;\n\n\t\t\th1 ^= h1 >>> 16;\n\t\t\th1  = (((h1 & 0xffff) * _C1B) + ((((h1 >>> 16) * _C1B) & 0xffff) << 16)) & 0xffffffff;\n\t\t\th1 ^= h1 >>> 13;\n\t\t\th1  = (((h1 & 0xffff) * _C2B) + ((((h1 >>> 16) * _C2B) & 0xffff) << 16)) & 0xffffffff;\n\t\t\th1 ^= h1 >>> 16;\n\n\n\t\t\tthis.__hash = h1 >>> 0;\n\n\t\t},\n\n\t\tdigest: function() {\n\n\t\t\tlet hash = (this.__hash).toString(16);\n\t\t\tif (hash.length % 2 === 1) {\n\t\t\t\thash = '0' + hash;\n\t\t\t}\n\n\t\t\treturn new Buffer(hash, 'hex');\n\n\t\t}\n\n\t};\n\n\n\treturn Composite;\n\n}"}},"strainer.api.Specification":{"constructor":"lychee.Definition","arguments":[{"id":"strainer.api.Specification","url":"/libraries/strainer/source/api/Specification.js"}],"blob":{"attaches":{},"requires":["strainer.api.PARSER"],"exports":"function (lychee, global, attachments) {\n\n\tconst _PARSER = lychee.import('strainer.api.PARSER');\n\n\n\n\t/*\n\t * HELPERS\n\t */\n\n\tconst _create_error = function(rule, message) {\n\n\t\treturn {\n\t\t\turl:       null,\n\t\t\trule:      rule,\n\t\t\treference: null,\n\t\t\tmessage:   message,\n\t\t\tline:      0,\n\t\t\tcolumn:    0\n\n\t\t};\n\n\t};\n\n\tconst _validate_asset = function(asset) {\n\n\t\tif (asset instanceof Object && typeof asset.serialize === 'function') {\n\t\t\treturn true;\n\t\t}\n\n\t\treturn false;\n\n\t};\n\n\tconst _parse_value = function(str) {\n\n\t\tlet val = undefined;\n\t\tif (/^(this|global)$/g.test(str) === false) {\n\n\t\t\ttry {\n\t\t\t\tval = eval('(' + str + ')');\n\t\t\t} catch (err) {\n\t\t\t}\n\n\t\t}\n\n\t\treturn val;\n\n\t};\n\n\tconst _parse_identifier = function(result, stream, errors) {\n\n\t\tlet i1  = stream.indexOf('lychee');\n\t\tlet i2  = stream.indexOf('\\n', i1);\n\t\tlet tmp = stream.substr(0, i2).trim();\n\n\t\tif (tmp.startsWith('lychee.specify(')) {\n\n\t\t\tlet tmp1 = tmp.split(/lychee\\.specify\\(\"?'?([A-Za-z.-]+)\"?'?\\)\\.(.*)/g);\n\t\t\tif (tmp1.length > 1) {\n\n\t\t\t\tlet id = tmp1[1];\n\t\t\t\tif (id.charAt(0) === id.charAt(0).toUpperCase()) {\n\t\t\t\t\tresult.identifier = 'lychee.' + id;\n\t\t\t\t} else {\n\t\t\t\t\tresult.identifier = id;\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t}\n\n\t};\n\n\tconst _parse_requires = function(requires, stream, errors) {\n\n\t\tlet i1 = stream.indexOf('requires([');\n\t\tlet i2 = stream.indexOf('\\n])', i1);\n\t\tlet i3 = stream.indexOf('exports(function(lychee, sandbox) {\\n');\n\n\t\tif (i1 !== -1 && i2 !== -1 && i3 !== -1 && i1 < i3) {\n\n\t\t\tlet tmp1 = stream.substr(i1 + 9, i2 - i1 - 7);\n\t\t\tif (tmp1.length > 0 && tmp1.startsWith('[') && tmp1.endsWith(']')) {\n\n\t\t\t\tlet tmp2 = _parse_value(tmp1);\n\t\t\t\tif (tmp2 !== undefined && tmp2 instanceof Array) {\n\n\t\t\t\t\ttmp2.forEach(function(value) {\n\n\t\t\t\t\t\tif (requires.indexOf(value) === -1) {\n\t\t\t\t\t\t\trequires.push(value);\n\t\t\t\t\t\t}\n\n\t\t\t\t\t});\n\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t}\n\n\t};\n\n\n\n\t/*\n\t * IMPLEMENTATION\n\t */\n\n\tconst Module = {\n\n\t\t// deserialize: function(blob) {},\n\n\t\tserialize: function() {\n\n\t\t\treturn {\n\t\t\t\t'reference': 'strainer.api.Specification',\n\t\t\t\t'arguments': []\n\t\t\t};\n\n\t\t},\n\n\t\tcheck: function(asset) {\n\n\t\t\tasset = _validate_asset(asset) === true ? asset : null;\n\n\n\t\t\tlet errors = [];\n\t\t\tlet result = {\n\t\t\t\tidentifier: null,\n\t\t\t\tattaches:   {},\n\t\t\t\ttags:       {},\n\t\t\t\trequires:   [],\n\t\t\t\tincludes:   [],\n\t\t\t\tsupports:   {}\n\t\t\t};\n\n\t\t\tif (asset !== null) {\n\n\t\t\t\tlet stream = asset.buffer.toString('utf8');\n\n\t\t\t\t_parse_identifier(result, stream, errors);\n\t\t\t\t_parse_requires(result.requires, stream, errors);\n\n\n\t\t\t\tlet i1 = stream.indexOf('lychee.specify(');\n\t\t\t\tlet i2 = stream.indexOf('exports(function(lychee, sandbox) {\\n', i1);\n\n\t\t\t\tif (i1 === -1) {\n\n\t\t\t\t\terrors.push({\n\t\t\t\t\t\turl:       null,\n\t\t\t\t\t\trule:      'no-specify',\n\t\t\t\t\t\treference: null,\n\t\t\t\t\t\tmessage:   'Invalid Specification (missing specify()).',\n\t\t\t\t\t\tline:      0,\n\t\t\t\t\t\tcolumn:    0\n\t\t\t\t\t});\n\n\t\t\t\t}\n\n\t\t\t\tif (i2 === -1) {\n\n\t\t\t\t\terrors.push({\n\t\t\t\t\t\turl:       null,\n\t\t\t\t\t\trule:      'no-exports',\n\t\t\t\t\t\treference: null,\n\t\t\t\t\t\tmessage:   'Invalid Specification (missing exports()).',\n\t\t\t\t\t\tline:      0,\n\t\t\t\t\t\tcolumn:    0\n\t\t\t\t\t});\n\n\t\t\t\t}\n\n\n\t\t\t\tlet i3 = stream.indexOf('requires([\\n');\n\t\t\t\tlet i4 = stream.indexOf('exports(function(lychee, sandbox) {\\n');\n\n\t\t\t\tif (i3 !== -1 && i4 !== -1 && i3 > i4) {\n\t\t\t\t\terrors.push(_create_error('no-meta', 'Invalid Specification (\"requires()\" after \"exports()\").'));\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\treturn {\n\t\t\t\terrors: errors,\n\t\t\t\tresult: result\n\t\t\t};\n\n\t\t}\n\n\t};\n\n\n\treturn Module;\n\n}"}},"strainer.fix.API":{"constructor":"lychee.Definition","arguments":[{"id":"strainer.fix.API","url":"/libraries/strainer/source/fix/API.js"}],"blob":{"attaches":{},"exports":"function (lychee, global, attachments) {\n\n\t/*\n\t * HELPERS\n\t */\n\n\tconst _split_chunk = function(code, search, offset) {\n\n\t\tlet index = code.indexOf(search, offset);\n\t\tif (index !== -1) {\n\n\t\t\tlet chunk0 = code.substr(0, index + search.length);\n\t\t\tlet chunk1 = code.substr(index + search.length);\n\n\t\t\treturn [ chunk0, chunk1 ];\n\n\t\t}\n\n\n\t\treturn null;\n\n\t};\n\n\n\n\t/*\n\t * IMPLEMENTATION\n\t */\n\n\tconst Module = {\n\n\t\t// deserialize: function(blob) {},\n\n\t\tserialize: function() {\n\n\t\t\treturn {\n\t\t\t\t'reference': 'strainer.fix.API',\n\t\t\t\t'arguments': []\n\t\t\t};\n\n\t\t},\n\n\t\t'no-define': function(err, report, code) {\n\n\t\t\tlet url = err.url || null;\n\t\t\tif (url !== null) {\n\n\t\t\t\tlet tmp1   = url.split('/');\n\t\t\t\tlet file   = tmp1.pop();\n\t\t\t\tlet folder = tmp1.pop();\n\n\n\t\t\t\tif (\n\t\t\t\t\t/^(bootstrap|features|harvester)\\.js$/g.test(file)\n\t\t\t\t\t|| folder === 'bin'\n\t\t\t\t) {\n\t\t\t\t\treturn code;\n\t\t\t\t}\n\n\n\t\t\t\tlet tmp2 = url.split('/');\n\t\t\t\tif (tmp2.length > 3) {\n\n\t\t\t\t\tlet type   = tmp2[1];\n\t\t\t\t\tlet folder = tmp2[3];\n\n\t\t\t\t\tif (folder === 'source') {\n\n\t\t\t\t\t\tlet is_platform = tmp2[4] === 'platform';\n\t\t\t\t\t\tif (is_platform === true) {\n\n\t\t\t\t\t\t\tlet platform = tmp2[5];\n\t\t\t\t\t\t\tlet name     = [ type === 'libraries' ? tmp2[2] : 'app' ].concat(tmp2.slice(6));\n\n\t\t\t\t\t\t\tlet check = name[name.length - 1].indexOf('.');\n\t\t\t\t\t\t\tif (check !== -1) {\n\t\t\t\t\t\t\t\tname[name.length - 1] = name[name.length - 1].substr(0, check);\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\treturn '\\nlychee.define(\\'' + name.join('.') + '\\').tags({\\n\\t\\'platform\\': \\'' + platform + '\\'\\n});\\n' + code.trim() + '\\n';\n\n\t\t\t\t\t\t} else {\n\n\t\t\t\t\t\t\tlet name  = [ type === 'libraries' ? tmp2[2] : 'app' ].concat(tmp2.slice(4));\n\t\t\t\t\t\t\tlet check = name[name.length - 1].indexOf('.');\n\t\t\t\t\t\t\tif (check !== -1) {\n\t\t\t\t\t\t\t\tname[name.length - 1] = name[name.length - 1].substr(0, check);\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\treturn '\\nlychee.define(\\'' + name.join('.') + '\\');\\n' + code.trim() + '\\n';\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t} else {\n\n\t\t\t\t\t\t// XXX: Ignore this error in other folders\n\t\t\t\t\t\treturn code;\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\treturn null;\n\n\t\t},\n\n\t\t'no-specify': function(err, report, code) {\n\n\t\t\tlet url = err.url || null;\n\t\t\tif (url !== null) {\n\n\t\t\t\tlet tmp = url.split('/');\n\t\t\t\tif (tmp.length > 3) {\n\n\t\t\t\t\tlet type   = tmp[1];\n\t\t\t\t\tlet folder = tmp[3];\n\n\t\t\t\t\tif (folder === 'review') {\n\n\t\t\t\t\t\tlet name  = [ type === 'libraries' ? tmp[2] : 'app' ].concat(tmp.slice(4));\n\t\t\t\t\t\tlet check = name[name.length - 1].indexOf('.');\n\t\t\t\t\t\tif (check !== -1) {\n\t\t\t\t\t\t\tname[name.length - 1] = name[name.length - 1].substr(0, check);\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\treturn '\\nlychee.specify(\\'' + name.join('.') + '\\');\\n' + code.trim() + '\\n';\n\n\t\t\t\t\t} else {\n\n\t\t\t\t\t\t// XXX: Ignore this error in other folders\n\t\t\t\t\t\treturn code;\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\treturn null;\n\n\t\t},\n\n\t\t'no-exports': function(err, report, code) {\n\n\t\t\tlet url = err.url;\n\t\t\tif (url !== null) {\n\n\t\t\t\tlet tmp1   = url.split('/');\n\t\t\t\tlet file   = tmp1.pop();\n\t\t\t\tlet folder = tmp1.pop();\n\n\t\t\t\tif (\n\t\t\t\t\t/^(bootstrap|features|harvester)\\.js$/g.test(file)\n\t\t\t\t\t|| folder === 'bin'\n\t\t\t\t) {\n\t\t\t\t\treturn code;\n\t\t\t\t}\n\n\n\t\t\t\tlet tmp2 = err.url.split('/');\n\t\t\t\tif (tmp2.length > 3) {\n\n\t\t\t\t\tlet folder = tmp2[3];\n\t\t\t\t\tif (folder === 'source') {\n\n\t\t\t\t\t\tlet i1 = code.indexOf('lychee.define(');\n\t\t\t\t\t\tlet i2 = code.indexOf('tags({');\n\t\t\t\t\t\tlet i3 = code.indexOf('attaches({');\n\t\t\t\t\t\tlet i4 = code.indexOf('requires([');\n\t\t\t\t\t\tlet i5 = code.indexOf('includes([');\n\t\t\t\t\t\tlet i6 = code.indexOf('supports(function(lychee, global) {');\n\t\t\t\t\t\tlet i7 = code.indexOf('exports(function(lychee, global, attachments) {');\n\n\t\t\t\t\t\tif (i7 === -1) {\n\n\t\t\t\t\t\t\tlet chunk = null;\n\n\t\t\t\t\t\t\tif (i6 !== -1) {\n\t\t\t\t\t\t\t\tchunk = _split_chunk(code, '})', i6);\n\t\t\t\t\t\t\t} else if (i5 !== -1) {\n\t\t\t\t\t\t\t\tchunk = _split_chunk(code, '])', i5);\n\t\t\t\t\t\t\t} else if (i4 !== -1) {\n\t\t\t\t\t\t\t\tchunk = _split_chunk(code, '])', i4);\n\t\t\t\t\t\t\t} else if (i3 !== -1) {\n\t\t\t\t\t\t\t\tchunk = _split_chunk(code, '})', i3);\n\t\t\t\t\t\t\t} else if (i2 !== -1) {\n\t\t\t\t\t\t\t\tchunk = _split_chunk(code, '})', i2);\n\t\t\t\t\t\t\t} else if (i1 !== -1) {\n\t\t\t\t\t\t\t\tchunk = _split_chunk(code, ')',  i1);\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\tif (chunk !== null) {\n\t\t\t\t\t\t\t\treturn chunk[0] + '.exports(function(lychee, global, attachments) {\\n\\n\\n})' + chunk[1];\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t} else if (folder === 'review') {\n\n\t\t\t\t\t\tlet i1 = code.indexOf('lychee.specify(');\n\t\t\t\t\t\tlet i2 = code.indexOf('requires([');\n\t\t\t\t\t\tlet i3 = code.indexOf('exports(function(lychee, sandbox) {');\n\n\t\t\t\t\t\tif (i3 === -1) {\n\n\t\t\t\t\t\t\tlet chunk = null;\n\n\t\t\t\t\t\t\tif (i2 !== -1) {\n\t\t\t\t\t\t\t\tchunk = _split_chunk(code, '])', i2);\n\t\t\t\t\t\t\t} else if (i1 !== -1) {\n\t\t\t\t\t\t\t\tchunk = _split_chunk(code, ')',  i1);\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\tif (chunk !== null) {\n\t\t\t\t\t\t\t\treturn chunk[0] + '.exports(function(lychee, sandbox) {\\n\\n\\n})' + chunk[1];\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\treturn null;\n\n\t\t},\n\n\t\t'no-requires': function(err, report, code) {\n\n\t\t\tlet name  = err.reference;\n\t\t\tlet entry = report.memory[name] || null;\n\t\t\tif (entry !== null) {\n\n\t\t\t\tlet ref = entry.value.reference;\n\t\t\t\tlet i1  = code.indexOf('requires([');\n\t\t\t\tlet i2  = code.indexOf('\\n])', i1);\n\t\t\t\tlet i3  = code.indexOf('exports(function(lychee, global, attachments) {\\n');\n\n\t\t\t\tif (i1 !== -1 && i2 !== -1 && i3 !== -1 && i1 < i3) {\n\n\t\t\t\t\tlet tmp1 = code.substr(i1 + 9, i2 - i1 - 7);\n\t\t\t\t\tif (tmp1.length > 0 && tmp1.startsWith('[') && tmp1.endsWith(']')) {\n\n\t\t\t\t\t\tlet chunk = tmp1.split('\\n');\n\t\t\t\t\t\tif (chunk.length > 2) {\n\t\t\t\t\t\t\tchunk.splice(1, 0, '\\t\\'' + ref + '\\',');\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tchunk.splice(1, 0, '\\t\\'' + ref + '\\'');\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\treturn code.substr(0, i1 + 9) + chunk.join('\\n') + code.substr(i2 + 2);\n\n\t\t\t\t\t}\n\n\t\t\t\t} else {\n\n\t\t\t\t\ti1 = code.indexOf('lychee.define(');\n\t\t\t\t\ti2 = code.indexOf(')', i1);\n\n\t\t\t\t\tif (i1 !== -1 && i2 !== -1 && i2 < i3) {\n\t\t\t\t\t\treturn code.substr(0, i2 + 1) + '.requires([\\n\\t\\'' + ref + '\\'\\n])' + code.substr(i2 + 1);\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\treturn null;\n\n\t\t},\n\n\t\t'no-includes': function(err, report, code) {\n\n\t\t\tlet name  = err.reference;\n\t\t\tlet entry = report.memory[name] || null;\n\t\t\tif (entry !== null) {\n\n\t\t\t\tlet ref = entry.value.reference;\n\t\t\t\tlet i1  = code.indexOf('includes([');\n\t\t\t\tlet i2  = code.indexOf('\\n])', i1);\n\t\t\t\tlet i3  = code.indexOf('exports(function(lychee, global, attachments) {\\n');\n\n\t\t\t\tif (i1 !== -1 && i2 !== -1 && i3 !== -1 && i1 < i3) {\n\n\t\t\t\t\tlet tmp1 = code.substr(i1 + 9, i2 - i1 - 7);\n\t\t\t\t\tif (tmp1.length > 0 && tmp1.startsWith('[') && tmp1.endsWith(']')) {\n\n\t\t\t\t\t\tlet chunk = tmp1.split('\\n');\n\t\t\t\t\t\tif (chunk.length > 2) {\n\t\t\t\t\t\t\tchunk.splice(1, 0, '\\t\\'' + ref + '\\',');\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tchunk.splice(1, 0, '\\t\\'' + ref + '\\'');\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\treturn code.substr(0, i1 + 9) + chunk.join('\\n') + code.substr(i2 + 2);\n\n\t\t\t\t\t}\n\n\t\t\t\t} else {\n\n\t\t\t\t\ti1 = code.indexOf('requires([');\n\t\t\t\t\ti2 = code.indexOf('\\n])', i1);\n\n\t\t\t\t\tif (i1 !== -1 && i2 !== -1 && i2 < i3) {\n\n\t\t\t\t\t\treturn code.substr(0, i2 + 3) + '.includes([\\n\\t\\'' + ref + '\\'\\n])' + code.substr(i2 + 3);\n\n\t\t\t\t\t} else {\n\n\t\t\t\t\t\ti1 = code.indexOf('lychee.define(');\n\t\t\t\t\t\ti2 = code.indexOf(')', i1);\n\n\t\t\t\t\t\tif (i1 !== -1 && i2 !== -1 && i2 < i3) {\n\t\t\t\t\t\t\treturn code.substr(0, i2 + 1) + '.includes([\\n\\t\\'' + ref + '\\'\\n])' + code.substr(i2 + 1);\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\treturn null;\n\n\t\t},\n\n\t\t'no-settings': function(err, report, code) {\n\n\t\t\tlet type = report.header.type;\n\t\t\tif (type === 'Composite') {\n\n\t\t\t\tlet i1 = code.indexOf('\\n\\tconst Composite =');\n\t\t\t\tlet i2 = code.indexOf('\\n\\t};', i1);\n\n\t\t\t\tif (i1 !== -1 && i2 !== -1) {\n\n\t\t\t\t\tlet chunk = code.substr(i1, i2 - i1 + 4).split('\\n');\n\n\t\t\t\t\tchunk.splice(2, 0, '\\n\\t\\tlet settings = Object.assign({}, data);\\n');\n\n\t\t\t\t\treturn code.substr(0, i1) + chunk.join('\\n') + code.substr(i2 + 4);\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\treturn null;\n\n\t\t},\n\n\t\t'no-garbage': function(err, report, code) {\n\n\t\t\tlet type = report.header.type;\n\t\t\tif (type === 'Composite') {\n\n\t\t\t\tlet i1 = code.indexOf('\\n\\tconst Composite =');\n\t\t\t\tlet i2 = code.indexOf('\\n\\t};', i1);\n\n\t\t\t\tif (i1 !== -1 && i2 !== -1) {\n\n\t\t\t\t\tlet chunk = code.substr(i1, i2 - i1 + 4).split('\\n');\n\n\t\t\t\t\tchunk.splice(chunk.length - 1, 0, '\\n\\t\\tsettings = null;\\n');\n\n\t\t\t\t\treturn code.substr(0, i1) + chunk.join('\\n') + code.substr(i2 + 4);\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\treturn null;\n\n\t\t},\n\n\t\t'no-constructor-call': function(err, report, code) {\n\n\t\t\tlet type = report.header.type;\n\t\t\tif (type === 'Composite') {\n\n\t\t\t\tlet name  = err.reference;\n\t\t\t\tlet entry = report.memory[name] || null;\n\t\t\t\tif (entry !== null) {\n\n\t\t\t\t\tlet i1 = code.indexOf('\\n\\tconst Composite =');\n\t\t\t\t\tlet i2 = code.indexOf('\\n\\t};', i1);\n\n\t\t\t\t\tif (i1 !== -1 && i2 !== -1) {\n\n\t\t\t\t\t\tlet chunk = code.substr(i1, i2 - i1 + 4).split('\\n');\n\t\t\t\t\t\tlet i3    = chunk.findIndex(function(line) {\n\t\t\t\t\t\t\treturn line.includes('settings = null');\n\t\t\t\t\t\t});\n\n\t\t\t\t\t\tif (i3 !== -1) {\n\t\t\t\t\t\t\tchunk.splice(i3, 0, '\\t\\t' + name + '.call(this, settings);\\n');\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tchunk.splice(chunk.length - 1, 0, '\\n\\t\\t' + name + '.call(this, settings);\\n');\n\t\t\t\t\t\t}\n\n\n\t\t\t\t\t\treturn code.substr(0, i1) + chunk.join('\\n') + code.substr(i2 + 4);\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\treturn null;\n\n\t\t},\n\n\t\t'no-deserialize': function(err, report, code) {\n\n\t\t\tlet type  = report.header.type;\n\t\t\tlet chunk = [];\n\n\t\t\tlet ids = report.header.includes;\n\t\t\tif (type === 'Composite' && ids.length > 0) {\n\n\t\t\t\tids.map(function(id) {\n\n\t\t\t\t\tlet reference = null;\n\n\t\t\t\t\tfor (let name in report.memory) {\n\n\t\t\t\t\t\tlet entry = report.memory[name];\n\t\t\t\t\t\tlet value = entry.value || null;\n\t\t\t\t\t\tif (\n\t\t\t\t\t\t\tvalue !== null\n\t\t\t\t\t\t\t&& value instanceof Object\n\t\t\t\t\t\t\t&& value.reference === id\n\t\t\t\t\t\t) {\n\t\t\t\t\t\t\treference = name;\n\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t\treturn reference;\n\n\t\t\t\t}).filter(function(reference) {\n\t\t\t\t\treturn reference !== null;\n\t\t\t\t}).forEach(function(reference, r) {\n\t\t\t\t\tchunk.push('' + reference + '.prototype.deserialize.call(this, blob);');\n\t\t\t\t});\n\n\t\t\t}\n\n\n\t\t\tlet inject = '\\n\\t\\t// deserialize: function(blob) {},\\n';\n\t\t\tif (chunk.length > 0) {\n\n\t\t\t\tinject = '\\n\\t\\tdeserialize: function(blob) {\\n\\n' + chunk.map(function(ch) {\n\t\t\t\t\tif (ch !== '') {\n\t\t\t\t\t\treturn ch.padStart(ch.length + 3, '\\t');\n\t\t\t\t\t} else {\n\t\t\t\t\t\treturn ch;\n\t\t\t\t\t}\n\t\t\t\t}).join('\\n') + '\\n\\n\\t\\t},\\n';\n\n\t\t\t}\n\n\n\t\t\tif (type === 'Composite') {\n\n\t\t\t\tlet i1 = code.indexOf('\\n\\tComposite.prototype = {\\n');\n\t\t\t\tlet i2 = code.indexOf('\\n\\t};', i1);\n\t\t\t\tlet i3 = code.indexOf('\\n\\t\\tserialize: function() {\\n', i1);\n\n\t\t\t\tif (i1 !== -1 && i3 !== -1) {\n\t\t\t\t\treturn code.substr(0, i3) + inject + code.substr(i3);\n\t\t\t\t} else if (i1 !== -1 && i2 !== -1) {\n\t\t\t\t\treturn code.substr(0, i1 + 26) + inject + code.substr(i1 + 26);\n\t\t\t\t}\n\n\t\t\t} else if (type === 'Module') {\n\n\t\t\t\tlet i1 = code.indexOf('\\n\\tconst Module = {\\n');\n\t\t\t\tlet i2 = code.indexOf('\\n\\t};', i1);\n\t\t\t\tlet i3 = code.indexOf('\\n\\t\\tserialize: function() {\\n', i1);\n\n\t\t\t\tif (i1 !== -1 && i3 !== -1) {\n\t\t\t\t\treturn code.substr(0, i3) + inject + code.substr(i3);\n\t\t\t\t} else if (i1 !== -1 && i2 !== -1) {\n\t\t\t\t\treturn code.substr(0, i1 + 19) + inject + code.substr(i1 + 19);\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\treturn null;\n\n\t\t},\n\n\t\t'no-serialize': function(err, report, code) {\n\n\t\t\tlet type        = report.header.type;\n\t\t\tlet chunk       = [];\n\t\t\tlet identifier  = report.header.identifier;\n\t\t\tlet has_methods = Object.keys(report.result.methods).length > 0;\n\n\t\t\tlet ids = report.header.includes;\n\t\t\tif (type === 'Composite' && ids.length > 0) {\n\n\t\t\t\tids.map(function(id) {\n\n\t\t\t\t\tlet reference = null;\n\n\t\t\t\t\tfor (let name in report.memory) {\n\n\t\t\t\t\t\tlet entry = report.memory[name];\n\t\t\t\t\t\tlet value = entry.value || null;\n\t\t\t\t\t\tif (\n\t\t\t\t\t\t\tvalue !== null\n\t\t\t\t\t\t\t&& value instanceof Object\n\t\t\t\t\t\t\t&& value.reference === id\n\t\t\t\t\t\t) {\n\t\t\t\t\t\t\treference = name;\n\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t\treturn reference;\n\n\t\t\t\t}).filter(function(reference) {\n\t\t\t\t\treturn reference !== null;\n\t\t\t\t}).forEach(function(reference, r) {\n\n\t\t\t\t\tif (r === 0) {\n\t\t\t\t\t\tchunk.push('let data = ' + reference + '.prototype.serialize.call(this);');\n\t\t\t\t\t} else {\n\t\t\t\t\t\tchunk.push('data = Object.assign(data, ' + reference + '.prototype.serialize.call(this);');\n\t\t\t\t\t}\n\n\t\t\t\t});\n\n\t\t\t\tchunk.push('data[\\'constructor\\'] = \\'' + identifier + '\\';');\n\t\t\t\tchunk.push('');\n\t\t\t\tchunk.push('');\n\t\t\t\tchunk.push('return data;');\n\n\t\t\t} else if (type === 'Composite') {\n\n\t\t\t\tchunk.push('return {');\n\t\t\t\tchunk.push('\\t\\'constructor\\': \\'' + identifier + '\\',');\n\t\t\t\tchunk.push('\\t\\'arguments\\': []');\n\t\t\t\tchunk.push('};');\n\n\t\t\t} else if (type === 'Module') {\n\n\t\t\t\tchunk.push('return {');\n\t\t\t\tchunk.push('\\t\\'reference\\': \\'' + identifier + '\\',');\n\t\t\t\tchunk.push('\\t\\'arguments\\': []');\n\t\t\t\tchunk.push('};');\n\n\t\t\t}\n\n\n\t\t\tlet inject = '\\n\\t\\tserialize: function() {\\n\\n' + chunk.map(function(ch) {\n\t\t\t\tif (ch !== '') {\n\t\t\t\t\treturn ch.padStart(ch.length + 3, '\\t');\n\t\t\t\t} else {\n\t\t\t\t\treturn ch;\n\t\t\t\t}\n\t\t\t}).join('\\n') + '\\n\\n\\t\\t}';\n\n\t\t\tif (has_methods === true) {\n\t\t\t\tinject += ',\\n\\n';\n\t\t\t} else {\n\t\t\t\tinject += '\\n\\n';\n\t\t\t}\n\n\n\t\t\tif (type === 'Composite') {\n\n\t\t\t\tlet i1 = code.indexOf('\\n\\tComposite.prototype = {\\n');\n\t\t\t\tlet i2 = code.indexOf('\\n\\t\\tdeserialize: function(blob) {\\n');\n\t\t\t\tlet i3 = code.indexOf('\\n\\t\\t// deserialize: function(blob) {},\\n');\n\t\t\t\tlet i4 = code.indexOf('\\n\\t};', i1);\n\t\t\t\tif (i1 !== -1 && i4 !== -1) {\n\n\t\t\t\t\tif (i2 !== -1) {\n\n\t\t\t\t\t\tlet i20 = code.indexOf('\\n\\t\\t},\\n', i2);\n\t\t\t\t\t\tlet i21 = code.indexOf('\\n\\t\\t}\\n', i2);\n\n\t\t\t\t\t\tif (i20 !== -1) {\n\t\t\t\t\t\t\treturn code.substr(0, i20 + 6) + inject + code.substr(i20 + 6);\n\t\t\t\t\t\t} else if (i21 !== -1) {\n\t\t\t\t\t\t\treturn code.substr(0, i21 + 4) + ',\\n' + inject + code.substr(i21 + 5);\n\t\t\t\t\t\t}\n\n\t\t\t\t\t} else if (i3 !== -1) {\n\t\t\t\t\t\treturn code.substr(0, i3 + 38) + inject + code.substr(i3 + 38);\n\t\t\t\t\t} else {\n\t\t\t\t\t\treturn code.substr(0, i1 + 26) + inject + code.substr(i1 + 26);\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t} else if (type === 'Module') {\n\n\t\t\t\tlet i1 = code.indexOf('\\n\\tconst Module = {\\n');\n\t\t\t\tlet i2 = code.indexOf('\\n\\t\\tdeserialize: function(blob) {\\n');\n\t\t\t\tlet i3 = code.indexOf('\\n\\t\\t// deserialize: function(blob) {},\\n');\n\t\t\t\tlet i4 = code.indexOf('\\n\\t};', i1);\n\t\t\t\tif (i1 !== -1 && i4 !== -1) {\n\n\t\t\t\t\tif (i2 !== -1) {\n\n\t\t\t\t\t\tlet i20 = code.indexOf('\\n\\t\\t},\\n', i2);\n\t\t\t\t\t\tlet i21 = code.indexOf('\\n\\t\\t}\\n', i2);\n\n\t\t\t\t\t\tif (i20 !== -1) {\n\t\t\t\t\t\t\treturn code.substr(0, i20 + 6) + inject + code.substr(i20 + 6);\n\t\t\t\t\t\t} else if (i21 !== -1) {\n\t\t\t\t\t\t\treturn code.substr(0, i21 + 4) + ',\\n' + inject + code.substr(i21 + 5);\n\t\t\t\t\t\t}\n\n\t\t\t\t\t} else if (i3 !== -1) {\n\t\t\t\t\t\treturn code.substr(0, i3 + 38) + inject + code.substr(i3 + 38);\n\t\t\t\t\t} else {\n\t\t\t\t\t\treturn code.substr(0, i1 + 19) + inject + code.substr(i1 + 19);\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\treturn null;\n\n\t\t},\n\n\t\t'unguessable-return-value': function(err, report, code) {\n\n\t\t\tlet method = report.result.methods[err.reference] || null;\n\t\t\tif (method !== null) {\n\n\t\t\t\tlet has_already = method.values.find(function(val) {\n\t\t\t\t\treturn val.type !== 'undefined';\n\t\t\t\t});\n\n\t\t\t\tif (has_already !== undefined) {\n\t\t\t\t\treturn code;\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t\treturn null;\n\n\t\t},\n\n\t\t'unguessable-property-value': function(err, report, code) {\n\n\t\t\tlet property = report.result.properties[err.reference] || null;\n\t\t\tif (property !== null) {\n\n\t\t\t\tif (property.value.type !== 'undefined') {\n\t\t\t\t\treturn code;\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t\treturn null;\n\n\t\t}\n\n\t};\n\n\n\treturn Module;\n\n}"}},"strainer.api.PARSER":{"constructor":"lychee.Definition","arguments":[{"id":"strainer.api.PARSER","url":"/libraries/strainer/source/api/PARSER.js"}],"blob":{"attaches":{"json":{"constructor":"Config","arguments":["/libraries/strainer/source/api/PARSER.json"],"blob":{"buffer":"data:application/json;base64,WwoJewoJCSJjaHVuayI6ICJhdHRhY2htZW50c1tcImZudFwiXSIsCgkJInR5cGUiOiAiRm9udCIsCgkJInZhbHVlIjogewoJCQkiY29uc3RydWN0b3IiOiAiRm9udCIsCgkJCSJhcmd1bWVudHMiOiBbXQoJCX0KCX0sCgl7CgkJImNodW5rIjogImF0dGFjaG1lbnRzW1wianNvblwiXSIsCgkJInR5cGUiOiAiQ29uZmlnIiwKCQkidmFsdWUiOiB7CgkJCSJjb25zdHJ1Y3RvciI6ICJDb25maWciLAoJCQkiYXJndW1lbnRzIjogW10KCQl9Cgl9LAoJewoJCSJjaHVuayI6ICJhdHRhY2htZW50c1tcIm1zY1wiXSIsCgkJInR5cGUiOiAiTXVzaWMiLAoJCSJ2YWx1ZSI6IHsKCQkJImNvbnN0cnVjdG9yIjogIk11c2ljIiwKCQkJImFyZ3VtZW50cyI6IFtdCgkJfQoJfSwKCXsKCQkiY2h1bmsiOiAiYXR0YWNobWVudHNbXCJwbmdcIl0iLAoJCSJ0eXBlIjogIlRleHR1cmUiLAoJCSJ2YWx1ZSI6IHsKCQkJImNvbnN0cnVjdG9yIjogIlRleHR1cmUiLAoJCQkiYXJndW1lbnRzIjogW10KCQl9Cgl9LAoJewoJCSJjaHVuayI6ICJhdHRhY2htZW50c1tcInNuZFwiXSIsCgkJInR5cGUiOiAiU291bmQiLAoJCSJ2YWx1ZSI6IHsKCQkJImNvbnN0cnVjdG9yIjogIlNvdW5kIiwKCQkJImFyZ3VtZW50cyI6IFtdCgkJfQoJfSwKCXsKCQkiY2h1bmsiOiAibmV3IF9BcnJheSIsCgkJInR5cGUiOiAiQXJyYXkiLAoJCSJ2YWx1ZSI6IFtdCgl9LAoJewoJCSJjaHVuayI6ICJuZXcgX0J1ZmZlciIsCgkJInR5cGUiOiAiQnVmZmVyIiwKCQkidmFsdWUiOiB7CgkJCSJjb25zdHJ1Y3RvciI6ICJCdWZmZXIiLAoJCQkiYXJndW1lbnRzIjogWwoJCQkJIiIKCQkJXQoJCX0KCX0sCgl7CgkJImNodW5rIjogIm1haW4uY2xpZW50IiwKCQkidHlwZSI6ICJseWNoZWUubmV0LkNsaWVudCIsCgkJInZhbHVlIjogewoJCQkiY29uc3RydWN0b3IiOiAibHljaGVlLm5ldC5DbGllbnQiLAoJCQkiYXJndW1lbnRzIjogW10KCQl9Cgl9LAoJewoJCSJjaHVuayI6ICJtYWluLmlucHV0IiwKCQkidHlwZSI6ICJseWNoZWUuSW5wdXQiLAoJCSJ2YWx1ZSI6IHsKCQkJImNvbnN0cnVjdG9yIjogImx5Y2hlZS5JbnB1dCIsCgkJCSJhcmd1bWVudHMiOiBbXQoJCX0KCX0sCgl7CgkJImNodW5rIjogIm1haW4uanVrZWJveCIsCgkJInR5cGUiOiAibHljaGVlLmFwcC5KdWtlYm94IiwKCQkidmFsdWUiOiB7CgkJCSJjb25zdHJ1Y3RvciI6ICJseWNoZWUuYXBwLkp1a2Vib3giLAoJCQkiYXJndW1lbnRzIjogW10KCQl9Cgl9LAoJewoJCSJjaHVuayI6ICJtYWluLmxvb3AiLAoJCSJ0eXBlIjogImx5Y2hlZS5hcHAuTG9vcCIsCgkJInZhbHVlIjogewoJCQkiY29uc3RydWN0b3IiOiAibHljaGVlLmFwcC5Mb29wIiwKCQkJImFyZ3VtZW50cyI6IFtdCgkJfQoJfSwKCXsKCQkiY2h1bmsiOiAibWFpbi5yZW5kZXJlciIsCgkJInR5cGUiOiAibHljaGVlLlJlbmRlcmVyIiwKCQkidmFsdWUiOiB7CgkJCSJjb25zdHJ1Y3RvciI6ICJseWNoZWUuUmVuZGVyZXIiLAoJCQkiYXJndW1lbnRzIjogW10KCQl9Cgl9LAoJewoJCSJjaHVuayI6ICJtYWluLnNlcnZlciIsCgkJInR5cGUiOiAibHljaGVlLm5ldC5TZXJ2ZXIiLAoJCSJ2YWx1ZSI6IHsKCQkJImNvbnN0cnVjdG9yIjogImx5Y2hlZS5uZXQuU2VydmVyIiwKCQkJImFyZ3VtZW50cyI6IFtdCgkJfQoJfSwKCXsKCQkiY2h1bmsiOiAibWFpbi5zdGFzaCIsCgkJInR5cGUiOiAibHljaGVlLlN0YXNoIiwKCQkidmFsdWUiOiB7CgkJCSJjb25zdHJ1Y3RvciI6ICJseWNoZWUuU3Rhc2giLAoJCQkiYXJndW1lbnRzIjogW10KCQl9Cgl9LAoJewoJCSJjaHVuayI6ICJtYWluLnN0b3JhZ2UiLAoJCSJ0eXBlIjogImx5Y2hlZS5TdG9yYWdlIiwKCQkidmFsdWUiOiB7CgkJCSJjb25zdHJ1Y3RvciI6ICJseWNoZWUuU3RvcmFnZSIsCgkJCSJhcmd1bWVudHMiOiBbXQoJCX0KCX0sCgl7CgkJImNodW5rIjogIm1haW4udmlld3BvcnQiLAoJCSJ0eXBlIjogImx5Y2hlZS5WaWV3cG9ydCIsCgkJInZhbHVlIjogewoJCQkiY29uc3RydWN0b3IiOiAibHljaGVlLlZpZXdwb3J0IiwKCQkJImFyZ3VtZW50cyI6IFtdCgkJfQoJfSwKCXsKCQkiY2h1bmsiOiAiX0NPTkZJRyIsCgkJInR5cGUiOiAiQ29uZmlnIiwKCQkidmFsdWUiOiB7CgkJCSJjb25zdHJ1Y3RvciI6ICJDb25maWciLAoJCQkiYXJndW1lbnRzIjogWwoJCQkJIi90bXAvQ29uZmlnLmpzb24iCgkJCV0KCQl9Cgl9LAoJewoJCSJjaHVuayI6ICJfRk9OVCIsCgkJInR5cGUiOiAiRm9udCIsCgkJInZhbHVlIjogewoJCQkiY29uc3RydWN0b3IiOiAiRm9udCIsCgkJCSJhcmd1bWVudHMiOiBbCgkJCQkiL3RtcC9Gb250LmZudCIKCQkJXQoJCX0KCX0sCgl7CgkJImNodW5rIjogIl9DT05GSUciLAoJCSJ0eXBlIjogIkNvbmZpZyIsCgkJInZhbHVlIjogewoJCQkiY29uc3RydWN0b3IiOiAiQ29uZmlnIiwKCQkJImFyZ3VtZW50cyI6IFsKCQkJCSIvdG1wL0NvbmZpZy5qc29uIgoJCQldCgkJfQoJfSwKCXsKCQkiY2h1bmsiOiAiYXNzZXQiLAoJCSJ0eXBlIjogImx5Y2hlZS5Bc3NldCIsCgkJInZhbHVlIjogewoJCQkiY29uc3RydWN0b3IiOiAibHljaGVlLkFzc2V0IiwKCQkJImFyZ3VtZW50cyI6IFtdCgkJfQoJfSwKCXsKCQkiY2h1bmsiOiAiX3ZhbGlkYXRlX2Fzc2V0KGFzc2V0KSIsCgkJInR5cGUiOiAibHljaGVlLkFzc2V0IiwKCQkidmFsdWUiOiB7CgkJCSJjb25zdHJ1Y3RvciI6ICJseWNoZWUuQXNzZXQiLAoJCQkiYXJndW1lbnRzIjogW10KCQl9Cgl9LAoJewoJCSJjaHVuayI6ICJfdmFsaWRhdGVfYnJhaW4oYnJhaW4pIiwKCQkidHlwZSI6ICJseWNoZWUuYWkuKi5CcmFpbiIsCgkJInZhbHVlIjogewoJCQkiY29uc3RydWN0b3IiOiAibHljaGVlLmFpLmVubi5CcmFpbiIsCgkJCSJhcmd1bWVudHMiOiBbXQoJCX0KCX0sCgl7CgkJImNodW5rIjogIihseWNoZWUuaW50ZXJmYWNlb2YoX0FwcF9sYXllciwgbGF5ZXIpIHx8IGx5Y2hlZS5pbnRlcmZhY2VvZihfVWlfbGF5ZXIsIGxheWVyKSkiLAoJCSJ0eXBlIjogImx5Y2hlZS5hcHAuTGF5ZXIiLAoJCSJ2YWx1ZSI6IHsKCQkJImNvbnN0cnVjdG9yIjogImx5Y2hlZS5hcHAuTGF5ZXIiLAoJCQkiYXJndW1lbnRzIjogW10KCQl9Cgl9LAoJewoJCSJjaHVuayI6ICJfdmFsaWRhdGVfYWdlbnQoYWdlbnQpIiwKCQkidHlwZSI6ICJseWNoZWUuYWkuQWdlbnQiLAoJCSJ2YWx1ZSI6IHsKCQkJImNvbnN0cnVjdG9yIjogImx5Y2hlZS5haS5BZ2VudCIsCgkJCSJhcmd1bWVudHMiOiBbXQoJCX0KCX0sCgl7CgkJImNodW5rIjogImFnZW50IiwKCQkidHlwZSI6ICJseWNoZWUuYWkuQWdlbnQiLAoJCSJ2YWx1ZSI6IHsKCQkJImNvbnN0cnVjdG9yIjogImx5Y2hlZS5haS5BZ2VudCIsCgkJCSJhcmd1bWVudHMiOiBbXQoJCX0KCX0sCgl7CgkJImNodW5rIjogIl92YWxpZGF0ZV9lZmZlY3QoZWZmZWN0KSIsCgkJInR5cGUiOiAibHljaGVlLmVmZmVjdC5BbHBoYSIsCgkJInZhbHVlIjogewoJCQkiY29uc3RydWN0b3IiOiAibHljaGVlLmVmZmVjdC5BbHBoYSIsCgkJCSJhcmd1bWVudHMiOiBbXQoJCX0KCX0sCgl7CgkJImNodW5rIjogImVmZmVjdCIsCgkJInR5cGUiOiAibHljaGVlLmVmZmVjdC5BbHBoYSIsCgkJInZhbHVlIjogewoJCQkiY29uc3RydWN0b3IiOiAibHljaGVlLmVmZmVjdC5BbHBoYSIsCgkJCSJhcmd1bWVudHMiOiBbXQoJCX0KCX0sCgl7CgkJImNodW5rIjogIl92YWxpZGF0ZV9lbnRpdHkoZW50aXR5KSIsCgkJInR5cGVzIjogWwoJCQkibHljaGVlLmFwcC5FbnRpdHkiLAoJCQkibHljaGVlLnVpLkVudGl0eSIKCQldLAoJCSJ2YWx1ZXMiOiBbCgkJCXsKCQkJCSJjb25zdHJ1Y3RvciI6ICJseWNoZWUuYXBwLkVudGl0eSIsCgkJCQkiYXJndW1lbnRzIjogW10KCQkJfSwKCQkJewoJCQkJImNvbnN0cnVjdG9yIjogImx5Y2hlZS51aS5FbnRpdHkiLAoJCQkJImFyZ3VtZW50cyI6IFtdCgkJCX0KCQldCgl9LAoJewoJCSJjaHVuayI6ICJfdmFsaWRhdGVfZW50aXR5KHBhcmVudCkiLAoJCSJ0eXBlcyI6IFsKCQkJImx5Y2hlZS5hcHAuRW50aXR5IiwKCQkJImx5Y2hlZS51aS5FbnRpdHkiCgkJXSwKCQkidmFsdWVzIjogWwoJCQl7CgkJCQkiY29uc3RydWN0b3IiOiAibHljaGVlLmFwcC5FbnRpdHkiLAoJCQkJImFyZ3VtZW50cyI6IFtdCgkJCX0sCgkJCXsKCQkJCSJjb25zdHJ1Y3RvciI6ICJseWNoZWUudWkuRW50aXR5IiwKCQkJCSJhcmd1bWVudHMiOiBbXQoJCQl9CgkJXQoJfSwKCXsKCQkiY2h1bmsiOiAiX3ZhbGlkYXRlX2Vudmlyb25tZW50KGVudmlyb25tZW50KSIsCgkJInR5cGVzIjogWwoJCQkibHljaGVlLkVudmlyb25tZW50IiwKCQkJImx5Y2hlZS5TaW11bGF0aW9uIgoJCV0sCgkJInZhbHVlcyI6IFsKCQkJewoJCQkJImNvbnN0cnVjdG9yIjogImx5Y2hlZS5FbnZpcm9ubWVudCIsCgkJCQkiYXJndW1lbnRzIjogW10KCQkJfSwKCQkJewoJCQkJImNvbnN0cnVjdG9yIjogImx5Y2hlZS5TaW11bGF0aW9uIiwKCQkJCSJhcmd1bWVudHMiOiBbXQoJCQl9CgkJXQoJfSwKCXsKCQkiY2h1bmsiOiAiZW50aXR5IiwKCQkidHlwZXMiOiBbCgkJCSJseWNoZWUuYXBwLkVudGl0eSIsCgkJCSJseWNoZWUudWkuRW50aXR5IgoJCV0sCgkJInZhbHVlcyI6IFsKCQkJewoJCQkJImNvbnN0cnVjdG9yIjogImx5Y2hlZS5hcHAuRW50aXR5IiwKCQkJCSJhcmd1bWVudHMiOiBbXQoJCQl9LAoJCQl7CgkJCQkiY29uc3RydWN0b3IiOiAibHljaGVlLnVpLkVudGl0eSIsCgkJCQkiYXJndW1lbnRzIjogW10KCQkJfQoJCV0KCX0sCgl7CgkJImNodW5rIjogIl9FbnRpdHkuU0hBUEUiLAoJCSJ0eXBlIjogIkVudW0iLAoJCSJ2YWx1ZSI6IHsKCQkJInJlZmVyZW5jZSI6ICJseWNoZWUuYXBwLkVudGl0eS5TSEFQRSIsCgkJCSJhcmd1bWVudHMiOiBbXQoJCX0KCX0sCgl7CgkJImNodW5rIjogIl92YWxpZGF0ZV9sYXllcihsYXllcikiLAoJCSJ0eXBlcyI6IFsKCQkJImx5Y2hlZS5hcHAuTGF5ZXIiLAoJCQkibHljaGVlLnVpLkxheWVyIgoJCV0sCgkJInZhbHVlcyI6IFsKCQkJewoJCQkJImNvbnN0cnVjdG9yIjogImx5Y2hlZS5hcHAuTGF5ZXIiLAoJCQkJImFyZ3VtZW50cyI6IFtdCgkJCX0sCgkJCXsKCQkJCSJjb25zdHJ1Y3RvciI6ICJseWNoZWUudWkuTGF5ZXIiLAoJCQkJImFyZ3VtZW50cyI6IFtdCgkJCX0KCQldCgl9LAoJewoJCSJjaHVuayI6ICJsYXllciIsCgkJInR5cGVzIjogWwoJCQkibHljaGVlLmFwcC5MYXllciIsCgkJCSJseWNoZWUudWkuTGF5ZXIiCgkJXSwKCQkidmFsdWVzIjogWwoJCQl7CgkJCQkiY29uc3RydWN0b3IiOiAibHljaGVlLmFwcC5MYXllciIsCgkJCQkiYXJndW1lbnRzIjogW10KCQkJfSwKCQkJewoJCQkJImNvbnN0cnVjdG9yIjogImx5Y2hlZS51aS5MYXllciIsCgkJCQkiYXJndW1lbnRzIjogW10KCQkJfQoJCV0KCX0sCgl7CgkJImNodW5rIjogIl92YWxpZGF0ZV90cmFjayh0cmFjaykiLAoJCSJ0eXBlcyI6IFsKCQkJIk11c2ljIiwKCQkJIlNvdW5kIgoJCV0sCgkJInZhbHVlcyI6IFsKCQkJewoJCQkJImNvbnN0cnVjdG9yIjogIk11c2ljIiwKCQkJCSJhcmd1bWVudHMiOiBbXQoJCQl9LAoJCQl7CgkJCQkiY29uc3RydWN0b3IiOiAiU291bmQiLAoJCQkJImFyZ3VtZW50cyI6IFtdCgkJCX0KCQldCgl9LAoJewoJCSJjaHVuayI6ICJfSlNPTiIsCgkJInR5cGUiOiAibHljaGVlLmNvZGVjLkpTT04iLAoJCSJ2YWx1ZSI6IHsKCQkJInJlZmVyZW5jZSI6ICJseWNoZWUuY29kZWMuSlNPTiIsCgkJCSJhcmd1bWVudHMiOiBbXQoJCX0KCX0sCgl7CgkJImNodW5rIjogImNsaWVudCIsCgkJInR5cGUiOiAibHljaGVlLm5ldC5DbGllbnQiLAoJCSJ2YWx1ZSI6IHsKCQkJImNvbnN0cnVjdG9yIjogImx5Y2hlZS5uZXQuQ2xpZW50IiwKCQkJImFyZ3VtZW50cyI6IFtdCgkJfQoJfSwKCXsKCQkiY2h1bmsiOiAiaW5wdXQiLAoJCSJ0eXBlIjogImx5Y2hlZS5JbnB1dCIsCgkJInZhbHVlIjogewoJCQkiY29uc3RydWN0b3IiOiAibHljaGVlLklucHV0IiwKCQkJImFyZ3VtZW50cyI6IFtdCgkJfQoJfSwKCXsKCQkiY2h1bmsiOiAianVrZWJveCIsCgkJInR5cGUiOiAibHljaGVlLmFwcC5KdWtlYm94IiwKCQkidmFsdWUiOiB7CgkJCSJjb25zdHJ1Y3RvciI6ICJseWNoZWUuYXBwLkp1a2Vib3giLAoJCQkiYXJndW1lbnRzIjogW10KCQl9Cgl9LAoJewoJCSJjaHVuayI6ICJyZW5kZXJlciIsCgkJInR5cGUiOiAibHljaGVlLlJlbmRlcmVyIiwKCQkidmFsdWUiOiB7CgkJCSJjb25zdHJ1Y3RvciI6ICJseWNoZWUuUmVuZGVyZXIiLAoJCQkiYXJndW1lbnRzIjogW10KCQl9Cgl9LAoJewoJCSJjaHVuayI6ICJzdGFzaCIsCgkJInR5cGUiOiAibHljaGVlLlN0YXNoIiwKCQkidmFsdWUiOiB7CgkJCSJjb25zdHJ1Y3RvciI6ICJseWNoZWUuU3Rhc2giLAoJCQkiYXJndW1lbnRzIjogW10KCQl9Cgl9LAoJewoJCSJjaHVuayI6ICJzdG9yYWdlIiwKCQkidHlwZSI6ICJseWNoZWUuU3RvcmFnZSIsCgkJInZhbHVlIjogewoJCQkiY29uc3RydWN0b3IiOiAibHljaGVlLlN0b3JhZ2UiLAoJCQkiYXJndW1lbnRzIjogW10KCQl9Cgl9LAoJewoJCSJjaHVuayI6ICJ2aWV3cG9ydCIsCgkJInR5cGUiOiAibHljaGVlLlZpZXdwb3J0IiwKCQkidmFsdWUiOiB7CgkJCSJjb25zdHJ1Y3RvciI6ICJseWNoZWUuVmlld3BvcnQiLAoJCQkiYXJndW1lbnRzIjogW10KCQl9Cgl9LAoJewoJCSJjaHVuayI6ICJyZW1vdGUiLAoJCSJ0eXBlIjogImx5Y2hlZS5uZXQuUmVtb3RlIiwKCQkidmFsdWUiOiB7CgkJCSJjb25zdHJ1Y3RvciI6ICJseWNoZWUubmV0LlJlbW90ZSIsCgkJCSJhcmd1bWVudHMiOiBbXQoJCX0KCX0sCgl7CgkJImNodW5rIjogInNlcnZlciIsCgkJInR5cGUiOiAibHljaGVlLm5ldC5TZXJ2ZXIiLAoJCSJ2YWx1ZSI6IHsKCQkJImNvbnN0cnVjdG9yIjogImx5Y2hlZS5uZXQuU2VydmVyIiwKCQkJImFyZ3VtZW50cyI6IFtdCgkJfQoJfSwKCXsKCQkiY2h1bmsiOiAidHVubmVsIiwKCQkidHlwZSI6ICJseWNoZWUubmV0LlR1bm5lbCIsCgkJInZhbHVlIjogewoJCQkiY29uc3RydWN0b3IiOiAibHljaGVlLm5ldC5UdW5uZWwiLAoJCQkiYXJndW1lbnRzIjogW10KCQl9Cgl9LAoJewoJCSJjaHVuayI6ICJpZCIsCgkJInR5cGUiOiAiU3RyaW5nIiwKCQkidmFsdWUiOiAiPHVuaXF1ZSBpZGVudGlmaWVyPiIKCX0sCgl7CgkJImNodW5rIjogIndpZHRoIiwKCQkidHlwZSI6ICJOdW1iZXIiLAoJCSJ2YWx1ZSI6IDEzMzcKCX0sCgl7CgkJImNodW5rIjogImhlaWdodCIsCgkJInR5cGUiOiAiTnVtYmVyIiwKCQkidmFsdWUiOiAxMzM3Cgl9LAoJewoJCSJjaHVuayI6ICJkZXB0aCIsCgkJInR5cGUiOiAiTnVtYmVyIiwKCQkidmFsdWUiOiAxMzM3Cgl9LAoJewoJCSJjaHVuayI6ICJyYWRpdXMiLAoJCSJ0eXBlIjogIk51bWJlciIsCgkJInZhbHVlIjogMTM3Cgl9LAoJewoJCSJjaHVuayI6ICJEYXRlLm5vdygpIiwKCQkidHlwZSI6ICJOdW1iZXIiLAoJCSJ2YWx1ZSI6IDEzMzMzMzMzMzMzMzcKCX0sCgl7CgkJImNodW5rIjogIk1hdGgucG93IiwKCQkidHlwZSI6ICJOdW1iZXIiLAoJCSJ2YWx1ZSI6IDEzLjM3Cgl9LAoJewoJCSJjaHVuayI6ICJNYXRoLnNxcnQiLAoJCSJ0eXBlIjogIk51bWJlciIsCgkJInZhbHVlIjogMTMuMzcKCX0sCgl7CgkJImNodW5rIjogIm9iamVjdCIsCgkJInR5cGUiOiAiT2JqZWN0IiwKCQkidmFsdWUiOiB7fQoJfSwKCXsKCQkiY2h1bmsiOiAicHJvbWlzZSIsCgkJInR5cGUiOiAiUHJvbWlzZSIsCgkJInZhbHVlIjoge30KCX0sCgl7CgkJImNodW5rIjogInJlc3VsdCIsCgkJInR5cGUiOiAiQm9vbGVhbiIsCgkJInZhbHVlIjogdHJ1ZQoJfQpd"}}},"requires":["lychee.crypto.MURMUR"],"exports":"function (lychee, global, attachments) {\n\n\tconst _DICTIONARY = attachments[\"json\"].buffer;\n\tconst _FEATURES   = lychee.FEATURES;\n\tconst _MURMUR     = lychee.import('lychee.crypto.MURMUR');\n\tconst _PLATFORMS  = lychee.PLATFORMS;\n\n\n\n\t/*\n\t * HELPERS\n\t */\n\n\tconst _resolve_reference = function(identifier) {\n\n\t\tlet pointer = this;\n\n\t\tlet ns = identifier.split('.');\n\t\tfor (let n = 0, l = ns.length; n < l; n++) {\n\n\t\t\tlet name = ns[n];\n\t\t\tif (name.includes('(') && name.includes(')')) {\n\n\t\t\t\tlet args = null;\n\n\t\t\t\ttry {\n\n\t\t\t\t\tlet str = name.substr(name.indexOf('('));\n\t\t\t\t\tstr  = str.split('\\'').join('\"');\n\t\t\t\t\targs = JSON.parse('[' + str.substr(1, str.length - 2) + ']');\n\n\t\t\t\t} catch (err) {\n\t\t\t\t\targs = null;\n\t\t\t\t}\n\n\n\t\t\t\tname = name.substr(0, name.indexOf('('));\n\n\n\t\t\t\tif (typeof pointer[name] === 'function' && args !== null) {\n\n\t\t\t\t\ttry {\n\t\t\t\t\t\tpointer = pointer[name].apply(pointer, args);\n\t\t\t\t\t} catch (err) {\n\t\t\t\t\t\tpointer = null;\n\t\t\t\t\t}\n\n\t\t\t\t\tif (pointer === null) {\n\t\t\t\t\t\tbreak;\n\t\t\t\t\t}\n\n\t\t\t\t} else {\n\n\t\t\t\t\tpointer = null;\n\t\t\t\t\tbreak;\n\n\t\t\t\t}\n\n\t\t\t} else if (pointer[name] !== undefined) {\n\n\t\t\t\tpointer = pointer[name];\n\n\t\t\t} else {\n\n\t\t\t\tpointer = null;\n\t\t\t\tbreak;\n\n\t\t\t}\n\n\t\t}\n\n\t\treturn pointer;\n\n\t};\n\n\tconst _resolve_value = function(val) {\n\n\t\tlet value = {\n\t\t\tchunk: 'undefined',\n\t\t\ttype:  'undefined',\n\t\t\tvalue: val\n\t\t};\n\n\n\t\tif (val === undefined) {\n\n\t\t\tvalue.chunk = 'undefined';\n\t\t\tvalue.type  = 'undefined';\n\n\t\t} else if (val === null) {\n\n\t\t\tvalue.chunk = 'null';\n\t\t\tvalue.type  = 'null';\n\n\t\t} else if (typeof val === 'boolean') {\n\n\t\t\tvalue.chunk = (val).toString();\n\t\t\tvalue.type  = 'Boolean';\n\n\t\t} else if (typeof val === 'number') {\n\n\t\t\tvalue.chunk = (val).toString();\n\t\t\tvalue.type  = 'Number';\n\n\t\t} else if (typeof val === 'string') {\n\n\t\t\tvalue.chunk = val;\n\t\t\tvalue.type  = 'String';\n\n\t\t} else if (typeof val === 'function') {\n\n\t\t\tvalue.chunk = val.toString();\n\t\t\tvalue.type  = 'Function';\n\n\t\t} else if (val instanceof Array) {\n\n\t\t\tvalue.chunk = JSON.stringify(val);\n\t\t\tvalue.type  = 'Array';\n\n\t\t} else if (val instanceof Object) {\n\n\t\t\tvalue.chunk = JSON.stringify(val);\n\t\t\tvalue.type  = 'Object';\n\n\t\t}\n\n\n\t\treturn value;\n\n\t};\n\n\tconst _get_chunk = function(str1, str2, code) {\n\n\t\tlet i1 = code.indexOf(str1);\n\t\tlet i2 = code.indexOf(str2, i1);\n\n\t\tif (i1 !== -1 && i2 !== -1) {\n\t\t\treturn code.substr(i1 + str1.length, i2 - i1 - str1.length + str2.length).trim();\n\t\t}\n\n\t\treturn 'undefined';\n\n\t};\n\n\tconst _detect_type = function(str) {\n\n\t\tlet type = 'undefined';\n\n\n\t\tif (str === 'undefined') {\n\t\t\ttype = 'undefined';\n\t\t} else if (str === '-Infinity' || str === 'Infinity') {\n\t\t\ttype = 'Number';\n\t\t} else if (str === 'null') {\n\t\t\ttype = 'null';\n\t\t} else if (str === 'true' || str === 'false') {\n\t\t\ttype = 'Boolean';\n\t\t} else if (str.startsWith('function')) {\n\t\t\ttype = 'function';\n\t\t} else if (str.startsWith('(function(')) {\n\t\t\ttype = 'function';\n\t\t} else if (str.includes('===') && !str.includes('?')) {\n\t\t\ttype = 'Boolean';\n\t\t} else if (str.includes('&&') && !str.includes('?')) {\n\t\t\ttype = 'Boolean';\n\t\t} else if (str === '[]' || str.startsWith('[') || str.startsWith('Array.from')) {\n\t\t\ttype = 'Array';\n\t\t} else if (str === '{}' || str.startsWith('{')) {\n\t\t\ttype = 'Object';\n\t\t} else if (str.startsWith('Composite.')) {\n\t\t\ttype = 'Enum';\n\t\t} else if (str.startsWith('new Composite')) {\n\t\t\ttype = 'Composite';\n\t\t} else if (str.startsWith('new Promise')) {\n\t\t\ttype = 'Promise';\n\t\t} else if (str.startsWith('new ')) {\n\n\t\t\tlet tmp = str.substr(4);\n\t\t\tlet i1  = tmp.indexOf('(');\n\t\t\tif (i1 !== -1) {\n\t\t\t\ttmp = tmp.substr(0, i1);\n\t\t\t}\n\n\t\t\ttype = tmp;\n\n\t\t} else if (str.startsWith('\\'') && str.endsWith('\\'')) {\n\t\t\ttype = 'String';\n\t\t} else if (str.startsWith('\"') && str.endsWith('\"')) {\n\t\t\ttype = 'String';\n\t\t} else if (str.startsWith('\\'') || str.startsWith('\"')) {\n\t\t\ttype = 'String';\n\t\t} else if (str.includes('toString(') || str.includes('join(')) {\n\t\t\ttype = 'String';\n\t\t} else if (str.startsWith('/') || str.endsWith('/g')) {\n\t\t\ttype = 'RegExp';\n\t\t} else if (str.startsWith('0b') || str.startsWith('0x') || str.startsWith('0o') || /^[0-9.]+$/g.test(str) || /^-[0-9.]+$/g.test(str)) {\n\t\t\ttype = 'Number';\n\t\t} else if (str === 'Infinity') {\n\t\t\ttype = 'Number';\n\t\t} else if (str.includes(' + ') && (str.includes('\\'') || str.includes('\"') || str.includes('.substr(') || str.includes('.trim()'))) {\n\t\t\ttype = 'String';\n\t\t} else if (str.includes(' * ') || str.includes(' / ') || str.includes(' + ') || str.includes(' - ')) {\n\t\t\ttype = 'Number';\n\t\t} else {\n\n\t\t\tif (str.includes('instanceof') && str.includes('?') && str.includes(':')) {\n\n\t\t\t\tlet tmp = str.split(/(.*)instanceof\\s([A-Za-z0-9_.]+)([\\s]+)\\?(.*)/g);\n\t\t\t\tif (tmp.length > 2) {\n\t\t\t\t\ttype = tmp[2];\n\t\t\t\t}\n\n\t\t\t} else if (str.startsWith('typeof') && str.includes('===') && str.includes('?') && str.includes(':')) {\n\n\t\t\t\tlet tmp = (str.split('?')[0].split('===')[1] || '').trim();\n\t\t\t\tif (tmp.startsWith('\\'') || tmp.startsWith('\"')) {\n\t\t\t\t\ttmp = tmp.substr(1, tmp.length - 2);\n\t\t\t\t}\n\n\n\t\t\t\tswitch (tmp) {\n\t\t\t\t\tcase 'undefined': type = 'undefined'; break;\n\t\t\t\t\tcase 'null':      type = 'null';      break;\n\t\t\t\t\tcase 'boolean':   type = 'Boolean';   break;\n\t\t\t\t\tcase 'number':    type = 'Number';    break;\n\t\t\t\t\tcase 'string':    type = 'String';    break;\n\t\t\t\t\tcase 'function':  type = 'Function';  break;\n\t\t\t\t\tcase 'object':    type = 'Object';    break;\n\t\t\t\t\tdefault:          type = 'undefined'; break;\n\t\t\t\t}\n\n\n\t\t\t\tif (type === 'undefined') {\n\n\t\t\t\t\tlet tmp1 = str.split(':').pop();\n\t\t\t\t\tif (tmp1.endsWith(';')) {\n\t\t\t\t\t\ttmp1 = tmp1.substr(0, tmp1.length - 1);\n\t\t\t\t\t}\n\n\t\t\t\t\ttype = _detect_type(tmp1.trim());\n\n\t\t\t\t}\n\n\t\t\t} else if (str.includes('/g.test(')  && str.includes('?') && str.includes(':')) {\n\n\t\t\t\ttype = 'String';\n\n\t\t\t} else if (str.endsWith('| 0') || str.endsWith('| 0;')) {\n\n\t\t\t\ttype = 'Number';\n\n\t\t\t} else if (str.includes('!== undefined') && str.includes('?') && str.includes(':')) {\n\n\t\t\t\ttype = 'Object';\n\n\t\t\t} else if (str.startsWith('lychee.deserialize') || str.startsWith('_lychee.deserialize')) {\n\n\t\t\t\tif (str.includes('lychee.serialize(')) {\n\n\t\t\t\t\tlet tmp = str.split(/lychee\\.deserialize\\(lychee\\.serialize\\(([A-Za-z0-9_.]+)\\)\\)/g);\n\t\t\t\t\tif (tmp.length > 2) {\n\t\t\t\t\t\ttype = 'undefined';\n\t\t\t\t\t}\n\n\t\t\t\t} else {\n\n\t\t\t\t\tlet tmp = str.split(/lychee\\.deserialize\\(([A-Za-z0-9_.]+)\\)/g);\n\t\t\t\t\tif (tmp.length > 2) {\n\t\t\t\t\t\ttype = 'Object';\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t} else if (str.startsWith('lychee.assignunlink') || str.startsWith('_lychee.assignunlink')) {\n\n\t\t\t\ttype = 'Object';\n\n\t\t\t} else if (str.startsWith('lychee.diff') || str.startsWith('_lychee.diff')) {\n\n\t\t\t\ttype = 'Object';\n\n\t\t\t} else if (str.startsWith('lychee.enumof') || str.startsWith('_lychee.enumof')) {\n\n\t\t\t\ttype = 'Enum';\n\n\t\t\t} else if (str.startsWith('lychee.import') || str.startsWith('_lychee.import')) {\n\n\t\t\t\tlet tmp = str.split(/lychee.import\\('([A-Za-z0-9_.]+)'\\)/g);\n\t\t\t\tif (tmp.length === 3) {\n\n\t\t\t\t\tlet name = tmp[1].split('.');\n\t\t\t\t\tlet last = name[name.length - 1];\n\t\t\t\t\tif (last.charAt(0).toUpperCase() === last.charAt(0)) {\n\n\t\t\t\t\t\tif (name.length > 1) {\n\t\t\t\t\t\t\ttype = 'lychee.Definition';\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\ttype = last;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t} else {\n\t\t\t\t\t\ttype = 'lychee.Namespace';\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t} else if (str.startsWith('lychee.interfaceof') || str.startsWith('_lychee.interfaceof')) {\n\n\t\t\t\tlet tmp = str.split(/lychee.interfaceof\\(([A-Za-z0-9_.]+),(.*)\\)/g);\n\t\t\t\tif (tmp.length > 1) {\n\t\t\t\t\ttype = tmp[1];\n\t\t\t\t}\n\n\t\t\t} else if (str === 'this') {\n\n\t\t\t\ttype = 'Object';\n\n\t\t\t} else if (str.startsWith('this.')) {\n\n\t\t\t\ttype = 'undefined';\n\n\t\t\t} else if (str.endsWith(' || null')) {\n\n\t\t\t\tlet tmp1 = str.substr(0, str.length - 8).trim();\n\n\t\t\t\ttype = _detect_type(tmp1);\n\n\n\t\t\t\t// XXX: Assume Object || null\n\t\t\t\tif (type === 'undefined') {\n\t\t\t\t\ttype = 'Object';\n\t\t\t\t}\n\n\t\t\t} else if (str === 'main') {\n\n\t\t\t\ttype = 'lychee.app.Main';\n\n\t\t\t}\n\n\t\t}\n\n\n\t\treturn type;\n\n\t};\n\n\tconst _clone_value = function(data) {\n\n\t\tlet clone = undefined;\n\n\t\tif (data !== undefined) {\n\n\t\t\ttry {\n\t\t\t\tdata = JSON.parse(JSON.stringify(data));\n\t\t\t} catch (err) {\n\t\t\t}\n\n\t\t}\n\n\t\treturn clone;\n\n\t};\n\n\tconst _parse_value = function(str) {\n\n\t\tlet val = undefined;\n\t\tif (/(this|global)/g.test(str) === false) {\n\n\t\t\ttry {\n\t\t\t\tval = eval('(' + str + ')');\n\t\t\t} catch (err) {\n\t\t\t}\n\n\t\t}\n\n\t\treturn val;\n\n\t};\n\n\tconst _detect_value = function(str) {\n\n\t\tlet value = undefined;\n\n\n\t\tif (str === 'undefined') {\n\t\t\tvalue = undefined;\n\t\t} else if (str === '-Infinity' || str === 'Infinity') {\n\t\t\tvalue = 'Infinity';\n\t\t} else if (str === 'null') {\n\t\t\tvalue = null;\n\t\t} else if (str === 'true' || str === 'false') {\n\t\t\tvalue = str === 'true';\n\t\t} else if (str.includes('===') && !str.includes('?')) {\n\t\t\tvalue = true;\n\t\t} else if (str.includes('&&') && !str.includes('?')) {\n\t\t\tvalue = true;\n\t\t} else if (str === '[]' || str.startsWith('[')) {\n\n\t\t\tlet tmp = _parse_value(str);\n\t\t\tif (tmp === undefined) {\n\t\t\t\ttmp = [];\n\t\t\t}\n\n\t\t\tvalue = tmp;\n\n\t\t} else if (str === '{}' || str.startsWith('{')) {\n\n\t\t\tlet tmp = _parse_value(str);\n\t\t\tif (tmp === undefined) {\n\t\t\t\t//\t\t\t\tconsole.log(str);\n\t\t\t\ttmp = {};\n\t\t\t}\n\n\t\t\tvalue = tmp;\n\n\t\t} else if (str.startsWith('Composite.')) {\n\t\t\tvalue = str;\n\t\t} else if (str.startsWith('new Composite')) {\n\t\t\tvalue = str;\n\t\t} else if (str.startsWith('new Promise')) {\n\t\t\tvalue = str;\n\t\t} else if (str.startsWith('new ')) {\n\n\t\t\tlet tmp = str.substr(4);\n\t\t\tlet i1  = tmp.indexOf('(');\n\t\t\tlet i2  = tmp.indexOf(')', i1);\n\n\t\t\tif (i1 !== -1 && i2 !== -1) {\n\n\t\t\t\ttmp = tmp.substr(i1 + 1, i2 - i1 - 1);\n\n\t\t\t\tif (tmp.includes(',') === false) {\n\t\t\t\t\tvalue = _parse_value(tmp);\n\t\t\t\t}\n\n\t\t\t} else if (i1 !== -1) {\n\t\t\t\tvalue = '<' + tmp.substr(0, i1) + '>';\n\t\t\t}\n\n\t\t} else if (str.startsWith('\\'') && str.endsWith('\\'')) {\n\t\t\tvalue = str.substr(1, str.length - 2);\n\t\t} else if (str.startsWith('\"') && str.endsWith('\"')) {\n\t\t\tvalue = str.substr(1, str.length - 2);\n\t\t} else if (str.startsWith('\\'') || str.startsWith('\"')) {\n\t\t\tvalue = \"<string>\";\n\t\t} else if (str.includes('toString(') || str.includes('join(')) {\n\t\t\tvalue = \"<string>\";\n\t\t} else if (str.startsWith('/') || str.endsWith('/g')) {\n\n\t\t\tlet tmp1 = str;\n\t\t\tlet tmp2 = str.substr(str.lastIndexOf('/') + 1);\n\n\t\t\tif (tmp1.startsWith('/')) {\n\t\t\t\ttmp1 = tmp1.substr(1);\n\t\t\t}\n\n\t\t\tif (tmp1.endsWith('/g')) {\n\t\t\t\ttmp1 = tmp1.substr(0, tmp1.length - 2);\n\t\t\t}\n\n\t\t\tvalue = {\n\t\t\t\t'constructor': 'RegExp',\n\t\t\t\t'arguments':   [ tmp1, tmp2 ]\n\t\t\t};\n\n\t\t} else if (str.startsWith('0b') || str.startsWith('0x') || str.startsWith('0o') || /^[0-9.]+$/g.test(str) || /^-[0-9.]+$/g.test(str)) {\n\t\t\tvalue = _parse_value(str);\n\t\t} else if (str === 'Infinity') {\n\t\t\tvalue = Infinity;\n\t\t} else if (str.includes(' + ') && (str.includes('\\'') || str.includes('\"') || str.includes('.substr(') || str.includes('.trim()'))) {\n\t\t\tvalue = \"<string>\";\n\t\t} else if (str.includes(' * ') || str.includes(' / ') || str.includes(' + ') || str.includes(' - ')) {\n\t\t\tvalue = 1337;\n\t\t} else {\n\n\t\t\tif (str.includes('instanceof') && str.includes('?') && str.includes(':')) {\n\n\t\t\t\tlet tmp = str.split(':').pop();\n\t\t\t\tif (tmp.endsWith(';')) {\n\t\t\t\t\ttmp = tmp.substr(0, tmp.length - 1);\n\t\t\t\t}\n\n\t\t\t\tvalue = _detect_value(tmp.trim());\n\n\t\t\t} else if (str.startsWith('typeof') && str.includes('?') && str.includes(':')) {\n\n\t\t\t\tlet tmp = str.split(':').pop();\n\t\t\t\tif (tmp.endsWith(';')) {\n\t\t\t\t\ttmp = tmp.substr(0, tmp.length - 1);\n\t\t\t\t}\n\n\t\t\t\tvalue = _detect_value(tmp.trim());\n\n\t\t\t} else if (str.includes('/g.test(')  && str.includes('?') && str.includes(':')) {\n\n\t\t\t\tlet tmp = str.split(':').pop();\n\t\t\t\tif (tmp.endsWith(';')) {\n\t\t\t\t\ttmp = tmp.substr(0, tmp.length - 1);\n\t\t\t\t}\n\n\t\t\t\tvalue = _detect_value(tmp.trim());\n\n\t\t\t} else if (str.endsWith('| 0') || str.endsWith('| 0;')) {\n\n\t\t\t\tvalue = 1337;\n\n\t\t\t} else if (str.includes('!== undefined') && str.includes('?') && str.includes(':')) {\n\n\t\t\t\tvalue = {};\n\n\t\t\t} else if (str.startsWith('lychee.deserialize') || str.startsWith('_lychee.deserialize')) {\n\n\t\t\t\tif (str.includes('lychee.serialize(')) {\n\n\t\t\t\t\tlet tmp = str.split(/lychee\\.deserialize\\(lychee\\.serialize\\(([A-Za-z0-9_.]+)\\)\\)/g);\n\t\t\t\t\tif (tmp.length > 2) {\n\n\t\t\t\t\t\tvalue = {\n\t\t\t\t\t\t\t'reference': tmp[1],\n\t\t\t\t\t\t\t'arguments': []\n\t\t\t\t\t\t};\n\n\t\t\t\t\t}\n\n\t\t\t\t} else {\n\n\t\t\t\t\tlet tmp = str.split(/lychee\\.deserialize\\(([A-Za-z0-9_.]+)\\)/g);\n\t\t\t\t\tif (tmp.length > 2) {\n\t\t\t\t\t\tvalue = {};\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t} else if (str.startsWith('lychee.assignunlink') || str.startsWith('_lychee.assignunlink')) {\n\n\t\t\t\tvalue = {};\n\n\t\t\t} else if (str.startsWith('lychee.diff') || str.startsWith('_lychee.diff')) {\n\n\t\t\t\tvalue = {};\n\n\t\t\t} else if (str.startsWith('lychee.enumof') || str.startsWith('_lychee.enumof')) {\n\n\t\t\t\tlet tmp = str.split(/lychee\\.enumof\\(Composite\\.([A-Z]+),(.*)\\)/g);\n\t\t\t\tif (tmp.length > 2) {\n\t\t\t\t\tvalue = 'Composite.' + tmp[1];\n\t\t\t\t}\n\n\t\t\t} else if (str.startsWith('lychee.import') || str.startsWith('_lychee.import')) {\n\n\t\t\t\tlet tmp = str.split(/lychee\\.import\\('([A-Za-z0-9_.]+)'\\)/g);\n\t\t\t\tif (tmp.length > 2) {\n\n\t\t\t\t\tvalue = {\n\t\t\t\t\t\t'reference': tmp[1],\n\t\t\t\t\t\t'arguments': []\n\t\t\t\t\t};\n\n\t\t\t\t}\n\n\t\t\t} else if (str.startsWith('lychee.interfaceof') || str.startsWith('_lychee.interfaceof')) {\n\n\t\t\t\tif (str.indexOf(':') !== -1) {\n\n\t\t\t\t\tlet tmp = str.split(':').pop();\n\t\t\t\t\tif (tmp.endsWith(';')) {\n\t\t\t\t\t\ttmp = tmp.substr(0, tmp.length - 1);\n\t\t\t\t\t}\n\n\t\t\t\t\tvalue = _detect_value(tmp.trim());\n\n\t\t\t\t} else {\n\n\t\t\t\t\tlet tmp = str.substr(19, str.indexOf(',') - 19).trim();\n\t\t\t\t\tif (tmp.length > 0) {\n\t\t\t\t\t\tvalue = tmp;\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t} else if (str === 'this') {\n\n\t\t\t\tvalue = 'this';\n\n\t\t\t} else if (str.startsWith('this.')) {\n\n\t\t\t\tvalue = {\n\t\t\t\t\t'reference': str,\n\t\t\t\t\t'arguments': []\n\t\t\t\t};\n\n\t\t\t} else if (str.endsWith(' || null')) {\n\n\t\t\t\tlet tmp1 = str.substr(0, str.length - 8).trim();\n\n\t\t\t\tvalue = _detect_value(tmp1);\n\n\t\t\t\t// XXX: Assume Object || null\n\t\t\t\tif (value === undefined) {\n\t\t\t\t\tvalue = {};\n\t\t\t\t}\n\n\t\t\t} else if (str === 'main') {\n\n\t\t\t\tvalue = {\n\t\t\t\t\t'constructor': 'lychee.app.Main',\n\t\t\t\t\t'arguments': []\n\t\t\t\t};\n\n\t\t\t}\n\n\t\t}\n\n\n\t\treturn value;\n\n\t};\n\n\n\n\n\t/*\n\t * IMPLEMENTATION\n\t */\n\n\tconst Module = {\n\n\t\t/*\n\t\t * ENTITY API\n\t\t */\n\n\t\t// deserialize: function(blob) {},\n\n\t\tserialize: function() {\n\n\t\t\treturn {\n\t\t\t\t'reference': 'strainer.api.PARSER',\n\t\t\t\t'blob':      null\n\t\t\t};\n\n\t\t},\n\n\n\n\t\t/*\n\t\t * CUSTOM API\n\t\t */\n\n\t\tdetect: function(str) {\n\n\t\t\tstr = typeof str === 'string' ? str : 'undefined';\n\n\n\t\t\tif (str.startsWith('=')) {\n\t\t\t\tstr = str.substr(1).trim();\n\t\t\t}\n\n\t\t\tif (str.endsWith(';')) {\n\t\t\t\tstr = str.substr(0, str.length - 1);\n\t\t\t}\n\n\n\t\t\tlet val = {\n\t\t\t\tchunk: 'undefined',\n\t\t\t\ttype:  'undefined'\n\t\t\t};\n\n\n\n\t\t\t// XXX: This is explicitely to prevent parser\n\t\t\t// from endless looping while parsing itself\n\n\t\t\tval.chunk = str;\n\t\t\tval.type  = _detect_type(str);\n\n\t\t\tif (val.type === 'function') {\n\n\t\t\t\tval.hash       = Module.hash(str);\n\t\t\t\tval.parameters = Module.parameters(str);\n\t\t\t\tval.values     = Module.values(str);\n\n\t\t\t} else {\n\n\t\t\t\tval.value = _detect_value(str);\n\n\t\t\t}\n\n\n\t\t\tlet dictionary = [];\n\n\t\t\tif (\n\t\t\t\tval.chunk !== 'undefined'\n\t\t\t\t&& val.chunk.includes('.') === false\n\t\t\t\t&& val.value === undefined\n\t\t\t) {\n\n\t\t\t\tdictionary = _DICTIONARY.filter(function(other) {\n\n\t\t\t\t\tif (val.chunk.startsWith(other.chunk)) {\n\n\t\t\t\t\t\tif (other.type !== undefined) {\n\n\t\t\t\t\t\t\tif (val.type === 'undefined' || val.type === other.type) {\n\t\t\t\t\t\t\t\treturn true;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t} else if (other.types !== undefined) {\n\n\t\t\t\t\t\t\tif (val.type === 'undefined' || other.types.includes(val.type)) {\n\t\t\t\t\t\t\t\treturn true;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t\treturn false;\n\n\t\t\t\t}).sort(function(a, b) {\n\t\t\t\t\tif (a.chunk.length === b.chunk.length) return -1;\n\t\t\t\t\tif (a.chunk.length !== b.chunk.length) return  1;\n\t\t\t\t\treturn 0;\n\t\t\t\t});\n\n\t\t\t} else if (\n\t\t\t\tval.chunk !== 'undefined'\n\t\t\t\t&& val.chunk.startsWith('global')\n\t\t\t\t&& val.value === undefined\n\t\t\t) {\n\n\t\t\t\tlet reference = val.chunk.split('.').slice(1).join('.');\n\t\t\t\tlet platform  = null;\n\t\t\t\tlet pointer   = null;\n\n\t\t\t\tfor (let p = 0, pl = _PLATFORMS.length; p < pl; p++) {\n\n\t\t\t\t\tplatform = _PLATFORMS[p];\n\n\t\t\t\t\tif (_FEATURES[platform] !== undefined) {\n\n\t\t\t\t\t\tpointer = _resolve_reference.call(_FEATURES[platform], reference);\n\n\t\t\t\t\t\tif (pointer !== null) {\n\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\n\t\t\t\tif (pointer !== null) {\n\n\t\t\t\t\tlet resolved = _resolve_value(pointer);\n\t\t\t\t\tif (resolved.type !== 'undefined') {\n\n\t\t\t\t\t\tval.value = resolved.value;\n\t\t\t\t\t\tval.type  = resolved.type;\n\t\t\t\t\t\tval.chunk = resolved.chunk;\n\n\t\t\t\t\t}\n\n\t\t\t\t} else {\n\n\t\t\t\t\tconsole.warn('strainer.api.PARSER: Could not resolve \"' + reference + '\" via feature detection.');\n\n\t\t\t\t}\n\n\t\t\t} else if (\n\t\t\t\tval.chunk !== 'undefined'\n\t\t\t\t&& val.value === undefined\n\t\t\t) {\n\n\t\t\t\tdictionary = _DICTIONARY.filter(function(other) {\n\n\t\t\t\t\tif (val.chunk === other.chunk) {\n\n\t\t\t\t\t\tif (other.type !== undefined) {\n\n\t\t\t\t\t\t\tif (val.type === 'undefined' || val.type === other.type) {\n\t\t\t\t\t\t\t\treturn true;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t} else if (other.types !== undefined) {\n\n\t\t\t\t\t\t\tif (val.type === 'undefined' || other.types.includes(val.type)) {\n\t\t\t\t\t\t\t\treturn true;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t\treturn false;\n\n\t\t\t\t}).sort(function(a, b) {\n\t\t\t\t\tif (a.chunk.length === b.chunk.length) return -1;\n\t\t\t\t\tif (a.chunk.length !== b.chunk.length) return  1;\n\t\t\t\t\treturn 0;\n\t\t\t\t});\n\n\t\t\t}\n\n\n\t\t\tlet entry = dictionary[0] || null;\n\t\t\tif (entry !== null) {\n\n\t\t\t\tif (entry.type !== undefined && entry.value !== undefined) {\n\n\t\t\t\t\tval.type  = entry.type;\n\t\t\t\t\tval.value = entry.value;\n\n\t\t\t\t} else if (entry.types !== undefined && entry.values !== undefined) {\n\n\t\t\t\t\tval.type  = entry.types[0];\n\t\t\t\t\tval.value = entry.values[0];\n\n\t\t\t\t}\n\n\n\t\t\t\tif (val.chunk !== entry.chunk) {\n\n\t\t\t\t\tif (lychee.debug === true) {\n\t\t\t\t\t\tconsole.info('strainer.api.PARSER: Fuzzy guessing for \"' + val.chunk + '\" with \"' + entry.chunk + '\".');\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\treturn val;\n\n\t\t},\n\n\t\tenum: function(code) {\n\n\t\t\tcode = typeof code === 'string' ? code : '';\n\n\n\t\t\tlet enam  = { name: undefined };\n\t\t\tlet lines = code.split('\\n');\n\t\t\tlet first = lines[0].trim();\n\n\t\t\tif (first.includes('=')) {\n\t\t\t\tenam.name = first.substr(0, first.indexOf('=')).trim();\n\t\t\t}\n\n\n\t\t\t// XXX: Multi-Line Enum\n\t\t\tif (first.endsWith('{')) {\n\n\t\t\t\tenam.values = [];\n\t\t\t\tlines.shift();\n\n\n\t\t\t\tlines.filter(function(line) {\n\n\t\t\t\t\tif (line.includes(':')) {\n\n\t\t\t\t\t\tlet tmp = line.trim();\n\t\t\t\t\t\tif (tmp.startsWith('//') === false) {\n\t\t\t\t\t\t\treturn true;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t\treturn false;\n\n\t\t\t\t}).map(function(line) {\n\n\t\t\t\t\tlet i1 = line.indexOf(':');\n\t\t\t\t\tlet i2 = line.indexOf(',', i1);\n\n\t\t\t\t\tif (i2 === -1) i2 = line.length;\n\n\t\t\t\t\tlet key = line.substr(0, i1).trim();\n\t\t\t\t\tlet val = line.substr(i1 + 2, i2 - i1 - 2).trim();\n\n\t\t\t\t\tif (key.startsWith('\\'')) key = key.substr(1);\n\t\t\t\t\tif (key.endsWith('\\''))   key = key.substr(0, key.length - 1);\n\n\n\t\t\t\t\treturn {\n\t\t\t\t\t\tname:  key,\n\t\t\t\t\t\tvalue: Module.detect(val)\n\t\t\t\t\t};\n\n\t\t\t\t}).forEach(function(val) {\n\n\t\t\t\t\tif (val.value.type !== 'undefined') {\n\n\t\t\t\t\t\tenam.values.push(val);\n\n\t\t\t\t\t} else {\n\n\t\t\t\t\t\tif (lychee.debug === true) {\n\t\t\t\t\t\t\tconsole.warn('strainer.api.PARSER: No valid enum value \"' + enam.value.chunk + '\" for \"' + enam.name + '\".');\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t});\n\n\n\t\t\t// XXX: Single-Line Enum\n\t\t\t} else {\n\n\t\t\t\tlet tmp = lines.join(' ').trim();\n\t\t\t\tlet i1  = tmp.indexOf('=');\n\t\t\t\tlet i2  = tmp.indexOf(';', i1);\n\n\t\t\t\tif (i2 === -1) i2 = tmp.length;\n\n\t\t\t\tlet val = tmp.substr(i1 + 2, i2 - i1 - 2).trim();\n\n\t\t\t\tenam.value = Module.detect(val);\n\n\t\t\t}\n\n\n\t\t\treturn enam;\n\n\t\t},\n\n\t\tevents: function(code) {\n\n\t\t\tcode = typeof code === 'string' ? code : '';\n\n\n\t\t\tlet events = [];\n\t\t\tlet lines  = code.split('\\n');\n\t\t\tlet first  = lines[0].trim();\n\t\t\tlet last   = lines[lines.length - 1].trim();\n\n\n\t\t\tif (first.startsWith('function(') && first.endsWith(') {')) {\n\t\t\t\tlines.shift();\n\t\t\t}\n\n\t\t\tif (last.endsWith('}')) {\n\t\t\t\tlines.pop();\n\t\t\t}\n\n\n\t\t\tlines.map(function(line) {\n\t\t\t\treturn line.trim();\n\t\t\t}).filter(function(line) {\n\n\t\t\t\tif (\n\t\t\t\t\tline.includes('that.trigger(')\n\t\t\t\t\t|| line.includes('this.trigger(')\n\t\t\t\t) {\n\t\t\t\t\treturn true;\n\t\t\t\t}\n\n\t\t\t}).map(function(line) {\n\n\t\t\t\tlet chunk = line.trim();\n\n\t\t\t\tlet i1 = chunk.indexOf('trigger(');\n\t\t\t\tlet i2 = chunk.indexOf(');');\n\n\t\t\t\tif (i2 !== -1) {\n\t\t\t\t\tchunk = chunk.substr(i1 + 8, i2 - i1 - 8).trim();\n\t\t\t\t} else {\n\t\t\t\t\tchunk = line.substr(i1 + 8) + _get_chunk(line, ');', code);\n\t\t\t\t\tchunk = chunk.substr(0, chunk.length - 2).trim();\n\t\t\t\t}\n\n\t\t\t\tif (chunk.includes(',')) {\n\n\t\t\t\t\tlet tmp1 = chunk.split(',')[0].trim();\n\t\t\t\t\tlet tmp2 = chunk.split(',').slice(1).join(',').trim();\n\t\t\t\t\tlet tmp3 = [];\n\n\t\t\t\t\tif (tmp1.startsWith('\\'')) tmp1 = tmp1.substr(1);\n\t\t\t\t\tif (tmp1.endsWith('\\''))   tmp1 = tmp1.substr(0, tmp1.length - 1);\n\n\t\t\t\t\tif (tmp2.startsWith('[') && tmp2.endsWith(']')) {\n\n\t\t\t\t\t\ttmp2.substr(1, tmp2.length - 2).split(',').forEach(function(val) {\n\t\t\t\t\t\t\ttmp3.push(Module.detect(val.trim()));\n\t\t\t\t\t\t});\n\n\t\t\t\t\t}\n\n\t\t\t\t\treturn {\n\t\t\t\t\t\tname:       tmp1,\n\t\t\t\t\t\tparameters: tmp3\n\t\t\t\t\t};\n\n\t\t\t\t} else {\n\n\t\t\t\t\tlet tmp1 = chunk;\n\n\t\t\t\t\tif (tmp1.startsWith('\\'')) tmp1 = tmp1.substr(1);\n\t\t\t\t\tif (tmp1.endsWith('\\''))   tmp1 = tmp1.substr(0, tmp1.length - 1);\n\n\t\t\t\t\treturn {\n\t\t\t\t\t\tname:       tmp1,\n\t\t\t\t\t\tparameters: []\n\t\t\t\t\t};\n\n\t\t\t\t}\n\n\t\t\t}).forEach(function(val) {\n\n\t\t\t\tif (val.parameters.length > 0) {\n\n\t\t\t\t\tval.parameters.forEach(function(param) {\n\n\t\t\t\t\t\tlet chunk = param.chunk;\n\t\t\t\t\t\tlet type  = param.type;\n\n\t\t\t\t\t\tif (type === 'undefined' && /^([A-Za-z0-9]+)$/g.test(chunk)) {\n\n\t\t\t\t\t\t\tlet mutations = Module.mutations(chunk, code);\n\t\t\t\t\t\t\tif (mutations.length > 0) {\n\n\t\t\t\t\t\t\t\tlet val = mutations.find(function(mutation) {\n\t\t\t\t\t\t\t\t\treturn mutation.type !== 'undefined';\n\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\tif (val !== undefined) {\n\n\t\t\t\t\t\t\t\t\tparam.type  = val.type;\n\t\t\t\t\t\t\t\t\tparam.value = val.value;\n\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t} else {\n\n\t\t\t\t\t\t\t\tif (lychee.debug === true) {\n\t\t\t\t\t\t\t\t\tconsole.warn('strainer.api.PARSER: No traceable mutations for parameter \"' + chunk + '\".');\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t});\n\n\t\t\t\t}\n\n\n\t\t\t\tevents.push(val);\n\n\t\t\t});\n\n\n\t\t\treturn events;\n\n\t\t},\n\n\t\tfind: function(key, code) {\n\n\t\t\tkey  = typeof key === 'string'  ? key  : null;\n\t\t\tcode = typeof code === 'string' ? code : null;\n\n\n\t\t\tif (key !== null && code !== null) {\n\n\t\t\t\tlet str0 = 'const ' + key;\n\t\t\t\tlet i0   = code.indexOf(str0);\n\t\t\t\tlet i1   = code.indexOf('\\n', i0);\n\n\n\t\t\t\tif (i0 === -1) {\n\t\t\t\t\tstr0 = 'let   ' + key;\n\t\t\t\t\ti0   = code.indexOf(str0);\n\t\t\t\t\ti1   = code.indexOf('\\n', i0);\n\t\t\t\t}\n\n\t\t\t\tif (i0 === -1) {\n\t\t\t\t\tstr0 = 'let ' + key;\n\t\t\t\t\ti0   = code.indexOf(str0);\n\t\t\t\t\ti1   = code.indexOf('\\n', i0);\n\t\t\t\t}\n\n\n\t\t\t\tif (i0 !== -1 && i1 !== -1) {\n\n\t\t\t\t\tlet tmp1 = code.substr(i0 + str0.length, i1 - str0.length - i0).trim();\n\t\t\t\t\tif (\n\t\t\t\t\t\ttmp1.startsWith('=')\n\t\t\t\t\t\t&& tmp1.endsWith(';')\n\t\t\t\t\t) {\n\n\t\t\t\t\t\treturn tmp1.substr(1, tmp1.length - 2).trim();\n\n\t\t\t\t\t} else if (\n\t\t\t\t\t\ttmp1.startsWith('=')\n\t\t\t\t\t\t&& tmp1.includes('(function(')\n\t\t\t\t\t\t&& tmp1.endsWith('{')\n\t\t\t\t\t) {\n\n\t\t\t\t\t\tlet str2 = '\\n\\t})';\n\t\t\t\t\t\tlet str3 = ');\\n';\n\t\t\t\t\t\tlet i2   = code.indexOf(str2, i0);\n\t\t\t\t\t\tlet i3   = code.indexOf(str3, i2);\n\n\t\t\t\t\t\tif (i2 !== -1 && i3 !== -1) {\n\n\t\t\t\t\t\t\tlet tmp2 = code.substr(i0 + str0.length, i3 - str0.length - i0 + str3.length).trim();\n\t\t\t\t\t\t\tif (tmp2.startsWith('=') && tmp2.endsWith(';')) {\n\t\t\t\t\t\t\t\treturn tmp2.substr(1, tmp2.length - 2).trim();\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t} else if (\n\t\t\t\t\t\ttmp1.startsWith('=')\n\t\t\t\t\t\t&& tmp1.endsWith('{')\n\t\t\t\t\t) {\n\n\t\t\t\t\t\tlet str2 = '\\n\\t};';\n\t\t\t\t\t\tlet i2   = code.indexOf(str2, i0);\n\t\t\t\t\t\tif (i2 !== -1) {\n\n\t\t\t\t\t\t\tlet tmp2 = code.substr(i0 + str0.length, i2 - str0.length - i0 + str2.length).trim();\n\t\t\t\t\t\t\tif (tmp2.startsWith('=') && tmp2.endsWith(';')) {\n\n\t\t\t\t\t\t\t\treturn tmp2.substr(1, tmp2.length - 2).trim();\n\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\treturn 'undefined';\n\n\t\t},\n\n\t\thash: function(code) {\n\n\t\t\tcode = typeof code === 'string' ? code : '';\n\n\n\t\t\tlet hash = new _MURMUR();\n\n\t\t\thash.update(code);\n\n\t\t\treturn hash.digest().toString('hex');\n\n\t\t},\n\n\t\tparameters: function(code) {\n\n\t\t\tcode = typeof code === 'string' ? code : '';\n\n\n\t\t\tlet parameters = [];\n\t\t\tlet lines      = code.split('\\n');\n\t\t\tlet first      = lines[0].trim();\n\t\t\tlet last       = lines[lines.length - 1].trim();\n\n\t\t\tif (\n\t\t\t\t(first.startsWith('function(') || first.startsWith('(function('))\n\t\t\t\t&& first.endsWith(') {')\n\t\t\t) {\n\n\t\t\t\tlines.shift();\n\n\t\t\t\tlet tmp1 = first.split(/function\\((.*)\\)/g);\n\t\t\t\tif (tmp1.length > 1) {\n\n\t\t\t\t\tlet tmp2 = tmp1[1].trim();\n\t\t\t\t\tif (tmp2.length > 0) {\n\n\t\t\t\t\t\ttmp2.split(',').forEach(function(val) {\n\n\t\t\t\t\t\t\tparameters.push({\n\t\t\t\t\t\t\t\tchunk: null,\n\t\t\t\t\t\t\t\tname:  val.trim(),\n\t\t\t\t\t\t\t\ttype:  'undefined',\n\t\t\t\t\t\t\t\tvalue: undefined\n\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t});\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t\tif (last.endsWith('}')) {\n\t\t\t\tlines.pop();\n\t\t\t}\n\n\n\t\t\tlines.map(function(line) {\n\t\t\t\treturn line.trim();\n\t\t\t}).filter(function(line) {\n\n\t\t\t\tif (\n\t\t\t\t\tline === ''\n\t\t\t\t\t|| line.startsWith('//')\n\t\t\t\t\t|| line.startsWith('/*')\n\t\t\t\t\t|| line.startsWith('*/')\n\t\t\t\t\t|| line.startsWith('*')\n\t\t\t\t) {\n\t\t\t\t\treturn false;\n\t\t\t\t}\n\n\t\t\t\treturn true;\n\n\t\t\t}).forEach(function(line) {\n\n\t\t\t\tparameters.forEach(function(param) {\n\n\t\t\t\t\tif (line.startsWith(param.name) && line.includes('=')) {\n\n\t\t\t\t\t\tlet tmp = line.substr(line.indexOf('=') + 1).trim();\n\t\t\t\t\t\tlet val = Module.detect(tmp);\n\n\t\t\t\t\t\tif (val.type !== 'undefined') {\n\n\t\t\t\t\t\t\tif (param.type === val.type) {\n\n\t\t\t\t\t\t\t\tif (param.value === undefined) {\n\t\t\t\t\t\t\t\t\tparam.chunk = val.chunk;\n\t\t\t\t\t\t\t\t\tparam.value = val.value;\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t} else if (param.type === 'undefined') {\n\n\t\t\t\t\t\t\t\tparam.chunk = val.chunk;\n\t\t\t\t\t\t\t\tparam.type  = val.type;\n\t\t\t\t\t\t\t\tparam.value = val.value;\n\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t});\n\n\t\t\t});\n\n\n\t\t\treturn parameters;\n\n\t\t},\n\n\t\tsettings: function(code) {\n\n\t\t\tcode = typeof code === 'string' ? code : '';\n\n\n\t\t\tlet settings = {};\n\t\t\tlet lines    = code.split('\\n');\n\t\t\tlet first    = lines[0].trim();\n\t\t\tlet last     = lines[lines.length - 1].trim();\n\n\t\t\tif (first.startsWith('function(') && first.endsWith(') {')) {\n\t\t\t\tlines.shift();\n\t\t\t}\n\n\t\t\tif (last.endsWith('}')) {\n\t\t\t\tlines.pop();\n\t\t\t}\n\n\n\t\t\tlines.map(function(line) {\n\t\t\t\treturn line.trim();\n\t\t\t}).filter(function(line) {\n\n\t\t\t\tif (\n\t\t\t\t\tline === ''\n\t\t\t\t\t|| line.startsWith('//')\n\t\t\t\t\t|| line.startsWith('/*')\n\t\t\t\t\t|| line.startsWith('*/')\n\t\t\t\t\t|| line.startsWith('*')\n\t\t\t\t) {\n\t\t\t\t\treturn false;\n\t\t\t\t}\n\n\t\t\t\treturn true;\n\n\t\t\t}).forEach(function(line) {\n\n\t\t\t\tif (line.startsWith('this.set') && line.includes('settings.')) {\n\n\t\t\t\t\tlet tmp = line.split(/\\(settings\\.([A-Za-z]+)\\);/g);\n\t\t\t\t\tif (tmp.pop() === '') {\n\t\t\t\t\t\tsettings[tmp[1]] = tmp[0].split('.').pop();\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t});\n\n\n\t\t\treturn settings;\n\n\t\t},\n\n\t\tmutations: function(name, code) {\n\n\t\t\tname = typeof name === 'string' ? name : 'undefined_variable';\n\t\t\tcode = typeof code === 'string' ? code : '';\n\n\n\t\t\tlet mutations = [];\n\t\t\tlet lines     = code.split('\\n');\n\n\n\t\t\tlines.filter(function(line) {\n\n\t\t\t\tif (line.endsWith(';') || line.endsWith('= {')) {\n\n\t\t\t\t\tlet i1 = line.indexOf(name);\n\t\t\t\t\tlet i2 = line.indexOf('=', i1);\n\t\t\t\t\tlet i3 = line.indexOf('.', i1);\n\t\t\t\t\tlet i4 = line.indexOf('[', i1);\n\n\t\t\t\t\tif (\n\t\t\t\t\t\ti1 !== -1\n\t\t\t\t\t\t&& i2 !== -1\n\t\t\t\t\t\t&& (i3 === -1 || i3 > i2)\n\t\t\t\t\t\t&& (i4 === -1 || i4 > i2)\n\t\t\t\t\t) {\n\t\t\t\t\t\treturn true;\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t\treturn false;\n\n\t\t\t}).map(function(line) {\n\n\t\t\t\tlet tmp = line.trim();\n\t\t\t\tif (tmp.endsWith(' = {')) {\n\n\t\t\t\t\tlet chunk = _get_chunk(line, '};', code);\n\t\t\t\t\tif (chunk !== 'undefined') {\n\t\t\t\t\t\treturn tmp + chunk;\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t\treturn tmp;\n\n\t\t\t}).map(function(line) {\n\n\t\t\t\tlet i1 = line.indexOf('=');\n\t\t\t\tlet i2 = line.indexOf(';', i1);\n\t\t\t\tif (i2 === -1) {\n\t\t\t\t\ti2 = line.length;\n\t\t\t\t}\n\n\t\t\t\treturn line.substr(i1 + 2, i2 - i1 - 2);\n\n\t\t\t}).map(function(chunk) {\n\t\t\t\treturn Module.detect(chunk);\n\t\t\t}).filter(function(val) {\n\n\t\t\t\tlet chunk = val.chunk;\n\t\t\t\tlet type  = val.type;\n\n\t\t\t\tif (type !== 'undefined' || chunk.startsWith('_') || chunk.startsWith('this.')) {\n\t\t\t\t\treturn true;\n\t\t\t\t}\n\n\t\t\t\treturn false;\n\n\t\t\t}).forEach(function(val) {\n\t\t\t\tmutations.push(val);\n\t\t\t});\n\n\n\t\t\treturn mutations;\n\n\t\t},\n\n\t\tvalues: function(code) {\n\n\t\t\tcode = typeof code === 'string' ? code : '';\n\n\n\t\t\tlet candidates = [];\n\t\t\tlet values     = [];\n\t\t\tlet lines      = code.split('\\n');\n\t\t\tlet is_comment = false;\n\t\t\tlet nest_level = 0;\n\t\t\tlet first      = lines[0].trim();\n\t\t\tlet last       = lines[lines.length - 1].trim();\n\n\t\t\tif (\n\t\t\t\t(first.startsWith('function(') || first.startsWith('(function('))\n\t\t\t\t&& first.endsWith(') {')\n\t\t\t) {\n\t\t\t\tlines.shift();\n\t\t\t}\n\n\t\t\tif (last.endsWith('}')) {\n\t\t\t\tlines.pop();\n\t\t\t}\n\n\n\t\t\tlines.map(function(line) {\n\t\t\t\treturn line.trim();\n\t\t\t}).filter(function(line) {\n\n\t\t\t\tif (line.startsWith('//')) {\n\t\t\t\t\treturn false;\n\t\t\t\t} else if (line.startsWith('/*')) {\n\t\t\t\t\tis_comment = true;\n\t\t\t\t\treturn false;\n\t\t\t\t} else if (line.endsWith('*/')) {\n\t\t\t\t\tis_comment = false;\n\t\t\t\t\treturn false;\n\t\t\t\t} else if (is_comment === true) {\n\t\t\t\t\treturn false;\n\t\t\t\t}\n\n\n\t\t\t\tlet result = false;\n\n\t\t\t\t// XXX: Following algorithm crashes itself\n\t\t\t\tif (\n\t\t\t\t\t!line.includes('line.includes(')\n\t\t\t\t\t&& !line.includes('line.endsWith(')\n\t\t\t\t) {\n\n\t\t\t\t\tif (\n\t\t\t\t\t\t(line.includes('(function') && line.endsWith('{'))\n\t\t\t\t\t\t|| (line.includes(', function') && line.endsWith('{'))\n\t\t\t\t\t\t|| line.endsWith('=> {')\n\t\t\t\t\t) {\n\n\t\t\t\t\t\tif (\n\t\t\t\t\t\t\t!line.includes('})')\n\t\t\t\t\t\t\t&& !line.includes('}, function')\n\t\t\t\t\t\t\t&& line !== '}, {'\n\t\t\t\t\t\t) {\n\n\t\t\t\t\t\t\tif (line.startsWith('return ')) {\n\t\t\t\t\t\t\t\tresult = true;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\tnest_level++;\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\n\t\t\t\t\tif (\n\t\t\t\t\t\tline.startsWith('}')\n\t\t\t\t\t\t&& (\n\t\t\t\t\t\t\tline.includes(').')\n\t\t\t\t\t\t\t|| line.endsWith(')')\n\t\t\t\t\t\t\t|| line.endsWith(');')\n\t\t\t\t\t\t\t|| line.endsWith('}.bind(this));')\n\t\t\t\t\t\t\t|| line.endsWith(') || null;')\n\t\t\t\t\t\t)\n\t\t\t\t\t) {\n\n\t\t\t\t\t\tif (\n\t\t\t\t\t\t\t!line.includes('(function')\n\t\t\t\t\t\t\t&& !line.includes('({')\n\t\t\t\t\t\t\t&& !line.endsWith(') {')\n\t\t\t\t\t\t) {\n\n\t\t\t\t\t\t\tif (nest_level > 0) {\n\t\t\t\t\t\t\t\tnest_level--;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\n\t\t\t\tif (result === false && nest_level === 0 && line.includes('return ')) {\n\t\t\t\t\tresult = true;\n\t\t\t\t}\n\n\n\t\t\t\treturn result;\n\n\t\t\t}).map(function(line) {\n\n\t\t\t\tlet chunk = line.trim();\n\n\t\t\t\tlet i1 = chunk.indexOf('return ');\n\t\t\t\tlet i2 = chunk.indexOf(';', i1);\n\t\t\t\tif (i2 !== -1) {\n\t\t\t\t\treturn Module.detect(chunk.substr(i1 + 7, i2 - i1 - 7).trim());\n\t\t\t\t}\n\n\t\t\t\tchunk = line.substr(i1 + 7) + ' ' + _get_chunk(line, ';', code);\n\t\t\t\tchunk = chunk.substr(0, chunk.length - 1);\n\n\t\t\t\treturn Module.detect(chunk.trim());\n\n\t\t\t}).forEach(function(val) {\n\n\t\t\t\tlet chunk = val.chunk;\n\t\t\t\tlet type  = val.type;\n\t\t\t\tlet value = val.value;\n\n\t\t\t\tif (type === 'undefined' && /^([A-Za-z0-9]+)$/g.test(chunk)) {\n\n\t\t\t\t\tlet mutations = Module.mutations(chunk, code);\n\t\t\t\t\tif (mutations.length > 0) {\n\n\t\t\t\t\t\tmutations.forEach(function(mutation) {\n\n\t\t\t\t\t\t\tcandidates.push({\n\t\t\t\t\t\t\t\tchunk: mutation.chunk,\n\t\t\t\t\t\t\t\ttype:  mutation.type,\n\t\t\t\t\t\t\t\tvalue: mutation.value\n\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t});\n\n\t\t\t\t\t} else {\n\n\t\t\t\t\t\tif (lychee.debug === true) {\n\t\t\t\t\t\t\tconsole.warn('strainer.api.PARSER: No traceable mutations for value \"' + chunk + '\".');\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t} else if (type !== 'undefined' || chunk.startsWith('_') || chunk.startsWith('this.')) {\n\n\t\t\t\t\tcandidates.push({\n\t\t\t\t\t\tchunk: chunk,\n\t\t\t\t\t\ttype:  type,\n\t\t\t\t\t\tvalue: value\n\t\t\t\t\t});\n\n\t\t\t\t} else {\n\n\t\t\t\t\tif (lychee.debug === true) {\n\t\t\t\t\t\tconsole.warn('strainer.api.PARSER: No traceable values for \"' + chunk + '\".');\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t});\n\n\n\t\t\tcandidates.forEach(function(val) {\n\n\t\t\t\tlet found = values.find(function(other) {\n\n\t\t\t\t\tlet otype = other.type;\n\t\t\t\t\tif (otype === val.type) {\n\n\t\t\t\t\t\tif (otype === 'Array' || otype === 'Object') {\n\t\t\t\t\t\t\treturn lychee.diff(other.value, val.value) === false;\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\treturn other.value === val.value;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t\treturn false;\n\n\t\t\t\t}) || null;\n\n\t\t\t\tif (found === null) {\n\t\t\t\t\tvalues.push(val);\n\t\t\t\t}\n\n\t\t\t});\n\n\n\t\t\treturn values;\n\n\t\t}\n\n\t};\n\n\n\treturn Module;\n\n}"}},"strainer.fix.ESLINT":{"constructor":"lychee.Definition","arguments":[{"id":"strainer.fix.ESLINT","url":"/libraries/strainer/source/fix/ESLINT.js"}],"blob":{"attaches":{},"exports":"function (lychee, global, attachments) {\n\n\tconst _TAB_STR = new Array(128).fill('\\t').join('');\n\n\t/*\n\t * HELPERS\n\t */\n\n\tconst _auto_fix = function(line, err) {\n\n\t\tif (err.fix) {\n\t\t\treturn line.substr(0, err.fix.range[0]) + err.fix.text + line.substr(err.fix.range[1]);\n\t\t}\n\n\t\treturn line;\n\n\t};\n\n\n\n\t/*\n\t * IMPLEMENTATION\n\t */\n\n\tconst Module = {\n\n\t\t// deserialize: function(blob) {},\n\n\t\tserialize: function() {\n\n\t\t\treturn {\n\t\t\t\t'reference': 'strainer.fix.ESLINT',\n\t\t\t\t'arguments': []\n\t\t\t};\n\n\t\t},\n\n\t\t/*\n\t\t * AUTO FIXES\n\t\t */\n\n\t\t'array-bracket-spacing': _auto_fix,\n\t\t'comma-dangle':          _auto_fix,\n\t\t'comma-spacing':         _auto_fix,\n\t\t'keyword-spacing':       _auto_fix,\n\t\t'no-trailing-spaces':    _auto_fix,\n\t\t'no-var':                _auto_fix,\n\t\t'object-curly-spacing':  _auto_fix,\n\t\t'semi':                  _auto_fix,\n\t\t'semi-spacing':          _auto_fix,\n\t\t'space-before-blocks':   _auto_fix,\n\t\t'space-in-parens':       _auto_fix,\n\t\t'space-infix-ops':       _auto_fix,\n\t\t'space-unary-ops':       _auto_fix,\n\n\t\t/*\n\t\t * MANUAL FIXES\n\t\t */\n\n\t\t'brace-style': function(line, err) {\n\n\t\t\tif (err.fix) {\n\n\t\t\t\tlet prefix = line.substr(0, err.fix.range[0]);\n\t\t\t\tlet suffix = line.substr(err.fix.range[1]);\n\n\n\t\t\t\tlet tmp = prefix.split('\\n').pop().split('');\n\t\t\t\tlet tl  = tmp.indexOf(tmp.find(function(val) {\n\t\t\t\t\treturn val !== '\\t';\n\t\t\t\t}));\n\n\n\t\t\t\tif (err.message.startsWith('Statement inside of curly braces')) {\n\n\t\t\t\t\ttl += 1;\n\n\t\t\t\t} else if (err.message.startsWith('Closing curly brace')) {\n\n\t\t\t\t\ttl -= 1;\n\n\t\t\t\t}\n\n\n\t\t\t\tlet tabs = _TAB_STR.substr(0, tl);\n\t\t\t\tif (tabs.length > 0) {\n\t\t\t\t\treturn prefix.trimRight() + err.fix.text + tabs + suffix.trimLeft();\n\t\t\t\t}\n\n\n\t\t\t\treturn prefix + err.fix.text + suffix;\n\n\t\t\t}\n\n\n\t\t\treturn line;\n\n\t\t},\n\n\t\t'indent': function(line, err, code, c) {\n\n\t\t\tif (err.fix) {\n\n\t\t\t\t// XXX: The indent plugin in eslint is broken\n\t\t\t\t// and gives false err.fix when mixed tabs\n\t\t\t\t// and whitespaces are in place.\n\n\t\t\t\tlet prev = null;\n\n\t\t\t\tfor (let p = c - 1; p >= 0; p--) {\n\n\t\t\t\t\tlet tmp = code[p];\n\t\t\t\t\tif (tmp.trim() !== '') {\n\t\t\t\t\t\tprev = tmp;\n\t\t\t\t\t\tbreak;\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\n\t\t\t\tlet text = err.fix.text;\n\n\t\t\t\tif (prev !== null && prev.startsWith('\\t')) {\n\n\t\t\t\t\tlet tmp = prev.split('\\n').pop().split('');\n\t\t\t\t\tlet tl  = tmp.indexOf(tmp.find(function(val) {\n\t\t\t\t\t\treturn val !== '\\t';\n\t\t\t\t\t}));\n\n\t\t\t\t\tif (prev.endsWith('{')) {\n\t\t\t\t\t\ttl += 1;\n\t\t\t\t\t} else if (line.endsWith('}') || line.endsWith('});')) {\n\t\t\t\t\t\ttl -= 1;\n\t\t\t\t\t}\n\n\t\t\t\t\ttext = _TAB_STR.substr(0, tl);\n\n\t\t\t\t}\n\n\n\t\t\t\treturn line.substr(0, err.fix.range[0]) + text + line.substr(err.fix.range[1]);\n\n\t\t\t}\n\n\n\t\t\treturn line;\n\n\t\t},\n\n\t\t'no-mixed-spaces-and-tabs': function(line, err, code, c) {\n\n\t\t\tlet prev = null;\n\n\t\t\tfor (let p = c - 1; p >= 0; p--) {\n\n\t\t\t\tlet tmp = code[p];\n\t\t\t\tif (tmp.trim() !== '') {\n\t\t\t\t\tprev = tmp;\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\tlet suffix = line.trimLeft();\n\t\t\tlet t      = line.indexOf(suffix);\n\t\t\tlet text   = line.substr(0, t).split(' ').join('\\t');\n\n\n\t\t\tif (prev !== null && prev.startsWith('\\t')) {\n\n\t\t\t\tlet tmp = prev.split('\\n').pop().split('');\n\t\t\t\tlet tl  = tmp.indexOf(tmp.find(function(val) {\n\t\t\t\t\treturn val !== '\\t';\n\t\t\t\t}));\n\n\t\t\t\tif (prev.endsWith('{')) {\n\t\t\t\t\ttl += 1;\n\t\t\t\t} else if (line.endsWith('}') || line.endsWith('});')) {\n\t\t\t\t\ttl -= 1;\n\t\t\t\t}\n\n\t\t\t\ttext = _TAB_STR.substr(0, tl);\n\n\t\t\t}\n\n\n\t\t\treturn text + suffix;\n\n\t\t}\n\n\t};\n\n\n\treturn Module;\n\n}"}},"strainer.api.Module":{"constructor":"lychee.Definition","arguments":[{"id":"strainer.api.Module","url":"/libraries/strainer/source/api/Module.js"}],"blob":{"attaches":{},"requires":["strainer.api.PARSER","strainer.api.TRANSCRIPTOR"],"exports":"function (lychee, global, attachments) {\n\n\tconst _PARSER       = lychee.import('strainer.api.PARSER');\n\tconst _TRANSCRIPTOR = lychee.import('strainer.api.TRANSCRIPTOR');\n\n\n\n\t/*\n\t * CACHES\n\t */\n\n\tconst _SERIALIZE = {\n\t\ttype:       'function',\n\t\tbody:       'function() { return {}; }',\n\t\tchunk:      'function() {',\n\t\thash:       _PARSER.hash('function() { return {}; }'),\n\t\tparameters: [],\n\t\tvalues:     [{\n\t\t\ttype: 'SerializationBlob',\n\t\t\tvalue: {\n\t\t\t\t'constructor': null,\n\t\t\t\t'arguments':   [],\n\t\t\t\t'blob':        null\n\t\t\t}\n\t\t}]\n\t};\n\n\tconst _DESERIALIZE = {\n\t\ttype:       'function',\n\t\tbody:       'function(blob) {}',\n\t\tchunk:      'function(blob) {',\n\t\thash:       _PARSER.hash('function(blob) {}'),\n\t\tparameters: [{\n\t\t\tname:  'blob',\n\t\t\ttype:  'SerializationBlob',\n\t\t\tvalue: {}\n\t\t}],\n\t\tvalues: [{\n\t\t\ttype:  'undefined',\n\t\t\tvalue: undefined\n\t\t}]\n\t};\n\n\n\n\t/*\n\t * HELPERS\n\t */\n\n\tconst _validate_asset = function(asset) {\n\n\t\tif (asset instanceof Object && typeof asset.serialize === 'function') {\n\t\t\treturn true;\n\t\t}\n\n\t\treturn false;\n\n\t};\n\n\tconst _find_reference = function(chunk, stream, fuzzy) {\n\n\t\tfuzzy = fuzzy === true;\n\n\n\t\tlet ref = {\n\t\t\tchunk:  '',\n\t\t\tline:   0,\n\t\t\tcolumn: 0\n\t\t};\n\n\t\tlet lines = stream.split('\\n');\n\t\tlet line  = lines.findIndex(function(other) {\n\n\t\t\tif (fuzzy === true) {\n\t\t\t\treturn other.includes(chunk.trim());\n\t\t\t} else {\n\t\t\t\treturn other.trim() === chunk.trim();\n\t\t\t}\n\n\t\t});\n\n\t\tif (line !== -1) {\n\n\t\t\tref.chunk = lines[line];\n\t\t\tref.line  = line + 1;\n\n\t\t\tlet column = lines[line].indexOf(chunk);\n\t\t\tif (column !== -1) {\n\t\t\t\tref.column = column + 1;\n\t\t\t}\n\n\t\t}\n\n\t\treturn ref;\n\n\t};\n\n\tconst _find_method = function(key, stream) {\n\n\t\tlet str1 = '\\n\\t\\t' + key + ': function';\n\t\tlet str2 = '\\n\\t\\t}';\n\n\t\tlet i0 = stream.indexOf('\\n\\tconst Module = {');\n\t\tlet i1 = stream.indexOf(str1, i0);\n\t\tlet i2 = stream.indexOf(str2, i1);\n\n\t\tif (i1 !== -1 && i2 !== -1) {\n\t\t\treturn 'function' + stream.substr(i1 + str1.length, i2 - i1 - str1.length + str2.length).trim();\n\t\t}\n\n\t\treturn 'undefined';\n\n\t};\n\n\tconst _find_property = function(key, stream) {\n\n\t\tlet str1 = '\\n\\t\\t' + key + ': {';\n\t\tlet str2 = '\\n\\t\\t}';\n\n\t\tlet i0 = stream.indexOf('\\n\\tconst Module = {');\n\t\tlet i1 = stream.indexOf(str1, i0);\n\t\tlet i2 = stream.indexOf(str2, i1);\n\n\t\tif (i1 !== -1 && i2 !== -1) {\n\t\t\treturn stream.substr(i1 + str1.length - 1, i2 - i1 - str1.length + str2.length + 1).trim();\n\t\t}\n\n\t\treturn 'undefined';\n\n\t};\n\n\tconst _parse_memory = function(memory, stream, errors) {\n\n\t\tlet i1 = stream.indexOf('.exports(function(lychee, global, attachments) {');\n\t\tlet i2 = stream.indexOf('\\n\\tconst Module =');\n\n\t\tif (i1 !== -1 && i2 !== -1) {\n\n\t\t\tlet body = stream.substr(i1 + 48, i2 - i1 - 48);\n\t\t\tif (body.length > 0) {\n\n\t\t\t\tbody.split('\\n')\n\t\t\t\t\t.filter(line => {\n\t\t\t\t\t\treturn line.startsWith('\\tconst ') || line.startsWith('\\tlet ');\n\t\t\t\t\t})\n\t\t\t\t\t.map(line => line.trim())\n\t\t\t\t\t.forEach(line => {\n\n\t\t\t\t\t\tlet tmp = '';\n\t\t\t\t\t\tif (line.startsWith('const ')) {\n\t\t\t\t\t\t\ttmp = line.substr(6).trim();\n\t\t\t\t\t\t} else if (line.startsWith('let ')) {\n\t\t\t\t\t\t\ttmp = line.substr(4).trim();\n\t\t\t\t\t\t}\n\n\n\t\t\t\t\t\tlet i1 = tmp.indexOf('=');\n\t\t\t\t\t\tif (i1 !== -1) {\n\n\t\t\t\t\t\t\tlet key   = tmp.substr(0, i1).trim();\n\t\t\t\t\t\t\tlet chunk = tmp.substr(i1 + 1).trim();\n\n\t\t\t\t\t\t\tif (key !== '' && chunk !== '') {\n\n\t\t\t\t\t\t\t\tif (chunk.endsWith(';')) {\n\n\t\t\t\t\t\t\t\t\tchunk = chunk.substr(0, chunk.length - 1);\n\t\t\t\t\t\t\t\t\tmemory[key] = _PARSER.detect(chunk);\n\n\t\t\t\t\t\t\t\t} else {\n\n\t\t\t\t\t\t\t\t\tchunk = _PARSER.find(key, body);\n\t\t\t\t\t\t\t\t\tmemory[key] = _PARSER.detect(chunk);\n\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t});\n\n\t\t\t}\n\n\t\t}\n\n\t};\n\n\tconst _parse_methods = function(methods, stream, errors) {\n\n\t\tlet buffer = stream.split('\\n');\n\t\tlet check1 = buffer.findIndex((line, l) => (line === '\\tconst Module = {'));\n\t\tlet check2 = buffer.findIndex((line, l) => (line === '\\t};' && l > check1));\n\n\t\tif (check1 !== -1 && check2 !== -1) {\n\n\t\t\tbuffer.slice(check1 + 1, check2).filter(line => {\n\n\t\t\t\tif (line.startsWith('\\t\\t')) {\n\n\t\t\t\t\tlet tmp = line.substr(2);\n\t\t\t\t\tif (/^([A-Za-z0-9]+):\\sfunction/g.test(tmp)) {\n\t\t\t\t\t\treturn true;\n\t\t\t\t\t} else if (tmp.startsWith('// deserialize: function(blob) {}')) {\n\t\t\t\t\t\tmethods['deserialize'] = Object.assign({}, _DESERIALIZE);\n\t\t\t\t\t} else if (tmp.startsWith('// serialize: function() {}')) {\n\t\t\t\t\t\tmethods['serialize'] = Object.assign({}, _SERIALIZE);\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\n\t\t\t\treturn false;\n\n\t\t\t}).forEach(chunk => {\n\n\t\t\t\tlet name = chunk.split(':')[0].trim();\n\t\t\t\tlet body = _find_method(name, stream);\n\n\t\t\t\tif (body !== 'undefined') {\n\t\t\t\t\tmethods[name] = _PARSER.detect(body);\n\t\t\t\t}\n\n\t\t\t});\n\n\n\t\t\tlet deserialize = methods['deserialize'];\n\t\t\tif (deserialize !== undefined) {\n\t\t\t\tif (deserialize.parameters.length === 0) deserialize.parameters = lychee.assignunlink([], _DESERIALIZE.parameters);\n\t\t\t\tif (deserialize.values.length === 0)     deserialize.values     = lychee.assignunlink([], _DESERIALIZE.values);\n\t\t\t}\n\n\t\t\tlet serialize = methods['serialize'];\n\t\t\tif (serialize !== undefined) {\n\t\t\t\tif (serialize.parameters.length === 0) serialize.parameters = lychee.assignunlink([], _SERIALIZE.parameters);\n\t\t\t\tif (serialize.values.length === 0)     serialize.values     = lychee.assignunlink([], _SERIALIZE.values);\n\t\t\t}\n\n\n\t\t\tfor (let mid in methods) {\n\n\t\t\t\tlet method = methods[mid];\n\t\t\t\tlet params = method.parameters;\n\t\t\t\tlet ref    = _find_reference(method.chunk, stream);\n\t\t\t\tlet values = method.values;\n\n\n\t\t\t\tif (params.length > 0) {\n\n\t\t\t\t\tlet found = params.filter(p => p.type === 'undefined' && p.value === undefined).map(p => p.name);\n\t\t\t\t\tif (found.length > 0) {\n\n\t\t\t\t\t\tif (/^(control|render|update|deserialize|serialize)$/g.test(mid) === false) {\n\n\t\t\t\t\t\t\tlet key = found[0];\n\t\t\t\t\t\t\tlet col = ref.chunk.indexOf(key);\n\t\t\t\t\t\t\tif (col !== -1) {\n\t\t\t\t\t\t\t\tcol = col + 1;\n\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\tcol = ref.column;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\terrors.push({\n\t\t\t\t\t\t\t\turl:       null,\n\t\t\t\t\t\t\t\trule:      'no-parameter-value',\n\t\t\t\t\t\t\t\treference: mid,\n\t\t\t\t\t\t\t\tmessage:   'Invalid parameter values for \"' + found.join('\", \"') + '\" for method \"' + mid + '()\".',\n\t\t\t\t\t\t\t\tline:      ref.line,\n\t\t\t\t\t\t\t\tcolumn:    col\n\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t\tif (values.length === 0) {\n\n\t\t\t\t\terrors.push({\n\t\t\t\t\t\turl:       null,\n\t\t\t\t\t\trule:      'no-return-value',\n\t\t\t\t\t\treference: mid,\n\t\t\t\t\t\tmessage:   'Invalid return value for method \"' + mid + '()\".',\n\t\t\t\t\t\tline:      ref.line,\n\t\t\t\t\t\tcolumn:    ref.column\n\t\t\t\t\t});\n\n\n\t\t\t\t\tmethod.values.push({\n\t\t\t\t\t\ttype:  'undefined',\n\t\t\t\t\t\tvalue: undefined\n\t\t\t\t\t});\n\n\t\t\t\t} else if (values.length > 0) {\n\n\t\t\t\t\tif (/^(serialize|deserialize)$/g.test(mid) === false) {\n\n\t\t\t\t\t\tvalues.forEach(val => {\n\n\t\t\t\t\t\t\tif (val.type === 'undefined' && val.value === undefined) {\n\n\t\t\t\t\t\t\t\tlet message = 'Unguessable return value for method \"' + mid + '()\".';\n\t\t\t\t\t\t\t\tlet chunk   = (val.chunk || '').trim();\n\n\t\t\t\t\t\t\t\tif (chunk !== '') {\n\t\t\t\t\t\t\t\t\tmessage = 'Unguessable return value \"' + chunk + '\" for method \"' + mid + '()\".';\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\terrors.push({\n\t\t\t\t\t\t\t\t\turl:       null,\n\t\t\t\t\t\t\t\t\trule:      'unguessable-return-value',\n\t\t\t\t\t\t\t\t\treference: mid,\n\t\t\t\t\t\t\t\t\tmessage:   message,\n\t\t\t\t\t\t\t\t\tline:      ref.line,\n\t\t\t\t\t\t\t\t\tcolumn:    ref.column\n\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t});\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t}\n\n\t};\n\n\tconst _parse_properties = function(properties, stream, errors) {\n\n\t\tlet buffer = stream.split('\\n');\n\t\tlet check1 = buffer.findIndex((line, l) => (line === '\\tconst Module = {'));\n\t\tlet check2 = buffer.findIndex((line, l) => (line === '\\t};' && l > check1));\n\n\t\tif (check1 !== -1 && check2 !== -1) {\n\n\t\t\tbuffer.slice(check1 + 1, check2).filter(line => {\n\n\t\t\t\tif (line.startsWith('\\t\\t')) {\n\n\t\t\t\t\tlet tmp = line.substr(2);\n\t\t\t\t\tif (/^([A-Za-z0-9]+):\\sfunction/g.test(tmp)) {\n\t\t\t\t\t\treturn false;\n\t\t\t\t\t} else if (/^([A-Za-z0-9]+):\\s/g.test(tmp)) {\n\t\t\t\t\t\treturn true;\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\n\t\t\t\treturn false;\n\n\t\t\t}).forEach(chunk => {\n\n\t\t\t\tif (chunk.endsWith(',')) {\n\n\t\t\t\t\tchunk = chunk.substr(0, chunk.length - 1);\n\n\n\t\t\t\t\tlet tmp = chunk.split(':');\n\t\t\t\t\tif (tmp.length === 2) {\n\n\t\t\t\t\t\tlet name = tmp[0].trim();\n\t\t\t\t\t\tlet prop = _PARSER.detect(tmp[1].trim());\n\n\t\t\t\t\t\tif (\n\t\t\t\t\t\t\tproperties[name] === undefined\n\t\t\t\t\t\t\t|| (\n\t\t\t\t\t\t\t\tproperties[name].value.type === 'undefined'\n\t\t\t\t\t\t\t\t&& prop.type !== 'undefined'\n\t\t\t\t\t\t\t)\n\t\t\t\t\t\t) {\n\n\t\t\t\t\t\t\tproperties[name] = {\n\t\t\t\t\t\t\t\tchunk: chunk,\n\t\t\t\t\t\t\t\tvalue: prop\n\t\t\t\t\t\t\t};\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t} else if (chunk.endsWith('{')) {\n\n\t\t\t\t\tlet tmp = chunk.split(':');\n\t\t\t\t\tif (tmp.length === 2) {\n\n\t\t\t\t\t\tlet name = tmp[0].trim();\n\t\t\t\t\t\tlet body = _find_property(name, stream);\n\t\t\t\t\t\tlet prop = _PARSER.detect(body);\n\n\t\t\t\t\t\tif (\n\t\t\t\t\t\t\tproperties[name] === undefined\n\t\t\t\t\t\t\t|| (\n\t\t\t\t\t\t\t\tproperties[name].value.type === 'undefined'\n\t\t\t\t\t\t\t\t&& prop.type !== 'undefined'\n\t\t\t\t\t\t\t)\n\t\t\t\t\t\t) {\n\n\t\t\t\t\t\t\tproperties[name] = {\n\t\t\t\t\t\t\t\tchunk: body,\n\t\t\t\t\t\t\t\tvalue: prop\n\t\t\t\t\t\t\t};\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t});\n\n\t\t}\n\n\t};\n\n\n\n\t/*\n\t * IMPLEMENTATION\n\t */\n\n\tconst Module = {\n\n\t\t// deserialize: function(blob) {},\n\n\t\tserialize: function() {\n\n\t\t\treturn {\n\t\t\t\t'reference': 'strainer.api.Module',\n\t\t\t\t'arguments': []\n\t\t\t};\n\n\t\t},\n\n\t\tcheck: function(asset, header) {\n\n\t\t\tasset  = _validate_asset(asset) === true ? asset  : null;\n\t\t\theader = header instanceof Object        ? header : {};\n\n\n\t\t\tlet errors = [];\n\t\t\tlet memory = {};\n\t\t\tlet result = {\n\t\t\t\tconstructor: {},\n\t\t\t\tsettings:    {},\n\t\t\t\tproperties:  {},\n\t\t\t\tenums:       {},\n\t\t\t\tevents:      {},\n\t\t\t\tmethods:     {}\n\t\t\t};\n\n\t\t\tif (asset !== null) {\n\n\t\t\t\tlet stream = asset.buffer.toString('utf8');\n\n\t\t\t\t_parse_memory(memory, stream, errors);\n\t\t\t\t_parse_methods(result.methods, stream, errors);\n\t\t\t\t_parse_properties(result.properties, stream, errors);\n\n\n\t\t\t\tlet ref = _find_reference('\\n\\tconst Module = {', stream, true);\n\t\t\t\tif (ref.chunk === '') {\n\n\t\t\t\t\tref = _find_reference('Module =', stream, true);\n\n\t\t\t\t\terrors.push({\n\t\t\t\t\t\turl:       null,\n\t\t\t\t\t\trule:      'no-module',\n\t\t\t\t\t\treference: 'constructor',\n\t\t\t\t\t\tmessage:   'Module is not constant (missing \"const\" declaration).',\n\t\t\t\t\t\tline:      ref.line,\n\t\t\t\t\t\tcolumn:    ref.column\n\t\t\t\t\t});\n\n\t\t\t\t}\n\n\n\t\t\t\tfor (let name in memory) {\n\n\t\t\t\t\tlet entry = memory[name];\n\t\t\t\t\tif (entry.type === 'lychee.Definition') {\n\n\t\t\t\t\t\tlet id = entry.value.reference;\n\t\t\t\t\t\tif (header.requires.includes(id) === false) {\n\n\t\t\t\t\t\t\terrors.push({\n\t\t\t\t\t\t\t\turl:       null,\n\t\t\t\t\t\t\t\trule:      'no-requires',\n\t\t\t\t\t\t\t\treference: name,\n\t\t\t\t\t\t\t\tmessage:   'Invalid Definition (missing requires() entry for \"' + id + '\").',\n\t\t\t\t\t\t\t\tline:      0,\n\t\t\t\t\t\t\t\tcolumn:    0\n\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\n\t\t\t\tif (\n\t\t\t\t\tresult.methods['deserialize'] === undefined\n\t\t\t\t\t|| result.methods['serialize'] === undefined\n\t\t\t\t) {\n\n\t\t\t\t\tif (result.methods['deserialize'] === undefined) {\n\n\t\t\t\t\t\terrors.push({\n\t\t\t\t\t\t\turl:       null,\n\t\t\t\t\t\t\trule:      'no-deserialize',\n\t\t\t\t\t\t\treference: 'deserialize',\n\t\t\t\t\t\t\tmessage:   'No \"deserialize()\" method.',\n\t\t\t\t\t\t\tline:      ref.line,\n\t\t\t\t\t\t\tcolumn:    ref.column\n\t\t\t\t\t\t});\n\n\t\t\t\t\t}\n\n\t\t\t\t\tif (result.methods['serialize'] === undefined) {\n\n\t\t\t\t\t\terrors.push({\n\t\t\t\t\t\t\turl:       null,\n\t\t\t\t\t\t\trule:      'no-serialize',\n\t\t\t\t\t\t\treference: 'serialize',\n\t\t\t\t\t\t\tmessage:   'No \"serialize()\" method.',\n\t\t\t\t\t\t\tline:      ref.line,\n\t\t\t\t\t\t\tcolumn:    ref.column\n\t\t\t\t\t\t});\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\treturn {\n\t\t\t\terrors: errors,\n\t\t\t\tmemory: memory,\n\t\t\t\tresult: result\n\t\t\t};\n\n\t\t},\n\n\t\ttranscribe: function(asset) {\n\n\t\t\tasset = _validate_asset(asset) === true ? asset : null;\n\n\n\t\t\tif (asset !== null) {\n\n\t\t\t\tlet code = [];\n\n\n\t\t\t\tlet api = asset.buffer;\n\t\t\t\tif (api instanceof Object) {\n\n\t\t\t\t\tlet memory = api.memory || null;\n\t\t\t\t\tlet result = api.result || null;\n\n\n\t\t\t\t\tif (memory instanceof Object) {\n\n\t\t\t\t\t\tfor (let m in memory) {\n\n\t\t\t\t\t\t\tlet chunk = _TRANSCRIPTOR.transcribe(m, memory[m]);\n\t\t\t\t\t\t\tif (chunk !== null) {\n\t\t\t\t\t\t\t\tcode.push('\\t' + chunk);\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\n\t\t\t\t\tif (Object.keys(result.methods).length > 0) {\n\n\t\t\t\t\t\tlet chunk = _TRANSCRIPTOR.transcribe('Module', result.methods);\n\t\t\t\t\t\tif (chunk !== null) {\n\t\t\t\t\t\t\tcode.push('');\n\t\t\t\t\t\t\tcode.push('');\n\t\t\t\t\t\t\tcode.push('\\t' + chunk);\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\n\t\t\t\t\tcode.push('');\n\t\t\t\t\tcode.push('');\n\t\t\t\t\tcode.push('\\treturn Module;');\n\n\t\t\t\t}\n\n\n\t\t\t\tif (code.length > 0) {\n\t\t\t\t\treturn code.join('\\n');\n\t\t\t\t}\n\n\t\t\t}\n\n\n\t\t\treturn null;\n\n\t\t}\n\n\t};\n\n\n\treturn Module;\n\n}"}},"strainer.api.TRANSCRIPTOR":{"constructor":"lychee.Definition","arguments":[{"id":"strainer.api.TRANSCRIPTOR","url":"/libraries/strainer/source/api/TRANSCRIPTOR.js"}],"blob":{"attaches":{},"exports":"function (lychee, global, attachments) {\n\n\tconst _FEATURES  = lychee.FEATURES;\n\tconst _PLATFORMS = lychee.PLATFORMS;\n\n\n\n\t/*\n\t * HELPERS\n\t */\n\n\n\n\t/*\n\t * IMPLEMENTATION\n\t */\n\n\tconst Module = {\n\n\t\t/*\n\t\t * ENTITY API\n\t\t */\n\n\t\t// deserialize: function(blob) {},\n\n\t\tserialize: function() {\n\n\t\t\treturn {\n\t\t\t\t'reference': 'strainer.api.TRANSCRIPTOR',\n\t\t\t\t'blob':      null\n\t\t\t};\n\n\t\t},\n\n\n\n\t\t/*\n\t\t * CUSTOM API\n\t\t */\n\n\t\ttranscribe: function(name, value, assign) {\n\n\t\t\tname   = typeof name === 'string' ? name  : null;\n\t\t\tvalue  = value instanceof Object  ? value : null;\n\t\t\tassign = assign === true;\n\n\n\t\t\tif (name !== null && value !== null) {\n\n\t\t\t\tlet code = [];\n\t\t\t\tlet type = value.type || '';\n\n\t\t\t\tif (type === 'function') {\n\t\t\t\t\tcode.push((assign === false ? 'const ' : '') + name + ' = ' + value.chunk + ';');\n\t\t\t\t} else if (type === 'lychee.Definition') {\n\t\t\t\t\tcode.push((assign === false ? 'const ' : '') + name + ' = lychee.import(\\'' + value.value.reference + '\\');');\n\t\t\t\t} else if (type === 'lychee.Namespace') {\n\t\t\t\t\tcode.push((assign === false ? 'const ' : '') + name + ' = lychee.import(\\'' + value.value.reference + '\\');');\n\t\t\t\t} else if (/^(null|undefined)$/g.test(type)) {\n\t\t\t\t\tcode.push((assign === false ? 'let ' : '') + name + ' = ' + value.chunk + ';');\n\t\t\t\t} else if (/^(Array|Number|String)$/g.test(type)) {\n\t\t\t\t\tcode.push((assign === false ? 'const ' : '') + name + ' = ' + value.chunk + ';');\n\t\t\t\t} else if (/^(Buffer|Config|Font|Music|Sound|Texture)$/g.test(type)) {\n\t\t\t\t\tcode.push((assign === false ? 'const ' : '') + name + ' = ' + value.chunk + ';');\n\t\t\t\t} else if (type === 'RegExp') {\n\t\t\t\t\tcode.push((assign === false ? 'const ' : '') + name + ' = ' + value.chunk + ';');\n\t\t\t\t} else if (type === 'Object') {\n\t\t\t\t\tcode.push((assign === false ? 'const ' : '') + name + ' = ' + value.chunk + ';');\n\t\t\t\t} else if (type.startsWith('_')) {\n\t\t\t\t\tcode.push((assign === false ? 'const ' : '') + name + ' = ' + value.chunk + ';');\n\t\t\t\t} else if (value instanceof Object) {\n\n\t\t\t\t\tcode.push((assign === false ? 'const ' : '') + name + ' = ' + '{');\n\t\t\t\t\tcode.push('');\n\n\n\t\t\t\t\tfor (let v in value) {\n\n\t\t\t\t\t\tlet entry = value[v];\n\t\t\t\t\t\tif (entry.type === 'function') {\n\t\t\t\t\t\t\tcode.push('\\t\\t' + v + ': ' + entry.chunk + ',');\n\t\t\t\t\t\t} else if (entry.type === 'lychee.Definition') {\n\t\t\t\t\t\t\tcode.push('\\t\\t' + v + ': ' + entry.value.reference + ',');\n\t\t\t\t\t\t} else if (entry.type === 'lychee.Namespace') {\n\t\t\t\t\t\t\tcode.push('\\t\\t' + v + ': ' + entry.value.reference + ',');\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tcode.push('');\n\n\t\t\t\t\t}\n\n\n\t\t\t\t\tlet last = code[code.length - 2];\n\t\t\t\t\tif (last.endsWith(',')) {\n\t\t\t\t\t\tcode[code.length - 2] = last.substr(0, last.length - 1);\n\t\t\t\t\t}\n\n\t\t\t\t\tcode.push('\\t};');\n\n\t\t\t\t}\n\n\n\t\t\t\treturn code.join('\\n');\n\n\t\t\t} else {\n\t\t\t\t// TODO: No name support (generating function bodies?)\n\t\t\t}\n\n\n\t\t\treturn null;\n\n\t\t}\n\n\t};\n\n\n\treturn Module;\n\n}"}}},"features":{"process":{"stdin":{"on":"function"},"stdout":{"write":"function","on":"function"},"env":{}},"require":"function","setInterval":"function"}}});
	if (environment !== null) {
		environment.init();
	}

	lychee.ENVIRONMENTS['/libraries/strainer/dist'] = environment;

})(lychee, typeof global !== 'undefined' ? global : this);



lychee.inject(lychee.ENVIRONMENTS["/libraries/strainer/dist"]);



