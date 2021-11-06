const fs = require('fs');
const syncer = require('./sync.js');
const colors = require('colors');
let filepath;

setInterval(() => {
    if(!filepath === undefined) {
        const path = filepath;
        fs.readFile(path, function read(err, data) {
            if (err) {
                console.error(`[JSDB] Error while trying to get data from the database: \n      ${err}`);
            }
            content = JSON.parse(data);
        });
    }
}, 1)

class Database {
    constructor(path, options) {
      this.path = path || "./db.json";
      filepath = path;
      this.options = options || {};
      if(!fs.existsSync(this.path)) {
        fs.writeFile(this.path, `{}`, function(err) {
            if(err) {
                console.log(err);
            }
            console.log(`[JSDB] The databse has been created.`);
        }); 
      }
      syncer(this.path, this.options)
      if(!fs.existsSync('.jsdb')){
            console.log(`    
            ___  ________  ________  ________     
            |\\  \\|\\   ____\\|\\   ___ \\|\\   __  \\    
            \\ \\  \\ \\  \\___|\\ \\  \\_|\\ \\ \\  \\|\\ /_   
          __ \\ \\  \\ \\_____  \\ \\  \\ \\\\ \\ \\   __  \\  
         |\\  \\\\_\\  \\|____|\\  \\ \\  \\_\\\\ \\ \\  \\|\\  \\ 
         \\ \\________\\____\\_\\  \\ \\_______\\ \\_______\\
          \\|________|\\_________\\|_______|\\|_______|
                    \\|_________|                   
                                                   
                                                   
            `.bold)
            console.log('Made by Suni29\nVersion: v1.0\nHave fun using JSDB!'.yellow);
            console.log(`This message only appears once.`.grey.italic)
            fs.writeFile('.jsdb', `/*   Don't do anything with this file.   */\nFIRSTRUN=TRUE`, function(err) {
                if(err) {
                    console.log(err);
                }
            }); 
      }
    }

    get(name) {
        return `${JSON.parse(syncer.get())[name]/*.catch(err => {console.log(`[JSDB] Error while trying to read the database: \n      The databse was broken or the data wasn't read. (Wait minimum 2ms after the start.)`)})*/}`;
    }

    set(name, value) {
        const path = this.path;
        if(!path) return console.error(`[JSDB] Error while trying to initalize the database: \n      There is not path defined.`);
        fs.readFile(this.path, function read(err, data) {
            if (err) {
                console.error(`[JSDB] Error while trying to made changes to the database: \n      ${err}`);
            }
            const content = JSON.parse(data);
            content[name] = value;
            fs.writeFile(path, JSON.stringify(content), function(err) {
                if(err) {
                    console.log(err);
                }
            }); 
        });
    }

    add(name, count) {
        const path = this.path;
        if(!path) return console.error(`[JSDB] Error while trying to initalize the database: \n      There is not path defined.`);
        fs.readFile(this.path, function read(err, data) {
            if (err) {
                console.error(`[JSDB] Error while trying to made changes to the database: \n      ${err}`);
            }
            let content = JSON.parse(data);
            if(content[name] === undefined) content[name] = 0;
            content[name] += count;
            fs.writeFile(path, JSON.stringify(content), function(err) {
                if(err) {
                    console.log(err);
                }
            }); 
        });
    }

    substract(name, count) {
        const path = this.path;
        if(!path) return console.error(`[JSDB] Error while trying to initalize the database: \n      There is not path defined.`);
        fs.readFile(this.path, function read(err, data) {
            if (err) {
                console.error(`[JSDB] Error while trying to made changes to the database: \n      ${err}`);
            }
            let content = JSON.parse(data);
            if(content[name] === undefined) content[name] = 0;
            content[name] -= count;
            fs.writeFile(path, JSON.stringify(content), function(err) {
                if(err) {
                    console.log(err);
                }
            }); 
        });
    }

    delete(name) {
        const path = this.path;
        if(!path) return console.error(`[JSDB] Error while trying to initalize the database: \n      There is not path defined.`);
        fs.readFile(path, function read(err, data) {
            if (err) {
                console.error(`[JSDB] Error while trying to made changes to the database: \n      ${err}`);
            }
            const content = JSON.parse(data);
            delete content[name];
            fs.writeFile(path, JSON.stringify(content), function(err) {
                if(err) {
                    console.log(err);
                }
            }); 
        });
    }

    list() {
        return `${syncer.get()}`;
    }

    has(name) {
        return `${syncer.has(name)}`;
    }

    clear() {
        fs.writeFile(this.path, `{}`, function(err) {
            if(err) {
                console.log(err);
            }
            if(syncer.options().debug === true) console.log(`[JSDB] The databse has been cleared.`);
        }); 
    }
};

module.exports = Database;