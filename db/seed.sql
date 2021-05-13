-- Department Seeds

INSERT INTO departments (department)
VALUES ('Management');

INSERT INTO departments (department)
VALUES ('Sales');

INSERT INTO departments (department)
VALUES ('Accounting');

INSERT INTO departments (department)
VALUES ('Quality Control');

INSERT INTO departments (department)
VALUES ('Supplier Relations');

INSERT INTO departments (department)
VALUES ('Human Resources');

INSERT INTO departments (department)
VALUES ('Customer Relations');

INSERT INTO departments (department)
VALUES ('Reception');


-- Role Seeds

INSERT INTO role (title, salary, department_id)
VALUES ('Manager', 100000.00, 1);

INSERT INTO role (title, salary, department_id)
VALUES ('Assistant to the Manager', 90000.00, 1);

INSERT INTO role (title, salary, department_id)
VALUES ('Lead Sales', 90000.00, 2);

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Associate', 75000.00, 2);

INSERT INTO role (title, salary, department_id)
VALUES ('Lead Accountant', 80000.00, 3);

INSERT INTO role (title, salary, department_id)
VALUES ('Accountant', 75000.00, 3);

INSERT INTO role (title, salary, department_id)
VALUES ('Quality Inspector', 60000.00, 4);

INSERT INTO role (title, salary, department_id)
VALUES ('Supply Chain Anaylst', 50000.00, 5);

INSERT INTO role (title, salary, department_id)
VALUES ('HR Associate', 50000.00, 6);

INSERT INTO role (title, salary, department_id)
VALUES ('Customer Service Agent', 50000.00, 7);

INSERT INTO role (title, salary, department_id)
VALUES ('Receptionist', 45000.00, 8);

-- Employee Seeds

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Michael', 'Scott', 1, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Dwight', 'Schrute', 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jim', 'Halpert', 3, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Pam', 'Beasley', 4, 1);