#!/usr/bin/env ts-node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = require("yargs");
require("typescript-require");
const packageJson = require("../../package.json");
const init_1 = require("./commands/init");
const serve_1 = require("./commands/serve");
const build_1 = require("./commands/build");
const emptyBuilder = (() => { });
yargs.command('init', 'Initializes repository with a standard demand setup.', emptyBuilder, init_1.default);
yargs.command('serve', 'Serves development.', emptyBuilder, serve_1.default);
yargs.command('build', 'Builds the project.', emptyBuilder, build_1.default);
yargs.version(packageJson.version);
yargs.strict();
yargs.help();
const argv = yargs.argv;
//# sourceMappingURL=demand.js.map