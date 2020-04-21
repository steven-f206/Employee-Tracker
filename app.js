const mysql = require('mysql');
const cTable = require('console.table');

const cli = require('./lib/cli');

// Create Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Phoenix1',
    database: 'employeetracker_db',
    port: 3306
});

//Connect DB

let init = () => {
    connection.connect();
    console.log("----------------------------------------------------");
    console.log("                 Employee Tracker                   ");
    console.log("----------------------------------------------------");

    connection.query(`
        SELECT * FROM employee 
        INNER JOIN role on role.id = employee.id
        INNER JOIN department on department.id = role.department_id;`,
        (err, res) => {
            let employeeTable = [];
            res.forEach((employee) => {
                employeeTable.push({ 'id': employee.id, 'First Name': employee.first_name, 'Last Name': employee.last_name, 'Title': employee.role_id, 'Manager': employee.manager_id });
            });
            // console.log(employeeTable);

            console.table(
                employeeTable
            );
            cli();
        });

    connection.end();

};


init(); 