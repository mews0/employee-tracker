const db = require('./connection');
const cTable = require('console.table');

const queries = {
  // return all records from department table
  findAllDepartments() {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.error('Error.');
        return;
      }
      return console.table(JSON.parse(JSON.stringify(rows)));
    });
  },

  // return array of department names
  listDepartments() {
    const list = [];
    const sql = `SELECT name FROM department`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.error('Error.');
        return;
      }
      const arr = JSON.parse(JSON.stringify(rows));
      for (let i = 0; i < arr.length; i++) {
        list.push(arr[i].name);
      }
    });
    return list;
  },

  // return all records from role table
  findAllRoles() {
    const sql = `SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.error('Error.');
        return;
      }
      return console.table(JSON.parse(JSON.stringify(rows)));
    });
  },

  // return array of role titles
  listTitles() {
    const list = [];
    const sql = `SELECT title FROM role`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.error('Error.');
        return;
      }
      const arr = JSON.parse(JSON.stringify(rows));
      for (let i = 0; i < arr.length; i++) {
        list.push(arr[i].title);
      }
    });
    return list;
  },

  // return all records from employee table
  findAllEmployees() {
    const sql = `SELECT emp.id, emp.first_name, emp.last_name, role.title, department.name AS department, role.salary, CONCAT(mgr.first_name, ' ', mgr.last_name) AS manager FROM employee emp LEFT JOIN employee mgr ON emp.manager_id = mgr.id LEFT JOIN role ON emp.role_id = role.id LEFT JOIN department ON role.department_id = department.id`
    db.query(sql, (err, rows) => {
      if (err) {
        console.error('Error.');
        return;
      }
      return console.table(JSON.parse(JSON.stringify(rows)));
    });
  },

  // return array of manager names
  listManagers() {
    const list = [];
    const sql = `SELECT CONCAT(first_name, ' ', last_name) AS name FROM employee WHERE manager_id IS NULL`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.error('Error.');
        return;
      }
      const arr = JSON.parse(JSON.stringify(rows));
      for (let i = 0; i < arr.length; i++) {
        list.push(arr[i].name);
      }
    });
    return list;
  },

  // return array of employee names
  listEmployees() {
    const list = [];
    const sql = `SELECT CONCAT(first_name, ' ', last_name) AS name FROM employee`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.error('Error.');
        return;
      }
      const arr = JSON.parse(JSON.stringify(rows));
      for (let i = 0; i < arr.length; i++) {
        list.push(arr[i].name);
      }
      console.log(list); // *** LIST IS DISPLAYING AS INTENDED HERE ***
    });
    console.log(list); /* LIST IS NOT DISPLAYING AS INTENDED HERE, AND I AM STRUGGLING TO FIGURE OUT WHY.
    LISTMANAGERS() WORKS, AND IT IS IDENTICAL TO LISTEMPLOYEES() EXCEPT FOR THE VALUE IN SQL. */ 
    return list;
  },

  // create new record in department table
  createDepartment(name) {
    const sql = `INSERT INTO department (name) VALUES (?)`;
    const params = name;
    db.query(sql, params, (err, result) => {
      if (err) {
        console.error('Error.');
        return;
      }
      console.log(result);
    });
  },

  // create new record in role table
  createRole(title, salary, department_id) {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
    const params = [title, salary, department_id];
    db.query(sql, params, (err, result) => {
      if (err) {
        console.error('Error.');
        return;
      }
      console.log(result);
    });
  },

  // create new record in employee table
  createEmployee(first_name, last_name, role_id, manager_id) {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
    const params = [first_name, last_name, role_id, manager_id]
    db.query(sql, params, (err, result) => {
      if (err) {
        console.error('Error.');
        return;
      }
      console.log(result);
    });
  },

  // update a role in employee table
  updateEmployeeRole(role_id, id) {
    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
    const params = [role_id, id]
    db.query(sql, params, (err, result) => {
      if (err) {
        console.error('Error.');
      } else if (!result.affectedRows) {
        console.log('Employee not found.');
      } else {
        console.log(result);
      }
    });
  }
}

module.exports = queries;