/*
 * Author:   YorkLu
 * Date:     2016-04-27
 * */

$(document).ready(
    function () {
        // 设置标题图长宽比为16:9
        $(".titleImg").height((0.5 + $(".titleImg").width() / 16 * 9) | 0);

        /*
         * TODO:仅测试时使用,发布前请注释掉
         * myGenerator: 内容生成器
         * */
        contentGenerator();

        // 绑定事件
        $(".openApp").bind('top click',openApp);
        $(".backdrop").bind('top click',function () {
            $(".weixin-browser-help").hide();
            $(this).hide();
        })
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
    if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){
        if(window.location.href.indexOf("?mobile")<0){
            try{
                if(/micromessenger/i.test(navigator.userAgent)){
                    $(".backdrop").show();
                    $(".weixin-browser-help").show();
                }
                else if(/Android/i.test(navigator.userAgent)) {
                    var url = 'youngpai://home';

                    window.location = url;
                    var iframe = document.createElement('iframe');
                    iframe.hidden = true;
                    iframe.src = url;
                    document.body.appendChild(iframe);

                    var startTime = new Date();
                    window.setTimeout(function() {
                        600 > new Date() - startTime && (gotoDownload())
                    }, 400)
                }
                else if(/iPhone|iPod|iPad/i.test(navigator.userAgent)){
                    window.location = "youngpai://";
                    window.setTimeout(function() {
                        window.location = "http://pai.ycwb.com/responsive.html";
                    }, 400);
                }
                else{
                    window.location = "http://pai.ycwb.com/responsive.html";
                }
            }catch(e){}
        }
    }
    else{
        window.location.href = "http://pai.ycwb.com/";
    }
}

function gotoDownload() {
    window.location.href = "http://pai.ycwb.com/";
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}