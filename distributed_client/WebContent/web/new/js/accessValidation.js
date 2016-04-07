/**
 * 
 */
function validatedAccess(validatedAccessInfo, nextPage){
	//Validated Access Control.
	console.log(nextPage + "Next page information");
	sessionStorage.setItem("secure.validatedAccess", validatedAccessInfo);
	console.log("Session storage value : " + validatedAccessInfo);
	window.location.href=nextPage;
	
}

function page_Lock_Load(pageInfo)
{
    console.log("accessValidation CHeck");
	access_Validation_checker(pageInfo);
}

function access_Validation_checker(pageInfo) {
	var accessValidation = sessionStorage.getItem("secure.validatedAccess");
	console.log(accessValidation+" is the value")
	if(accessValidation == pageInfo){
		console.log("True!")
		member_load();
	} else {
		console.log("False!")
		window.location.href="main.html";
	}
		
}

function sessionValidationRemover () {
	setTimeout( function() {
	sessionStorage.removeItem("secure.validatedAccess");
	console.log("Session storage removed!" + sessionStorage.getItem("secure.validatedAccess"));
	}, 1000);
}