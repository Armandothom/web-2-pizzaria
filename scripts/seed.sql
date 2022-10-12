INSERT INTO userrole ("nomeRole", "adminRights")
VALUES
('Usuario', false),
('Admin', true);

INSERT INTO "user" (nome, email, password, user_role_id)
VALUES
('Usuario User', 'user@hotmail.com', 'user12345', 1),
('Usuario Admin', 'admin@hotmail.com', 'admin12345', 2);