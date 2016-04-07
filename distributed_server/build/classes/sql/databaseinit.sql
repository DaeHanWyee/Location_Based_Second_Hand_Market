--- 10.8일용 초기 데이터베이스 환경 설정
DROP DATABASE secureDB;
CREATE DATABASE secureDB;
GRANT ALL PRIVILEGES ON secureDB.* to secureDB@localhost IDENTIFIED BY 'secureDB' WITH GRANT OPTION;
quit