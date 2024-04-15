// testaReactNode/index.js


const express = require("express");


const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());


var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost", //här får man lägga till sina egna inställningar om man vill fixa
  user: "newuser",
  password: "hejpådigapa",
  database: "test",
  port: 3306
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const callProcedure = 'CALL login_user(?, ?)';

  con.query(callProcedure, [username, password], function(err, result, fields) {
    if (err) {
      console.error("Database error:", err);
      res.status(500).json({ success: false, message: err.sqlMessage || "Database error" });
      return;
    }

    // Assuming the message is returned as part of the first result set
    const message = result[0][0].message;
    if (message === "Login successful") {
      res.json({ success: true, message: "Login successful" });
    } else {
      res.json({ success: false, message: message }); // Use the message from the stored procedure
    }
  });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post("/register", async (req, res) => {
  const { username, email, firstName, lastName, password } = req.body;

  const callProcedure = 'CALL register_user(?, ?, ?, ?, ?)';
    
  con.query(callProcedure, [username, email, firstName, lastName, password], function(err, result) {
    if (err) {
        console.error("Database error:", err);
        res.status(500).json({ success: false, message: err.sqlMessage || "Database error" });
    } else {
        res.json({ success: true, message: "User registered successfully" });
    }
});
});

/*
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/asdlogin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const query = 'SELECT * FROM public."Users" WHERE "User_Email" = $1 AND "User_Password" = $2';
    
    const result = await pool.query(query, [username, password]);
    if (result.rows.length > 0) {
      res.json({ success: true, message: "Login successful" });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
*/

//require('dotenv').config({ path: './yoo.env' });
//const { Pool } = require('pg');
/*
  const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
*/