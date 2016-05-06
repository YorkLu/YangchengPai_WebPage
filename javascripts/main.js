/*
 * 编码: 陆扬
 * 日期: 2016-04-27
 * */

$(document).ready(
    function () {
        // 设置标题图长宽比为16:9
        $(".titleImg").height((0.5 + $(".titleImg").width() / 16 * 9) | 0);

        /*
         * TODO:仅测试时使用,发布前请注释掉
         * 内容生成器
         * */
        contentGenerator();

        // "盘古之白"(全角半角字符之间加空格)
        pangu.spacingElementByTagName('p');

        // 懒加载
        $('.mainText img').lazyload({
            effect: 'fadeIn'
        });

        // 灯箱效果(模态对话框样式查看图片)
        setSwipeBox();

        // 绑定事件
        $(".openApp").bind('top click', openApp);
        $(".backdrop-light").bind('top click', function () {
            $(".weixin-browser-help").hide();
            $(this).hide();
        })

        // 根据终端修改文字内容
        if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {
            if (window.location.href.indexOf("?mobile") < 0) {
                try {
                    if (/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
                        $(".browser-guide").text("选择「在Safari中打开」后再次尝试~");
                    }
                } catch (e) {
                }
            }
        }
    }
);

// 窗口大小发生改变
$(window).resize(
    function () {
        $(".titleImg").height((0.5 + $(".titleImg").width() / 16 * 9) | 0);
    }
);

// 打开App
function openApp() {
    if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {
        if (window.location.href.indexOf("?mobile") < 0) {
            try {
                if (/micromessenger/i.test(navigator.userAgent)) {
                    $(".backdrop-light").show();
                    $(".weixin-browser-help").show();
                }
                else if (/Android/i.test(navigator.userAgent)) {
                    var url = 'youngpai://home';

                    window.location = url;
                    var iframe = document.createElement('iframe');
                    iframe.hidden = true;
                    iframe.src = url;
                    document.body.appendChild(iframe);

                    var startTime = new Date();
                    window.setTimeout(function () {
                        600 > new Date() - startTime && (gotoDownload())
                    }, 400)
                }
                else if (/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
                    window.location = "youngpai://";
                    window.setTimeout(function () {
                        window.location = "http://pai.ycwb.com/responsive.html";
                    }, 400);
                }
                else {
                    window.location = "http://pai.ycwb.com/responsive.html";
                }
            } catch (e) {
            }
        }
    }
    else {
        window.location.href = "http://pai.ycwb.com/";
    }
}

// 跳转到下载页
function gotoDownload() {
    window.location.href = "http://pai.ycwb.com/";
}

// 获取 url 参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]);
    return null; //返回参数值
}

// 初始化灯箱效果
var imgCtn = 0;
function setSwipeBox() {

    // 遍历原有图片,新建元素
    $(".mainText img").each(function () {
        // Swipe box
        var swipeBox = $('<div></div>');
        swipeBox.addClass("swipeBox");

        // Image
        var imgCopy = $('<img src=""/>');
        imgCopy.addClass("slide");
        var imgSrc = $(this).attr("data-original");

        // 设置宽度占满屏
        imgCopy.attr({"src": imgSrc, "width": $(document.body).width()});
        swipeBox.append(imgCopy);
        $(".swipeBoxWarpper").append(swipeBox);

        // 设置序号
        $(this).attr("imgNo", imgCtn);

        // 原有图片绑定点击/单击事件
        $(this).bind("click tap", function () {
            $(".swipeBoxWarpper").css("display", "table");
            $(".swipeBoxWarpper").css({"display": "table", "opacity": 0});
            $(".backdrop-dark").fadeIn('fast');
            $(".swipeBoxWarpper").fadeTo("slow", 1);
            swipeBoxAt = -1 * $(this).attr("imgNo");
            $(".swipeBoxWarpper").css("webkitTransform", "translate3d(" + $(".swipeBox").width() * swipeBoxAt + "px,0,0)");
        })
        imgCtn++;
    })

    // 灯箱全宽=图片数量*100%
    $(".swipeBoxWarpper").css("width", imgCtn + '00%');

    // 单击隐藏
    touch.on('.swipeBoxWarpper', 'hold tap doubletap', function (ev) {
        if (ev.type == 'tap') {
            $(".swipeBoxWarpper").fadeOut('fast', function () {
                $(".backdrop-dark").fadeOut('fast');
                $(".swipeBoxWarpper").css({"display": "none"});
                $(".swipeBoxWarpper").css("webkitTransition", 'all ease 0s');
            });
        }
    });

    // 单击&双击图片
    touch.on('.slide', 'hold tap doubletap', function (ev) {
        if (ev.type == 'tap') {
            $(".swipeBoxWarpper").fadeOut('fast', function () {
                $(".backdrop-dark").fadeOut('fast');
                $(".swipeBoxWarpper").css({"display": "none"});
                $(".swipeBoxWarpper").css("webkitTransition", 'all ease 0s');
            });
        }
        else if (ev.type == 'doubletap') {
            // var w = $(this).addClass("slide-bigger");
        }
        return false;
    });

    // 左右滑
    var swipeBoxAt = 0;
    touch.on('.swipeBoxWarpper', 'touchstart', function (ev) {
        ev.preventDefault();
    });

    touch.on('.swipeBoxWarpper', 'swiperight', function (ev) {
        if (swipeBoxAt < 0) {
            swipeBoxAt++;
            $(".swipeBoxWarpper").css("webkitTransition", 'all ease 0.2s');
            $(".swipeBoxWarpper").css("webkitTransform", "translate3d(" + $(".swipeBox").width() * swipeBoxAt + "px,0,0)");
        }
    });

    touch.on('.swipeBoxWarpper', 'swipeleft', function (ev) {
        if (swipeBoxAt > (-1 * imgCtn) + 1) {
            swipeBoxAt--;
            $(".swipeBoxWarpper").css("webkitTransition", 'all ease 0.2s');
            $(".swipeBoxWarpper").css("webkitTransform", "translate3d(" + $(".swipeBox").width() * swipeBoxAt + "px,0,0)");
        }
    });
}