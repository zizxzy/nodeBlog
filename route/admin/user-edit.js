const {User} = require('./../../model/user.js');
const mongoose = require('mongoose');
module.exports = async (req, res) => {
    //全局变量，可以在所有的模板中访问，表示当前访问的页面是什么
    req.app.locals.currentLink = 'user';
    let {message, id} = req.query;
    if (id) {
        //根据id进行查找，注意这是个返回promise的api，需要转为异步函数才可以进行赋值
        let user = await User.findOne({'_id': id});
        //删去加密之后的密码
        user.password = "";
        res.render('admin/user-edit', {
            message: message,
            user: user,
            //通过id进行区分
            link: '/admin/user-add?id=' + id,
            button: '修改'
        });
    } else {
        //添加操作不传递user
        res.render('admin/user-edit', {
            message: message,
            link: '/admin/user-edit',
            button: '添加'
        });
    }
};
