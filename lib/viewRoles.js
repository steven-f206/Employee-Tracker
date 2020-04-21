const mysql = require('mysql');
const cTable = require('console.table');

const connection = require('./connection');

// Queries than console logs roles
let viewRoles = (cli) => {

    connection.query(`
  SELECT id, title, salary, department_id FROM role;`
        ,
        (err, res) => {
            let roleTable = [];
            res.forEach((role) => {
                roleTable.push(
                    {
                        'id': role.id,
                        'title': role.title,
                        'salary': role.salary,
                        'last_name': role.last_name,
                        'department_id': role.department_id,
                    });
            });

            console.table(
                roleTable
            );
            cli();
        });

}

module.exports = viewRoles; 