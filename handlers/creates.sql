SET DEFAULT_STORAGE_ENGINE = INNODB;

DROP TABLE IF EXISTS tb_user;

DROP FUNCTION IF EXISTS fn_insert_user;

CREATE TABLE tb_user (
    pk_id           INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    str1_name       VARCHAR (200)   NOT NULL,
    str1_surname    VARCHAR (200)   NOT NULL,
    str1_email      VARCHAR (200)   NOT NULL,
    str2_password   VARCHAR (1000)  NOT NULL,

    PRIMARY KEY (pk_id),
    CONSTRAINT uq_email UNIQUE (str1_email)
);

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
    DECLARE n INT;
    SELECT COUNT(*) INTO n
    FROM tb_user AS u
    WHERE str1_email = u.str1_email
    AND str2_password = u.str2_password;
   
    RETURN n;
END//
DELIMITER ;


