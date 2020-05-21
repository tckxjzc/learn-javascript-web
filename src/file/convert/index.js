const canvas = document.getElementsByTagName('canvas')[0];
let ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.fillStyle = "#f00";
ctx.rect(20, 20, 50, 50);
ctx.fill();

const imgData = canvas.toDataURL();


function addImg(data,title) {
    if(title){
        const h3=document.createElement('h3');
        h3.innerText=title;
        document.body.appendChild(h3);
    }
    var img = new Image();
    img.src = data;
    document.body.appendChild(img);

}

function run1() {
    const blob = base64ToBlob(imgData);
    addImg(URL.createObjectURL(blob),'base64ToBlob');
    console.log('base64ToBlob', blob);

    const file = base64ToFile(imgData);
    addImg(URL.createObjectURL(file),'base64ToFile');
    console.log('base64ToFile %o', file);


}

run1();

function run2() {
    canvas.toBlob(function (blob) {
        //Blob转File
        addImg(URL.createObjectURL(blob2file(blob)),'Blob2File');
    });
}

run2();

function base64ToArrayBuffer(base64String) {
    //此处为文件转的base64
    // const mine=base64String.match(/:(.*);/)[0];
    const content = base64String.substr(base64String.indexOf(',') + 1);
    const rawData = atob(content);//解密base64
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function base64ToFile(base64String) {
    return arrayBuffer2File(base64ToArrayBuffer(base64String))
}

function base64ToBlob(base64String) {
    return arrayBuffer2Blob(base64ToArrayBuffer(base64String));
}

function arrayBuffer2File(arrayBuffer) {
    return new File([arrayBuffer], 'tmp');
}

function arrayBuffer2Blob(arrayBuffer) {
    return new Blob([arrayBuffer]);
}

function blob2file(blob) {
    return new File([blob], 'tmp');
}
