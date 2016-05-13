/*
* 增删改查URL参数
* */

function objURL(url) {
    var ourl = url || window.location.href;
    var href = "";//?前面部分
    var params = {};//url参数对象
    var jing = "";//#及后面部分
    var init = function () {
        var str = ourl;
        var index = str.indexOf("#");
        if (index > 0) {
            jing = str.substr(index);
            str = str.substring(0, index);
        }
        index = str.indexOf("?");
        if (index > 0) {
            href = str.substring(0, index);
            str = str.substr(index + 1);
            var parts = str.split("&");
            for (var i = 0; i < parts.length; i++) {
                var kv = parts[i].split("=");
                params[kv[0]] = kv[1];
            }
        } else {
            href = ourl;
            params = {};
        }
    };
    this.set = function (key, val) {
        params[key] = encodeURIComponent(val);
    };
    this.remove = function (key) {
        if (key in params) params[key] = undefined;
    };
    this.get = function (key) {
        return params[key];
    };
    this.url = function (key) {
        var strurl = href;
        var objps = [];
        for (var k in params) {
            if (params[k]) {
                objps.push(k + "=" + params[k]);
            }
        }
        if (objps.length > 0) {
            strurl += "?" + objps.join("&");
        }
        if (jing.length > 0) {
            strurl += jing;
        }
        return strurl;
    };
}