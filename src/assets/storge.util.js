/*!
 * 前端存储类工具函数
 *
 * Copyright chenshaobo
 * Licensed under the MIT license.
 * 
 */

/**
 * 全局windows
 * @param {Object} GKey
 * @param {Object} GValue
 */
export function winData(GKey, GValue) {
    window.GData = window.GData || {};
    if (GValue != undefined) {
        window.GData[GKey] = GValue;
    } else {
        return window.GData[GKey];
    }
}

/**
 *会话级存储
 * @param {Object} key
 * @param {Object} value
 */
export function sessionData(key, value) {
    if (value) {
        value = JSON.stringify(value);
        sessionStorage.setItem(key, value)
    } else {
        let value = sessionStorage.getItem(key);
        value = JSON.parse(value);
        return value;
    }
}

/**
 * 本地长期存储
 * @param {Object} key
 * @param {Object} value
 */
export function localData(key, value) {
    if (value) {
        value = JSON.stringify(value);
        localStorage.setItem(key, value)
    } else {
        let value = localStorage.getItem(key);
        value = JSON.parse(value);
        return value;
    }
}

/**
 * 设置cookie
 * @param {Object} name
 * @param {Object} value
 * @param {Object} iDay
 */
export function setCookie(name, value, iDay) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + iDay);
    document.cookie = name + '=' + value + ';expires=' + oDate;
};

/**
 * 获取cookie
 * @param {Object} name
 */
export function getCookie(name) {
    var arr = document.cookie.split('; ');
    for (var i = 0; i < arr[i].length; i++) {
        var arr2 = arr[i].split('=');
        if (arr2[0] == name) {
            return arr2[1];
        }
        return '';
    }
};

/**
 * 删除cookie
 * 使用方法：getCookie('user')
 * @param {Object} name
 */
export function removeCookie(name) {
    setCookie(name, 1, -1);
};
