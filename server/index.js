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
  const query = 'SELECT * FROM test.User Where Email = ? and Password = ?';

  con.query(query, [username, password], function(err, result) {
    if (err) throw err;

    if (result.length > 0) {
      res.json({ success: true, message: "Login successful" });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
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