DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR (30)
);

CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR (30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department (id) ON DELETE CASCADE
);

CREATE TABLE employee(
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE CASCADE,
    FOREIGN KEY (manager_id) REFERENCES employee (id)

);

INSERT INTO department (name)
VALUES
("Management"),
("Sales"),
("Legal");


INSERT INTO role (title, salary, department_id)
VALUES 
("Salesman", 10000, 1),
("Sales Coach", 20000, 2);


INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
("Samwise", "Gamgee", 1, 1),
("Fred", "Flinstone", 2, 2);