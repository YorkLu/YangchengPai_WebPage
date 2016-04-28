if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){
    if(window.location.href.indexOf("?mobile")<0){
        try{
            if(/micromessenger/i.test(navigator.userAgent)){
                $(".info-weixin").fadeOut();
            }
            else if(/Android/i.test(navigator.userAgent)) {
                var url = 'youngpai://home';
                if(navigator.userAgent.match(/ucbrowser/i)){
                    document.getElementById('iframe').src = url;
                } else {
                    window.location.href = url;
                }
            }
            else if(/iPhone|iPod|iPad/i.test(navigator.userAgent)){
                window.location = "youngpai://";
            }
            else{
                
            }
        }catch(e){}
    }
}