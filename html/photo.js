import $ from 'jquery';
import template from 'template';
import ajaxLoading from 'text!templates/ajax_loading/ajax_loading.html';

var loading = template.compile(ajaxLoading)({msg: '自定义提示文字'});
var tpl = $(loading).appendTo('body');
setTimeout(function () {
    tpl.remove();
});

function bindEvents() {
    $('input').on('change', function () {
        var _this = this;
        var files = this.files[0];
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var reader = new FileReader();
        reader.readAsDataURL(files);

        var promiseReader = new Promise(function (reslove, reject) {
            reader.onload = function () {
                reslove(reader);
            };
        });

        promiseReader.then(function (reader) {
            var img = new Image();
            img.height = 100;
            img.width = 100;
            img.src = reader.result;
            $('body').append(img);
            img.onload = function () {
                canvas.width = 300;
                canvas.height = 300;
                ctx.fillStyle = "#fff";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 10, 10, 100, 100);
                canvas.toDataURL("image/jpeg", 0.1);
                $('body').append(canvas);
            };
        });

        /*reader.onload = function () {
            var img = new Image();
            img.src = reader.result;
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.width = 100;
            canvas.height = 100;
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            debugger;
            ctx.drawImage(img, 0, 0);
            $('body').append(canvas);

        };*/

    });
}

function compress(img) {
    var initSize = img.src.length;
    var width = img.width;
    var height = img.height;
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
    var ratio;
    if ((ratio = width * height / 4000000) > 1) {
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
    } else {
        ratio = 1;
    }

    canvas.width = width;
    canvas.height = height;

//        铺底色
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //如果图片像素大于100万则使用瓦片绘制
    var count;
    if ((count = width * height / 1000000) > 1) {
        count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片

//            计算每块瓦片的宽和高
        var nw = ~~(width / count);
        var nh = ~~(height / count);

        ctx.width = nw;
        ctx.height = nh;

        for (var i = 0; i < count; i++) {
            for (var j = 0; j < count; j++) {
                ctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);

                ctx.drawImage(ctx, i * nw, j * nh, nw, nh);
            }
        }
    } else {
        ctx.drawImage(img, 0, 0, width, height);
    }

    //进行最小压缩
    var ndata = canvas.toDataURL("image/jpeg", 0.1);

    // console.log("压缩前：" + initSize);
    // console.log("压缩后：" + ndata.length);
    // console.log("压缩率：" + ~~(100 * (initSize - ndata.length) / initSize) + "%");

    ctx.width = ctx.height = canvas.width = canvas.height = 0;

    return ndata;
}

function start() {
    bindEvents();
}

export {
    start
};

function convertCanvasToImage(canvas) {
    var image = new Image();
    image.src = canvas.toDataURL("image/png");
    //这里完成图片base64编码的转换，toDataURL（）这个canvas函数。   return image;
}