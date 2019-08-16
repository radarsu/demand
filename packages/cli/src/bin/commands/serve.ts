import * as childProcess from 'child_process';
import * as demand from '../../../../core';
import * as fs from 'fs';
import * as http2 from 'http2';
import * as mime from 'mime-types';
import * as path from 'path';

import build from './build';
import watch from './watch';

import { dir, log } from './shared';

// helpers

// command
const serve = async () => {
    log(`Serving...`);

    // extract http statuses
    const {
        HTTP_STATUS_INTERNAL_SERVER_ERROR,
        HTTP_STATUS_NOT_FOUND,
        HTTP_STATUS_OK,
        HTTP2_HEADER_METHOD,
        HTTP2_HEADER_PATH,
    } = http2.constants;

    // get user config
    const config: demand.Config = (await import(`${dir}/demand.config.ts`)).default;

    // load certificates from path
    const [key, cert] = await Promise.all([
        fs.promises.readFile(config.devServer.https.key as string, 'utf-8'),
        fs.promises.readFile(config.devServer.https.cert as string, 'utf-8'),
    ]);

    // create server with config
    config.devServer.https.key = key;
    config.devServer.https.cert = cert;
    const server = http2.createSecureServer(config.devServer.https);

    // handle static requests
    const serverRoot = `./dist`;

    // handle errors
    const onError = (err: NodeJS.ErrnoException, res: http2.Http2ServerResponse) => {

        if (err.code === 'ENOENT') {
            res.writeHead(HTTP_STATUS_NOT_FOUND);
        } else {
            res.writeHead(HTTP_STATUS_INTERNAL_SERVER_ERROR);
        }

        res.end();
    };

    const mimeMap: { [mimeLookup: string]: string } = {
        'image/vnd.microsoft.icon': 'image/x-icon',
    };

    // handle static requests
    const onHmr = (req: http2.Http2ServerRequest, res: http2.Http2ServerResponse) => {
        req.socket.setKeepAlive(true);
        req.socket.setTimeout(30000000);
        res.writeHead(HTTP_STATUS_OK, {
            'cache-control': 'no-cache',
            'content-type': 'text/event-stream',
        });

        const interval = setInterval(() => {
            if (!res.stream.writable) {
                console.log(`Not-writable.`);
                clearInterval(interval);
                return;
            }

            console.log(`Emitting...`);
            res.write('test');
        }, 1000);
    };

<<<<<<< HEAD:packages/demand-cli/src/bin/commands/serve.ts
    server.on('request', (req, res) => {

        let reqUrl = req.url;
        log(reqUrl);
        if (reqUrl === '/hmr') {
            return onHmr(req, res);
        }

        if (reqUrl === '/') {
            reqUrl = '/index.html';
        }

        const fullPath = path.join(serverRoot, reqUrl);
        const responseMimeType = mime.lookup(fullPath) as string;

        res.stream.respondWithFile(fullPath, {
            'content-type': responseMimeType,
        }, {
            onError: (err) => onError(err, res),
=======
        if (reqPath === '/') {
            reqPath = '/index.html';
        } else if (reqPath === '/favicon.ico') {
            reqPath = '/assets/favicon.ico';
        }

        const fullPath = path.join(serverRoot, reqPath);
        const mimeLookupResult = mime.lookup(fullPath) as string;
        const responseMimeType = mimeMap[mimeLookupResult] || mimeLookupResult;
        stream.respondWithFile(fullPath, {
            'content-type': responseMimeType,
        }, {
            onError: (err) => onError(err, stream),
>>>>>>> 5eb87133bcff5d83641e6134e30bb6c74875da15:packages/cli/src/bin/commands/serve.ts
        });

    });

    // build project
    await build();

    // listen
    server.listen(config.devServer.port, config.devServer.host);

    log(`Serving successful! Check out https://${config.devServer.host}:${config.devServer.port}/`);

    // watch files
    await watch();
};

export default serve;