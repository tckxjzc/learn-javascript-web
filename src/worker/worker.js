// importScripts('https://cdn.bootcss.com/sockjs-client/1.4.0/sockjs.min.js');
//开始运行
console.log('i am worker');
//api测试
/**
 * 在 worker 线程中，可以获得下列对象

 1)     navigator 对象

 2)     location 对象，只读

 3)     XMLHttpRequest 对象

 4)     setTimeout/setInterval 方法

 5)     Application Cache

 6)     通过 importScripts() 方法加载其他脚本

 7)     创建新的 Web Worker

 worker 线程不能获得下列对象

 1)     DOM 对象

 2)     window 对象

 3)     document 对象

 4)     parent 对象

 上述的规范，限制了在 worker 线程中获得主线程页面相关对象的能力，所以在 worker 线程中，不能进行 dom 元素的更新。
 */
setTimeout(()=>{console.log('setTimeout');},1500);//setTimeout有效
//worker中无法使用dom
// document.body.innerText='hello'; //此处会报错，Uncaught ReferenceError: document is not defined

//this
console.log('this is %o',this);
console.log('self is %o',self);
const _this=self;
//接受页面传递过来的值
onmessage=function (e) {
    console.log('worker onmessage event %o',e);
    setTimeout(function () {
        //处理后传回
        _this.postMessage({type:1,data:e.data.data+Math.floor(Math.random()*10)});
    },1500);
};