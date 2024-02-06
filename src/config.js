const yaml = require('js-yaml');
const fs = require('fs');

let configs = {};
const files = ["subscription", "database", "currency", "rest", "service"];

async function loadConfig() {
    let success = true;

    for(let i=0; i<files.length; i++){
        let file = files[i];

        try {
            configs[file] =  yaml.load(fs.readFileSync("./config/" + file + ".yaml", 'utf8'));
        } catch (e) {
            console.log(e);
            success = false;
        }

    }
    return success;
}

async function getConfig(name) {
    if (!files.includes(name)) {
        console.error("Cant get config file with name '" + name + "'")
        return;
    }
    return configs[name];
}


module.exports = { loadConfig, getConfig };