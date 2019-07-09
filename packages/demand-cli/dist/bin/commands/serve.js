"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const childProcess = require("child_process");
const fs = require("fs");
const gulp = require("gulp");
const http2 = require("http2");
const mime = require("mime-types");
const path = require("path");
const tap = require("gulp-tap");
const build_1 = require("./build");
const shared_1 = require("./shared");
const watch = async () => {
    console.log(`Watching...`);
    gulp.src([`${shared_1.src}/*.*`, `${shared_1.src}/**/*.*`]).pipe(tap((file, through) => {
        fs.watchFile(file.path, () => {
            const ext = file.path.match(/\.\w+$/)[0];
            childProcess.exec('tsc -p ./tsconfig.json', () => {
                console.log(`Updated`, file.basename);
            });
        });
    }));
};
const serve = async () => {
    console.log(`Serving...`);
    const { HTTP2_HEADER_PATH, HTTP2_HEADER_METHOD, HTTP_STATUS_NOT_FOUND, HTTP_STATUS_INTERNAL_SERVER_ERROR } = http2.constants;
    const config = (await Promise.resolve().then(() => require(`${shared_1.dir}/demand.config.ts`))).default;
    const [key, cert] = await Promise.all([
        fs.promises.readFile(config.devServer.https.key, 'utf-8'),
        fs.promises.readFile(config.devServer.https.cert, 'utf-8'),
    ]);
    config.devServer.https.key = key;
    config.devServer.https.cert = cert;
    const server = http2.createSecureServer(config.devServer.https);
    const serverRoot = `./dist`;
    const onError = (err, stream) => {
        if (err.code === 'ENOENT') {
            stream.respond({ ':status': HTTP_STATUS_NOT_FOUND });
        }
        else {
            stream.respond({ ':status': HTTP_STATUS_INTERNAL_SERVER_ERROR });
        }
        stream.end();
    };
    server.on('stream', (stream, headers) => {
        let reqPath = headers[HTTP2_HEADER_PATH];
        const reqMethod = headers[HTTP2_HEADER_METHOD];
        if (reqPath === '/') {
            reqPath = '/index.html';
        }
        const fullPath = path.join(serverRoot, reqPath);
        const responseMimeType = mime.lookup(fullPath);
        stream.respondWithFile(fullPath, {
            'content-type': responseMimeType,
        }, {
            onError: (err) => onError(err, stream),
        });
    });
    await build_1.default();
    server.listen(config.devServer.port, config.devServer.host);
    console.log(`Serving successful! Check out https://${config.devServer.host}:${config.devServer.port}/`);
    await watch();
};
exports.default = serve;
//# sourceMappingURL=serve.js.map