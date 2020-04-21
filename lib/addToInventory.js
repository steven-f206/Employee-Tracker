let inquirer = require("inquirer");
let mysql = require("mysql");

let managerDisplay = require('./managerDisplay.js');

let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Phoenix1",
    database: "bamazon_db",
    port: 3306
})

connection.connect();

let addToInventory = () => {
    inquirer.prompt({
        name: "inventoryToUpdate",
        type: "input",
        message: "Please enter the product Id of the item you wish to add to stock.",
    }).then((answer1) => {

        let selection = answer1.inventoryToUpdate;
        connection.query("SELECT * FROM products WHERE id=?", selection, (err, res) => {
            if (err) throw err;
            if (res.length === 0) {
                console.log("That Product doesn't exist, Please enter a product Id from the list above")
                addToInventory();
            } else {
                inquirer.prompt({
                    name: "quantity",
                    type: "input",
                    message: "How many of the item would you like to add?"
                }).then((answer2) => {
                    let quantity = answer2.quantity;
                    if (quantity + res[0].stock_quantity >= 1000000000) {
                        console.log(`Our Apologies we can't carry that many of that item at one time.`);
                        addToInventory();
                    } else {

                        var newQuantity = parseInt(res[0].stock_quantity) + parseInt(quantity);
                        connection.query(
                            `UPDATE products SET stock_quantity = ${newQuantity} WHERE id = ${res[0].id}`, (err, resUpdate) => {
                                if (err) throw err;
                                console.log("");
                                console.log("Your Order has been Processed to add to inventory");
                                console.log("Thank you for Shopping with us.");
                                console.log("");
                                connection.end();
                            }
                        )
                        console.log("");
                        console.log(`${res[0].products_name} added to inventory.`);
                        console.log(`Current Total Quantity: ${newQuantity}`);
                    }
                });
            }
        });
    });
}

module.exports = addToInventory;