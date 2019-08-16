const fs = require('fs');

// global scripts
const scripts = {
    demand: {
        install: `lerna bootstrap`,
        build: `lerna run build --parallel`,
        default: `node index.js`,
        script: `lerna run`,
        test: `lerna run test`,
    },
};

// dynamically load other scripts and add 'cd directory' before execution
const packagesPath = `./packages`;
fs.readdirSync(packagesPath).forEach((name) => {
    let script;
    try {
        script = require(`${packagesPath}/${name}/package-scripts.js`);
    } catch (e) {

    }

    if (!script) { 
        return;
    }

    Object.entries(script).forEach(([key, value]) => {
        script[key] = `cd ${packagesPath}/${name} && ${value}`;
    });

    scripts[name] = script;
});

module.exports = {
    scripts,
};