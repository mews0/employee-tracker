const inquirer = require('inquirer');
const queries = require('./db/queries');

/*
APPLICATION OVERVIEW
====================
1. Get user input (npm inquirer)
2. Perform queries (npm mysql2)
3. Display results (npm console.table)
*/

// Prompt user for input
const promptUser = input => {

  // Capture user input in command line
  return inquirer.prompt([
    {
      type: 'list',
      name: 'mainMenu',
      message: 'Please select one of the following:',
      choices: ['View all departments', 'View all roles', 'View all employees', 'Add new department', 'Add new role', 'Add new employee', 'Update an employee role']
    }
  ])
  .then(inputData => {
    switch (inputData.mainMenu) {
      case 'View all departments':
        queries.findAllDepartments();
        break;
      case 'View all roles':
        queries.findAllRoles();
        break;
      case 'View all employees':
        queries.findAllEmployees();
        break;
      case 'Add new department':
        // prompt user for new department name
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'department',
              message: 'Please enter new department name:',
              validate: input => {
                if (input) {
                  return true;
                } else {
                  console.log('You must enter a department name!');
                }
              }
            }
          ])
          .then(answer => {
            // add new department to the database
            queries.createDepartment(answer.department);
          });
          break;
      case 'Add new role':
        // prompt user for title, salary, department id
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'title',
              message: 'Please enter title:',
              validate: input => {
                if (input) {
                  return true;
                } else {
                  console.log('You must enter a title!');
                }
              }
            },
            {
              type: 'input',
              name: 'salary',
              message: 'Please enter salary:',
              validate: input => {
                if (input > 0) {
                  return true;
                } else {
                  console.log(' You must enter a number greater than 0!');
                }
              }
            },
            {
              type: 'list',
              name: 'department',
              message: 'Please select a department:',
              // call function that returns an array of departments from the database
              choices: queries.listDepartments()
            }
          ])
          .then(answers => {
            // add new role to the database 
            queries.createRole(answers.title, answers.salary, answers.department);
          });
          break;
      case 'Add new employee':
        // prompt user for first name, last name, role, manager
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'firstName',
              message: 'Please enter first name:',
              validate: input => {
                if (input) {
                  return true;
                } else {
                  console.log('You must enter a first name!');
                }
              }
            },
            {
              type: 'input',
              name: 'lastName',
              message: 'Please enter last name:',
              validate: input => {
                if (input) {
                  return true;
                } else {
                  console.log('You must enter a last name!');
                }
              }
            },
            {
              type: 'list',
              name: 'title',
              message: 'Please select a title:',
              // call function that returns an array of titles from the database
              choices: queries.listTitles()
            },
            {
              type: 'list',
              name: 'manager',
              message: 'Please select a manager:',
              // call function that returns an array of manager names from the database
              choices: queries.listManagers()
            }
          ])
          .then(answers => {
            // add new employee to the database
            queries.createEmployee(answers.firstName, answers.lastName, answers.title, answers.manager);
          });
          break;
      case 'Update an employee role':
        // prompt user for employee, role
        inquirer
          .prompt([
            {
              type: 'list',
              name: 'employee',
              message: 'Please select an employee:',
              choices: queries.listEmployees() // This query returns an empty array (see lines 92 - 125 of ./db/queries.js).
            },
            {
              type: 'list',
              name: 'title',
              message: 'Please select a title:',
              choices: queries.listTitles()
            }
          ])
          .then(answers => {
            console.log(answers);
            // update an employee role in the database 
            queries.updateEmployeeRole(answers.title, answers.name);
          });
          break;
      default:
    }
  });
};

promptUser();
