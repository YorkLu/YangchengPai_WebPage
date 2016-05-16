/*
 * 编码: 陆扬
 * 更新: 2016-05-13
 * */

$(document).ready(
    function () {
        // 设置标题图长宽比为16:9
        $(".m-title").height((0.5 + $(".m-title").width() / 16 * 9) | 0);

        /*
         * TODO:仅测试时使用,发布前请注释掉
         * 内容生成器
         * */
        contentGenerator();

        // "盘古之白"(全角半角字符之间加空格)
        pangu.spacingElementByClassName('mainText');

        // 懒加载
        $('.m-content img').lazyload({
            effect: 'fadeIn'
        });
        $('.m-comments img').lazyload({
            effect: 'fadeIn'
        });

        // 灯箱效果(模态对话框样式查看图片)
        $( '.swipebox' ).swipebox({
            hideBarsDelay: 6000
        });

        // 在微信中打开applink
        $(".js-applink").bind('top click', openApp);
        $(".m-backdrop").bind('top click', function () {
            $(".weixin-applink").hide();
            $(".weixin-share").hide();
            $(this).hide();
        })

        // 添加分享模块
        $(".m-footer").addClass("social-share");
        $(".m-footer").attr("data-initialized","true");
        $(".m-footer").append($('<a href="#" class="social-share-icon icon-qzone"></a>'));
        $(".m-footer").append($('<a href="#" class="social-share-icon icon-qq"></a>'));
        $(".m-footer").append($('<a href="#" class="social-share-icon icon-weibo"></a>'));
        $(".m-footer").append($('<a href="#" class="social-share-icon icon-wechat"></a>'));

        var imgForShare = $('<img src=""/>');
        var imgURL = $(".m-title").css("backgroundImage");
        imgForShare.attr("src",imgURL.substring(5,imgURL.length-2));
        imgForShare.css("display","none");
        $(".js-applink").before(imgForShare);
        var $config = {
            sites               : ['qzone', 'qq', 'weibo','wechat'], // 启用的站点
            source              : 'http://pai.ycwb.com/', // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
        };

        $('.social-share').share($config);

        // 根据终端修改显示内容
        if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {
            if (window.location.href.indexOf("?mobile") < 0) {
                try {
                    if (/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
                        // iOS设备中文字提示不同
                        $(".weixin-applink-text").text("选择「在Safari中打开」后再次尝试~");
                    }
                    if (/micromessenger/i.test(navigator.userAgent)){
                        // 在微信中不现实分享二维码,显示分享提示
                        $(".wechat-qrcode").attr("style","display: none !important;")
                        $(".icon-wechat").bind('top click', function () {
                            $(".m-backdrop").show();
                            $(".weixin-share").show();
                        });
                    }
                    else{
                        // 移动端&&不在微信中打开则隐藏微信分享按钮
                        $(".icon-wechat").hide();
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
        $(".m-title").height((0.5 + $(".m-title").width() / 16 * 9) | 0);
    }
);

// 打开App
function openApp() {
    if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {
        if (window.location.href.indexOf("?mobile") < 0) {
            try {
                if (/micromessenger/i.test(navigator.userAgent)) {
                    $(".m-backdrop").show();
                    $(".weixin-applink").show();
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
                    window.location = "youngpai://";3
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

/*
 * 新增评论
 * 输入: 用户头像(url string),用户名(string),评论时间(string),评论内容(string),
 * */

// 单条评论格式
/*
 <div class="comments-item">
 <img src="http://www.66tools.com/WebTools/rImage?p=56-56" class="user-avatar"/>
 <div class="user-info">
 <p class="user-name g-text-s g-text-black-2">Libby Fan</p>
 <p class="comment-time g-text-s g-text-black-2">两小时前</p>
 </div>
 <div class="comment-content">
 <p>喵星人要占领地球的节奏，周末有人跟我同去吗？</p>
 <img src="http://www.66tools.com/WebTools/rImage?p=400-300"/>
 </div>
 </div>
 */

var commentCtn = 0;
function addComment(userImg, userName, commentTime, commentText, commentImgArr) {
    // 去掉占位图
    $(".comment-empty").hide();

    // 异常处理
    if(userImg == ""){
        userImg = "images/pic_user_default.png";
    }
    if(userName === undefined){

    }
    if(commentImgArr === undefined ){
        commentImgArr = [];
    }

    // 单条评论
    var commentItemTag = $('<div></div>');
    commentItemTag.addClass("comments-item");

    // 用户信息
    var userInfoTag = $('<div></div>');
    userInfoTag.addClass("user-info");

    // 用户头像
    var userAvatarTag = $('<img src=""/>');
    userAvatarTag.addClass("user-avatar");
    userAvatarTag.attr("src",userImg);

    // 用户名称
    var userNameTag = $('<p></p>')
    userNameTag.addClass("user-name g-text-s g-text-black-2");
    userNameTag.text(userName);

    // 评论时间
    var commentTimeTag = $('<p></p>')
    commentTimeTag.addClass("comment-time g-text-s g-text-black-4");
    commentTimeTag.text(commentTime);

    // 评论内容
    var commentContentTag = $('<div></div>');
    commentContentTag.addClass("comment-content");

    // 评论文字
    // todo: 这里调用假文字生成器,仅用于测试
    var commentTextTag = $('<p class="lipsum(3,15-70)"></p>')
    commentTextTag.text(commentText);

    // 组合用户信息部分
    userInfoTag.append(userNameTag);
    userInfoTag.append(commentTimeTag);

    // 组合评论内容,galleryID用于分隔图册
    commentContentTag.append(commentTextTag);
    for(var i=0;i<commentImgArr.length;i++){
        var aTag = $('<a href="" class="swipebox"></a>');
        var imgTag = $('<img src="images/pic_grey_logo.png" alt="image"/>');
        aTag.attr("href", commentImgArr[i]);
        aTag.attr("title", "");
        aTag.attr("rel","gallery"+(commentCtn+''));
        imgTag.attr("data-original", commentImgArr[i]);
        aTag.append(imgTag);
        commentContentTag.append(aTag);
    }

    // 组合单条评论
    commentItemTag.append(userAvatarTag);
    commentItemTag.append(userInfoTag);
    commentItemTag.append(commentContentTag);
    $(".m-comments").append(commentItemTag);

    commentCtn++;
}