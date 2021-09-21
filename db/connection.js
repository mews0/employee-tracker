const mysql = require('mysql2'); // Import Node package MySQL 2
require('dotenv').config();

const db = mysql.createConnection( // Connect to database
  {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
  },
  console.log('Connected to the company database.')
);

module.exports = db; 