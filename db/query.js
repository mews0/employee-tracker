const db = require(`./connection`);

let userChoice = {
  findAllDepartments() {
    const sql = `SELECT name, id FROM department`;
    // db.query();
    console.log('findAllDepartments');
  },

  findAllRoles() {
    const sql = `SELECT role.title, role.id, department.name AS department_name, role.salary FROM role LEFT JOIN department ON role.department_id = department.id`;
    // db.query();
    console.log('findAllRoles');
  },

  findAllEmployees() {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, employee.manager_id FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id`
    // db.query();
    console.log('findAllEmployees');
  },

  createDepartment(name) {
    const sql = `INSERT INTO department (name) VALUES (?)`;
    const params = name;
    // db.query();
    console.log('createDepartment');
  },

  createRole(title, salary, department_id) {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
    const params = [title, salary, department_id];
    // db.query();
    console.log('createRole');
  },

  createEmployee(first_name, last_name, role_id) {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
    const params = [first_name, last_name, role_id, manager_id]
    // db.query();
    console.log('createEmployee');
  },

  updateEmployeeRole(role_id, id) {
    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
    const params = [role_id, id]
    // db.query();
    console.log('updateEmployeeRole');
  }
}

module.exports = userChoice;