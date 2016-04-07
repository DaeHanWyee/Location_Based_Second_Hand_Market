--- 10.8 초기 예제값 입력용 Database 주입 샘플

INSERT INTO TBL_USER_INFO (
	
	USER_ID, 
	USER_PASSWORD, 
	USER_NAME, 
	USER_EMAIL1, 
	USER_EMAIL2, 
	USER_PHONENUMBER, 
	USER_ADDRESS, 
	USER_BIRTHYEAR, 
	USER_BIRTHMONTH, 
	USER_BIRTHDATE, 
	USER_BIRTHTYPE, 
	USER_SEX,
	REG_DATE
) VALUES (
	
	'bongja', 
	'bongja', 
	'bongja', 
	'bongja', 
	'secure.org', 
	1111111111, 
	'Woncheon', 
	2015, 
	10, 
	08, 
	'양력', 
	'남자',
	NOW()
);