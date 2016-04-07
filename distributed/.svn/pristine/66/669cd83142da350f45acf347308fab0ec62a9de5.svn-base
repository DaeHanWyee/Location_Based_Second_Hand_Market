<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>게시판 글보기</title>

<script type="text/javascript" src="../js/jquery-1.5.2.min.js"></script>
<script type="text/javascript" src="../js/jquery.cookie.js"></script>
<script type="text/javascript" src="../js/addScript.js"></script>
<script type="text/javascript" src="../js/jquery.popupWindow.js"></script>
<script type="text/javascript" src="../js/infobee.common.js"></script>

 <script type="text/javascript">
 
 /*var num = document.getElementById('num');
 var open = document.getElementById('open');
 var name = document.getElementById('name');
 var date = document.getElementById('date');
 var bodyWriting = document.getElementById('bodyWriting');*/

 //console.log("What is this? "+num);
 var domainText = getDomain();
 var url = window.location.href;
 var tmpArr = url.split("?");
 var secTmpArr = tmpArr[1].split("=");
 var num = secTmpArr[1];
 
 var mapContainer;
 
 function getDomain() {
	 return "localhost:8080";
 }
 
 function updateTextbox(){
	console.log("Map value " + mapContainer["num"]);
	location.href="boardUpdate.jsp?num="+mapContainer[num-1];
	 // var title = "HIHHIHI";
	// var titleTextBox = $(".title");
	// var bodyTextBox = $(".bodyWriting");
	 //$(".title").empty();
	 //$(".bodyWriting").empty();
	 //$(".title").append("<input name='titleInput' size='50' maxlength='100' id='titleInput'>");
	 
	 //$("#title").val(document.getElementById('num'));
	// $("#titleInput").val(title);  
// $("#bodyWriting").val(document.getElementById('bodyWriting'));
	 
 }
 
 
 function getContents() {
	 
	 var userId = "neogeoss";
	 var passwd = "1311";
	 
	 //Map<String, Object> myMap = new HashMap<String, Object>();
	 
	// var row = document.getElementById("1stRow");
	 
	 var params = "userId="+userId+"&userPassword="+passwd;
	 
	 $.ajax({
		 type: "POST",
		 url: "http://"+domainText+"/secure_server/test/test2.do",
		 callback: "callback",
		 dataType: "jsonp",
		 data:params,
		 success: function(data) {
			 
			 $.each(data, function(k, v){
//				 if(k=="num")
	            console.log("What is K? " + k)
				console.log("Map I get from the server!" + v["num"]);
				//mapContainer = data;
				if(k=="success"){
					mapContainer=v;
					document.getElementById('title').innerHTML = v["title"];
					document.getElementById('num').innerHTML = v["num"];
					document.getElementById('open').innerHTML = v["open"];
					document.getElementById('name').innerHTML = v["name"];
					document.getElementById('date').innerHTML = v["date"];
					document.getElementById('bodyWriting').innerHTML = v["bodyWriting"];

				}

				
				 
				 
				 
				 });
			        /*htmlInner += '</table>';

					$("#list").html(htmlInner);

					$("#test").attr("disabled", true);*/

					 
				 
				/* if(myMap.get("번호")){
				 	row.insertCell(myMap.get("번호")).style.width = "73";
				 } else if (myMap.get("글쓴이")) {
					row.insertCell(myMap.get("글쓴이")).style.width = "73"; 
				 } else if (myMap.get("제목")) {
					row.insertCell(myMap.get("제목")).style.width = "379";
				 } else if (myMap.get("등록일")) {
					row.insertCell(myMap.get("등록일")).style.width = "164";  
				 } else if (myMap.get("추천")) {
					 row.insertCell(myMap.get("추천")).style.width = "58";  
				 } else if (myMap.get("조회")) {
					 row.insertCell(myMap.get("조회")).style.width = "58";
				 }*/
				 
			 }
		 });
	}
 /*function init(){
		var htmlInner = html;

		htmlInner += '<tr align="center" bgcolor="#FFFFFF" height="30">'
		htmlInner += '<td colspan="6">등록된 글이 없습니다.</td>'
		htmlInner += '</tr>'
		htmlInner += '<tr height="1" bgcolor="#D2D2D2"><td colspan="6"></td></tr>'
		htmlInner += '<tr height="1" bgcolor="#82B5DF"><td colspan="6" width="752"></td></tr>'
		htmlInner += '</table>'

		$("#list").html(htmlInner);
		$("#test").attr("disabled", false);

	}*/

 
 
 </script>


</head>
<body onload="javascript:getContents()">
<table>
	<tr>
		<td>
			<table width="100%" cellpadding="0" cellspacing="0" border="0">
				<tr style="background:url('img/table_mid.gif') repeat-x; text-align:center;">
				<td width="8"><img src="img/table_left.gif" width="8" height="30" /></td>
				<td id = "title">내용</td>
				<td width="8"><img src="img/table_right.gif" width="8" height="30" /></td>
			    </tr>
			</table>
			<table width="1500">
		       <tr>
		          <!--  <td width="0">&nbsp;</td>-->
		          <td align="center" width="76">글번호</td>
		          
		          <td width="319" id="num">&nbsp;</td>
		          <td width="0">&nbsp;</td>
		          
		       </tr>
		     		<tr height="1" bgcolor="#dddddd"><td colspan="8" width="407"></td></tr>
		     <tr>
		     	<!--<td width="0">&nbsp;</td>-->
		     	<td align="center" width="76">조회수</td>
		     	
		     	<td width="319" id="open">&nbsp;</td>
		     	<td width="0">&nbsp;</td>
		     	
		     </tr>
		     	<tr height="1" bgcolor="#dddddd"><td colspan="8" width="407"></td></tr>
		     <tr>
		     	<!--  <td width="0">&nbsp;</td>-->
		     	<td align="center" width="76">이름</td>
		     	
		     	<td width="319" id="name">&nbsp;</td>
		     	<td width="0">&nbsp;</td>
		     	
		     </tr>
		     <tr height="1" bgcolor="#dddddd"><td colspan="8" width="407"></td></tr>
		     	<tr>
		     		<!--  <td width="0">&nbsp;</td> -->
		     		<td align="center" width="76">작성일</td>
		     		
		     		<td width="319" id="date">&nbsp;</td>
		     		<td width="0">&nbsp;</td>
		     		
		     	</tr>
		     <tr height="1" bgcolor="#dddddd"><td colspan="8" width="407"></td></tr>
		     	<tr>
		     	<td width="0">&nbsp;</td>
		     	<td width="339" colspan="2" height="200" id="bodyWriting">
		     	&nbsp;
		     	</td>
		     </tr>
		<tr height="1" bgcolor="#dddddd"><td colspan="8" width="407"></td></tr>
		<tr height="1" bgcolor="#82B5DF"><td colspan="8" width="407"></td></tr>
		<tr align="center">
			<td width="0">&nbsp;</td>
			<td colspan="2" width="399"><input type=button value="글쓰기">
				<input type=button value="답글">
				<input type=button value="목록">
				<input type=button value="수정" onclick="updateTextbox();">
				<input type=button value="삭제">
			<td width="0">&nbsp;</td>
		</tr>
		</table>	
		
		     			
		     		
		</td>
		
	</tr>
</table>

</body>
</html>