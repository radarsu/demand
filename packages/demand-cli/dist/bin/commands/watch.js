"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const fs = require("fs");
const gulp = require("gulp");
const path = require("path");
const sass = require("gulp-sass");
const tap = require("gulp-tap");
const shared_1 = require("./shared");
const defaultWatch = (file) => {
    gulp.src(file.path).pipe(gulp.dest(shared_1.dist));
};
const htmlWatch = (file, fileName) => {
    fs.exists(`${file.dirname}/${fileName}.ts`, (exists) => {
        if (exists) {
            return;
        }
        gulp.src(file.path).pipe(gulp.dest(shared_1.dist));
    });
};
const scssWatch = (file, fileName) => {
    gulp.src(file.path)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(shared_1.dist));
};
const injectPath = path.resolve(__dirname, `../templates/demand-inject.ts.ejs`);
const injectTemplateString = fs.readFileSync(injectPath, 'utf-8');
const injectTemplate = _.template(injectTemplateString);
const tsWatch = (file, fileName) => {
    const fileContents = file.contents.toString();
    if (fileContents.includes(shared_1.DEMAND_INJECT_COMMENT)) {
        let html = `<link rel="stylesheet" href="./${fileName}.css">`;
        fileContents.replace(shared_1.DEMAND_INJECT_COMMENT, injectTemplate({
            html,
        }));
    }
};
const watch = async () => {
    shared_1.log(`Watching...`);
    gulp.src([`${shared_1.src}/*.*`, `${shared_1.src}/**/*.*`]).pipe(tap((file) => {
        const ext = file.path.match(/\.\w+$/)[0];
        const removeExtRegex = new RegExp(`${file.extname}$`);
        const fileName = file.basename.replace(removeExtRegex, '');
        switch (ext) {
            case '.html':
                file.__demand__onWatch = () => htmlWatch(file, fileName);
                break;
            case '.scss':
                file.__demand__onWatch = () => scssWatch(file, fileName);
                break;
            case '.ts':
                file.__demand__onWatch = () => tsWatch(file, fileName);
                break;
            default:
                file.__demand__onWatch = () => defaultWatch(file);
                break;
        }
        fs.watchFile(file.path, () => {
            shared_1.log(`${file.basename} changed`);
            file.__demand__onWatch();
        });
    }));
};
exports.default = watch;
//# sourceMappingURL=watch.js.map