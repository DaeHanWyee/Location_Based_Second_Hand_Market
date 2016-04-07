<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
 <head>
 <title>게시판</title>
<script type="text/javascript" src="../js/jquery-1.5.2.min.js"></script>
<script type="text/javascript" src="../js/jquery.cookie.js"></script>
<script type="text/javascript" src="../js/addScript.js"></script>
<script type="text/javascript" src="../js/jquery.popupWindow.js"></script>
<script type="text/javascript" src="../js/infobee.common.js"></script>

 <script type="text/javascript">
 
 var html = '<table width="100%" cellpadding="0" cellspacing="0" border="0">';
		html += '<tr height="5"><td width="5"></td></tr>';
		html += '<tr style="background:url('+'img/table_mid.gif'+') repeat-x; text-align:center;">';
		html += '<td width="5"><img src="img/table_left.gif" width="5" height="30" /></td>';
		html += '<td width="73">번호</td>';
		html += '<td width="379">제목</td>';
		html += '<td width="73">작성자</td>';
		html += '<td width="164">작성일</td>';
		html += '<td width="58">추천</td>';
		html += '<td width="58">조회</td>';
		html += '<td width="7"><img src="img/table_right.gif" width="5" height="30" /></td>';
		html += '</tr>';

 
 var domainText = getDomain();
 
 function getDomain() {
	 return "localhost:8080";
 }
 
 
 function loadArticle(num){
	 location.href="writingViewer.jsp?num="+num;
	 
 }
 
 
 function getForumRow() {
	 
	 var userId = "neogeoss";
	 var passwd = "1311";
	 
	 //Map<String, Object> myMap = new HashMap<String, Object>();
	 
	// var row = document.getElementById("1stRow");
	 
	 var params = "userId="+userId+"&userPassword="+passwd;
	 
	 $.ajax({
		 type: "POST",
		 url: "http://"+domainText+"/secure_server/test/test.do",
		 callback: "callback",
		 dataType: "jsonp",
		 data:params,
		 success: function(data) {
			 var htmlInner = html;
			 var myMap = new Map();
			 $.each(data, function(k, v){
//				 if(k=="num")
				
				if(k=="success"){
					console.log("v="+v["num"]);
					 htmlInner += "<tr height='25' align='center'>"
		        			htmlInner += "<td>&nbsp;</td>";
								htmlInner += "<td>"+v['num']+"</td>";
								htmlInner += "<td align='left' onclick='loadArticle("+v['num']+")'>"+v['title']+"</td>";
								htmlInner += "<td align='center'>"+v['writer']+"</td>";
								htmlInner += "<td align='center'>"+v['date']+"</td>";
								htmlInner += "<td align='center'>"+v['like']+"</td>";
								htmlInner += "<td align='center'>"+v['open']+"</td>";
								htmlInner += "<td>&nbsp;</td>";
								htmlInner += "</tr>";
								htmlInner += "<tr height='1' bgcolor='#D2D2D2'><td colspan='8'></td></tr>";
								htmlInner += "<tr height='1' bgcolor='#82B5DF'><td colspan='8' width='752'></td></tr>";

				}

				
				 
				 
				 
				 });
			        htmlInner += '</table>';

					$("#list").html(htmlInner);

					$("#test").attr("disabled", true);

					 
				 
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
 function init(){
		var htmlInner = html;

		htmlInner += '<tr align="center" bgcolor="#FFFFFF" height="30">'
		htmlInner += '<td colspan="6">등록된 글이 없습니다.</td>'
		htmlInner += '</tr>'
		htmlInner += '<tr height="1" bgcolor="#D2D2D2"><td colspan="6"></td></tr>'
		htmlInner += '<tr height="1" bgcolor="#82B5DF"><td colspan="6" width="752"></td></tr>'
		htmlInner += '</table>'

		$("#list").html(htmlInner);
		$("#test").attr("disabled", false);

	}

 
 
 </script>
  </head>
 <body onload="javascript:getForumRow()">
 <div id="list">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr height="5"><td width="5"></td></tr>
 <tr style="background:url('img/table_mid.gif') repeat-x; text-align:center;">
   <td width="5"><img src="img/table_left.gif" width="5" height="30" /></td>
   <td width="73">번호</td>
   <td width="73">글쓴이</td>
   <td width="379">제목</td>
   <td width="164">등록일</td>
   <td width="58">추천</td>
   <td width="58">조회</td>
   <td width="7"><img src="img/table_right.gif" width="5" height="30" /></td>
  </tr>
<tr height="25" align="center">
</tr>
  <tr height="1" bgcolor="#D2D2D2"><td colspan="6"></td></tr>
  
  <tr id="1stRow">
 
  </tr>
  

 <tr height="1" bgcolor="#82B5DF"><td colspan="8" width="752"></td></tr>
 </table>
 </div>
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr><td colspan="4" height="5"></td></tr>
  <tr align="center">
   <td><input type=button value="글쓰기" OnClick="window.location='boardWrite.jsp'"></td>
  </tr>
</table>
</body> 
</html>