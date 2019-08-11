// import * as demand from '../demand-core';
"use strict";
var config = {
    devServer: {
        host: "localhost.radrat.pl",
        port: 8500,
        https: {
            key: "/mnt/c/Users/rkroh/.ssh/radrat.pl/privkey.pem",
            cert: "/mnt/c/Users/rkroh/.ssh/radrat.pl/cert.pem",
        },
    },
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = config;
