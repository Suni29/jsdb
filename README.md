## What is JSDB?
JSDB is a Databse module for NodeJS made by Suni29, its easy to use & has a lot of features.

## How to use JSDB?
Here is some code examples how to use it.
```js
const Database = require('@Suni29/jsdb')
const db = new Database('./db.json');

db.set('key', 'value')
db.get('key') // 'value'

db.add('counter', 10)
db.get('counter') // 10

db.substract('counter', 7)
db.get('counter') // 3

db.delete('counter')
db.get('counter') // undefined

db.has('key') // true

db.list() // Returns a stringified JSON text, ex.: "{"key":"value"}"
```

## Options
There is not much options currently but in the future I will add more.
```js
const Database = require('@Suni29/jsdb')
const db = new Database('./db.json', {
  debug: true / false // Turns on or off the debug log in the console.
});
```

## Installation
The installation process is very easy, just one command.
```bash
$ npm i @Suni29/jsdb
```

## Contact
You can contact me on Discord, Suni29#3946 or join [Bitty's Support](https://dc.bittybot.cf) server to DM me.
