import Vue from 'vue';

// 根据性别获得用户头像
Vue.filter('getUserImg', function (gender) {
  return (gender === 0 ? '../static/img/male.png' : '../static/img/female.png');
});

// 匿名（仅保留最后一个字）
Vue.filter('anonymous', function (userName) {
  let lastWord = userName[userName.length - 1];
  return userName.substr(0, userName.length - 1).replace(/./g, '*') + lastWord;
});

// 隐藏手机号4~7位
Vue.filter('hidePhoneNo', function (phoneNo) {
  phoneNo = phoneNo.toString()
  return phoneNo.substr(0, 3) + '****' + phoneNo.substr(7)
})

// 标题超过长度上限，显示...
Vue.filter('hideTitle', function (title, maxLen) {
  title = title || ''
  maxLen = parseInt(maxLen)

  if (title.length > maxLen) {
    return title.substr(0, maxLen) + '...'
  }
  return title
})

/**
 * 计算时间差
 * @param publishTimeStamp 时间戳（格式：13位数字）
 * @param nowTimeStamp 当前时间戳（传空使用当前时间）
 */
Vue.filter('timeDiff', function (publishTimeStamp, nowTimeStamp) {

  if (!publishTimeStamp) {
    return '';
  }
  if (nowTimeStamp === undefined) {
    nowTimeStamp = new Date().getTime();
  }

  // 发布时间解析
  let pubTimeObj = analyseDate(publishTimeStamp, true),
      pubYear = pubTimeObj.year,
      pubMonth = pubTimeObj.month,
      pubDate = pubTimeObj.date,
      pubHour = pubTimeObj.hour,
      pubMin = pubTimeObj.minute;

  // 今天时间解析
  let todayTimeObj = analyseDate(nowTimeStamp, true),
      todayYear = todayTimeObj.year, // 暂存，避免重复计算
      todayMN = new Date(`${todayTimeObj.year}/${todayTimeObj.month}/${todayTimeObj.date}`); // 今日零点

  // 昨天时间解析
  let yesterdayTimeObj = analyseDate(nowTimeStamp - 86400000, true),
    yesterdayMN = new Date(`${yesterdayTimeObj.year}/${yesterdayTimeObj.month}/${yesterdayTimeObj.date}`); // 昨日零点

  // 今年时间分析
  let thisYearMN = new Date(`${todayYear}/01/01`); // 昨日零点

  if (nowTimeStamp - publishTimeStamp < 60000) { // 一分钟内，显示“刚刚”
    return '刚刚';

  } else if (nowTimeStamp - publishTimeStamp < 3600000) { // 一小时内，显示“xx分钟前”
    return `${parseInt((nowTimeStamp - publishTimeStamp) / 60000)}分钟前`;

  } else if (publishTimeStamp > todayMN) { // 今天内，显示“15:30”
    return `${pubHour}:${pubMin}`;

  } else if (publishTimeStamp > yesterdayMN) { // 昨天，显示“昨天 15:30”
    return `昨天 ${pubHour}:${pubMin}`;

  } else if (publishTimeStamp > thisYearMN) { // 当年，显示“03-07 15:30”
    return `${pubMonth}-${pubDate} ${pubHour}:${pubMin}`;

  } else { // 去年之前，显示“2017-12-12 15:30”
    return `${pubYear}-${pubMonth}-${pubDate} ${pubHour}:${pubMin}`;
  }
});

function zeroFill(num) {
  if (num > 0 && num < 10 || num.toString().length == 1 && num == 0) {
    return '0' + num;
  }
  return num;
}

// 时间戳解析
function analyseDate(timestamp, needFillZero) {

  let timeObj = {}
  if (!timestamp) {
    return timeObj;
  }

  if (timestamp.toString().length < 13) {
    timestamp *= 1000;
  }

  let time = new Date(timestamp);
  timeObj.year = time.getFullYear(); // 年
  timeObj.month = needFillZero ? zeroFill(time.getMonth() + 1) : time.getMonth() + 1; // 月
  timeObj.date = needFillZero ? zeroFill(time.getDate()) : time.getDate(); // 日
  timeObj.hour = needFillZero ? zeroFill(time.getHours()) : time.getHours(); // 小时
  timeObj.minute = needFillZero ? zeroFill(time.getMinutes()) : time.getMinutes(); // 分
  timeObj.second = needFillZero ? zeroFill(time.getSeconds()) : time.getSeconds(); // 秒

  return timeObj;
}

/**
 * 输入计数器
 */
Vue.filter('inputCounter', function (inputContent) {

  if (!inputContent) {
    return 0;
  }
  let matchCounter = inputContent.match(/\r|\n/g)||[];
  return inputContent.length + matchCounter.length;
});

export function brRepalce(val) {
  val = val.replace(/==br==/gi, '<br>');
  return val;
}
/**
 * 带有换行符的内容的<br>替换为\n
 */
Vue.filter('brRepalce', function (val) {
  val = val.replace(/==br==/gi, '<br>');
  return val;
});


/**
 * 数字字符串补零
 *
 * @param num
 * @returns {*}
 */
function zeroFill(num) {
  if (num > 0 && num < 10 || num.toString().length == 1 && num == 0) {
    return '0' + num;
  }
  return num;
}

/**
 * 时间格式化
 */
Vue.filter('analyseTime', function (timestamp, formatType, isShort) {
    if (timestamp == '' || timestamp == undefined || timestamp == 'undefined' || timestamp == null) {
        return '';
    }
    if (typeof timestamp === 'object') { //传入日期格式
        timestamp = timestamp.getTime();
        onlineType = true;
    }

    var dateTime = new Date(parseInt(timestamp));
    if(isShort){
      dateTime= new Date(parseInt(timestamp * 1000))
    }

    var backTime = "";
    var year = dateTime.getFullYear(); // 获取年
    var month = dateTime.getMonth() + 1; // 获取月
    var date = dateTime.getDate(); // 获取日
    var day = dateTime.getDay(); // 获取星期几
    var hour = dateTime.getHours(); // 获取时
    var minute = dateTime.getMinutes(); // 获取分
    var second = dateTime.getSeconds(); // 获取秒

    switch (formatType) {
        case '1':
            backTime = year + "年" + zeroFill(month) + "月" + zeroFill(date) + "日";
            break;
        case '2':
            backTime = year + "-" + zeroFill(month) + "-" + zeroFill(date) + " " + zeroFill(hour) + ":" + zeroFill(minute) + ":" + zeroFill(second);
            break;
        case '3':
            backTime = year + "-" + zeroFill(month) + "-" + zeroFill(date);
            break;
        case '4':
            backTime = year + "-" + zeroFill(month) + "-" + zeroFill(date) + " " + zeroFill(hour) + ":" + zeroFill(minute);
            break;
        case '5':
            backTime = year + "-" + zeroFill(month) + "-" + zeroFill(date) + " " + zeroFill(day);
            break;
        default:
            backTime = year + "-" + month + "-" + date;
            break;
    }
    return backTime;
});

/***
 * 过滤HTML标签
 */
Vue.filter('filterHTMLTag', function (msg) {
  let msgs = msg.replace(/<\/?[^>]*>/g, '');  //去除HTML Tag
  msgs = msgs.replace(/[|]*\n/, '')  //去除行尾空格
  msgs = msgs.replace(/&nbsp;/ig, ''); //去掉npsp
  return msgs;
});


