"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const childProcess = require("child_process");
const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const shared_1 = require("./shared");
const init = async (argv) => {
    console.log(`Initiating...`);
    const templatePath = `templates`;
    const demandFileName = `demand.config.ts`;
    const packageJsonName = `package.json`;
    const templateExtension = `ejs`;
    const demandFilePath = path.resolve(__dirname, templatePath, `${demandFileName}.${templateExtension}`);
    const packageJsonPath = path.resolve(__dirname, templatePath, `${packageJsonName}.${templateExtension}`);
    await fs.promises.mkdir(`src`);
    console.log(`Created src.`);
    const demandConfigTemplate = await fs.promises.readFile(demandFilePath, 'utf-8');
    await fs.promises.writeFile(demandFileName, demandConfigTemplate);
    console.log(`Created ${demandFileName}.`);
    const packageJsonTemplateString = await fs.promises.readFile(packageJsonPath, 'utf-8');
    const packageJsonTemplate = _.template(packageJsonTemplateString);
    const packageJsonCompiled = packageJsonTemplate({
        dirName: shared_1.dirName,
    });
    await fs.promises.writeFile(packageJsonName, packageJsonCompiled);
    console.log(`Created ${packageJsonName}.`);
    console.log(`npm install`);
    childProcess.execSync(`npm install`);
    console.log(`Initiation successful! Run \`demand serve\` to launch development server.`);
};
exports.default = init;
//# sourceMappingURL=init.js.map