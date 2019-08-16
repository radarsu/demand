import * as childProcess from 'child_process';
import * as path from 'path';
import * as yargs from 'yargs';

export const DEMAND_INJECT_COMMENT = `extends lit.LitElement {`;
export const dir = yargs.argv.path ? path.resolve(__dirname, yargs.argv.path as string) : process.cwd();
export const src = `${dir}/src`;
export const dist = `${dir}/dist`;
export const dirName = process.cwd().split('/').pop();

export const log = (...args: any[]) => {
    console.log(`\n[@demand/cli]`, ...args);
};

export const execPromise = (command: string) => {
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