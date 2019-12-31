
//使用 Dedicated Worker
const worker=new Worker('worker.js');
console.log('worker:%o',worker);

const textInput=document.getElementById('textInput');
textInput.onchange=function (e) {
    let value=this.value;
    //传值给worker
    worker.postMessage({type:1,data:value});
};
//接受传回的值
worker.onmessage=function (e) {
    console.log('message event:%o',e);
    textInput.value=e.data.data;
};

//使用 ShareWorker
//多个页面共享线程
const sharedWorker=new SharedWorker('sharedworker.js');
// sharedWorker.port.start();

console.log('shareWorker is %o',sharedWorker);
console.log('shareWorker.port is %o',sharedWorker.port);

sharedWorker.port.onmessage=function (e) {
  console.log('sharedWorker.port.onmessage event: %o',e);
};

const msgInput=document.getElementById('msgInput');
msgInput.onchange=function () {
    let value=this.value;
    //传值给sharedWorker
    sharedWorker.port.postMessage({type:1,data:value});
    console.log('sharedWorker.port.postMessage');
};
sharedWorker.port.onmessage=function (e) {
    console.log('sharedWorker.port.onmessage event:%o',e);
};
sharedWorker.port.onmessageerror=function () {
    console.log('sharedWorker.port.onmessageerror event:%o',e);
};