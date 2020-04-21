let mysql = require("mysql");
let inquirer = ("inquirer");
let Table = require("cli-table2");


let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "bamazon_db",
    port: 3306
})

connection.connect();

let display = () => {
    connection.query("SELECT * FROM products", (err, res) => {
        if (err) throw err;
        console.log("----------------------------------------------------");
        console.log("               Welcome to Bamazon                   ");
        console.log("----------------------------------------------------");
        console.log("");
        console.log("Find Your Product Below");
        console.log("");

        let table = new Table({
            head: ["Producst Id", "Product Descripton", "Cost"],
            colWidths: [12, 50, 8],
            colAligns: ["center", "left", "right"],
            style: {
                head: ["aqua"],
                compact: true
            }
        });
        res.forEach((product) => {
            table.push([product.id, product.products_name, product.price]);
        });
        console.log(table.toString());
        console.log("");
    });
};

display(); 