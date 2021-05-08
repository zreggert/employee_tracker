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

// Array of roles and function to create that array
const rolesArray = [];
const roleOptions = () => {
  connection.query(`SELECT * FROM role`,
  (err, res) => {
    if (err) throw err;
    res.forEach((role) => {
      rolesArray.push({
        value: role.id, 
        name: role.title
      })
    });
  })
  return rolesArray;
};

// Array for departments array and function to create it
const depArray = [];
const departmentOptions = () => {
  connection.query(`SELECT * FROM departments`,
  (err, res) => {
    if (err) throw err;
    res.forEach((dep) => {
      depArray.push({
        value: dep.id, 
        name: dep.department
      })
    });
  })
  return depArray;
};

const manageOffice = () => {
  roleOptions();
  departmentOptions();
  inquirer.prompt([
    {
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'View Employees by Department',
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
    } else if (res.action === 'View Employees by Department') {
      viewByDep();
    } else if (res.action === 'View Employees by Roles') {
      viewByRole();
    } else if (res.action === 'Add Department') {
      addDepartment();
    } else if (res.action === 'Add Employee') {
      addEmployee();
    } else if (res.action === 'Add Roles') {
      addRole();
    }
  })
};

// View Data
const viewAll = () => {
  connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, departments.department, salary
  FROM employee
  LEFT JOIN role
  ON employee.role_id = role.id
  LEFT JOIN departments
  ON role.department_id = departments.id`, 
  (err, res) => {
    if (err) throw err;
    console.table(res);
    manageOffice();
  }
  )
};

const viewByRole = () => {
  inquirer.prompt([
    {
      name: 'role',
      type: 'list',
      choices: rolesArray,
      message: "What role do you want to search?"
    }
  ])
  .then((res) => {
    connection.query(`SELECT employee.first_name, employee.last_name, role.title
    FROM employee 
    LEFT JOIN role
    ON employee.role_id = role.id
    LEFT JOIN departments
    ON role.department_id = departments.id
    WHERE role_id = ?`,
    [`${res.role}`],
    (err, res) => {
      if (err) throw err;
      console.table(res);
      manageOffice();
    });
  });
};

const viewByDep = () =>{
  inquirer.prompt([
    {
      name: 'department',
      type: 'list',
      choices: depArray,
      message: "What department do you want to search?"
    }
  ])
  .then((res) => {
    connection.query(`SELECT employee.first_name, employee.last_name, role.title
    FROM employee
    RIGHT JOIN role
    ON employee.role_id = role.id
    RIGHT JOIN departments
    ON role.department_id = departments.id
    WHERE department_id = ?`,
    [`${res.department}`],
    (err, res) => {
      if (err) throw err ;
      console.table(res);
      manageOffice();   
    });
  });
};

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
      'INSERT INTO departments SET ?',
      {
        department: resAddDep.departmentName,
      },
      (err) => {
        if (err) throw err;
        console.log(`The ${resAddDep.departmentName} department has been added.`)
        manageOffice();
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
      name: 'role',
      type: 'list',
      choices: rolesArray,
      message: "What is the employee's title?"
    }
  ])
  .then((resAddEmp) => {
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
        manageOffice();
      }
    );
  });
};

const addRole = () => {
  inquirer.prompt([
    {
      name: 'title',
      type: 'input',
      message: 'What role would you like to add?'
    },
    {
      name: 'salary',
      type: 'input',
      message: 'What is the starting salary for this position?'
    },
    {
      name: 'department',
      type: 'list',
      choices: depArray,
      message: 'In what department is this position?'
    }
  ])
  .then((resAddRole) => {
    connection.query(
      'INSERT INTO role SET ?',
      {
        title: resAddRole.title,
        salary: resAddRole.salary,
        department_id: resAddRole.department
      },
      (err) => {
        if (err) throw err;
        console.log(`Position ${resAddRole.title} has been added.`)
        manageOffice();
      }
    );
  });
};

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  manageOffice();
});