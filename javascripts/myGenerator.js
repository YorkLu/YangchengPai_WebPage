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
        if (Math.random() > 0.4) {
            if (Math.random() > 0.5)
                $(".m-content").append('<p class="lipsum(5,5-25)"></p>');
            else
                $(".m-content").append('<p class="lipsum(3,15-70)"></p>');
        }
        else {
            var seed = Math.random();
            tempIm(seed, i);
            imgCounter++;
        }
    }
    if (imgCounter == 0) {
        var seed = Math.random();
        tempIm(seed, i);
        imgCounter++;
    }

    for(var i=0;i<Math.round(Math.random()*5);i++){
        loremComment();
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

// http://temp.im
function tempIm(seed, i) {
    // 动态生成的标签
    var aTag = $('<a href="" class="swipebox"></a>');
    var imgTag = $('<img src="images/pic_grey_logo.png" alt="image"/>');
    var imgURL = '';

    // 根据随机数设置图片src
    if (seed > 0.66) {
        imgURL = "http://temp.im/400x400/26A3EC/fff";
    }
    else if (seed > 0.33) {
        imgURL = "http://temp.im/400x300/8BC34A/fff";
    }
    else {
        imgURL = "http://temp.im/400x225/FFD450/fff";
    }

    // 设置标签属性
    aTag.attr("href", imgURL);
    aTag.attr("title", "");
    imgTag.attr("data-original", imgURL);
    aTag.append(imgTag);

    // 插入
    $(".m-content").append(aTag);
}

// 图片质量最好但是要翻墙
// Places and things courtesy of Unsplash | https://placem.at/
function placemat(seed, i) {
    var aTag = $('<a href="" class="swipebox"></a>');
    var imgTag = $('<img src="images/pic_grey_logo.png" alt="image"/>');
    var imgURL = '';
    if (seed > 0.66) {
        imgURL = "https://placem.at/things?w=400&txt=0&overlay_color=0000&random=' + i + '";
    }
    else if (seed > 0.33) {
        imgURL = "https://placem.at/places?w=400&txt=0&overlay_color=0000&random=' + i + '";
    }
    else {
        imgURL = "https://placem.at/people?w=400&txt=0&overlay_color=0000&random=' + i + '";
    }
    aTag.attr("href", imgURL);
    aTag.attr("title", "");
    imgTag.attr("data-original", imgURL);
    aTag.append(imgTag);
    $(".m-content").append(aTag);
}

// 生成评论
function loremComment() {
    var userImg, userName, commentTime, commentText, commentImgArr;
    userImg = 'http://www.66tools.com/WebTools/rImage?p=56-56-random-'+(Math.round(Math.random()*100)+'');
    userName = 'userName';
    commentTime = '1小时前';
    commentText = '';

    commentImgArr = [];
    for(var i=0;i<Math.round(Math.random()*5);i++){
        var url = 'http://www.66tools.com/WebTools/rImage?p=400-'+(225+Math.round(Math.random()*175)+'');
        commentImgArr.push(url);
    }
    
    addComment(userImg, userName, commentTime, commentText, commentImgArr);
}