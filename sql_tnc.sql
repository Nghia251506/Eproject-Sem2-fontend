-- create database TNC;

use TNC; 

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(15),
    role ENUM('customer') DEFAULT 'customer',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE employees(
	id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    role ENUM ('employee') DEFAULT 'employee',
    create_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(50) UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE brands (
    id INT AUTO_INCREMENT PRIMARY KEY,
    brand_name VARCHAR(50) UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE attributes(
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    create_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE suppliers(
	id INT AUTO_INCREMENT PRIMARY KEY,
    supplier_code VARCHAR(255),
    name VARCHAR(255),
    phone VARCHAR(15),
    address VARCHAR(255),
    email VARCHAR(255),
    conpany VARCHAR(255),
    tax_code VARCHAR(15),
    create_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    update_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    description LONGTEXT,
    price BIGINT NOT NULL,
    quantity INT DEFAULT 0,
    category_id int not null,
    brand_id INT,
    image_url VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (brand_id) REFERENCES brands(id)
);

CREATE TABLE product_detail(
	id int auto_increment not null primary key,
    product_id int not null,
    attribute_id int not null,
    val varchar(255),
    supplier_id int,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (attribute_id) REFERENCES attributes(id),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
);


CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    total_price BIGINT NOT NULL,
    status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment LONGTEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name varchar(255) NOT NULL,
    address varchar(255),
    phone varchar(15),
    email varchar(255),
    birth_day DATE
);


CREATE TABLE discounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_percentage INT CHECK (discount_percentage BETWEEN 1 AND 100),
    start_date DATETIME,
    end_date DATETIME,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE bills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    customer_id INT NOT NULL,
    product_id INT NOT NULL,
    bill_code varchar(255) NOT NULL,
    total_price BIGINT NOT NULL,
    payment_method ENUM('cash', 'credit_card', 'online') DEFAULT 'cash', -- Phương thức thanh toán
    status ENUM('paid', 'unpaid') default 'paid',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id),
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- procedure tự sinh code sản phẩm khi tạo mới -- 
DELIMITER //
drop procedure AddProductWithCode;
CREATE PROCEDURE AddProductWithCode(
    IN product_name VARCHAR(255),
    IN product_description TEXT,
    IN product_price BIGINT,
    IN product_quantity INT,
    IN product_category_id INT,
    IN product_brand_id INT,
    IN product_image VARCHAR(255)
)
BEGIN
    DECLARE prefix_category VARCHAR(10);
    DECLARE prefix_brand VARCHAR(10);
    DECLARE new_code VARCHAR(50);

    -- Lấy prefix của category
    SELECT LEFT(category_name, 3)
    INTO prefix_category
    FROM categories
    WHERE id = product_category_id;

    -- Lấy prefix của brand
    SELECT LEFT(brand_name, 3)
    INTO prefix_brand
    FROM brands
    WHERE id = product_brand_id;

    -- Tạo mã sản phẩm dạng PREFIX_CATEGORY-PREFIX_BRAND-ID
    INSERT INTO products (`name`,`description`, `price`, `quantity`, `category_id`, `brand_id`, `image_url`)
    VALUES (product_name,product_description, product_price, product_quantity, product_category_id, product_brand_id,product_image);

    SET new_code = CONCAT(UCASE(prefix_category), '-', UCASE(prefix_brand), '-', LPAD(LAST_INSERT_ID(), 3, '0'));

    -- Cập nhật mã sản phẩm
    UPDATE products
    SET code = new_code
    WHERE id = LAST_INSERT_ID();
END //

DELIMITER ;

-- procedure tự sinh mã hoá đơn khi tạo
DELIMITER $$

CREATE PROCEDURE createBill(
    IN p_user_id INT,
    IN p_customer_id INT,
    IN p_product_id INT,
    IN p_total_price BIGINT,
    IN p_payment_method ENUM('cash', 'credit_card', 'online'),
    IN p_status ENUM('paid', 'unpaid')
)
BEGIN
    DECLARE new_bill_id INT;
    DECLARE bill_code VARCHAR(50);
    DECLARE currentDate VARCHAR(8);  -- Đổi tên biến từ current_date thành currentDate
    DECLARE bill_count INT;

    -- Lấy ngày hiện tại dưới dạng YYYYMMDD
    SET currentDate = DATE_FORMAT(NOW(), '%Y%m%d');

    -- Tìm số thứ tự của hóa đơn trong ngày (Số hóa đơn đã được tạo trong ngày này)
    SELECT COUNT(*) INTO bill_count
    FROM bills
    WHERE DATE(created_at) = CURDATE(); -- So sánh ngày tạo của hóa đơn với ngày hiện tại

    -- Tạo mã hóa đơn theo định dạng HDYYYYMMDD-XXX
    SET bill_code = CONCAT('HD', currentDate, '-', LPAD(bill_count + 1, 3, '0'));

    -- Tạo hóa đơn mới
    INSERT INTO bills (user_id, customer_id, product_id, bill_code, total_price, payment_method, status, created_at, updated_at)
    VALUES (p_user_id, p_customer_id,p_product_id, bill_code, p_total_price, p_payment_method, p_status, NOW(), NOW());

    -- Lấy ID của hóa đơn vừa tạo
    SET new_bill_id = LAST_INSERT_ID();

    -- Trả về ID và mã hóa đơn mới
    SELECT new_bill_id AS bill_id, bill_code AS code;
END $$

DELIMITER ;
-- procedure tạo code cho nhà cung cấp
DELIMITER //

CREATE PROCEDURE InsertSupplier(
    IN p_name VARCHAR(255),
    IN p_phone VARCHAR(15),
    IN p_address VARCHAR(255),
    IN p_email VARCHAR(255),
    IN p_company VARCHAR(255),
    IN p_tax_code VARCHAR(15)
)
BEGIN
    DECLARE new_code VARCHAR(255);
    DECLARE max_number INT;

    -- Lấy số lớn nhất từ supplier_code
    SELECT COALESCE(MAX(CAST(SUBSTRING(supplier_code, 4) AS UNSIGNED)), 0) + 1
    INTO max_number
    FROM supplier;

    -- Tạo mã nhà cung cấp dạng NCC000001, NCC000010...
    SET new_code = CONCAT('NCC', LPAD(max_number, LENGTH(max_number) + (6 - LENGTH(max_number)), '0'));

    -- Chèn dữ liệu mới vào bảng supplier
    INSERT INTO supplier (supplier_code, name, phone, address, email, company, tax_code)
    VALUES (new_code, p_name, p_phone, p_address, p_email, p_company, p_tax_code);
END //

DELIMITER ;
 



