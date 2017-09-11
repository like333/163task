/*
 * @Author: like 
 * @Date: 2017-09-08 17:28:04 
 * @Last Modified by: like
 * @Last Modified time: 2017-09-11 15:58:08
 */
'use strict'
var util ={
    getCookie:function(key){
        var cookies = document.cookie.split(';')
        for(var i=0,len=cookies.length;i<len;i++){
            var iCookie = cookies[i].split('=')
            if(iCookie[0] == key){
                return iCookie[1]
            }
        }
        return false
    }
} 
module.exports = util