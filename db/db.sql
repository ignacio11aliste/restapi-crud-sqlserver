-- CREATE DATABASE webstore

-- USE webstore;
-- CREATE TABLE products
-- (
--   id INT IDENTITY(1,1) PRIMARY KEY,
--   name VARCHAR(100) NOT NULL ,
--   price DECIMAL(10,2),
--   quantity INT ,
--   description TEXT
-- )



INSERT INTO products (name, price, quantity, description) VALUES('Manzanas', 99.99, 10, 'Fruta comestible');

USE webstore;
SELECT *
FROM products;


USE webstore
DELETE FROM products