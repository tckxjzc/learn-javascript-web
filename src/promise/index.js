//promise接受的函数是异步执行的吗
//以下输出顺序是？
console.log('---a');
setTimeout(function () {
    console.log("----b")
},0);
new Promise(function () {
    console.log('---c');
    setTimeout(function () {
        console.log("----d")
    },0);
});
console.log("------e");


//结论是 Promise接受的函数是同步运行的，

//Promise.all
Promise.all([
    new Promise(function (resolve) {
        resolve(5)
    }).then(function (s) {
        return s  as number+10
    }),
    new Promise(function (resolve) {
        resolve(5)
    }).then(function (s) {
        return s as number+6
    }),
]).then(function (r) {
    console.log("r[0]");
    console.log(r[0]);
});
//
let a=new Promise(function (resolve, reject) {
   reject('666')
});
a.then(function (s) {
    return s;
}).catch(function (e) {
    console.log(e);
    throw e
}).then(function (s) {
    console.log('ss'+s)
}).catch(function (e) {
    console.log(e+'eee')
});