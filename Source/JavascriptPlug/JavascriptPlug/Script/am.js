var AM = function (option) {
    var defaults = {
        collection: null,
        coverImg: null,
        element: null,
        setting: {
            size: [50, 50],
            opacity: 45,
            cutting: true
        }
    }

    $.extend(defaults, option);

    var imgContainer = document.createElement("div");
    imgContainer.className = "am-imgContainer";
    defaults.element.appendChild(imgContainer);

    var coverDocument = document.createElement("div");
    coverDocument.className = "am-imgCover";
    coverDocument.innerHTML = "<img src=\"" + defaults.coverImg.src + "\" alt=\"am\"/>"
    defaults.element.appendChild(coverDocument);
    debugger;
    console.log(coverDocument.offsetWidth);
    console.log(coverDocument.offsetHeight);

    ////页面显示的宽度、高度
    var width = defaults.coverImg.width;
    var height = defaults.coverImg.height;
    ////原始宽度、高度
    var naturalWidth = defaults.coverImg.naturalWidth;
    var naturalHeight = defaults.coverImg.naturalHeight;

    /////图片容器的样式
    imgContainer.style.width = width + "px";
    imgContainer.style.height = height + "px";
    imgContainer.style.opacity = defaults.setting.opacity / 100;

    ////图片数量
    var xCount = parseInt(naturalWidth / defaults.setting.size[0]);
    var yCount = parseInt(naturalHeight / defaults.setting.size[1]);
    var count = xCount * yCount;

    ////比例
    var ratio = Number(width / naturalWidth);

    ////实际显示的襄元尺寸
    var realImgSize = [defaults.setting.size[0] * ratio, defaults.setting.size[1] * ratio];

    ////裁剪后的容器大小
    var cuttedContainerSize = [realImgSize[0] * xCount, realImgSize[1] * yCount];

    ////如果需要裁剪
    if (defaults.setting.cutting) {
        coverDocument.style.width = cuttedContainerSize[0] + "px";
        coverDocument.style.height = cuttedContainerSize[1] + "px";
    }

    var _fill = function (width, height, container, collection) {
        var _index = 0;
        ////将提供的图片按顺序添加
        for (var i = 0; i < count; i++) {
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
    };

    ////填充画板
    _fill(realImgSize[0], realImgSize[1], imgContainer, defaults.collection);

    var apply = function (attribute, value, callback) {
        switch (attribute) {
            case "opacity":
                this.ImgContainer.style.opacity = Number(value) / 100;
                break;
            case "size":
                _fill(value.width, value.height, this.ImgContainer, this.Collection);
                break;
        }
        if (callback && typeof callback === "function") {
            callback(defaults);
        }
    }

    return {
        Option: defaults,
        Width: width,
        Height: height,
        naturalWidth: naturalWidth,
        naturalHeight: naturalHeight,
        CountX: xCount,
        CountY: yCount,
        Count: count,
        Ratio: ratio,
        RealImgSize: realImgSize,
        CuttedContainerSize: cuttedContainerSize,
        ImgContainer: defaults.imgContainer,
        Collection: defaults.collection,
        Apply: apply,
    };
};