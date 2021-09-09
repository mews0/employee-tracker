const db = require(`./connection`);

let userChoice = {
  findAllDepartments() {
    const sql = `SELECT name, id FROM department`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.log('Error.');
        return;
      }
      console.log(rows);
    });
  },

  findAllRoles() {
    const sql = `SELECT role.title, role.id, department.name AS department_name, role.salary FROM role LEFT JOIN department ON role.department_id = department.id`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.log('Error.');
        return;
      }
      console.log(rows);
    });
  },

  findAllEmployees() {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, employee.manager_id FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id`
    db.query(sql, (err, rows) => {
      if (err) {
        console.log('Error.');
        return;
      }
      console.log(rows);
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

  createEmployee(first_name, last_name, role_id) {
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