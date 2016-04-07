package com.ajou.secure.user;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.ajou.secure.common.RequestParameter;
import com.ajou.secure.common.Utils;
import com.ajou.secure.user.User;
import com.ajou.secure.user.UserServiceImpl;

@Controller
public class UserController {
	
	@Resource(name = "userService")
	private UserServiceImpl userService;
	
	/**
	 * 로그인
	 * */
	@RequestMapping("/user/login.do")
	public ModelAndView login(HttpServletRequest req, HttpServletResponse res) throws Exception {
		RequestParameter rp = Utils.extractRequestParameters(req);	
		ModelAndView mnv = new ModelAndView("/common/json_result");
		 
		System.out.println("rp = "+ rp);
		
		Map<String, Object> map = new HashMap<String, Object>();
		Map<String, Object> userMap = new HashMap<String, Object>();
		
		User user = (User) this.userService.getObject(rp);
		
		if(user != null){
			userMap.put("userSeq", user.getUserSeq());
			userMap.put("userEmail", user.getUserEmail1());
			userMap.put("userName", user.getUserName());
			
			//세션처리 - html5 sessionStorage 이용

			map.put("success", userMap);
		}else{
			map.put("fail", "로그인 실패");
		}
		mnv.addObject("map", map);
		mnv.addObject("callback", req.getParameter("callback"));
		
		return mnv;
	}
	
	/**
	 * 로그아웃 - html5 sessionStorage Clear
	 * */
	
	
	// 사용자 등록 로직 구현(10.8)
	@RequestMapping("/user/user_registration.do")
	public ModelAndView user_registration(HttpServletRequest req, HttpServletResponse res) throws Exception {
		
		//웹 서블릿 요청에서부터 JSON 메시지를 가져와서 rp 오브젝트에 저장
		//RequestParameter rp는 Hashmap을 상속받으며, JSON의 데이터를 입력하는 공간 
		RequestParameter rp = Utils.extractRequestParameters(req);	

		//차후 View(클라이언트측으로)로 보내기 위한 오브젝트 생성
		ModelAndView mnv = new ModelAndView("/common/json_result");
		
		//임시 저장공간->나중에 클라이언트로 k와 v로 콜백 보내기 위한 공간
		Map<String, Object> map = new HashMap<String, Object>();
		

		
		// Map<String, Object> userMap = new HashMap<String, Object>();
		
		// 모델 생성
		User user = new User();
		
		//체커
		System.out.println("rp = "+ rp);
		System.out.println("여기까지 옴");
		
		//세터를 이용하여 모델로 데이터 주입
		user.setUserID(rp.get("userID").toString());
		user.setUserPassword(rp.get("userPassword").toString());
		user.setUserName(rp.get("userName").toString());
		user.setUserEmail1(rp.get("userEmail1").toString());
		user.setUserEmail2(rp.get("userEmail2").toString());
		user.setUserPhoneNumber(rp.get("userPhoneNumber").toString());
		user.setUserAddress(rp.get("userAddress").toString());
		user.setUserBirthYear(rp.get("userBirthYear").toString());
		user.setUserBirthMonth(rp.get("userBirthMonth").toString());
		user.setUserBirthDate(rp.get("userBirthDate").toString());
		//user.setUserBirthType(rp.get("userBirthType").toString());
		//user.setUserSex(rp.get("userSex").toString());
		
		
		//데이터 주입 확인
		System.out.println("이름= "+ user.getUserName());
		System.out.println("아뒤= "+ user.getUserID());
		System.out.println("암호= "+ user.getUserPassword());
		System.out.println("Email1= "+ user.getUserEmail1());
		System.out.println("Email2= "+ user.getUserEmail2());
		System.out.println("폰번= "+ user.getUserPhoneNumber());
		System.out.println("태어난해= "+ user.getUserBirthYear());
		System.out.println("태어난달= "+ user.getUserBirthMonth());
		System.out.println("태어난일= "+ user.getUserBirthDate());
		
		
		//성공이후 userService의 save를 이용하여 insert SQL명령 실행
		userService.save(user);
		
		//성공여부에 따라 map으로 k와 v값을 각각 주입
		if(user !=null)	map.put("success", "회원등록 성공");
		else map.put("fail", "회원등록 실패");
		
		//클라이언트로 데이터를 보내기 위해 map과 callback을 전송하기 위해 mnv에 값 주입 후 리턴
		mnv.addObject("map", map);
		mnv.addObject("callback", req.getParameter("callback"));
		return mnv;
	}
	
	
	
	
	@RequestMapping("/user/getUser.do")
	public ModelAndView getUser(HttpServletRequest req, HttpServletResponse res) throws Exception {
		RequestParameter rp = Utils.extractRequestParameters(req);	
		ModelAndView mnv = new ModelAndView("/common/json_result");
		 
		Map<String, Object> map = new HashMap<String, Object>();
//		Map<String, Object> userMap = new HashMap<String, Object>();
		System.out.println(rp);
		User user = (User) this.userService.getObject(rp);
		
		if(user != null){
//			userMap.put("userSeq", user.getUserSeq());
//			userMap.put("userEmail", user.getUserEmail());
//			userMap.put("userName", user.getUserName());
			
			//세션처리 - html5 sessionStorage 이용

			map.put("1", user);
		}else{
			map.put("-1", "사용자 불러오기 실패");
		}
		mnv.addObject("map", map);
		mnv.addObject("callback", req.getParameter("callback"));
		
		return mnv;
	}
	
	@RequestMapping("/user/test.do")
	public ModelAndView test(HttpServletRequest req, HttpServletResponse res) throws Exception {
		RequestParameter rp = Utils.extractRequestParameters(req);	
		ModelAndView mnv = new ModelAndView("/common/json_result");
		 
		Map<String, Object> map = new HashMap<String, Object>();
//		Map<String, Object> userMap = new HashMap<String, Object>();
		System.out.println(rp);
		int num = Integer.parseInt((String) rp.get("testValue"));
		System.out.println("num : "+ num);
		/*
		User user = (User) this.userService.getObject(rp);
		
		if(user != null){
//			userMap.put("userSeq", user.getUserSeq());
//			userMap.put("userEmail", user.getUserEmail());
//			userMap.put("userName", user.getUserName());
			
			//세션처리 - html5 sessionStorage 이용

			map.put("1", user);
		}else{
			map.put("-1", "사용자 불러오기 실패");
		}
		mnv.addObject("map", map);
		
		mnv.addObject("callback", req.getParameter("callback"));
		*/
		
		return mnv;
	}
	

}
