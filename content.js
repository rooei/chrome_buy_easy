
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	console.log("message = " + message);
	if (message == "tbbuy") {
		doTbBuy();
	} else if (message == "jdbuy") {
		doJdBuy();
	}
});

function doTbBuy() {
	console.log("==============执行淘宝点击==============");
	let actElement = document.getElementById("J_LinkBuy");
	if(!actElement){
		actElement = document.getElementsByClassName("J_LinkBuy")[0];
	}
	console.log(actElement);
	// if (/^\./.test(message)) {
	actElement.click();
	// }
}
function doJdBuy() {
	console.log("==============执行京东点击==============");
}

function goJdPayOrder(){

}
function goTbPayOrder(){
	const actElement = document.getElementsByClassName("go-btn")[0];
}