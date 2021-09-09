const db = require(`./connection`);

let userChoice = {
  findAllDepartments() {
    // sql = `SELECT name, id FROM department`;
    // db.query();
    console.log('findAllDepartments');
  },
  findAllRoles() {
    // sql = `SELECT role.title, role.id, department.name AS department_name, role.salary FROM role LEFT JOIN department ON role.department_id = department.id`;
    // db.query();
    console.log('findAllRoles');
  },
  findAllEmployees() {
    // sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, employee.manager_id FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id`
    // db.query();
    console.log('findAllEmployees');
  },
  createDepartment() {
    // sql = `INSERT INTO department (name) VALUES (?)`;
    // params = name;
    // db.query();
    console.log('createDepartment');
  },
  createRole() {
    // sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
    // params = [title, salary, department_id];
    // db.query();
    console.log('createRole');
  },
  createEmployee() {
    // sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
    // params = [first_name, last_name, role_id, manager_id]
    // db.query();
    console.log('createEmployee');
  },
  updateEmployeeRole() {
    // sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
    // params = [role_id, id]
    // db.query();
    console.log('updateEmployeeRole');
  }
}

module.exports = userChoice;