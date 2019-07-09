import { Gulpclass, Task } from 'gulpclass/Decorators';
import * as gulp from 'gulp';
import * as childProcess from 'child_process';
import * as ts from 'gulp-typescript';

@Gulpclass()
export class Gulpfile {

    @Task()
    async clean() {
        childProcess.execSync(`rm -rf ./dist`);
    }

    @Task()
    async build() {
        this.runBuild().catch((e) => {
            console.error(e.output.toString());
        });
    }

    async runBuild() {

        // remove dist directory
        this.clean();

        // compile typescript
        childProcess.execSync(`tsc -p ./build/tsconfig.json`);

        // move files to parent directory
        childProcess.execSync(`mv ./dist/src/* dist`);

        // remove package.json and src directory
        childProcess.execSync(`rm -rf ./dist/src dist/package.json`);

        // copy ejs files
        return gulp.src(`./src/**/*.ejs`)
            .pipe(gulp.dest(`./dist`));

    }
}