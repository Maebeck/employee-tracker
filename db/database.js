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

async function init() {
    await inquirer.prompt({
    name: "Command",
    type: 'list',
    message: 'What would you like to do?',
    choices: [
        'View Employee',
        'View Department',
        'View Role',
        'Add Employee',
        'Add Department',
        'Add Role',
        'Update Employee',
        'Update Department',
        'Update Role',
        'Delete Employee',
        'Delete Department',
        'Delete Role',
    ]
    }).then(async function (choice) {
        switch (choice.Command) {
            case 'View Employees':
            employeeSelection('view');
            break;
            case 'View Departments':
                view('dept');
                break;
            case 'View Roles':
                view('role');
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Update Employees':
                employeeSelection('update');
                break;
            case 'Update Department':
                updateDepartment();
                break;
            case 'Update Role':
                updateRole();
                break;
            case 'Remove Employee':
                employeeSelection('remove');
                break;
            case 'Remove Department':
                removeRoleOrDept('dept');
                break;
            case 'Remove Role':
                removeRoleOrDept('role');
                break;
            case 'Exit':
                connection.end();
                break;
        }
    });
};