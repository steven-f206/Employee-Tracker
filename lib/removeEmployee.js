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


connection.connect();

let employeeInquiry = (employeeInfo) => {

    let employeeNames = [];

    (function () {
        employeeInfo.forEach((employeeName) => {
            employeeNames.push(employeeName.employee);
        })
    }());


    inquirer.prompt([{
        type: "list",
        name: 'employeeName',
        message: 'Which employee do you wish to remove?',
        choices: employeeNames,
    }])
        .then((answers) => {

            function employeeSearch(employeeKey, myArray) {
                for (var i = 0; i < myArray.length; i++) {
                    if (myArray[i].employee === employeeKey) {
                        return myArray[i];
                    }
                }
            }
            let employeeId = employeeSearch(answers.employeeName, employeeInfo);

            connection.query(`DELETE FROM employee WHERE id = ${employeeId.id} ;`, (err, res) => {
                if (err) throw err
            });
            connection.end();

        });
}


let getEmployees = () => {
    let employeeInfo = [];
    connection.query(`
  SELECT id, CONCAT(first_name, ' ',last_name) AS employee FROM employee;`,
        (err, res) => {
            res.forEach((employee) => {
                employeeInfo.push({
                    "id": employee.id,
                    "employee": employee.employee
                }
                );
            });
            employeeInquiry(employeeInfo);
        });
}


let removeEmployee = () => {
    getEmployees();
}

module.exports = removeEmployee;