const mysql = require('mysql');
const cTable = require('console.table');

const connection = require('./connection');

// Queries than console logs departments
let viewDepartments = (cli) => {

    connection.query(`
  SELECT id, name FROM department`
        ,
        (err, res) => {
            let departmentTable = [];
            res.forEach((department) => {
                departmentTable.push(
                    {
                        'id': department.id,
                        'name': department.name,
                    });
            });

            console.table(
                departmentTable
            );
            cli();
        });

}

module.exports = viewDepartments; 