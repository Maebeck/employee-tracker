const inquirer = require('inquirer');
const cTable = require('console.table');
const connection = require('./connection.js');
const db = require('./db/db.js');

const valSalary = (salary) => {
    if (/^[\d]+$/g.test(salary)) {
        return true;
    } else {
        console.log(` - Please use numbers only`);
        return false;
    }
};


init();

async function init() {
    await inquirer.prompt({
        name: 'initQuestion',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View Employees',
            'View Departments',
            'View Roles',
            'Add Employee',
            'Add Department',
            'Add Role',
            'Update Employees',
            'Update Department',
            'Update Role',
            'Remove Employee',
            'Remove Department',
            'Remove Role',
            'Exit'
        ]
    }).then(async function (answer) {
        switch (answer.initQuestion) {
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


async function employeeSelection(action) {
    await inquirer.prompt({
        name: 'find',
        type: 'list',
        message: `Find Employee to ${action} by:`,
        choices: [
            { name: 'All Employees', value: 'all' },
            { name: 'Employees by Department', value: 'dept' },
            { name: 'Employees by Role', value: 'role' },
            { name: 'Employees by Manager', value: 'mgr' },
            { name: 'Employees by Salary', value: 'salary' },
        ]
    }).then(async function (answer) {
        switch (answer.find) {
            case 'all':
                const emp = await db.getEmployee(answer.find);
                const empChoices = emp.map(({ id, first_name, last_name }) => ({
                    name: first_name.concat(' ', last_name),
                    value: id
                }));
                switch (action) {
                    case 'update':
                        await updateEmployee(empChoices);
                        return;
                    case 'view':
                        const all = await db.getEmployee('nice')
                        console.log('\n');
                        console.table(all);
                        return init();
                    case 'remove':
                        await removeEmployee(empChoices);
                        return;
                }
            case 'dept':
                const depts = await db.getDepartments();
                const deptChoices = depts.map(({ id, name }) => ({
                    name: name,
                    value: id
                }));
                await inquirer.prompt(
                    {
                        name: 'value',
                        type: 'list',
                        message: 'Department?',
                        choices: deptChoices,
                    }
                ).then(async function (answer2) {
                    const emp = await db.getEmployee(answer.find, answer2.value);
                    const empChoices = emp.map(({ id, first_name, last_name }) => ({
                        name: first_name.concat(' ', last_name),
                        value: id
                    }));
                    switch (action) {
                        case 'update':
                            await updateEmployee(empChoices);
                            return;
                        case 'view':
                            const empDept = await db.getEmployee('dept', answer2.value);
                            console.log('\n');
                            console.table(empDept);
                            return init();
                        case 'remove':
                            await removeEmployee(empChoices);
                            return;
                    }
                })
                break;
            case 'role':
                const roles = await db.getRoles();
                const roleChoices = roles.map(({ title, id }) => ({
                    name: title,
                    value: id
                }));
                await inquirer.prompt(
                    {
                        name: 'value',
                        type: 'list',
                        message: 'Role?',
                        choices: roleChoices,
                    }
                ).then(async function (answer2) {
                    const emp = await db.getEmployee(answer.find, answer2.value);
                    const empChoices = emp.map(({ id, first_name, last_name }) => ({
                        name: first_name.concat(' ', last_name),
                        value: id
                    }));
                    switch (action) {
                        case 'update':
                            await updateEmployee(empChoices);
                            return;
                        case 'view':
                            const empRole = await db.getEmployee('role', answer2.value);
                            console.log('\n');
                            console.table(empRole);
                            return init();
                        case 'remove':
                            await removeEmployee(empChoices);
                            return;
                    }
                })
                break;
            case 'mgr':
                const mgrs = await db.getManagers();
                const mgrChoices = mgrs.map(({ name, id }) => ({
                    name: name,
                    value: id
                }));
                await inquirer.prompt(
                    {
                        name: 'value',
                        type: 'list',
                        message: 'Manager?',
                        choices: mgrChoices,
                    }
                ).then(async function (answer2) {
                    const emp = await db.getEmployee(answer.find, answer2.value);
                    const empChoices = emp.map(({ id, first_name, last_name }) => ({
                        name: first_name.concat(' ', last_name),
                        value: id
                    }));
                    switch (action) {
                        case 'update':
                            await updateEmployee(empChoices);
                            return;
                        case 'view':
                            const empMgr = await db.getEmployee('mgr', answer2.value);
                            console.log('\n');
                            console.table(empMgr);
                            return init();
                        case 'remove':
                            await removeEmployee(empChoices);
                            return;
                    }
                })
                break;
            case 'salary':
                const salary = await db.getRoles();
                const salaryChoices = salary.map(({ salary, id }) => ({
                    name: salary,
                    value: id
                }));
                await inquirer.prompt(
                    {
                        name: 'value',
                        type: 'list',
                        message: 'Salary?',
                        choices: salaryChoices,
                    }
                ).then(async function (answer2) {
                    const emp = await db.getEmployee(answer.find, answer2.value);
                    const empChoices = emp.map(({ id, first_name, last_name }) => ({
                        name: first_name.concat(' ', last_name),
                        value: id
                    }));
                    switch (action) {
                        case 'update':
                            await updateEmployee(empChoices);
                            return;
                        case 'view':
                            const empSalary = await db.getEmployee('salary', answer2.value);
                            console.log('\n');
                            console.table(empSalary);
                            return init();
                        case 'remove':
                            await removeEmployee(empChoices);
                            return;
                    }
                })
                break;
        }
    })
};

async function view(table) {
    switch (table) {
        case 'dept':
            const dept = await db.getDepartments()
            console.log('\n');
            console.table(dept);
            return init();
        case 'role':
            const role = await db.getRoles()
            console.log('\n');
            console.table(role);
            return init();
    }
};

async function addEmployee() {
    const depts = await db.getDepartments();
    const deptChoices = depts.map(({ id, name }) => ({
        name: name,
        value: id
    }));
    await inquirer.prompt([{
        name: 'firstName',
        type: 'input',
        message: 'First name?',
    },
    {
        name: 'lastName',
        type: 'input',
        message: 'Last name?',
    },
    {
        name: 'dept',
        type: 'list',
        message: 'Department?',
        choices: deptChoices,
    }]).then(async function (answer) {
        const roles = await db.getRoles(answer.dept);
        const roleChoices = roles.map(({ title, id }) => ({
            name: title,
            value: id
        }));
        await inquirer.prompt({
            name: 'role',
            type: 'list',
            message: 'Role?',
            choices: roleChoices
        }).then(async function (answer2) {
            const mgrs = await db.getEmployee('all');
            const mgrChoices = mgrs.map(({ id, first_name, last_name }) => ({
                name: first_name.concat(' ', last_name),
                value: id
            }));
            await inquirer.prompt({
                name: 'mgr',
                type: 'list',
                message: 'Manager?',
                choices: mgrChoices
            }).then(async function (answer3) {
                await db.insertEmp(answer.firstName, answer.lastName, answer2.role, answer3.mgr)
                console.log('\n' + 'New employee added!' + '\n');
                init();
            })
        });
    })
};

async function addDepartment() {
    await inquirer.prompt({
        name: 'dept',
        type: 'input',
        message: 'Department name?',
    }).then(async function (answer) {
        await db.insertDept(answer.dept);
        console.log('\n' + 'New Department added!' + '\n');
        init();
    })
};
