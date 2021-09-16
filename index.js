const inquirer = require('inquirer');
const queries = require('./db/queries');

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
              name: 'role',
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
            console.log(answers); // e.g., answers = { role: 'Business Systems Analyst', salary: '50000', department: 'IT' }
            // *** ADD NEW ROLE TO THE DATABASE *** 
            /*
            INSERT INTO role
            VALUES (answers.role, answers.salary, (SELECT id FROM department WHERE name = answers.department))
            */
            // queries.createRole(answers.role, answers.salary, department.id);
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
            console.log(answers); // e.g., answers = {firstName: 'John', lastName: 'Doe', title: 'Worker', manager: 'Boss Man'}
            // *** ADD NEW EMPLOYEE TO THE DATABASE *** 
            /*
            INSERT INTO employee
            VALUES (answers.firstName, answers.lastName, (SELECT id FROM role WHERE title = answers.title), (SELECT id FROM employee WHERE CONCAT(first_name, last_name) AS name = answers.manager))
            */
            // queries.createEmployee(first_name, last_name, role, manager);
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
              choices: queries.listEmployees()
            },
            {
              type: 'list',
              name: 'title',
              message: 'Please select a title:',
              choices: queries.listTitles()
            }
          ])
          .then(answers => {
            console.log(answers); // e.g., answers = {employee: 'Joe Blow', title: 'Worker'}
            // *** UPDATE AN EMPLOYEE ROLE IN THE DATABASE *** 
            /*
            UPDATE employee
            SET role_id = (SELECT id FROM role WHERE title = answers.title)
            WHERE id = (SELECT id FROM employee WHERE CONCAT(first_name, last_name) AS name = answers.manager)
            */
            // queries.updateEmployeeRole(role_id, id); // these will not be the actual argument names
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
