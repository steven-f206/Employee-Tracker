const mysql = require('mysql');
const cTable = require('console.table');

const cli = require('./lib/cli');

// Create Connection
let init = () => {
    cli();
};

init(); 