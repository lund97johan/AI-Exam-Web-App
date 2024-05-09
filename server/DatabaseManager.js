// Importing file system module for file operations
const fs = require('fs');

// Importing MySQL driver, ensure version 2.x for compatibility with current methods
const mysql = require('mysql2');

/**
 * Manages database operations including connecting to the database,
 * executing SQL scripts, and closing the database connection.
 * @class
 * @classdesc This class provides methods to manage database operations like connection,
 * script execution, and closing the connection.
 * @author Mattias Fridsén
 */
class DatabaseManager {
    /**
     * Constructs a new instance of the DatabaseManager class with default database configuration.
     */
    constructor() {
        this.config = {
            host: "localhost",
            user: "newuser",
            password: "hejpådigapa",
            database: "AI_Exam_Web_App_DB",
            port: 3306,
        };
        this.connection = null;
    }

    /**
     * Connects to the database. If a connection is already established, it returns a resolved promise.
     * @returns {Promise<void>} A promise that resolves if the connection is successful, or rejects if it fails.
     */
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

    //TODO JSDoc
    initializeDatabase() {
        console.log("Initializing database...");
        return this.connect()
            .then(() => this.runTableScript('sql/create_db.sql'))
            .then(() => this.runTableScript('sql/sample_data.sql'))
            .then(() => this.runProceduresScript('sql/create_procedures.sql'))
            //.then(() => this.runShowProcedures())
            /*.then(procedures => {
                console.log('Procedures:', procedures);
            })*/
            .catch(err => {
                console.error('An error occurred during database initialization:', err);
                throw err;  // Re-throw to allow caller to handle it
            });
    }

    /**
     * Closes the database connection if it exists.
     */
    close() {
        if (this.connection) {
            this.connection.end();
        }
    }

    /**
     * Executes a SQL script that consists of multiple table-related commands from a file.
     * @param {string} filePath - The path to the SQL script file.
     * @returns {Promise<void>} A promise that resolves when all commands have been executed, or rejects if an error occurs.
     */
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

    /**
     * Executes a SQL script with multiple stored procedures from a specified file.
     * @param {string} filePath - The path to the file containing the SQL procedures.
     * @returns {Promise<void>} A promise that resolves when all procedures are executed, or rejects if an error occurs.
     */
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

    /**
     * Retrieves and displays all stored procedures from the database schema.
     * @returns {Promise<Array>} A promise that resolves with the stored procedures, or rejects if an error occurs.
     */
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

    /**
     * Calls a stored procedure to delete a quiz by its ID.
     * @param {number} quizId - The ID of the quiz to delete.
     * @returns {Promise<void>} A promise that resolves when the quiz is deleted or rejects if an error occurs.
     */
    deleteQuizById(quizId) {
        return new Promise((resolve, reject) => {
            this.connect().then(() => {
                const sql = 'CALL DeleteQuiz(?)';
                this.connection.query(sql, [quizId], (err, results, fields) => {
                    if (err) {
                        console.error(`Error when calling DeleteQuiz: ${err.message}`);
                        reject(err);
                    } else {
                        console.log('DeleteQuiz executed successfully', results);
                        resolve();
                    }
                });
            }).catch(err => {
                console.error('Failed to connect to database:', err);
                reject(err);
            });
        });
    }

    //TODO JSDoc
    runQuery(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, params, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    }

    getConnection() {
        return this.connection;  // This exposes the connection object
    }

}

module.exports = DatabaseManager;