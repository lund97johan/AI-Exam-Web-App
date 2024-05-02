const fs = require('fs');
const mysql = require('mysql');

class DatabaseManager {
    constructor(config) {
        // Define the database connection configuration internally
        this.config = {
            host: "localhost",
            user: "newuser",
            password: "hejpådigapa",
            database: "test",
            port: 3306
        };
        this.connection = null;  // Initially, there is no connection
    }

    // Method to establish a database connection
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

    // Method to run SQL script from a file
    runSqlScript(filePath) {
        return new Promise((resolve, reject) => {
            const sqlScript = fs.readFileSync(filePath, { encoding: 'utf-8' });
            const sqlCommands = sqlScript.split(';');

            sqlCommands.forEach(sql => {
                if (sql.trim()) {
                    this.connection.query(sql, (err, result) => {
                        if (err) {
                            console.error(`Error executing command from ${filePath}: ${err.message}`);
                            reject(err);
                        }
                        console.log(`Successfully executed command from ${filePath}`);
                    });
                }
            });
            resolve();
        });
    }

    // Method to close the database connection
    close() {
        if (this.connection) {
            this.connection.end();
        }
    }
}

module.exports = DatabaseManager;