// 文件系统 webkitPersistentStorage
/**
 *
 * webkitPersistentStorage
 * webkitRequestFileSystem的使用
 */

function errorHandler(e){
    alert(e.toString())
    console.log('error: %o',e);
}
document.getElementById('write').onclick=function () {
    getFs().then(writeFile)
};
document.getElementById('reader').onclick=function () {
    getFs().then(readFile)
};

function getFs() {
    return new Promise(function (resolve,reject) {
        navigator.webkitPersistentStorage.requestQuota(1024*1024*10*3,function (grantedBytes) {
            window.webkitRequestFileSystem(window.PERSISTENT,grantedBytes,(fs)=>{
                console.log("grantedBytes:%o",grantedBytes);
                resolve(fs);
            },function (e) {
                errorHandler(e);
                reject(e)
            })
        },function (e) {
            errorHandler(e);
            reject(e)
        })
   })
}
document.getElementById('query').onclick=query;
//查询使用情况
function query() {
    navigator.webkitPersistentStorage.queryUsageAndQuota( function(usedBytes, grantedBytes) {
        console.log('we are using ', usedBytes, ' of ', grantedBytes, 'bytes');
    },errorHandler)
}

function writeFile(fs) {
    var blob=new Blob(['file system test'],{type:'text/plain'});

    writeBlobFile('a.txt',blob,fs);

    fetch('/static/images/a.jpg').then(function (response) {
        if(response.ok){
            response.blob().then(function (blob) {
                writeBlobFile('a.jpg',blob,fs);
            })
        }
    });

}
function writeBlobFile(name,file,fs) {
    fs.root.getFile(name,{create:true},function (fileEntry) {
        fileEntry.createWriter(function (fileWriter) {
            fileWriter.onwriteend=function () {
                console.log(name+'write completed')
            };
            fileWriter.onerror=function (e) {
                console.log(name+'write error:%o',e);
            };
            fileWriter.write(file);
        },errorHandler)
    },errorHandler)
}


function readFile(fs) {
    fs.root.createReader().readEntries(function (result) {//遍历根目录文件夹内文件
        console.log(result)
    });
    fs.root.getFile('a.txt',{},function (fileEntry) {
        fileEntry.file(function (file) {
            console.log(file);
            // document.getElementById('save').download='a.txt';
            // document.getElementById('save').href=URL.createObjectURL(file)
        });
        var url=fileEntry.toURL();
        console.log(url);
        document.getElementById('save').download='a.txt';
        document.getElementById('save').href=url;

    },errorHandler);
    fs.root.getFile('a.jpg',{},function (fileEntry) {
        fileEntry.file(function (file) {
            console.log(file);
            // document.getElementById('save').download='a.txt';
            // document.getElementById('save').href=URL.createObjectURL(file)
        });
        var url=fileEntry.toURL();
        console.log(url);
        document.body.style.backgroundImage='url('+url+')'

    },errorHandler)
}