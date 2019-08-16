const nodeDemand = `node ../cli/dist/bin/demand`;
const projectPath = `../../../../client`;

const scripts = {
    build: `${nodeDemand} build --path ${projectPath}`,
    start: `${nodeDemand} serve --path ${projectPath}`,
};

module.exports = scripts;