CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL
);


INSERT INTO users (username, user_email) VALUES 
('john_doe', 'john@example.com'),
('jane_doe', 'jane@example.com'),
('bob_jones', 'bob@example.com');

SELECT * FROM users