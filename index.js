const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "employee_db",
  });
  
const manageOffice = () => {
  inquirer.prompt([
    {
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'Add Department',
        'Add Employee',
        'Add Roles'
      ]
    }
  ])
  .then((res) => {
    if (res.action === 'Add Department') {
      addDepartment();
    } else if (res.action === 'Add Employee') {
      addEmployee();
    }
  })
}

const addDepartment = () => {
  inquirer.prompt([
    {
      name: 'departmentName',
      type: 'input',
      message: 'What is the department called?'
    }
  ])
  .then((resAddDep) => {
    connection.query(
      'INSERT INTO department SET ?',
      {
        name: resAddDep.departmentName,
      },
      (err) => {
        if (err) throw err;
        console.log(`The ${resAddDep.departmentName} department has been added.`)
      }
    );
  });
};

const addEmployee = () => {
  inquirer.prompt([
    {
      name: 'firstName',
      type: 'input',
      message: "What is the employee's first name?"
    },
    {
      name: 'lastName',
      type: 'input',
      message: "What is the employee's last name?"
    },
    {
      name: 'roleId',
      type: 'input',
      message: "What is the employee's first name?"
    },
  ])
  .then((resAddDep) => {
    connection.query(
      'INSERT INTO department SET ?',
      {
        name: resAddDep.departmentName,
      },
      (err) => {
        if (err) throw err;
        console.log(`The ${resAddDep.departmentName} department has been added.`)
      }
    );
  });
};

  
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  manageOffice();
});