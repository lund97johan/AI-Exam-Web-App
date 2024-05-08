const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Helper function to run an SQL script
function runScript(filePath, connection, callback) {
    console.log(`Executing script: ${filePath}`);
    const script = fs.readFileSync(filePath, { encoding: 'utf-8' });
    connection.query(script, function(err, results) {
        if (err) {
            console.error(`Error executing script ${filePath}: ${err}`);
            return callback(err);
        }
        console.log(`Script ${filePath} executed successfully`);
        callback(null, results);
    });
}

function initializeDatabase() {
    const connection = mysql.createConnection({
        host: "localhost", //här får man lägga till sina egna inställningar om man vill fixa
        user: "newuser",
        password: "hejpådigapa",
        database: "AI_Exam_Web_App_DB",
        port: 3306,
        multipleStatements: true  // Ensure this is true if your script contains multiple SQL statements
    });

    connection.connect(err => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        console.log('Connected to the database.');

        // Define the paths to your SQL files
        const dbScriptPath = path.join(__dirname, 'sql', 'create_db.sql');
        const procedureScriptPath = path.join(__dirname, 'sql', 'create_procedures.sql');

        // Execute scripts in sequence
        runScript(dbScriptPath, connection, err => {
            if (err) {
                connection.end();
                return;
            }
            runScript(procedureScriptPath, connection, err => {
                connection.end();
                if (err) return;
                console.log('All necessary scripts executed successfully');
            });
        });
    });
}

module.exports = initializeDatabase;