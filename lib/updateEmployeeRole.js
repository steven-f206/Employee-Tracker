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

let updateEmployeeRoleInquiry = (cli, employees, roles) => {

    let employeeNames = [];

    (function () {
        employees.forEach((employee) => {
            employeeNames.push(employee.full_name);
        })
    }());

    let roleTitles = [];

    (function () {
        roles.forEach((roles) => {
            roleTitles.push(roles.title);
        })
    }());

    inquirer.prompt([{
        type: "list",
        name: 'employee',
        message: 'Which employees role would you like to change?',
        choices: employeeNames,
    },
    {
        type: "list",
        name: 'role',
        message: 'Which role would you like them to have?',
        choices: roleTitles,
    }])
        .then((answers) => {

            function roleSearch(roleKey, myArray) {
                for (var i = 0; i < myArray.length; i++) {
                    if (myArray[i].title === roleKey) {
                        return myArray[i];
                    }
                }
            }
            let rolesId = roleSearch(answers.role, roles);

            function roleSearch(employeeKey, myArray) {
                for (var i = 0; i < myArray.length; i++) {
                    if (myArray[i].title === employeeKey) {
                        return myArray[i];
                    }
                }
            }
            let employeeInfo = roleSearch(answers.employees, employees);

            connection.query(`
        UPDATE employee 
        SET role_id = ${rolesId.id} 
        WHERE first_name = '${employeeInfo.first_name}' AND last_name = '${employeeInfo.last_name}'`, (err, res) => {
                if (err) throw err
            });
            connection.end();
            cli();
        });

}

let getRoles = (cli, employees) => {
    let roles = [];
    connection.query(`
  SELECT * FROM role;`,
        (err, res) => {
            res.forEach((role) => {
                roles.push({
                    "id": role.id,
                    "title": role.title
                }
                );
            });
            updateEmployeeRoleInquiry(cli, employees, roles);
        });
}


let getEmployees = (cli) => {
    let employees = [];
    connection.query(`
  SELECT id, first_name, last_name, CONCAT(first_name, ' ', last_name) AS full_name FROM employee;;`,
        (err, res) => {
            res.forEach((employee) => {
                employees.push({
                    "id": employee.id,
                    "first_name": employee.first_name,
                    "last_name": employee.last_name,
                    "full_name": employee.full_name
                }
                );
            });
            getRoles(cli, employees);
        });
}

let updateEmployeeRole = (cli) => {
    getEmployees(cli)
}

module.exports = updateEmployeeRole; 