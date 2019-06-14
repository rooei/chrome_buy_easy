var formatNumber = function (n) {
	n = n.toString()
	return n[1] ? n : '0' + n
}

var regYear = getRegExp("(y+)", "i");

/**
 * 格式化时间
 * @param timestamp 时间戳
 * @param format 	格式化样式
 */
export var dateFormat = function (timestamp, format) {
	if (!format) {
		format = "yyyy-MM-dd hh:mm:ss";
	}
	timestamp = parseInt(timestamp);
	var realDate = getDate(timestamp);
	function timeFormat(num) {
		return num < 10 ? '0' + num : num;
	}
	var date = [
		["M+", timeFormat(realDate.getMonth() + 1)],
		["d+", timeFormat(realDate.getDate())],
		["h+", timeFormat(realDate.getHours())],
		["m+", timeFormat(realDate.getMinutes())],
		["s+", timeFormat(realDate.getSeconds())],
		["q+", Math.floor((realDate.getMonth() + 3) / 3)],
		["S+", realDate.getMilliseconds()],
	];
	var reg1 = regYear.exec(format);
	// console.log(reg1[0]);
	if (reg1) {

		format = format.replace(reg1[1], (realDate.getFullYear() + '').substring(4 - reg1[1].length));
	}
	for (var i = 0; i < date.length; i++) {
		var k = date[i][0];
		var v = date[i][1];

		var reg2 = getRegExp("(" + k + ")").exec(format);
		if (reg2) {
			format = format.replace(reg2[1], reg2[1].length == 1
				? v : ("00" + v).substring(("" + v).length));
		}
	}
	return format;
}

var getTime = function (timestamp) {
	return dateFormat(timestamp, "yyyy-MM-dd hh:mm:ss")
}

var getSimpleTime = function (timestamp) {
	var timestampLen = timestamp.length;
	timestamp = parseInt(timestamp);
	if (timestampLen == 10) {
		timestamp *= 1000;
	}
	var realDate = getDate(timestamp);
	var curDate = getDate();
	if (realDate.getFullYear() != curDate.getFullYear()) {
		return dateFormat(timestamp, "yyyy-MM-dd hh:mm");
	} else if (realDate.getMonth() != curDate.getMonth()) {
		return dateFormat(timestamp, "MM-dd hh:mm");
	} else if (realDate.getDate() != curDate.getDate()) {
		return dateFormat(timestamp, "MM-dd hh:mm");
	} else {
		return dateFormat(timestamp, "hh:mm");
	}
}

/**
 * 直播间观点列表日期显示
 * @param timestamp 时间戳
 */
var getSutioTrackDate = function (timestamp) {
	var realDate = getDate(timestamp);
	var curDate = getDate();
	if (realDate.getFullYear() != curDate.getFullYear()) {
		return dateFormat(timestamp, "yyyy-MM-dd");
	} else if (realDate.getMonth() != curDate.getMonth()) {
		return dateFormat(timestamp, "MM月dd");
	} else {
		if (curDate.getDate() - realDate.getDate() === 0) {
			return "";
		} else if (curDate.getDate() - realDate.getDate() === 1) {
			return dateFormat(timestamp, "昨日");
		} else {
			return dateFormat(timestamp, "MM月dd");
		}
	}
}

module.exports = {
	dateFormat: dateFormat,
	getTime: getTime,
	getSimpleTime: getSimpleTime,
	getSutioTrackDate: getSutioTrackDate,
}