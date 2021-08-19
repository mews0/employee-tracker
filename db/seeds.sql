INSERT INTO department (name)
VALUES ('Operations'), ('HR'), ('Finance'), ('Marketing'), ('IT');

INSERT INTO role (title, salary, department_id)
VALUES
  ('Operations Manager', 75000, 1),
  ('HR Manager', 75000, 2),
  ('Finance Manager', 75000, 3),
  ('Marketing Manager', 75000, 4),
  ('IT Manager', 75000, 5),
  ('Operations Associate', 50000, 1),
  ('HR Associate', 50000, 2),
  ('Finance Associate', 50000, 3),
  ('Marketing Associate', 50000, 4),
  ('IT Associate', 50000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Cosgrove', 'Shumway', 1, NULL),
  ('Doink', 'Ahanahue', 2, NULL),
  ('Legume', 'Duprix', 3, NULL),
  ('Grunky', 'Peep', 4, NULL),
  ('Strunk', 'Flugget', 5, NULL),
  ('Stumptavian', 'Roboclick', 6, 1),
  ('Vagonius', 'Thicket-Suede', 7, 2),
  ('Marmadune', 'Shazbot', 8, 3),
  ('Faux', 'Doadles', 9, 4),
  ('Snarf', 'Mintz-Plasse', 10, 5);