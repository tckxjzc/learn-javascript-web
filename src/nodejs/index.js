const crypto = require('crypto');
const hash = crypto.createHash('sha256');

hash.update('one');
// console.log(hash.copy().digest('hex'));
//
// const readline = require('readline');
//
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });
//
// rl.question('你如何看待 Node.js 中文网？', (answer) => {
//     // TODO：将答案记录在数据库中。
//     console.log(`感谢您的宝贵意见：${answer}`);
//
//     rl.close();
// });
let http=require('https');
http.get('https://m.biquge.biz/4/4763/11938312.html',function (response) {
    // console.log(response)
    response.on('data',function (data) {
        console.log(data.toString())
    })
})
