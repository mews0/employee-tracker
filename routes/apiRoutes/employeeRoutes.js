const express = require(`express`); // Import Node package Express
const router = express.Router();
const db = require(`../../db/connection`);
// const inputCheck = require(`../../utils/inputCheck`);

// Get all employees
router.get(`/employee`, (req, res) => {
  const sql = `SELECT * FROM employee`;

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

// Update an employee manager

// View employees by manager

// View employees by department

// View sum of all employee salaries in department

module.exports = router;