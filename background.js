chrome.extension.onConnect.addListener(function (port) {
	console.log("Connected .....");
	// port.onMessage.addListener(function (msg) {
	// 	console.log("收到前台时间更新：" + msg);
	// 	processTask(msg);
	// 	port.postMessage("时间更新成功");
	// });
});

/**
 * 刷新时间间隔 单位ms
 */
const TIME_STEP = 500;
const KILL_TIME = 1560329400000;

var oldTimer = null;
/**
 * 每隔500ms去检查任务,异步处理任务
 */
function processTask() {
	console.log("后端开启轮休任务！");
	let curTime = new Date().getTime();
	var timer = setInterval(function () {
		curTime += TIME_STEP;
		// 读取数据，第一个参数是指定要读取的key以及设置默认值
		chrome.storage.sync.get({ starttime: "0", buyurl: "https://www.taobao.com" }, function (items) {
			const buyUrl = items.buyurl;
			const killTime = parseInt(items.starttime);
			console.log('killTime = ' + killTime + '; curTime = ' + curTime);
			if (killTime != 0 && curTime > killTime) {
				// console.log(timestamp2Str(killTime));
				try {
					chrome.tabs.query({ url: buyUrl }, function (tabs) {
						if (tabs.length > 0) {
							const tab = tabs[0].id;
							chrome.tabs.sendMessage(tab, "tbbuy");
							// chrome.tabs.executeScript(tab, { code: "doTbBuy();" }, function () { });
							const opt = { type: "basic", title: "买买买抢购助手", message: "秒杀任务完成！", iconUrl: "img/bell.png" };
							chrome.notifications.create(null, opt);
							chrome.storage.sync.set({ starttime: "0" });
						} else {
							chrome.tabs.create({ url: buyUrl });
						}
					});
				} catch (ex) {
					console.log('发生错误')
				}
			}
		});

	}, TIME_STEP);
	if (oldTimer != null) {
		clearInterval(oldTimer);
	}
	oldTimer = timer;
}

function stopTask(){
	if (oldTimer != null) {
		clearInterval(oldTimer);
	}
}

// processTask(new Date().getTime());
