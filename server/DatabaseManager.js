const fs = require('fs');
const mysql = require('mysql2');

class DatabaseManager {
    constructor() {
        this.config = {
            host: "localhost",
            user: "root",
            password: "password",
            database: "AI_Exam_Web_App_DB",
            port: 3306
        };
        this.connection = null;
    }

    connect() {
        return new Promise((resolve, reject) => {
            if (this.connection) {
                resolve();
            } else {
                this.connection = mysql.createConnection(this.config);
                this.connection.connect(err => {
                    if (err) {
                        console.error('Failed to connect to database:', err);
                        reject(err);
                    } else {
                        console.log('Successfully connected to the database.');
                        resolve();
                    }
                });
            }
        });
    }

    runSqlScript(filePath) {
        return new Promise((resolve, reject) => {
            const sqlScript = fs.readFileSync(filePath, { encoding: 'utf-8' });
            const sqlCommands = sqlScript.split(';');

            sqlCommands.forEach((sql, index) => {
                if (sql.trim()) {
                    this.connection.query(sql, (err, results, fields) => {
                        if (err) {
                            console.error(`Error executing command from ${filePath}: ${err.message}`);
                            reject(err);
                        } else {
                            if (sql.trim().toUpperCase().startsWith('SHOW')) {
                                console.log(results); // This will log the result of SHOW TABLES
                            }
                            if (index === sqlCommands.length - 1) { // Check if it's the last command
                                resolve();
                            }
                        }
                    });
                }
            });
        });
    }

    close() {
        if (this.connection) {
            this.connection.end();
        }
    }
}

module.exports = DatabaseManager;