import * as _ from 'lodash';
import * as fs from 'fs';
import * as gulp from 'gulp';
import * as path from 'path';
import * as sass from 'gulp-sass';
import * as tap from 'gulp-tap';

import { DEMAND_INJECT_COMMENT, dist, log, src } from './shared';

// unhandled file updated
const defaultWatch = (file: any) => {

    // move to dist
    gulp.src(file.path).pipe(gulp.dest(dist));

};

// html file updated
const htmlWatch = (file: any, fileName: string) => {

    // if ts file exists with same name
    fs.exists(`${file.dirname}/${fileName}.ts`, (exists) => {
        if (exists) {
            // rebuild typescript file
            return;
        }

        // just copy
        gulp.src(file.path).pipe(gulp.dest(dist));

    });

};

// scss file updated
const scssWatch = (file: any, fileName: string) => {

    // compile and move to dist
    gulp.src(file.path)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(dist));

};

// ts file updated
const injectPath = path.resolve(__dirname, `../templates/demand-inject.ts.ejs`);
const injectTemplateString = fs.readFileSync(injectPath, 'utf-8');
const injectTemplate = _.template(injectTemplateString);

const tsWatch = (file: any, fileName: string) => {

    // if contains DEMAND_INJECT_COMMENT, inject html & css, compile & put to dist
    const fileContents = file.contents.toString();
    if (fileContents.includes(DEMAND_INJECT_COMMENT)) {

        let html = `<link rel="stylesheet" href="./${fileName}.css">`;
        // html += await fs.promises.readFile();

        fileContents.replace(DEMAND_INJECT_COMMENT, injectTemplate({
            html,
        }));
    }

    // compile
    // childProcess.exec('tsc -p ./tsconfig.json', () => {
    //     log(`Updated`, fileName);
    // });

};

const watch = async () => {
    log(`Watching...`);

    // watch directory for new files

    // watch existing files for changes
    gulp.src([`${src}/*.*`, `${src}/**/*.*`]).pipe(tap((file: any) => {

        // variables
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
            log(`${file.basename} changed`);
            file.__demand__onWatch();
        });

    }));
};

export default watch;