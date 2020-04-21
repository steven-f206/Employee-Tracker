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


let addNewProduct = () => {
    inquirer.prompt([{
        type: "input",
        name: "name",
        message: "What is the name of the product?",
    },
    {
        type: "list",
        name: 'department',
        message: 'What is the department it belongs too?',
        choices: ["Kitchenware", "Electronics", "Gaming", "Clothing", "Furniture"],
    },
    {
        type: "input",
        name: 'cost',
        message: 'What is the products cost?',
    },
    {
        type: "input",
        name: 'stock',
        message: 'How much of the product is being added to inventory?',
    }]).then((answers) => {
        console.log(answers)
        let department;
        let departmentCheck = () => {
            switch (answers.department) {
                case "Kitchenware":
                    department = 1;
                    break;
                case "Electronics":
                    department = 2;
                    break;
                case "Gaming":
                    department = 3;
                    break;
                case "Clothing":
                    department = 4;
                    break;
                case "Furniture":
                    department = 5;
                    break;
            }
        }
        departmentCheck();
        answers.department = department;

        if (Number.isInteger(answers.cost) && Number.isInteger(answers.stock) == false) {
            console.log("---------------------------------------------------------------------");
            console.log("NOTE: The stock needs to be a number to be integreated into the system");
            console.log("---------------------------------------------------------------------");
            addNewProduct();
        }

        if (Number.isInteger(answers.cost) == false) {
            console.log("---------------------------------------------------------------------");
            console.log("NOTE: The price needs to be a number to be integreated into the system");
            console.log("---------------------------------------------------------------------");
            addNewProduct();
        }

        if (Number.isInteger(answers.stock) == false) {
            console.log("---------------------------------------------------------------------");
            console.log("NOTE: The stock needs to be a number to be integreated into the system");
            console.log("---------------------------------------------------------------------");
            addNewProduct();
        }


        connection.query(`INSERT INTO products (products_name, department_id, price, stock_quantity ) VALUES ('${answers.name}', ${parseInt(answers.department)}, ${parseInt(answers.cost)}, ${parseInt(answers.stock)})`, (err, res) => {
            if (err) throw err;
        });
    });
}

module.exports = addNewProduct; 