const mysql = require("mysql2");
const express = require('express');


const PORT = process.env.PORT || 5500;
const app = express(); 

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  // Your username
  user: "root",
  // Your password
  password: "",
  database: "employees"
},
console.log(`Connected to the employees database.`),
  
);

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;