package com.ajou.secure.test;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.ajou.secure.common.RequestParameter;
import com.ajou.secure.common.Utils;
import com.ajou.secure.user.User;

public class Test {
	
	@RequestMapping("/test/test.do")
	public ModelAndView login(HttpServletRequest req, HttpServletResponse res) throws Exception {
		RequestParameter rp = Utils.extractRequestParameters(req);	
		ModelAndView mnv = new ModelAndView("/common/json_result");
		 
		System.out.println("rp = "+ rp);
		
		// Todo: return value
			
		Map<String, Object> map = new HashMap<String, Object>();
		Map<String, Object> userMap = new HashMap<String, Object>();
		
		mnv.addObject("map", map);
		mnv.addObject("callback", req.getParameter("callback"));
		
		return mnv;
	}

}
