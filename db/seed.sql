USE staff;

INSERT INTO department
(name)
VALUES 
('Marketing'),
('Legal'),
('Engineering'),
('Accounting');

INSERT INTO role
    (title, salary, department_id)

    VALUES
    ('Social Media Marketing', 60000, 1),
    ('Lawyer', 200000, 2);
    ('Legal Team Lead', 300000, 2),
    ('Lead Engineer', 130000, 3),
    ('Software Engineer', 100000, 3),
    ('Accountant', 125000, 4),

    INSERT INTO employee
    (first_name, last_name, role_id, manager_id)

    VALUES
    ('River', 'Brachala', 1, NULL),
    ('Rachel', 'Lindsay', 2, NULL),
    ('Meagan', 'Benson', 3, 1),
    ('Madisynn', 'Stanton', 3, 3),
    ('SeattleGrace', 'Boyega', 5, NULL),
    ('Denver', 'Greene', 6, 5),
  
