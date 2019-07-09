const fs = require('fs');

// global scripts
const scripts = {
    demand: {
        bootstrap: `lerna bootstrap`,
        build: `lerna run build --parallel`,
        default: `node index.js`,
        script: `lerna run`,
        test: `lerna run test`,
    },
};

// dynamically load other scripts and add 'cd directory' before execution
const packagesPath = `./packages`;
const prefix = `demand-`;
fs.readdirSync(packagesPath).forEach((name) => {
    const shortName = name.replace(prefix, '');
    const script = require(`${packagesPath}/${name}/package-scripts.js`);

    Object.entries(script).forEach(([key, value]) => {
        script[key] = `cd ${packagesPath}/${name} && ${value}`;
    });

    scripts[shortName] = script;

});

module.exports = {
    scripts,
};