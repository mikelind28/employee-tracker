// import inquirer from 'inquirer';
// import { QueryResult } from 'pg';
// import { pool, connectToDb } from './connection.js';

// await connectToDb();

// let exit = false;

/*
class Employee {
  id: number;
  first_name: string;
  last_name: string;
  role_id: number;
  manager_id: number;

  constructor(
    id: number,
    first_name: string,
    last_name: string,
    role_id: number,
    manager_id: number,
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.role_id = role_id;
    this.manager_id = manager_id;
  }
}
*/

/*
class EmployeesArray {

  constructor(){
    this.getEmployeesArray = 
  }

  getEmployeesArray = pool.query(`SELECT first_name || ' ' || last_name AS name FROM employee`, (err, result) => {
    if (err) {
      console.log(err);
    } else if (result) {
      const employeesMapped = result.rows.map((employee) => {
        const eachEmployee = employee.name;
        console.log(eachEmployee);
        return eachEmployee;
      });
      console.log(employeesMapped);
      return employeesMapped;
    }
  });
}

const employeeArray = new EmployeesArray();
console.log(`testing employee array: ${employeeArray.getEmployeesArray}`);
*/

/*
      let employeesArray = result.rows.map((employee) => {
        const firstName = employee.first_name;
        const lastName = employee.last_name;
        const employeeName = firstName.concat(' ', lastName);
        employeesArray.push(employeeName);
      });
      console.log(employeesArray);
      return employeesArray;

      ---

      employeeArray.map((employee) => {
          const firstName = employee.first_name;
          const lastName = employee.last_name;
          const employeeName = firstName.concat(' ', lastName);
          return employeeName;
        }),
*/


/*
function fetchRoles() {
  const rolesArray: String[] = [];
  pool.query(`SELECT title FROM role`, (err: Error, result: QueryResult) => {
    if (err) {
      console.log(err);
      return;
    } else if (result) {
      result.rows.map((role) => {
        rolesArray.push(role.title);
      });
      return rolesArray;
    }
  });
}

fetchRoles();
*/

/*
     let rolesArray = result.rows.map((role) => {
       const roleName = role.name;
       rolesArray.push(roleName);
     });
*/

/*
function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'employees',
        message: `Which employee's role would you like to update?`,
        choices: fetchEmployees,
      },
    ])
    .then((answers) => {
      const selectedEmployee = answers.employees;
      inquirer
        .prompt([
          {
            type: 'list',
            name: 'role',
            message: `Which role would you like to assign ${selectedEmployee}?`,
            choices: rolesArray.map((role) => {
              const roleName = role.title;
              return roleName;
            }),
          }
        ])
        .then((answers) => {
          const selectedRole = answers.role;

          pool.query(`UPDATE employee SET role_id = $1 WHERE id = $2;` [])
        })
    })
}
*/

/*
function mainMenuSelections() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'selection',
                message: 'What would you like to do?',
                choices: [
                    'View all employees',
                    'View all roles',
                    'View all departments',
                    'Update employee role',
                    'Add new employee',
                    'Add new role',
                    'Add new department',
                    'Quit',
                ],
            },
        ])
        .then((answers) => {
            if (answers.selection === 'View all employees') {
                pool.query(`SELECT e1.id AS "Employee ID", e1.first_name AS "First Name", e1.last_name AS "Last Name",
       role.title AS "Title", department.department_name AS "Department", role.salary AS "Salary", e2.first_name || ' ' || e2.last_name AS "Manager"
    FROM employee e1 JOIN role ON e1.role_id = role.id
	JOIN department ON role.department_id = department.id
	LEFT JOIN employee e2 ON e1.manager_id = e2.id;`, (err: Error, result: QueryResult) => {
                    if (err) {
                      console.log(err);
                      mainMenuSelections();
                    } else if (result) {
                      console.table(result.rows);
                      mainMenuSelections();
                    }
                  });
            } else if (answers.selection === 'View all roles') {
                pool.query(`SELECT role.id AS "Role ID", role.title AS "Role Title", department.department_name AS "Department", role.salary AS "Salary"
	FROM role
	JOIN department ON role.department_id = department.id;`, (err: Error, result: QueryResult) => {
                                 if (err) {
                                   console.log(err);
                                   mainMenuSelections();
                                 } else if (result) {
                                   console.table(result.rows);
                                   mainMenuSelections();
                                 }
                               });
            } else if (answers.selection === 'View all departments') {
                pool.query(`SELECT department.id AS "Department ID", department.department_name AS "Department Name" FROM department;`, (err: Error, result: QueryResult) => {
                                 if (err) {
                                   console.log(err);
                                   mainMenuSelections();
                                 } else if (result) {
                                   console.table(result.rows);
                                   mainMenuSelections();
                                 }
                               });
            } else if (answers.selection === 'Update employee role') {

            } else if (answers.selection === 'Add new employee') {
              inquirer
              .prompt([
                {
                  type: 'input',
                  name: 'firstName',
                  message: `What is the new employee's first name?`,
                },
                {
                  type: 'input',
                  name: 'lastName',
                  message: `What is the new employee's last name?`,
                },
                {
                  type: 'list',
                  name: 'roleSelect',
                  message: `What is the new employee's role?`,
                  choices: fetchRoles();
                },
                {
                  type: 'list',
                  name: 'managerSelect',
                  message: `Who is the new employee's manager?`,
                  choices: employeesArray,
                },
              ])
              .then((answers) => {
                const selectedRole = answers.roleSelect;
                let selectedRoleID;
                pool.query(`SELECT role.id FROM role WHERE role.title = $1`, [selectedRole], (err, result) => {
                  if (err) {
                    console.log(err);
                    mainMenuSelections();
                  } else if (result) {
                    selectedRoleID = result.rows;
                  }
                });
                const selectedManager = answers.managerSelect;
                let selectedManagerID;
                pool.query(`SELECT employee.id FROM employee WHERE employee.first_name || ' ' employee.last_name = $1`, [selectedManager], (err, result) => {
                  if (err) {
                    console.log(err);
                    mainMenuSelections();
                  } else if (result) {
                    selectedManagerID = result.rows;
                  }
                })
                pool.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`, [answers.firstName, answers.lastName, selectedRoleID, selectedManagerID], (err: Error, result: QueryResult) => {
                  if (err) {
                    console.log(err);
                    mainMenuSelections();
                  } else if (result) {
                    console.log(`Added ${answers.firstName} ${answers.lastName} to the database!`);
                    mainMenuSelections();
                  }
                })
              })
            } else if (answers.selection === 'Add new role') {

            } else if (answers.selection === 'Add new department') {

            } else if (answers.selection === 'Quit') {
                // exit = true;
            }
        });
}

mainMenuSelections();
*/