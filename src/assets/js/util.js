// 全局数据
export function GData (GKey, GValue) {
  if (GValue !== undefined) {
    window[GKey] = GValue
  } else {
    return window[GKey]
  }
}

export function sessionData (key, value) {
  if (value) {
    value = JSON.stringify(value)
    sessionStorage.setItem(key, value)
  } else {
    let value = sessionStorage.getItem(key)
    value = JSON.parse(value)
    // sessionStorage.removeItem(key)
    return value
  }
}

export function sessionId (sessionId) {
  if (sessionId) {
    sessionStorage.setItem("sessionId", sessionId)
  } else {
    return sessionStorage.getItem("sessionId")
  }
}

export function saveUsername (username) {
  if (username) {
    sessionStorage.setItem('username', username)
  } else {
    return sessionStorage.getItem('username')
  }
}

/***
 * 深拷贝
 * @param source
 */
export function deepCopy (source) {
  var result = {}
  for (var key in source) {
    result[key] = typeof source[key] === 'object' ? deepCopy(source[key]) : source[key]
  }

  return result
}

/**
 * 设置页面标题
 * @param name
 * @returns {null}
 */
export function setTit (title) {
  if (!title) return
  document.title = title

  try {
    setTitle(title)
  } catch (e) {
  }
}
/**
 * 获取url参数
 * @param name
 * @returns {*}
 */
export function getQueryStringHr (name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
  var r = window.location.search.substr(1).match(reg)
  if (r === null) {
    var reg2 = /^.*?[?]/
    var r2 = window.location.hash.replace(reg2, "")
    r = r2.match(reg)
  }

  if (r != null) return decodeURIComponent((r[2]))
  return null
}
/**
 * 关闭toon
 */
export function closeWindow () {
  var params = {
    "functionType": 1
  }
  window.location.href = "toon://mwap/window?params=" + JSON.stringify(params)
}

/**
 * 加载更多的函数 ； shaobo
 *  droploadUpOnScroll(callback , "MoreAndMore")
 */
export function droploadUpOnScroll (callback, ele, scrollEle) {
  if (!callback) {
    window.onscroll = false
    return false
  }
  // 默认距离底部差值开始刷新列表
  var heightDifference = 0
  if (typeof ele === 'number') {
    heightDifference = ele
  }
  if (typeof ele != 'string') {
    ele = "droploadDOM"
    if (!document.getElementById(ele)) {
      var droploadDOM = document.createElement("p")
      droploadDOM.id = 'droploadDOM'
      document.body.appendChild(droploadDOM)
    }
  }
  var MAM = document.getElementById(ele) // 绑定元素

  var gap = parseInt(MAM.getAttribute("data-gap")) || heightDifference // 获取差值
  if (!scrollEle) {
    var winHeight = window.innerHeight
    var mTop, sTop, result
    window.onscroll = function () {

      mTop = MAM.offsetTop
      sTop = document.body.scrollTop  //滚动条距离顶部
      result = mTop - sTop
      if (result <= (winHeight + gap)) {
        callback()  //回调
      }
    }
  } else {
    let scrollContainer = document.getElementById(scrollEle)
    let winHeight = scrollContainer.offsetHeight
    let mTop, sTop, result
    scrollContainer.onscroll = function () {
      mTop = MAM.offsetTop
      sTop = scrollContainer.scrollTop  //滚动条距离顶部
      result = mTop - sTop
      if (result <= (winHeight + gap)) {
        callback()  //回调
      }
    }
  }
}
/**
 *
 * @param id    元素id
 * @param callback   回调函数
 * @param scrollBottomH   距离底部高度
 * @returns {boolean}
 */
export function pullUpOnScroll (id, callback, scrollBottomH) {

  id = id ? id : ''
  var ele = document.getElementById(id)
  console.log(ele)
  if(!ele){ return false }
  if (typeof scrollBottomH != 'number') {
    scrollBottomH = 0
  }
  if (ele && !callback) {
    ele.onscroll = false
    return false
  }
  ele.onscroll = function () {
    var H = ele.scrollHeight - ele.offsetHeight
    if (H - ele.scrollTop <= scrollBottomH) {
      console.log('到底了')
      callback()
    }
  }
}

/**
 * confirm组件
 * @param {Object} param
 */
export function confirm (param) {
  var componentsAlert = document.getElementById("componentsAlert") || false
  //if(!param ){componentsAlert.style={display : "none"}}
  if (!param && componentsAlert.parentNode) {
    componentsAlert.parentNode.removeChild(componentsAlert)
  }
  var param = param || {}
  param.show = param.show || true //默认显示
  param.title = param.title || ""
  param.message = param.message || "可能是网络环境不稳定引起的系统异常，请新打开页面后重试！"
  param.btnEsc = param.btnEsc === '' ? '' : param.btnEsc || "取消"
  param.btnOk = param.btnOk || "确定"
  param.btnOkFun = param.btnOkFun || function () {
    }
  param.btnEscFun = param.btnEscFun || function () {
    }
  param.input = param.input || false
  param.class = param.class || ""
  if (!componentsAlert) {
    var style = '<style>'
    style += '.componentsAlert {z-index: 999position: fixedtop:0%left: 0width: 100%height: 100%background: rgba(0,0,0,.7) }\
						.componentsAlert .content{color: #030303position: fixedtop:50%left: 50% -webkit-transform: translate(-50%,-50%)width:270pxbackground: rgba(255,255,255,0.90)border-radius: 5pxtext-align: center}\
						.componentsAlert .title{padding:20px 0 0 0 }\
					  .componentsAlert .message{font-size: 15pxline-height: 150%#color:#030303padding:15px 15px 15px 15pxdisplay: inline-blocktext-align: left}\
						.componentsAlert .btnGroup{line-height: 43pxheight: 43px font-size: 0 }\
						.componentsAlert .btnGroup .btn {display:none font-size:17px }\
						.componentsAlert .btnGroup.esc.ok .btn {width: 50%display: inline-block}\
						.componentsAlert .btnGroup.ok .btn.btnOk {width: 50%display: inline-block}'
    style += param.clsBtnOk ? '.componentsAlert .btnGroup .btnOk{' + param.clsBtnOk + '}' : '.componentsAlert .btnGroup .btnOk{color: #007AFF}'
    style += param.clsBtnEsc ? '.componentsAlert .btnGroup .btnEsc{' + param.btnEsc + '}' : '.componentsAlert .btnGroup .btnEsc{color: #007AFF}'
    style += '.componentsAlert .lsh-confirm-pwd{margin: 0 auto 15px autowidth: 240pxheight: 24pxpadding-left: 6px}\
						.componentsAlert .lsh-confirm-pwd::after{border-radius: 2px}\
						.componentsAlert .lsh-confirm-input{width: 240pxheight: 24pxposition:absolutez-index:99left:6pxtop:2pxline-height: 24pxfont-size: 13pxcolor: #000}\
						'
    style += '</style>'

    var html = '<div class="componentsAlert  ' + param.class + ' "  style="display:none" id="componentsAlert">'
    html += '<div class="content">'
    html += param.title ? '<p class="title" > ' + param.title + '</p>' : ''
    html += '<div style="overflow: hiddentext-align: center"><p  class="message"  >'
    html += param.message
    html += '</p></div>'
    html += param.input ? '<div class="lsh-confirm-pwd hairline"><input maxlength="18" id="textPwd" type="password" class="lsh-confirm-input" placeholder="输入实名认证密码"></div>' : ''
    html += '<p class="btnGroup ' + (param.btnEsc != "" ? "esc" : "") + ' ok hairline-top">'
    html += '<span  class="btn btnEsc hairline-right" id="AlertBtnEsc" >' + param.btnEsc + '</span>'
    html += '<span class="btn btnOk "  id="AlertBtnOk"  > ' + param.btnOk + '</span>'
    html += '</p>'
    html += '</div></div>'
    var alertDiv = document.createElement("div")
    alertDiv.innerHTML = style + html
    document.body.appendChild(alertDiv)
    componentsAlert = document.getElementById("componentsAlert")
    //绑定事件
    document.getElementById("AlertBtnEsc").addEventListener('click', function () {
      param.btnEscFun()
      componentsAlert.style.display = "none"
      if (componentsAlert.parentNode) {
        componentsAlert.parentNode.removeChild(componentsAlert)
      }
    }, false)
    document.getElementById("AlertBtnOk").addEventListener('click', function () {
      param.btnOkFun()
      componentsAlert.style.display = "none"
      if (componentsAlert.parentNode) {
        componentsAlert.parentNode.removeChild(componentsAlert)
      }
    }, false)
  }
  if (param.show) {
    componentsAlert.style.display = "block"
  } else {
    componentsAlert.style.display = "none"
  }
}
/**
 * 补零
 * @param num
 * @returns {*}
 */
export function zeroFill (num) {
  if (num > 0 && num < 10 || num.toString().length === 1 && num === 0) {
    return '0' + num
  }
  return num
}
/**
 * 毫秒转换友好的显示格式
 * 输出格式：21小时前
 * @param  {[type]} time [description]
 * @return {[type]}      [description]
 */
export function dateStr (date) {
  //获取js 时间戳
  var time = new Date().getTime()
  var _data = new Date(parseInt(date))
  //去掉 js 时间戳后三位，与php 时间戳保持一致
  time = parseInt((time - date) / 1000)

  //存储转换值
  var s
  if (time < 60 * 1) {//1分钟内
    return '刚刚'
  } else if ((time < 60 * 60) && (time >= 60 * 1)) {
    //超过十分钟少于1小时
    s = Math.floor(time / 60)
    return s + "分钟前"
  } else if ((time < 60 * 60 * 24) && (time >= 60 * 60)) {
    //判断是否为昨天
    //下个月
    if (_data.getMonth() < (new Date().getMonth())) {
      return "昨天 "
    } else if (_data.getDate() < (new Date().getDate())) {
      return "昨天 "
    }
    //超过1小时少于24小时
    s = Math.floor(time / 60 / 60)
    return s + "小时前"
  } else if ((time < 60 * 60 * 24 * 2) && (time >= 60 * 60 * 24)) {
    //昨天
    return "昨天 "
  } else {
    return false
  }
}
/**
 * 时间格式化
 * @param timestamp 13位时间戳
 * @param fmt 输出格式，默认'yyyy-MM-dd hh:mm:ss'
 * @returns {*}
 */
export function dateFormat (timestamp, fmt) {
  fmt = fmt || 'yyyy-MM-dd hh:mm:ss'

  var _data = new Date(parseInt(timestamp))
  var o = {
    'M+': _data.getMonth() + 1, // 月份
    'd+': _data.getDate(), // 日
    'h+': _data.getHours(), // 小时
    'm+': _data.getMinutes(), // 分
    's+': _data.getSeconds(), // 秒
    'q+': Math.floor((_data.getMonth() + 3) / 3), // 季度
    'S': _data.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (_data.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
export function DownURL (url) {
  try {
    var elemIF = document.createElement("iframe")
    elemIF.src = url
    elemIF.style.display = "none"
    document.body.appendChild(elemIF)
  } catch (e) {
    console.log('下载失败')
  }
}
/**
 *
 * @param timestamp
 * @param type
 * @returns {*}
 */
export function timestampChangeDate (timestamp, type) {
  timestamp = timestamp ? timestamp : 0
  type = type ? type : '-'
  var T = new Date(timestamp)
  var Y = T.getFullYear()
  var M = T.getMonth() + 1
  M = M > 10 ? M : '0' + M
  var D = T.getDate()
  D = D > 10 ? D : '0' + D
  return Y + type + M + type + D
}

export function hasClass (elem, cls) {
  cls = cls || ''
  if (cls.replace(/\s/g, '').length === 0) return false //当cls没有参数时，返回false
  return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ')
}

export function addClass (ele, cls) {
  if (!hasClass(ele, cls)) {
    ele.className = ele.className === '' ? cls : ele.className + ' ' + cls
  }
}

export function removeClass (ele, cls) {
  if (hasClass(ele, cls)) {
    var newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + ' '
    while (newClass.indexOf(' ' + cls + ' ') >= 0) {
      newClass = newClass.replace(' ' + cls + ' ', ' ')
    }
    ele.className = newClass.replace(/^\s+|\s+$/g, '')
  }
}

export function convSpecialChar (str) {
  str = str.replace(/[\#\＃]/g,'').replace(/[\<]/g,'＜').replace(/[\>]/g,'＞').replace(/[\]/g,'；').replace(/[\']/g,'＇').replace(/[\"]/g,'＂').replace(/[\&]/g,'＆').replace(/[\\]/g,'＼')
  str = str.replace(/\r|\n/g, '==br==')
  return str
}

/**
 * 埋点
 */
export function buryData (buryName,data) {
  let param = {
    toon_type: "102"  //北京通
  }
  if (/toontype/.test( navigator.userAgent.toLowerCase() )){
    var str = JSON.stringify(navigator.userAgent.toLowerCase())
    var matchResult =/toontype(\/)(\d+)/.exec(str)
    param.toon_type = matchResult[matchResult.length-1]
  }
  for(var key in data){
    if(data.hasOwnProperty(key)===true){
      param[key]=data[key]
    }
  }
// 这里需要判断是在 App 里还是在普通的浏览器里，例如可以根据 UserAgent 或者 Cookie 来判断
  if (/toon/.test( navigator.userAgent.toLowerCase() )) {
    // 获取用户信息
      sa.getAppStatus((app_info) =>{
        sa.identify(app_info.distinct_id)
              //埋点
        sa.quick('autoTrack')
        sa.track(buryName, param)
    })
  } else {
    //埋点
    sa.quick('autoTrack')
    sa.track(buryName, param)
  }
}

/**
 * 变更排序
 * @param dataArr 数据
 * @param index 操作数据的下标
 * @param trend 变更趋势：'up' or 'down'
 */
export function changeRank (dataArr, index, trend) {
  // 默认值
  dataArr = dataArr || []
  index = parseInt(index)
  trend = trend || 'down'

  // 输入非法数据
  if (!dataArr.length || index < 0 || index >= dataArr.length) {
    return false
  }
  // 非法操作
  if (index === 0 && trend === 'up' || index === dataArr.length - 1 && trend === 'down') {
    return false
  }

  let retData = [],
    changeIndexBegin = 0,
    changeIndexEnd = 0

  if (trend === 'up') {
    changeIndexBegin = index - 1
    changeIndexEnd = index
  } else {
    changeIndexBegin = index
    changeIndexEnd = index + 1
  }

  for (let i = 0; i < changeIndexBegin; i++) {
    retData.push(dataArr[i])
  }
  retData.push(dataArr[changeIndexEnd])
  retData.push(dataArr[changeIndexBegin])
  for (let i = changeIndexEnd + 1, len = dataArr.length; i < len; i++) {
    retData.push(dataArr[i])
  }

  return retData
}

// 激活左侧菜单
export function activeLeftMenu (title) {

  let menuNodes
  setTimeout(() => {
    menuNodes = document.getElementsByClassName('cleft')[0].getElementsByTagName('li')
    for (let i = 0; i < menuNodes.length; i++) {
      if (menuNodes[i].innerText === title) {
        addClass(menuNodes[i], 'router-link-exact-active router-link-active')
      }
    }
  }, 0)
}

// 过滤html标签（保留指定标签）
export function filterHtmlTags (htm) {

  if (!htm) {
    return ''
  }
  let REG_HTML_TAG = /<(?!\/?P|\/?IMG|\/?STRONG|\/?B)[^<>]*>/gi,
    REG_INLINE_STYLE = /style\s*?=\s*?([‘"])[\s\S]*?\1/gi

  htm = htm.replace(REG_HTML_TAG, '').replace(REG_INLINE_STYLE, '')

  return htm
}

// 拷贝到剪贴板
export function clipboard (text) {
  if (!text) {
    return false
  }

  let textArea = document.createElement('textarea')

  textArea.style.position = 'fixed'
  textArea.style.top = 0
  textArea.style.left = 0
  textArea.style.width = '2em'
  textArea.style.height = '2em'
  textArea.style.padding = 0
  textArea.style.border = 'none'
  textArea.style.outline = 'none'
  textArea.style.boxShadow = 'none'
  textArea.style.background = 'transparent'
  textArea.value = text

  document.body.appendChild(textArea)
  textArea.select()

  try {
    document.execCommand('copy') ? toastTip('success', '复制成功') : toastTip('error', '复制失败')
  } catch (err) {
    toastTip('error', '不能使用这种方法复制内容')
  }

  document.body.removeChild(textArea)
}

/**
 * toast提示二次封装
 * @param type
 * @param text
 * @param cb
 */
export function toastTip (type, text, cb) {
  if (!type || !text) {
    return false
  }

  let duration = 2000
  indexVue.$Message[type](text)

  if (cb && typeof cb === 'function') {
    setTimeout(cb, duration)
  }
}

export function showMsgBubble (msgCount) {
  let bubbleDom = document.getElementById('msgBubble'),
    clsName = ''

  if (msgCount < 1) {
    clsName = ''
    msgCount = ''
  } else if (msgCount < 10) {
    clsName = 'single'
  } else if (msgCount < 100) {
    clsName = 'double'
  } else {
    clsName = 'long'
    msgCount = '99+'
  }
  bubbleDom.setAttribute('class', clsName)
  bubbleDom.innerText = msgCount
}

export function setUserInfo (userInfo) {
  userInfo = userInfo || {}
  sessionStorage.setItem('loggedUser', JSON.stringify(userInfo))
}

/**
 * 获取当前登录用户信息
 *
 * 如不指定fieldName，返回当前登录用户全部信息对象，形如：
 * userInfo = {
 *  userId: 1,
 *  userName: '张三',
 *  userPhone: 13800138000,
 *  organunitId: 1,
 *  organunitName: '市交通委',
 *  createTime: 1526457343257,
 *  updateTime: 1526457343257
 *}
 *
 * @param fieldName 提取的具体字段(非必填)：如getUserInfo('userName')，仅返回当前登录用户姓名
 * @returns {*}
 */
export function getUserInfo (fieldName) {

  let userInfo = sessionStorage.getItem('loggedUser') && JSON.parse(sessionStorage.getItem('loggedUser')) || null
  if (userInfo && fieldName) {
    return userInfo[fieldName]
  }
  return userInfo
}

// 判断当前是否登录状态
export function isLogged () {
  if (!getUserInfo() || !getUserInfo('userId')) {
    return false
  }
  return true
}

// 版权信息
export function getCopyright () {
  return `Copyright © 1999-${new Date().getFullYear()} 北京市移动公共服务平台   All Rights Reserved 京ICP备12037412号 - 1`
}

// 更新个人中心数据个数
export function setManCount (datas) {
  let applyData = document.getElementById('applyData'),
      examineData = document.getElementById('examineData'),
      collectData = document.getElementById('collectData')
  applyData.innerText = datas.auditNum
  examineData.innerText = datas.checkNum
  collectData.innerText = datas.houseNum
}

// 获取组织平台返回的用户信息
export function getLoggedUser () {
  if (!window.location.search) {
    return false
  }
  let searchArr = window.location.search && window.location.search.substr(1).split('&'),
    userInfo = {}, tmpArr = [],
    fieldMap = {
      orgId: 'organunitId',
      orgName: 'organunitName'
    }

  for (let i = 0, len = searchArr.length, item; i < len, item = searchArr[i]; i++) {
    tmpArr = item.split('=')
    userInfo[tmpArr[0]] = tmpArr[1]

    // 兼容原测试数据与传入数据字段
    if (fieldMap[tmpArr[0]]) {
      userInfo[fieldMap[tmpArr[0]]] = tmpArr[1]
    }
  }

  // 记入session
  sessionStorage.setItem('loggedUser', JSON.stringify(userInfo))
  location.replace(location.href.replace(location.search, ''))
}

/**
 * 数据处理后，需要跳转到的页数
 *
 * pageNo: 当前处理数据所在页数
 * pageSize: 当前每页展示数据量
 * totalPages: 处理前数据总页数
 * dealCount: 本次处理记录数
 *
 * @return: 返回需要跳转的页码数
 */
export function getPageNoAfterDeal (pageNo, pageSize, totalPages, dealCount) {
  if (dealCount === pageSize && pageNo === totalPages) {
    return 1
  }
  return pageNo
}

export function scroll2Top () {
  setTimeout(() => {
    window.scroll(0, 0)
  }, 0)
}

/**
 * 接口地址path变更
 * 应对开发环境、测试环境path不同的场景
 */
export function changeUrlPath (url) {

  // 去掉开头的/
  url = url[0] === '/' ? url.substr(1) : url

  let urlArr = url.split('/'),
    path = urlArr[0]

  if (configM.interfacePath[path]) {
    urlArr[0] = configM.interfacePath[path]
    return urlArr.join('/')
  }

  return url
}
