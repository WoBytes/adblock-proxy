
# lychee.js Library (2017-Q3)

brought to you as libre software with joy and pride by [Artificial Engineering](http://artificial.engineering).

Support our libre Bot Cloud via BTC [1CamMuvrFU1QAMebPoDsL3JrioVDoxezY2](bitcoin:1CamMuvrFU1QAMebPoDsL3JrioVDoxezY2?amount=0.5&label=lychee.js%20Support).



## Overview

This is the lychee.js Isomorphic Library that can be used standalone in your existing projects.

The upstream project [lychee.js](https://github.com/Artificial-Engineering/lycheeJS.git)
is the `Isomorphic Engine`, this project is the `Isomorphic Library` which lacks
essential features such as the `lycheejs-*` tools, integration with our Software
Bots and the Artificial Intelligence.

This downstream project can be seen as a quick prototyping library for several
platforms - quick n' dirty style.



## NPM Usage

Install the lychee.js Library with the `lycheejs` package.

```bash
# node, node-sdl
npm install lycheejs;
```

Use the lychee.js Definitions with the `lychee.import(identifier)` method.
This method guarantees isomorphic behaviour across all platforms.

```javascript
const lychee = require('lycheejs')(__dirname);

lychee.environment.init(function(sandbox) {

	let Renderer = lychee.import('lychee.Renderer');
	let renderer = new Renderer({
		width: 1024,
		height: 768
	}); 

});
```
 


## Bower Usage

Install the lychee.js Library with the `lycheejs` package.

```bash
# html, html-nwjs, html-webview
bower install lycheejs;
```

Use the lychee.js Definitions with the `lychee.import(identifier)` method.
This method guarantees isomorphic behaviour across all platforms.

```html
<script src="./bower_components/lycheejs/build/html/lychee.js"></script>
```

```javascript
let lychee = (window || global).lychee;

lychee.environment.init(function(sandbox) {

	let Renderer = lychee.import('lychee.Renderer');
	let renderer = new Renderer({
		width: 1024,
		height: 768
	});

});
```



## License

The lychee.js Engine (defined as [lycheejs](https://github.com/Artificial-Engineering/lycheejs.git)
repository) is (c) 2012-2016 Artificial-Engineering and released under
[MIT / Expat](./LICENSE_MIT.txt) license.

The generated code by our Artificial Intelligence (namely the GitHub Account
[@humansneednotapply](https://github.com/humansneednotapply) or the commit's
e-mail address `robot [ insert an at here] artificial.engineering`) is released
under [GNU GPL 3](./LICENSE_GPL3.txt) license.

The date of each commit is equivalent to the date (Central European Timezone)
of claimed copyright and license, no matter from which timezone or physical
location they were commited from.

The generated code by the Artificial Intelligence overrules the MIT / Expat
license in every case, with no exceptions. The code is distributed in a libre
way to guarantee free and open knowledge distribution for our Software Bots.

