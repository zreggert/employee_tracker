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
        'View All Employees',
        'View Employess by Department',
        'View Employees by Roles',
        'Add Department',
        'Add Employee',
        'Add Roles'
      ]
    }
  ])
  .then((res) => {
    if (res.action === 'View All Employees') {
      viewAll();
    } else if (res.action === 'Add Department') {
      addDepartment();
    } else if (res.action === 'Add Employee') {
      addEmployee();
    }
  })
}

// View Data
const viewAll = () => {
  connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, departments.department, salary, employee.manager_id 
  FROM employee
  LEFT JOIN role
  ON employee.role_id = role.id
  LEFT JOIN departments
  ON role.department_id = departments.id`, 
  (err, res) => {
    if (err) throw err;
    console.table(res);
  }
  )
}

// Adding Data
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

const rolesArray = [];
const roleOptions = () => {
  connection.query(`SELECT * FROM role`,
  (err, res) => {
    if (err) throw err;
    res.forEach((role) => {
      rolesArray.push(role.title);
    });
  })
  return rolesArray;
}

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
      name: 'role',
      type: 'list',
      choices: roleOptions(),
      message: "What is the employee's title?"
    }
  ])
  .then((resAddEmp) => {
    // var roleId;
    // connection.query(`SELECT * FROM role`,
    // (err, res) => {
    //   if (err) throw err;

    // }
    // )
    connection.query(
      'INSERT INTO employee SET ?',
      {
        first_name: resAddEmp.firstName,
        last_name: resAddEmp.lastName,
        role_id: resAddEmp.role
      },
      (err) => {
        if (err) throw err;
        console.log(`${resAddEmp.firstName} ${resAddEmp.lastName} has been added.`)
      }
    );
  });
};


connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  manageOffice();
});