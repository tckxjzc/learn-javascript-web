console.log('decode start');
//dom
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let fileUpload = document.getElementById('fileUpload');
//选择文件
fileUpload.onchange = function (e) {
    console.log('this.files.length: %o', this.files.length);

    if (this.files.length == 0) {
        return;
    }
    const file = this.files[0];
    console.log('file %o', file);
    //读取图片
    if (file.type.startsWith('image')) {
        let img = URL.createObjectURL(file);
        start(img);//开始处理
    }
};

//start入口
function start(img) {
    let image=new Image();
    image.src=img;
    document.body.appendChild(image);
    image.onload=function(){
        // console.log(image.getBoundingClientRect());
        // console.log(image.width);
        // console.log(image.height);
        //适应长宽
        canvas.width=image.width;
        canvas.height=image.height; //若过大可以加入限制，进行缩放

        //绘制图片
        ctx.drawImage(image,0,0);
        //获取图片信息
        let oImageData=ctx.getImageData(0,0,image.width,image.height);

        //解密
        let oi_width=oImageData.width;
        let oi_height=oImageData.height;
        let yImageData=ctx.createImageData(oi_width,oi_height);
        for (let x = 0; x < oi_width; x++) {
            for (let y = 0; y < oi_height; y++) {
                let index = (x * oi_height + y) * 4;//第n个像素点
                let val=oImageData.data[index];
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
            }
        }
        ctx.putImageData(yImageData,0,0);

    };

}