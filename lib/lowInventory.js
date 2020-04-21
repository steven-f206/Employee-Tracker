let mysql = require("mysql");
let Table = require("cli-table2");

let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Phoenix1",
    database: "bamazon_db",
    port: 3306
})

connection.connect();

let lowInventory = () => {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", (err, res) => {
        if (err) throw err;
        console.log("----------------------------------------------------");
        console.log("               Welcome to Bamazon                   ");
        console.log("----------------------------------------------------");
        console.log("");
        console.log("Below is a list of items low in stock in the store.");
        console.log("");

        let table = new Table({
            head: ["Producst Id", "Product Descripton", "Cost", "Stock"],
            colWidths: [12, 50, 8],
            colAligns: ["center", "left", "right", "right"],
            style: {
                head: ["aqua"],
                compact: true
            }
        });
        res.forEach((product) => {
            table.push([product.id, product.products_name, product.price, product.stock_quantity]);
        });
        console.log(table.toString());
        console.log("");
    });
    connection.end();
}

module.exports = lowInventory; 