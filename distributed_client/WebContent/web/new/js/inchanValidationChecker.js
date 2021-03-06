/**
 * 
 */
var validIdcheck = 0;

var domainText = getDomain();	

//취소 버튼 누를시
function previousPage()
{
	location.href="./main2.html"
}

//10.26. 아이디 중복 체크 기능 부과
//10.26. 아이디 중복 체크 이후 아이디 텍스트 필드 수정 불가 및 버튼 disabled 기능 추가

function checkUniqueId(){
	
	var param = "userID="+$("#tbUserID").attr("value");	

	// ID가 입력되지 않은경우 ID 입력 경고창 띄우기
	if ( $("#tbUserID").val() == "")
	{
		alert("ID를 입력하세요");
		return false;
	}
	
	// ID Null 검사 후 서버 전송 
	$.ajax({
        type: "POST",
        url: "http://" + domainText + "/secure_server/user/user_checkUniqueId.do",
        callback:"callbak",
		dataType: "jsonp",
		data:param,	

		//성공하면 성공 메시지가 뜨고 ID 중복 버튼은 비활성화 그리고 ID는 text 필드는 수정 불가
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		alert("ID가 중복되지 않았습니다.");
            		validIdcheck = validIdcheck + 1;
            		$("#btnIDCheck").attr("disabled","true");
            		$("#tbUserID").attr("readonly", true);
            	}
            	
            	// 동일한 ID가 있는 경우
            	if(k=="fail"){
            		alert("동일한 ID가 있습니다.");
            	}
        	});
        },
        
        //404에러와 같이 서버응담이 없는경우 실패 alert만 생성하고 현재 페이지에 위치함
        error: function(){
        	alert("서버 연결 실패");
        }
		
    });
    return false;
	
}





//회원가입처리
// 10. 26. 아이디 중복 체크 기능 수행여부 추가(전역변수) 
function registerComplete(){
	
	var reg_pwd = /^.*(?=.{8,16})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
	var reg_email = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	var reg_phone = /^((01[1|6|7|8|9])[1-9]+[0-9]{6,7})|(010[1-9][0-9]{7})$/;


	/*
	var year = $("#tbBirthYear").val();
	var month = $("#tbBirthMonth").val();
	var day = $("#tbBirthDate").val();
	
	if(!((year < 1900) && (year > 2010) &&(month < 13) && (day<32))){
		alert("생년월일을 정확히 입력해주세요");
		return false;
	}
	*/
	
	// 필수 항목 기입 여부 점검
	if ( $("#tbUserName").val() == "")
	{
		alert("이름을 입력하세요");
		return false;
	} 
	
	if ($("#tbUserID").val().length < 4) 
	{
		alert("입력값 오류! 아이디는 영문,숫자로 4자 이상 입력해주세요.");
		return false;
	} 
	
	
	var passwd = $("#tbPassWord1").val();
	
	if(!reg_pwd.test(passwd)){
		alert("입력값 오류! 비밀번호는 영문, 숫자, 기호를 혼합하여 8자 이상 16자 이하로 만들어주세요.");
		return false;
	}
	
	/*
	if ($("#tbPassWord1").val().length < 8) 
	{
		alert("입력값 오류! 비밀번호는 영문, 숫자, 기호를 혼합하여 8자 이상 16자 이하로 만들어주세요.");
		return false;
	}
	*/

	if ($("#tbPassWord2").val() == "") {
		alert("입력값 오류! 비밀번호 확인을 위해 동일하게 입력해주세요.");
		return false;
	}

	if ($("#tbPassWord1").val() != $("#tbPassWord2").val()) {
		alert("입력값 오류! 입력하신 비밀번호가 다릅니다.");
		return false;
	}
	
	var email = $("#tbEmail1").val() + "@" + $("#tbEmail2").val() ;
	if(!reg_email.test(email)){
		alert("입력값 오류! 이메일을 정확히 입력해주세요.");
		return false;
	}
	
	/*
	if ($("#tbEmail1").val() == "") {
		alert("입력값 오류! 이메일을 정확히 입력해주세요.");
		return false;
	}
	*/

	/*
	if ($("#tbEmail2").val() == "") 
	{
		alert("입력값 오류! 이메일의 도메인을 정확히 입력해주세요.");
		return false;
	}
	*/
	
	

	/*
	if ($("#tbMobil").val() == "") 
	{
		alert("입력값 오류! 휴대전화번호를 입력해주세요.");
		return false;
	} 
	*/
	
	var phone = $("#tbMobil").val();
	if(!reg_phone.test(phone)){
		alert("입력값 오류! 휴대전화번호를 입력해주세요.");
		return false;
	}
	
	var birthYear = $("#tbBirthYear").val();
	var yearOfBirth = parseInt(birthYear);
	if(yearOfBirth <= 1900 || 2015 <= yearOfBirth || isNaN(yearOfBirth)) {
		alert("출생년도를 바르게 입력해 주세요!gg")
		return false;
	}
	
	var birthMonth = $("#tbBirthMonth").val();
	var monthBirth = parseInt(birthMonth);
	if(monthBirth <= 0 || 12 < monthBirth || isNaN(monthBirth)){
		alert("출생 월을 바르게 입력해 주세요!");
		return false;
	}
	
	var birthDay = $("#tbBirthDate").val();
	var dayBirth = parseInt(birthDay);
	if(dayBirth <= 0 || 31 < dayBirth || isNaN(dayBirth)){
		alert("출생 날짜를 바르게 입력해 주세요!");
		return false;
	}
	
	
	if(!document.getElementById("solar").checked && !document.getElementById("lunar").checked){
		alert("양력 음력 표시를 반듣이 해주세요!");
		return false;
	}
	
	
	if(!document.getElementById("gender1").checked && !document.getElementById("gender2").checked){
		alert("성별 표시를 바르게 해 주세요!");
		return false;
	}
	
	
	
	
	if (validIdcheck == 0)
	{
		alert("아이디 중복체크를 해주세요");
		return false;
	}
	
	
	// 전송 메시지 생성:registration.do 서블릿을 확인하여 userController로 ajax로 작성된 JSON 메시지 전송
	// 10.08. POST로 타입 변경
	// 10.09 POST 로 타입 변경후 var 선언 부분 조정

	var birthType = $(':radio[name="BirthType"]:checked').val();
	var sex = $(':radio[name="Gender"]:checked').val();
	
	
	
	var param = "userID="+$("#tbUserID").attr("value")+"&userPassword="+$("#tbPassWord1").attr("value")
	+"&userName="+$("#tbUserName").attr("value")+"&userEmail1="+$("#tbEmail1").attr("value")
	+"&userEmail2="+$("#tbEmail2").attr("value")+"&userPhoneNumber="+$("#tbMobil").attr("value")
	+"&userAddress="+$("#tbAddress").attr("value")+"&userBirthYear="+$("#tbBirthYear").attr("value")
	+"&userBirthMonth="+$("#tbBirthMonth").attr("value")+"&userBirthDate="+$("#tbBirthDate").attr("value")
	+"&userBirthType="+birthType+"&userSex="+sex
	
	
	$.ajax({
        type: "POST",
        url: "http://" + domainText + "/secure_server/user/user_registration.do",
        callback:"callbak",
		dataType: "jsonp",
		data:param,	

		//성공하면 성공 메시지가 뜨고 /success로 이동하고, 실패하면, 처음부터 다시임
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		alert("성공");
            		location.href="./main.html"
            	}
            	
            	if(k=="fail"){
            		alert("사용자 등록에 실패하였습니다. 잠시 후 다시 이용해주세요.");
            	}
        	});
        },
        
        //404에러와 같이 서버응담이 없는경우 실패 alert만 생성하고 현재 페이지에 위치함
        error: function(){
        	alert("실패");
        }
		
    });
    return false;
}

function login(userId, passwd){
	var params = "userID="+userId+"&userPassword="+passwd;
	alert(params);
	
	$.ajax({
        type: "POST",
        url: "http://"+domainText+"/secure_server/user/login.do",
        callback: "callbak",
		dataType: "jsonp",
		data:params,
        success: function(data){
        	$.each(data, function(k,v){
        		console.log(data)
            	if(k=="success"){
            		alert("성공");
            		location.href="./main.html"
            	}
            	
            	if(k=="fail"){
            		alert("사용자 아이디 또는 패스워드가 정확하지 않습니다.");
            		$("#userId").val("");
            		$("#passwd").val("");
            	}
        		
        	});
        }
    });
}


function check()
{
	var id = $("#userId").attr("value");
	var passwd = $("#userPw").attr("value");
	
	if(id == "")
	{
    	alert("아이디를 입력하셔야 합니다.");
 		$("#userId").focus();
 		
 		return false;
	}
	
	if(passwd == "")
	{
	    alert("비밀번호를 입력하셔야 합니다.");
		$("#passwd").focus();
		
		return false;
	}
	
	login(id, passwd);
	
}

function registerUser()
{
	
	location.href="./userRegistrationPage.html"

}


