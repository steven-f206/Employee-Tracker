const mysql = require('mysql');
const cTable = require('console.table');

// Create Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employeetracker_db',
    port: 3306
});


let viewEmployeesByManager = (cli) => {
    connection.connect();

    connection.query(`
  SELECT CONCAT(e2.first_name, ' ', e2.last_name) AS manager, e1.id, e1.first_name, e1.last_name, role.title, department.name AS department, role.salary FROM employee as e1
  LEFT JOIN role on e1.role_id = role.id
  LEFT JOIN department on role.department_id = department.id
  INNER JOIN employee as e2 on e2.id = e1.manager_id
  ORDER BY manager ASC ;`
        ,
        (err, res) => {
            let employeeTable = [];
            res.forEach((employee) => {
                employeeTable.push(
                    {
                        'department': employee.department,
                        'id': employee.id,
                        'first_name': employee.first_name,
                        'last_name': employee.last_name,
                        'title': employee.title,
                        'salary': employee.salary,
                        'manager': employee.manager
                    });
            });
            // console.log(employeeTable);

            console.table(
                employeeTable
            );
            cli();
        });

    connection.end();

}

module.exports = viewEmployeesByManager; 