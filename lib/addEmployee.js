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

//Get roles

connection.connect();

let employeeInquiry = (cli, roles, managers) => {

    let roleTitles = [];

    (function () {
        roles.forEach((role) => {
            roleTitles.push(role.title);
        })
    }());

    let managerNames = ['None'];

    (function () {
        managers.forEach((person) => {
            managerNames.push(person.manager);
        })
    }());


    inquirer.prompt([{
        type: "input",
        name: "first_name",
        message: "What is the employees first name?",
    },
    {
        type: "input",
        name: "last_name",
        message: "What is the employees last name?",
    },
    {
        type: "list",
        name: 'role',
        message: 'What is the employees role?',
        choices: roleTitles,
    },
    {
        type: "list",
        name: 'manager',
        message: 'Who is the employees manager?',
        choices: managerNames,
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

            function managerSearch(managerKey, myArray) {
                for (var i = 0; i < myArray.length; i++) {
                    if (myArray[i].manager === managerKey) {
                        return myArray[i];
                    }
                }
            }

            let managersId;
            if (answers.manager === "None") {
                managersId = { 'id': null }
            } else {
                managersId = managerSearch(answers.manager, managers);
            }


            connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id ) VALUES ('${answers.first_name}', '${answers.last_name}', ${rolesId.id}, ${managersId.id})`, (err, res) => {
                if (err) throw err
            });
            cli();
            connection.end();
        });


}

let getManagers = (cli, roles) => {
    let managers = [];
    connection.query(`
        SELECT e1.manager_id, CONCAT(e2.first_name, ' ', e2.last_name) AS manager FROM employee as e1
        INNER JOIN employee as e2 on e2.id = e1.manager_id;`,
        (err, res) => {
            res.forEach((manager) => {
                managers.push({
                    "id": manager.manager_id,
                    "manager": manager.manager
                }
                );
            });
            employeeInquiry(cli, roles, managers);
        });
}

let getRoles = (cli) => {
    let roles = [];
    connection.query(`
    SELECT * from role;`,
        (err, res) => {
            res.forEach((role) => {
                roles.push({
                    "title": role.title,
                    "id": role.id
                }
                );
            });
            getManagers(cli, roles);
        });
}


let addEmployee = (cli) => {
    getRoles(cli);
}

module.exports = addEmployee; 