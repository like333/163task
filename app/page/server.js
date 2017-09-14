/*
 * @Author: like 
 * @Date: 2017-09-12 17:37:52 
 * @Last Modified by: like
 * @Last Modified time: 2017-09-14 10:03:24
*/
'use strict'

var _util = require('./util.js')
var server = {
    // 登录
    checkLogin: function (userInfo, resolve, reject) {
        _util.request({
            url: 'http://study.163.com/webDev/login.htm',
            data: userInfo,
            success: resolve,
            error: reject
        })
       
    },
    // 关注
    follow: function (resolve, reject) {
        _util.request({
            url: 'http://study.163.com/webDev/attention.htm',
            success: resolve,
            error: reject
        })
    },
    // 产品设计
    getProducts:function(pageInfo,resolve,reject){
        _util.request({
            url: 'http://study.163.com/webDev/couresByCategory.htm',
            data:pageInfo,
            success: resolve,
            error: reject
        })
    },
    // 热门排行
    getHot:function(resolve,reject){
        _util.request({
            url: 'http://study.163.com/webDev/hotcouresByCategory.htm',
            success: resolve,
            error: reject
        })
    }
    
}

module.exports = server
