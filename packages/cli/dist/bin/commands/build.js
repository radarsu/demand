"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const childProcess = require("child_process");
const gulp = require("gulp");
const sass = require("gulp-sass");
const tap = require("gulp-tap");
const runBuild = async () => {
    console.log(`Building...`);
    childProcess.execSync(`rm -rf ./dist`);
    childProcess.execSync(`tsc -p ./tsconfig.json`);
    gulp.src(`./src/assets/*`).pipe(gulp.dest(`./dist/assets`));
    gulp.src(`./src/**/*.html`).pipe(gulp.dest(`./dist`));
    gulp.src(`./src/app/**/*.html`).pipe(gulp.dest(`./dist/app`));
    gulp.src(`./src/app/**/*.scss`)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(`./dist/app`));
    gulp.src([`./dist/*.js`, `./dist/**/*.js`]).pipe(tap((file, through) => {
        let fileContent = file.contents.toString();
        const importRegex = new RegExp(/import( \* as)? \w+ from ['"][\w\/_-]+?['"]/, 'gm');
        fileContent = fileContent.replace(importRegex, (match) => {
            const addExtension = `${match.substring(0, match.length - 1)}.js'`;
            const nodeModulesImport = addExtension.replace(`'`, `'/node_modules/`);
            return nodeModulesImport;
        });
        file.contents = Buffer.from(fileContent);
    })).pipe(gulp.dest(`./dist`));
    gulp.src(`./node_modules`).pipe(gulp.symlink(`./dist`));
    console.log(`Build successful!`);
};
const build = async () => {
    runBuild().catch((e) => {
        console.error(e.output.toString());
    });
};
exports.default = build;
//# sourceMappingURL=build.js.map