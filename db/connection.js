
const mysql = require ('mysql2');
const db = require('.');

 

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "staff",
  port: "3306"

});


connection.connect(function (err) 

 {console.log(err)
  if (err) throw err;
  
  // run the start function after the connection is made to prompt the user
 
});

module.exports = connection;
