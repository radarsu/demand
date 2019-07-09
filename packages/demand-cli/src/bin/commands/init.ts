import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as _ from 'lodash';

import { dirName } from './shared';

// command
const init = async (argv: any) => {
    console.log(`Initiating...`);

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
    console.log(`Created src.`);

    // create demand.config.ts
    const demandConfigTemplate = await fs.promises.readFile(demandFilePath, 'utf-8');
    await fs.promises.writeFile(demandFileName, demandConfigTemplate);
    console.log(`Created ${demandFileName}.`);

    // create package.json
    const packageJsonTemplateString = await fs.promises.readFile(packageJsonPath, 'utf-8');
    const packageJsonTemplate = _.template(packageJsonTemplateString);
    const packageJsonCompiled = packageJsonTemplate({
        dirName,
    });
    await fs.promises.writeFile(packageJsonName, packageJsonCompiled);
    console.log(`Created ${packageJsonName}.`);

    // npm install
    console.log(`npm install`);
    childProcess.execSync(`npm install`);

    console.log(`Initiation successful! Run \`demand serve\` to launch development server.`);
};

export default init;