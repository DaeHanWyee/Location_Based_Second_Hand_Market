--- 20151207 Byungwook update
--- create test complete 20151207


CREATE TABLE `tbl_login_cnt` (
	`LOGIN_NUMSEQ` INT(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Sequence number: primary key',
	`LOGIN_ID` VARCHAR(15) NOT NULL COMMENT 'User id : foreign key',
	`LOGIN_COUNT` INT(10) UNSIGNED NOT NULL DEFAULT '1' COMMENT '로그인 카운트 : 디폴트 0',
	PRIMARY KEY (`LOGIN_NUMSEQ`),
	INDEX `FK_tbl_login_cnt_tbl_user_info` (`LOGIN_ID`),
	CONSTRAINT `FK_tbl_login_cnt_tbl_user_info` FOREIGN KEY (`LOGIN_ID`) REFERENCES `tbl_user_info` (`USER_ID`) ON UPDATE CASCADE ON DELETE CASCADE
)
COMMENT='반복된 인증시도 제한을 위한 테이블'
COLLATE='utf8_general_ci'
ENGINE=InnoDB
ROW_FORMAT=DEFAULT