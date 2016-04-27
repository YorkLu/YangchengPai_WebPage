/*
* Author:   YorkLu
* Date:     2016-04-27
* */

// 设置标题图长宽比为16:9
$(document).ready(
    function () {
        $(".titleImg").height((0.5 + $(".titleImg").width() / 16 * 9) | 0);
    }
);