/*
 * Author:   YorkLu
 * Date:     2016-04-27
 * */

// 设置标题图长宽比为16:9
$(document).ready(
    function () {
        $(".titleImg").height((0.5 + $(".titleImg").width() / 16 * 9) | 0);

        /*
         * TODO:仅测试时使用,发布前请注释掉
         * myGenerator: 内容生成器
         * */
        contentGenerator();
    }
);

// 窗口大小发生改变
$(window).resize(
    function () {
        $(".titleImg").height((0.5 + $(".titleImg").width() / 16 * 9) | 0);
    }
);