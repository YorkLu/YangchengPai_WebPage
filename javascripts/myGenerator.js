/*
 * 编码: 陆扬
 * 日期: 2016-04-27
 * 描述: 内容生成器,利用 MoreText.js 和 PlaceMeAt 生成随机图文
 * 备注: Placemat 因 GFW(fuck!) 无法访问,可替换为 Lorempixel 或 66tools 的 randomHolder
 * */

function contentGenerator() {
    // 随机数: parseInt(Math.random()*(max-min+1)+min,10);
    var contentCounter = (Math.random() * (9) + 2.5) | 0;
    for (var i = 0; i < contentCounter; i++) {
        if (i % 2 == 0) {
            $(".contentGenerator").append('<p class="lipsum(5,5-25)"></p>');
        }
        else {
            var seed = Math.random();
            if (seed > 0.3) {
                randomHolder(seed, i);
            }
            else {
                $(".contentGenerator").append('<p class="lipsum(3,15-70)"></p>');
            }
        }
    }
}

/*
 * 使用懒加载时图片标签的写法
 * <img class="lazy" src="grey.png" data-original="example.jpg" width="640" heigh="480">
 * */

// Places and things courtesy of Unsplash | https://placem.at/
function placemat(seed, i) {
    if (seed > 0.75) {
        $(".contentGenerator").append('<img src="https://placem.at/things?w=400&txt=0&overlay_color=0000&random=' + i + '">');
    }
    else if (seed > 0.45) {
        $(".contentGenerator").append('<img src="https://placem.at/places?w=400&txt=0&overlay_color=0000&random=' + i + '">');
    }
    else {
        $(".contentGenerator").append('<img src="https://placem.at/people?w=400&txt=0&overlay_color=0000&random=' + i + '">');
    }
}

// http://lorempixel.com/
function lorempixel(seed, i) {
    if (seed > 0.75) {
        $(".contentGenerator").append('<img src="http://lorempixel.com/animals/400/' + (200 + i + '') + '">');
    }
    else if (seed > 0.45) {
        $(".contentGenerator").append('<img src="http://lorempixel.com/city/400/' + (300 + i + '') + '">');
    }
    else {
        $(".contentGenerator").append('<img src="http://lorempixel.com/nature/400/' + (400 + i + '') + '">');
    }
}


// http://www.66tools.com/WebTools/randomHolder.html
// 使用懒加载
function randomHolder(seed, i) {
    var ratio = ($(document.body).width()-32) / 400;
    console.log(ratio);
    if (seed > 0.75) {
        $(".contentGenerator").append('<img data-original="http://www.66tools.com/WebTools/rImage?p=400-' + (200 + i + '') + '" src="images/grey.png" height="' + ((ratio * (200.5 + i )) | 0 + '') + '">');
    }
    else if (seed > 0.45) {
        $(".contentGenerator").append('<img data-original="http://www.66tools.com/WebTools/rImage?p=400-' + (300 + i + '') + '" src="images/grey.png" height="' + ((ratio * (300.5 + i )) | 0 + '') + '">');
    }
    else {
        $(".contentGenerator").append('<img data-original="http://www.66tools.com/WebTools/rImage?p=400-' + (400 + i + '') + '" src="images/grey.png" height="' + ((ratio * (400.5 + i )) | 0 + '') + '">');
    }
}