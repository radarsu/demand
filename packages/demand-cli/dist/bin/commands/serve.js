"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const http2 = require("http2");
const mime = require("mime-types");
const path = require("path");
const build_1 = require("./build");
const watch_1 = require("./watch");
const shared_1 = require("./shared");
const serve = async () => {
    shared_1.log(`Serving...`);
    const { HTTP_STATUS_INTERNAL_SERVER_ERROR, HTTP_STATUS_NOT_FOUND, HTTP_STATUS_OK, HTTP2_HEADER_METHOD, HTTP2_HEADER_PATH, } = http2.constants;
    const config = (await Promise.resolve().then(() => require(`${shared_1.dir}/demand.config.ts`))).default;
    const [key, cert] = await Promise.all([
        fs.promises.readFile(config.devServer.https.key, 'utf-8'),
        fs.promises.readFile(config.devServer.https.cert, 'utf-8'),
    ]);
    config.devServer.https.key = key;
    config.devServer.https.cert = cert;
    const server = http2.createSecureServer(config.devServer.https);
    const serverRoot = `./dist`;
    const onError = (err, res) => {
        if (err.code === 'ENOENT') {
            res.writeHead(HTTP_STATUS_NOT_FOUND);
        }
        else {
            res.writeHead(HTTP_STATUS_INTERNAL_SERVER_ERROR);
        }
        res.end();
    };
    const onHmr = (req, res) => {
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
    server.on('stream', (stream, headers) => {
        if (headers[':path'] === '/hmr') {
            stream.push(`LOL1`, 'utf-8');
            stream.write(`LOL2`, 'utf-8');
        }
    });
    server.on('request', (req, res) => {
        let reqUrl = req.url;
        shared_1.log(reqUrl);
        if (reqUrl === '/hmr') {
            return;
        }
        if (reqUrl === '/') {
            reqUrl = '/index.html';
        }
        const fullPath = path.join(serverRoot, reqUrl);
        const responseMimeType = mime.lookup(fullPath);
        res.stream.respondWithFile(fullPath, {
            'content-type': responseMimeType,
        }, {
            onError: (err) => onError(err, res),
        });
    });
    await build_1.default();
    server.listen(config.devServer.port, config.devServer.host);
    shared_1.log(`Serving successful! Check out https://${config.devServer.host}:${config.devServer.port}/`);
    await watch_1.default();
};
exports.default = serve;
//# sourceMappingURL=serve.js.map