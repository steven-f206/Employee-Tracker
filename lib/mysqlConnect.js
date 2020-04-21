const mysql = require('mysql');
// Create Connection
const mysqlConnect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Phoenix1',
    database: 'employeetracker_db',
    port: 3306
});

module.export = mysqlConnect 