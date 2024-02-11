CREATE DATABASE recipe_forge; 

-- Use the database
\c recipe_forge;

CREATE TABLE recipe (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE instruction (
    id SERIAL PRIMARY KEY,
    recipe_id INT NOT NULL,
    step_number INT NOT NULL,
    description VARCHAR(255) NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES recipe(id) ON DELETE CASCADE
);

CREATE TABLE ingredient (
    id SERIAL PRIMARY KEY,
    recipe_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    quantity FLOAT,
    unit VARCHAR(50),
    FOREIGN KEY (recipe_id) REFERENCES recipe(id) ON DELETE CASCADE
);