const inquirer = require('inquirer');

const viewEmployees = require("./viewEmployees.js");
const viewEmployeesByDepartment = require("./viewEmployeesByDepartment.js");
const viewEmployeesByManager = require("./viewEmployeesByManager.js");
const addEmployee = require("./addEmployee.js");

let cli = () => {
    inquirer.prompt({
        name: "employeesOptions",
        type: "list",
        message: "What would you like to do?",
        choices: ["None", "View All Employees", "View All Employees By Department", "View All Employees By Manager",
            "Add Employee", "Add Role", "Add Department", "Remove Employee", "Update Employee Role", "Update Employee Manager"],
    }).then((answer) => {
        if (answer.employeesOptions == "None") {
            return
        } else if (answer.employeesOptions == "View All Employees") {
            viewEmployees(cli);
        } else if (answer.employeesOptions == "View All Employees By Department") {
            viewEmployeesByDepartment(cli);
        } else if (answer.employeesOptions == "View All Employees By Manager") {
            viewEmployeesByManager(cli);
        } else if (answer.employeesOptions == "Add Employee") {
            addEmployee();
        } else if (answer.employeesOptions == "Add Role") {
            addEmployee();
        } else if (answer.employeesOptions == "Add Department") {
            addEmployee();
        } else if (answer.employeesOptions == "Remove Employee") {
            viewDepartments();
        } else if (answer.employeesOptions == "Update Employee Role") {
            viewRoles();
        } else if (answer.employeesOptions == "Update Employee Manager") {
            addNewProduct();
        }
    });
}

module.exports = cli;