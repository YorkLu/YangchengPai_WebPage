if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){
    if(window.location.href.indexOf("?mobile")<0){
        try{
            if(/micromessenger/i.test(navigator.userAgent)){
                $(".info-weixin").fadeIn();
            }
            else if(/Android/i.test(navigator.userAgent)) {
                var url = 'youngpai://home';
                window.location.href = url;
                document.getElementById('iframe').src = url;
            }
            else if(/iPhone|iPod|iPad/i.test(navigator.userAgent)){
                window.location = "youngpai://";
            }
            else{
                window.location.href = "http://pai.ycwb.com/responsive.html";
            }
        }catch(e){}
    }
}
else{
    window.location.href = "http://pai.ycwb.com/";
}