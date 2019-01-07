CREATE DATABASE bamazon;
USE bamazon; 
CREATE TABLE products(
	item_id VARCHAR(30) PRIMARY KEY,
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price DOUBLE,
    stock_quantity INTEGER);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUE ("p4011", "banana", "dry-produce", 0.19, 3600);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUE ("p4593", "cucumber", "wet-produce", 1.19, 100);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUE ("p4012", "orange", "dry-produce", 0.79, 500);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUE ("p4077", "corn", "wet-produce", 0.49, 1000);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUE ("p4065", "green bell pepper", "dry-produce", 0.99, 1000);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUE ("p4131", "fuji apple", "dry-produce", 0.49, 1000);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUE ("p4092", "yellow onion", "dry-produce", 0.79, 1000);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUE ("p3112", "papaya", "dry-produce", 2.99, 200);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUE ("p4072", "russet potato", "dry-produce", 0.69, 1000);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUE ("p4048", "lime", "dry-produce", 0.19, 3000);