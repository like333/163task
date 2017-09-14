/*
 * @Author: like 
 * @Date: 2017-09-08 17:28:04 
 * @Last Modified by: like
 * @Last Modified time: 2017-09-13 12:20:05
 */
'use strict'
var Hogan = require('hogan')
var conf = {
    serverHost: ''
}
var util = {
    getCookie: function (key) {
        var cookies = document.cookie.split(';')
        for (var i = 0, len = cookies.length; i < len; i++) {
            var iCookie = cookies[i].split('=')
            if ($.trim(iCookie[0]) == key) {
                return iCookie[1]
            }
        }
        return false
    },
    // 设置cookie
    setCookie: function (key, value, exdays) {
        if(exdays == 0) {
            document.cookie = key + '=' + value
        } else {
            var d = new Date();
            d.setDate(d.getDate() + exdays);
            d = d.toUTCString();
            document.cookie = key + '=' + value + ';expires=' + d
        } 
    },
    // 删除cookie
    clearCookie: function (name) {
        this.setCookie(name, "", -1);
    },
    // 数据请求
    request: function (param) {
        var _this = this
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            detaType: param.type || 'json',
            data: param.data || "",
            success: function (res) {
                typeof param.success === 'function' && param.success(res)
            },
            error: function (err) {
                typeof param.error === 'function' && param.error(err)
            }
        })
    },
    // 渲染html
    renderHtml: function (htmlTemple, data) {
        var temple = Hogan.compile(htmlTemple),
            result = temple.render(data)
        return result
    },
    //验证表单是否为空
    vaildata: function (value) {
        var value = $.trim(value)
        return !!value
    }
}
module.exports = util