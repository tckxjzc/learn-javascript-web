console.log('fileReader');


let img_a = document.getElementById('img_a');
let text_a = document.getElementById('text_a');
let fileUpload = document.getElementById('fileUpload');
fileUpload.onchange = function (e) {
    console.log('this.files.length: %o', this.files.length);

    if (this.files.length == 0) {
        return;
    }
    const file = this.files[0];
    console.log('file %o', file);
    //读取图片
    if(file.type.startsWith('image')){
        // let img=URL.createObjectURL(file);
        // setImg(img);
        setImg2(file);
        return;
    }
    //读取txt
    if(file.type.startsWith('text/')){
        setText(file);
    }



};
//读取文本
function setText(file) {
    let fileReader=new FileReader();
    fileReader.readAsText(file);
    console.log('fileReader %o',fileReader);
    fileReader.onload=function () {
        console.log('fileReader %o',fileReader);
        console.log('fileReader.onload %o',fileReader.result);
        text_a.innerText=fileReader.result;
    }
}


//添加图片
function setImg(url) {
    let img=document.createElement('img');
    img.src=url;
    img_a.appendChild(img);
}
function setImg2(file) {
    let img=document.createElement('img');
    let fileReader=new FileReader();
    fileReader.readAsDataURL(file);
    console.log('fileReader %o',fileReader);
    fileReader.onload=function () {
        console.log('fileReader %o',fileReader);
        console.log('fileReader.onload %o',fileReader.result);
        img.src=fileReader.result;
        img_a.appendChild(img);
    }

}