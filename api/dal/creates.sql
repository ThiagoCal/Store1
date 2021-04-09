SET DEFAULT_STORAGE_ENGINE = INNODB;

DROP TABLE IF EXISTS tb_user;
DROP TABLE IF EXISTS tb_product;
DROP TABLE IF EXISTS tb_order;
DROP FUNCTION IF EXISTS fn_insert_user;
DROP FUNCTION IF EXISTS fn_auth_user;
DROP FUNCTION IF EXISTS fn_insert_product;
DROP FUNCTION IF EXISTS fn_insert_order;
DROP VIEW IF EXISTS vw_users;
DROP VIEW IF EXISTS vw_allusers;
DROP VIEW IF EXISTS vw_product;
DROP VIEW IF EXISTS vw_order;
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
SELECT pk_id AS id, str1_name AS name_, str1_surname AS surname, str1_email AS email
FROM tb_user;

CREATE VIEW vw_allusers AS
SELECT DISTINCT pk_id AS id, str1_name AS name_, str1_surname AS surname, str1_email AS email
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
SELECT pk_id AS id, str1_name AS name_, str1_brand AS brand, str1_model AS model, dec_price AS price, str3_img AS img
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

-- :---------------  DB ORDER ------: --------------------------

CREATE TABLE tb_order (
    pk_id         INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    fk_id_user    INT UNSIGNED    NOT NULL,
    fk_id_product INT UNSIGNED    NOT NULL,
    int1_quantity INT             NOT NULL,
    dec_price     DECIMAL(13,2)   NOT NULL,
    dtm_date      DATETIME        NOT NULL  DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (pk_id),
    CONSTRAINT fk_user    FOREIGN KEY (fk_id_user)    REFERENCES tb_user(pk_id),
    CONSTRAINT fk_product FOREIGN KEY (fk_id_product) REFERENCES tb_product(pk_id)
);

DELIMITER //
CREATE FUNCTION fn_insert_order(
    fk_id_user    INT UNSIGNED,
    fk_id_product INT UNSIGNED,
    int1_quantity INT,
    dec_price     DECIMAL(13,2)
)
RETURNS INT UNSIGNED
BEGIN
    INSERT INTO tb_order (fk_id_user, fk_id_product , int1_quantity, dec_price)
    VALUES (fk_id_user, fk_id_product , int1_quantity, dec_price);
    RETURN LAST_INSERT_ID();
END//
DELIMITER ;

CREATE VIEW vw_order AS
SELECT DISTINCT o.pk_id AS id, o.fk_id_user AS id_user, o.int1_quantity AS quantity,
                               o.dec_price  AS price_paid, o.dtm_date AS date_,
                o.fk_id_product AS id_product, p.str1_name  AS name_, p.str1_brand AS brand,
                                               p.str1_model AS model, p.str3_img   AS img
FROM tb_order AS o INNER JOIN tb_product AS p ON o.fk_id_product = p.pk_id
ORDER BY date_ DESC;