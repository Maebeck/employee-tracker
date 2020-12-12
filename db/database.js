const inquirer = require('inquirer');
const consoleT = require('console.table');
const connection = require('./connection.js');
const db = require('./db/db.js');

const eSalary = (salary) => {
    if (/^[/d]+$/g.test(salary)) {
        return true;
    } else {
        console.log(`- Please use numbers only!`);
        return false;
    }
};

init ();