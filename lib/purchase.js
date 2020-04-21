let inquirer = require("inquirer");
let mysql = require("mysql");

let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Phoenix1",
    database: "bamazon_db",
    port: 3306
})

connection.connect();

let purchase = () => {
    inquirer.prompt({
        name: "productToBuy",
        type: "input",
        message: "Please enter the product Id of the item you wish to purchase.",
    }).then((answer1) => {

        let selection = answer1.productToBuy;
        connection.query("SELECT * FROM products WHERE id=?", selection, (err, res) => {
            if (err) throw err;
            if (res.length === 0) {
                console.log("That Product doesn't exist, Please enter a product Id from the list above")
                purchase();
            } else {
                inquirer.prompt({
                    name: "quantity",
                    type: "input",
                    message: "How many items would you like to purchase?"
                }).then((answer2) => {
                    let quantity = answer2.quantity;
                    if (quantity > res[0].stock_quantity) {
                        console.log(`Our Apologies we only have ${res[0].stock_quantity} item of the product selected.`);
                        purchase();
                    } else {
                        console.log("");
                        console.log(`${res[0].products_name} purchased`);
                        console.log(`${quantity} @ $${res[0].price}`);
                        console.log(`Total ${res[0].price * quantity}`);

                        var newQuantity = res[0].stock_quantity - quantity;
                        connection.query(
                            `UPDATE products SET stock_quantity = ${newQuantity} WHERE id = ${res[0].id}`, (err, resUpdate) => {
                                if (err) throw err;
                                console.log("");
                                console.log("Your Order has been Processed");
                                console.log("Thank you for Shopping with us.");
                                console.log("");
                                connection.end();
                            }
                        )
                    }
                });
            }
        });
    });
}

module.exports = purchase;