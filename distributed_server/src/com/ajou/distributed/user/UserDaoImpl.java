package com.ajou.secure.user;

import java.sql.SQLException;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.ajou.secure.common.BaseDao;
import com.ajou.secure.common.Dao;


@Repository("userDao")
public class UserDaoImpl extends BaseDao implements Dao {

	@Override
	public Object select(Object obj) throws SQLException {
		//아래 메소드 잘못 입력되었음(10.8) -> 수정 필요
		return getSqlMapClientTemplate().insert("com.ajou.secure.user.selectUserByUserEmail", obj);
	}

	@Override
	public void delete(Object obj) throws SQLException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List getList(Object obj) throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int getRowCount(Object obj) throws SQLException {
		return 0;
	}

	@Override
	public void insert(Object obj) throws SQLException {
		// spring 프레임워크의 SqlMapClientTemplate 호출후 MySQL insert 구문 입력을 위해 User.xml의 InsertUserInformation 호출
		// obj는 user 모델에서 가져옴
		getSqlMapClientTemplate().insert("com.ajou.secure.user.InsertUserInformation", obj);
	}

	@Override
	public void update(Object obj) throws SQLException {
		// TODO Auto-generated method stub
		
	}

}
