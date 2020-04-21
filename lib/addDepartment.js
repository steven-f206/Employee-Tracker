let inquirer = require("inquirer");
const mysql = require('mysql');

const connection = require("./connection.js");

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
            cli();
        });
}

module.exports = addDepartment;