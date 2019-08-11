const {
    FuseBox,
    WebIndexPlugin,
} = require('fuse-box');

const _ = require('lodash');
const fs = require('fs');

const templateHtml = fs.readFileSync(`./src/bootstrap/index-fuse.html`);
const preload = fs.readFileSync(`./src/app/main/main.template.html`);
const meta = fs.readFileSync(`./src/bootstrap/meta.html`);
const template = _.template(templateHtml);
const templateString = template({
    meta,
    title: `Shard`,
    preload,
});

const fuse = FuseBox.init({
    homeDir: 'src',
    target: 'browser@es6',
    output: 'dist/$name.js',
    plugins: [WebIndexPlugin({
        path: `src`,
        templateString,
    })],
});

// launch http server
fuse.dev();
fuse.bundle('app')
    .instructions(' > index.ts')
    .hmr()
    .watch();

fuse.run();