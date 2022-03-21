const inquirer  = require("inquirer");
const db = require("./db");
require("console.table");

const PROMP_OPTIONS = {
  VIEW_STAFF: "VIEW_STAFF",
  ADD_STAFF: "ADD_STAFF",
  UPDATE_STAFF_ROLE: "UPDATE_STAFF_ROLE",
  VIEW_ROLES: "VIEW_ROLES",
  ADD_ROLES: "ADD_ROLES",
  VIEW_DEPARTMENTS: "VIEW_DEPARTMENTS",
  ADD_DEPARTMENT: "ADD_DEPARTMENT",
}


function showPrompts() {
  inquirer.prompt([
      {
        type: "list",
        name: "choice",
        message: "Main Menu",
        choices: [
          {
            name: "View Staff",
            value: PROMP_OPTIONS.VIEW_STAFF
          },
          
          {
            name: "Add Staff",
            value: PROMP_OPTIONS.ADD_STAFF
          },
          
          {
            name: "Update Staff Role",
            value: PROMP_OPTIONS.VIEW_STAFF
          },
          
          {
            name: "View All Roles",
            value: PROMP_OPTIONS.VIEW_ROLES
          },
          {
            name: "Add Role",
            value: PROMP_OPTIONS.ADD_ROLES
          },
          {
            name: "View All Departments",
            value: PROMP_OPTIONS.VIEW_DEPARTMENTS
          },
          {
            name: "Add Department",
            value: PROMP_OPTIONS.ADD_DEPARTMENT
          },
          
          
        ]
      }
    ]).then(res => {
      let choice = res.choice;
      switch (choice) {
        case PROMP_OPTIONS.VIEW_STAFF:
          findAllStaff();
          break;
        case PROMP_OPTIONS.ADD_STAFF:
          addStaff();
          break;
        case PROMP_OPTIONS.UPDATE_STAFF_ROLE:
          updateStaffRole();
          break;
        
        case PROMP_OPTIONS.VIEW_DEPARTMENTS:
          viewDepartments();
          break;
        case PROMP_OPTIONS.ADD_DEPARTMENT:
          addDepartment();
          break;
        case PROMP_OPTIONS.VIEW_ROLES:
          viewRoles();
          break;
        case PROMP_OPTIONS.ADD_ROLES:
          addRole();
          break;
        default:
         exit();
      }
    }
    )
  }
  
  // View staff
  function findAllStaff() {
    return db.findAllStaff()
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
  
        inquirer.prompt([
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
  
                inquirer.prompt([
                  {
                    type: "list",
                    name: "roleId",
                    message: "Which role do you want to assign ?",
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
    db.displayRoles()
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
  
        inquirer.prompt([
          {
            name: "title",
            message: "What is the name of the role?"
          },
          {
            name: "salary",
            message: "How much is the salary of the role?"
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
    db.displayDepartments()
      .then(([rows]) => {
        let departments = rows;
        console.log("\n");
        console.table(departments);
      })
      .then(() => showPrompts());
  }
  
  // Add a department
  function addDepartment() {
    inquirer.prompt([
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
  inquirer.prompt([
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
  
            inquirer.prompt({
              type: "list",
              name: "roleId",
              message: "What is the employee's role?",
              choices: roleOptions
            })
              .then(res => {
                let roleId = res.roleId;
  
                db.findAllStaff()
                  .then(([rows]) => {
                    let employees = rows;
                    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                      name: `${first_name} ${last_name}`,
                      value: id
                    }));
  
                    managerChoices.unshift({ name: "None", value: null });
  
                    inquirer.prompt({
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
  

  showPrompts();

  // Exit the application
  function exit() {
    console.log("See you next time!");
    process.exit();
  }
  

