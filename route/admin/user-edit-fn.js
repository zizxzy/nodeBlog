const Joi = require('@hapi/joi');
const {User, validateUser} = require('./../../model/user.js');
const bcrypt = require('bcryptjs');
module.exports = async (req, res, next) => {
    //全局变量，可以在所有的模板中访问，表示当前访问的页面是什么
    req.app.locals.currentLink = 'user';
    try {
        //实施验证
        await validateUser(req.body);
    } catch (error) {
        //验证没有通过，重定向回
        //发生错误时候，触发app.js的错误处理中间件
        return  next(JSON.stringify({
            'path': '/admin/user-edit',
            'message':error.message
        }));
    }
    //根据邮箱查询数据库中是否有该邮箱
    let user = await User.findOne({email: req.body.email});
    if (user) {
        //有查到表示被该邮箱占用了
        return next(JSON.stringify({
            'path': '/admin/user-edit',
            'message': `邮箱已经被占用了`
        }));
    }
    //邮箱没有被占用，对密码进行加密之后将整个请求表单req.body存进数据库
    const salt = bcrypt.genSaltSync(10);
    //替换明文密码为加密之后的哈希值
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    let InsertRes = await User.create(req.body);
    //重定向回列表页面
    res.redirect('/admin/user');
};
