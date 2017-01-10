
(function(global, doc) {

	const _ELEMENTS = {};
	const _SETTINGS = {
		css: false,
		js:  false,
		img: false,
		vid: false
	};

	Array.from(doc.querySelectorAll('adblock-wrapper input')).forEach(element => {

		let id = element.getAttribute('id');
		if (id !== null) {

			let key = id.split('-').pop();

			_ELEMENTS[key] = element;

			let type = element.getAttribute('type');
			if (type === 'checkbox') {

				element.onchange = function() {
					_SETTINGS[key] = this.checked;
					_write_settings();
				};

			}

		}

	});

	const _read_settings = function() {

		return new Promise(function(resolve, reject) {

			fetch('/adblock/api/settings').then(response => {
				return response.json();
			}).then(function(settings) {

				if (settings instanceof Object) {
					Object.assign(_SETTINGS, settings);
				}

				resolve(_SETTINGS);

			}).catch(function(err) {

				resolve(_SETTINGS);

			});

		});

	};

	const _write_settings = function() {

		return new Promise(function(resolve, reject) {

			let request = new Request('/adblock/api/settings', {
				method: 'POST',
				body:   JSON.stringify(_SETTINGS)
			});

			fetch(request).then(response => {
				return response.json();
			}).then(function(response) {

				resolve(_SETTINGS);

			}).catch(function(err) {

				resolve(_SETTINGS);

			});

		});

	};

	doc.querySelector('#adblock-reload').addEventListener('click', event => {

		_write_settings().then(_ => {
			global.location.href = global.location.href;
		});

	});

	_read_settings().then(settings => {

		for (let key in settings) {

			let element = _ELEMENTS[key] || null;
			if (element !== null) {

				if ('checked' in element) {
					element.checked = !!settings[key];
				} else if ('value' in element) {
					element.value = settings[key];
				}

			}

		}

	});

})(typeof window !== 'undefined' ? window : this, window.document);

