import * as http2 from 'http2';
import * as fs from 'fs';
import * as path from 'path';
import * as mime from 'mime-types';
import * as demand from '../../../../demand-core';
import build from './build';

import { dir } from './shared';

// command
const serve = async () => {
    console.log(`Serving...`);

    // extract http statuses
    const {
        HTTP2_HEADER_PATH,
        HTTP2_HEADER_METHOD,
        HTTP_STATUS_NOT_FOUND,
        HTTP_STATUS_INTERNAL_SERVER_ERROR
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
    const onError = (err: NodeJS.ErrnoException, stream: http2.ServerHttp2Stream) => {

        if (err.code === 'ENOENT') {
            stream.respond({ ':status': HTTP_STATUS_NOT_FOUND });
        } else {
            stream.respond({ ':status': HTTP_STATUS_INTERNAL_SERVER_ERROR });
        }

        stream.end();
    };

    // handle static requests
    server.on('stream', (stream, headers) => {
        let reqPath = headers[HTTP2_HEADER_PATH] as string;
        const reqMethod = headers[HTTP2_HEADER_METHOD];

        if (reqPath === '/') {
            reqPath = '/index.html';
        }

        const fullPath = path.join(serverRoot, reqPath);
        const responseMimeType = mime.lookup(fullPath) as string;

        stream.respondWithFile(fullPath, {
            'content-type': responseMimeType,
        }, {
            onError: (err) => onError(err, stream),
        });

    });

    // build project
    await build();

    // listen
    server.listen(config.devServer.port, config.devServer.host);

    console.log(`Serving successful! Check out https://${config.devServer.host}:${config.devServer.port}/`);
};

export default serve;