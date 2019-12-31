//sharedworker中，console在单个页面中无输出
// console.log('i am shareWorker');//控制台看不到???
// console.log('self is %o',self);//
let flag = 0;
const ports = new Set();
onconnect = function (e) {
    const port = e.ports[0];
    ports.add(port);
    port.onmessage = function (e) {
        // setTimeout(function () {
        //设置值，多页面是否相同,共享数据//结果，数据共享
        let value = parseInt(e.data.data);
        if (!isNaN(value)) {
            flag = value;

        }
        port.postMessage('ports.size:'+ports.size);
        // },1500);
    }
};
//模拟广播
setInterval(function () {
    ports.forEach(function (port) {
        flag++;
        port.postMessage(flag);
    });
}, 1500);

//关闭窗口或刷新后，旧的port残留在ports中
// 是否去除无用port,或保留最新几个
// function clear() {
//
//     ports.forEach(function (port) {
//         port.postMessage('clear-test');
//     });
// }
//输出self的属性
setTimeout(function () {
    let arr=[];
    for(var key in self){
        arr.push(key)
    }

    ports.forEach(function (port) {
        flag++;
        port.postMessage(arr);
    });
},2000);
