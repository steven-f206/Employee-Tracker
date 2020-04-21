let inquirer = require("inquirer");

let managerDisplay = require('./lib/managerDisplay.js');
let lowInventory = require('./lib/lowInventory.js');
let addToInventory = require('./lib/addToInventory.js');
let addNewProduct = require('./lib/addNewProduct.js');

let init = () => {
    inquirer.prompt({
        name: "managerOption",
        type: "list",
        message: "Please select the function as a manager you wish to use.",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
    }).then((answer1) => {
        if (answer1.managerOption == "View Products for Sale") {
            managerDisplay();
        } else if (answer1.managerOption == "View Low Inventory") {
            lowInventory();
        } else if (answer1.managerOption == "Add to Inventory") {
            managerDisplay(addToInventory);
        } else if (answer1.managerOption == "Add New Product") {
            addNewProduct();
        }
    });
}

init(); 