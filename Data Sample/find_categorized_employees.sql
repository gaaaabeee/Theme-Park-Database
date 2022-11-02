
-- queries to find manager employee
SELECT * FROM amusement_park.employee
WHERE job_title LIKE '%manager%';
-- queries to find attendent employee
SELECT * FROM amusement_park.employee
WHERE job_title LIKE '%attendent%';
-- queries to find all executive
SELECT * FROM amusement_park.employee
WHERE assigned_id BETWEEN 1000 AND 9999
