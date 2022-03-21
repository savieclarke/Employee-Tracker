const connection = require("./connection")
require("console.table");
const inquirer  = require("inquirer");

class DB {
  constructor(connection) {
    this.connection = connection;
  }
  //query();

  findAllStaff()  {
    return this.connection.promise().query (
      "SELECT employees.id, employees.first_name, employees.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN role on employees.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employees manager on manager.id = employees.manager_id;"
    )    

  }

  createEmployee(staff) {
    return this.connection.promise().query("INSERT INTO employees SET ?", staff);
  }

  displayRoles() {
    return this.connection.promise().query("SELECT * FROM role")
  }
  

  staffRole(staffId, roleId) {
    return this.connection.promise().query(
      "UPDATE staff SET role_id = ? WHERE id = ?",
      [roleId, staffId]
    );
  }

  // Create a new role
  createRole(role) {
    return this.connection.promise().query("INSERT INTO role SET ?", role);
  }


  // Find all departments
  displayDepartments() {
    return this.connection.promise().query(
      "SELECT department.id, department.name FROM department;"
    );
  }


  // Create a new department
  newDepartment(department) {
    return this.connection.promise().query("INSERT INTO department SET ?", department);
  }
  
  
}

module.exports = new DB(connection);
