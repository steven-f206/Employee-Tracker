/* To create database run the scripts in this file */
DROP DATABASE employeeTracker_db

CREATE DATABASE employeeTracker_db

USE employeeTracker_db

DROP TABLE department;

CREATE TABLE department(
id INT AUTO_INCREMENT NOT NULL,
name VARCHAR(30) NOT NULL,
PRIMARY KEY(id)
);

INSERT INTO department (name) VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');


CREATE TABLE role (
id INT AUTO_INCREMENT NOT NULL,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT NOT NULL,
PRIMARY KEY(id)
);

INSERT INTO role (title, salary, department_id) VALUES
('Sales Lead', 60000 , 1),
('Salesperson', 50000 , 1),
('Lead Engineer', 100000, 2),
('Software Enginner', 80000, 2),
('Accountant', 100000, 3),
('Legal Team Lead', 125000, 4),
('Lawyer', 100000, 4);


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