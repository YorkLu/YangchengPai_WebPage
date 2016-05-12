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
        pangu.spacingElementByClassName('mainText');

        // 懒加载
        $('.mainText img').lazyload({
            effect: 'fadeIn'
        });

        // 灯箱效果(模态对话框样式查看图片)
        $( '.swipebox' ).swipebox({
            hideBarsDelay: 6000
        });

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