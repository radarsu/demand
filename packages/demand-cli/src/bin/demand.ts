#!/usr/bin/env ts-node

import * as _ from 'lodash';
import * as yargs from 'yargs';
import 'typescript-require';

import * as packageJson from '../../package.json';
import init from './commands/init';
import serve from './commands/serve';
import build from './commands/build';

const emptyBuilder = (() => { }) as any;

// init
yargs.command('init', 'Initializes repository with a standard demand setup.', emptyBuilder, init);

// serve
yargs.command('serve', 'Serves development.', emptyBuilder, serve);

// build
yargs.command('build', 'Builds the project.', emptyBuilder, build);

// setup
yargs.version(packageJson.version);
yargs.strict();
yargs.help();

const argv = yargs.argv;