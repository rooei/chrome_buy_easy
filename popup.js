// import command from "./command";

// var start = document.getElementById("start");

// start.onclick = function (element) {
// 	chrome.tabs.query({ url: '*://www.taobao.com/*' }, function (tabs) {
// 		if (tabs.length === 0) {
// 			chrome.tabs.create({ 'url': "https://www.taobao.com/", 'pinned': true });
// 		} else {
// 			chrome.tabs.sendMessage(tabs[0], command.START);
// 		}
// 	});
// };

document.getElementById("stop").onclick = function (element) {
	var bg = chrome.extension.getBackgroundPage();
	bg.stopTask();
	alert('暂停任务成功');
}
document.getElementById("start").onclick = function (element) {
	var bg = chrome.extension.getBackgroundPage();
	bg.processTask();
	alert('启动任务成功');
}
document.getElementById("cancel").onclick = function (element) {
	window.close();
}
document.getElementById("submit").onclick = function (element) {
	const inputTime = document.getElementById("input-time").value;
	const inputUrl = document.getElementById("input-url").value;
	const formatTime = str2Timestamp(inputTime);
	if (!formatTime) {
		alert('请输入正确的时间');
		return;
	}
	if (!inputUrl) {
		alert('请输入商品购买链接');
		return;
	}
	// 保存数据
	chrome.storage.sync.set({ starttime: formatTime, buyurl: inputUrl }, function () {
		alert('设置成功！');
		window.close();
	});
}

function str2Timestamp(str) {
	let date = str.substring(0, 19);
	date.replace(/-/g, '/');
	return new Date(date).getTime();
}


// document.getElementById("input-time").setAttribute("placeholder", timestamp2Str(new Date().getTime()))
document.getElementById("input-time").setAttribute("value", timestamp2Str(new Date().getTime()))

/**
 * 日期时间格式化
 * @param inputTime
 * @returns {string}
 */
function timestamp2Str(inputTime) {
	var date = new Date(inputTime);
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	m = m < 10 ? ('0' + m) : m;
	var d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	var h = date.getHours();
	h = h < 10 ? ('0' + h) : h;
	var minute = date.getMinutes();
	var second = date.getSeconds();
	minute = minute < 10 ? ('0' + minute) : minute;
	second = second < 10 ? ('0' + second) : second;
	return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}
