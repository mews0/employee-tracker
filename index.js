const inquirer = require('inquirer');
const userChoice = require('./db/query');

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
      choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
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
      case 'Add a department':
        userChoice.createDepartment(name); // this will not be the actual argument name
        break;
      case 'Add a role':
        userChoice.createRole(title, salary, department_id); // these will not be the actual argument names
        break;
      case 'Add an employee':
        userChoice.createEmployee(first_name, last_name, role_id); // these will not be the actual argument names
        break;
      case 'Update an employee role':
        userChoice.updateEmployeeRole(role_id, id); // these will not be the actual argument names
        break;
      default:
    }
  });
};

promptUser()
  .then(input => {
    // return something
  })
  .catch(err => {
    console.log(err);
  });
