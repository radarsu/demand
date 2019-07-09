# @demand

Lighweight and blazingly fast framework that uses latest browser features with an aproach "use the platform" to provide you the greatest setup. No magic included.

## Conventions

1. Convention over configuration - we make certain assumtions. If establishing a simple convention can produce less and cleaner code - we go for it.

2. Lightweight - we use **lit-html** and continue it's thought, that adding any line of code should be considered twice. We don't do fancy stuff.

3. Minimum dependencies - everything that can be done relatively easy using native NodeJS & JavaScript should be done this way. Every external dependency reduces security. We avoid that.

4. No bundling - bundling is obsolete with HTTP/2. We use ES6 modules instead.

5. No magic - we avoid hidden actions, using getter's and setter's, doing some magic stuff and side-effects that you might be unaware of.

6. On-demand-loading - unlike **webpack** and other bundlers, we load everything into browser on-demand. Every script is an independent module.

7. Only-best-setup - you don't need https or would like to use http1? Sorry, we support only http2 & https setup, because we think is the best. Same goes for old browsers. We prefer to force users to update stuff!

8. Performance - we are focused on performance in every aspect. Fastest building, fastest rendering, fastest compilation, fastest initial page load speed and fastest hot module replacement.
