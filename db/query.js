const db = require('./connection');
const cTable = require('console.table');

const userChoice = {
  findAllDepartments() {
    const sql = `SELECT id, name FROM department`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.log('Error.');
        return;
      }
      console.table(JSON.parse(JSON.stringify(rows)));
    });
  },

  findAllRoles() {
    const sql = `SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.log('Error.');
        return;
      }
      console.table(JSON.parse(JSON.stringify(rows)));
    });
  },

  findAllEmployees() {
    const sql = `SELECT emp.id, emp.first_name, emp.last_name, role.title, department.name AS department, role.salary, CONCAT(mgr.first_name, ' ', mgr.last_name) AS manager FROM employee emp LEFT JOIN employee mgr ON emp.manager_id = mgr.id LEFT JOIN role ON emp.role_id = role.id LEFT JOIN department ON role.department_id = department.id`
    db.query(sql, (err, rows) => {
      if (err) {
        console.log('Error.');
        return;
      }
      console.table(JSON.parse(JSON.stringify(rows)));
    });
  },

  createDepartment(name) {
    const sql = `INSERT INTO department (name) VALUES (?)`;
    const params = name;
    db.query(sql, params, (err, result) => {
      if (err) {
        console.log('Error.');
        return;
      }
      console.log(result);
    });
  },

  createRole(title, salary, department_id) {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
    const params = [title, salary, department_id];
    db.query(sql, params, (err, result) => {
      if (err) {
        console.log('Error.');
        return;
      }
      console.log(result);
    });
  },

  createEmployee(first_name, last_name, role_id, manager_id) {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
    const params = [first_name, last_name, role_id, manager_id]
    db.query(sql, params, (err, result) => {
      if (err) {
        console.log('Error.');
        return;
      }
      console.log(result);
    });
  },

  updateEmployeeRole(role_id, id) {
    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
    const params = [role_id, id]
    db.query(sql, params, (err, result) => {
      if (err) {
        console.log('Error.');
      } else if (!result.affectedRows) {
        console.log('Employee not found.');
      } else {
        console.log(result);
      }
    });
  }
}

module.exports = userChoice;