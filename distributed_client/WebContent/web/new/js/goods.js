var domainText = getDomain();

function goods_list_load(page)
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
        url: "http://" + domainText + "/secure_server/goods/goods_list.do?start="+start+"&end="+end,
        callback:"callbak",
		dataType: "jsonp",
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
               		var html = '';
               		html += '<tr height="5"><td width="5"></td></tr>';
               		html += '<tr style="background:url('+'../src/img/table_mid.gif'+') repeat-x; text-align:center;">';
            		html += '<td width="5"><img src="../src/img/table_left.gif" width="5" height="30" /></td>';
            		html += '<td width="73">번호</td>';
            		html += '<td width="73">글쓴이</td>';
            		html += '<td width="379">제목</td>';
            		html += '<td width="82">등록일</td>';
            		html += '<td width="82">재고수</td>';
            		html += '<td width="58">추천</td>';
            		html += '<td width="58">조회</td>';
            		html += '<td width="7"><img src="../src/img/table_right.gif" width="5" height="30" /></td>';
            		html += '</tr>';
               		
               		
               		
               		
               		
               		
            		$.each(v, function(l,m){
                  	//	console.log(m);
                	//	console.log(m["boardContents"]);
                		
            			var now = new Date();
                		var month = now.getMonth()+1;
                		var nowDate = now.getFullYear() + '-' + month +'-' + now.getDate();
                		var date = m['goodsRegdate'];
                		var tmpArr = date.split(' ');
                		//console.log(tmpArr[0]);
                		//console.log(tmpArr[1]);
                		
                		var regdate='';
                		if(nowDate == tmpArr[0])
                			regdate = tmpArr[1].split('.')[0];
                		else
                			regdate = tmpArr[0].substring(2);
                		
                             		
                		
                		html += '<td width="5"></td>';
                		html += '<td width="73" align="center">'+m["goodsNumSeq"]+'</td>';
                		html += '<td width="73" align="center">'+m["goodsWriter"]+'</td>';
                		if(isMember)
                			html += '<td width="379" onclick="view_article('+m["goodsNumSeq"]+')">'+m["goodsSubject"]+'</td>';
                		else
                			html += '<td width="379">'+m["goodsSubject"]+'</td>';
                		
                		html += '<td width="82" align="center">'+regdate+'</td>';
                		html += '<td width="82" align="center">'+m["goodsStockcount"]+'</td>';
                		html += '<td width="58" align="center">'+m["goodsRecommendation"]+'</td>';
                		html += '<td width="58" align="center">'+m["goodsHits"]+'</td>';
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
            		
            		$("#tlist").append(html);
            	}
        	});
        },
        
        //404에러와 같이 서버응담이 없는경우 실패 alert만 생성하고 현재 페이지에 위치함
        error: function(){
        	alert("서버 연결 실패");
        }
		
    });
	
	load_paging();
}

function view_article(seq){
	location.href="goodsViewPage.html?seq="+seq;
}


function goods_write_load(){
	member_load();
	
	$("#name").val(sessionStorage.getItem("secure.id"));
}

function write_check(flag) {
	
	if ( $("#title").val() == '' ) {
		alert("제목을 적어주세요");
		return;
	}
	
	if ( $("#stockcount").val() == '') {
		alert("재고수량을 적어주세요")
		return;
	}
	
	var stockCount = $("#stockcount").val();
    for (var i=0; i<stockCount.length; i++) {
        if (stockCount.charAt(i)<'0' || stockCount.charAt(i)>'9') {
            alert('재고수량은 숫자만 입력가능합니다.');
            return false;
        }
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

	
	var params = "goodsSubject="+$("#title").val()+"&goodsWriter="+$("#name").val()+
	"&goodsStockcount="+$("#stockcount").val()+"&goodsContents="+$("#content").val();
	
	
	$.ajax({
        type: "POST",
        url: "http://" + domainText + "/secure_server/goods/goods_write.do",
        callback:"callbak",
		dataType: "jsonp",
		data:params,	
		//성공하면 성공 메시지가 뜨고 ID 중복 버튼은 비활성화 그리고 ID는 text 필드는 수정 불가
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		$('#hiddenFrame').contents().find("#sellCarSeq").val(v);  
            		
            		console.log($('#hiddenFrame').contents().find("#imgBlock1").children().length);
            	           		
            		if($('#hiddenFrame').contents().find("#imgBlock1").children().length > 1){
    		       		document.getElementById('hiddenFrame').contentDocument.sellFile.action = "http://" + domainText + "/secure_server/attachfile/file_upload.do";
    		       		document.getElementById('hiddenFrame').contentDocument.sellFile.submit();
    		       	}
            		
            		
            		location.href="goodsListPage.html?page=1";
            	}
            	
            	// 동일한 ID가 있는 경우
            	if(k=="fail"){
            		alert("장터 게시글 작성에 실패하였습니다.");
            	}
        	});
        },
        
        //404에러와 같이 서버응담이 없는경우 실패 alert만 생성하고 현재 페이지에 위치함
        error: function(){
        	alert("서버 연결 실패");
        }
		
    });
}

function goods_view_load(){
	member_load();
		
	var url      = window.location.href; 
	var tmpArr = url.split("?");
	var tmp1Arr = tmpArr[1].split("=");
	var seq = tmp1Arr[1];
	
	$.ajax({
        type: "GET",
        url: "http://" + domainText + "/secure_server/goods/goods_view.do?goodsNumSeq="+seq,
        callback:"callbak",
		dataType: "jsonp",
		success:
			function(data){
        	$.each(data, function(k,v){
            	var attachImg = '';
            	if(k == "files"){
            		console.log(v);
            		$.each(v, function(i,m){
            			console.log(m['attachFileName']);
        				var downLoadUrl = "http://" + domainText + "/secure_server/attachfile/file_download.do?attachSeq="+m["attachSeq"];
        				//if(imgCnt==1) 
        				//	mainImg = downLoadUrl;
        				attachImg += "<img src='"+downLoadUrl+"' style='margin:0 6px;width:100%;height:100%' class='bd_g' /></br>";
            			
            		});
            		$("#img").append(attachImg);
            	}
        		
            	if(k=="success"){
            		console.log(v);
            		$("#num").text(v["goodsNumSeq"]);
            		$("#title").text(v["goodsSubject"]);
            		$("#name").text(v["goodsWriter"]);
            		$("#reg").text(v["goodsRegdate"]);
            		$("#hit").text(v["goodsHits"]);
            		$("#stockcount").text(v["goodsStockcount"]);
            		$("#text").text(v["goodsContents"]);
            		$("#writer_id").val(v["goodsWriter"]);
            		
            		if(v["goodsWriter"] == sessionStorage.getItem("secure.id")){
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
	
	goods_comment_load();
	
}

function moveList(){
	location.href="goodsListPage.html";
}

function moveMod(){
	var url      = window.location.href; 
	var tmpArr = url.split("?");
	var tmp1Arr = tmpArr[1].split("=");
	var seq = tmp1Arr[1];
	
	location.href="goodsModifyPage.html?seq="+seq;
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
	        url: "http://" + domainText + "/secure_server/goods/goods_remove.do?goodsNumSeq="+seq+"&goodsWriter="+sessionStorage.getItem("secure.id"),
	        callback:"callbak",
			dataType: "jsonp",
			success:
				function(data){
	        	$.each(data, function(k,v){
	            	if(k=="success"){
	            		remove_attachfile(seq);
	            		
	            		location.href="goodsListPage.html?page=1";	            			               		
	            	}

	            	if(k=="fail"){
	            		alert("fail!!");
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

function goods_modify_load(){
	member_load();
	
	var url      = window.location.href; 
	var tmpArr = url.split("?");
	var tmp1Arr = tmpArr[1].split("=");
	var seq = tmp1Arr[1];
	
	$.ajax({
        type: "GET",
        url: "http://" + domainText + "/secure_server/goods/goods_view.do?goodsNumSeq="+seq+"&goodsWriter="+sessionStorage.getItem("secure.id"),
        callback:"callbak",
		dataType: "jsonp",
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		$("#title").val(v["goodsSubject"]);
            		$("#name").val(v["goodsWriter"]);
            		$("#stockcount").val(v["goodsStockcount"]);
            		$("#content").val(v["goodsContents"]);
               		
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
	var params = "goodsSubject="+$("#title").val()+"&goodsStockcount="+$("#stockcount").val()+
	"&goodsContents="+$("#content").val()+"&goodsNumSeq="+seq;
	
	alert(params);
	
	$.ajax({
        type: "POST",
        url: "http://" + domainText + "/secure_server/goods/goods_update.do",
        callback:"callbak",
		dataType: "jsonp",
		data:params,	
		//성공하면 성공 메시지가 뜨고 ID 중복 버튼은 비활성화 그리고 ID는 text 필드는 수정 불가
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		location.href="goodsListPage.html?page=1";
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


function goods_comment_load(){
	var seq = getUrlSeq();
	var html='';
	var upperSeq;
	
	$.ajax({
        type: "GET",
        url: "http://" + domainText + "/secure_server/goods/goods_comment_list.do?goodsUpper="+seq,
        callback:"callbak",
		dataType: "jsonp",
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		console.log(v);
            		$.each(v, function(l,m){
             			html += '<div style="border: 1px solid #dddddd; padding: 10px; height: 100px; margin-top:5px;">';
                		html += '<div>'+m['goodsWriter']+'</div>';
                		html += '<div>'+m['goodsContents']+'</div>';
                		if(m['goodsWriter'] == sessionStorage.getItem("secure.id")){
                			html += '<div style="float:right;">'
                				+'<p><b onclick="goods_comment_remove('+m['goodsNumSeq']+',1)">[삭제]</b><b onclick="step2_comment('+m['goodsNumSeq']+')">[덧글]</b></p>'
                				+'</div>';
                		}
                		html += '</div>';
                		
                		html += '<div id="step2'+m['goodsNumSeq']+'"></div>';
                		upperSeq = 	m['goodsNumSeq'];
                		goods_comment_load_step2(upperSeq);
                		
                		html += '<div id="step2Comment'+m['goodsNumSeq']+'" style="display:none">';
                		html += '<textarea name="memo" cols="110" rows="5" id="comment'+m['goodsNumSeq']+'"></textarea></br>';
                		html += '<p><b onclick="step2_comment_write('+m['goodsNumSeq']+')">[댓글]</b><b onclick="step2_comment_cancle('+m['goodsNumSeq']+')">[취소]</b></p>'
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

function goods_comment_load_step2(seq)
{
	var html='';
	$.ajax({
        type: "GET",
        url: "http://" + domainText + "/secure_server/goods/goods_comment_list.do?goodsUpper="+seq,
        callback:"callbak",
		dataType: "jsonp",
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		console.log(v);
            		$.each(v, function(l,m){
             			html += '<div style="border: 1px solid #dddddd; padding: 10px; height: 100px; margin-top:5px; margin-left:15px;">';
                		html += '<div>'+m['goodsWriter']+'</div>';
                		html += '<div>'+m['goodsContents']+'</div>';
                		if(m['goodsWriter'] == sessionStorage.getItem("secure.id")){
                			html += '<div style="float:right;">'
                				+'<p><b onclick="goods_comment_remove('+m['goodsNumSeq']+',2)">[삭제]</b></p>'
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
		params = "goodsWriter="+sessionStorage.getItem("secure.id")
	+"&goodsContents="+$("#comment").val()+"&goodsStep="+step+"&goodsUpper="+seq+"&goodsRootUpper="+seq;
	} else if(step =='2'){
		params = "goodsWriter="+sessionStorage.getItem("secure.id")
	+"&goodsContents="+$("#comment"+upperSeq).val()+"&goodsStep="+step+"&goodsUpper="+upperSeq+"&goodsRootUpper="+seq;
	}

	
	$.ajax({
        type: "POST",
        url: "http://" + domainText + "/secure_server/goods/goods_comment_write.do",
        callback:"callbak",
		dataType: "jsonp",
		data:params,	
		//성공하면 성공 메시지가 뜨고 ID 중복 버튼은 비활성화 그리고 ID는 text 필드는 수정 불가
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		location.href="goodsViewPage.html?seq="+seq;
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


function goods_comment_remove(cseq, step){
	var params="goodsNumSeq="+cseq+"&step="+step;
	var seq = getUrlSeq();
	
	$.ajax({
        type: "POST",
        url: "http://" + domainText + "/secure_server/goods/goods_comment_remove.do",
        callback:"callbak",
		dataType: "jsonp",
		data:params,	
		//성공하면 성공 메시지가 뜨고 ID 중복 버튼은 비활성화 그리고 ID는 text 필드는 수정 불가
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		location.href="goodsViewPage.html?seq="+seq;
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


function deletefile(val){
//	$('#hiddenFrame').contains().find("#imgData_"+val).html()
//	console.log(val);
//	console.log($('#hiddenFrame').contents().find("#imgBlock1").html());
	$('#hiddenFrame').contents().find("#imgData_"+val).detach();
/*
	if($("#fileboxes").children().length==1){
		$("#filebox"+(val-1)).detach();
		var html = "<div class='filebox' id='filebox1'>"
		html +=	"<table id='fileboxTable' width='400' border='0' align='center' cellpadding='0' cellspacing='0'>"
		html += "<tr id='tr0'>"
		html += "<td height='20' id='realFileName'></td>"
		html += "<td align='right' id='deleteImg'></td>"
		html += "</tr></table></div>"
		$("#fileboxes").html(html);
	}
	*/
	
	$("#filebox"+val).detach();
	
	attachFileChanged = true;
	
}

function decideBuyGoods(){
	var seq = getUrlSeq();
	
	$.ajax({
        type: "GET",
        url: "http://" + domainText + "/secure_server/goods/goods_get_phone.do?goodsNumSeq="+seq,
        callback:"callbak",
		dataType: "jsonp",
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		console.log(v);
            		$("#phone").text(v);
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

function recommend()
{
	var seq = getUrlSeq();
	
	$.ajax({
        type: "GET",
        url: "http://" + domainText + "/secure_server/goods/goods_recommand.do?goodsNumSeq="+seq,
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

function load_paging(){
	
	$.ajax({
        type: "GET",
        url: "http://" + domainText + "/secure_server/goods/goods_count.do",
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
            			html += "<a href='#' onclick='goods_list_load("+i+")'><span id='page"+i+"'>"+i+"</span></a>&nbsp";
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

function remove_attachfile(seq){
	
	var params = "attachSeq="+seq;
	
	$.ajax({
        type: "POST",
        url: "http://" + domainText + "/secure_server//attachfile/file_delete.do",
        callback:"callbak",
		dataType: "jsonp",
		data:params,	
		//성공하면 성공 메시지가 뜨고 ID 중복 버튼은 비활성화 그리고 ID는 text 필드는 수정 불가
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		alert("성공");
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