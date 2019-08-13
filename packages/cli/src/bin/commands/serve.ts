import * as childProcess from 'child_process';
import * as demand from '../../../../core';
import * as fs from 'fs';
import * as gulp from 'gulp';
import * as http2 from 'http2';
import * as mime from 'mime-types';
import * as path from 'path';
import * as tap from 'gulp-tap';

import build from './build';
import { dir, src } from './shared';

// helpers
const watch = async () => {
    console.log(`Watching...`);

    // watch directory for new files
    gulp.src([`${src}/*.*`, `${src}/**/*.*`]).pipe(tap((file, through) => {

        fs.watchFile(file.path, () => {

            const ext = file.path.match(/\.\w+$/)[0];
            childProcess.exec('tsc -p ./tsconfig.json', () => {
                console.log(`Updated`, file.basename);
            });
            // switch (ext) {
            //     case '.scss':
            //         break;
            //     case '.ts':
            //         break;
            //     default:

            //         break;
            // }
        });

        // let fileContent = file.contents.toString();

    }));

    // watch existing files for changes
    // gulp.watch([`${dir}/*`, `${dir}/**/*`], (source: any) => {
    //     console.log(source.path);
    //     return gulp.src(source.path).pipe(tap((file) => {
    //         console.log(`file changed`, file.basename);
    //     }));
    // });
};

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

    const mimeMap: { [mimeLookup: string]: string } = {
        'image/vnd.microsoft.icon': 'image/x-icon',
    };

    // handle static requests
    server.on('stream', (stream, headers) => {
        let reqPath = headers[HTTP2_HEADER_PATH] as string;
        const reqMethod = headers[HTTP2_HEADER_METHOD];

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
        });

    });

    // build project
    await build();

    // listen
    server.listen(config.devServer.port, config.devServer.host);

    console.log(`Serving successful! Check out https://${config.devServer.host}:${config.devServer.port}/`);

    // watch files
    await watch();
};

export default serve;