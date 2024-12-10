CREATE TABLE spelling_app_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    age INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




TRUNCATE TABLE spelling_app_users;
SELECT * FROM spelling_app_users;