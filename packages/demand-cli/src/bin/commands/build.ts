import * as fs from 'fs';
import * as gulp from 'gulp';
import * as _ from 'lodash';
import * as path from 'path';
import * as sass from 'gulp-sass';
import * as tap from 'gulp-tap';

import { DEMAND_INJECT_COMMENT, dir, dist, execPromise, log, src } from './shared';

// command
const replaceDemandInjectComment = (): Promise<void> => {
    return new Promise((resolve) => {

        // prepare daemand-inject template
        const injectPath = path.resolve(__dirname, `../templates/demand-inject.ts.ejs`);
        const injectTemplateString = fs.readFileSync(injectPath, 'utf-8');
        const injectTemplate = _.template(injectTemplateString);

        gulp.src([`${dist}/*.js`, `${dist}/**/*.js`]).pipe(tap(async (file: any) => {

            // get file name
            const fileName = file.basename.slice(0, -3);

            // get file content
            const fileContents: string = file.contents.toString();

            console.log(fileContents);

            if (!fileContents.includes(DEMAND_INJECT_COMMENT)) {
                return;
            }

            const htmlPath = `${file.path.slice(0, -3)}.html`;
            const cssPath = `./${fileName}.css`;
            const html = await fs.promises.readFile(htmlPath, 'utf-8');
            const replacement = injectTemplate({
                cssPath,
                html,
            });

            // replace content with html from relevant file
            await fs.promises.writeFile(file.path, fileContents.replace(DEMAND_INJECT_COMMENT, `${DEMAND_INJECT_COMMENT}\n${replacement}`));

        }));

        resolve();

    });
};

const runBuild = async () => {
    log(`Building...`);

    // remove dist directory
    await execPromise(`rm -rf '${dir}/dist'`);

    // compile typescript
    await execPromise(`tsc -p '${dir}/tsconfig.json'`);

    // copy assets
    gulp.src(`./src/assets/*`).pipe(gulp.dest(`./dist/assets`));

    // copy html
    gulp.src(`./src/**/*.html`).pipe(gulp.dest(`./dist`));
    gulp.src(`./src/app/**/*.html`).pipe(gulp.dest(`./dist/app`));

    // copy scss
    gulp.src(`./src/app/**/*.scss`)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(`./dist/app`));

    // replace DEMAND_INJECT_COMMENT with html and css
    await replaceDemandInjectComment();

    // run pika to resolve modules and move web_modules to dist
    const pikaBin = `./node_modules/@pika/web/dist-node/index.bin.js`;
    await execPromise(`node ${pikaBin} --input '${dir}' --dest ./dist/web_modules`);

    // compile js with babel to fix web_modules imports
    await execPromise(`babel dist -d dist --ignore 'dist/web_modules/*.js'`);

    // create symlink to node_modules: TODO: change to copying
    gulp.src(`./node_modules`).pipe(gulp.symlink(`./dist`));

    log(`Build successful!`);
};

const build = async () => {
    return runBuild().catch((err: any) => {
        console.error(`\n[demand]`, err.output ? err.output.toString() : err);
    });
};

export default build;