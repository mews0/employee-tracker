const inquirer = require('inquirer');
const userChoice = require('./db/query');
const choices = require('./choices');

/*
USER STORY
==========
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
*/

/*
ACCEPTANCE CRITERIA
===================
GIVEN a command-line application that accepts user input

WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids

WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database

WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database

WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
*/

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
        userChoice.findAllDepartments();
        break;
      case 'View all roles':
        userChoice.findAllRoles();
        break;
      case 'View all employees':
        userChoice.findAllEmployees();
        break;
      case 'Add new department':
        // prompt user for department name
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'department',
              message: 'Please enter new department name:'
              // *** VALIDATE USER INPUT ***
            }
          ])
          .then(answer => {
            // add new department to the database
            userChoice.createDepartment(answer.department);
          });
          break;
      case 'Add new role':
        // prompt user for title, salary, department id
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'role',
              message: 'Please enter title:'
              // *** VALIDATE USER INPUT ***
            },
            {
              type: 'number',
              name: 'salary',
              message: 'Please enter salary:'
              // *** VALIDATE USER INPUT ***
            },
            {
              type: 'list',
              name: 'department',
              message: 'Please select a department:',
              choices: choices.listDepartments() // *** CALL FUNCTION THAT RETURNS AN ARRAY OF DEPARTMENTS FROM DATABASE ***
            }
          ])
          .then(answers => {
            console.log(answers);
            // add new role to the database
            // userChoice.createRole(answers.role, answers.salary, answers.department); // *** LAST ARGUMENT NEEDS TO REFERENCE DEPARTMENT ID ***
          });
          break;
      case 'Add new employee':
        // prompt user for first name, last name, role, manager
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'firstName',
              message: 'Please enter first name:'
              // *** VALIDATE USER INPUT ***
            },
            {
              type: 'input',
              name: 'lastName',
              message: 'Please enter last name:'
              // *** VALIDATE USER INPUT ***
            },
            {
              type: 'list',
              name: 'title',
              message: 'Please select a title:',
              choices: ['a', 'b', 'c', 'd', 'e'] // *** CALL FUNCTION THAT RETURNS AN ARRAY OF TITLES FROM DATABASE ***
            },
            {
              type: 'list',
              name: 'manager',
              message: 'Please select a manager:',
              choices: ['a', 'b', 'c', 'd', 'e'] // *** CALL FUNCTION THAT RETURNS AN ARRAY OF MANAGERS FROM DATABASE ***
            }
          ])
          .then(answers => {
            console.log(answers);
            // userChoice.createEmployee(first_name, last_name, role, manager); // these will not be the actual argument names
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
              choices: ['a', 'b', 'c', 'd', 'e'] // *** CALL FUNCTION THAT RETURNS AN ARRAY OF EMPLOYEES FROM DATABASE *** 
            },
            {
              type: 'list',
              name: 'title',
              message: 'Please select a title:',
              choices: ['a', 'b', 'c', 'd', 'e'] // *** CALL FUNCTION THAT RETURNS AN ARRAY OF TITLES FROM DATABASE ***
            }
          ])
          .then(answers => {
            console.log(answers);
            // userChoice.updateEmployeeRole(role_id, id); // these will not be the actual argument names
          });
          break;
      default:
    }
  });
};

promptUser()
  .then(input => {
    // *** RETURN SOMETHING ***
  })
  .catch(err => {
    console.log(err);
  });
