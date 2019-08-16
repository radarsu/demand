#!/usr/bin/env ts-node

import * as _ from 'lodash';
import * as yargs from 'yargs';

const startedByTsNode = process.env._.match(/ts-node$/);
if (!startedByTsNode) {
    require('typescript-require');
}

import * as packageJson from '../../package.json';
import init from './commands/init';
import serve from './commands/serve';
import build from './commands/build';

const emptyBuilder = (() => { }) as any;

// init
yargs.command('init', `Initializes repository with a standard demand setup.`, emptyBuilder, (argv) => init(argv))
    .option('path', {
        alias: 'p',
    });

// serve
yargs.command('serve', `Serves development.`, emptyBuilder, () => serve())
    .option('path', {
        alias: 'p',
    });

// build
yargs.command('build', `Builds the project.`, emptyBuilder, () => build())
    .option('path', {
        alias: 'p',
    });

// setup
yargs.version(packageJson.version);
yargs.help();
yargs.strict();

const argv = yargs.argv;