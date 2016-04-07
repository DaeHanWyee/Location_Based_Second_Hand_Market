var domainText = getDomain();

function board_list_load(page)
{
	member_load();
	
	var isMember = false;
	if(check_session() == "NM"){
		isMember = false;
	}else{
		isMember = true;
	}
	
	if(!isMember){
		$("#write_btn").html('');
	}

	var end = 20;
	var start = parseInt(page)*20-20;
	
//	alert(end+","+start);
	$.ajax({
        type: "GET",
        url: "http://" + domainText + "/secure_server/board/board_comment_number.do?start="+start+"&end="+end,
        callback:"callbak",
		dataType: "jsonp",
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		var html = '<tr height="5"><td width="5"></td></tr>';
            		html += '<tr style="background:url('+'../src/img/table_mid.gif'+') repeat-x; text-align:center;">';
            		html += '<td width="5"><img src="../src/img/table_left.gif" width="5" height="30" /></td>';
            		html += '<td width="73">번호</td>';
            		html += '<td width="73">글쓴이</td>';
            		html += '<td width="379">제목</td>';
            		html += '<td width="164">등록일</td>';
            		html += '<td width="58">추천</td>';
            		html += '<td width="58">조회</td>';
            		html += '<td width="7"><img src="../src/img/table_right.gif" width="5" height="30" /></td>';
            		html += '</tr>';
               		html += '<tr>';
            		$.each(v, function(l,m){
                  	//	console.log(m);
                	//	console.log(m["boardContents"]);
                		
            			var now = new Date();
                		var month = now.getMonth()+1;
                		var nowDate = now.getFullYear() + '-' + month +'-' + now.getDate();
                		var date = m['boardRegdate'];
                		var tmpArr = date.split(' ');
                		//console.log(tmpArr[0]);
                		//console.log(tmpArr[1]);
                		
                		var regdate='';
                		if(nowDate == tmpArr[0])
                			regdate = tmpArr[1].split('.')[0];
                		else
                			regdate = tmpArr[0].substring(2);
                		
                             		
                		
                		html += '<td width="5"></td>';
                		html += '<td width="73" align="center">'+m["boardNumSeq"]+'</td>';
                		html += '<td width="73" align="center">'+m["boardWriter"]+'</td>';
                		if(isMember){
                			if(m['commentCnt'] != '0')
                				html += '<td width="379" onclick="view_article('+m["boardNumSeq"]+')">'+m["boardSubject"]+' ['+m['commentCnt']+']</td>';
                			else
                				html += '<td width="379" onclick="view_article('+m["boardNumSeq"]+')">'+m["boardSubject"]+'</td>';
                		}else{
                			if(m['commentCnt'] != '0')
                				html += '<td width="379">'+m["boardSubject"]+' ['+m['commentCnt']+']</td>';
                			else
                				html += '<td width="379">'+m["boardSubject"]+'</td>';
                		}
                		
                		html += '<td width="164" align="center">'+regdate+'</td>';
                		html += '<td width="58" align="center">'+m["boardRecommendation"]+'</td>';
                		html += '<td width="58" align="center">'+m["boardHits"]+'</td>';
                		html += '<td width="7"></td>';
                		html += '</tr>';
                		html += '<tr height="1" bgcolor="#D2D2D2"><td colspan="6"></td></tr>';
                		html += '<tr height="1" bgcolor="#82B5DF"><td colspan="8" width="752"></td></tr>'
            		});
            		
            		$("#tlist").html(html);
            		
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
	
	load_paging();
	//load_comment_number(page);
	
	//$("#page"+page).css("font-weight","Bold");
	
}

function load_comment_number(page)
{
	var end = 20;
	var start = parseInt(page)*20-20;
	
//	alert(end+","+start);
	$.ajax({
        type: "GET",
        url: "http://" + domainText + "/secure_server/board/board_comment_number.do?start="+start+"&end="+end,
        callback:"callbak",
		dataType: "jsonp",
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		var html = '<tr height="5"><td width="5"></td></tr>';
            		html += '<tr style="background:url('+'../src/img/table_mid.gif'+') repeat-x; text-align:center;">';
            		html += '<td width="5"><img src="../src/img/table_left.gif" width="5" height="30" /></td>';
            		html += '<td width="73">번호</td>';
            		html += '<td width="73">글쓴이</td>';
            		html += '<td width="379">제목</td>';
            		html += '<td width="164">등록일</td>';
            		html += '<td width="58">추천</td>';
            		html += '<td width="58">조회</td>';
            		html += '<td width="7"><img src="../src/img/table_right.gif" width="5" height="30" /></td>';
            		html += '</tr>';
               		html += '<tr>';
            		$.each(v, function(l,m){
                  		console.log(m);
                	//	console.log(m["boardContents"]);
                		
            			var now = new Date();
                		var month = now.getMonth()+1;
                		var nowDate = now.getFullYear() + '-' + month +'-' + now.getDate();
                		var date = m['boardRegdate'];
                		var tmpArr = date.split(' ');
                		//console.log(tmpArr[0]);
                		//console.log(tmpArr[1]);
                		
                		var regdate='';
                		if(nowDate == tmpArr[0])
                			regdate = tmpArr[1].split('.')[0];
                		else
                			regdate = tmpArr[0].substring(2);
                		
                             		
                		
                		html += '<td width="5"></td>';
                		html += '<td width="73" align="center">'+m["boardNumSeq"]+'</td>';
                		html += '<td width="73" align="center">'+m["boardWriter"]+'</td>';
                	//	if(isMember)
                	//		html += '<td width="379" onclick="view_article('+m["boardNumSeq"]+')">'+m["boardSubject"]+'</td>';
                	//	else
                	//		html += '<td width="379">'+m["boardSubject"]+'</td>';
                		
                		html += '<td width="164" align="center">'+regdate+'</td>';
                		html += '<td width="58" align="center">'+m["boardRecommendation"]+'</td>';
                		html += '<td width="58" align="center">'+m["boardHits"]+'</td>';
                		html += '<td width="7"></td>';
                		html += '</tr>';
                		html += '<tr height="1" bgcolor="#D2D2D2"><td colspan="6"></td></tr>';
                		html += '<tr height="1" bgcolor="#82B5DF"><td colspan="8" width="752"></td></tr>'
            		});
            		
            	//	$("#tlist").html(html);
            		
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

function load_paging(){
	
	$.ajax({
        type: "GET",
        url: "http://" + domainText + "/secure_server/board/board_count.do",
        callback:"callbak",
		dataType: "jsonp",
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		var count = parseInt(v);
            		var pageCount = count/20;
            		var html = '';
            		
            		for(i=1; i<pageCount+1; i++){
            			html += "<a href='#' onclick='board_list_load("+i+")'><span id='page"+i+"'>"+i+"</span></a>&nbsp";
            		}
          			$("#paging").html(html);
            		
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

function view_article(seq){
	location.href="boardViewPage.html?seq="+seq;
}


function board_write_load(){
	member_load();
	
	$("#name").val(sessionStorage.getItem("secure.id"));
}

function write_check(flag) {
	
	if ( $("#title").val() == '' ) {
		alert("제목을 적어주세요");
		return;
	}
	
	if ( $("#passwd").val() == '' ) {
		alert( "비밀번호를 적어주세요" );
		return;
	}
	
	if ( $("#content").val() == '') {
		alert("내용을 적어주세요")
		return;
	}
	
	if(flag == '0')
		write_submit();
	if(flag == '1')
		update_submit();
	
}



function write_submit(){

	
	var params = "boardSubject="+$("#title").val()+"&boardWriter="+$("#name").val()+"&boardPassword="+$("#passwd").val()+
	"&boardContents="+$("#content").val()+"&boardType=0";
	
	
	$.ajax({
        type: "POST",
        url: "http://" + domainText + "/secure_server/board/board_write.do",
        callback:"callbak",
		dataType: "jsonp",
		data:params,	
		//성공하면 성공 메시지가 뜨고 ID 중복 버튼은 비활성화 그리고 ID는 text 필드는 수정 불가
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		location.href="boardListPage.html?page=1";
            	}
            	
            	// 동일한 ID가 있는 경우
            	if(k=="fail"){
            		alert("게시글 작성에 실패하였습니다.");
            	}
        	});
        },
        
        //404에러와 같이 서버응담이 없는경우 실패 alert만 생성하고 현재 페이지에 위치함
        error: function(){
        	alert("서버 연결 실패");
        }
		
    });
}

function board_view_load(){
	member_load();
	
	
	
	var url      = window.location.href; 
	var tmpArr = url.split("?");
	var tmp1Arr = tmpArr[1].split("=");
	var seq = tmp1Arr[1];
	
	var params = "boardNumSeq="+seq+"&boardWriter="+sessionStorage.getItem("secure.id");
	
	$.ajax({
        type: "GET",
        url: "http://" + domainText + "/secure_server/board/board_view.do",
        callback:"callbak",
		dataType: "jsonp",
		data:params,
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		console.log(v);
            		$("#num").text(v["boardNumSeq"]);
            		$("#title").text(v["boardSubject"]);
            		$("#name").text(v["boardWriter"]);
            		$("#reg").text(v["boardRegdate"]);
            		$("#hit").text(v["boardHits"]);
            		$("#content").text(v["boardContents"]);
            		$("#writer_id").val(v["boardWriter"]);
            		
            		if(v["boardWriter"] == sessionStorage.getItem("secure.id")){
            			$("#reco").css("display", "none");
            		}
               		
            	}
            	
            	console.log($("#writer_id").val());
            	
            	if(sessionStorage.getItem("secure.id") != $("#writer_id").attr("value")){
            		$("#mod_btn").css("display","none");
            		$("#remove_btn").css("display","none");
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
	
	board_comment_load();
	
}

function moveList(){
	location.href="boardListPage.html";
}

function moveMod(){
	var url      = window.location.href; 
	var tmpArr = url.split("?");
	var tmp1Arr = tmpArr[1].split("=");
	var seq = tmp1Arr[1];
	
	location.href="boardModifyPage.html?seq="+seq;
}

function remove_article(){
	var result = confirm("정말 삭제합니까?");
	
	if(result){
		var url      = window.location.href; 
		var tmpArr = url.split("?");
		var tmp1Arr = tmpArr[1].split("=");
		var seq = tmp1Arr[1];
		
		$.ajax({
	        type: "GET",
	        url: "http://" + domainText + "/secure_server/board/board_remove.do?boardNumSeq="+seq+"&boardWriter="+sessionStorage.getItem("secure.id"),
	        callback:"callbak",
			dataType: "jsonp",
			success:
				function(data){
	        	$.each(data, function(k,v){
	            	if(k=="success"){
	            		location.href="boardListPage.html?page=1";	            			               		
	            	}

	            	if(k=="fail"){
	            		alert("fail!!")
	            	}
	        	});
	        },
	        
	        //404에러와 같이 서버응담이 없는경우 실패 alert만 생성하고 현재 페이지에 위치함
	        error: function(){
	        	alert("서버 연결 실패");
	        }
			
	    });
		
	}
}

function board_modify_load(){
	member_load();
	
	var url      = window.location.href; 
	var tmpArr = url.split("?");
	var tmp1Arr = tmpArr[1].split("=");
	var seq = tmp1Arr[1];
	
	$.ajax({
        type: "GET",
        url: "http://" + domainText + "/secure_server/board/board_view.do?boardNumSeq="+seq+"&boardWriter="+sessionStorage.getItem("secure.id"),
        callback:"callbak",
		dataType: "jsonp",
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		$("#title").val(v["boardSubject"]);
            		$("#name").val(v["boardWriter"]);
            		$("#content").val(v["boardContents"]);
               		
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

function update_submit(){
	var url      = window.location.href; 
	var tmpArr = url.split("?");
	var tmp1Arr = tmpArr[1].split("=");
	var seq = tmp1Arr[1];
	var params = "boardSubject="+$("#title").val()+"&boardPassword="+$("#passwd").val()+
	"&boardContents="+$("#content").val()+"&boardType=0&boardNumSeq="+seq;
	
	alert(params);
	
	$.ajax({
        type: "POST",
        url: "http://" + domainText + "/secure_server/board/board_update.do",
        callback:"callbak",
		dataType: "jsonp",
		data:params,	
		//성공하면 성공 메시지가 뜨고 ID 중복 버튼은 비활성화 그리고 ID는 text 필드는 수정 불가
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		location.href="boardListPage.html?page=1";
            	}
            	
            	// 동일한 ID가 있는 경우
            	if(k=="fail"){
            		alert("게시글 작성에 실패하였습니다.");
            	}
        	});
        },
        
        //404에러와 같이 서버응담이 없는경우 실패 alert만 생성하고 현재 페이지에 위치함
        error: function(){
        	alert("서버 연결 실패");
        }
		
    });
}

function comment_write(step, upperSeq)
{
	if(step == '1'){
	if($("#comment").val() == ''){
		alert("내용을 입력하세요.");
		return;
	}
	}
	
	var seq = getUrlSeq();
	var params = '';
	if(step == '1'){
		params = "boardWriter="+sessionStorage.getItem("secure.id")
	+"&boardType=0&boardContents="+$("#comment").val()+"&boardStep="+step+"&boardUpper="+seq+"&boardRootUpper="+seq;
	} else if(step =='2'){
		params = "boardWriter="+sessionStorage.getItem("secure.id")
	+"&boardType=0&boardContents="+$("#comment"+upperSeq).val()+"&boardStep="+step+"&boardUpper="+upperSeq+"&boardRootUpper="+seq;
	}

	
	$.ajax({
        type: "POST",
        url: "http://" + domainText + "/secure_server/board/board_comment_write.do",
        callback:"callbak",
		dataType: "jsonp",
		data:params,	
		//성공하면 성공 메시지가 뜨고 ID 중복 버튼은 비활성화 그리고 ID는 text 필드는 수정 불가
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		location.href="boardViewPage.html?seq="+seq;
            	}
            	
            	// 동일한 ID가 있는 경우
            	if(k=="fail"){
            		alert("게시글 작성에 실패하였습니다.");
            	}
        	});
        },
        
        //404에러와 같이 서버응담이 없는경우 실패 alert만 생성하고 현재 페이지에 위치함
        error: function(){
        	alert("서버 연결 실패");
        }
		
    });
	
}
	
function board_comment_load(){
	var seq = getUrlSeq();
	var html='';
	var upperSeq;
	
	$.ajax({
        type: "GET",
        url: "http://" + domainText + "/secure_server/board/board_comment_list.do?boardUpper="+seq,
        callback:"callbak",
		dataType: "jsonp",
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		console.log(v);
            		$.each(v, function(l,m){
             			html += '<div style="border: 1px solid #dddddd; padding: 10px; height: 100px; margin-top:5px;">';
                		html += '<div>'+m['boardWriter']+'</div>';
                		html += '<div>'+m['boardContents']+'</div>';
                		if(m['boardWriter'] == sessionStorage.getItem("secure.id")){
                			html += '<div style="float:right;">'
                				+'<p><b onclick="board_comment_remove('+m['boardNumSeq']+',1)">[삭제]</b><b onclick="step2_comment('+m['boardNumSeq']+')">[덧글]</b></p>'
                				+'</div>';
                		}else{
                			html += '<div style="float:right;">'
                				+'<p><b onclick="step2_comment('+m['boardNumSeq']+')">[덧글]</b></p>'
                				+'</div>';
                			
                		}
                		html += '</div>';
                		
                		html += '<div id="step2'+m['boardNumSeq']+'"></div>';
                		upperSeq = 	m['boardNumSeq'];
                		board_comment_load_step2(upperSeq);
                		
                		html += '<div id="step2Comment'+m['boardNumSeq']+'" style="display:none">';
                		html += '<textarea name="memo" cols="110" rows="5" id="comment'+m['boardNumSeq']+'"></textarea></br>';
                		html += '<p><b onclick="step2_comment_write('+m['boardNumSeq']+')">[댓글]</b><b onclick="step2_comment_cancle('+m['boardNumSeq']+')">[취소]</b></p>'
                		html += '</div>';
                			
            		});

            		$("#commentList").append(html);
               		
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

function board_comment_load_step2(seq)
{
	var html='';
	$.ajax({
        type: "GET",
        url: "http://" + domainText + "/secure_server/board/board_comment_list.do?boardUpper="+seq,
        callback:"callbak",
		dataType: "jsonp",
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		console.log(v);
            		$.each(v, function(l,m){
             			html += '<div style="border: 1px solid #dddddd; padding: 10px; height: 100px; margin-top:5px; margin-left:15px;">';
                		html += '<div>'+m['boardWriter']+'</div>';
                		html += '<div>'+m['boardContents']+'</div>';
                		if(m['boardWriter'] == sessionStorage.getItem("secure.id")){
                			html += '<div style="float:right;">'
                				+'<p><b onclick="board_comment_remove('+m['boardNumSeq']+',2)">[삭제]</b></p>'
                				+'</div>';
                		}
                		html += '</div>';
                		                			
            		});

            		$("#step2"+seq).append(html);
               		
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

function board_comment_remove(cseq, step){
	var params="boardNumSeq="+cseq+"&step="+step;
	var seq = getUrlSeq();
	
	$.ajax({
        type: "POST",
        url: "http://" + domainText + "/secure_server/board/board_comment_remove.do",
        callback:"callbak",
		dataType: "jsonp",
		data:params,	
		//성공하면 성공 메시지가 뜨고 ID 중복 버튼은 비활성화 그리고 ID는 text 필드는 수정 불가
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		location.href="boardViewPage.html?seq="+seq;
            	}
            	
            	// 동일한 ID가 있는 경우
            	if(k=="fail"){
            		alert("게시글 작성에 실패하였습니다.");
            	}
        	});
        },
        
        //404에러와 같이 서버응담이 없는경우 실패 alert만 생성하고 현재 페이지에 위치함
        error: function(){
        	alert("서버 연결 실패");
        }
		
    });
}

function step2_comment(seq){
	$("#step2Comment"+seq).css("display","block");

}

function step2_comment_write(upperSeq){
	comment_write(2, upperSeq);

}

function step2_comment_cancle(seq){
	$("#step2Comment"+seq).css("display","none");	
}

function recommend()
{
	var seq = getUrlSeq();
	
	$.ajax({
        type: "GET",
        url: "http://" + domainText + "/secure_server/board/board_recommand.do?boardNumSeq="+seq,
        callback:"callbak",
		dataType: "jsonp",
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		console.log(v);
            		$.each(v, function(l,m){
             		
                			
            		});

            		
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
