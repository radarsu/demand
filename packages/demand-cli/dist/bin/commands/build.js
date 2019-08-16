"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const gulp = require("gulp");
const _ = require("lodash");
const path = require("path");
const sass = require("gulp-sass");
const tap = require("gulp-tap");
const shared_1 = require("./shared");
const replaceDemandInjectComment = () => {
    return new Promise((resolve) => {
        const injectPath = path.resolve(__dirname, `../templates/demand-inject.ts.ejs`);
        const injectTemplateString = fs.readFileSync(injectPath, 'utf-8');
        const injectTemplate = _.template(injectTemplateString);
        gulp.src([`${shared_1.dist}/*.js`, `${shared_1.dist}/**/*.js`]).pipe(tap(async (file) => {
            const fileName = file.basename.slice(0, -3);
            const fileContents = file.contents.toString();
            console.log(fileContents);
            if (!fileContents.includes(shared_1.DEMAND_INJECT_COMMENT)) {
                return;
            }
            const htmlPath = `${file.path.slice(0, -3)}.html`;
            const cssPath = `./${fileName}.css`;
            const html = await fs.promises.readFile(htmlPath, 'utf-8');
            const replacement = injectTemplate({
                cssPath,
                html,
            });
            await fs.promises.writeFile(file.path, fileContents.replace(shared_1.DEMAND_INJECT_COMMENT, `${shared_1.DEMAND_INJECT_COMMENT}\n${replacement}`));
        }));
        resolve();
    });
};
const runBuild = async () => {
    shared_1.log(`Building...`);
    await shared_1.execPromise(`rm -rf '${shared_1.dir}/dist'`);
    await shared_1.execPromise(`tsc -p '${shared_1.dir}/tsconfig.json'`);
    gulp.src(`./src/assets/*`).pipe(gulp.dest(`./dist/assets`));
    gulp.src(`./src/**/*.html`).pipe(gulp.dest(`./dist`));
    gulp.src(`./src/app/**/*.html`).pipe(gulp.dest(`./dist/app`));
    gulp.src(`./src/app/**/*.scss`)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(`./dist/app`));
    await replaceDemandInjectComment();
    const pikaBin = `./node_modules/@pika/web/dist-node/index.bin.js`;
    await shared_1.execPromise(`node ${pikaBin} --input '${shared_1.dir}' --dest ./dist/web_modules`);
    await shared_1.execPromise(`babel dist -d dist --ignore 'dist/web_modules/*.js'`);
    gulp.src(`./node_modules`).pipe(gulp.symlink(`./dist`));
    shared_1.log(`Build successful!`);
};
const build = async () => {
    return runBuild().catch((err) => {
        console.error(`\n[demand]`, err.output ? err.output.toString() : err);
    });
};
exports.default = build;
//# sourceMappingURL=build.js.map