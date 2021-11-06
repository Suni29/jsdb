const fs = require('fs');
let content;
let firstread = 0;
let options;
module.exports = (path, opt) => {
    options = opt;
    if(options.debug === true) console.log(`[JSDB] Initalized the database: ${path}`)
    setInterval(() => {
        fs.readFile(path, function read(err, data) {
            if (err) {
                console.log(`[JSDB] Error while trying to read the database: \n      ${err}`);
            }
            content = data;
            if(firstread < 1) {
                if(options.debug === true) console.log(`[JSDB] Database readed for the first time, you can now use it!`)
                firstread = 1;
            }
        });
    }, 0.0001)
}

module.exports.get = () => {
    return `${content}`;
}

module.exports.has = (name) => {
    return `${has(name)}`;
}

module.exports.options = () => {
    return options;
}

function has(name) {
    if(JSON.parse(content)[name] !== undefined) return true; else return false;
}