SELECT e1.id AS "Employee ID", e1.first_name AS "First Name", e1.last_name AS "Last Name",
       role.title AS "Title", department.department_name AS "Department", role.salary AS "Salary", e2.first_name || ' ' || e2.last_name AS "Manager"
    FROM employee e1 JOIN role ON e1.role_id = role.id
	JOIN department ON role.department_id = department.id
	LEFT JOIN employee e2 ON e1.manager_id = e2.id;