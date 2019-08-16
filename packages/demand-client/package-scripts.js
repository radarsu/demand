const nodeDemand = `node ../demand-cli/dist/bin/demand`;
const projectPath = `../../../../demand-client`;

const scripts = {
    build: `${nodeDemand} build --path ${projectPath}`,
    start: `${nodeDemand} serve --path ${projectPath}`,
};

module.exports = scripts;