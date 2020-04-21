let inquirer = require("inquirer");
const mysql = require('mysql');

// Create Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Phoenix1',
    database: 'employeetracker_db',
    port: 3306
});

let addDepartment = (cli) => {

    inquirer.prompt([{
        type: "input",
        name: "department",
        message: "What is the department you wish to add?",
    }])
        .then((answers) => {

            connection.query(`INSERT INTO department (name) VALUES ('${answers.department}')`, (err, res) => {
                if (err) throw err
            });
            connection.end();
            cli();
        });
}

module.exports = addDepartment;