console.log('start');

/**
 * 我们知道图片的像素信息里存储着 RGB 的色值，R、G、B 分别为该像素的红、绿、蓝通道，每个通道的分量值范围在 0~255，16 进制则是 00~FF。在 CSS 中经常使用其 16 进制形式，比如指定博客头部背景色为 #A9D5F4。其中 R（红色）的 16 进制值为 A9，换算成十进制为 169。这时候，对 R 分量的值+1，即为 170，整个像素 RGB 值为 #AAD5F4，别说你看不出差别，就连火眼金金的“ 像素眼” 设计师都察觉不出来呢。于此同时，修改 G、B 的分量值，也是我们无法察觉的。因此可以得出重要结论：RGB 分量值的小量变动，是肉眼无法分辨的，不影响对图片的识别。
 有了这个结论，那就给我们了利用空间，常用手段的就是对二进制最低位进行操作。
 *
 */

//canvas
const outImage = document.getElementById('outImage');
const canvas = document.getElementById('canvas');
const textCanvas = document.getElementById('textCanvas');
const ctx = canvas.getContext('2d');
const textCtx = textCanvas.getContext('2d');

//加载图片
(function () {
    let image = new Image();
    image.src = '/static/images/a.jpg';
    image.onload = function () {
        // createImageBitmap(image).then((e)=>{console.log(e)});
        console.log('image.width %o:', image.width);
        console.log('image.height %o', image.height);
        start(image, image.width * 1.3, image.height * 1.3);
    };
})();


function start(img, width, height) {
    //绘制图片
    ctx.drawImage(img, 0, 0, width, height);
    //获取图片像素
    let oImageData = ctx.getImageData(0, 0, width, height);
    console.log('oImageData %o', oImageData);
    // ctx.putImageData(oImageData,0,height);
    //绘制文字
    let str = 'tckxjzc';
    let fontSize = 120;
    textCtx.textAlign = 'start';
    textCtx.font = fontSize + 'px serif';
    textCtx.textBaseline = 'top';
    textCtx.fillText(str, 0, 0);
    let textMetrics = textCtx.measureText(str);
    console.log('textMetrics %o', textMetrics);
    //获取文字部分imageData
    let textImageData = textCtx.getImageData(0, 0, Math.ceil(textMetrics.width), fontSize);
    console.log('textImageData %o', textImageData);
    //处理图片
    handleImageData(oImageData, textImageData);

}

/**
 * 处理图片
 * 文字有像素点的地方，R通道全部为偶数，否则为奇数
 */
function handleImageData(oImageData, textImageData) {
    //图片宽高
    let oi_width = oImageData.width;
    let oi_height = oImageData.height;
    //文字宽高
    let t_width = textImageData.width;
    let t_height = textImageData.height;
    //文字需要比图片小才能嵌入
    if (t_width > oi_width) {
        throw new Error('文字过长');
    }
    if (t_height > oi_height) {
        throw new Error('文字字体过大');
    }
    //遍历像素点,复制图片信息
    let newImageData = new ImageData(oi_width, oi_height);
    for (let x = 0; x < oi_width; x++) {
        for (let y = 0; y < oi_height; y++) {
            let index = (x * oi_height + y) * 4;//第n个像素点
            newImageData.data[index] = oImageData.data[index];//R
            newImageData.data[index + 1] = oImageData.data[index + 1];//G
            newImageData.data[index + 2] = oImageData.data[index + 2];//B
            newImageData.data[index + 3] = oImageData.data[index + 3];//A
        }
    }
    //加入隐藏信息
    for (let x = 0; x < t_width; x++) {
        for (let y = 0; y < t_height; y++) {
            let tIndex = (y * t_width + x) * 4;//第n个像素点textImageData
            let oIndex = (y * oi_width + x) * 4;//第n个像素点oImageData
            if (textImageData.data[tIndex + 3] > 128) {
                newImageData.data[oIndex] =getOddNum(newImageData.data[oIndex]) ;//R
            }else {
                newImageData.data[oIndex] =getEvenNum(newImageData.data[oIndex]) ;//R
            }
            // newImageData.data[oIndex+3] =0;
        }
    }
    //适应长宽
    textCanvas.width=oi_width;
    textCanvas.height=oi_height;
    //放回图片
    textCtx.putImageData(newImageData, 0, 0);
    //解密隐藏信息
    let yImageData=textCtx.getImageData(0,0,oi_width,oi_height);
    for (let x = 0; x < oi_width; x++) {
        for (let y = 0; y < oi_height; y++) {
            let index = (x * oi_height + y) * 4;//第n个像素点
            let val=yImageData.data[index];
            if(val%2==0){
                yImageData.data[index + 3] =255;//A
                yImageData.data[index] = 255;//R
                yImageData.data[index + 1] = 255;//G
                yImageData.data[index + 2] = 255;//B

            }else {

                yImageData.data[index + 3] =255;//A
                yImageData.data[index] = 0;//R
                yImageData.data[index + 1] = 0;//G
                yImageData.data[index + 2] = 0;//B
            }
            // yImageData.data[index] = oImageData.data[index];//R
            // yImageData.data[index + 1] = oImageData.data[index + 1];//G
            // yImageData.data[index + 2] = oImageData.data[index + 2];//B
            // yImageData.data[index + 3] = oImageData.data[index + 3];//A
        }
    }
    // textCtx.putImageData(yImageData, 0, 0);
}
//返回一个奇数
function getOddNum(num) {
    return num % 2 ? num : num + 1;
}
//返回一个偶数
function getEvenNum(num) {
    let result=num % 2 ? num+1 : num;
    return result<255?result:254;
}


//生成图片





