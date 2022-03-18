const connection = require("./connection").default;
require("console.table");

init();

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  // Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
  findAllStaff() {
    return this.connection.promise().query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }

  // Create a new employee
  newStaff(staff) {
    return this.connection.promise().query("INSERT INTO staff SET ?", staff);
  }
  

  // Update the given employee's role
  staffRole(staffId, roleId) {
    return this.connection.promise().query(
      "UPDATE staff SET role_id = ? WHERE id = ?",
      [roleId, staffId]
    );
  }



  /*Find all roles, join with departments to display the department name
  findAllRoles() {
    return this.connection.promise().query(
      "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
    );
  }*/

  // Create a new role
  createRole(role) {
    return this.connection.promise().query("INSERT INTO role SET ?", role);
  }

 


  // Find all departments
  findAllDepartments() {
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
