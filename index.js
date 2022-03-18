const { prompt } = require("inquirer");
//const db = require("../db");
const console= require("console.table");



function showPrompts() {
    prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to view?",
        choices: [
          {
            name: "View Staff",
            value: "VIEW_STAFF"
          },
          
         
          {
            name: "Add Staff",
            value: "ADD_STAFF"
          },
          
          {
            name: "Update Staff Role",
            value: "UPDATE_Staff_ROLE"
          },
          
          {
            name: "View All Roles",
            value: "VIEW_ROLES"
          },
          {
            name: "Add Role",
            value: "ADD_ROLE"
          },
          {
            name: "View All Departments",
            value: "VIEW_DEPARTMENTS"
          },
          {
            name: "Add Department",
            value: "ADD_DEPARTMENT"
          },
          
          
        ]
      }
    ]).then(res => {
      let choice = res.choice;
      switch (choice) {
        case "VIEW_EMPLOYEES":
          viewEmployees();
          break;
        case "ADD_EMPLOYEE":
          addEmployee();
          break;
        case "UPDATE_EMPLOYEE_ROLE":
          updateEmployeeRole();
          break;
        
        case "VIEW_DEPARTMENTS":
          viewDepartments();
          break;
        case "ADD_DEPARTMENT":
          addDepartment();
          break;
        case "VIEW_ROLES":
          viewRoles();
          break;
        case "ADD_ROLE":
          addRole();
          break;
        default:
          quit();
      }
    }
    )
  }
  
  // View staff
  function viewStaff() {
    db.displayStaff()
      .then(([rows]) => {
        let staff = rows;
        console.log("\n");
        console.table(staff);
      })
      .then(() => showPrompts());
  }
  
  function updateStaffRole() {
    db.findStaff()
      .then(([rows]) => {
        let staff = rows;
        const staffChoices = staff.map(({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id
        }));
  
        prompt([
          {
            type: "list",
            name: "staffId",
            message: "Whhose role do you want to update?",
            choices: staffChoices
          }
        ])
          .then(res => {
            let staffId = res.staffId;
            db.displayRoles()
              .then(([rows]) => {
                let roles = rows;
                const roleOptions = roles.map(({ id, title }) => ({
                  name: title,
                  value: id
                }));
  
                prompt([
                  {
                    type: "list",
                    name: "roleId",
                    message: "Which role do you want to assign the selected employee?",
                    choices: roleOptions
                  }
                ])
                  .then(res => db.updateStaffRole(staffId, res.roleId))
                  .then(() => console.log("Updated staff's role"))
                  .then(() => showPrompts())
              });
          });
      })
  }

  // View all roles
function viewRoles() {
    db.displaylRoles()
      .then(([rows]) => {
        let roles = rows;
        console.log("\n");
        console.table(roles);
      })
      .then(() => showPrompts());
  }
  
  // Add a role
  function addRole() {
    db.displayDepartments()
      .then(([rows]) => {
        let departments = rows;
        const departmentOptions = departments.map(({ id, name }) => ({
          name: name,
          value: id
        }));
  
        prompt([
          {
            name: "title",
            message: "What is the name of the role?"
          },
          {
            name: "salary",
            message: "What is the salary of the role?"
          },
          {
            type: "list",
            name: "department_id",
            message: "Which department does the role belong to?",
            choices: departmentOptions
          }
        ])
          .then(role => {
            db.createRole(role)
              .then(() => console.log(`Added ${role.title} to the database`))
              .then(() => showPrompts())
          })
      })
  }

  // View all deparments
function viewDepartments() {
    db.findAllDepartments()
      .then(([rows]) => {
        let departments = rows;
        console.log("\n");
        console.table(departments);
      })
      .then(() => showPrompts());
  }
  
  // Add a department
  function addDepartment() {
    prompt([
      {
        name: "name",
        message: "What is the name of the department?"
      }
    ])
      .then(res => {
        let name = res;
        db.newDepartment(name)
          .then(() => console.log(`Added ${name.name} to the database`))
          .then(() => showPrompts())
      })
  }

  // Add an employee
function addStaff() {
    prompt([
      {
        name: "first_name",
        message: "First name?"
      },
      {
        name: "last_name",
        message: "Last name?"
      }
    ])
      .then(res => {
        let firstName = res.first_name;
        let lastName = res.last_name;
  
        db.displayRoles()
          .then(([rows]) => {
            let roles = rows;
            const roleOptions = roles.map(({ id, title }) => ({
              name: title,
              value: id
            }));
  
            prompt({
              type: "list",
              name: "roleId",
              message: "What is the employee's role?",
              choices: roleOptions
            })
              .then(res => {
                let roleId = res.roleId;
  
                db.showStaff()
                  .then(([rows]) => {
                    let employees = rows;
                    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                      name: `${first_name} ${last_name}`,
                      value: id
                    }));
  
                    managerChoices.unshift({ name: "None", value: null });
  
                    prompt({
                      type: "list",
                      name: "managerId",
                      message: "Who is the employee's manager?",
                      choices: managerChoices
                    })
                      .then(res => {
                        let staff = {
                          manager_id: res.managerId,
                          role_id: roleId,
                          first_name: firstName,
                          last_name: lastName
                        }
  
                        db.createEmployee(staff);
                      })
                      .then(() => console.log(
                        `Added ${firstName} ${lastName} to the database`
                      ))
                      .then(() => showPrompts())
                  })
              })
          })
      })
  }
  
  // Exit the application
  function exit() {
    console.log("See you next time!");
    process.exit();
  }
  

