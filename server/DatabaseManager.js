const fs = require('fs');
const mysql = require('mysql2');

class DatabaseManager {
    constructor() {
        this.config = {
            host: "localhost",
            user: "root",
            password: "password",
            database: "my_database",
            port: 3306,
        };
        this.connection = null;
    }

    connect() {
        // Tracer
        console.log("TRACER DatabaseManager.js.connect: Attempting to connect to the database...");

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

    runTableScript(filePath) {
        // Tracer
        console.log(`TRACER DatabaseManager.js.runTableScript: Running SQL script from: ${filePath}`);

        return new Promise((resolve, reject) => {
            const sqlScript = fs.readFileSync(filePath, { encoding: 'utf-8' });
            const sqlCommands = sqlScript.split(';').filter(sql => sql.trim()); // Filter out any empty commands

            const runCommand = async (command) => {
                return new Promise((resolve, reject) => {
                    this.connection.query(command, (err, results, fields) => {
                        if (err) {
                            console.error(`Error executing command: ${err.message}`);
                            reject(err);
                        } else {
                            if (command.trim().toUpperCase().startsWith('SHOW')) {
                                console.log(results); // Log the result of SHOW TABLES
                            }
                            resolve();
                        }
                    });
                });
            };

            const executeCommands = async () => {
                for (const command of sqlCommands) {
                    await runCommand(command);
                }
                resolve(); // Resolve only after all commands have been executed
            };

            executeCommands().catch(reject);
        });
    }

    runProceduresScript(filePath) {
        // Tracer
        console.log("TRACER DatabaseManager.js.runProceduresScript: Attempting to connect to the database...");

        console.log(`Running SQL script with multiple statements from: ${filePath}`);
        const multiStatementConfig = { ...this.config, multipleStatements: true };
        const multiStatementConnection = mysql.createConnection(multiStatementConfig);

        return new Promise((resolve, reject) => {
            fs.readFile(filePath, { encoding: 'utf-8' }, (err, sqlScript) => {
                if (err) {
                    console.error(`Error reading SQL file: ${err.message}`);
                    reject(err);
                    return;
                }

                multiStatementConnection.query(sqlScript, (err, results) => {
                    multiStatementConnection.end(); // Ensure to close the connection after execution
                    if (err) {
                        console.error(`Error executing SQL script: ${err.message}`);
                        reject(err);
                    } else {
                        console.log('Multiple statements executed successfully');
                        resolve(results);
                    }
                });
            });
        });
    }


    //Used to display all procedures, to ensure everything went well
    runShowProcedures() {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT ROUTINE_NAME, ROUTINE_DEFINITION
                FROM information_schema.ROUTINES
                WHERE ROUTINE_SCHEMA = '${this.config.database}' AND ROUTINE_TYPE = 'PROCEDURE';
            `;
            this.connection.query(sql, (err, results) => {
                if (err) {
                    console.error('Error fetching procedures:', err.message);
                    reject(err);
                } else {
                    console.log('Stored Procedures:', results);
                    resolve(results);
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