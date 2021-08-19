const express = require(`express`); // Import Node package Express
const router = express.Router();
const db = require(`../../db/connection`);
// const inputCheck = require(`../../utils/inputCheck`);

// Get all roles
router.get(`/role`, (req, res) => {
  const sql = `SELECT * FROM role`;

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

// Add a role
router.post(`/role`, ({ body }, res) => {
  // const errors = inputCheck(
  //   body,
  //   `title`,
  //   `salary`,
  //   `department_id`
  // );
  // if (errors) {
  //   res.status(400).json({ error: errors });
  //   return;
  // }

  const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
  const params = [
    body.title,
    body.salary,
    body.department_id
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

// Delete a role
router.delete(`/role/:id`, (req, res) => {
  const sql = `DELETE FROM role WHERE id = ?`;

  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: `role not found`
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

module.exports = router;