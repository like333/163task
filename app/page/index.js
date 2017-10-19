/*
 * @Author: like 
 * @Date: 2017-09-08 09:56:49 
 * @Last Modified by: like
 * @Last Modified time: 2017-10-19 23:02:46
 */
'use strict'
require('./layout.css')
require('./index.css')
var hex_md5 = require('./md5.js')
var templateIndex = require('./products.string')
var templateHot = require('./side.string')

var _util = require('./util.js')
var _server = require('./server.js')

var index = {
    data: {
        pagination: {
            pageNo: 1,//当前页码
            psize: 16,//每页返回的数据个数
            type: 10//10产品设计，20编程语言
        },
        pageInfo: {
            "hasPrePage": false,
            "hasNextPage": true
        }
    },
    init: function () {
        this.checkCookie()
        this.loadProducts()
        this.loadHot()
        this.event()
        this.slider()
    },
    event: function () {
        var _this = this
        // 关闭提醒
        $('.waring-close').click(function () {
            $('.m-tip').hide()

            _util.setCookie('module', 'warning-tip', 1)
        })
        // 关注，如果已经登录，直接关注，如果没有登录先登录再关注
        $('.m-nav .follow').click(function () {
            if (!_util.getCookie('loginSuc')) {
                _this.login()
            } else {
                _util.setCookie('followSuc', 'isFollow', 0)
                _this.isFollow()
            }
        }),
            $('.login-btn').click(function () {

                var userInfo = {
                    userName: hex_md5($('.m-login .username').val()),
                    password: hex_md5($('.m-login .userpsw').val())
                }
                // console.log(userInfo)
                _server.checkLogin(userInfo, function (res) {
                    if (res == 1) {
                        _util.setCookie('loginSuc', 'isLogin', 0)
                        _server.follow(function (res) {
                            if (res == 1) {
                                $('.m-login-mask').hide()
                                _util.setCookie('followSuc', 'isFollow', 0)
                                _this.isFollow()
                            }
                        }, function (err) {
                            alert('请求错误')
                        })

                    } else {
                        alert('账户名或密码错误')
                    }
                }, function (err) {

                })

            })
        // 登录关闭按钮
        $('.m-login .close').click(function () {
            $('.m-login-mask').hide()
        })
        // 取消关注
        //删除关注cookie，并将关注按钮重置
        $('.m-nav .followed a').click(function () {
            _util.clearCookie('followSuc')
            _this.isFollow()
        })
        // tab切换
        $('.m-tab li').click(function () {
            var $lis = $('.m-tab li')
            _this.data.pagination.pageNo = 1
            if ($(this).hasClass('active')) {
                return
            } else {
                $lis.each(function () {
                    $(this).removeClass('active')
                })
                $(this).addClass('active')

                _this.data.pagination.type
                    = $(this).hasClass('pro-design') ? 10 : 20

                _this.loadProducts()
            }

        })
        // 翻页
        $(document).on('click', '.m-page .page-num', function () {
            if ($(this).html() == _this.data.pagination.pageNo) {
                return
            }
            _this.data.pageInfo.hasNextPage =
                $(this).html() == _this.data.pageInfo.totalPage ? false : true

            _this.data.pageInfo.hasPrePage = $(this).html() == 1 ? false : true

            _this.data.pagination.pageNo = $(this).html()
            _this.loadProducts()
        })
        // 向前一页
        $(document).on('click', '.m-page .pre', function () {
            var num = _this.data.pagination.pageNo
            var totalPage = _this.data.pageInfo.totalPage
            if (num == 1) {
                return
            } else {
                $(this).removeClass('disabled')
                _this.data.pagination.pageNo = parseInt(num) - 1

                _this.data.pageInfo.hasNextPage =
                    _this.data.pagination.pageNo < totalPage ? true : false

                _this.data.pageInfo.hasPrePage =
                    _this.data.pagination.pageNo == 1 ? false : true

                _this.loadProducts()
            }
        })
        //向后一页
        $(document).on('click', '.m-page .next', function () {
            var num = _this.data.pagination.pageNo
            var totalPage = _this.data.pageInfo.totalPage
            var $this = $('.m-page .next')
            if (num == totalPage) {
                return
            } else {
                _this.data.pagination.pageNo = parseInt(num) + 1

                _this.data.pageInfo.hasPrePage =
                    _this.data.pagination.pageNo > 1 ? true : false

                _this.data.pageInfo.hasNextPage =
                    _this.data.pagination.pageNo == totalPage ? false : true

                _this.loadProducts()

            }
        })
        // 鼠标滑过产品，显示弹出层
        $(document).on('mouseover', '.pro-list li', function () {
            $(this).find('.m-detail').show()
        })
        $(document).on('mouseout', '.pro-list li', function () {
            $(this).find('.m-detail').hide()
        })
        var videoStr = ` <video width="889px" height="567px"  controls>
        <source src="http://mov.bn.netease.com/open-movie/nos/mp4/2014/12/30/SADQ86F5S_shd.mp4" type="video/mp4">
        抱歉，您的浏览器不支持内嵌视频，不过不用担心，你可以 <a target="_blank" href="http://mov.bn.netease.com/open-movie/nos/mp4/2014/12/30/SADQ86F5S_shd.mp4">观看</a>

        并用你喜欢的播放器观看!
    </video>`
        $('.m-side .video-preview').click(function () {
            $(".m-mask").show()
            console.log($(".m-mask video"))
            if ($(".m-mask video").length === 0) {
                $('.m-mask .videoPlayer').append($(videoStr))
            }
        })
        $('.m-video .close').click(function () {
            $(".m-mask").hide()
            $('.m-mask video').remove()
        })
    },
    // 检查提醒cookie
    checkCookie: function () {
        if (!_util.getCookie('module')) {
            $('.m-tip').show()
        } else {
            $('.m-tip').hide()
        }
        this.isFollow()
    },
    // 轮播图
    slider: function () {
        var timer = null,
            n = 0,
            h = 460,
            $banners = $('.m-banner li'),
            $list = $('.m-nav-list span'),
            len = $banners.length

        var bannerMove = function () {
            timer = setInterval(function () {
                n++
                if (n == len) {
                    n = 0
                }
                $banners.each(function () {
                    $(this).css("opacity", 0)
                })
                $list.each(function (index) {
                    $(this).removeClass('active')
                    $(this).on('click', function () {
                        $banners[n].style.opacity = 0
                        $list.eq(n).removeClass('active')

                        $banners[index].style.opacity = 1
                        $(this).addClass('active')
                        n = index
                    })
                })
                $banners[n].style.opacity = 1
                $list.eq(n).addClass('active')
            }, 5e3)
        }
        bannerMove()

        $banners.each(function () {
            $(this).mouseover(function () {
                clearInterval(timer)
            })
            $(this).mouseout(function () {
                bannerMove()
            })
        })
    },
    // 登录
    login: function () {
        console.log('show')
        $('.m-login-mask').show()
    },
    // 检测是否已关注
    isFollow: function () {
        //如果设置关注cookie成功
        if (_util.getCookie('followSuc')) {
            $('.m-nav .follow').hide()
            $('.m-nav .followed').css('display', 'inline-block')
        }
        //没有关注cookie
        else {
            $('.m-nav .follow').show()
            $('.m-nav .followed').css('display', 'none')
        }
    },
    // 加载产品设计
    loadProducts: function () {
        var html = '',
            _this = this,
            $products = $('.m-main .products-box'),
            pageInfo = _this.data.pagination
        $products.html('')
        _server.getProducts(pageInfo, function (res) {
            var info = JSON.parse(res)
            html = _util.renderHtml(templateIndex, info)
            $products.html(html)
            // 加载分页
            _this.data.pageInfo.totalCount = info.totalCount//返回的数据总数
            _this.data.pageInfo.totalPage = info.totalPage//返回的数据总页数
            _this.data.pageInfo.pageIndex = info.pagination.pageIndex//当前页码

            _this.loadPagination(_this.data.pageInfo)
        }, function (err) {
            $products.html('加载失败')
        })
    },
    //加载分页信息
    loadPagination: function (pageInfo) {
        $('.m-page').html('')
        var pageArray = [], pageHtml = ''
        pageArray.push({
            class: 'pre ',
            html: ' < ',
            disabled: !pageInfo.hasPrePage
        })
        for (var i = 0, len = pageInfo.totalPage; i < len; i++) {

            if ((i + 1) == parseInt(pageInfo.pageIndex)) {
                pageArray.push({ class: 'page-num ', html: i + 1, isActive: true })
            }
            else {
                pageArray.push({ class: 'page-num ', html: i + 1, isActive: false })
            }
        }
        pageArray.push({
            class: 'next',
            html: ' > ',
            disabled: !pageInfo.hasNextPage
        })
        for (var j = 0, l = pageArray.length; j < l; j++) {
            if (pageArray[j].disabled) {
                pageHtml += '<span class = "disabled ' + pageArray[j].class + '">' + pageArray[j].html + '</span>'
            } else if (pageArray[j].isActive) {
                pageHtml += '<span class = "active ' + pageArray[j].class + '">' + pageArray[j].html + '</span>'
            } else {
                pageHtml += '<span class = " ' + pageArray[j].class + '">' + pageArray[j].html + '</span>'
            }
        }
        $('.m-page').append(pageHtml)
    },
    // 加载最热排行榜
    loadHot: function () {
        var html = '',
            _this = this,
            $hot = $('.m-hot .hot-list')
        _server.getHot(function (res) {
            var info = JSON.parse(res)
            info = { list: info }
            html = _util.renderHtml(templateHot, info)
            $hot.html(html)
            _this.refreshCourse()
        }, function (err) {
            $hot.html('加载失败')
        })
    },
    //课程更新
    refreshCourse: function () {
        var timer = null, $hotList = $('.m-hot .hot-list'), n = 0, d = 72
        timer = setInterval(function () {
            $hotList.css({ 'transition': '.5s', 'transform': 'translateY(-72px)' })
            setTimeout(function () {
                var $firstChild = $('.m-hot .hot-list li').eq(0).remove()
                $hotList.append($firstChild)
                $hotList.css({ 'transition': '0s', 'transform': 'translateY(0px)' })
            }, 1e3)
        }, 5e3)
    }
}
$(function () {
    index.init()
})