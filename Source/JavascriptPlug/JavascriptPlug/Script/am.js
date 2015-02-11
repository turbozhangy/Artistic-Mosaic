function AM(domain, id) {
    if (document.getElementsByClassName("artistic-mosaic").length > 0) {
        return AM.instance;
    }

    this.option = {
        autoCut: true,
        setting: {
            size: [50, 50],
            opacity: 45
        }
    }

    if (domain == null) {
        domain = "";
    }

    var html = new Array();
    html.push("<link href=\"" + domain + "/Style/am.css\" rel=\"stylesheet\">");
    html.push("<div class=\"am-body\">");
    html.push("<h3 style=\"text-align: left;\">图片<small>(共使用<span id=\"imgCollectionCount\">0</span>张)</small></h3>");
    html.push("<div class=\"img-body\">");
    html.push("<div id=\"img_warp\" class=\"img-warp\">");
    html.push("<div class=\"am-imgContainer\"></div>");
    html.push("<div class=\"am-imgCover\"><img /></div>");
    html.push("</div>");
    //html.push("<ul id=\"img_Collection\" class=\"list-inline img-Collection\"></ul>");
    html.push("</div>");
    html.push("</div>");

    html.push("<div class=\"am-rightbar\">");

    html.push("<div class=\"cover\" name=\"step2\" style=\"display:none\">");

    html.push("<h3 style=\"text-align: left;\">封面<small id=\"am_cover_size\"></small></h3>");
    html.push("<div class=\"am-img-main img-thumbnail\" id=\"am_mainImg\"><div style=\"margin: 80px auto;text-align: center;\">拖动图片到此处完成上传</div></div>");

    html.push("<div style=\"text-align: left;display:none\" name=\"step2\">");
    html.push("<label class=\"checkbox-inline\"><input type=\"checkbox\" id=\"autoCutting\" value=\"\"> 自动裁剪</label>");
    //html.push("<a href=\"javascript:void(0)\" class=\"pull-right\">本地上传</a>");
    html.push("</div>");

    html.push("</div>");

    html.push("<div>");

    html.push("<h3 style=\"text-align: left;\" id=\"am_stepName\">元素");
    // html.push("<div class=\"pull-right\"><input type=\"button\" value=\"应用\" class=\"btn btn-warning btn-xs\" id=\"am_applyBtn\" /></div>");
    html.push("</h3>");
    html.push("<div name=\"step1\" style=\"border: 2px dotted #ccc;margin-top: 20px;\" id=\"am_dropZone\"><div style=\"margin: 80px auto;text-align: center;\">照片拖动到此处以增加基础元素</div></div>");
    html.push("<div class=\"form-group mt10\" name=\"step1\">");
    html.push("元素尺寸<small class=\"text-gray\">(px)</small>：");
    html.push("<input type=\"range\" id=\"am_size\" min=\"50\" max=\"200\" step=\"1\" value=\"50\"/>");
    html.push("</div>");

    html.push("<div name=\"step2\" style=\"display:none\">");
   // html.push("封面透明度<small class=\"text-gray\">(%)</small>");
    html.push("<input type=\"range\" id=\"am_opacity\" min=\"0\" max=\"100\" step=\"1\" value=\"0\"/>");

    html.push("</div>");
   
    html.push("</div>");

    html.push("<div class=\"mt10 text-right\">");
    html.push("<input type=\"button\" value=\"退出\" class=\"btn btn-default\" style=\"padding: 6px 20px;width: auto;\"/>");
    html.push("<input type=\"button\" value=\"下一步\" class=\"btn btn-success ml10\" id=\"am_nextStep\" />");
    html.push("<input type=\"button\" value=\"生成图片\" class=\"btn btn-success ml10\" id=\"am_creatingBtn\"  style=\"display:none;\"/>");
    html.push("<a id=\"am_html5download\" class=\"hidden\">artistic-mosaic</a>");
    html.push("</div>");

    

    html.push("</div>");

    html.push("<div style=\"clear:both\"></div>");


    var element = document.createElement("div");
    element.innerHTML = html.join("");

    if (id) {
        var body = document.getElementById(id);
        if (!body) {
            body = document.getElementsByTagName("body");
        }

        body.appendChild(element);
    }
    else {
        document.body.appendChild(element);
    }

    var canvas = document.createElement("canvas");
    canvas.id = "am_canvas";
    var tmpDiv = document.createElement("div");
    tmpDiv.id = "am_getImg";
    tmpDiv.style.display = "none";
    tmpDiv.innerHTML = "请在图片上右键另存为。";
    tmpDiv.appendChild(canvas);
    document.body.appendChild(tmpDiv);

    this.imgContainer = document.getElementsByClassName("am-imgContainer")[0];
    this.coverImg = document.getElementsByClassName("am-imgCover")[0].firstChild;
    this.imgWarp = document.getElementById("img_warp");
    //this.imgWarp.addEventListener("mouseenter", function () {
    //    var am = AM.instance;
    //    if (am.coverImg.src) {
    //        am.imgContainer.style.zIndex = "5001";
    //        am.imgContainer.style.opacity = "0.45";
    //        am.coverImg.parentElement.style.zIndex = "5000";
    //        am.coverImg.parentElement.style.opacity = "1";
    //    }

    //}, false);

    //this.imgWarp.addEventListener("mouseleave", function () {
    //    var am = AM.instance;
    //    if (am.coverImg.src) {
    //        am.imgContainer.style.zIndex = "5000";
    //        am.imgContainer.style.opacity = "1";
    //        am.coverImg.parentElement.style.zIndex = "5001";
    //        am.coverImg.parentElement.style.opacity = "0.45";
    //    }
    //}, false);
    document.getElementById("am_nextStep").addEventListener("click", function () {
        var stepOne = document.getElementsByName("step1");
        for (var i = 0; i < stepOne.length; i++) {
            stepOne[i].style.display = "none";
        }
        var stepTwo = document.getElementsByName("step2");
        for (var i = 0; i < stepTwo.length; i++) {
            stepTwo[i].style.display = "block";
        }

        document.getElementById("am_creatingBtn").style.display = "inline-block";

        this.style.display = "none";

        document.getElementById("am_stepName").innerText = "透明度(%)";
    }, false);

    document.getElementById("autoCutting").checked = this.option.autoCut;
    document.getElementById("am_opacity").value = this.option.setting.opacity;
    document.getElementById("am_opacity").addEventListener("change", function () {
        AM.instance.option.setting.opacity = this.value;
        document.getElementsByClassName("am-imgCover")[0].style.opacity = this.value / 100;

    }, false);
    document.getElementById("am_size").value = this.option.setting.size[0];
    document.getElementById("am_size").addEventListener("change", function () {
        var size = Number(this.value);
        var am = AM.instance;
        am.option.setting.size = [size, size];
        if (am.coverImg.src) {
        }
        else {
            var imgs = am.imgContainer.getElementsByTagName("img");
            for (var i = 0; i < imgs.length; i++) {
                imgs[i].style.width = size + "px";
                imgs[i].style.height = size + "px";
            }
        }
    }, false);
    this.element = element;
    this.collection = new Array();
    this.naturalWidth = 0;
    this.naturalHeight = 0;

    ////图片数量
    this.xCount = function () {
        return parseInt(this.naturalWidth / this.option.setting.size[0]);
    };

    this.yCount = function () {
        return parseInt(this.naturalHeight / this.option.setting.size[1]);
    };

    this.count = function () {
        return this.xCount() * this.yCount();
    }

    this.realFitSize = function () {
        return [this.option.setting.size[0] * this.xCount(), this.option.setting.size[1] * this.yCount()];
    }
};

AM.instance = {};
AM.prototype.init = function (collection) {
    if (collection) {
        this.collection = collection;
    }

    AM.instance = this;

    document.getElementById("autoCutting").onclick = function () {
        AM.instance.toggleSize(this.checked);
    };

    document.getElementById("am_creatingBtn").onclick = function () {
        var am = AM.instance;
        if (am.coverImg.src == "") {
            alert("请先设置封面图片，您可以直接将图片拖入到图层。");
            return;
        }

        var needCut = document.getElementById("autoCutting").checked;

        //申明canvas

        var canvas = document.getElementById("am_canvas");

        var context = canvas.getContext("2d");

        if (am.naturalHeight > 0 && am.naturalWidth > 0) {
            if (needCut) {
                var fitSize = am.realFitSize();
                canvas.width = fitSize[0];
                canvas.height = fitSize[1];
            }
            else {
                canvas.width = am.naturalWidth;
                canvas.height = am.naturalHeight;
            }
        }
        else {
            canvas.width = am.imgContainer.clientWidth;
            canvas.height = am.imgContainer.clientHeight;
        }

        var imgCollection = am.imgContainer.getElementsByTagName("img");
        if (imgCollection.length == 0) {
            return;
        }

        this.disabled = true;
        this.value = "处理中...";
        for (var i = 0; i < imgCollection.length; i++) {
            //AM.instance.imgContainer.getElementsByTagName("img")[1].parentElement.offsetTop
            var x = imgCollection[i].parentElement.offsetLeft;
            var y = imgCollection[i].parentElement.offsetTop;

            var imgTmp = new Image();
            imgTmp.src = imgCollection[i].src;
            imgTmp.attributes["x"] = x;
            imgTmp.attributes["y"] = y;
            imgTmp.attributes["end"] = false;
            imgTmp.width = am.option.setting.size[0];
            imgTmp.height = am.option.setting.size[1];
            imgTmp.crossOrigin = "anonymous";
            if (i == imgCollection.length - 1) {
                imgTmp.attributes["end"] = true;
            }

            imgTmp.onload = function () {

                context.drawImage(this, 0, 0, this.naturalWidth, this.naturalHeight, this.attributes["x"], this.attributes["y"], this.height, this.width);

                //最后一个时
                if (this.attributes["end"] == true) {
                    if (am.coverImg.src) {
                        //this.realFitSize();
                        var cover = new Image();
                        cover.src = am.coverImg.src;
                        cover.crossOrigin = "anonymous";
                        cover.onload = function () {
                            context.globalAlpha = am.option.setting.opacity / 100;
                            context.drawImage(this, 0, 0, this.naturalWidth, this.naturalHeight);

                            try {
                                var stream = document.getElementsByTagName("canvas")[0].toDataURL("image/png");
                                //以下代码为下载此图片功能 
                                var downloadBtn = document.getElementById("am_html5download");
                                if ('download' in downloadBtn) { //supported  
                                    downloadBtn.href = stream;
                                    downloadBtn.download = "artistic-mosaic.png";
                                    downloadBtn.click();
                                }
                                else {
                                    alert("no supported");
                                }
                            } catch (e) {
                                alert("您所访问的网站限制了图片访问，无法自动下载生成的图片，您可以右键另存为。");
                                document.getElementById("am_getImg").style.display = "block"; 
                            } finally {
                                document.getElementById("am_creatingBtn").disabled = false; 
                                document.getElementById("am_creatingBtn").value = "重新生成";
                            }
                        }
                    }
                }
            }
        }

        // document.body.appendChild(canvas);
    };

    //var collectionBox = document.getElementById("img_Collection");
    //for (var i = 0; i < collection.length; i++) {
    //    if (collection[i].width >= this.option.setting.size[0] && collection[i].height >= this.option.setting.size[1]) {
    //        this.append(collection[i].src);
    //    }
    //}
    // collectionBox.innerHTML = html.join("");
    //document.getElementsByClassName("am-img-remove");

    //////组织浏览器默认打开文件事件
    function _stop(e) {
        e.stopPropagation();
        e.preventDefault();
    };

    var dropBox = document.getElementById("am_dropZone");
    //拖离 
    dropBox.addEventListener("dragleave", _stop, false);

    //拖进 
    dropBox.addEventListener("dragenter", _stop, false);

    //拖来拖去 
    dropBox.addEventListener("dragover", _stop, false);

    dropBox.addEventListener("drop", function (e) {
        e.stopPropagation();
        e.preventDefault(); //取消默认浏览器拖拽效果 
        var fileList = e.dataTransfer.files; //获取文件对象 

        //检测是否是拖拽文件到页面的操作 
        if (fileList.length == 0) {
            return false;
        }

        //拖拉图片到浏览器，可以实现预览功能 
        for (var i = 0; i < fileList.length; i++) {

            // 最大1M
            if (fileList[i].size < 1024 * 1024) {
                if (fileList[i].type.indexOf('image') > -1) {
                    var reader = new FileReader();

                    reader.onload = function (e) {
                        //AM.instance.append(this.result);
                        var am = AM.instance;
                        var img = new Image();
                        img.src = this.result;
                        img.style.width = am.option.setting.size[0] + "px";
                        img.style.height = am.option.setting.size[1] + "px";

                        var div = document.createElement("div");
                        div.appendChild(img);

                        var close = document.createElement("a");
                        close.href = "javascript:void(0)";
                        close.title = "删除";
                        close.innerHTML = "X";
                        close.addEventListener("click", function () {
                            var count = Number(document.getElementById("imgCollectionCount").innerText);
                            document.getElementById("imgCollectionCount").innerText = (count - 1);
                            this.parentElement.parentElement.removeChild(this.parentElement);
                        }, false);
                        div.appendChild(close);
                        am.imgContainer.appendChild(div);

                        var count = Number(document.getElementById("imgCollectionCount").innerText);
                        document.getElementById("imgCollectionCount").innerText = count + 1;
                    }

                    reader.readAsDataURL(fileList[i]);
                }
            }
        }
    }, false);

    var mainImgDiv = document.getElementById("am_mainImg");

    //拖离 
    mainImgDiv.addEventListener("dragleave", _stop, false);

    //拖进 
    mainImgDiv.addEventListener("dragenter", _stop, false);

    //拖来拖去 
    mainImgDiv.addEventListener("dragover", _stop, false);

    mainImgDiv.addEventListener("drop", function (e) {
        e.stopPropagation();
        e.preventDefault(); //取消默认浏览器拖拽效果 
        var fileList = e.dataTransfer.files; //获取文件对象 

        //检测是否是拖拽文件到页面的操作 
        if (fileList.length == 0) {
            return false;
        }

        //拖拉图片到浏览器，可以实现预览功能 
        if (fileList[0].size < 1024 * 1024) {
            if (fileList[0].type.indexOf('image') > -1) {
                var reader = new FileReader();
                var self = this;
                self.innerHTML = "";
                reader.onload = function (e) {
                    AM.instance.setCover(this.result);
                }

                reader.readAsDataURL(fileList[0]);
            }
        }
    }, false);

    this.imgWarp.style.height = "500px";
    ////填充画板
    this.fill(this.option.setting.size[0], this.option.setting.size[1], this.collection.length, this.imgContainer, this.collection);


}

AM.prototype.setCover = function (imgSrc) {
    if (AM.instance == null) {
        return;
    }

    this.coverImg.src = imgSrc;

    var Img = new Image();
    Img.src = imgSrc;
    document.getElementById("am_mainImg").appendChild(Img);

    // document.getElementById("am_cover_img").src = imgSrc;

    ////原始宽度、高度
    this.naturalWidth = this.coverImg.naturalWidth;
    this.naturalHeight = this.coverImg.naturalHeight;

    document.getElementById("am_cover_size").innerText = "(" + this.naturalWidth + "x" + this.naturalHeight + ")";

    ////如果需要裁剪
    //this.toggleSize(this.option.autoCut);
    this.toggleSize(document.getElementById("autoCutting").checked);
    
    //var collection = document.getElementsByClassName("am-imgContainer")[0];
    var collection = this.imgContainer.getElementsByTagName("img");
    //var newColl = new Array();
    this.collection = new Array();
    for (var i = 0; i < collection.length; i++) {
        var img = new Image();
        img.src = collection[i].src;
        this.collection.push(img);
    };

    this.imgContainer.innerHTML = "";

    ////填充画板
    this.fill(this.option.setting.size[0], this.option.setting.size[1], this.count(), this.imgContainer, this.collection);
}

AM.prototype.toggleSize = function (isCut) {
    if (this.coverImg.src) {
        if (isCut) {
            var fitSize = this.realFitSize();
            this.imgWarp.style.width = fitSize[0] + "px";
            this.imgWarp.style.height = fitSize[1] + "px";

            document.getElementsByClassName("am-imgCover")[0].style.width = fitSize[0] + "px";
            document.getElementsByClassName("am-imgCover")[0].style.height = fitSize[1] + "px";

        }
        else {
            this.imgWarp.style.width = this.naturalWidth + "px";
            this.imgWarp.style.height = this.naturalHeight + "px";

            document.getElementsByClassName("am-imgCover")[0].style.width = this.naturalWidth + "px";
            document.getElementsByClassName("am-imgCover")[0].style.height = this.naturalHeight + "px";
        }
    }
}

AM.prototype.fill = function (width, height, count, container, collection) {
    if (collection.length == 0) {
        count = 0;
    }
    document.getElementById("imgCollectionCount").innerText = count;
    var _index = 0;
    ////将提供的图片按顺序添加
    for (var i = 0; i < count ; i++) {
        if (_index >= collection.length) {
            _index = 0;
        }
        if (collection[_index]) {
            var img = new Image();
            img.src = collection[_index].src;
            img.style.width = width + "px";
            img.style.height = height + "px";

            var div = document.createElement("div");
            div.appendChild(img);

            var close = document.createElement("a");
            close.href = "javascript:void(0)";
            close.title = "删除";
            close.innerHTML = "X";
            close.addEventListener("click", function () {
                var count = Number(document.getElementById("imgCollectionCount").innerText);
                document.getElementById("imgCollectionCount").innerText = (count - 1);
                this.parentElement.parentElement.removeChild(this.parentElement);
            }, false);
            div.appendChild(close);
            container.appendChild(div);
            _index++;
        }
    }
}
