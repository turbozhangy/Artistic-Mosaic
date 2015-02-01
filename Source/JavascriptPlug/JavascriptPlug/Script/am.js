function AM(id) {

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

    var html = new Array();
    html.push("<div class=\"am-body\">");
    html.push("<h3>图片<small>(从当前页面截取，共<span id=\"imgCollectionCount\">0</span>张)</small></h3>");
    html.push("<div class=\"img-body\">");
    html.push("<div id=\"img_warp\" class=\"img-warp\">");
    html.push("<div class=\"am-imgContainer\"></div>");
    html.push("<div class=\"am-imgCover\"><img /></div>");
    html.push("</div>");
    html.push("<ul id=\"img_Collection\" class=\"list-inline img-Collection\"></ul>");
    html.push("</div>");
    html.push("</div>");

    html.push("<div class=\"am-rightbar\">");

    html.push("<div class=\"cover\">");

    html.push("<h3>封面<small id=\"am_cover_size\"></small></h3>");
    html.push("<div class=\"am-img-main img-thumbnail\" id=\"am_mainImg\"></div>");

    html.push("<div>");
    html.push("<label class=\"checkbox-inline\"><input type=\"checkbox\" id=\"autoCutting\" value=\"\"> 自动裁剪</label>");
    html.push("<a href=\"javascript:void(0)\" class=\"pull-right\">本地上传</a>");
    html.push("</div>");

    html.push("</div>");

    //html.push("<div>");

    //html.push("<h3>襄元设置");
    //html.push("<div class=\"pull-right\"><input type=\"button\" value=\"应用\" class=\"btn btn-warning btn-xs\" id=\"am_applyBtn\" /></div>");
    //html.push("</h3>");

    //html.push("<div class=\"form-group\">");
    //html.push("尺寸<small class=\"text-gray\">(px)</small>：<input type=\"text\" value=\"\" class=\"w35\" placeholder=\"宽\" id=\"am_setting_sizeWInput\">");
    //html.push("<span>X</span>");
    //html.push("<input type=\"text\" value=\"\" class=\"w35\" placeholder=\"高\" id=\"am_setting_sizeHInput\">");
    //html.push("<input type=\"button\" value=\"重置\" class=\"btn btn-link btn-xs\" id=\"am_reset_SizeBtn\" />");
    //html.push("</div>");

    //html.push("<div>");
    //html.push("透明度<small class=\"text-gray\">(%)</small>：<input type=\"text\" value=\"\" class=\"w35\" id=\"am_setting_opacityInput\" />");
    //html.push("<input type=\"button\" value=\"重置\" class=\"btn btn-link btn-xs\" id=\"am_reset_OpacityBtn\" />");
    //html.push("</div>");

    //html.push("</div>");

    html.push("<div class=\"mt10 text-right\">");
    html.push("<input type=\"button\" value=\"退出\" class=\"btn btn-default\" />");
    html.push("<input type=\"button\" value=\"生成图片\" class=\"btn btn-success ml10\" id=\"am_creatingBtn\"/>");
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

    this.imgContainer = document.getElementsByClassName("am-imgContainer")[0];
    this.coverImg = document.getElementsByClassName("am-imgCover")[0].firstChild;
    this.imgWarp = document.getElementById("img_warp");
    document.getElementById("autoCutting").checked = this.option.autoCut;

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
    //if (collection) {
    //    this.collection = collection;
    //}

    AM.instance = this;

    document.getElementById("imgCollectionCount").innerText = collection.length;

    document.getElementById("autoCutting").onclick = function () {
        AM.instance.toggleSize(this.checked);
    };

    document.getElementById("am_creatingBtn").onclick = function () {
        this.disabled = true;
        this.value = "处理中...";
        html2canvas(document.querySelector("#img_warp")).then(function (canvas) {
            var stream = canvas.toDataURL("image/png");
            document.getElementById("am_creatingBtn").disabled = false;
            document.getElementById("am_creatingBtn").value = "重新生成";

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

        }, false);
    };

    var collectionBox = document.getElementById("img_Collection");
    for (var i = 0; i < collection.length; i++) {
        if (collection[i].width >= this.option.setting.size[0] && collection[i].height >= this.option.setting.size[1]) {
            this.append(collection[i].src);
        }
    }
    // collectionBox.innerHTML = html.join("");
    document.getElementsByClassName("am-img-remove");

    ////组织浏览器默认打开文件事件
    function _stop(e) {
        e.stopPropagation();
        e.preventDefault();
    };

    //拖离 
    collectionBox.addEventListener("dragleave", _stop, false);

    //拖进 
    collectionBox.addEventListener("dragenter", _stop, false);

    //拖来拖去 
    collectionBox.addEventListener("dragover", _stop, false);

    collectionBox.addEventListener("drop", function (e) {
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
                        AM.instance.append(this.result);
                    }

                    reader.readAsDataURL(fileList[i]);
                }
            }
            else {
                console.log(fileList[i].size);
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
                    var img = new Image();
                    img.src = this.result;
                    self.appendChild(img);
                    self.style.height = "auto";
                }

                reader.readAsDataURL(fileList[0]);
            }
        }
    }, false);
}
AM.prototype.append = function (src) {
    var img = new Image();
    img.src = src;
    img.onload = function (element) {
        var li = document.createElement("li");
        var am = AM.instance;
        if (this.width >= am.option.setting.size[0] && this.height >= am.option.setting.size[1]) {
            li.appendChild(img);
            var icon = document.createElement("i");
            icon.className = "am-img-remove";
            icon.addEventListener("click", function () {
                document.getElementById("img_Collection").removeChild(this.parentElement);
            }, false);
            li.appendChild(icon);
            document.getElementById("img_Collection").appendChild(li);

            am.collection.push(img);
        }
    }
}

AM.prototype.setCover = function (imgSrc) {
    if (AM.instance == null) {
        return;
    }

    this.imgContainer.innerHTML = "";

    this.coverImg.src = imgSrc;
    // document.getElementById("am_cover_img").src = imgSrc;

    ////原始宽度、高度
    this.naturalWidth = this.coverImg.naturalWidth;
    this.naturalHeight = this.coverImg.naturalHeight;

    document.getElementById("am_cover_size").innerText = "(" + this.naturalWidth + "x" + this.naturalHeight + ")";

    ////如果需要裁剪
    this.toggleSize(this.option.autoCut);


    ////填充画板
    this.fill(this.option.setting.size[0], this.option.setting.size[1], this.count(), this.imgContainer, this.collection);
}

AM.prototype.toggleSize = function (isCut) {
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

AM.prototype.fill = function (width, height, count, container, collection) {
    var _index = 0;
    ////将提供的图片按顺序添加
    for (var i = 0; i < count ; i++) {
        if (_index >= collection.length) {
            _index = 0;
        }

        var img = new Image();
        img.src = collection[_index].src;
        img.style.width = width + "px";
        img.style.height = height + "px";

        container.appendChild(img);
        _index++;
    }
}
