"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const childProcess = require("child_process");
const path = require("path");
const yargs = require("yargs");
exports.DEMAND_INJECT_COMMENT = `extends lit.LitElement {`;
exports.dir = yargs.argv.path ? path.resolve(__dirname, yargs.argv.path) : process.cwd();
exports.src = `${exports.dir}/src`;
exports.dist = `${exports.dir}/dist`;
exports.dirName = process.cwd().split('/').pop();
exports.log = (...args) => {
    console.log(`\n[@demand/cli]`, ...args);
};
exports.execPromise = (command) => {
    return new Promise((resolve, reject) => {
        console.log(`[started] ${command}`);
        childProcess.exec(command, (error, stdout, stderr) => {
            if (error) {
                return reject([error, stdout, stderr]);
            }
            if (stdout) {
                console.log(stdout);
            }
            console.log(`[finished] ${command}`);
            return resolve([stdout, stderr]);
        });
    });
};
//# sourceMappingURL=shared.js.map