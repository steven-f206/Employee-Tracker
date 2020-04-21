SELECT * FROM employee;

SELECT *, CONCAT(first_name, ' ', last_name) AS full_name FROM employee
LEFT JOIN role on employee.role_id = role.id
LEFT JOIN department on role.department_id = department.id;

/* Test */

UPDATE employee 
SET role_id = 1 
WHERE first_name = 'Jim' AND last_name = 'Jam';


/*Select employees by 1 name*/
SELECT id, first_name, last_name, CONCAT(first_name, ' ', last_name) AS full_name FROM employee;

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

SELECT * FROM role


SELECT DISTINCT department_id, name FROM role
INNER JOIN department on role.department_id = department.id

DELETE FROM role WHERE title = 'qa' ;
DELETE FROM role WHERE title = 'QA' ;
DELETE FROM department WHERE name = 'qa' ;
DELETE FROM department WHERE name= 'QA' ;