create database TNC;

use TNC;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    address TEXT,
    role ENUM('admin', 'customer') DEFAULT 'customer',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
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

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price BIGINT NOT NULL,
    quantity INT DEFAULT 0,
    category_id INT,
    brand_id INT,
    image_url VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (brand_id) REFERENCES brands(id)
);



CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name varchar(255) NOT NULL,
    address text NOT NULL,
    phone varchar(15) NOT NULL,
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

CREATE TABLE logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NOT NULL,
    action TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES admins(id)
);

CREATE TABLE banners (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_url VARCHAR(255) NOT NULL,
    link_url VARCHAR(255),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    key_name VARCHAR(50) NOT NULL,
    value TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE bills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    customer_id INT NOT NULL,  
    bill_code varchar(255) NOT NULL,
    total_price BIGINT NOT NULL,
    payment_method ENUM('cash', 'credit_card', 'online') DEFAULT 'cash', -- Phương thức thanh toán
    status ENUM('paid', 'unpaid'),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE bill_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bill_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price BIGINT NOT NULL, -- Giá tại thời điểm bán
    FOREIGN KEY (bill_id) REFERENCES bills(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);


-- procedure tự sinh code sản phẩm khi tạo mới -- 
DELIMITER //

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
    INSERT INTO bills (user_id, customer_id, bill_code, total_price, payment_method, status, created_at, updated_at)
    VALUES (p_user_id, p_customer_id, bill_code, p_total_price, p_payment_method, p_status, NOW(), NOW());

    -- Lấy ID của hóa đơn vừa tạo
    SET new_bill_id = LAST_INSERT_ID();

    -- Trả về ID và mã hóa đơn mới
    SELECT new_bill_id AS bill_id, bill_code AS code;
END $$

DELIMITER ;



-- DML

alter table products add column name varchar(255) NOT NULL after code;
alter table products drop column product_name ;

drop procedure AddProductWithCode;


-- DML --
-- brand --
insert into brands (`brand_name`) values("Dell");
insert into brands (`brand_name`) values("Asus");
insert into brands (`brand_name`) values("Lenovo");
insert into brands (`brand_name`) values("Gigabyte");
insert into brands (`brand_name`) values("Macbook");
insert into brands (`brand_name`) values("HP");

-- categories --
insert into categories (`category_name`) values("Laptop Văn Phòng");
insert into categories (`category_name`) values("Laptop Gaming");
insert into categories (`category_name`) values("PC Văn Phòng");
insert into categories (`category_name`) values("PC Gaming");
insert into categories (`category_name`) values("PC Workstation");
insert into categories (`category_name`) values("Camera Wifi - IP");
insert into categories (`category_name`) values("SmartHome");
insert into categories (`category_name`) values("Loa");
insert into categories (`category_name`) values("Audio - Tai Nghe");
insert into categories (`category_name`) values("Internet - Wifi - Lan");
insert into categories (`category_name`) values("Printer - Máy in");

-- products --

CALL AddProductWithCode(
    'Laptop Dell XPS', 
    'Máy tính xách tay hiệu suất cao', 
    25000000, 
    10, 
    1, 
    1, 
    'dell_xps_image.png'
);

CALL AddProductWithCode(
    'Laptop Asus TUF F15', 
    'Máy tính xách tay GAMING hiệu suất cao', 
    30000000, 
    10, 
    2, 
    2, 
    'Asus_tuf.png'
);

CALL AddProductWithCode(
    'Laptop Dell PRECITION', 
    'Máy tính xách tay WORKSTATION hiệu suất cao', 
    25000000, 
    10, 
    2, 
    1, 
    'dell_xps_image.png'
);

insert into customers (`customer_name`, `address`, `phone`, `birth_day`) values ("Nguyễn Trọng Nghĩa", "Hà Nội", "0987654321", "2002-06-15");




