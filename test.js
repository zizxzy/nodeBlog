/*
//引入bcrypt包
const bcrypt = require('bcryptjs');
const {promisify} = require('util');
const {performance} = require('perf_hooks');

//同步版本
function bcryptHashSync(myPlaintextPassword,cost){
    let salt = bcrypt.genSaltSync(cost);
    let hash = bcrypt.hashSync(myPlaintextPassword, salt);
    return hash;
}
//每一次生成的hash都会不一样
let password = bcryptHashSync('yaaa',10);
console.log(password);//$2a$10$8j0o8ixPI967DEd3KwfeN.qBKQ6KHAzgTEJR0/yMcTP/ZthBpf3GK
//同步的形式验证密码
console.log(bcrypt.compareSync('yaaa',password));//true
//异步函数的实现
async function bcryptHash(myPlaintextPassword,cost){
    const start = performance.now();
    //将有回调函数的API转换成promise形式再转成同步API的形式，将返回值赋值给前面的变量
    const salt = await promisify(bcrypt.genSalt)(cost);
    const mid = performance.now();
    const hash = await promisify(bcrypt.hash)(myPlaintextPassword,salt);
    const end = performance.now();
    console.log(hash);
}
//通常使用的工作因子cost是10
bcryptHash('Lzzhchc/!*c.ds',10);
//Lzzhchc/!*c.ds 10
// $2a$10$YNDBR9HIIGM7W35lL3m0d.SyC7PUEoiEHOTTwP.3p6XamtMlJ56/S 76.01820003986359 175.74580001831055 249.9683000445366
const hash =  '$2a$10$YNDBR9HIIGM7W35lL3m0d.SyC7PUEoiEHOTTwP.3p6XamtMlJ56/S';
//验证，在拿之前生成的hash进行验证也可以得到正确结果
bcrypt.compare('Lzzhchc/!*c.ds',hash,(err,result) => {
   console.log(result);
});
*/
const fs = require('fs');
const path = require('path');
let data = fs.readFileSync(path.join(__dirname,'joi.js'));
console.log(data)
