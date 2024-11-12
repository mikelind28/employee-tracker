import inquirer from 'inquirer';
import Db from './db/index.js';

const db = new Db();

function inquirerMainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'View all employees',
                    value: 'VIEW_EMPLOYEES'
                },
                {
                    name: 'View employees by manager',
                    value:'VIEW_EMPLOYEE_BY_MANAGER',
                },
                {
                    name: 'View employees by department',
                    value:'VIEW_EMPLOYEE_BY_DEPARTMENT',
                },
                {
                    name: 'View all roles',
                    value:'VIEW_ROLES',
                },
                {
                    name: 'View all departments',
                    value:'VIEW_DEPARTMENTS',
                },
                {
                    name: 'Add new employee',
                    value:'ADD_EMPLOYEE',
                },
                {
                    name: 'Add new role',
                    value:'ADD_ROLE',
                },
                {
                    name: 'Add new department',
                    value:'ADD_DEPARTMENT',
                },
                {
                    name: 'Update employee role',
                    value:'UPDATE_EMPLOYEE_ROLE',
                },
                {
                    name: 'Update employee manager',
                    value: 'UPDATE_EMPLOYEE_MANAGER'
                },
                {
                    name: 'Delete employee',
                    value:'DELETE_EMPLOYEE',
                },
                {
                    name: 'Delete role',
                    value:'DELETE_ROLE',
                },                
                {
                    name: 'Delete department',
                    value:'DELETE_DEPARTMENT',
                },
                {
                    name: 'Quit',
                    value: 'QUIT',
                }
            ]
        }
    ])
    .then(res => {
        const choice = res.choices;

        switch(choice) {
            case 'VIEW_EMPLOYEES':
                viewAllEmployees();
                break;
            case 'VIEW_EMPLOYEE_BY_MANAGER':
                viewEmployeesByManager();
                break;
            case 'VIEW_EMPLOYEE_BY_DEPARTMENT':
                viewEmployeesByDepartment();
                break;
            case 'VIEW_ROLES':
                viewAllRoles();
                break;
            case 'VIEW_DEPARTMENTS':
                viewAllDepartments();
                break;
            case 'ADD_EMPLOYEE':
                addNewEmployee();
                break;
            case 'ADD_ROLE':
                addNewRole();
                break;
            case 'ADD_DEPARTMENT':
                addNewDepartment();
                break;
            case 'UPDATE_EMPLOYEE_ROLE':
                updateEmployeeRole();
                break;
            case 'UPDATE_EMPLOYEE_MANAGER':
                updateEmployeeManager();
                break;
            case 'DELETE_EMPLOYEE':
                deleteEmployee();
                break;
            case 'DELETE_ROLE':
                deleteRole();
                break;
            case 'DELETE_DEPARTMENT':
                deleteDepartment();
                break;
            default:
                quit();
        }
    });
}


function viewAllEmployees() {
    db.viewAllEmployees()
        .then(( {rows} ) => {
            const employees = rows;
            console.table(employees);
        })
        .then(() => inquirerMainMenu());
}


async function viewEmployeesByManager() {
    const queryResponse = await db.viewAllEmployees();

    const employeesArray = queryResponse.rows.map((employee) => {
        return {
            name: employee.first_name + ' ' + employee.last_name,
            value: employee.id
        }
    });
    
    inquirer
        .prompt([
            {
                name: 'employeeManager',
                message: "For which manager would you like to view employees?",
                type: 'list',
                choices: employeesArray
            }
        ])
        .then( async res => {
            const queryResponse = await db.viewEmployeesByManager(res.employeeManager);
            if (queryResponse.rowCount != 0) {
                console.log("\n");
                console.log(`The selected employee manages the following employees:`);
                console.table(queryResponse.rows);
                console.log("\n");
            } else {
                console.log("\n");
                console.log("This employee does not manage any other employees.");
                console.log("\n");
            }
            inquirerMainMenu();
        });
}


async function viewEmployeesByDepartment() {
    const queryResponse = await db.viewAllDepartments();

    const departmentsArray = queryResponse.rows.map((department) => {
        return {
            name: department.department_name,
            value: department.id
        }
    });
    
    inquirer
        .prompt([
            {
                name: 'employeeDepartment',
                message: "For which department would you like to view employees?",
                type: 'list',
                choices: departmentsArray
            }
        ])
        .then( async res => {
            const queryResponse = await db.viewEmployeesByDepartment(res.employeeDepartment);
            if (queryResponse.rowCount !=0) {
                console.log("\n");
                console.log("The selected department has the following employees:");
                console.table(queryResponse.rows);
                console.log("\n");
            } else {
                console.log("\n");
                console.log("This department does not have any employees.");
                console.log("\n");
            }
            inquirerMainMenu();
        });
}


function viewAllRoles() {
    db.viewAllRoles()
    .then(( {rows} ) => {
        const roles = rows;
        console.log('\n');
        console.table(roles);
        console.log("\n");
    })
    .then(() => inquirerMainMenu());
}


function viewAllDepartments() {
    db.viewAllDepartments()
        .then(( {rows} ) => {
            const departments = rows;
            console.log('\n');
            console.table(departments);
            console.log("\n");
        })
        .then(() => inquirerMainMenu());
}


async function addNewEmployee() {
    const rolesQueryResponse = await db.viewAllRoles();

    const rolesArray = rolesQueryResponse.rows.map(role => {
        return {
            name: role.title,
            value: role.id
        }
    });

    const queryResponse = await db.viewAllEmployees();

    const choicesArray = queryResponse.rows.map(employee => {
        return {
            name: employee.first_name.concat(' ', employee.last_name),
            value: employee.id
        }
    });

    inquirer
        .prompt([
            {
                name: 'employeeFirstName',
                message: "What is the employee's first name?",
                type: 'input',
            },
            {
                name: 'employeeLastName',
                message: "What is the employee's last name?",
                type: 'input',
            },
            {
                name: 'employeeRole',
                message: "What is the employee's role?",
                type: 'list',
                choices: rolesArray
            },
            {
                name: 'employeeManager',
                message: "Who is the employee's manager?",
                type: 'list',
                choices: choicesArray
            }
        ])
        .then(res => {
            db.addNewEmployee(res.employeeFirstName, res.employeeLastName, res.employeeRole, res.employeeManager)
                .then(() => {
                    console.log("\n");
                    console.log("New employee added!");
                    console.log("\n");
                    inquirerMainMenu();
                })
        })
}


async function addNewRole() {
    const departmentsQueryResponse = await db.viewAllDepartments();

    const departmentsArray = departmentsQueryResponse.rows.map(department => {
        return {
            name: department.department_name,
            value: department.id
        }
    });

    inquirer
        .prompt([
            {
                name: 'roleTitle',
                message: "What is the title of the role?",
                type: 'input',
            },
            {
                name: 'roleSalary',
                message: "What is the salary of the role?",
                type: 'input',
            },
            {
                name: 'roleDepartment',
                message: "To which department does this role belong?",
                type: 'list',
                choices: departmentsArray
            }
        ])
        .then(res => {
            db.addNewRole(res.roleTitle, res.roleSalary, res.roleDepartment)
                .then(() => {
                    console.log("\n");
                    console.log("New role added!");
                    console.log("\n");
                    inquirerMainMenu();
                })
        })
}


function addNewDepartment() {
    inquirer
        .prompt([
            {
                name: 'departmentName',
                message: "What is the name of the department?",
                type: 'input'
            }
        ])
        .then(res => {
            db.addNewDepartment(res.departmentName)
                .then(() => {
                    console.log("\n");
                    console.log("New department added!")
                    console.log("\n");
                })
        })
}


async function updateEmployeeRole() {
    const employeeQueryResponse = await db.viewAllEmployees();

    const employeesArray = employeeQueryResponse.rows.map(employee => {
        return {
            name: employee.first_name.concat(' ', employee.last_name),
            value: employee.id
        }
    });

    const roleQueryResponse = await db.viewAllRoles();
    console.table(roleQueryResponse.rows);

    const rolesArray = roleQueryResponse.rows.map(role => {
        return {
            name: role.title,
            value: role.id
        }
    })

    inquirer
        .prompt([
            {
                name: 'employeeSelect',
                message: "Which employee's role would you like to update?",
                type: 'list',
                choices: employeesArray
            },
            {
                name: 'roleSelect',
                message: "What role would you like to give this employee?",
                type: 'list',
                choices: rolesArray
            }
        ])
        .then(async res => {
            await db.updateEmployeeRole(res.employeeSelect, res.roleSelect);
            console.log(`Employee's role has been updated!`);
            inquirerMainMenu();
        })
}


async function updateEmployeeManager() {
    const employeeQueryResponse = await db.viewAllEmployees();
    console.table(employeeQueryResponse.rows);

    const employeesArray = employeeQueryResponse.rows.map(employee => {
        return {
            name: employee.first_name.concat(' ', employee.last_name),
            value: employee.id
        }
    });

    inquirer
        .prompt([
            {
                name: 'employeeSelect',
                message: "Select an employee to update their manager:",
                type: 'list',
                choices: employeesArray
            },
            {
                name: 'managerSelect',
                message: "Select a manager for this employee:",
                type: 'list',
                choices: employeesArray
            }
        ])
        .then(async res => {
            await db.updateEmployeeManager(res.employeeSelect, res.managerSelect),
            console.log(`Employee's manager has been updated!`);
            inquirerMainMenu();
        })
}


async function deleteEmployee() {
    const queryResponse = await db.viewAllEmployees();
    console.table(queryResponse.rows);

    const choicesArray = queryResponse.rows.map(employee => {
        return {
            name: employee.first_name.concat(' ', employee.last_name),
            value: employee.id
        }
    });

    inquirer
        .prompt([
            {
                name: 'employeeID',
                message: 'Which employee would you like to delete?',
                type: 'list',
                choices: choicesArray
            }
        ])
        .then(async res => {
            const deleteResponse = await db.deleteEmployee(res.employeeID);
            console.log(`${deleteResponse} has been deleted.`);
            inquirerMainMenu();
        });
}


async function deleteRole() {
    const queryResponse = await db.viewAllRoles();
    console.table(queryResponse.rows);

    const choicesArray = queryResponse.rows.map(role => {
        return {
            name: role.title,
            value: role.id
        }
    });

    inquirer
        .prompt([
            {
                name: 'roleID',
                message: 'Which employee would you like to delete?',
                type: 'list',
                choices: choicesArray
            }
        ])
        .then(async res => {
            const deleteResponse = await db.deleteRole(res.roleID);
            console.log(`${deleteResponse} has been deleted.`);
            inquirerMainMenu();
        });
}


async function deleteDepartment() {
    const queryResponse = await db.viewAllDepartments();
    console.table(queryResponse.rows);

    const choicesArray = queryResponse.rows.map(department => {
        return {
            name: department.department_name,
            value: department.id
        }
    });

    inquirer
        .prompt([
            {
                name: 'departmentID',
                message: 'Which department would you like to delete?',
                type: 'list',
                choices: choicesArray
            }
        ])
        .then(async res => {
            const deleteResponse = await db.deleteDepartment(res.departmentID);
            console.log(`${deleteResponse} has been deleted.`);
            inquirerMainMenu();
        });
}


function quit() {
    console.log("\n");
    console.log(`Exiting Employee Tracker. Goodbye!`);
    console.log("\n");
    process.exit();
}

inquirerMainMenu();