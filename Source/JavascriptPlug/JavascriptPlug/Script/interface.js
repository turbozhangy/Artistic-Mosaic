var amImgArray = null;

function init() {
    //不支持HTML5返回
    if (window.Worker === undefined) {
        alert('您打浏览器版本太低，请升级您打浏览器。建议您使用谷歌浏览器。');
        return;
    }

    amImgArray = new Array();
    var imgs = document.getElementsByTagName("img");
    for (var i = 0; i < imgs.length; i++) {
        ////筛选,原始宽高大于100的图片
        if (imgs[i].naturalWidth > 100 && imgs[i].naturalHeight > 100) {
            amImgArray.push(imgs[i]);
        }
    }

    //判断页面是否有Iframe
    var iframes = document.getElementsByTagName("iframe");//
    if (iframes.length > 0) {
        for (var i = 0; i < iframes.length; i++) {

            //判断iframe与当前网站同域是添加
            // if (iframes[i].src.split("/")[2] == window.location.href.split("/")[2]) {
            try {
                var imgs = iframes[i].contentWindow.document.getElementsByTagName("img");
                if (imgs.length > 0) {
                    for (var i = 0; i < imgs.length; i++) {
                        ////筛选,原始宽高大于100的图片
                        if (imgs[i].naturalWidth > 100 && imgs[i].naturalHeight > 100) {
                            amImgArray.push(imgs[i]);
                        }
                    }
                }
            } catch (e) {

            }
        }
    }

    //var iframe = document.createElement("iframe");
    //iframe.style.width = "100%";
    //iframe.style.height = "100%";
    //iframe.src = "http://localhost:50226";
    //iframe.onload = function () {
    //   // var s = iframe.contentWindow.document;
    //    debugger;
    //}
    var warp = document.createElement('div');
    warp.id = "am_pulg";
    warp.style.width = "100%";
    warp.style.height = "100%";
    warp.style.background = "#fff";
    if (document.getElementById('am_pulg') == null) {
        document.body.innerHTML = "";
        document.body.appendChild(warp);
    }


    var oScript = document.createElement("script");
    oScript.type = "text/javascript";
    oScript.onload = function () {
        var am = new AM("http://localhost:50226", "am_pulg");
        am.init(amImgArray);
    };
    oScript.src = "http://localhost:50226/Script/am.js";

    document.body.appendChild(oScript);


    //.appendChild(oScript);
};
init();