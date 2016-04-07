var domainText = getDomain();


function main_load(){
	/*
	var tmp = check_session();
	if(tmp == "TM"){
		$("#non_member").invisible();
		$("#member").visible();
	}else{
		$("#non_member").visible();
		$("#member").invisible();
	}
	
	$("#identify").text(sessionStorage.getItem("secure.id")+"님");
*/
	member_load();
	
	set_freeboard();
	set_market();
}

function validatedAccess(validatedAccessInfo, nextPage){
	//Validated Access Control.
	console.log(nextPage + "Next page information");
	sessionStorage.setItem("secure.validatedAccess", validatedAccessInfo);
	console.log("Session storage value : " + validatedAccessInfo);
	window.location.href=nextPage;
	
}



function set_freeboard(){
	var end = 8;
	var start = 0;
	
//	alert(end+","+start);
	$.ajax({
        type: "GET",
        url: "http://" + domainText + "/secure_server/board/board_list.do?start="+start+"&end="+end,
        callback:"callbak",
		dataType: "jsonp",
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
               		var html ='';
            		$.each(v, function(l,m){
                	//	console.log(m["boardContents"]);
            			html += '<a href="#" onclick="move_view(1,'+m['boardNumSeq']+')"><h5>'+m['boardSubject']+'</h5></a>';     		
                		
            		});
            		
            		//console.log(html);
            		
            		$("#free_board").append(html);
            		
            	}

            	if(k=="fail"){
            		html = '<tr height="25" align="center" id="default">';
            		html += '<td colspan="6"> 게시글이 없습니다.</td>';
            		html += '</tr>';
            		html += '<tr height="1" bgcolor="#D2D2D2"><td colspan="6"></td></tr>';
            		html += '<tr id="1stRow">';
            		html += '</tr>';
            		html += '<tr height="1" bgcolor="#82B5DF"><td colspan="8" width="752"></td></tr>';
            	}
        	});
        },
        
        //404에러와 같이 서버응담이 없는경우 실패 alert만 생성하고 현재 페이지에 위치함
        error: function(){
        	alert("서버 연결 실패");
        }
		
    });
	
}

function set_market(){
	var end = 8;
	var start = 0;
	
//	alert(end+","+start);
	$.ajax({
        type: "GET",
        url: "http://" + domainText + "/secure_server/goods/goods_list.do?start="+start+"&end="+end,
        callback:"callbak",
		dataType: "jsonp",
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
               		var html ='';
            		$.each(v, function(l,m){
                	//	console.log(m["boardContents"]);
            			html += '<a href="#" onclick="move_view(2,'+m['goodsNumSeq']+')"><h5>'+m['goodsSubject']+'</h5></a>';     		
                		
            		});
            		
            		//console.log(html);
            		
            		$("#market_board").append(html);
            		
            	}

            	if(k=="fail"){
            		html = '<tr height="25" align="center" id="default">';
            		html += '<td colspan="6"> 게시글이 없습니다.</td>';
            		html += '</tr>';
            		html += '<tr height="1" bgcolor="#D2D2D2"><td colspan="6"></td></tr>';
            		html += '<tr id="1stRow">';
            		html += '</tr>';
            		html += '<tr height="1" bgcolor="#82B5DF"><td colspan="8" width="752"></td></tr>';
            	}
        	});
        },
        
        //404에러와 같이 서버응담이 없는경우 실패 alert만 생성하고 현재 페이지에 위치함
        error: function(){
        	alert("서버 연결 실패");
        }
		
    });
}


function move_view(type, seq){
	var isMember = false;
	if(check_session() == "NM"){
		isMember = false;
	}else{
		isMember = true;
	}

	if(isMember){
		if(type == '1')
			location.href="boardViewPage.html?seq="+seq;
		else
			location.href="goodsViewPage.html?seq="+seq+"&boardWriter="+sessionStorage.getItem("secure.id");
	}else
		alert("로그인하세요.");
}

function getUserList(page){
	
	var end = 20;
	var start = parseInt(page)*20-20;
	
	$.ajax({
        type: "GET",
        url: "http://" + domainText + "/secure_server/user/user_list.do?start="+start+"&end="+end,
        callback:"callbak",
		dataType: "jsonp",
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		console.log(v);
            	}

            	if(k=="fail"){
            	}
        	});
        },
        
        //404에러와 같이 서버응담이 없는경우 실패 alert만 생성하고 현재 페이지에 위치함
        error: function(){
        	alert("서버 연결 실패");
        }
		
    });
}

function updateUserAuth(authType){
	var params = "seqs=3,4,5,6";
	params += "&userAuthority=" + authType;
	
	$.ajax({
        type: "POST",
        url: "http://" + domainText + "/secure_server/user/user_updateAuthority.do",
        callback:"callbak",
		dataType: "jsonp",
		data:params,	
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		console.log(v);
            	}

            	if(k=="fail"){
            	}
        	});
        },
        
        //404에러와 같이 서버응담이 없는경우 실패 alert만 생성하고 현재 페이지에 위치함
        error: function(){
        	alert("서버 연결 실패");
        }
		
    });
}
