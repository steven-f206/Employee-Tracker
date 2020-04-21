const mysql = require('mysql');
const cTable = require('console.table');

// Create Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Phoenix1',
    database: 'employeetracker_db',
    port: 3306
});


let viewDepartments = () => {
    connection.connect();

    connection.query(`
  SELECT * FROM department`,
        (err, res) => {
            let departmentTable = [];
            res.forEach((department) => {
                departmentTable.push({ 'id': department.id, 'department': department.name });
            });

            console.table(
                departmentTable
            );
        });

    connection.end();
}

module.exports = viewDepartments; 