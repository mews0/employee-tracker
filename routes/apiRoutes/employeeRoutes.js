const express = require(`express`); // Import Node package Express
const router = express.Router();
const db = require(`../../db/connection`);
// const inputCheck = require(`../../utils/inputCheck`);

// Get all employees
router.get(`/employees`, (req, res) => {
  const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, employee.manager_id
               FROM employee
               LEFT JOIN role
               ON employee.role_id = role.id
               LEFT JOIN department
               ON role.department_id = department.id`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: `success`,
      data: rows
    });
  });
});

// Add an employee
router.post(`/employee`, ({ body }, res) => {
  // const errors = inputCheck(
  //   body,
  //   `first_name`,
  //   `last_name`,
  //   `role_id`,
  //   `manager_id`
  // );
  // if (errors) {
  //   res.status(400).json({ error: errors });
  //   return;
  // }

  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
  const params = [
    body.first_name,
    body.last_name,
    body.role_id,
    body.manager_id
  ];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: `success`,
      data: body
    });
  });
});

// Delete an employee
router.delete(`/employee/:id`, (req, res) => {
  const sql = `DELETE FROM employee WHERE id = ?`;

  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: `employee not found`
      });
    } else {
      res.json({
        message: `deleted`,
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

// Update an employee role
router.put(`/employee-role/:id`, (req, res) => {
  // const errors = inputCheck(req.body, `role_id`);
  // if (errors) {
  //   res.status(400).json({ error: errors });
  //   return;
  // }

  const sql = `UPDATE employee SET role_id = ? 
               WHERE id = ?`;
  const params = [req.body.role_id, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: `Employee not found`
      });
    } else {
      res.json({
        message: `success`,
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});


// Update an employee manager
router.put(`/employee-manager/:id`, (req, res) => {
  // const errors = inputCheck(req.body, `manager_id`);
  // if (errors) {
  //   res.status(400).json({ error: errors });
  //   return;
  // }

  const sql = `UPDATE employee SET manager_id = ? 
               WHERE id = ?`;
  const params = [req.body.manager_id, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: `Employee not found`
      });
    } else {
      res.json({
        message: `success`,
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});

// View employees by manager
// router.get(`/employee-manager`, (req, res) => {
//   const sql;
//   const params;

//   db.query();
// });

// View employees by department
// router.get(`/employee-department`, (req, res) => {
//   const sql;
//   const params;

//   db.query();
// });

// View sum of all employee salaries by department
router.get(`/employee-salaries`, (req, res) => {
  const sql = `SELECT department.name AS department, SUM(role.salary) AS total_salaries
               FROM department
               LEFT JOIN role
               ON department.id = role.department_id
               GROUP BY department.name;`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: `success`,
      data: rows
    });
  });
});

module.exports = router;