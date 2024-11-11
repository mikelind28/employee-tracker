SELECT role.id AS "Role ID", role.title AS "Role Title", department.department_name AS "Department", role.salary AS "Salary"
	FROM role
	JOIN department ON role.department_id = department.id;