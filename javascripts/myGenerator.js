/*
 * 编码: 陆扬
 * 日期: 2016-04-27
 * 描述: 内容生成器,利用 MoreText.js 和 PlaceMeAt 生成随机图文
 * 备注: PlaceMeAt 因 GFW(fuck!) 访问较慢,替换为 Lorempixel
 * */

function contentGenerator() {
    // 随机数: parseInt(Math.random()*(max-min+1)+min,10);
    var contentCounter = (Math.random() * (9) + 2.5) | 0;
    for (var i = 0; i < contentCounter; i++) {
        if (i % 2 == 0) {
            $(".contentGenerator").append('<p class="lipsum(4,10-30)"></p>');
        }
        else {
            var seed = Math.random();
            if (seed > 0.8) {
                // $(".contentGenerator").append('<img src="https://placem.at/things?w=400&txt=0&overlay_color=0000&random=' + i + '">');
                $(".contentGenerator").append('<img src="http://lorempixel.com/animals/400/'+(200+i+'')+'">');
            }
            else if (seed > 0.6) {
                // $(".contentGenerator").append('<img src="https://placem.at/places?w=400&txt=0&overlay_color=0000&random=' + i + '">');
                $(".contentGenerator").append('<img src="http://lorempixel.com/city/400/'+(300+i+'')+'">');
            }
            else if (seed > 0.4) {
                // $(".contentGenerator").append('<img src="https://placem.at/people?w=400&txt=0&overlay_color=0000&random=' + i + '">');
                $(".contentGenerator").append('<img src="http://lorempixel.com/nature/400/'+(400+i+'')+'">');
            }
            else {
                $(".contentGenerator").append('<p class="lipsum(3,25-50)"></p>');
            }
        }
    }
}