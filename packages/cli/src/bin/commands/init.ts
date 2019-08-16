import * as _ from 'lodash';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

import { dirName, log } from './shared';

// command
const init = async (argv: any) => {
    log(`Initiating...`);

    // variables
    const templatePath = `templates`;
    const demandFileName = `demand.config.ts`;
    const packageJsonName = `package.json`;
    const templateExtension = `ejs`;

    // paths
    const demandFilePath = path.resolve(__dirname, templatePath, `${demandFileName}.${templateExtension}`);
    const packageJsonPath = path.resolve(__dirname, templatePath, `${packageJsonName}.${templateExtension}`);

    // create src
    await fs.promises.mkdir(`src`);
    log(`Created src.`);

    // create demand.config.ts
    const demandConfigTemplate = await fs.promises.readFile(demandFilePath, 'utf-8');
    await fs.promises.writeFile(demandFileName, demandConfigTemplate);
    log(`Created ${demandFileName}.`);

    // create package.json
    const packageJsonTemplateString = await fs.promises.readFile(packageJsonPath, 'utf-8');
    const packageJsonTemplate = _.template(packageJsonTemplateString);
    const packageJsonCompiled = packageJsonTemplate({
        dirName,
    });
    await fs.promises.writeFile(packageJsonName, packageJsonCompiled);
    log(`Created ${packageJsonName}.`);

    // npm install
    log(`npm install`);
    childProcess.execSync(`npm install`);

    log(`Initiation successful! Run \`demand serve\` to launch development server.`);
};

export default init;