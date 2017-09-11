/*
 * @Author: like 
 * @Date: 2017-09-08 09:56:49 
 * @Last Modified by: like
 * @Last Modified time: 2017-09-11 20:03:39
 */
'use strict'
require('./layout.css')
require('./index.css')

var _util = require('./util.js')

var index = {
    
    init:function(){
        this.tipShow()
        this.event()
    },
    event:function(){
        var _this = this
        $('.waring-close').click(function(){
            $('.m-tip').hide()
            _this.setCookie()
        })
    },
    tipShow:function(){
        if(!_util.getCookie('module')){
            $('.m-tip').show()
        }else{
            $('.m-tip').hide()
        }
    },
    setCookie:function(){
        var oDate = new Date()
        oDate.setDate(oDate.getDate()+1)
        oDate.toGMTString()
        document.cookie = 'module=warning-tip;expires='+oDate
    }
}
$(function(){
    index.init()
})