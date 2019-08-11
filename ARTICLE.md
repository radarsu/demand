Nowadays there are tons of new stuff coming to the web in both frontend and backend stacks.

On the backend it's gRPC, HTTP/2, increasing popularity of Microservices, Server-Side Rendering JS-driven applications, GraphQL and Graph Databases (and PHP is slowly dieing).

On the frontend there are AMP, ES next generations, JSM (JavaScript Modules), PWA, TypeScript everywhere and many more.

For last months I've been slowly diving into many of those technologies and realised that there are plenty of frameworks that solve one of the problems, but none of them combines solutions for plenty of those. This way you are forced to pick many tradeoffs like:
  - Angular = great platform with unified design methodology at a cost of quite big JS, poor initial page load time and huge configuration.
  - React and Vue = you have to use webpack, babel and many other stuff.
  - Svelte = reduced bundle size at a cost of additional build step.

While investigating everything that was offered by new frameworks I found very cool to have:
  - Great performance.
  - Modularity.
  - Reasonably small bundle.
  - Short initial load time.
  - Using ESM instead of webpack and other bundling tools.

That brought me to try a combination of lit-element with @pika/web.