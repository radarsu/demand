import { Gulpclass, Task } from 'gulpclass/Decorators';
import * as childProcess from 'child_process';

@Gulpclass()
export class Gulpfile {

    @Task()
    async clean() {
        childProcess.execSync(`rm -rf dist`);
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

    }
}