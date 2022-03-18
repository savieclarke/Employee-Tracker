import { makeConnection } from "mysql2";

const connection = makeConnection({
  host: "localhost",
  // Your username
  user: "root",
  // Your password
  password: "",
  database: "staff",
  connectionLimit: 10,

});

connection.connect(function (err) {
  if (err) throw err;
});

export default connection;