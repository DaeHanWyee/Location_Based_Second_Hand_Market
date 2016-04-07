function getDomain(){
	return "210.107.197.156:8080";
}

function check_session(){
	var sessionId = sessionStorage.getItem("secure.id");
	var sessionSeq = sessionStorage.getItem("secure.seq");
	
	if(sessionId == null)
		return "NM";
	else
		return "TM";
}

(function($) {
    $.fn.invisible = function() {
        return this.each(function() {
            $(this).css("display", "none");
        });
    };
    $.fn.visible = function() {
        return this.each(function() {
            $(this).css("visibility", "visible");
        });
    };
}(jQuery));

function member_load(){
	var tmp = check_session();
	if(tmp == "TM"){
		$("#non_member").invisible();
		$("#member").visible();
	}else{
		$("#non_member").visible();
		$("#member").invisible();
	}
	
	$("#identify").text(sessionStorage.getItem("secure.id")+"님");
}

function logout(){
	sessionStorage.removeItem("secure.id");
	sessionStorage.removeItem("secure.seq");
	location.href="main.html";

}

function getUrlSeq(){
	var url      = window.location.href; 
	var tmpArr = url.split("?");
	var tmp1Arr = tmpArr[1].split("=");
	var seq = tmp1Arr[1];
	
	return seq;
}