const inquirer = require('inquirer');

const viewDepartments = require("./viewDepartments.js");

let cli = () => {
    inquirer.prompt({
        name: "employeesOptions",
        type: "list",
        message: "Please select the function as a manager you wish to use.",
        choices: ["Add departments", "Add role", "Add Employee", "View departments", "View role", "View employee"],
    }).then((answer) => {
        if (answer.employeesOptions == "Add department") {
            addDepartment();
        } else if (answer.employeesOptions == "Add role") {
            addRole();
        } else if (answer.employeesOptions == "Add Employee") {
            addEmployee();
        } else if (answer.employeesOptions == "View departments") {
            viewDepartments();
        } else if (answer.employeesOptions == "View roles") {
            viewRoles();
        } else if (answer.employeesOptions == "View employees") {
            viewEmployees(addToInventory);
        } else if (answer.employeesOptions == "Update employee roles") {
            addNewProduct();
        }
    });
}

module.exports = cli;