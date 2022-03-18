const mysql = require("mysql2");
const questions = require("./db/questions.js");

const connection = mysql.createConnection({
  host: "localhost",
  // Your username
  user: "root",
  // Your password
  password: "",
  database: "employees",
  connectionLimit: 10,

});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;