CREATE DATABASE employeeTracker_db

USE employeeTracker_db

/*DROP TABLE department ;*/

CREATE TABLE department(
id INT AUTO_INCREMENT NOT NULL,
name VARCHAR(30) NOT NULL,
PRIMARY KEY(id)
);

/*INSERT INTO department (name) VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');*/


CREATE TABLE role (
id INT AUTO_INCREMENT NOT NULL,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT NOT NULL,
PRIMARY KEY(id)
);

/*INSERT INTO role (title, salary, department_id) VALUES
('Sales Lead', 60000 , 1),
('Salesperson', 50000 , 1),
('Lead Engineer', 100000, 2),
('Software Enginner', 80000, 2),
('Accountant', 100000, 3),
('Legal Team Lead', 125000, 4),
('Lawyer', 100000, 4); */


CREATE TABLE employee (
id INT AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT,
PRIMARY KEY(id)
);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Jim', 'Jam', 1, NULL),
('Bim', 'Bam', 2, 1),
('Lim', 'Lam', 3, NULL),
('Mim', 'Mam', 4, 3),
('Gim', 'Gam', 5, NULL),
('Nim', 'Nam', 6, NULL),
('Vim', 'Vam', 7, 6);

SELECT * FROM role;

SELECT * FROM employee
LEFT JOIN role on employee.role_id = role.id
LEFT JOIN department on role.department_id = department.id;


/*Select manager employees*/
SELECT e1.manager_id, CONCAT(e2.first_name, ' ', e2.last_name) AS manager FROM employee as e1
INNER JOIN employee as e2 on e2.id = e1.manager_id;

/*Select all employees*/
SELECT e1.id, e1.first_name, e1.last_name, role.title, department.name AS department, role.salary, CONCAT(e2.first_name, ' ', e2.last_name) AS manager FROM employee as e1
LEFT JOIN role on e1.role_id = role.id
LEFT JOIN department on role.department_id = department.id
LEFT JOIN employee as e2 on e2.id = e1.manager_id;

/*Select all employees by department*/
SELECT e1.id, e1.first_name, e1.last_name, role.title, department.name AS department, role.salary, CONCAT(e2.first_name, ' ', e2.last_name) AS manager FROM employee as e1
LEFT JOIN role on e1.role_id = role.id
LEFT JOIN department on role.department_id = department.id
LEFT JOIN employee as e2 on e2.id = e1.manager_id
ORDER BY department ASC;

/*Select all employees by manager*/
SELECT CONCAT(e2.first_name, ' ', e2.last_name) AS manager, e1.id, e1.first_name, e1.last_name, role.title, department.name AS department, role.salary FROM employee as e1
LEFT JOIN role on e1.role_id = role.id
LEFT JOIN department on role.department_id = department.id
INNER JOIN employee as e2 on e2.id = e1.manager_id
ORDER BY manager ASC ;


INSERT INTO employee (first_name, last_name, role_id, manager_id ) VALUES ('TEST', 'DELETE', 1, 1);
DELETE FROM employee WHERE first_name = 'TEST' ;

/*INNER JOIN employee on employee.manager_id = employee.id*/

SELECT * FROM department 