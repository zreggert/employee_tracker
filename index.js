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
  

  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });