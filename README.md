<p align="center">
    <a href="https://github.com/radarsu/radarsu/" target="blank"><img src="https://github.com/radarsu/demand/blob/master/assets/logo.png?raw=true" alt="demand logo" /></a><br/>
    <strong>Simplicity is the ultimate sophistication.</strong>
</p>

<p align="center">
	<a href="https://www.npmjs.com/package/radarsu" target="_blank" alt="npm radarsu"><img src="https://img.shields.io/npm/v/radarsu.svg" alt="npm" /></a>
	<img src="https://img.shields.io/github/license/radarsu/radarsu.svg" alt="license" />
	<img src="https://img.shields.io/github/stars/radarsu/radarsu.svg" alt="stars" />
	<a href="https://twitter.com/radarsujs" target="_blank" alt="radarsujs twitter"><img src="https://img.shields.io/twitter/url/https/github.com/radarsu/radarsu.svg?style=social" alt="social twitter" /></a>
</p>

<p align="center">
    <strong>Lighweight and blazingly fast</strong> framework using <strong>latest browser features</strong> with <strong>use the platform</strong> approach to provide you the greatest setup. <strong>No magic</strong> included.
</p>

## What problem do we solve?

**Webpack**: CommonJS module resolution **adds tons of code to every js file**. It bundles stuff, which nowadays **is bad for http2 and cache'ing resources**.

**Angular** is **huge, initial page load is slow**. We decided to load all the JavaScript, html and css in the ES6 module dynamically, so **initial website loading takes absolutely no time** and all **component-based resources are added during runtime on-demand**.

**Vue and React** are close to what we are, but **they do hell-a-lot of magic**. Virtual DOM, Webpack, getters and setters. We replace that with simple and neat **lit-html**.

**Lit-Element, StencilJS** and all the WebComponents libraries that are closest to our solution - **they force us to use css and html inside js** and also use getters and setters.

## Features

1. **Convention over configuration** - we make certain assumtions. If establishing a simple convention can produce less and cleaner code - we go for it.

2. **Lightweight** - we use **lit-html** and continue it's thought, that adding any line of code should be considered twice. We don't do fancy stuff.

3. **Minimum dependencies** - everything that can be done relatively easy using native NodeJS & JavaScript should be done this way. Every external dependency reduces security. We avoid that.

4. **No bundling** - bundling is obsolete with HTTP/2. We use ES6 modules instead.

5. **No magic** - we avoid hidden actions, using getter's and setter's, doing some magic stuff and side-effects that you might be unaware of.

6. **On-demand-loading** - unlike **webpack** and other bundlers, we load everything into browser on-demand. Every script is an independent module.

7. **Only-best-setup** - you don't need https or would like to use http1? Sorry, we support only http2 & https setup, because we think is the best. Same goes for old browsers. We prefer to force users to update stuff!

8. **Performance** - we are focused on performance in every aspect. Fastest building, fastest rendering, fastest compilation, fastest initial page load speed and fastest hot module replacement.
