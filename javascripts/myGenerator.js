/*
 * 编码: 陆扬
 * 日期: 2016-04-27
 * 描述: 内容生成器,利用 MoreText.js 和 PlaceMeAt 生成随机图文
 * 备注: Placemat 因 GFW(fuck!) 无法访问,可替换为 Lorempixel(loading较慢) 或 temp.im)(仅有颜色)
 * */

function contentGenerator() {
    // 随机数: parseInt(Math.random()*(max-min+1)+min,10);
    var contentCounter = (Math.random() * (8) + 3.5) | 0;
    var imgCounter = 0;
    for (var i = 0; i < contentCounter; i++) {
        if (Math.random()>0.4) {
            if(Math.random()>0.5)
             $(".footer").before('<p class="lipsum(5,5-25)"></p>');
            else
                $(".footer").before('<p class="lipsum(3,15-70)"></p>');
        }
        else {
            var seed = Math.random();
            tempIm(seed, i);
            imgCounter++;
        }
    }
    if(imgCounter==0){
        var seed = Math.random();
        tempIm(seed, i);
        imgCounter++;
    }
}

/*
 * 使用懒加载时图片标签的写法
 * <img class="lazy" src="grey.png" data-original="example.jpg" width="640" heigh="480">
 * */

/*
 * 使用 Swipebox 时格式
 * <a href="big/image.jpg" class="swipebox" title="My Caption">
 * <img src="small/image.jpg" alt="image">
 * </a>
 * */

// 图片质量最好但是要翻墙
// Places and things courtesy of Unsplash | https://placem.at/
function placemat(seed, i) {
    var aTag = $('<a href="" class="swipebox"></a>');
    var imgTag = $('<img src="images/grey_logo.png" alt="image"/>');
    var imgURL = '';
    if (seed > 0.66) {
        imgURL =  "https://placem.at/things?w=400&txt=0&overlay_color=0000&random=' + i + '";
    }
    else if (seed > 0.33) {
        imgURL =  "https://placem.at/places?w=400&txt=0&overlay_color=0000&random=' + i + '";
    }
    else {
        imgURL = "https://placem.at/people?w=400&txt=0&overlay_color=0000&random=' + i + '";
    }
    aTag.attr("href",imgURL);
    aTag.attr("title","");
    imgTag.attr("data-original",imgURL);
    aTag.append(imgTag);
    $(".footer").before(aTag);
}

// http://lorempixel.com/
function lorempixel(seed, i) {
    if (seed > 0.66) {
        $(".footer").before('<img data-original="http://lorempixel.com/animals/400/' + (200 + i + '') + '" src="images/grey_logo.png">');
    }
    else if (seed > 0.33) {
        $(".footer").before('<img data-original="http://lorempixel.com/city/400/' + (300 + i + '') + '" src="images/grey_logo.png">');
    }
    else {
        $(".footer").before('<img data-original="http://lorempixel.com/nature/400/' + (400 + i + '') + '" src="images/grey_logo.png">');
    }
}

// http://temp.im
function tempIm(seed, i) {
    var aTag = $('<a href="" class="swipebox"></a>');
    var imgTag = $('<img src="images/grey_logo.png" alt="image"/>');
    var imgURL = '';
    if (seed > 0.66) {
        imgURL =  "http://temp.im/400x400/26A3EC/fff";
    }
    else if (seed > 0.33) {
        imgURL =  "http://temp.im/400x300/8BC34A/fff";
    }
    else {
        imgURL = "http://temp.im/400x225/FFD450/fff";
    }
    aTag.attr("href",imgURL);
    aTag.attr("title","");
    imgTag.attr("data-original",imgURL);
    aTag.append(imgTag);
    $(".footer").before(aTag);
}