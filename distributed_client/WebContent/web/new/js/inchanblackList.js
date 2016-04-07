/**
 * 
 */

var domainText = getDomain();
//var myArray=[];

/*
$(document).ready(function(){
	//일단 Ajax로 받아온 오프젝트 배열 데이터를 콜백으로 받아 처리한다. 코드의 미적 생김새를 강조한 구성이다. 
	member_load();
	getUserList(1, function(valueArray){
		$("#userTable").empty();
		//console.log(valueArray);
		$.each(valueArray, function(index, value){
			if (index == "success"){
			   
			   for (x in value){
				   //줄단위로 재생성한다.
				   reconstructTable(x, value[x]); 
				   
			   }
			   
			
			}
		});
		
		
	});
	
});
*/

//테이블 재 생성
function reconstructTable(userNum, arrayRowObj){
	
	var blackListedManOrNot="";//블랙 리스트 고객인지 아닌지 그애 따라  다른 스트링 값을 준다.
	console.log(arrayRowObj);
	console.log("tableReconstruction!");
	//seqNum = parseInt(userNum) + 1;//일단 유저에 대한 번호가 리던 되지 않으므로 이렇게 개산하였다.
	
	//블랙 리스트 고객인지 아닌지 그애 따라  다른 스트링 값을 준다.
	if(parseInt(arrayRowObj.userAuthority) == 0){
		blackListedManOrNot = "관리자";
	} else if (parseInt(arrayRowObj.userAuthority) == 1){
		blackListedManOrNot = "일반";
	} else {
		blackListedManOrNot = "블랙리스트";
	}
	
	
	//블랙 리스트 고객은 checked된 체크 박스를 집어 넣는다. 일단 체크 박스에 아이디를 유저 번호로 넣는다.
	if(parseInt(arrayRowObj.userAuthority) == 0 || parseInt(arrayRowObj.userAuthority) == 1){
		checkBoxForRow = '<td class="num"><input type = "checkbox" id="'+ arrayRowObj.userNumSeq +'" ></td>';
	} else {
		checkBoxForRow = '<td class="num"><input type = "checkbox" id="'+ arrayRowObj.userNumSeq +'"  ></td>';
	}
	
	var cntSum = parseInt(arrayRowObj.userBoardCount) + parseInt(arrayRowObj.userGoodsCount);
	
	//줄단위로 페이지를 재 생성한다.
	$("#userTable").append('<tr> \
	    			<td class="num">'+ arrayRowObj.userNumSeq +'</td> \
	    			<td class="title"> \
	    			<a href="#">'+ arrayRowObj.userID +'</a> \
	   				</td> \
	    			<td class="num">'+ arrayRowObj.userName +'</td> \
	    			<td class="num">'+ cntSum +'</td> \
	    			<td class="num">'+ arrayRowObj.userEmail1 + '@' + arrayRowObj.userEmail2 +'</td> \
	    			<td class="num">'+ blackListedManOrNot +'</td> \
	    			'+ checkBoxForRow +'\
	    		</tr>');
	
}

function getAccessAuth(page){
	var auth = sessionStorage.getItem("secure.auth");
	console.log("the value for authority is " + auth);
	if(parseInt(auth) === 0){
		getUserList(page);
	} else {
		clearPage();
		alert("이렇게 접근하지마!!!!");
		window.location.href="main.html";
	}

}



function clearPage(){
	$("#userTable").empty();
	
}

	
function getUserList(page){
	
	var end = 10;
	var start = parseInt(page)*10-10;
	//alert("aaaa");
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
            		$("#userTable").empty();
            		$.each(v, function(l,m){
                		reconstructTable(0,m);
            		});
            	}

            	if(k=="fail"){
            		console.log("failed!");
            	}
        	});
//        	valueCallbackFunc(data);// 일단 서버에서 넘어온 데이터를 콜백 함수를 사용하여 다른 함수로 넘겼다...
        },
        
        //404에러와 같이 서버응담이 없는경우 실패 alert만 생성하고 현재 페이지에 위치함
        error: function() {
        	alert("서버 연결 실패");
        }
		
    });
	member_load();
	load_paging();
}

function updateUserAuth(authType){
	//var params = "seqs=3,4,5,6";
	// 넘어오는 파라미터가 2 즉 블랙리스트 일때 그들의 시퀀스를 받아온다. 
	var params = "";
	
//	if (authType == 2){
		params = blackListSequenceGetter();
		
		if(params == "seqs"){
			alert("사용자를 체크하세요");
			return;
		}
			
		params += "&userAuthority=" + authType;
		console.log(params);
//	}// auth 정보도 같이 넣는다.
	
	//params += "&userAuthority=" + authType;
	
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

// 유저의 최신 블랙 리스트 정보를 서버로 넘겨주는 함수이다.
function blackListSequenceGetter(){
	sequenceParams = "seqs=";
	// 각 체크 박스들을 읽어 유저 시퀀스 번호 정보를 추출하여 변수에 저장한다.
	$("input:checkbox").each(function() {
		//var $this = $(this);
		if($(this).is(":checked")){
			sequenceParams += ($(this).attr("id"))+",";
			//console.log(parseInt($(this).attr("id")));
		}else{
			console.log(($(this).attr("id")) + " is not a blackList man");
		}
		
	});
	
	//맨 나중의 , 를 제거하여 준다.
	sequenceParams = sequenceParams.slice(0, -1);
	console.log(sequenceParams);
	//최신 유저 권한 정보를 넘긴다.
	return sequenceParams;
	//updateUserAuth(sequenceParams);
	
}

function load_paging(){
	$.ajax({
        type: "GET",
        url: "http://" + domainText + "/secure_server/user/user_count.do",
        callback:"callbak",
		dataType: "jsonp",
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		var count = parseInt(v);
            		var pageCount = count/10;
            		var html = '';
            		
            		for(i=1; i<pageCount+1; i++){
            			html += "<a href='#' onclick='getUserList("+i+")'><span id='page"+i+"'>"+i+"</span></a>&nbsp";
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