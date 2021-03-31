SET DEFAULT_STORAGE_ENGINE = INNODB;

DROP TABLE IF EXISTS tb_user;
DROP TABLE IF EXISTS tb_product;

DROP FUNCTION IF EXISTS fn_insert_user;
DROP FUNCTION IF EXISTS fn_auth_user;
DROP FUNCTION IF EXISTS fn_insert_product;
DROP VIEW IF EXISTS vw_users;
DROP VIEW IF EXISTS vw_allusers;
DROP VIEW IF EXISTS vw_product;
DROP PROCEDURE IF EXISTS pc_update_user;
DROP PROCEDURE IF EXISTS pc_update_product;

CREATE TABLE tb_user (
    pk_id           INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    str1_name       VARCHAR (200)   NOT NULL,
    str1_surname    VARCHAR (200)   NOT NULL,
    str1_email      VARCHAR (200)   NOT NULL,
    str2_password   VARCHAR (1000)  NOT NULL,

    PRIMARY KEY (pk_id),
    CONSTRAINT uq_email UNIQUE (str1_email)
);

CREATE VIEW vw_users AS
SELECT pk_id AS id, str1_name AS name, str1_surname AS surname, str1_email AS email
FROM tb_user;

CREATE VIEW vw_allusers AS
SELECT DISTINCT pk_id AS id, str1_name AS name, str1_surname AS surname, str1_email AS email
FROM tb_user;



DELIMITER //
CREATE FUNCTION fn_insert_user(
    str1_name VARCHAR(200),
    str1_surname VARCHAR(200),
    str1_email VARCHAR(200),
    str2_password VARCHAR(1000)
)
RETURNS INT UNSIGNED
BEGIN
    INSERT INTO tb_user (str1_name, str1_surname, str1_email, str2_password)
    VALUES (str1_name, str1_surname, str1_email, str2_password);
    RETURN LAST_INSERT_ID();
END//
DELIMITER ;

DELIMITER //
CREATE FUNCTION fn_auth_user(
    str1_email VARCHAR(200),
    str2_password VARCHAR(1000)
)
RETURNS INT UNSIGNED
BEGIN
    DECLARE id INT;
    SELECT u.pk_id INTO id
    FROM tb_user AS u
    WHERE str1_email = u.str1_email
    AND str2_password = u.str2_password;
   
    RETURN id;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE pc_update_user(
    pk_id INT UNSIGNED,
    str1_name VARCHAR(200),
    str1_surname VARCHAR(200),
    str1_email VARCHAR(200),
    str2_password VARCHAR(1000)
)
BEGIN
    UPDATE tb_user 
    SET    str1_name = str1_name, str1_surname = str1_surname, str1_email = str1_email, str2_password = str2_password 
    WHERE  tb_user.pk_id = pk_id;
END//
DELIMITER ;

-- :---------------  DB PRODUCTS ------: --------------------------


CREATE TABLE tb_product (
    pk_id           INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    str1_name       VARCHAR (200)   NOT NULL,
    str1_brand      VARCHAR (200)   NOT NULL,
    str1_model      VARCHAR (200)   NOT NULL,
    dec_price       DECIMAL(13,2)   NOT NULL,
    str3_img        VARCHAR (1000)  NOT NULL,

    PRIMARY KEY (pk_id),
    CONSTRAINT uq_name UNIQUE (str1_name)
);

CREATE VIEW vw_product AS
SELECT pk_id AS id, str1_name AS name, str1_brand AS brand, str1_model AS model, dec_price AS price, str3_img AS img
FROM tb_product;

DELIMITER //
CREATE FUNCTION fn_insert_product(
    str1_name   VARCHAR(200),
    str1_brand  VARCHAR(200),
    str1_model  VARCHAR(200),
    dec_price   DECIMAL(13,2),
    str3_img    VARCHAR(1000)
)
RETURNS INT UNSIGNED
BEGIN
    INSERT INTO tb_product (str1_name, str1_brand, str1_model, dec_price, str3_img)
    VALUES (str1_name, str1_brand, str1_model, dec_price, str3_img);
    RETURN LAST_INSERT_ID();
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE pc_update_product(
    pk_id       INT UNSIGNED,
    str1_name   VARCHAR(200),
    str1_brand  VARCHAR(200),
    str1_model  VARCHAR(200),
    dec_price   DECIMAL(13,2),
    str3_img    VARCHAR(1000)
)
BEGIN
    UPDATE tb_product 
    SET    str1_name = str1_name, str1_brand = str1_brand, str1_model = str1_model, dec_price = dec_price, str3_img = str3_img
    WHERE  tb_product.pk_id = pk_id;
END//
DELIMITER ;