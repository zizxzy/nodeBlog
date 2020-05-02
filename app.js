const express = require('express');
const path = require('path');
//处理post请求参数
const bodyParser = require('body-parser');
const session = require('express-session');
const encodeParams = require('./public/admin/js/urlEncode.js');
//导入日期处理函数
const dateFormat = require('dateformat');
// 导入art-template模板引擎，express-art-template在下载时也是附带下载了art-template
const template = require('art-template');
//导入morgan模块
const morgan = require('morgan');
//导入config模块，会自动根据当前系统的NODE_ENV读取项目根目录下面的config文件夹下面对应的json文件
//只有当production和development都读取不到的时候才会去读取default
const config = require('config');
//导入函数，便于在模板中使用
template.defaults.imports.dateFormat = dateFormat;
/*const template = require('express-art-template');
;
*/
const app = express();
require('./model/connect.js');
//当渲染后缀为html的模板时使用express-art-template
app.engine('html', require('express-art-template'));
//设置模板存放目录
app.set('views', path.join(__dirname, '/views/'));
//渲染模板时不写后缀默认拼接html后缀
app.set('view engine', 'html');
//拦截全局的post请求，将post请求的参数放入req.body中，这种处理方式无法处理二用进制传递的表单数据
app.use(bodyParser.urlencoded({
    //false时使用queryString进行参数转对象，true时使用qs处理，然后继续next传递下去
    extended: false
}));
//拦截所有的请求，配置服务器端的session
app.use(session({
    secret: 'secret key',
    name: 'username',
    resave: false,
    //不保存一个未保存的cookie
    saveUninitialized: false,
    cookie: {
        //以毫秒为单位，设置一天之后过期
        maxAge: 24 * 60 * 60 * 1000
    }
}));
//开发静态资源文件
app.use(express.static(path.join(__dirname, '/public')));

//获取系统环境变量，返回值是对象，；process是全局global对象下去的值，可以直接获取
if (process.env.NODE_ENV === 'development') {
    console.log("开发环境");
    //根据开发使用的响应状态着色的简洁输出。状态令牌将为绿色(表示成功代码)，
    // 红色(表示服务器错误代码)，黄色(表示客户端错误代码)，青色(表示重定向代码)，
    // 未着色(表示信息代码)
    app.use(morgan('dev'));
} else {
    console.log("生产环境")
}
const home = require('./route/home.js');
const admin = require('./route/admin.js');
//拦截请求，判断用户的登录状态，避免让用户访问到管理页面

app.use('/admin', require('./middleWare/loginGuard.js'));
//为不同的请求匹配不同的一级路由
app.use('/home', home);
//匹配的知识一级路由
app.use('/admin', admin);
//错误处理中间件
app.use((err, req, res, next) => {
    const error = JSON.parse(err);
    //对象解构，分离path和params
    const {path, ...params} = error;
    //得到类似'id=111&message=错了'的字符串
    const str = encodeParams(params);
    //注意这里参数路径的拼接问题，要用&&进行连接
    res.redirect(`${path}?${str}`);
});
app.listen(3000);
console.log('服务器成功启动');
