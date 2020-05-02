const bcrypt = require('bcryptjs');
const {User} = require('./../../model/user.js');
const login = async (req, res) => {
    //接收请求参数，进行二级验证，客户端可以禁用js资源，所以要进行二级验证
    const {email, password} = req.body;
    if (email.trim().length === 0 || password.trim().length === 0) {
        return res.status(400).render('admin/error', {msg: '邮箱或者密码错误'});
    }
    //查询数据库当中的用户信息
    let user = await User.findOne({
        email: email
    });
    if (user) {
        let isEqual = bcrypt.compareSync(password, user.password);
        if (isEqual) {
            //登录成功，设置服务器端的session存储username
            req.session.username = user.username;
            req.session.role = user.role;
            //这里req.app===app.js当中创建的服务器，用户信息存放在全局locals，便于全部模板都可以使用
            req.app.locals.userInfo = user;
            if (user.state === 0)
            {
                if (user.role === 'admin'){
                    //重定向跳转到用户列表页面，必须要加上/
                    res.redirect('/admin/user');
                    /*        res.render('admin/user',{
                                username:req.session.username
                            });*/
                }else{
                    res.redirect('/home/')
                }
            }else{
                return res.status(400).render('admin/error', {msg: '该账号处于禁用状态，请重新注册新账号'});
            }


        } else {
            res.status(400).render('admin/error', {msg: '邮箱或者密码错误'});
        }
    } else {
        res.status(400).render('admin/error', {msg: '邮箱或者密码错误'});
    }
};
module.exports = login;
