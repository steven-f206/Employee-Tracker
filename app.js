const mysql = require('mysql');

// Create Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Phoenix1',
    database: 'bamazon'
});

//Connect DB
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...')
});

const app = express();

//Create DB
let sql = 'CREATE DATABASE bamazon';
db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('database created');
});