/*
 * 编码: 陆扬
 * 日期: 2016-04-27
 * 描述: 内容生成器,利用 MoreText.js 和 PlaceMeAt 生成随机图文
 * 备注: Placemat 因 GFW(fuck!) 无法访问,可替换为 Lorempixel 或 66tools 的 randomHolder
 * */

function contentGenerator() {
    // 随机数: parseInt(Math.random()*(max-min+1)+min,10);
    var contentCounter = (Math.random() * (12) + 2.5) | 0;
    for (var i = 0; i < contentCounter; i++) {
        if (Math.random()>0.4) {
            if(Math.random()>0.5)
             $(".footer").before('<p class="lipsum(5,5-25)"></p>');
            else
                $(".footer").before('<p class="lipsum(3,15-70)"></p>');
        }
        else {
            var seed = Math.random();
            randomHolder(seed, i);
        }
    }
}


// 图片质量最好但是要翻墙
// Places and things courtesy of Unsplash | https://placem.at/
function placemat(seed, i) {
    if (seed > 0.66) {
        $(".footer").before('<img src="https://placem.at/things?w=400&txt=0&overlay_color=0000&random=' + i + '">');
    }
    else if (seed > 0.33) {
        $(".footer").before('<img src="https://placem.at/places?w=400&txt=0&overlay_color=0000&random=' + i + '">');
    }
    else {
        $(".footer").before('<img src="https://placem.at/people?w=400&txt=0&overlay_color=0000&random=' + i + '">');
    }
}

// http://lorempixel.com/
function lorempixel(seed, i) {
    if (seed > 0.66) {
        $(".footer").before('<img src="http://lorempixel.com/animals/400/' + (200 + i + '') + '">');
    }
    else if (seed > 0.33) {
        $(".footer").before('<img src="http://lorempixel.com/city/400/' + (300 + i + '') + '">');
    }
    else {
        $(".footer").before('<img src="http://lorempixel.com/nature/400/' + (400 + i + '') + '">');
    }
}

/*
 * 使用懒加载时图片标签的写法
 * <img class="lazy" src="grey.png" data-original="example.jpg" width="640" heigh="480">
 * */

// http://www.66tools.com/WebTools/randomHolder.html
// 使用懒加载
function randomHolder(seed, i) {
    // 计算缩放比例
    var imgWidth = $(document.body).width()-32;
    var imgRatio = imgWidth / 400;
    // console.log(imgRatio+" "+imgWidth);
    if (seed > 0.66) {
        $(".footer").before('<img data-original="http://www.66tools.com/WebTools/rImage?p=400-' + (200 + i + '') + '" src="images/grey.png" height="' + ((imgRatio * (200.5 + i )) | 0 + '') + '" width="'+imgWidth+'">');
    }
    else if (seed > 0.33) {
        $(".footer").before('<img data-original="http://www.66tools.com/WebTools/rImage?p=400-' + (300 + i + '') + '" src="images/grey.png" height="' + ((imgRatio * (300.5 + i )) | 0 + '') + '" width="'+imgWidth+'">');
    }
    else {
        $(".footer").before('<img data-original="http://www.66tools.com/WebTools/rImage?p=400-' + (400 + i + '') + '" src="images/grey.png" height="' + ((imgRatio * (400.5 + i )) | 0 + '') + '" width="'+imgWidth+'">');
    }
}