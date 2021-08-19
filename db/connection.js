const mysql = require(`mysql2`); // Import Node package MySQL 2

const db = mysql.createConnection( // Connect to database
  {
    host: `localhost`,
    // Your MySQL username,
    user: `root`,
    // Your MySQL password
    password: `7rZKkuiWxn^!nrZ19nn4vjgH`,
    database: `company`
  },
  console.log(`Connected to the company database.`)
);

module.exports = db;