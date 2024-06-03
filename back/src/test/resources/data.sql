INSERT INTO USERS (first_name, last_name, admin, email, password)
VALUES ('Admin', 'Admin', true, 'yoga@studio.com', 'password');
INSERT INTO USERS (first_name, last_name, admin, email, password)
VALUES ('Paul', 'Robert', false, 'test@gmail.com', '$2a$10$goTwuJTuS02mR7y7fDAZAufZO3RY8ffNtldntnkMZx4wAozQTdg9K');

INSERT INTO TEACHERS (first_name, last_name)
VALUES ('Teacher', 'Teacher');

INSERT INTO SESSIONS (name, description, date, teacher_id)
VALUES ('Test Session', 'Session tested', now(), 1);
