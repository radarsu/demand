import * as childProcess from 'child_process';
import * as gulp from 'gulp';
import * as sass from 'gulp-sass';
import * as tap from 'gulp-tap';

// command
const runBuild = async () => {
    console.log(`Building...`);

    // remove dist directory
    childProcess.execSync(`rm -rf ./dist`);

    // compile typescript
    childProcess.execSync(`tsc -p ./tsconfig.json`);

    // copy assets
    gulp.src(`./src/assets/*`).pipe(gulp.dest(`./dist/assets`));

    // copy html
    gulp.src(`./src/**/*.html`).pipe(gulp.dest(`./dist`));
    gulp.src(`./src/app/**/*.html`).pipe(gulp.dest(`./dist/app`));

    // copy scss
    gulp.src(`./src/app/**/*.scss`)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(`./dist/app`));

    // change non-relative imports to point to node_modules
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

    // create symlink to node_modules: TODO: change to copying
    gulp.src(`./node_modules`).pipe(gulp.symlink(`./dist`));

    console.log(`Build successful!`);
};

const build = async () => {
    runBuild().catch((e: any) => {
        console.error(e.output.toString());
    });
};

export default build;